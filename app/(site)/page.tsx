import Link from "next/link";

import { About } from "@/components/About";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Services } from "@/components/Services";
import {
  placeholderExperiences,
  placeholderProjects,
  placeholderServices,
  placeholderSettings,
} from "@/lib/placeholder";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  experiencesQuery,
  featuredProjectsQuery,
  servicesQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import type {
  Experience,
  Project,
  Service,
  SiteSettings,
} from "@/sanity/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, featuredProjects, services, experiences] =
    await Promise.all([
      sanityFetch<SiteSettings>(siteSettingsQuery),
      sanityFetch<Project[]>(featuredProjectsQuery),
      sanityFetch<Service[]>(servicesQuery),
      sanityFetch<Experience[]>(experiencesQuery),
    ]);

  // In the empty/unconfigured state everything falls back to sample content so
  // the template looks complete. Once real Site Settings exist, each section
  // only appears if it actually has content — so a client can drop the ones
  // they don't need simply by leaving them empty.
  const isPlaceholder = !settings;
  const resolved = settings ?? placeholderSettings;

  const withFallback = <T,>(real: T[] | null | undefined, sample: T[]): T[] =>
    real?.length ? real : isPlaceholder ? sample : [];

  const projects = withFallback(featuredProjects, placeholderProjects);
  const serviceList = withFallback(services, placeholderServices);
  const timeline = withFallback(experiences, placeholderExperiences);

  return (
    <>
      <Hero settings={resolved} isPlaceholder={isPlaceholder} />

      {resolved.aboutTitle && <About settings={resolved} />}

      {serviceList.length > 0 && <Services services={serviceList} />}

      {projects.length > 0 && (
        <section className="mx-auto max-w-6xl scroll-mt-28 px-6 py-28" id="work">
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
      )}

      {timeline.length > 0 && (
        <section className="mx-auto max-w-6xl scroll-mt-28 px-6 py-28">
          <SectionHeading eyebrow="Career" title="Experience" id="experience" />
          <div className="mt-14">
            <ExperienceTimeline experiences={timeline} />
          </div>
        </section>
      )}
    </>
  );
}
