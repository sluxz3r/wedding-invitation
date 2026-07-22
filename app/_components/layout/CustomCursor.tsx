"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function evaluate() {
      const active = pointerFine.matches && !reducedMotion.matches;
      setEnabled(active);
      document.documentElement.classList.toggle("custom-cursor-active", active);
    }

    evaluate();
    pointerFine.addEventListener("change", evaluate);
    reducedMotion.addEventListener("change", evaluate);
    return () => {
      pointerFine.removeEventListener("change", evaluate);
      reducedMotion.removeEventListener("change", evaluate);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      const labelEl = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelEl?.dataset.cursor ?? null);
    }

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div
      layout
      aria-hidden="true"
      transition={{ layout: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
      className="pointer-events-none fixed left-0 top-0 z-[1000] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full border-2 border-gold-light bg-ink/40"
      style={{ x: springX, y: springY }}
    >
      {label ? (
        <span className="px-4 py-2 font-mono-wide text-[10px] uppercase tracking-[0.2em] text-gold-light">
          {label}
        </span>
      ) : (
        <span className="block h-6 w-6" />
      )}
    </m.div>
  );
}
