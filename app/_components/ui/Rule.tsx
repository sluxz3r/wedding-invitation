import { cn } from "@/app/_lib/cn";

export function Rule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("gold-shimmer h-px w-full bg-gold/35", className)} />;
}
