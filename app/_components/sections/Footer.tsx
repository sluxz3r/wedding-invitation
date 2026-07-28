"use client";

import { m } from "motion/react";
import { couple, weddingDateDisplay } from "@/app/data/content";
import { Marquee } from "@/app/_components/layout/Marquee";
import { Rule } from "@/app/_components/ui/Rule";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const links = [
  { href: "#top", label: "Top" },
  { href: "#details", label: "Events" },
  { href: "#ngunduh-mantu", label: "Ngunduh Mantu" },
  { href: "#ucapan", label: "Wishes" },
  { href: "#registry", label: "Gifts" },
];

// Same outlined-gold vocabulary as <Button variant="outline">, one size down:
// the footer links need to read as tappable on touch, where there is no hover
// to reveal them.
const chip =
  "inline-flex min-h-11 cursor-pointer items-center border border-gold/70 px-4 py-2 text-gold-light transition duration-200 hover:border-gold-light hover:bg-gold hover:text-ink hover:shadow-[0_0_28px_-4px_rgba(201,162,39,0.65)]";

export function Footer() {
  return (
    // pb clears the home indicator, which the page now extends behind
    <footer className="relative bg-ink px-6 pb-[calc(env(safe-area-inset-bottom)+4rem)] pt-16 text-paper sm:px-10 lg:px-16">
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
          <p className="font-display text-3xl italic">See you on our happy day.</p>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-3 font-mono-wide text-[11px] uppercase tracking-[0.2em] sm:justify-end sm:text-xs">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} data-cursor="View" className={chip}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Rule className="mx-auto mt-16 max-w-6xl" />
        <p className="mx-auto mt-6 max-w-6xl font-mono-wide text-[11px] uppercase tracking-[0.2em] text-paper-dim">
          Made with love, for {couple.partnerOne} &amp; {couple.partnerTwo}.
        </p>
      </m.div>
    </footer>
  );
}
