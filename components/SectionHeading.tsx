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
        <p className="rule-dot font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
        <h2 className="mt-5 font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
