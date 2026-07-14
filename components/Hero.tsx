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
    <section id="top" className="hero-glow relative overflow-hidden">
      {/* Masthead rule */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between border-b border-line pb-4 pt-28 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
          <span>Portfolio</span>
          <span className="hidden sm:inline">Selected Work &amp; Services</span>
          <span>©&nbsp;{new Date().getFullYear()}</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        <div className="lg:col-span-8">
          {isPlaceholder && (
            <p className="animate-fade-up mb-8 w-fit rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs text-muted">
              Sample content — open{" "}
              <Link href="/studio" className="text-accent hover:underline">
                /studio
              </Link>{" "}
              to make it yours
            </p>
          )}

          <h1
            className="animate-fade-up font-display text-[3.4rem] font-medium leading-[0.98] tracking-tight sm:text-7xl lg:text-[6.5rem]"
            style={{ animationDelay: "0.1s" }}
          >
            {name}
          </h1>

          {tagline && (
            <p
              className="animate-fade-up mt-8 max-w-2xl font-display text-2xl font-light italic leading-snug text-foreground/80 sm:text-3xl"
              style={{ animationDelay: "0.25s" }}
            >
              {tagline}
            </p>
          )}

          {bio && (
            <p
              className="animate-fade-up mt-7 max-w-xl leading-relaxed text-muted"
              style={{ animationDelay: "0.35s" }}
            >
              {bio}
            </p>
          )}

          <div
            className="animate-fade-up mt-10"
            style={{ animationDelay: "0.45s" }}
          >
            <SocialLinks links={socialLinks} />
          </div>
        </div>

        <div className="lg:col-span-4 lg:pt-4">
          {profileImage?.asset ? (
            <div
              className="animate-fade-up relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-t-[999px] rounded-b-2xl border border-line"
              style={{ animationDelay: "0.2s" }}
            >
              <Image
                src={urlFor(profileImage).width(640).height(800).url()}
                alt={profileImage.alt ?? name ?? "Profile photo"}
                fill
                sizes="(min-width: 1024px) 20rem, 16rem"
                className="object-cover"
                priority
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <a
          href="#about"
          className="group hidden items-center gap-3 pb-10 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent sm:inline-flex"
        >
          <span className="block h-px w-10 bg-muted transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
          Scroll
        </a>
      </div>
    </section>
  );
}
