import Image from "next/image";

import { formatDateRange } from "@/lib/format";
import { urlFor } from "@/sanity/lib/image";
import type { Experience } from "@/sanity/lib/types";

import { Reveal } from "./Reveal";

export function ExperienceTimeline({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <ol className="relative ml-2 border-l border-line">
      {experiences.map((experience, index) => (
        <li key={experience._id} className="relative pb-14 pl-10 last:pb-0">
          <span className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-accent shadow-[0_0_12px_rgba(181,80,47,0.5)]" />
          <Reveal delay={index * 100}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {formatDateRange(experience.startDate, experience.endDate)}
            </p>
            <div className="mt-3 flex items-center gap-4">
              {experience.logo?.asset && (
                <span className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-line bg-surface">
                  <Image
                    src={urlFor(experience.logo).width(88).height(88).url()}
                    alt={experience.logo.alt ?? experience.company ?? "Logo"}
                    fill
                    sizes="2.75rem"
                    className="object-contain p-1.5"
                  />
                </span>
              )}
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight">
                  {experience.role}
                </h3>
                <p className="font-mono text-sm text-accent">
                  {experience.company}
                </p>
              </div>
            </div>
            {experience.description && (
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                {experience.description}
              </p>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
