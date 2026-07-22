import { NextResponse } from "next/server";
import { z } from "zod";

const ucapanSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = ucapanSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Data ucapan tidak valid." }, { status: 400 });
  }

  // Demo mode — nothing is persisted or displayed to other guests yet. Before
  // launch, replace this block with a real destination: a database table to
  // power a live guestbook list, or forward to email/a spreadsheet.
  console.info("[ucapan] received (demo mode, not persisted):", parsed.data);

  return NextResponse.json({ ok: true });
}
