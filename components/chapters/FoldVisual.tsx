"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useStoryActive } from "@/components/site/SiteState";
import { AssetLabel } from "@/components/story/Chapter";

// A bird-base crease pattern (the start of a crane) on a 100×100 square.
// Diagonals and midlines first, then the 22.5° angle bisectors from each corner.
const t = 50 * Math.tan(Math.PI / 8); // ≈ 20.7, where a 22.5° line from a corner meets the midline
const CREASES: [number, number, number, number][] = [
  [0, 0, 100, 100],
  [100, 0, 0, 100],
  [50, 0, 50, 100],
  [0, 50, 100, 50],
  [0, 0, 50, t], [0, 0, t, 50],
  [100, 0, 50, t], [100, 0, 100 - t, 50],
  [0, 100, t, 50], [0, 100, 50, 100 - t],
  [100, 100, 100 - t, 50], [100, 100, 50, 100 - t],
];

/** Creases draw in as you scroll. [ASSET: crane-fold sequence] replaces this with div's hands. */
export function FoldVisual() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const active = useStoryActive();

  useGSAP(
    () => {
      if (!active) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lines = gsap.utils.toArray<SVGPathElement>(".crease");
        const tl = gsap.timeline({
          defaults: { ease: "none" }, // scrubbed by scroll, so the scroll itself is the easing
          scrollTrigger: {
            trigger: "#fold",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.8,
            onUpdate: (self) => {
              if (count.current) count.current.textContent = String(Math.round(self.progress * CREASES.length));
            },
          },
        });
        tl.fromTo(lines, { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.5, duration: 1 }, 0);
        tl.fromTo(".paper", { rotateX: 0, rotateZ: 45, scale: 0.92 }, { rotateX: 32, rotateZ: 38, scale: 1, duration: tl.duration() }, 0);
      });
      return () => mm.revert();
    },
    { dependencies: [active], revertOnUpdate: true, scope: root }
  );

  return (
    <div ref={root} className="relative grid h-full w-full place-items-center [perspective:1200px]" aria-hidden="true">
      <div className="paper w-[62%] [transform-style:preserve-3d] [transform:rotate(45deg)]">
        <svg viewBox="-2 -2 104 104" className="block w-full overflow-visible">
          <rect x="0" y="0" width="100" height="100" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="0.6" />
          {CREASES.map(([x1, y1, x2, y2], i) => (
            <path
              key={i}
              className="crease"
              d={`M${x1} ${y1}L${x2} ${y2}`}
              stroke={i < 4 ? "var(--ink)" : "var(--accent)"}
              strokeOpacity={i < 4 ? 0.55 : 0.9}
              strokeWidth="0.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              fill="none"
            />
          ))}
        </svg>
      </div>
      <p className="absolute right-3 top-3 font-mono text-[11px] text-soft">
        fold <span ref={count}>{CREASES.length}</span> / {CREASES.length}
      </p>
      <AssetLabel>[ASSET: crane-fold sequence] div&apos;s hands, 60 to 80 frames</AssetLabel>
    </div>
  );
}
