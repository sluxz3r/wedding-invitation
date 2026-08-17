"use client";

import { m } from "motion/react";
import { couple, partnerOneFormal, partnerTwoFormal } from "@/app/data/content";
import { EyebrowLabel } from "@/app/_components/ui/EyebrowLabel";
import { Rule } from "@/app/_components/ui/Rule";
import { useInvitationOverlay } from "@/app/_components/providers/InvitationOverlayProvider";
import { useLanguage } from "@/app/_components/providers/LanguageProvider";

const nameContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.2 } },
};

const charVariant = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const lineageVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.5 },
  },
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
  const { t, content } = useLanguage();
  const { parents, headline } = content;
  const { isOpen } = useInvitationOverlay();

  return (
    // pt keeps its 7rem clearance below the header now that the section starts
    // at the true top of the display rather than below the status bar
    <section className="relative flex min-h-dvh flex-col justify-between overflow-hidden border-b border-gold/15 bg-ink px-6 pb-10 pt-[calc(env(safe-area-inset-top)+7rem)] text-paper sm:px-10 lg:px-16">
      <div className="flex flex-1 flex-col justify-center">
        <EyebrowLabel index="00" className="mb-6">
          {headline.dateDisplay} — {headline.venueName}
        </EyebrowLabel>

        <m.h1
          initial="hidden"
          animate={isOpen ? "hidden" : "visible"}
          variants={nameContainer}
          aria-label={`${couple.partnerOne} & ${couple.partnerTwo}`}
          className="font-display font-medium tracking-tight"
        >
          <span aria-hidden="true">
            {/* Groom + his parents */}
            <span className="block text-[16vw] leading-[0.85] sm:text-[11vw] lg:text-[7.2vw]">
              <KineticWord word={couple.partnerOne} />
            </span>
            <m.span
              variants={lineageVariant}
              className="mt-4 block max-w-md font-display text-lg font-normal italic leading-snug text-gold-light sm:text-xl"
            >
              {partnerOneFormal}
            </m.span>
            <m.span
              variants={lineageVariant}
              className="mt-3 block max-w-md font-body text-sm font-normal leading-relaxed text-paper-dim sm:text-base"
            >
              <span className="font-mono-wide text-[11px] uppercase tracking-[0.25em] text-gold-light/80">
                {t.hero.sonOf}
              </span>
              <br />
              {parents.groom}
            </m.span>

            <span className="shine-sweep my-5 block text-[6vw] italic leading-[1] sm:text-[4vw] lg:text-[2.8vw]">
              &amp;
            </span>

            {/* Bride + her parents */}
            <span className="block text-[16vw] leading-[0.85] sm:text-[11vw] lg:text-[7.2vw]">
              <KineticWord word={couple.partnerTwo} />
            </span>
            <m.span
              variants={lineageVariant}
              className="mt-4 block max-w-md font-display text-lg font-normal italic leading-snug text-gold-light sm:text-xl"
            >
              {partnerTwoFormal}
            </m.span>
            <m.span
              variants={lineageVariant}
              className="mt-3 block max-w-md font-body text-sm font-normal leading-relaxed text-paper-dim sm:text-base"
            >
              <span className="font-mono-wide text-[11px] uppercase tracking-[0.25em] text-gold-light/80">
                {t.hero.daughterOf}
              </span>
              <br />
              {parents.bride}
            </m.span>
          </span>
        </m.h1>

        {/* Versi visual di atas aria-hidden — teks ini yang dibacakan screen reader */}
        <p className="sr-only">
          {t.hero.lineage(partnerOneFormal, parents.groom, partnerTwoFormal, parents.bride)}
        </p>

        <Rule className="mt-8 max-w-40" />

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 max-w-md font-body text-lg text-paper-dim"
        >
          <p>{t.hero.invitation}</p>
        </m.div>
      </div>

      <m.a
        href="#details"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mx-auto flex cursor-pointer flex-col items-center gap-2 font-mono-wide text-xs uppercase tracking-[0.3em] text-paper-dim hover:text-gold-light"
      >
        {t.hero.scroll}
        <span aria-hidden="true" className="block h-8 w-px animate-pulse bg-gold-light" />
      </m.a>
    </section>
  );
}
