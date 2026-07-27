"use client";

import { useState } from "react";
import { m } from "motion/react";
import { SectionShell } from "@/app/_components/layout/SectionShell";
import { Button } from "@/app/_components/ui/Button";
import { CornerFrame } from "@/app/_components/ui/CornerFrame";
import { RevealHeading } from "@/app/_components/ui/RevealHeading";
import { handleSpotlightMove } from "@/app/_lib/spotlight";
import { registry } from "@/app/data/content";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Registry() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleCopy(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 2000);
    } catch {
      // Clipboard API unavailable — the account number is already visible as plain text above.
    }
  }

  return (
    <SectionShell id="registry" index="05" eyebrow="Gifts" alt>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={fadeUp}
      >
        <RevealHeading className="max-w-2xl font-display text-4xl italic leading-tight sm:text-5xl">
          Your blessing is the greatest gift. But should you wish to share a token of love —
        </RevealHeading>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:max-w-md">
          {registry.map((entry) => (
            <div
              key={entry.id}
              onMouseMove={handleSpotlightMove}
              className="spotlight relative border border-gold/30 bg-ink p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.35)] active:-translate-y-1 active:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.35)]"
            >
              <CornerFrame />
              <h3 className="font-display text-2xl">{entry.title}</h3>
              <p className="mt-3 font-body text-paper-dim">{entry.detail}</p>
              <div className="mt-6">
                {entry.kind === "bank" ? (
                  <Button variant="outline" onClick={() => handleCopy(entry.id, entry.ctaHref)}>
                    {copiedId === entry.id ? "Copied" : entry.ctaLabel}
                  </Button>
                ) : (
                  <Button variant="outline" href={entry.ctaHref} target="_blank" rel="noopener noreferrer">
                    {entry.ctaLabel}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </m.div>
    </SectionShell>
  );
}
