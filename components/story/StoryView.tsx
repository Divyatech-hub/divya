// The scroll story. Real HTML content in every chapter; motion is a layer on top.
import { clean, type Place, type Project, type Site, type Win } from "@/lib/content";
import { Chapter } from "./Chapter";
import { Reveal } from "./Reveal";
import { SmoothScroll } from "./SmoothScroll";
import { OrbitProgress, type ChapterLink } from "./OrbitProgress";
import { Prologue } from "@/components/chapters/Prologue";
import { FoldVisual } from "@/components/chapters/FoldVisual";
import { LightVisual } from "@/components/chapters/LightVisual";
import { SoundVisual } from "@/components/chapters/SoundVisual";
import { OrbitCalculator } from "@/components/chapters/OrbitCalculator";
import { ObservatoryGrid } from "@/components/chapters/ObservatoryGrid";
import { PaleBlueDot } from "@/components/chapters/PaleBlueDot";
import { ProjectCard } from "@/components/ui/ProjectCard";

type Props = {
  site: Site;
  projects: Project[];
  wins: { totalHackathons: number; wins: Win[] };
  places: Place[];
  stats: { countries: number; cities: number; continents: number };
};

const CHAPTERS: ChapterLink[] = [
  { id: "prologue", label: "particle" },
  { id: "fold", label: "fold" },
  { id: "light", label: "light" },
  { id: "sound", label: "sound" },
  { id: "gravity", label: "gravity" },
  { id: "earth", label: "pale blue dot" },
  { id: "observatory", label: "observatory" },
  { id: "signal", label: "signal" },
  { id: "epilogue", label: "sunrise" },
];

function Personal({ children }: { children: React.ReactNode }) {
  return <p className="border-l border-accent pl-4 text-ink">{children}</p>;
}

/** A simple full-width chapter for the ones whose showpiece lands on day 2. */
function WideChapter(props: { id: string; number: string; title: string; headline: string; children: React.ReactNode }) {
  return (
    <section id={props.id} aria-labelledby={`${props.id}-title`} className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-soft">
          chapter {props.number} · <span id={`${props.id}-title`}>{props.title}</span>
        </p>
        <Reveal className="mt-5 max-w-4xl font-serif text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.01em] text-ink">
          {props.headline}
        </Reveal>
        <div className="mt-12">{props.children}</div>
      </div>
    </section>
  );
}

export function StoryView({ site, projects, wins, places, stats }: Props) {
  const c = site.chapters;
  const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
  const knownWins = wins.wins.filter((w) => !w.event.startsWith("[TODO]"));
  const winLabels: Record<string, string> = Object.fromEntries(
    knownWins.filter((w) => w.project).map((w) => [w.project, `${w.result.toLowerCase()}, ${w.event.toLowerCase()}`])
  );
  const featured = (slug: string) => {
    const p = bySlug(slug);
    return p ? <ProjectCard project={p} win={winLabels[slug]} /> : null;
  };

  return (
    <>
      <SmoothScroll />
      <OrbitProgress chapters={CHAPTERS} />

      <Prologue site={site} />

      {/* DRAFT copy in these chapters lives in content/site.json */}
      <Chapter id="fold" number="1" title={c.fold.title} headline={c.fold.headline} visual={<FoldVisual />}>
        <p>{c.fold.body}</p>
        {featured("shipyard")}
        <Personal>{c.fold.personal}</Personal>
      </Chapter>

      <Chapter id="light" number="2" title={c.light.title} headline={c.light.headline} visual={<LightVisual />} flip>
        <p>{c.light.body}</p>
        {featured("revy")}
        <Personal>{c.light.personal}</Personal>
      </Chapter>

      <Chapter id="sound" number="3" title={c.sound.title} headline={c.sound.headline} visual={<SoundVisual />}>
        <p>{c.sound.body}</p>
        {featured("moodmelody")}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-disabled="true"
            className="flex min-h-[44px] cursor-not-allowed items-center gap-3 rounded-full border border-line px-5 font-mono text-xs text-soft"
          >
            <span aria-hidden="true">▶</span> play the clip
          </button>
          <span className="font-mono text-[11px] text-soft">recording coming soon</span>
        </div>
        <Personal>{c.sound.personal}</Personal>
      </Chapter>

      <Chapter
        id="gravity"
        number="4"
        title={c.gravity.title}
        headline={c.gravity.headline}
        flip
        square={false}
        visual={
          <div className="grid h-full place-items-center pt-6 md:pt-16">
            <div className="w-full max-w-md">
              <OrbitCalculator disclaimer={c.gravity.disclaimer} />
            </div>
          </div>
        }
      >
        <p>{c.gravity.body}</p>
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-soft">what i believe</h3>
          <ol className="mt-4 space-y-4">
            {site.beliefs.map((b, i) => (
              <li key={b} className="flex gap-4 font-serif text-2xl leading-snug text-ink">
                <span className="mt-1.5 font-mono text-xs text-accent">0{i + 1}</span>
                {b}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-soft">the long game</h3>
          <p className="mt-3 text-ink">{c.gravity.ambition}</p>
        </div>
      </Chapter>

      <PaleBlueDot
        title={c.earth.title}
        headline={c.earth.headline}
        body={c.earth.body}
        goal={c.earth.goal}
        places={places}
        work={Object.fromEntries(projects.filter((p) => p.hero).map((p) => [p.slug, p.title.toLowerCase()]))}
      />

      <WideChapter id="observatory" number="6" title={c.observatory.title} headline={c.observatory.headline}>
        <p className="max-w-2xl text-[17px] leading-relaxed text-soft">{c.observatory.body}</p>
        <ul className="mt-10 grid gap-x-8 md:grid-cols-2" aria-label="hackathon wins">
          {knownWins.map((w) => (
            <li key={w.event} className="flex items-baseline justify-between gap-4 border-t border-line py-4">
              <span className="flex items-center gap-3 text-ink">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_var(--gold)]" />
                {w.event.toLowerCase()}
              </span>
              <span className="text-right font-mono text-xs lowercase text-gold">{clean(w.result) ?? "win"}</span>
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <ObservatoryGrid projects={projects} winLabels={winLabels} />
        </div>
      </WideChapter>

      <WideChapter id="signal" number="7" title={c.signal.title} headline={c.signal.headline}>
        <p className="max-w-2xl text-[17px] leading-relaxed text-soft">{c.signal.body}</p>
        <a
          href={`mailto:${site.links.email}`}
          className="mt-8 inline-flex min-h-[44px] items-center gap-3 rounded-full bg-ink px-6 font-mono text-sm text-bg transition-transform duration-500 ease-expo hover:-translate-y-0.5 active:scale-95"
        >
          send a signal <span aria-hidden="true">↗</span>
        </a>
      </WideChapter>
    </>
  );
}
