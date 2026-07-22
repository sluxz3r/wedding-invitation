"use client";

import { m } from "motion/react";
import { couple, weddingDateDisplay } from "@/app/data/content";
import { Marquee } from "@/app/_components/layout/Marquee";
import { Rule } from "@/app/_components/ui/Rule";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Footer() {
  return (
    <footer className="relative bg-ink px-6 py-16 text-paper sm:px-10 lg:px-16">
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={fadeUp}
      >
        <Marquee
          text={`${couple.partnerOne} & ${couple.partnerTwo} — ${weddingDateDisplay}`}
          className="mb-16 -mx-6 sm:-mx-10 lg:-mx-16"
        />
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <p className="font-display text-3xl italic">Sampai jumpa di hari bahagia kami.</p>
          <nav aria-label="Navigasi footer">
            <ul className="flex flex-wrap gap-6 font-mono-wide text-xs uppercase tracking-[0.2em]">
              <li>
                <a href="#top" data-cursor="Lihat" className="cursor-pointer hover:text-gold-light">
                  Atas
                </a>
              </li>
              <li>
                <a href="#details" data-cursor="Lihat" className="cursor-pointer hover:text-gold-light">
                  Acara
                </a>
              </li>
              <li>
                <a href="#ucapan" data-cursor="Lihat" className="cursor-pointer hover:text-gold-light">
                  Ucapan
                </a>
              </li>
              <li>
                <a href="#registry" data-cursor="Lihat" className="cursor-pointer hover:text-gold-light">
                  Hadiah
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <Rule className="mx-auto mt-16 max-w-6xl" />
        <p className="mx-auto mt-6 max-w-6xl font-mono-wide text-[11px] uppercase tracking-[0.2em] text-paper-dim">
          Dibuat dengan penuh cinta, untuk {couple.partnerOne} &amp; {couple.partnerTwo}.
        </p>
      </m.div>
    </footer>
  );
}
