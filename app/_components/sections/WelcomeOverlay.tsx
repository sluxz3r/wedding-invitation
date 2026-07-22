"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { useInvitationOverlay } from "@/app/_components/providers/InvitationOverlayProvider";
import { couple, weddingDateDisplay, coverPhoto } from "@/app/data/content";
import { Rule } from "@/app/_components/ui/Rule";
import { Button } from "@/app/_components/ui/Button";

export function WelcomeOverlay() {
  const { isOpen, close } = useInvitationOverlay();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) buttonRef.current?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-heading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[90] overflow-hidden text-paper"
        >
          {/* full-bleed cover photo (or placeholder) */}
          <div aria-hidden="true" className="absolute inset-0">
            {coverPhoto.src ? (
              <Image
                src={coverPhoto.src}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_20%]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center overflow-hidden bg-ink">
                <span className="select-none font-display text-[46vw] italic leading-none text-gold-light/10 sm:text-[26vw]">
                  {couple.partnerOne[0]}
                  {couple.partnerTwo[0]}
                </span>
              </div>
            )}
            {/* scrim: keeps text legible regardless of the photo's own contrast */}
            <div className="absolute inset-0 bg-ink/55" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink to-transparent" />
          </div>

          {/* foreground content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-between overflow-y-auto px-6 py-12 text-center">
            <p className="font-mono-wide text-xs uppercase tracking-[0.35em] text-gold-light">
              The Wedding Of
            </p>

            <div className="border border-gold-light/25 bg-gold/10 px-8 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-12 sm:py-10">
              <h1
                id="welcome-heading"
                className="font-display text-4xl italic leading-tight sm:text-5xl"
              >
                {couple.partnerOneFull}
                <br />
                <span aria-hidden="true" className="shine-sweep">
                  &amp;
                </span>
                <br />
                {couple.partnerTwoFull}
              </h1>
              <p className="mt-4 font-mono-wide text-xs uppercase tracking-[0.2em] text-paper-dim">
                {weddingDateDisplay}
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <Rule className="w-full max-w-32" />
              <Button
                ref={buttonRef}
                type="button"
                variant="outline"
                onClick={close}
                className="border-2 border-gold-light"
              >
                Buka Undangan
              </Button>
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
