"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { music } from "@/app/data/content";

const TARGET_VOLUME = 0.7;
const FADE_STEP_MS = 40;
const FADE_IN_MS = 900;
const FADE_OUT_MS = 500;

type MusicValue = {
  /** false when no track is configured, or the file failed to load */
  isAvailable: boolean;
  isPlaying: boolean;
  /** start playback — must be called straight from a click/tap handler */
  play: () => void;
  toggle: () => void;
};

const MusicContext = createContext<MusicValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const stopFade = useCallback(() => {
    if (fadeRef.current === null) return;
    window.clearInterval(fadeRef.current);
    fadeRef.current = null;
  }, []);

  // Ramp the volume rather than cutting it — a track that snaps to full level
  // (or to silence) mid-page is jarring next to everything else here.
  const fadeTo = useCallback(
    (target: number, durationMs: number, onDone?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;
      stopFade();

      const steps = Math.max(1, Math.round(durationMs / FADE_STEP_MS));
      const delta = (target - audio.volume) / steps;

      fadeRef.current = window.setInterval(() => {
        const next = audio.volume + delta;
        const done = delta >= 0 ? next >= target : next <= target;
        audio.volume = done ? target : Math.min(1, Math.max(0, next));
        if (!done) return;
        stopFade();
        onDone?.();
      }, FADE_STEP_MS);
    },
    [stopFade],
  );

  useEffect(() => stopFade, [stopFade]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Cancel any in-flight fade-out first, or its completion callback would
    // pause the track we are starting right now.
    stopFade();
    audio.volume = 0;
    // Kept synchronous inside the originating gesture — Safari revokes the
    // autoplay grant the moment the call is deferred past the handler.
    audio.play().then(
      () => fadeTo(TARGET_VOLUME, FADE_IN_MS),
      () => setIsPlaying(false),
    );
  }, [fadeTo, stopFade]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(0, FADE_OUT_MS, () => audio.pause());
  }, [fadeTo]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  const value = useMemo<MusicValue>(
    () => ({ isAvailable: Boolean(music.src) && !hasError, isPlaying, play, toggle }),
    [hasError, isPlaying, play, toggle],
  );

  return (
    <MusicContext.Provider value={value}>
      {music.src ? (
        <audio
          ref={audioRef}
          src={music.src}
          loop
          preload="auto"
          // The element's own events are the source of truth for isPlaying:
          // the OS can pause us at any time (a call, another app taking the
          // audio session), and the UI has to follow rather than guess.
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            setHasError(true);
            setIsPlaying(false);
          }}
        />
      ) : null}
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
}
