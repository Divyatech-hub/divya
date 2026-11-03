"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, scrollToTarget } from "@/lib/gsap";
import { useStoryActive } from "@/components/site/SiteState";

export type ChapterLink = { id: string; label: string };

// Dots sit on a gentle arc, like planets on one side of an orbit.
const H = 300;
const pointOnArc = (i: number, n: number) => {
  const t = n === 1 ? 0.5 : i / (n - 1); // 0..1 down the arc
  const angle = (t - 0.5) * Math.PI * 0.7; // -63° .. 63°
  return { x: 34 - (1 - Math.cos(angle)) * 30, y: H / 2 + Math.sin(angle) * (H / 2 - 12) };
};

export function OrbitProgress({ chapters }: { chapters: ChapterLink[] }) {
  const active = useStoryActive();
  const [current, setCurrent] = useState(0);
  const planet = useRef<SVGGElement>(null);
  const points = chapters.map((_, i) => pointOnArc(i, chapters.length));

  // Which chapter is in the middle of the screen?
  useEffect(() => {
    if (!active) return;
    const triggers = chapters.map((c, i) =>
      ScrollTrigger.create({
        trigger: `#${c.id}`,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setCurrent(i),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, [active, chapters]);

  // Glide the planet to the active dot, never jump.
  useEffect(() => {
    if (!planet.current) return;
    const p = points[current];
    gsap.to(planet.current, { x: p.x, y: p.y, duration: 1.1, ease: "expo.out" });
  }, [current]);

  const arcPath = points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  return (
    <nav
      aria-label="chapters"
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <div className="relative" style={{ width: 44, height: H }}>
        <svg aria-hidden="true" width="44" height={H} viewBox={`0 0 44 ${H}`} className="absolute inset-0 overflow-visible">
          <path d={arcPath} fill="none" stroke="var(--line)" strokeWidth="1" />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === current ? 0 : 2}
              fill="var(--soft)"
              style={{ transition: "r 0.6s cubic-bezier(0.16,1,0.3,1)" }}
            />
          ))}
          <g ref={planet} transform={`translate(${points[0].x} ${points[0].y})`}>
            <circle r="5" fill="var(--accent)" />
            <circle r="10" fill="none" stroke="var(--accent)" strokeOpacity="0.35" />
          </g>
        </svg>
        <ol>
          {chapters.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => scrollToTarget(`#${c.id}`)}
                aria-current={i === current ? "step" : undefined}
                className="group pointer-events-auto absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ left: points[i].x, top: points[i].y }}
              >
                <span className="sr-only">go to {c.label}</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute right-full mr-1 whitespace-nowrap font-mono text-[11px] transition-[opacity,transform] duration-500 ease-expo ${
                    i === current
                      ? "translate-x-0 text-ink opacity-100"
                      : "translate-x-2 text-soft opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  }`}
                >
                  {c.label}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
