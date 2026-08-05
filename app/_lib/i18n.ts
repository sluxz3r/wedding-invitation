/**
 * Language plumbing — types, the server-render baseline, and how a visitor's
 * language is chosen on first load.
 *
 * Deliberately framework-light: there is no locale in the URL. Every section of
 * this site is a client component behind a full-screen welcome overlay, so a
 * language picked in the browser after hydration is both simpler and invisible
 * to the guest — the overlay's own entrance animation is still playing while
 * the switch happens.
 */

export const locales = ["id", "en"] as const;

export type Locale = (typeof locales)[number];

/**
 * What the server renders, and therefore what the page title, share
 * description and og:image are written in — those are baked at build time and
 * cannot follow the reader. Indonesian, because the invitation is shared into
 * Indonesian group chats far more often than not. Flip this one constant to
 * move the share card (and the pre-hydration paint) to English.
 */
export const baselineLocale: Locale = "id";

export const localeLabels: Record<Locale, string> = {
  id: "ID",
  en: "EN",
};

/** Full, in-language name — used for the toggle's accessible label. */
export const localeNames: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
};

/** og:locale wants a full language_TERRITORY tag, not a bare language code. */
export const openGraphLocales: Record<Locale, string> = {
  id: "id_ID",
  en: "en_US",
};

const STORAGE_KEY = "wedding-locale";

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * A guest's language, in order of authority: what they last chose here, then
 * what their browser asks for, then the baseline. Runs on the client only —
 * calling it during render would desync the server HTML.
 */
export function resolveInitialLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Private browsing can throw on localStorage access — fall through.
  }

  // navigator.languages is ordered by preference: "id-ID" matches "id".
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }

  return baselineLocale;
}

export function persistLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Not being able to remember the choice is not worth an error.
  }
}
