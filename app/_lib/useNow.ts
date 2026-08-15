import { useEffect, useState } from "react";

/**
 * The current time, or null until the component has mounted in a browser.
 *
 * This page is prerendered, so the clock can only be read after mount: asking
 * while rendering would bake the build-time answer into the HTML and disagree
 * with what the browser computes on hydration. Callers treat null as "not
 * known yet" and render the neutral state.
 *
 * It keeps ticking afterwards so a page left open still crosses the boundary it
 * is watching for. A minute of granularity is plenty for "has this passed?" —
 * the countdown keeps its own, finer clock.
 */
export function useNow(intervalMs = 60_000): number | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    function tick() {
      setNow(Date.now());
    }
    tick();
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return now;
}
