import Image from "next/image";
import { PortableText, type PortableTextBlock } from "next-sanity";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

const components = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10">
          <div className="relative overflow-hidden rounded-xl border border-line">
            <Image
              src={urlFor(value).width(1400).url()}
              alt={value.alt ?? value.caption ?? ""}
              width={1400}
              height={875}
              className="h-auto w-full"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center font-mono text-xs text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-12 font-display text-3xl font-bold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-10 font-display text-2xl font-bold tracking-tight">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mt-6 leading-relaxed text-muted">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="mt-8 border-l-2 border-accent pl-6 text-lg italic text-foreground/90">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline text-accent"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mt-6 list-disc space-y-2 pl-6 text-muted marker:text-accent">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-6 text-muted marker:text-accent">
        {children}
      </ol>
    ),
  },
};

export function PortableTextBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
