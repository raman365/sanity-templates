# Portfolio — Next.js + Sanity template

A clean, modern portfolio powered by [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS) and [Sanity](https://www.sanity.io) as the CMS, with Sanity Studio embedded at `/studio`.

- **Home** — hero with your name and tagline, featured-projects grid, experience timeline, contact footer
- **/projects** — all projects
- **/projects/[slug]** — project detail with rich-text body, gallery, tech tags, live/repo links
- **/studio** — embedded Sanity Studio for editing content

The site renders gracefully with an empty (or unconfigured) dataset: every section falls back to sample placeholder content, which disappears as soon as you publish real documents.

## Getting started

### 1. Create a Sanity project

Sign in at [sanity.io/manage](https://www.sanity.io/manage) and create a new project (the free plan is fine). Note the **project ID** and create a dataset (the default name is `production`).

Or from the terminal:

```bash
npx sanity@latest init --bare
```

### 2. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
```

### 3. Allow localhost to access your project (CORS)

In [sanity.io/manage](https://www.sanity.io/manage), open your project → **API** → **CORS origins** and add `http://localhost:3000` (with credentials allowed, so the embedded Studio can sign in).

### 4. Run the dev server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the site with placeholder content.

### 5. Add your content

Open [http://localhost:3000/studio](http://localhost:3000/studio), sign in with your Sanity account, and create:

- **Site Settings** — your name, tagline, bio, profile image and social links
- **Projects** — mark your best ones as *Featured* to show them on the home page
- **Experience** — roles for the timeline (leave *End date* empty for your current role)

The site revalidates every 60 seconds in production; in dev you'll see changes on refresh.

## Content model

| Type | Fields |
| --- | --- |
| `siteSettings` | name, tagline, bio, profile image, social links |
| `project` | title, slug, summary, rich-text body, cover image, gallery, tech tags, live URL, repo URL, featured flag |
| `experience` | company, role, start/end dates, description, logo |

## Project structure

```
app/(site)/            # Public site (home, /projects, /projects/[slug])
app/studio/            # Embedded Sanity Studio
components/            # UI components
lib/placeholder.ts     # Fallback content for empty datasets
sanity/schemaTypes/    # Content schemas
sanity/lib/            # Client, queries, image helpers
sanity.config.ts       # Studio configuration
```

## Deploying

Deploy anywhere Next.js runs (e.g. [Vercel](https://vercel.com)). Set the two environment variables in your host's dashboard, and add your production URL to the CORS origins in Sanity so the Studio works at `https://your-domain.com/studio`.
