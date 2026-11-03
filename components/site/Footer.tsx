import type { Site } from "@/lib/content";

export function Footer({ site }: { site: Site }) {
  const { github, linkedin, substack, email } = site.links;
  const links = [
    linkedin && { label: "linkedin", href: linkedin },
    github && { label: "github", href: github },
    substack && { label: "substack", href: substack },
    email && { label: "email", href: `mailto:${email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer id="epilogue" className="relative overflow-hidden border-t border-line px-5 pb-12 pt-28 md:px-8">
      {/* the night sky settling: a few fixed stars, pure css */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 30%, var(--ink), transparent), radial-gradient(1px 1px at 28% 72%, var(--soft), transparent), radial-gradient(1.5px 1.5px at 46% 18%, var(--ink), transparent), radial-gradient(1px 1px at 63% 58%, var(--soft), transparent), radial-gradient(1.5px 1.5px at 82% 26%, var(--gold), transparent), radial-gradient(1px 1px at 91% 80%, var(--ink), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <p className="font-serif text-[clamp(3rem,10vw,9rem)] leading-[0.9] text-ink">{site.chapters.epilogue.line}</p>
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex min-h-[44px] items-center font-mono text-sm text-ink underline decoration-line underline-offset-4 transition-colors duration-500 ease-expo hover:decoration-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-16 font-mono text-[11px] text-soft">
          handmade by div. no ai art, ever. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
