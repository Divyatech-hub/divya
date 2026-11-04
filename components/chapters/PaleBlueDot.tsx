"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSiteState } from "@/components/site/SiteState";
import { CONTINENT, type Country } from "@/lib/geo";
import type { Place } from "@/lib/content";
import type { GlobeTool } from "./globe/GlobeScene";

// three.js only downloads when the globe is about to scroll into view
const GlobeScene = dynamic(() => import("./globe/GlobeScene"), { ssr: false });

type Props = {
  title: string;
  headline: string;
  body: string;
  goal: string;
  places: Place[];
  /** slug → title, for "linked work" on postcards */
  work: Record<string, string>;
};

const countryName = (iso: string) => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(iso)?.toLowerCase() ?? iso;
  } catch {
    return iso;
  }
};

export function PaleBlueDot({ title, headline, body, goal, places: rawPlaces, work }: Props) {
  const { theme, mode } = useSiteState();
  const section = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false); // close enough to start loading
  const [visible, setVisible] = useState(false); // on screen: render frames
  const [playIntro, setPlayIntro] = useState(false);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [tool, setTool] = useState<GlobeTool>("spin");
  const [focus, setFocus] = useState<Place | null>(null);
  const [introKey, setIntroKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const lastButton = useRef<HTMLButtonElement | null>(null);

  // visit order first, then the places without an order yet, in file order
  const places = useMemo(
    () => [...rawPlaces].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)),
    [rawPlaces]
  );

  useEffect(() => setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (!section.current || mode !== "story") return;
    const el = section.current;
    const nearIO = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "800px 0px" });
    const visIO = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px 0px" });
    const introIO = new IntersectionObserver(([e]) => e.isIntersecting && setPlayIntro(true), { threshold: 0.45 });
    nearIO.observe(el);
    visIO.observe(el);
    introIO.observe(el);
    return () => [nearIO, visIO, introIO].forEach((io) => io.disconnect());
  }, [mode]);

  useEffect(() => {
    if (!near || countries) return;
    fetch("/geo/countries-110m.json")
      .then((r) => r.json())
      .then(setCountries)
      .catch(() => setCountries([])); // the globe still works as a plain sphere
  }, [near, countries]);

  // stats count up as the coin reaches each place
  const shown = places.slice(0, revealed);
  const stats = {
    countries: new Set(shown.map((p) => p.country)).size,
    cities: shown.length,
    continents: new Set(shown.map((p) => CONTINENT[p.country]).filter(Boolean)).size,
  };

  const open = (place: Place, from?: HTMLButtonElement | null) => {
    lastButton.current = from ?? null;
    setTool("spin");
    setFocus(place);
  };
  const close = () => {
    setFocus(null);
    lastButton.current?.focus(); // send keyboard focus back where it came from
  };

  const note = focus && !focus.note.startsWith("[TODO]") ? focus.note : null;
  const foil = theme === "dawn" || theme === "day" ? "copper" : "dusk";

  return (
    <section ref={section} id="earth" aria-labelledby="earth-title" className="px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-[640px]">
            {near && countries ? (
              <GlobeScene
                running={visible}
                places={places}
                countries={countries}
                foil={foil}
                tool={tool}
                focus={focus}
                introKey={introKey}
                playIntro={playIntro}
                reducedMotion={reducedMotion}
                onRevealed={setRevealed}
                onPick={(p) => open(p)}
              />
            ) : (
              // same footprint while loading, so nothing jumps when the globe arrives
              <div className="absolute inset-[9%] rounded-full border border-line" aria-hidden="true" />
            )}
          </div>
          <p className="mt-2 text-center font-mono text-[10px] text-soft">
            [ASSET: painting texture] under the foil. outlines: natural earth, public domain.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-soft">
            chapter 5 · <span id="earth-title">{title}</span>
          </p>
          <h2 className="mt-5 font-serif text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] text-ink">{headline}</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-soft">{body}</p>

          <dl className="mt-8 grid grid-cols-3 gap-4" aria-live="polite">
            {(
              [
                ["countries", stats.countries],
                ["cities", stats.cities],
                ["continents", stats.continents],
              ] as const
            ).map(([label, n]) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-soft">{label}</dt>
                <dd className="font-serif text-5xl tabular-nums text-ink">{n}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 font-mono text-xs text-accent">goal: {goal}</p>

          <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="globe tool">
            {(
              [
                ["spin", "drag to spin"],
                ["scratch", "coin: scratch it yourself"],
              ] as const
            ).map(([t, label]) => (
              <button
                key={t}
                type="button"
                aria-pressed={tool === t}
                onClick={() => setTool(t)}
                className={`min-h-[44px] rounded-full border px-4 font-mono text-xs transition-colors duration-300 ${
                  tool === t ? "border-ink bg-ink text-bg" : "border-line text-ink hover:border-ink"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setFocus(null);
                setPlayIntro(true);
                setIntroKey((k) => k + 1);
              }}
              className="min-h-[44px] px-3 font-mono text-xs text-soft underline decoration-line underline-offset-4 hover:text-ink"
            >
              re-foil it
            </button>
          </div>

          {focus ? (
            <div role="region" aria-label={`postcard from ${focus.city}`} className="mt-8 rounded-2xl border border-line p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-serif text-3xl lowercase text-ink">{focus.city}</p>
                  <p className="font-mono text-[11px] text-soft">
                    {countryName(focus.country)}
                    {focus.year ? ` · ${focus.year}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-ink hover:border-ink"
                  aria-label="close postcard"
                >
                  ×
                </button>
              </div>
              {focus.photo ? (
                <img src={focus.photo} alt={`div's photo from ${focus.city}`} className="mt-4 aspect-[16/9] max-h-56 w-full rounded-lg object-cover" />
              ) : (
                <div className="mt-4 grid aspect-[16/9] max-h-56 w-full place-items-center rounded-lg bg-bg-2 font-mono text-[10px] text-soft">
                  [ASSET: postcard photo]
                </div>
              )}
              {note && <p className="mt-4 text-ink">{note}</p>}
              {focus.links.filter((s) => work[s]).length > 0 && (
                <p className="mt-3 text-sm text-soft">
                  linked work:{" "}
                  {focus.links
                    .filter((s) => work[s])
                    .map((s) => (
                      <Link key={s} href={`/work/${s}`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
                        {work[s]}
                      </Link>
                    ))}
                </p>
              )}
            </div>
          ) : (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="places, open a postcard">
              {places.map((p, i) => (
                <li key={p.city}>
                  <button
                    type="button"
                    onClick={(e) => open(p, e.currentTarget)}
                    className={`min-h-[44px] rounded-full border px-3 text-sm lowercase transition-[opacity,border-color] duration-500 hover:border-ink ${
                      i < revealed ? "border-line text-ink opacity-100" : "border-line text-soft opacity-50"
                    }`}
                  >
                    {p.city}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
