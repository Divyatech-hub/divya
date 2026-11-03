// Reads everything in content/ at build time. Server-only: it uses `fs`.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import siteJson from "@/content/site.json";
import winsJson from "@/content/wins.json";
import placesJson from "@/content/places.json";

export type Site = typeof siteJson;

export type ProjectStatus = "shipped" | "building" | "archived";

export type Project = {
  slug: string;
  title: string;
  summary: string | null;
  status: ProjectStatus;
  year: number | null;
  chapter: string | null;
  hero: boolean;
  hidden: boolean;
  tags: string[];
  links: { site?: string; github?: string; [key: string]: string | undefined };
  numbers: string[];
  image: string | null;
  constellation: [number, number][];
  body: string;
};

export type Win = {
  event: string;
  year: number | null;
  result: string;
  project: string | null;
};

export type Place = {
  country: string;
  city: string;
  lat: number;
  lng: number;
  order: number | null;
  year: number | null;
  note: string;
  photo: string | null;
  links: string[];
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/** "[TODO] ..." placeholders stay in the files for div but never render on the site. */
export function clean(text: string | null | undefined): string | null {
  if (!text) return null;
  return text.trim().startsWith("[TODO]") ? null : text;
}

export function getSite(): Site {
  return siteJson;
}

export function getProjects({ includeHidden = false } = {}): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: data.slug ?? file.replace(/\.mdx$/, ""),
      title: data.title,
      summary: clean(data.summary),
      status: data.status ?? "building",
      year: data.year ?? null,
      chapter: data.chapter ?? null,
      hero: Boolean(data.hero),
      hidden: Boolean(data.hidden),
      tags: data.tags ?? [],
      links: data.links ?? {},
      numbers: data.numbers ?? [],
      image: data.image ?? null,
      constellation: data.constellation ?? [],
      body: content.trim(),
    } satisfies Project;
  });

  return projects
    .filter((p) => includeHidden || !p.hidden)
    // hero projects first, then newest first, unknown years last
    .sort((a, b) => Number(b.hero) - Number(a.hero) || (b.year ?? 0) - (a.year ?? 0));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getWins(): { totalHackathons: number; wins: Win[] } {
  return winsJson;
}

export function getPlaces(): Place[] {
  return placesJson;
}

const CONTINENT: Record<string, string> = {
  IN: "asia",
  AE: "asia",
  CH: "europe",
  US: "north america",
};

export function getTravelStats(places: Place[]) {
  const countries = new Set(places.map((p) => p.country));
  const continents = new Set(places.map((p) => CONTINENT[p.country]).filter(Boolean));
  return { countries: countries.size, cities: places.length, continents: continents.size };
}
