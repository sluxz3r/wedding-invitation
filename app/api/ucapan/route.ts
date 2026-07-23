import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";

const wishSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

// Route handler runs on the server, so the publishable key never widens the
// client bundle's trust surface beyond what it already is. Reads happen at
// request time from the real environment (not the client-inlined value).
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Salt so stored IP hashes aren't trivially reversible (the IPv4 space is
// small). Override with UCAPAN_IP_SALT in production if you wish.
const IP_SALT = process.env.UCAPAN_IP_SALT ?? "arie-lily-guestbook";

export const runtime = "nodejs";

// Hash the client IP for the per-IP rate limit — the raw IP is never stored.
function clientIpHash(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0]?.trim() : request.headers.get("x-real-ip");
  if (!ip) return null;
  return createHash("sha256").update(`${IP_SALT}:${ip}`).digest("hex");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = wishSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("[wishes] Supabase env vars are not configured.");
    return NextResponse.json(
      { ok: false, error: "The server is not configured yet." },
      { status: 500 },
    );
  }

  // All inserts go through the submit_wish() RPC, which enforces the per-IP
  // rate limit and validation server-side. Nothing is echoed back and there
  // is no public read path — the guestbook stays private.
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_wish`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      p_name: parsed.data.name,
      p_message: parsed.data.message,
      p_ip_hash: clientIpHash(request),
    }),
    cache: "no-store",
  });

  if (res.ok) {
    return NextResponse.json({ ok: true });
  }

  const detail = await res.text().catch(() => "");

  // The RPC raises 'rate_limited' when the same IP submits within 5 minutes.
  if (detail.includes("rate_limited")) {
    return NextResponse.json(
      {
        ok: false,
        error: "You've just sent a wish. Please wait a few minutes before sending another.",
      },
      { status: 429 },
    );
  }

  console.error("[wishes] Supabase RPC failed:", res.status, detail);
  return NextResponse.json({ ok: false, error: "Could not save your wish." }, { status: 502 });
}
