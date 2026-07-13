/**
 * Point the gallery at the GitHub repository that holds your templates.
 * Every branch in this repo (except the ones in HIDDEN_BRANCHES) is shown
 * as a template card.
 *
 * You can either edit the fallback values here or create a `.env.local`
 * file (see `.env.example`).
 */
export const GITHUB_OWNER: string =
  import.meta.env.VITE_GITHUB_OWNER ?? ''

export const GITHUB_REPO: string =
  import.meta.env.VITE_GITHUB_REPO ?? ''

/** Branches that are not templates and should never be listed. */
export const HIDDEN_BRANCHES = ['main', 'master', 'gh-pages']

/**
 * Optional. Raises the GitHub API rate limit from 60 to 5000 requests/hour
 * and allows private repos. Only use this for local development — anything
 * bundled into a deployed site is publicly readable!
 */
export const GITHUB_TOKEN: string | undefined =
  import.meta.env.VITE_GITHUB_TOKEN || undefined

export const isConfigured = GITHUB_OWNER !== '' && GITHUB_REPO !== ''

export const repoUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`
