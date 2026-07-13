"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Nav({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight transition-colors hover:text-accent"
        >
          {name}
        </Link>
        <ul className="flex items-center gap-7 font-mono text-sm text-muted">
          <li>
            <Link
              href="/projects"
              className="link-underline pb-1 transition-colors hover:text-foreground"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/#experience"
              className="link-underline pb-1 transition-colors hover:text-foreground"
            >
              Experience
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="rounded-full border border-line px-4 py-1.5 transition-all duration-300 hover:border-accent hover:text-accent"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
