"use client";

import { m } from "motion/react";
import { cn } from "@/app/_lib/cn";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const word = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

/**
 * Section heading that reveals word-by-word on scroll — the same
 * mask-and-slide language as the Hero's kinetic name, applied more coarsely
 * (per word, not per character) so it stays cheap on a full sentence.
 */
export function RevealHeading({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: string;
}) {
  const words = children.split(" ");

  return (
    <Tag className={className} aria-label={children}>
      <m.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={container}
        className={cn("inline")}
      >
        {words.map((wordText, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] leading-[1.3]">
            <m.span variants={word} className="inline-block">
              {wordText}
              {i < words.length - 1 ? " " : ""}
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
