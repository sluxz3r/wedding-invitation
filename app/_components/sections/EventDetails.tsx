"use client";

import { m } from "motion/react";
import { SectionShell } from "@/app/_components/layout/SectionShell";
import { Button } from "@/app/_components/ui/Button";
import { Rule } from "@/app/_components/ui/Rule";
import { CornerFrame } from "@/app/_components/ui/CornerFrame";
import { RevealHeading } from "@/app/_components/ui/RevealHeading";
import { couple, events, venueMapUrl } from "@/app/data/content";
import { googleCalendarUrl } from "@/app/_lib/calendar";
import { handleSpotlightMove } from "@/app/_lib/spotlight";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function EventDetails() {
  const title = `${couple.partnerOneFull} & ${couple.partnerTwoFull}`;
  const [akad, resepsi] = events;

  // Same location, one occasion — a single combined calendar entry rather
  // than one per card.
  const calendarUrl = googleCalendarUrl({
    title: `Akad & Resepsi — ${title}`,
    description: `Akad Nikah pukul ${akad.time}, dilanjutkan Resepsi pukul ${resepsi.time}.`,
    location: akad.address,
    startISO: akad.dateTimeISO,
    endISO: resepsi.endTimeISO,
  });

  return (
    <SectionShell id="details" index="01" eyebrow="Acara" alt>
      <RevealHeading className="max-w-2xl font-display text-4xl italic leading-tight sm:text-5xl">
        Dua rangkaian acara, satu hari penuh berkah.
      </RevealHeading>
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {events.map((event, i) => (
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
            <span className="font-mono-wide text-xs uppercase tracking-[0.25em] text-gold-light">
              {event.label}
            </span>
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
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button variant="outline" href={calendarUrl} target="_blank" rel="noopener noreferrer">
          Tambah ke Kalender
        </Button>
        <Button variant="outline" href={venueMapUrl} target="_blank" rel="noopener noreferrer">
          Lihat Lokasi di Google Maps
        </Button>
      </div>
    </SectionShell>
  );
}
