import Link from "next/link";

import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  placeholderExperiences,
  placeholderProjects,
  placeholderSettings,
} from "@/lib/placeholder";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  experiencesQuery,
  featuredProjectsQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import type { Experience, Project, SiteSettings } from "@/sanity/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, featuredProjects, experiences] = await Promise.all([
    sanityFetch<SiteSettings>(siteSettingsQuery),
    sanityFetch<Project[]>(featuredProjectsQuery),
    sanityFetch<Experience[]>(experiencesQuery),
  ]);

  const heroSettings = settings ?? placeholderSettings;
  const projects = featuredProjects?.length
    ? featuredProjects
    : placeholderProjects;
  const timeline = experiences?.length ? experiences : placeholderExperiences;

  return (
    <>
      <Hero settings={heroSettings} isPlaceholder={!settings} />

      <section className="mx-auto max-w-6xl px-6 py-24" id="work">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Selected Work" title="Featured projects" />
          <Reveal delay={150}>
            <Link
              href="/projects"
              className="link-underline pb-1 font-mono text-sm text-muted transition-colors hover:text-accent"
            >
              View all projects →
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project._id} delay={index * 100} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="Career" title="Experience" id="experience" />
        <div className="mt-14">
          <ExperienceTimeline experiences={timeline} />
        </div>
      </section>
    </>
  );
}
