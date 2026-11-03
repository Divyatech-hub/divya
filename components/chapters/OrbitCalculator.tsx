"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Month by month: last month's balance grows by the monthly rate, then you add your contribution. */
function simulate(ratePct: number, years: number, monthly: number) {
  const r = ratePct / 100 / 12;
  const balances: number[] = [0];
  let b = 0;
  for (let m = 1; m <= years * 12; m++) {
    b = b * (1 + r) + monthly;
    balances.push(b);
  }
  return { balances, final: b, contributed: monthly * years * 12 };
}

/** A number that eases to its new value instead of snapping. */
function useTweenedNumber(value: number) {
  const [shown, setShown] = useState(value);
  const obj = useRef({ v: value });
  useEffect(() => {
    const t = gsap.to(obj.current, {
      v: value,
      duration: 0.7,
      ease: "power3.out",
      onUpdate: () => setShown(obj.current.v),
    });
    return () => {
      t.kill();
    };
  }, [value]);
  return shown;
}

function Slider(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-xs">
        <label htmlFor={id} className="text-soft">
          {props.label}
        </label>
        <output htmlFor={id} className="text-ink">
          {props.format(props.value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="mt-2 h-11 w-full cursor-pointer accent-[var(--accent)]"
      />
    </div>
  );
}

/**
 * Compound growth drawn as an orbit spiraling outward. One lap = one year,
 * distance from the sun = how much you have.
 */
export function OrbitCalculator({ disclaimer }: { disclaimer: string }) {
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [monthly, setMonthly] = useState(300);
  const { balances, final, contributed } = useMemo(() => simulate(rate, years, monthly), [rate, years, monthly]);

  const shownFinal = useTweenedNumber(final);
  const shownGrowth = useTweenedNumber(final - contributed);

  const path = useMemo(() => {
    // Distance from the sun is proportional to the balance, scaled so the final balance touches
    // the outer ring. One lap = one year. 8 sub-steps per month keep the curve smooth, not polygonal.
    const R0 = 6;
    const R1 = 44;
    const SUB = 8;
    const spiral = (values: number[]) => {
      let d = "";
      let end = { x: 50, y: 50 };
      for (let m = 0; m < values.length - 1; m++) {
        for (let k = 0; k < SUB; k++) {
          const t = m + k / SUB;
          const b = values[m] + (values[m + 1] - values[m]) * (k / SUB);
          const angle = (t / 12) * Math.PI * 2 - Math.PI / 2;
          const r = R0 + (R1 - R0) * (final > 0 ? b / final : 0);
          end = { x: 50 + Math.cos(angle) * r, y: 50 + Math.sin(angle) * r };
          d += `${d ? "L" : "M"}${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
        }
      }
      const last = values.length - 1;
      const angle = (last / 12) * Math.PI * 2 - Math.PI / 2;
      const r = R0 + (R1 - R0) * (final > 0 ? values[last] / final : 0);
      end = { x: 50 + Math.cos(angle) * r, y: 50 + Math.sin(angle) * r };
      return { d: d + `L${end.x.toFixed(2)} ${end.y.toFixed(2)}`, end };
    };
    // the "no gravity" orbit: just your contributions, no growth. An even, Archimedean spiral.
    const contributionsOnly = balances.map((_, m) => monthly * m);
    return { grown: spiral(balances), flat: spiral(contributionsOnly) };
  }, [balances, final, monthly]);

  return (
    <div className="grid gap-8">
      <figure className="relative mx-auto w-full max-w-[min(100%,42svh)]">
        <svg viewBox="0 0 100 100" className="w-full" role="img" aria-label={`orbit of ${years} years of growth, ending at ${money.format(final)}`}>
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--line)" strokeDasharray="0.6 1.4" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="3.2" fill="var(--gold)" />
          <circle cx="50" cy="50" r="6" fill="var(--gold)" opacity="0.15" />
          <path d={path.flat.d} fill="none" stroke="var(--soft)" strokeOpacity="0.45" strokeWidth="0.25" strokeDasharray="0.8 0.8" />
          <path d={path.grown.d} fill="none" stroke="var(--accent)" strokeWidth="0.4" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={path.grown.end.x} cy={path.grown.end.y} r="1.8" fill="var(--ink)" />
        </svg>
        <figcaption className="mt-3 flex justify-center gap-5 font-mono text-[10px] text-soft">
          <span><span aria-hidden="true" className="mr-1.5 inline-block h-px w-4 translate-y-[-3px] bg-accent" />with growth</span>
          <span><span aria-hidden="true" className="mr-1.5 inline-block h-px w-4 translate-y-[-3px] border-t border-dashed border-soft" />just saving</span>
        </figcaption>
      </figure>

      <dl className="grid grid-cols-2 gap-4">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-soft">after {years} years</dt>
          <dd className="mt-1 font-serif text-4xl text-ink">{money.format(shownFinal)}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-soft">from gravity alone</dt>
          <dd className="mt-1 font-serif text-4xl text-accent">{money.format(shownGrowth)}</dd>
        </div>
      </dl>

      <div className="grid gap-4">
        <Slider label="yearly return" value={rate} min={0} max={12} step={0.5} format={(v) => `${v}%`} onChange={setRate} />
        <Slider label="years" value={years} min={1} max={40} step={1} format={(v) => `${v}`} onChange={setYears} />
        <Slider label="every month" value={monthly} min={0} max={2000} step={50} format={(v) => money.format(v)} onChange={setMonthly} />
      </div>
      <p className="font-mono text-[11px] text-soft">{disclaimer}</p>
    </div>
  );
}
