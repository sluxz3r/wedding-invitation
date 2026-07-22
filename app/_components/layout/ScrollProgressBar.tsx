"use client";

import { m, useScroll } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gold"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
