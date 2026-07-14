import type {
  Experience,
  Project,
  SiteSettings,
} from "@/sanity/lib/types";

/**
 * Placeholder content shown when the Sanity dataset is empty (or not yet
 * configured), so the template always renders as a complete-looking site.
 * It disappears automatically as soon as real documents exist.
 *
 * The samples deliberately span different crafts — the template works as a
 * portfolio for building, art, photography, development, or anything else.
 */

export const placeholderSettings: SiteSettings = {
  name: "Your Name",
  tagline: "A portfolio for the work you're proud of — whatever your craft.",
  bio: "This is placeholder content. Open the Studio at /studio, create a Site Settings document, and this section will use your real name, tagline and bio.",
  socialLinks: [
    { label: "Instagram", url: "#" },
    { label: "LinkedIn", url: "#" },
    { label: "Email", url: "#" },
  ],
};

export const placeholderProjects: Project[] = [
  {
    _id: "placeholder-1",
    title: "Riverside House Renovation",
    summary:
      "A full renovation of a 1920s riverside home — new timber frame extension, restored brickwork and a light-filled kitchen.",
    tags: ["Renovation", "Residential"],
    featured: true,
  },
  {
    _id: "placeholder-2",
    title: "Coastal Light — Photo Series",
    summary:
      "A twelve-image series shot along the northern coast across one winter, exhibited at the local gallery in spring.",
    tags: ["Photography", "Exhibition"],
    featured: true,
  },
  {
    _id: "placeholder-3",
    title: "Nimbus Web App",
    summary:
      "A real-time analytics dashboard with fluid data visualizations, built for a fast-moving product team.",
    tags: ["Web app", "Next.js"],
    featured: true,
  },
];

export const placeholderExperiences: Experience[] = [
  {
    _id: "placeholder-exp-1",
    company: "Acme Studio",
    role: "Senior Project Lead",
    startDate: "2023-01-01",
    description:
      "Leading client projects end to end — planning, budgets and delivery — for a busy multidisciplinary studio.",
  },
  {
    _id: "placeholder-exp-2",
    company: "Northwind & Co",
    role: "Project Manager",
    startDate: "2020-06-01",
    endDate: "2022-12-01",
    description:
      "Ran a portfolio of mid-size commissions and built the processes the team still uses today.",
  },
  {
    _id: "placeholder-exp-3",
    company: "Freelance",
    role: "Independent",
    startDate: "2018-01-01",
    endDate: "2020-05-01",
    description:
      "Worked directly with clients on a wide range of commissions, from first sketch to final delivery.",
  },
];
