import { useState } from 'react'
import type { Template } from '../types'

/** Deterministic gradient per branch so cards without a cover still look good. */
const GRADIENTS = [
  ['#f03e2f', '#f97316'],
  ['#7c3aed', '#ec4899'],
  ['#0ea5e9', '#22d3ee'],
  ['#10b981', '#84cc16'],
  ['#f59e0b', '#ef4444'],
  ['#6366f1', '#a855f7'],
]

function gradientFor(branch: string): [string, string] {
  let hash = 0
  for (const ch of branch) hash = (hash * 31 + ch.charCodeAt(0)) | 0
  const [a, b] = GRADIENTS[Math.abs(hash) % GRADIENTS.length]
  return [a, b]
}

export function TemplateCard({ template }: { template: Template }) {
  const [copied, setCopied] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const [from, to] = gradientFor(template.branch)

  const copyClone = async () => {
    await navigator.clipboard.writeText(template.cloneCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const showImage = template.coverUrl && !imgFailed

  return (
    <article className="card">
      <div
        className="card-cover"
        style={
          showImage
            ? undefined
            : { background: `linear-gradient(135deg, ${from}, ${to})` }
        }
      >
        {showImage ? (
          <img
            src={template.coverUrl}
            alt={`${template.title} preview`}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="card-cover-initial" aria-hidden="true">
            {template.title.slice(0, 2)}
          </span>
        )}
        <span className="card-branch">
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
            <path
              fill="currentColor"
              d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z"
            />
          </svg>
          {template.branch}
        </span>
      </div>

      <div className="card-body">
        <h3>{template.title}</h3>
        <p>{template.description}</p>
        {template.tags.length > 0 && (
          <ul className="card-tags">
            {template.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="card-actions">
        {template.demoUrl && (
          <a
            className="btn btn-primary"
            href={template.demoUrl}
            target="_blank"
            rel="noreferrer"
          >
            Live demo
          </a>
        )}
        <a
          className="btn"
          href={template.branchUrl}
          target="_blank"
          rel="noreferrer"
        >
          Code
        </a>
        <button
          type="button"
          className={`btn btn-copy${copied ? ' copied' : ''}`}
          onClick={copyClone}
          title={template.cloneCommand}
        >
          {copied ? 'Copied!' : 'Clone'}
        </button>
      </div>
    </article>
  )
}
