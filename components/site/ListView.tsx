// "skip the story": the same content as a fast, clean page. No WebGL, no scroll tricks.
// Also the default for visitors who prefer reduced motion.
import { clean, type Place, type Project, type Site, type Win } from "@/lib/content";
import { ProjectCard } from "@/components/ui/ProjectCard";

type Props = {
  site: Site;
  projects: Project[];
  wins: { totalHackathons: number; wins: Win[] };
  places: Place[];
  stats: { countries: number; cities: number; continents: number };
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-14">
      <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-soft">{title}</h2>
      {children}
    </section>
  );
}

export function ListView({ site, projects, wins, places, stats }: Props) {
  const knownWins = wins.wins.filter((w) => !w.event.startsWith("[TODO]"));
  const winFor = (slug: string) => knownWins.find((w) => w.project === slug);
  const { chapters } = site;

  return (
    <div className="mx-auto max-w-5xl px-5 pb-10 pt-32 md:px-8">
      <header className="pb-14">
        <h1 className="font-serif text-6xl leading-none text-ink md:text-8xl">{site.hello}</h1>
        <p className="mt-4 font-mono text-sm text-soft">
          {site.pronounce} <span className="text-accent">&lt;/div&gt;</span>
        </p>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink">{site.description}</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-soft">{site.origin}</p>
      </header>

      <Section title="how i think">
        <ul className="grid gap-8 md:grid-cols-3">
          {(["fold", "light", "sound"] as const).map((key) => (
            <li key={key}>
              <h3 className="font-serif text-2xl text-ink">{chapters[key].title}</h3>
              <p className="mt-2 leading-relaxed text-soft">{chapters[key].body}</p>
              <p className="mt-2 leading-relaxed text-soft">{chapters[key].personal}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={`work · ${projects.length} projects`}>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p) => {
            const w = winFor(p.slug);
            return <ProjectCard key={p.slug} project={p} win={w ? `${w.result.toLowerCase()}, ${w.event.toLowerCase()}` : undefined} />;
          })}
        </div>
      </Section>

      <Section title={`wins · ${wins.wins.length} of ${wins.totalHackathons} hackathons`}>
        <ul className="divide-y divide-line">
          {knownWins.map((w) => (
            <li key={w.event} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
              <span className="lowercase text-ink">{w.event}</span>
              <span className="font-mono text-sm lowercase text-gold">
                {clean(w.result) ?? "win"}
                {w.year ? ` · ${w.year}` : ""}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="beliefs">
        <ol className="space-y-3">
          {site.beliefs.map((b, i) => (
            <li key={b} className="flex gap-4 text-lg text-ink">
              <span className="font-mono text-sm text-soft">0{i + 1}</span>
              {b}
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl leading-relaxed text-soft">{chapters.gravity.ambition}</p>
      </Section>

      <Section title={`places · ${stats.countries} countries, ${stats.cities} cities, ${stats.continents} continents`}>
        <ul className="flex flex-wrap gap-2">
          {places.map((p) => (
            <li key={p.city} className="rounded-full border border-line px-3 py-1.5 text-sm lowercase text-ink">
              {p.city}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-sm text-soft">goal: {chapters.earth.goal}</p>
      </Section>
    </div>
  );
}
