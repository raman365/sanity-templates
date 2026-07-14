import type { Metadata } from "next";
import Link from "next/link";

import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { placeholderProjects } from "@/lib/placeholder";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProjectsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of selected projects.",
};

export default async function ProjectsPage() {
  const allProjects = await sanityFetch<Project[]>(allProjectsQuery);
  const projects = allProjects?.length ? allProjects : placeholderProjects;
  const isPlaceholder = !allProjects?.length;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-40">
      <p className="animate-fade-up rule-dot font-mono text-xs uppercase tracking-[0.25em] text-accent">
        Archive
      </p>
      <h1
        className="animate-fade-up mt-5 font-display text-6xl font-medium leading-[1.0] tracking-tight sm:text-8xl"
        style={{ animationDelay: "0.1s" }}
      >
        All projects
      </h1>
      {isPlaceholder && (
        <p
          className="animate-fade-up mt-6 font-mono text-sm text-muted"
          style={{ animationDelay: "0.2s" }}
        >
          Sample content — add projects in{" "}
          <Link href="/studio" className="text-accent hover:underline">
            /studio
          </Link>{" "}
          to replace it.
        </p>
      )}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project._id} delay={index * 80} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
