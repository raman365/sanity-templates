import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-6xl flex-col items-start justify-center px-6 pt-24">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 max-w-md leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist — it may have been
        moved, or the content hasn&apos;t been published yet.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-accent px-6 py-2.5 font-mono text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dim"
      >
        Back home
      </Link>
    </div>
  );
}
