"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { Locale } from "@/app/_lib/i18n";
import {
  getLocaleServerSnapshot,
  getLocaleSnapshot,
  setLocale,
  subscribeLocale,
} from "@/app/_lib/localeStore";
import { getContent, type WeddingContent } from "@/app/data/content";
import { getDictionary, type Dictionary } from "@/app/data/dictionary";

type LanguageValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Interface strings for the current language. */
  t: Dictionary;
  /** Wedding details for the current language. */
  content: WeddingContent;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Hydration renders the baseline (matching the server HTML), then React swaps
  // in the guest's real language on the same tick — while the welcome overlay's
  // entrance animation still has every word at opacity 0, so nothing is seen
  // changing.
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot,
  );

  // The document's own language is an accessibility fact, not decoration —
  // screen readers choose their pronunciation from it. <html> is rendered by a
  // server component, so this is the only place that can keep it honest.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageValue>(
    () => ({
      locale,
      setLocale,
      t: getDictionary(locale),
      content: getContent(locale),
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
