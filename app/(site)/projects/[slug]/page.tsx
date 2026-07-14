import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatMonthYear } from "@/lib/format";
import { PortableTextBody } from "@/components/PortableTextBody";
import { Reveal } from "@/components/Reveal";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import {
  projectBySlugQuery,
  projectSlugsQuery,
} from "@/sanity/lib/queries";
import type { Project } from "@/sanity/lib/types";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(projectSlugsQuery);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityFetch<Project>(projectBySlugQuery, { slug });
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await sanityFetch<Project>(projectBySlugQuery, { slug });

  if (!project) notFound();

  const {
    title,
    summary,
    coverImage,
    body,
    gallery,
    tags,
    client,
    date,
    location,
    link,
    linkLabel,
  } = project;

  const meta = [
    { label: "Client", value: client },
    { label: "Date", value: formatMonthYear(date) },
    { label: "Location", value: location },
  ].filter((item) => item.value);

  return (
    <article className="mx-auto max-w-4xl px-6 pb-24 pt-40">
      <Link
        href="/projects"
        className="animate-fade-up link-underline pb-1 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        ← All projects
      </Link>

      <h1
        className="animate-fade-up mt-8 font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl"
        style={{ animationDelay: "0.1s" }}
      >
        {title}
      </h1>

      {summary && (
        <p
          className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          style={{ animationDelay: "0.2s" }}
        >
          {summary}
        </p>
      )}

      {meta.length > 0 && (
        <dl
          className="animate-fade-up mt-10 flex flex-wrap gap-x-12 gap-y-5 border-y border-line py-5"
          style={{ animationDelay: "0.25s" }}
        >
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {item.label}
              </dt>
              <dd className="mt-1 font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div
        className="animate-fade-up mt-8 flex flex-wrap items-center gap-3"
        style={{ animationDelay: "0.3s" }}
      >
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2 font-mono text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dim"
          >
            {linkLabel || "View link"} ↗
          </a>
        )}
        {tags && tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
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

      {coverImage?.asset && (
        <div
          className="animate-fade-up relative mt-14 overflow-hidden rounded-2xl border border-line"
          style={{ animationDelay: "0.4s" }}
        >
          <Image
            src={urlFor(coverImage).width(1600).height(900).url()}
            alt={coverImage.alt ?? title ?? "Project cover"}
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
        </div>
      )}

      {body && body.length > 0 && (
        <div className="mt-14">
          <PortableTextBody value={body} />
        </div>
      )}

      {gallery && gallery.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-4xl font-medium tracking-tight">
            Gallery
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {gallery.map((image, index) =>
              image.asset ? (
                <Reveal
                  key={image.asset._ref}
                  delay={index * 80}
                  className="group relative overflow-hidden rounded-xl border border-line"
                >
                  <Image
                    src={urlFor(image).width(900).height(650).url()}
                    alt={image.alt ?? `${title} — image ${index + 1}`}
                    width={900}
                    height={650}
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Reveal>
              ) : null,
            )}
          </div>
        </section>
      )}
    </article>
  );
}
