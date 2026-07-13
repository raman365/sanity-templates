import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/sanity/lib/types";

import { SocialLinks } from "./SocialLinks";

interface HeroProps {
  settings: SiteSettings;
  isPlaceholder: boolean;
}

export function Hero({ settings, isPlaceholder }: HeroProps) {
  const { name, tagline, bio, profileImage, socialLinks } = settings;

  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col justify-center px-6 pb-24 pt-40 min-h-[92svh]">
        {isPlaceholder && (
          <p className="animate-fade-up mb-8 w-fit rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs text-muted">
            Sample content — open{" "}
            <Link href="/studio" className="text-accent hover:underline">
              /studio
            </Link>{" "}
            to make it yours
          </p>
        )}

        <div className="flex flex-col-reverse items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p
              className="animate-fade-up font-mono text-sm uppercase tracking-[0.25em] text-accent"
              style={{ animationDelay: "0.05s" }}
            >
              Portfolio
            </p>
            <h1
              className="animate-fade-up mt-5 font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
              style={{ animationDelay: "0.15s" }}
            >
              {name}
            </h1>
            {tagline && (
              <p
                className="animate-fade-up mt-7 max-w-xl text-xl leading-relaxed text-muted sm:text-2xl"
                style={{ animationDelay: "0.3s" }}
              >
                {tagline}
              </p>
            )}
            {bio && (
              <p
                className="animate-fade-up mt-5 max-w-xl leading-relaxed text-muted/80"
                style={{ animationDelay: "0.4s" }}
              >
                {bio}
              </p>
            )}
            <div
              className="animate-fade-up mt-9"
              style={{ animationDelay: "0.5s" }}
            >
              <SocialLinks links={socialLinks} />
            </div>
          </div>

          {profileImage?.asset && (
            <div
              className="animate-fade-up relative size-40 shrink-0 overflow-hidden rounded-2xl border border-line sm:size-52 lg:size-64"
              style={{ animationDelay: "0.25s" }}
            >
              <Image
                src={urlFor(profileImage).width(512).height(512).url()}
                alt={profileImage.alt ?? name ?? "Profile photo"}
                fill
                sizes="(min-width: 1024px) 16rem, 13rem"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        <a
          href="#work"
          className="animate-fade-up group absolute bottom-10 left-6 hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent sm:flex"
          style={{ animationDelay: "0.7s" }}
        >
          <span className="block h-px w-10 bg-muted transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
          Scroll
        </a>
      </div>
    </section>
  );
}
