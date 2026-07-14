import type { Service } from "@/sanity/lib/types";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-28">
      <SectionHeading eyebrow="What we do" title="Services" />

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service._id} delay={index * 80}>
            <article className="group flex h-full flex-col bg-surface p-8 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-accent)_4%,var(--color-surface))]">
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden>
                  {service.icon || "◆"}
                </span>
                <span className="font-mono text-sm text-muted/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent">
                {service.title}
              </h3>
              {service.description && (
                <p className="mt-3 flex-1 leading-relaxed text-muted">
                  {service.description}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
