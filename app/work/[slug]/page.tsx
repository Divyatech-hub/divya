import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject, getProjects, getSite, getWins } from "@/lib/content";
import { Footer } from "@/components/site/Footer";

export function generateStaticParams() {
  return getProjects()
    .filter((p) => p.hero)
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title.toLowerCase()} · div`,
    description: project.summary ?? undefined,
  };
}

/** Drops "## heading" sections that are still just [TODO], so unfinished bits never show. */
function withoutTodoSections(body: string) {
  return body
    .split(/(?=^## )/m)
    .filter((section) => {
      const content = section.replace(/^## .*$/m, "").trim();
      return content.length > 0 && !content.startsWith("[TODO]");
    })
    .join("\n");
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mb-3 mt-14 font-mono text-xs uppercase tracking-[0.18em] text-soft" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => <p className="text-lg leading-relaxed text-ink" {...props} />,
  ul: (props: React.ComponentProps<"ul">) => <ul className="space-y-2 text-lg text-ink" {...props} />,
  li: (props: React.ComponentProps<"li">) => (
    <li className="flex gap-3 before:mt-[0.7em] before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-accent" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="underline decoration-line underline-offset-4 hover:decoration-accent" {...props} />
  ),
};

export default function WorkPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project || !project.hero) notFound();
  const win = getWins().wins.find((w) => w.project === project.slug);
  const { site, github } = project.links;

  return (
    <>
      <main id="main" className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8">
        <Link
          href="/#observatory"
          className="inline-flex min-h-[44px] items-center font-mono text-xs text-soft transition-colors duration-500 ease-expo hover:text-ink"
        >
          ← back to the observatory
        </Link>
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-soft">
          {project.status}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h1 className="mt-3 font-serif text-6xl leading-none text-ink md:text-8xl">{project.title}</h1>
        {project.summary && <p className="mt-6 text-xl leading-relaxed text-soft">{project.summary}</p>}
        {win && (
          <p className="mt-6 font-mono text-sm text-gold">
            ★ {win.result}, {win.event}
            {win.year ? ` ${win.year}` : ""}
          </p>
        )}
        <div className="mt-6 flex gap-6 text-sm">
          {site && (
            <a href={site} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center underline decoration-line underline-offset-4 hover:decoration-accent">
              visit the site ↗
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center underline decoration-line underline-offset-4 hover:decoration-accent">
              github ↗
            </a>
          )}
        </div>
        <div className="mt-4">
          <MDXRemote source={withoutTodoSections(project.body)} components={mdxComponents} />
        </div>
      </main>
      <Footer site={getSite()} />
    </>
  );
}
