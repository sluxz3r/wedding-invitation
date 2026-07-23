"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { SectionShell } from "@/app/_components/layout/SectionShell";
import { Button } from "@/app/_components/ui/Button";
import { RevealHeading } from "@/app/_components/ui/RevealHeading";

type FormState = { name: string; message: string };
type FieldErrors = Partial<Record<"name" | "message", string>>;

const initialState: FormState = { name: "", message: "" };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const floatingLabel =
  "pointer-events-none absolute left-4 top-3.5 origin-left font-mono-wide text-sm uppercase tracking-[0.2em] text-paper-dim transition-all duration-200 peer-focus:-top-6 peer-focus:left-0 peer-focus:text-xs peer-focus:text-gold-light peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:left-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gold-light";

export function Ucapan() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.message.trim()) next.message = "Please write your wishes or prayer.";
    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.message) messageRef.current?.focus();
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/ucapan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setStatus("error");
        setStatusMessage(
          data?.error ?? "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      setStatus("success");
      setStatusMessage("Thank you for your wishes and prayers — they mean the world to us.");
      setValues(initialState);
      window.setTimeout(() => {
        setStatus((current) => (current === "success" ? "idle" : current));
      }, 2500);
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again in a moment.");
    }
  }

  return (
    <SectionShell id="ucapan" index="03" eyebrow="Wishes & Prayers" alt>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={fadeUp}
      >
        <RevealHeading className="max-w-2xl font-display text-4xl italic leading-tight sm:text-5xl">
          Leave us your warmest wishes.
        </RevealHeading>

        <form noValidate onSubmit={handleSubmit} className="mt-10 flex max-w-xl flex-col gap-8">
          <div className="relative">
            <input
              ref={nameRef}
              id="ucapan-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder=" "
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "ucapan-name-error" : undefined}
              className="peer min-h-11 w-full border border-gold/30 bg-ink px-4 py-3 font-body text-paper outline-none focus-visible:border-gold-light"
            />
            <label htmlFor="ucapan-name" className={floatingLabel}>
              Name <span aria-hidden="true">*</span>
            </label>
            {errors.name ? (
              <p id="ucapan-name-error" className="mt-2 font-mono-wide text-xs text-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="relative">
            <textarea
              ref={messageRef}
              id="ucapan-message"
              name="message"
              rows={4}
              required
              placeholder=" "
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "ucapan-message-error" : undefined}
              className="peer w-full border border-gold/30 bg-ink px-4 py-3 font-body text-paper outline-none focus-visible:border-gold-light"
            />
            <label htmlFor="ucapan-message" className={floatingLabel}>
              Wishes &amp; Prayers <span aria-hidden="true">*</span>
            </label>
            {errors.message ? (
              <p id="ucapan-message-error" className="mt-2 font-mono-wide text-xs text-error">
                {errors.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" disabled={status === "loading"} className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <m.span
                  key="success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center gap-2"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M4 10.5l4 4 8-9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Sent
                </m.span>
              ) : (
                <m.span
                  key="idle"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {status === "loading" ? "Sending…" : "Send Wishes"}
                </m.span>
              )}
            </AnimatePresence>
          </Button>

          <p
            role="status"
            aria-live="polite"
            className={`min-h-4 font-mono-wide text-xs ${status === "error" ? "text-error" : "text-gold-light"}`}
          >
            {statusMessage}
          </p>
        </form>
      </m.div>
    </SectionShell>
  );
}
