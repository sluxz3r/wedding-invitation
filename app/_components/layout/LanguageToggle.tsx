"use client";

import { locales, localeLabels, localeNames } from "@/app/_lib/i18n";
import { useLanguage } from "@/app/_components/providers/LanguageProvider";
import { cn } from "@/app/_lib/cn";

/**
 * Both languages stated side by side, the current one filled in — a guest can
 * see which they are reading and reach the other in one tap, without opening a
 * menu. Two options is few enough that hiding one behind a dropdown would only
 * add a step.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={cn("inline-flex items-center border border-gold/30", className)}
    >
      {locales.map((code, i) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            // The two buttons are alternatives, not independent switches, so
            // the pressed state is what carries "you are reading this one".
            aria-pressed={active}
            aria-label={t.language.switchTo(localeNames[code])}
            data-cursor={t.cursor.click}
            // A tinted panel rather than a solid gold one: filled, this sat
            // louder in the header than the couple's own name.
            className={cn(
              "min-h-11 min-w-11 cursor-pointer px-3 font-mono-wide text-[11px] uppercase tracking-[0.2em] transition duration-200",
              i > 0 && "border-l border-gold/30",
              active
                ? "bg-gold/15 text-gold-light"
                : "text-paper-dim hover:bg-gold/10 hover:text-gold-light",
            )}
          >
            {localeLabels[code]}
          </button>
        );
      })}
    </div>
  );
}
