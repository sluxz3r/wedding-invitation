"use client";

import { AnimatePresence, m } from "motion/react";
import { couple, music } from "@/app/data/content";
import { useInvitationOverlay } from "@/app/_components/providers/InvitationOverlayProvider";
import { useMusic } from "@/app/_components/providers/MusicProvider";
import { cn } from "@/app/_lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A record on a turntable, parked bottom-left: the platter turns while the
 * track plays and holds its angle when paused (see .vinyl-spin in globals.css
 * — animation-play-state, not a transform, so it never snaps back to zero).
 *
 * It only appears once the welcome overlay is out of the way, because until
 * then the overlay's own CTA is what starts the music.
 */
export function VinylPlayer() {
  const { isOpen } = useInvitationOverlay();
  const { isAvailable, isPlaying, toggle } = useMusic();

  if (!isAvailable) return null;

  const track = music.artist ? `${music.title} — ${music.artist}` : music.title;

  return (
    <AnimatePresence>
      {!isOpen ? (
        <m.div
          initial={{ opacity: 0, y: 28, scale: 0.7 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, delay: 0.55, ease: EASE },
          }}
          exit={{ opacity: 0, y: 28, scale: 0.7, transition: { duration: 0.3, ease: EASE } }}
          // clears the home indicator and, in landscape, the display cutout
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] left-[calc(env(safe-area-inset-left)+1.25rem)] z-[80]"
        >
          <button
            type="button"
            onClick={toggle}
            data-cursor={isPlaying ? "Pause" : "Play"}
            // The label carries the state, so no aria-pressed — that would
            // have screen readers announce the toggle twice, and disagree.
            aria-label={isPlaying ? `Pause music — ${track}` : `Play music — ${track}`}
            className="group flex cursor-pointer items-center"
          >
            <span className="relative block h-16 w-16 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]">
              {/* warm halo, only while the track is running */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -inset-2 rounded-full bg-gold/25 blur-lg transition-opacity duration-700",
                  isPlaying ? "opacity-100" : "opacity-0",
                )}
              />

              {/* the platter itself — grooves and label turn together */}
              <span
                aria-hidden="true"
                data-paused={!isPlaying}
                className="vinyl-disc vinyl-spin absolute inset-0 rounded-full shadow-[0_6px_20px_-6px_rgba(0,0,0,0.9)] ring-1 ring-gold/30"
              >
                <span className="absolute inset-[32%] flex items-center justify-center rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-light">
                  <span className="font-display text-[9px] italic leading-none text-ink sm:text-[10px]">
                    {couple.partnerOne[0]}
                    {couple.partnerTwo[0]}
                  </span>
                </span>
                {/* spindle hole */}
                <span className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
              </span>

              {/* light-catch — deliberately outside the spinning layer, the way
                  a room light stays put while the record turns under it */}
              <span
                aria-hidden="true"
                className="vinyl-sheen pointer-events-none absolute inset-0 rounded-full"
              />

              {/* the affordance: a real control badge, visible without hover */}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-gold/70 bg-ink text-gold-light transition duration-200 group-hover:border-gold-light group-hover:bg-gold group-hover:text-ink"
              >
                {isPlaying ? (
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="currentColor">
                    <rect x="1.5" y="1" width="2.5" height="8" rx="0.5" />
                    <rect x="6" y="1" width="2.5" height="8" rx="0.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 10 10" className="ml-[1px] h-2.5 w-2.5" fill="currentColor">
                    <path d="M2 1.2 8.6 5 2 8.8Z" />
                  </svg>
                )}
              </span>
            </span>

            {/* now-playing chip — unfurls on hover, so it never sits over the
                page on touch, where there is no hover to retract it */}
            <span
              aria-hidden="true"
              className="ml-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 ease-[var(--ease-editorial)] pointer-fine:group-hover:ml-3 pointer-fine:group-hover:max-w-[15rem] pointer-fine:group-hover:opacity-100"
            >
              <span className="block border border-gold/40 bg-ink/80 px-3 py-2 font-mono-wide text-[10px] uppercase tracking-[0.2em] text-gold-light backdrop-blur-sm">
                {isPlaying ? "Now playing" : "Paused"} · {track}
              </span>
            </span>
          </button>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
