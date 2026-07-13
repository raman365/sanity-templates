# Sanity Templates Gallery

A gallery website that showcases your Sanity website templates. It treats **one
GitHub repository as the source of truth: every branch = one template**, fetched
live from the GitHub API — no database, no CMS for the gallery itself.

## How it works

1. The site calls `GET https://api.github.com/repos/<owner>/<repo>/branches`
   and lists every branch (except `main`, `master`, `gh-pages`).
2. For each branch it tries to read a `template.json` at the branch root
   (served from `raw.githubusercontent.com`, so it doesn't eat API quota).
3. Each template renders as a card with a live-demo link, a link to the branch,
   and a copyable `git clone -b <branch> --single-branch …` command.

## Setup

```sh
cp .env.example .env.local   # then fill in your GitHub owner + repo
npm install
npm run dev
```

## Make a branch look good

In each template branch, add at the root:

**`template.json`**

```json
{
  "title": "Portfolio Starter",
  "description": "A minimal portfolio powered by Sanity + Next.js.",
  "tags": ["portfolio", "next.js"],
  "demo": "https://your-demo.vercel.app",
  "cover": "cover.png"
}
```

**`cover.png`** — a 16:9 preview image (AI-generated works great). Referenced
by the `cover` field; any path/filename inside the branch is fine.

Every field is optional — branches without `template.json` still show up with a
prettified branch name and a generated gradient cover.

## Notes

- **Public repo:** works out of the box, no auth. Unauthenticated GitHub API
  allows 60 requests/hour per IP; the gallery only spends 1 per page load.
- **Private repo / higher limits:** set `VITE_GITHUB_TOKEN` in `.env.local`.
  ⚠️ Local dev only — a token bundled into a deployed site is public.
- Hidden branches are configured in [src/config.ts](src/config.ts).
