"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { THEMES, type Theme, useSiteState } from "./SiteState";

// Each icon is the sun's height at that time of day. Night is a moon.
function ThemeIcon({ theme }: { theme: Theme }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      {theme === "dawn" && (
        <>
          <path d="M3 14h14" {...common} />
          <path d="M6 14a4 4 0 0 1 8 0" {...common} />
        </>
      )}
      {theme === "day" && <circle cx="10" cy="9" r="3.6" {...common} />}
      {theme === "dusk" && (
        <>
          <path d="M3 13h14" {...common} />
          <circle cx="10" cy="13" r="3" {...common} strokeDasharray="0" />
          <path d="M5 16.5h10" {...common} opacity="0.5" />
        </>
      )}
      {theme === "night" && <path d="M13.5 13.6A5 5 0 0 1 8.4 5a5 5 0 1 0 5.1 8.6Z" {...common} />}
    </svg>
  );
}

export function Nav() {
  const { theme, mode, setTheme, setMode } = useSiteState();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ease-expo ${
        scrolled ? "border-b border-line bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="group flex min-h-[44px] items-center font-mono text-sm tracking-tight text-ink"
          aria-label="div, home"
        >
          <span className="text-soft transition-colors duration-500 ease-expo group-hover:text-accent">&lt;</span>
          div
          <span className="text-soft transition-colors duration-500 ease-expo group-hover:text-accent">/&gt;</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {/* phones: one button that cycles through the day. desktop: all four */}
          <button
            type="button"
            onClick={() => theme && setTheme(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length])}
            aria-label={`theme: ${theme ?? "auto"}. switch to next time of day`}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-transform duration-500 ease-expo active:scale-90 md:hidden"
          >
            {theme && <ThemeIcon theme={theme} />}
          </button>
          <div role="group" aria-label="time of day theme" className="hidden items-center rounded-full border border-line p-0.5 md:flex">
            {THEMES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                aria-pressed={theme === t}
                aria-label={`${t} theme`}
                title={t}
                className={`grid h-11 w-11 place-items-center rounded-full transition-[color,background-color,transform] duration-500 ease-expo active:scale-90 ${
                  theme === t ? "bg-ink text-bg" : "text-soft hover:text-ink"
                }`}
              >
                <ThemeIcon theme={t} />
              </button>
            ))}
          </div>

          {pathname === "/" && (
            <button
              type="button"
              onClick={() => setMode(mode === "skip" ? "story" : "skip")}
              aria-pressed={mode === "skip"}
              className="min-h-[44px] rounded-full border border-line px-4 font-mono text-xs text-ink transition-[border-color,background-color,transform] duration-500 ease-expo hover:border-ink active:scale-95"
            >
              {mode === "skip" ? "play the story" : (
                <>
                  skip<span className="sr-only sm:not-sr-only"> the story</span>
                </>
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
