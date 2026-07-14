import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/sanity/lib/types";

/**
 * Placeholder cover shown when a project has no cover image (or is sample
 * content): a gradient panel with the project's initial.
 */
function CoverFallback({ title }: { title?: string }) {
  return (
    <div className="flex size-full items-center justify-center bg-[radial-gradient(ellipse_at_top_left,#f3ead9,#e7d9bf)]">
      <span className="font-display text-7xl font-medium text-accent/30 transition-colors duration-500 group-hover:text-accent/50">
        {title?.charAt(0) ?? "?"}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const { title, slug, summary, coverImage, tags } = project;

  const card = (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_20px_60px_-20px_rgba(181,80,47,0.25)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        {coverImage?.asset ? (
          <Image
            src={urlFor(coverImage).width(800).height(500).url()}
            alt={coverImage.alt ?? title ?? "Project cover"}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <CoverFallback title={title} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent">
            {title}
          </h3>
          <span
            aria-hidden
            className="mt-1 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
          >
            ↗
          </span>
        </div>
        {summary && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {summary}
          </p>
        )}
        {tags && tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );

  if (!slug) {
    return card;
  }

  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      {card}
    </Link>
  );
}
