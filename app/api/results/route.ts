import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";

const requestSchema = z.object({
  password: z.string().min(1).max(200),
});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

/**
 * Supabase's secret key (`sb_secret_…`), which bypasses row-level security.
 *
 * `wishes` has RLS enabled and no select policy at all (see the migration), so
 * the publishable key genuinely cannot read it — that is the design, not an
 * oversight, and it is why this route needs the stronger key.
 *
 * SUPABASE_SERVICE_ROLE_KEY is accepted too: that is what the same key is
 * called on projects still using the legacy JWT keys, and what much of the
 * documentation still says.
 *
 * Neither name may ever gain a NEXT_PUBLIC_ prefix — that would inline a key
 * with full database access into the client bundle.
 */
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * The gate on /results. Checked here rather than in the browser, so the wishes
 * are never sent to a page that has not answered it.
 *
 * Hardcoded by choice: this guards a wedding guestbook from idle curiosity, not
 * anything worth real secrecy. RESULTS_PASSWORD overrides it without a code
 * change — worth setting on the host, since this repository is public and the
 * default below is readable on GitHub.
 */
const PASSWORD = process.env.RESULTS_PASSWORD ?? "ariganteng";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ResultsErrorCode = "invalid" | "unauthorized" | "unconfigured" | "rate_limited" | "load_failed";

function failure(code: ResultsErrorCode, status: number) {
  return NextResponse.json({ ok: false, code }, { status });
}

/**
 * Compared as fixed-width digests rather than raw bytes: timingSafeEqual throws
 * when the two buffers differ in length, so guarding that with an early return
 * would answer "is the password this long?" in the time it takes to fail.
 */
function passwordMatches(candidate: string, expected: string): boolean {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(candidate), digest(expected));
}

/**
 * A per-IP cap on wrong guesses. This lives in module memory, so it resets on
 * redeploy and is not shared between serverless instances — it blunts casual
 * brute force rather than preventing a determined one. The real protection is
 * that the page is unlisted and the password is not guessable from the site.
 */
const ATTEMPT_WINDOW_MS = 10 * 60_000;
const MAX_FAILURES = 10;
const failures = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    (forwarded ? forwarded.split(",")[0]?.trim() : request.headers.get("x-real-ip")) ?? "unknown"
  );
}

function isLockedOut(key: string, now: number): boolean {
  const entry = failures.get(key);
  if (!entry || entry.resetAt <= now) {
    failures.delete(key);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(key: string, now: number): void {
  const entry = failures.get(key);
  if (!entry || entry.resetAt <= now) {
    failures.set(key, { count: 1, resetAt: now + ATTEMPT_WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return failure("invalid", 400);
  }

  const key = clientKey(request);
  const now = Date.now();

  if (isLockedOut(key, now)) {
    return failure("rate_limited", 429);
  }

  // The password stands on its own — nothing outside this file is involved in
  // answering it, so a wrong guess fails the same way whatever Supabase is doing.
  if (!passwordMatches(parsed.data.password, PASSWORD)) {
    recordFailure(key, now);
    return failure("unauthorized", 401);
  }

  failures.delete(key);

  // Past the gate: the wishes themselves still have to come from Supabase.
  if (!SUPABASE_URL || !SECRET_KEY) {
    console.error("[results] SUPABASE_SECRET_KEY is not configured.");
    return failure("unconfigured", 500);
  }

  // ip_hash is deliberately left out of the select — it exists for the rate
  // limit, and nothing downstream has any use for it.
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/wishes?select=id,name,message,created_at&order=created_at.desc`,
    {
      headers: {
        apikey: SECRET_KEY,
        Authorization: `Bearer ${SECRET_KEY}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[results] Supabase read failed:", res.status, detail);
    return failure("load_failed", 502);
  }

  const wishes = await res.json().catch(() => null);

  if (!Array.isArray(wishes)) {
    console.error("[results] Unexpected Supabase payload shape.");
    return failure("load_failed", 502);
  }

  return NextResponse.json(
    { ok: true, wishes },
    // Nothing about this response should ever sit in a shared cache.
    { headers: { "Cache-Control": "no-store, private" } },
  );
}
