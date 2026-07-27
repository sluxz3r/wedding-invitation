"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { SectionShell } from "@/app/_components/layout/SectionShell";
import { CornerFrame } from "@/app/_components/ui/CornerFrame";
import { handleSpotlightMove } from "@/app/_lib/spotlight";
import { weddingDateISO } from "@/app/data/content";

type Remaining = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function getRemaining(target: number): Remaining {
  const diff = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff <= 0,
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

function FlipNumber({ value }: { value: string }) {
  return (
    <span className="relative inline-block overflow-hidden text-center">
      {/* invisible sizer — reserves the box so the animated value can be absolutely positioned */}
      <span aria-hidden="true" className="invisible">
        {value}
      </span>
      <AnimatePresence initial={false}>
        <m.span
          key={value}
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-60%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {value}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

export function Countdown() {
  const target = new Date(weddingDateISO).getTime();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    function tick() {
      setRemaining(getRemaining(target));
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const display = remaining ?? { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

  // Derived directly from render (not stored via an effect): since this string
  // only depends on days/hours, its text content — and thus what a screen
  // reader announces from the aria-live region below — only actually changes
  // when the coarse day/hour figures do, even though it recomputes every second.
  const announced = remaining
    ? remaining.done
      ? "The day we've waited for is here."
      : `${remaining.days} days and ${remaining.hours} hours to go.`
    : "";

  const units = [
    { label: "Days", value: display.days },
    { label: "Hours", value: display.hours },
    { label: "Minutes", value: display.minutes },
    { label: "Seconds", value: display.seconds },
  ];

  return (
    <SectionShell id="countdown" index="03" eyebrow="Countdown" alt>
      <m.div
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={fadeUp}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
      >
        {units.map((unit) => (
          <div
            key={unit.label}
            onMouseMove={handleSpotlightMove}
            className="spotlight relative border border-gold/30 bg-ink p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.35)] active:-translate-y-1 active:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.35)]"
          >
            <CornerFrame />
            <span className="block font-display text-5xl tabular-nums text-gold-light sm:text-6xl">
              <FlipNumber value={String(unit.value).padStart(2, "0")} />
            </span>
            <span className="mt-2 block font-mono-wide text-xs uppercase tracking-[0.2em] text-paper-dim">
              {unit.label}
            </span>
          </div>
        ))}
      </m.div>
      <p role="status" aria-live="polite" className="sr-only">
        {announced}
      </p>
    </SectionShell>
  );
}
