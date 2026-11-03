import Link from "next/link";
import type { Project } from "@/lib/content";

const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "shipped",
  building: "building",
  archived: "archived",
};

export function ProjectCard({ project, win }: { project: Project; win?: string }) {
  const { site, github } = project.links;
  // the win chip already says it, so drop the matching number ("3rd worldwide of 4,453...")
  const winKey = win?.split(",")[0].toLowerCase();
  const numbers = project.numbers.filter((n) => !winKey || !n.toLowerCase().includes(winKey));
  return (
    <article className="group relative flex flex-col gap-4 rounded-2xl border border-line p-5 transition-[transform,border-color,background-color] duration-700 ease-expo hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--ink)_35%,transparent)] hover:bg-[color-mix(in_srgb,var(--bg-2)_60%,transparent)] md:p-6">
      <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-soft">
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${project.status === "building" ? "bg-accent" : "bg-ink"}`}
          />
          {STATUS_LABEL[project.status]}
        </span>
        {project.year && <span>{project.year}</span>}
      </div>

      <div>
        <h3 className="font-serif text-3xl leading-none text-ink">{project.title}</h3>
        {project.summary && <p className="mt-3 text-[15px] leading-relaxed text-soft">{project.summary}</p>}
      </div>

      {(win || numbers.length > 0) && (
        <ul className="flex flex-wrap gap-2" aria-label="numbers">
          {win && (
            <li className="rounded-full border border-[color-mix(in_srgb,var(--gold)_55%,transparent)] px-3 py-1 font-mono text-[11px] text-gold">
              ★ {win}
            </li>
          )}
          {numbers.map((n) => (
              <li key={n} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink">
                {n}
              </li>
            ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-1 text-sm">
        {project.hero && project.body && (
          <Link href={`/work/${project.slug}`} className="inline-flex min-h-[44px] items-center text-ink underline decoration-line underline-offset-4 transition-colors duration-500 ease-expo hover:decoration-accent">
            case study
          </Link>
        )}
        {site && (
          <a href={site} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-ink underline decoration-line underline-offset-4 transition-colors duration-500 ease-expo hover:decoration-accent">
            site ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-ink underline decoration-line underline-offset-4 transition-colors duration-500 ease-expo hover:decoration-accent">
            github ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
