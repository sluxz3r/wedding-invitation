import { cn } from "@/app/_lib/cn";

export function EyebrowLabel({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "gold-shimmer inline-flex items-center gap-3 font-mono-wide text-xs uppercase tracking-[0.3em] text-gold-light sm:text-sm",
        className,
      )}
    >
      {index ? (
        <span aria-hidden="true" className="text-paper-dim">
          {index}
        </span>
      ) : null}
      {children}
    </span>
  );
}
