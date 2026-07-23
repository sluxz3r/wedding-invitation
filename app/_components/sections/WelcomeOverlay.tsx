"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { useInvitationOverlay } from "@/app/_components/providers/InvitationOverlayProvider";
import { couple, weddingDateDisplay, coverPhoto } from "@/app/data/content";
import { Button } from "@/app/_components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

// Staged, cinematic reveal — each foreground element rises in sequence once
// the overlay mounts. `reducedMotion="user"` (MotionConfig) neutralises the
// transforms automatically, leaving a clean fade for those who ask for it.
const stage = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } },
};

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function WelcomeOverlay() {
  const { isOpen, close } = useInvitationOverlay();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) buttonRef.current?.focus();
  }, [isOpen]);

  // Escape closes the invitation, matching native modal expectations.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-heading"
          initial="hidden"
          animate="visible"
          variants={stage}
          exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.8, ease: EASE } }}
          className="fixed inset-0 z-[90] overflow-hidden text-paper"
        >
          {/* background — solid ink base prevents any flash of the hero beneath */}
          <div aria-hidden="true" className="absolute inset-0 bg-ink">
            {coverPhoto.src ? (
              // outer: one-shot entrance push-in · inner: slow perpetual drift
              <m.div
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.8, ease: EASE }}
                className="absolute inset-0"
              >
                <m.div
                  animate={{ scale: [1, 1.07] }}
                  transition={{ duration: 24, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={coverPhoto.src}
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[center_20%]"
                  />
                </m.div>
              </m.div>
            ) : (
              <div className="flex h-full w-full items-center justify-center overflow-hidden">
                <span className="select-none font-display text-[46vw] italic leading-none text-gold-light/10 sm:text-[26vw]">
                  {couple.partnerOne[0]}
                  {couple.partnerTwo[0]}
                </span>
              </div>
            )}

            {/* scrims: keep text legible over any photo, plus a warm gold ambient glow */}
            <div className="absolute inset-0 bg-ink/40" />
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 62%, rgba(201,162,39,0.16), transparent 70%)",
              }}
            />
          </div>

          {/* foreground */}
          <div className="relative z-10 flex min-h-full flex-col items-center justify-center gap-7 overflow-y-auto px-6 py-16 text-center sm:gap-8">
            <m.p
              variants={rise}
              className="gold-shimmer font-mono-wide text-[11px] uppercase tracking-[0.4em] text-gold-light sm:text-xs"
            >
              The Wedding Of
            </m.p>

            <m.div variants={rise} className="flex flex-col items-center">
              <h1
                id="welcome-heading"
                aria-label={`${couple.partnerOne} & ${couple.partnerTwo}`}
                className="font-display leading-[0.95]"
              >
                <span aria-hidden="true">
                  <span className="block text-6xl italic sm:text-7xl lg:text-8xl">
                    {couple.partnerOne}
                  </span>
                  <span className="shine-sweep my-1 block text-3xl italic sm:text-4xl lg:text-5xl">
                    &amp;
                  </span>
                  <span className="block text-6xl italic sm:text-7xl lg:text-8xl">
                    {couple.partnerTwo}
                  </span>
                </span>
              </h1>
              <p className="mt-5 max-w-xs font-display text-sm italic leading-relaxed text-paper-dim sm:max-w-md sm:text-base">
                {couple.partnerOneFull} &amp; {couple.partnerTwoFull}
              </p>
            </m.div>

            {/* ornamental divider */}
            <m.div variants={rise} aria-hidden="true" className="flex items-center gap-4">
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/60 sm:w-20" />
              <span className="h-1.5 w-1.5 rotate-45 border border-gold-light bg-gold/25" />
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/60 sm:w-20" />
            </m.div>

            <m.p
              variants={rise}
              className="font-mono-wide text-xs uppercase tracking-[0.3em] text-gold-light"
            >
              {weddingDateDisplay}
            </m.p>

            {/* CTA */}
            <m.div variants={rise} className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 animate-pulse rounded-full bg-gold/25 blur-xl"
              />
              <Button ref={buttonRef} type="button" variant="primary" onClick={close} className="gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.98l7.5-4.04a2.25 2.25 0 0 1 2.134 0l7.5 4.04a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                  />
                </svg>
                Open Invitation
              </Button>
            </m.div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
