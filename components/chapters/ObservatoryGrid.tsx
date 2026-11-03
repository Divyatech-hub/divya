"use client";

import { useState } from "react";
import type { Project } from "@/lib/content";
import { ProjectCard } from "@/components/ui/ProjectCard";

const FILTERS = ["all", "shipped", "building", "wins"] as const;
type Filter = (typeof FILTERS)[number];

/** Work + wins with filters. The full star-field version lands on day 2. */
export function ObservatoryGrid({ projects, winLabels }: { projects: Project[]; winLabels: Record<string, string> }) {
  const [filter, setFilter] = useState<Filter>("all");

  // derived, not stored: the visible list is just a function of (projects, filter)
  const visible = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "wins") return Boolean(winLabels[p.slug]);
    return p.status === filter;
  });

  return (
    <div>
      <div role="group" aria-label="filter projects" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`min-h-[44px] rounded-full border px-4 font-mono text-xs transition-[background-color,color,border-color,transform] duration-500 ease-expo active:scale-95 ${
              filter === f ? "border-ink bg-ink text-bg" : "border-line text-ink hover:border-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        showing {visible.length} projects
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} win={winLabels[p.slug]} />
        ))}
      </div>
    </div>
  );
}
