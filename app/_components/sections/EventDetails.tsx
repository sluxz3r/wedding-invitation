"use client";

import { m } from "motion/react";
import { SectionShell } from "@/app/_components/layout/SectionShell";
import { Button } from "@/app/_components/ui/Button";
import { Rule } from "@/app/_components/ui/Rule";
import { CornerFrame } from "@/app/_components/ui/CornerFrame";
import { RevealHeading } from "@/app/_components/ui/RevealHeading";
import { couple, hasConcluded, venueMapUrl } from "@/app/data/content";
import { useLanguage } from "@/app/_components/providers/LanguageProvider";
import { googleCalendarUrl } from "@/app/_lib/calendar";
import { handleSpotlightMove } from "@/app/_lib/spotlight";
import { useNow } from "@/app/_lib/useNow";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function EventDetails() {
  const { t, content } = useLanguage();
  const { events, weddingDateDisplay } = content;
  const title = `${couple.partnerOneFull} & ${couple.partnerTwoFull}`;
  const [akad, resepsi] = events;

  // Which events are behind us is answered from the guest's own clock, so it
  // is only known after mount — until then nothing is marked as past, the
  // honest default for the prerendered HTML.
  const now = useNow();
  const dayIsOver = now !== null && hasConcluded(resepsi.endTimeISO, now);

  // Same location, one occasion — a single combined calendar entry rather
  // than one per card. The entry is written in whichever language the guest is
  // reading, since that is what lands in their calendar.
  const calendarUrl = googleCalendarUrl({
    title: t.events.calendarTitle(title),
    description: t.events.calendarDescription(akad.time, resepsi.time),
    location: akad.address,
    startISO: akad.dateTimeISO,
    endISO: resepsi.endTimeISO,
  });

  return (
    <SectionShell id="details" index="01" eyebrow={t.sections.details} alt>
      <RevealHeading className="max-w-2xl font-display text-4xl italic leading-tight sm:text-5xl">
        {t.events.heading}
      </RevealHeading>
      {/* The cards below carry only a time, and the invitation now leads with
          the ngunduh mantu — so the ceremony's own date is stated here, once,
          for the two events that share it. */}
      <p className="mt-6 font-mono-wide text-xs uppercase tracking-[0.25em] text-gold-light">
        {weddingDateDisplay}
      </p>
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {events.map((event, i) => {
          const concluded = now !== null && hasConcluded(event.endTimeISO, now);

          return (
            <m.div
              key={event.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleSpotlightMove}
              className={`spotlight relative border border-gold/25 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.35)] active:-translate-y-1 active:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.35)] ${i === 1 ? "lg:mt-16" : ""}`}
            >
              <CornerFrame />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono-wide text-xs uppercase tracking-[0.25em] text-gold-light">
                  {event.label}
                </span>
                {concluded ? (
                  <span className="border border-gold/30 bg-gold/10 px-2 py-1 font-mono-wide text-[10px] uppercase tracking-[0.2em] text-paper-dim">
                    {t.events.concluded}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 font-display text-3xl italic">{event.time}</p>
              <p className="mt-2 font-body text-lg">{event.venueName}</p>
              <p className="font-body text-sm text-paper-dim">{event.address}</p>
              {event.note ? (
                <>
                  <Rule className="my-6" />
                  <p className="font-body text-sm text-paper-dim">{event.note}</p>
                </>
              ) : null}
            </m.div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {/* Nothing left to save to a calendar once the day is behind us — the
            map stays, since the place is still worth knowing. */}
        {dayIsOver ? null : (
          <Button variant="outline" href={calendarUrl} target="_blank" rel="noopener noreferrer">
            {t.events.addToCalendar}
          </Button>
        )}
        <Button variant="outline" href={venueMapUrl} target="_blank" rel="noopener noreferrer">
          {t.events.viewOnMaps}
        </Button>
      </div>
    </SectionShell>
  );
}
