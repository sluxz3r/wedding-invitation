import { cn } from "@/app/_lib/cn";

function Track({ text }: { text: string }) {
  const repeated = Array.from({ length: 6 }, () => text).join("  •  ");
  return (
    <span className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 font-display text-3xl italic sm:text-5xl">
      {repeated}
    </span>
  );
}

/**
 * Purely decorative — restates information already present as real text
 * elsewhere on the page (hero names/date, section headings), so the whole
 * band is hidden from assistive tech rather than read twice.
 */
export function Marquee({ text, className }: { text: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("overflow-hidden border-y border-gold/20 bg-ink-alt py-4 text-gold-light", className)}
    >
      <div className="marquee-track flex w-max">
        <Track text={text} />
        <Track text={text} />
      </div>
    </div>
  );
}
