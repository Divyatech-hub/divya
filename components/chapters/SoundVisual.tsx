"use client";

import { AssetLabel } from "@/components/story/Chapter";
import { useMemo } from "react";

/**
 * A nebula that breathes on its own (pure CSS, cheap: only transforms on 5 groups).
 * Later an AnalyserNode on div's recording drives it instead.
 */
export function SoundVisual() {
  // Gaussian-ish cloud of dots, split into rings that breathe at different speeds.
  // Fixed seed math (no Math.random) so server and client render the same dots.
  const rings = useMemo(() => {
    const out: { x: number; y: number; r: number; o: number }[][] = [[], [], [], [], []];
    for (let i = 0; i < 220; i++) {
      const a = i * 2.39996; // golden angle: even spread, no clumps
      const d = Math.sqrt(i / 220) * 42 * (0.75 + 0.25 * Math.sin(i * 12.9898));
      const ring = Math.min(4, Math.floor(d / 9));
      out[ring].push({
        x: 50 + Math.cos(a) * d,
        y: 50 + Math.sin(a) * d * 0.82,
        r: 0.35 + ((i * 7) % 10) / 14,
        o: 0.35 + ((i * 13) % 10) / 16,
      });
    }
    return out;
  }, []);

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="nebula-core">
            <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="38" fill="url(#nebula-core)" />
        {rings.map((dots, ring) => (
          <g
            key={ring}
            style={{
              transformOrigin: "50px 50px",
              animation: `breathe ${5 + ring * 1.3}s ease-in-out ${ring * -0.9}s infinite`,
            }}
          >
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={ring % 2 ? "var(--accent)" : "var(--ink)"} opacity={d.o} />
            ))}
          </g>
        ))}
      </svg>
      <AssetLabel>[ASSET: audio clip] div&apos;s choir or guitar, 30 to 60s</AssetLabel>
    </div>
  );
}
