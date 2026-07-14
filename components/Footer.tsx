import type { SiteSettings } from "@/sanity/lib/types";

import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="mt-32 scroll-mt-20 border-t border-line bg-surface/50"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="rule-dot font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Contact
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-5xl font-medium leading-[1.03] tracking-tight sm:text-7xl">
            Let&apos;s make something{" "}
            <span className="italic text-accent">worth keeping.</span>
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            Have a project in mind, or just want to say hi? Reach out through
            any of the links below.
          </p>
          <div className="mt-10">
            <SocialLinks links={settings.socialLinks} />
          </div>
        </Reveal>
        <p className="mt-20 border-t border-line pt-8 font-mono text-xs text-muted">
          © {year} {settings.name ?? "Your Name"} · Built with Next.js +
          Sanity
        </p>
      </div>
    </footer>
  );
}
