import type {
  Experience,
  Project,
  SiteSettings,
} from "@/sanity/lib/types";

/**
 * Placeholder content shown when the Sanity dataset is empty (or not yet
 * configured), so the template always renders as a complete-looking site.
 * It disappears automatically as soon as real documents exist.
 */

export const placeholderSettings: SiteSettings = {
  name: "Your Name",
  tagline: "Designer & developer crafting thoughtful digital experiences.",
  bio: "This is placeholder content. Open the Studio at /studio, create a Site Settings document, and this section will use your real name, tagline and bio.",
  socialLinks: [
    { label: "GitHub", url: "#" },
    { label: "LinkedIn", url: "#" },
    { label: "Email", url: "#" },
  ],
};

export const placeholderProjects: Project[] = [
  {
    _id: "placeholder-1",
    title: "Aurora Dashboard",
    summary:
      "A real-time analytics dashboard with fluid data visualizations and a dark, glassy interface.",
    tech: ["Next.js", "TypeScript", "D3"],
    featured: true,
  },
  {
    _id: "placeholder-2",
    title: "Fieldnotes",
    summary:
      "A minimal note-taking app built around speed — instant search, offline-first, keyboard everything.",
    tech: ["React", "SQLite", "Tauri"],
    featured: true,
  },
  {
    _id: "placeholder-3",
    title: "Waypoint API",
    summary:
      "A geospatial routing API serving millions of requests a day with sub-50ms latency.",
    tech: ["Go", "PostGIS", "Redis"],
    featured: true,
  },
];

export const placeholderExperiences: Experience[] = [
  {
    _id: "placeholder-exp-1",
    company: "Acme Studio",
    role: "Senior Product Engineer",
    startDate: "2023-01-01",
    description:
      "Led the design-engineering team building tools used by thousands of creators every day.",
  },
  {
    _id: "placeholder-exp-2",
    company: "Northwind Labs",
    role: "Frontend Engineer",
    startDate: "2020-06-01",
    endDate: "2022-12-01",
    description:
      "Shipped the company's design system and rebuilt the core product UI from the ground up.",
  },
  {
    _id: "placeholder-exp-3",
    company: "Freelance",
    role: "Designer & Developer",
    startDate: "2018-01-01",
    endDate: "2020-05-01",
    description:
      "Worked with startups and agencies on brand sites, product prototypes and interactive experiences.",
  },
];
