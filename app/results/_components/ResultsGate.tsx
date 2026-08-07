"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Button } from "@/app/_components/ui/Button";
import { CornerFrame } from "@/app/_components/ui/CornerFrame";
import { Rule } from "@/app/_components/ui/Rule";

/**
 * Copy here is Indonesian only, and deliberately not in data/dictionary.ts.
 * That file is the language machinery for the invitation, which guests read in
 * two languages; this page is only ever opened by the couple, so putting its
 * labels there would grow the Dictionary type for an audience of two.
 */
const copy = {
  lockedTitle: "Ucapan Masuk",
  lockedHint: "Halaman ini terkunci. Masukkan kata sandi untuk melihat ucapan yang masuk.",
  passwordLabel: "Kata sandi",
  submit: "Buka",
  submitting: "Memeriksa…",
  countLabel: (total: number) => `${total} ucapan masuk`,
  empty: "Belum ada ucapan yang masuk.",
  errors: {
    generic: "Terjadi kesalahan. Mohon coba lagi sesaat lagi.",
    required: "Mohon isi kata sandi.",
    invalid: "Kata sandi tidak sesuai.",
    unauthorized: "Kata sandi salah.",
    // These two mean the password was accepted — only the reading of the
    // wishes afterwards failed. Worth saying so, since the couple are the only
    // people who ever see them and they are the ones who can fix it.
    unconfigured: "Kata sandi benar. SUPABASE_SERVICE_ROLE_KEY belum diisi, jadi ucapan belum bisa dimuat.",
    load_failed:
      "Kata sandi benar, tetapi ucapan gagal dimuat. Periksa apakah project Supabase sedang di-pause.",
    rate_limited: "Terlalu banyak percobaan. Mohon tunggu sekitar 10 menit.",
  },
};

type ErrorCode = keyof typeof copy.errors;

type Wish = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const dateFormat = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "long",
  timeStyle: "short",
});

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function ResultsGate() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"locked" | "checking" | "unlocked">("locked");
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const passwordRef = useRef<HTMLInputElement>(null);

  function fail(code: ErrorCode) {
    setStatus("locked");
    setErrorCode(code);
    passwordRef.current?.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim()) {
      fail("required");
      return;
    }

    setStatus("checking");
    setErrorCode(null);

    try {
      const response = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { code?: string } | null;
        const code = data?.code;
        fail(code && code in copy.errors ? (code as ErrorCode) : "generic");
        return;
      }

      const data = (await response.json()) as { wishes: Wish[] };
      setWishes(data.wishes);
      setPassword("");
      setStatus("unlocked");
    } catch {
      fail("generic");
    }
  }

  // No cookie, no sessionStorage: the unlocked state lives in this component
  // only, so every visit — and every reload — starts back at the form.
  if (status === "unlocked") {
    return (
      <m.div initial="hidden" animate="visible" variants={fadeUp}>
        <p className="font-mono-wide text-[11px] uppercase tracking-[0.2em] text-gold-light">
          {copy.countLabel(wishes.length)}
        </p>
        <Rule className="mt-6" />

        {wishes.length === 0 ? (
          <p className="mt-10 font-body text-paper-dim">{copy.empty}</p>
        ) : (
          <ul className="mt-10 flex flex-col gap-6">
            {wishes.map((wish) => (
              <li key={wish.id} className="relative border border-gold/30 bg-ink-alt p-6">
                <CornerFrame />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-display text-xl">{wish.name}</h2>
                  <time
                    dateTime={wish.created_at}
                    className="font-mono-wide text-[11px] uppercase tracking-[0.2em] text-paper-dim"
                  >
                    {dateFormat.format(new Date(wish.created_at))}
                  </time>
                </div>
                {/* Guests type their wishes across several lines; keep them. */}
                <p className="mt-3 whitespace-pre-wrap font-body text-paper-dim">{wish.message}</p>
              </li>
            ))}
          </ul>
        )}
      </m.div>
    );
  }

  return (
    <m.div initial="hidden" animate="visible" variants={fadeUp} className="my-auto">
      <h1 className="font-display text-3xl italic sm:text-4xl">{copy.lockedTitle}</h1>
      <p className="mt-4 max-w-md font-body text-paper-dim">{copy.lockedHint}</p>

      <form noValidate onSubmit={handleSubmit} className="mt-10 flex max-w-sm flex-col gap-6">
        <div>
          <label
            htmlFor="results-password"
            className="font-mono-wide text-[11px] uppercase tracking-[0.2em] text-paper-dim"
          >
            {copy.passwordLabel}
          </label>
          <input
            ref={passwordRef}
            id="results-password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errorCode)}
            aria-describedby={errorCode ? "results-error" : undefined}
            className="mt-2 min-h-11 w-full border border-gold/30 bg-ink px-4 py-3 font-body text-paper outline-none focus-visible:border-gold-light"
          />
        </div>

        <Button type="submit" disabled={status === "checking"} className="self-start">
          {status === "checking" ? copy.submitting : copy.submit}
        </Button>

        <p
          id="results-error"
          role="status"
          aria-live="polite"
          className="min-h-4 font-mono-wide text-xs text-error"
        >
          <AnimatePresence mode="wait" initial={false}>
            {errorCode ? (
              <m.span
                key={errorCode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {copy.errors[errorCode]}
              </m.span>
            ) : null}
          </AnimatePresence>
        </p>
      </form>
    </m.div>
  );
}
