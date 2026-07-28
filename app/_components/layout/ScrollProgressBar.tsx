"use client";

import { m, useScroll } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      aria-hidden="true"
      // sits on the header's top edge — offset past the status bar, which
      // top-0 now falls behind
      className="fixed inset-x-0 top-[env(safe-area-inset-top)] z-[60] h-[3px] origin-left bg-gold"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
