"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useStoryActive } from "@/components/site/SiteState";
import { AssetLabel } from "@/components/story/Chapter";

// Sky colors from noon to night: [top, middle, horizon]. Scroll scrubs through them.
const SKY = [
  ["#6fa8dc", "#a9cfee", "#e8f3fb"],
  ["#4a6fa5", "#f0b27a", "#fde2b8"],
  ["#2b1e4a", "#c8576b", "#f4a25f"],
  ["#0b1026", "#2a1e4a", "#5a2f4f"],
];

// Stand-ins for the painted planets: flat procedural gradients, not art.
const PLANETS = [
  { x: "22%", y: "28%", size: "22%", a: "#d98c6a", b: "#5b3a6e" },
  { x: "64%", y: "18%", size: "13%", a: "#8fb3d9", b: "#2c3e6b" },
  { x: "74%", y: "52%", size: "17%", a: "#e9c46a", b: "#7a4b2a" },
];

/** Scroll-driven sunset. [ASSET: painting scans] become the planets later. */
export function LightVisual() {
  const root = useRef<HTMLDivElement>(null);
  const active = useStoryActive();

  useGSAP(
    () => {
      if (!active || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: "#light", start: "top 60%", end: "bottom 70%", scrub: 1 },
        });
        SKY.slice(1).forEach(([top, mid, low], i) => {
          tl.to(root.current, { "--sky-top": top, "--sky-mid": mid, "--sky-low": low, duration: 1 }, i);
        });
        tl.fromTo(".sun", { yPercent: 0 }, { yPercent: 330, duration: 3 }, 0);
        tl.fromTo(".planet", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1, stagger: 0.25, ease: "power3.out" }, 1.8);
      });
      return () => mm.revert();
    },
    { dependencies: [active], revertOnUpdate: true, scope: root }
  );

  const [top, mid, low] = SKY[0];
  return (
    <div
      ref={root}
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden rounded-[2rem]"
      style={
        {
          "--sky-top": top,
          "--sky-mid": mid,
          "--sky-low": low,
          background: "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 58%, var(--sky-low) 82%)",
        } as React.CSSProperties
      }
    >
      <div
        className="sun absolute left-1/2 top-[14%] aspect-square w-[18%] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, #fff7e0 0%, #ffd58a 45%, rgba(255,190,110,0) 72%)",
          boxShadow: "0 0 80px 30px rgba(255, 200, 120, 0.35)",
        }}
      />
      {PLANETS.map((p, i) => (
        <div
          key={i}
          className="planet absolute aspect-square"
          style={{ left: p.x, top: p.y, width: p.size }}
        >
          {/* inner layer owns the hover tilt, so it doesn't fight gsap's transform on the outer one */}
          <div
            className="h-full w-full rounded-full transition-transform duration-1000 ease-expo hover:rotate-12 hover:scale-105"
            style={{
              background: `radial-gradient(circle at 32% 30%, ${p.a}, ${p.b} 78%)`,
              boxShadow: "inset -8px -10px 24px rgba(0,0,0,0.35)",
            }}
          />
        </div>
      ))}
      {/* the horizon */}
      <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[rgba(10,8,20,0.55)] to-transparent" />
      <AssetLabel>[ASSET: painting scans] div&apos;s acrylics on the planets</AssetLabel>
    </div>
  );
}
