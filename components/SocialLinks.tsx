import type { SocialLink } from "@/sanity/lib/types";

export function SocialLinks({ links }: { links?: SocialLink[] }) {
  if (!links?.length) return null;

  return (
    <ul className="flex flex-wrap items-center gap-3">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            {link.label}
            <span aria-hidden className="text-xs">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
