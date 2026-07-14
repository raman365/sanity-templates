import { useEffect, useMemo, useState } from 'react'
import { GITHUB_OWNER, GITHUB_REPO, isConfigured, repoUrl } from './config'
import { loadTemplates } from './lib/github'
import { SetupPanel } from './components/SetupPanel'
import { TemplateCard } from './components/TemplateCard'
import type { LoadState } from './types'
import './App.css'

const ERROR_MESSAGES = {
  'not-found': `Repository ${GITHUB_OWNER}/${GITHUB_REPO} was not found. Check the owner/repo in your .env.local — private repos need a VITE_GITHUB_TOKEN.`,
  'rate-limited':
    'GitHub API rate limit reached (60 requests/hour without a token). Wait a bit or add a VITE_GITHUB_TOKEN for local development.',
  network: 'Could not reach GitHub. Check your connection and try again.',
} as const

function App() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  useEffect(() => {
    if (!isConfigured) return
    let cancelled = false
    loadTemplates()
      .then((templates) => {
        if (!cancelled) setState({ status: 'ready', templates })
      })
      .catch((err: Error) => {
        const kind =
          err.message === 'not-found' || err.message === 'rate-limited'
            ? err.message
            : 'network'
        if (!cancelled) setState({ status: 'error', kind })
      })
    return () => {
      cancelled = true
    }
  }, [])

  const templates = useMemo(
    () => (state.status === 'ready' ? state.templates : []),
    [state],
  )

  const allTags = useMemo(
    () => [...new Set(templates.flatMap((t) => t.tags))].sort(),
    [templates],
  )

  const visible = templates.filter((t) => {
    const q = query.trim().toLowerCase()
    const matchesQuery =
      q === '' ||
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.branch.toLowerCase().includes(q)
    const matchesTag = activeTag === null || t.tags.includes(activeTag)
    return matchesQuery && matchesTag
  })

  return (
    <div className="page">
      <div className="glow" aria-hidden="true" />

      <header className="site-header">
        <span className="logo">
          <span className="logo-mark" aria-hidden="true" />
          sanity·templates
        </span>
        {isConfigured && (
          <a className="btn" href={repoUrl} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        )}
      </header>

      <div className="masthead">
        <span>Gallery</span>
        <span className="masthead-mid">One branch · one template</span>
        <span>©&nbsp;{new Date().getFullYear()}</span>
      </div>

      <section className="hero">
        <p className="hero-kicker">One repo · one branch per template</p>
        <h1>
          Start every project from a<span className="accent"> template</span>
        </h1>
        <p className="hero-sub">
          A living gallery of Sanity-powered starters, pulled straight from the
          branches of{' '}
          {isConfigured ? (
            <a href={repoUrl} target="_blank" rel="noreferrer">
              {GITHUB_OWNER}/{GITHUB_REPO}
            </a>
          ) : (
            'your GitHub repository'
          )}
          .
        </p>
      </section>

      {!isConfigured ? (
        <SetupPanel />
      ) : state.status === 'error' ? (
        <div className="notice">{ERROR_MESSAGES[state.kind]}</div>
      ) : (
        <>
          <div className="toolbar">
            <input
              type="search"
              placeholder="Search templates…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {allTags.length > 0 && (
              <div className="tag-filter">
                <button
                  type="button"
                  className={activeTag === null ? 'active' : ''}
                  onClick={() => setActiveTag(null)}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={activeTag === tag ? 'active' : ''}
                    onClick={() =>
                      setActiveTag(activeTag === tag ? null : tag)
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {state.status === 'loading' ? (
            <div className="grid">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="card skeleton" />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="notice">
              {templates.length === 0
                ? 'No template branches yet. Push a branch to the repo and it will show up here.'
                : 'Nothing matches your search.'}
            </div>
          ) : (
            <div className="grid">
              {visible.map((t) => (
                <TemplateCard key={t.branch} template={t} />
              ))}
            </div>
          )}
        </>
      )}

      <footer className="site-footer">
        Built with Vite + React · templates served fresh from GitHub branches
      </footer>
    </div>
  )
}

export default App
