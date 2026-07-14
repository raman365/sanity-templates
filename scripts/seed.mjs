/**
 * Seed the Sanity dataset with realistic demo content so the portfolio looks
 * populated. Idempotent — every document uses a fixed _id, so re-running
 * updates in place instead of creating duplicates.
 *
 * Usage:
 *   1. Create an Editor (write) token at sanity.io/manage -> API -> Tokens
 *   2. Add it to .env.local:  SANITY_WRITE_TOKEN=sk...
 *   3. node scripts/seed.mjs
 *
 * Images are intentionally left empty — the front-end renders tasteful
 * fallbacks for missing images, so the demo looks good without asset uploads.
 */
import { readFileSync } from 'node:fs'
import { createClient } from '@sanity/client'

// Minimal .env.local loader (no dependency needed).
try {
  for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
} catch {}

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error(
    '\n  Missing SANITY_WRITE_TOKEN.\n' +
      '  Create an Editor token at https://www.sanity.io/manage (project gq1f5qbq\n' +
      '  -> API -> Tokens), then add it to .env.local as SANITY_WRITE_TOKEN=sk...\n',
  )
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gq1f5qbq',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
})

// Helpers for Portable Text and keyed array items.
let k = 0
const key = () => `k${(k++).toString(36)}`
const block = (text) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  name: 'Alex Rivera',
  tagline: 'Maker & project lead — renovation, photography and digital work',
  bio: "I take on projects across disciplines — from restoring old houses to shooting photo series and building the occasional web app. Whatever the medium, I care about honest materials, careful planning, and finishing things properly.",
  socialLinks: [
    { _type: 'socialLink', _key: key(), label: 'Instagram', url: 'https://instagram.com' },
    { _type: 'socialLink', _key: key(), label: 'LinkedIn', url: 'https://linkedin.com' },
    { _type: 'socialLink', _key: key(), label: 'Email', url: 'mailto:hello@example.com' },
  ],
  aboutTitle: 'Who we are',
  aboutText:
    "I've spent the last decade taking on work most people would call unrelated — restoring old buildings, shooting photo series, building the occasional web app. What ties it together is the approach: understand the brief, respect the materials, and finish properly.\n\nEvery project gets the same care whether it's a kitchen extension or a commissioned mural. No shortcuts, no surprises — just work I'm happy to put my name to.",
  stats: [
    { _type: 'stat', _key: key(), value: '12+', label: 'Years' },
    { _type: 'stat', _key: key(), value: '150', label: 'Projects delivered' },
    { _type: 'stat', _key: key(), value: '100%', label: 'Referral rate' },
  ],
}

const services = [
  {
    _id: 'service-build',
    icon: '🏗️',
    order: 1,
    title: 'Design & build',
    description:
      'End-to-end delivery — planning, materials and craftsmanship, managed as one accountable process from first sketch to handover.',
  },
  {
    _id: 'service-photo',
    icon: '📷',
    order: 2,
    title: 'Photography',
    description:
      'Commissioned series and documentation — every stage captured properly, so finished work is presented as well as it deserves.',
  },
  {
    _id: 'service-art',
    icon: '🎨',
    order: 3,
    title: 'Commissioned art',
    description:
      'Murals and bespoke pieces made for a space and its story, built to last in the environment they live in.',
  },
  {
    _id: 'service-digital',
    icon: '💻',
    order: 4,
    title: 'Digital',
    description:
      'Fast, modern websites and web apps when a project needs a home online — designed and built in-house.',
  },
].map((s) => ({ _type: 'service', ...s }))

