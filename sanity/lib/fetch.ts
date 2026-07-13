import type { QueryParams } from "next-sanity";

import { isSanityConfigured } from "../env";
import { client } from "./client";

/**
 * Fetch from Sanity, but never crash the site:
 * - If no project is configured yet, skip the request entirely.
 * - If the request fails (bad project id, network, etc.), return null so
 *   pages can fall back to placeholder content.
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
): Promise<T | null> {
  if (!isSanityConfigured) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}
