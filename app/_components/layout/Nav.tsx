"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { couple } from "@/app/data/content";
import { cn } from "@/app/_lib/cn";

const links = [
  { href: "#details", label: "Acara" },
  { href: "#ucapan", label: "Ucapan" },
  { href: "#registry", label: "Hadiah" },
];

const underline =
  "relative py-1 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-center after:bg-gold-light after:transition-transform after:duration-300 after:content-['']";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveHref(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-ink/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <a
          href="#top"
          data-cursor="Atas"
          className="font-display text-lg italic tracking-tight text-gold-light"
        >
          {couple.partnerOne[0]}
          <span aria-hidden="true">&</span>
          {couple.partnerTwo[0]}
        </a>

        <nav aria-label="Navigasi bagian" className="hidden md:block">
          <ul className="flex items-center gap-8 font-mono-wide text-xs uppercase tracking-[0.2em] text-paper">
            {links.map((link) => {
              const active = activeHref === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={active ? "true" : undefined}
                    data-cursor="Lihat"
                    className={cn(
                      "cursor-pointer",
                      underline,
                      active
                        ? "text-gold-light after:scale-x-100"
                        : "after:scale-x-0 hover:text-gold-light hover:after:scale-x-100 active:after:scale-x-100",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute inset-x-0 top-0 h-[2px] bg-gold-light transition-transform duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-[2px] bg-gold-light transition-transform duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <m.nav
            id="mobile-nav"
            aria-label="Navigasi bagian"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-gold/20 bg-ink/80 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4 font-mono-wide text-sm uppercase tracking-[0.2em] text-paper">
              {links.map((link) => {
                const active = activeHref === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "flex min-h-11 cursor-pointer items-center hover:text-gold-light",
                        active && "text-gold-light",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
