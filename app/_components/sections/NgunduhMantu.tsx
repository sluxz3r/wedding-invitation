"use client";

import { m } from "motion/react";
import { SectionShell } from "@/app/_components/layout/SectionShell";
import { Button } from "@/app/_components/ui/Button";
import { Rule } from "@/app/_components/ui/Rule";
import { CornerFrame } from "@/app/_components/ui/CornerFrame";
import { RevealHeading } from "@/app/_components/ui/RevealHeading";
import { couple } from "@/app/data/content";
import { useLanguage } from "@/app/_components/providers/LanguageProvider";
import { googleCalendarUrl } from "@/app/_lib/calendar";
import { handleSpotlightMove } from "@/app/_lib/spotlight";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function NgunduhMantu() {
  const { t, content } = useLanguage();
  const { ngunduhMantu } = content;
  const title = `${couple.partnerOneFull} & ${couple.partnerTwoFull}`;

  const calendarUrl = googleCalendarUrl({
    title: t.ngunduhMantu.calendarTitle(ngunduhMantu.label, title),
    description: t.ngunduhMantu.calendarDescription(
      ngunduhMantu.label,
      ngunduhMantu.venueName,
      ngunduhMantu.time,
    ),
    location: ngunduhMantu.address,
    startISO: ngunduhMantu.dateTimeISO,
    endISO: ngunduhMantu.endTimeISO,
  });

  return (
    <SectionShell id="ngunduh-mantu" index="02" eyebrow={ngunduhMantu.label}>
      <RevealHeading className="max-w-2xl font-display text-4xl italic leading-tight sm:text-5xl">
        {t.ngunduhMantu.heading}
      </RevealHeading>

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={fadeUp}
        onMouseMove={handleSpotlightMove}
        className="spotlight relative mt-16 border border-gold/25 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.35)] active:-translate-y-1 active:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.35)] lg:max-w-2xl"
      >
        <CornerFrame />
        <span className="font-mono-wide text-xs uppercase tracking-[0.25em] text-gold-light">
          {ngunduhMantu.dateDisplay}
        </span>
        <p className="mt-4 font-display text-3xl italic">{ngunduhMantu.time}</p>
        <p className="mt-2 font-body text-lg">{ngunduhMantu.venueName}</p>
        <p className="font-body text-sm text-paper-dim">{ngunduhMantu.address}</p>
        {ngunduhMantu.note ? (
          <>
            <Rule className="my-6" />
            <p className="font-body text-sm text-paper-dim">{ngunduhMantu.note}</p>
          </>
        ) : null}
      </m.div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button variant="outline" href={calendarUrl} target="_blank" rel="noopener noreferrer">
          {t.events.addToCalendar}
        </Button>
        <Button
          variant="outline"
          href={ngunduhMantu.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.events.viewOnMaps}
        </Button>
      </div>
    </SectionShell>
  );
}
