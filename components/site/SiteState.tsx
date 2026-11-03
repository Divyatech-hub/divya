"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const THEMES = ["dawn", "day", "dusk", "night"] as const;
export type Theme = (typeof THEMES)[number];
export type Mode = "story" | "skip";

type SiteState = {
  theme: Theme | null;
  mode: Mode | null;
  setTheme: (t: Theme) => void;
  setMode: (m: Mode) => void;
};

const SiteStateContext = createContext<SiteState | null>(null);

/** Picks a theme from the visitor's local clock. Also inlined in layout.tsx so it runs before paint. */
export function themeForHour(hour: number): Theme {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
}

export function SiteStateProvider({ children }: { children: React.ReactNode }) {
  // Start as null so server and client render the same HTML (no hydration mismatch),
  // then read the real values the inline script already put on <html>.
  const [theme, setThemeState] = useState<Theme | null>(null);
  const [mode, setModeState] = useState<Mode | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    setThemeState((root.dataset.theme as Theme) ?? "night");
    setModeState((root.dataset.mode as Mode) ?? "story");
  }, []);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("div-theme", t);
    } catch {
      // private mode or storage disabled: the theme still works for this visit
    }
    setThemeState(t);
  }, []);

  const setMode = useCallback((m: Mode) => {
    document.documentElement.dataset.mode = m;
    try {
      localStorage.setItem("div-mode", m);
    } catch {}
    setModeState(m);
    window.scrollTo(0, 0);
  }, []);

  return (
    <SiteStateContext.Provider value={{ theme, mode, setTheme, setMode }}>
      {children}
    </SiteStateContext.Provider>
  );
}

export function useSiteState() {
  const ctx = useContext(SiteStateContext);
  if (!ctx) throw new Error("useSiteState must be used inside <SiteStateProvider>");
  return ctx;
}

/** True only when the story is showing, so animations never run in skip-the-story mode. */
export function useStoryActive() {
  return useSiteState().mode === "story";
}
