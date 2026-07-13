/**
 * Sanity configuration comes exclusively from environment variables so this
 * template works for anyone who clones it. See `.env.example`.
 *
 * The "placeholder" fallback lets the site build and render (with sample
 * content) before a real project is configured — fetches are skipped entirely
 * in that case, see `sanity/lib/fetch.ts`.
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const isSanityConfigured = projectId !== "placeholder";
