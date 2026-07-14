import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/sanity/lib/types";

import { Reveal } from "./Reveal";

/**
 * A large editorial row for the home page's featured work — big serif title,
 * index number, and a wide image that alternates side each row.
 */
export function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { title, slug, summary, coverImage, tags, client, location } = project;
  const flip = index % 2 === 1;
  const meta = [client, location].filter(Boolean).join(" · ");

  const media = (
    <div className="lg:col-span-7">
      <div className="group relative aspect-[16/11] overflow-hidden rounded-2xl border border-line bg-surface">
        {coverImage?.asset ? (
          <Image
            src={urlFor(coverImage).width(1200).height(825).url()}
            alt={coverImage.alt ?? title ?? "Project"}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-[radial-gradient(ellipse_at_top_left,#f3ead9,#e7d9bf)]">
            <span className="font-display text-8xl font-medium text-accent/25">
              {title?.charAt(0) ?? "?"}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const text = (
    <div
      className={`flex flex-col justify-center lg:col-span-5 ${
        flip ? "lg:pr-8" : "lg:pl-8"
      }`}
    >
      <span className="font-mono text-sm text-accent">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
        {title}
      </h3>
      {meta && (
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {meta}
        </p>
      )}
      {summary && (
        <p className="mt-5 max-w-md leading-relaxed text-muted">{summary}</p>
      )}
      {tags && tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
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
      {slug && (
        <span className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-foreground transition-colors group-hover/row:text-accent">
          View project
          <span className="transition-transform duration-300 group-hover/row:translate-x-1">
            →
          </span>
        </span>
      )}
    </div>
  );

  const row = (
    <div className="group/row grid items-stretch gap-8 lg:grid-cols-12">
      {flip ? (
        <>
          {text}
          {media}
        </>
      ) : (
        <>
          {media}
          {text}
        </>
      )}
    </div>
  );

  return (
    <Reveal>{slug ? <Link href={`/projects/${slug}`}>{row}</Link> : row}</Reveal>
  );
}
