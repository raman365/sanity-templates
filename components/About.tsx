import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/sanity/lib/types";

import { Reveal } from "./Reveal";

export function About({ settings }: { settings: SiteSettings }) {
  const { aboutTitle, aboutText, aboutImage, stats } = settings;
  const paragraphs = (aboutText ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="about" className="scroll-mt-28 border-t border-line bg-surface/40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
            About
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {aboutTitle}
          </h2>
          <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {stats && stats.length > 0 && (
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="bg-gradient-to-br from-accent to-[#8b7aff] bg-clip-text font-display text-5xl font-bold tracking-tight text-transparent">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/20 to-[#8b7aff]/10 blur-2xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              {aboutImage?.asset ? (
                <Image
                  src={urlFor(aboutImage).width(900).height(1125).url()}
                  alt={aboutImage.alt ?? aboutTitle ?? "About"}
                  fill
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-[radial-gradient(ellipse_at_top_left,#eef0ff,#e4e7f4)]">
                  <span className="font-display text-7xl font-bold text-accent/25">
                    {aboutTitle?.charAt(0) ?? "A"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
