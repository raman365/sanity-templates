import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  id?: string;
}

export function SectionHeading({ eyebrow, title, id }: SectionHeadingProps) {
  return (
    <Reveal>
      <div id={id} className="scroll-mt-28">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
