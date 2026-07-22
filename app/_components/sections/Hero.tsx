"use client";

import { m } from "motion/react";
import { couple, parents, weddingDateDisplay, events } from "@/app/data/content";
import { EyebrowLabel } from "@/app/_components/ui/EyebrowLabel";
import { Rule } from "@/app/_components/ui/Rule";
import { useInvitationOverlay } from "@/app/_components/providers/InvitationOverlayProvider";

const nameContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.2 } },
};

const charVariant = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

function KineticWord({ word }: { word: string }) {
  return (
    <span className="inline-flex">
      {word.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[1.25]">
          <m.span variants={charVariant} className="inline-block">
            {char}
          </m.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const akad = events[0];
  const { isOpen } = useInvitationOverlay();

  return (
    <section className="relative flex min-h-dvh flex-col justify-between overflow-hidden border-b border-gold/15 bg-ink px-6 pb-10 pt-28 text-paper sm:px-10 lg:px-16">
      <div className="flex flex-1 flex-col justify-center">
        <EyebrowLabel index="00" className="mb-6">
          {weddingDateDisplay} — {akad.venueName}
        </EyebrowLabel>

        <m.h1
          initial="hidden"
          animate={isOpen ? "hidden" : "visible"}
          variants={nameContainer}
          aria-label={`${couple.partnerOne} & ${couple.partnerTwo}`}
          className="font-display text-[16vw] font-medium leading-[0.85] tracking-tight sm:text-[11vw] lg:text-[7.2vw]"
        >
          <span aria-hidden="true">
            <KineticWord word={couple.partnerOne} />
            <span className="shine-sweep block text-[6vw] italic leading-[1.4] sm:text-[4vw] lg:text-[2.8vw]">
              &amp;
            </span>
            <KineticWord word={couple.partnerTwo} />
          </span>
        </m.h1>

        <Rule className="mt-6 max-w-40" />

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 max-w-md font-body text-paper-dim"
        >
          <p className="text-lg">
            Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk
            menghadiri acara pernikahan kami.
          </p>
          <p className="mt-4 font-mono-wide text-xs uppercase tracking-[0.15em]">
            Putra {parents.groom}
            <br />
            &amp; Putri {parents.bride}
          </p>
        </m.div>
      </div>

      <m.a
        href="#details"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mx-auto flex cursor-pointer flex-col items-center gap-2 font-mono-wide text-xs uppercase tracking-[0.3em] text-paper-dim hover:text-gold-light"
      >
        Gulir
        <span aria-hidden="true" className="block h-8 w-px animate-pulse bg-gold-light" />
      </m.a>
    </section>
  );
}
