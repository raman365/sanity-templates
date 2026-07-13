/** Shape of the optional `template.json` file at the root of each branch. */
export interface TemplateMeta {
  title?: string
  description?: string
  tags?: string[]
  /** URL of a live demo / preview deployment. */
  demo?: string
  /** Path of a cover image inside the branch, e.g. "cover.png". */
  cover?: string
}

export interface Template {
  /** Branch name — the source of truth. */
  branch: string
  title: string
  description: string
  tags: string[]
  demoUrl?: string
  /** Absolute URL of the cover image, if the branch provides one. */
  coverUrl?: string
  branchUrl: string
  cloneCommand: string
}

export type LoadState =
  | { status: 'loading' }
  | { status: 'ready'; templates: Template[] }
  | { status: 'error'; kind: 'not-found' | 'rate-limited' | 'network' }