const projects = [
  {
    _id: 'project-riverside',
    title: 'Riverside House Renovation',
    slug: 'riverside-house-renovation',
    summary:
      'Full renovation of a 1920s riverside home — timber frame extension, restored brickwork and a light-filled kitchen.',
    body: [
      block('A fourteen-month renovation of a 1920s house on the river, taken back to the brick and rebuilt with a new timber-frame extension to the rear.'),
      block('The original brickwork was cleaned and repointed, sash windows restored, and the new kitchen opens onto the garden through full-height glazing.'),
    ],
    tags: ['Renovation', 'Residential'],
    client: 'Private client',
    date: '2025-09-01',
    location: 'Henley-on-Thames, UK',
    featured: true,
  },
  {
    _id: 'project-coastal-light',
    title: 'Coastal Light — Photo Series',
    slug: 'coastal-light',
    summary:
      'A twelve-image series shot along the northern coast across one winter, exhibited at the local gallery in spring.',
    body: [
      block('Coastal Light is a study of the same eight miles of shoreline photographed through a single winter — the same places returned to in different weather.'),
      block('The series was shown as large-format prints and is available as a short-run book.'),
    ],
    tags: ['Photography', 'Exhibition'],
    date: '2025-03-01',
    location: 'Norfolk, UK',
    link: 'https://example.com',
    linkLabel: 'Exhibition details',
    featured: true,
  },
  {
    _id: 'project-harbor-mural',
    title: 'Harbor Street Mural',
    slug: 'harbor-street-mural',
    summary:
      'A 30-metre commissioned mural celebrating the town’s fishing history, painted with a team of local volunteers.',
    body: [
      block('Commissioned by the town council, the mural traces the harbour’s working history across a 30-metre stretch of the old sea wall.'),
      block('It was painted over six weeks with a rotating crew of volunteers, using masonry paint chosen to weather the salt air.'),
    ],
    tags: ['Mural', 'Public art', 'Commission'],
    client: 'Town Council',
    date: '2024-07-01',
    location: 'Whitby, UK',
    featured: true,
  },
  {
    _id: 'project-nimbus',
    title: 'Nimbus Web App',
    slug: 'nimbus-web-app',
    summary:
      'A real-time analytics dashboard that turns millions of events into fluid, readable visualizations.',
    body: [
      block('Nimbus is a real-time analytics dashboard built for a product team that needed answers in seconds, not minutes.'),
      block('The frontend streams live data and renders it with a custom charting layer designed to stay readable at any scale.'),
    ],
    tags: ['Web app', 'Next.js'],
    client: 'Nimbus Inc.',
    date: '2024-01-01',
    link: 'https://example.com',
    linkLabel: 'Visit site',
    featured: false,
  },
].map((p) => ({ _type: 'project', ...p, slug: { _type: 'slug', current: p.slug } }))

const experience = [
  {
    _id: 'exp-studio',
    company: 'Rivera Projects',
    role: 'Founder & Project Lead',
    startDate: '2022-03-01',
    endDate: undefined,
    description:
      'Running my own practice — taking commissions across renovation, photography and digital work, from first sketch to final delivery.',
  },
  {
    _id: 'exp-northwind',
    company: 'Northwind & Co',
    role: 'Project Manager',
    startDate: '2019-06-01',
    endDate: '2022-02-01',
    description:
      'Managed a portfolio of mid-size client commissions and built the planning processes the team still uses today.',
  },
  {
    _id: 'exp-acme',
    company: 'Acme Studio',
    role: 'Assistant',
    startDate: '2017-01-01',
    endDate: '2019-05-01',
    description:
      'Learned the trade assisting on everything from site surveys to gallery installs for a busy multidisciplinary studio.',
  },
].map((e) => ({ _type: 'experience', ...e }))

// Documents created by older versions of this script, removed on re-seed so
// content is swapped rather than mixed.
const staleIds = [
  'project-fable',
  'project-waypoint',
  'project-pulse',
  'exp-vercel',
  'exp-linear',
  'exp-shopify',
]

async function run() {
  const docs = [siteSettings, ...services, ...projects, ...experience]
  let tx = client.transaction()
  for (const doc of docs) tx = tx.createOrReplace(doc)
  for (const id of staleIds) tx = tx.delete(id)
  await tx.commit()
  console.log(
    `\n  Seeded ${docs.length} documents into ${client.config().projectId}/${client.config().dataset}:\n` +
      `  - 1 site settings (Alex Rivera, with About + stats)\n` +
      `  - ${services.length} services\n` +
      `  - ${projects.length} projects (${projects.filter((p) => p.featured).length} featured)\n` +
      `  - ${experience.length} experience entries\n\n` +
      '  Refresh your site — the demo content is live.\n',
  )
}

run().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
