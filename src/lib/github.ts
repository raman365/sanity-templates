import {
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_TOKEN,
  HIDDEN_BRANCHES,
} from '../config'
import type { Template, TemplateMeta } from '../types'

const API = 'https://api.github.com'

interface ApiBranch {
  name: string
}

function rawUrl(branch: string, path: string): string {
  return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${encodeURIComponent(branch)}/${path}`
}

async function fetchBranchNames(): Promise<string[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  }
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`

  const res = await fetch(
    `${API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/branches?per_page=100`,
    { headers },
  )
  if (res.status === 404) throw new Error('not-found')
  if (res.status === 403 || res.status === 429) throw new Error('rate-limited')
  if (!res.ok) throw new Error('network')

  const branches = (await res.json()) as ApiBranch[]
  return branches
    .map((b) => b.name)
    .filter((name) => !HIDDEN_BRANCHES.includes(name))
}

/**
 * Reads the optional `template.json` at the root of a branch. Served from
 * raw.githubusercontent.com, so it does not count against the API rate limit.
 */
async function fetchMeta(branch: string): Promise<TemplateMeta> {
  try {
    const res = await fetch(rawUrl(branch, 'template.json'))
    if (!res.ok) return {}
    return (await res.json()) as TemplateMeta
  } catch {
    return {}
  }
}

function prettify(branch: string): string {
  return branch
    .replace(/^(template|templates)[/-]/, '')
    .replace(/[-_/]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export async function loadTemplates(): Promise<Template[]> {
  const names = await fetchBranchNames()
  const metas = await Promise.all(names.map(fetchMeta))

  return names.map((branch, i) => {
    const meta = metas[i]
    return {
      branch,
      title: meta.title ?? prettify(branch),
      description:
        meta.description ??
        'No description yet — add a template.json to this branch.',
      tags: meta.tags ?? [],
      demoUrl: meta.demo,
      coverUrl: meta.cover ? rawUrl(branch, meta.cover) : undefined,
      branchUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/tree/${encodeURIComponent(branch)}`,
      cloneCommand: `git clone -b ${branch} --single-branch https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}.git`,
    }
  })
}
