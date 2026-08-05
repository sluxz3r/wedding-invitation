/**
 * The chosen language, held outside React.
 *
 * It has to live here rather than in component state: the first value comes
 * from localStorage and the browser's own language list, neither of which the
 * server can see. Exposed as a `useSyncExternalStore` store so React reads the
 * baseline while hydrating and then adopts the real value without a
 * setState-inside-an-effect round trip.
 */

import { baselineLocale, persistLocale, resolveInitialLocale, type Locale } from "@/app/_lib/i18n";

// null until something asks on the client — resolving touches window.
let current: Locale | null = null;

const listeners = new Set<() => void>();

export function subscribeLocale(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

export function getLocaleSnapshot(): Locale {
  current ??= resolveInitialLocale();
  return current;
}

/** What the server rendered, so hydration has something stable to match. */
export function getLocaleServerSnapshot(): Locale {
  return baselineLocale;
}

/** An explicit choice by the guest — remembered, unlike a detected one. */
export function setLocale(next: Locale): void {
  if (current === next) return;
  current = next;
  persistLocale(next);
  for (const listener of listeners) listener();
}
