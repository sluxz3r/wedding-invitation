import { cn } from "@/app/_lib/cn";
import { EyebrowLabel } from "@/app/_components/ui/EyebrowLabel";

export function SectionShell({
  id,
  index,
  eyebrow,
  alt = false,
  className,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  alt?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden border-b border-gold/15 px-6 py-20 text-paper sm:px-10 lg:px-16 lg:py-28",
        alt ? "bg-ink-alt" : "bg-ink",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="ghost-number pointer-events-none absolute -top-10 -right-4 select-none font-display text-[13rem] leading-none sm:text-[16rem] lg:-top-16 lg:text-[20rem]"
      >
        {index}
      </span>
      <div className="relative z-10 mx-auto max-w-6xl">
        <EyebrowLabel index={index} className="mb-10">
          {eyebrow}
        </EyebrowLabel>
        {children}
      </div>
    </section>
  );
}
