# Editing content

Almost everything on the site is typed data in `src/config/`, rendered by shared components.
You rarely touch markup to change content. This guide covers the common edits.

## Where each thing lives

| Content                              | File |
| ------------------------------------ | ---- |
| Featured projects (home + projects)  | `src/config/constants.ts` → `FEATURED_PROJECTS` |
| A project's detail / case-study page | `src/config/case-studies.ts` → `CASE_STUDIES` |
| Certifications                       | `src/config/constants.ts` → `CERTIFICATIONS`, `HIDDEN_CERTIFICATIONS` |
| Education                            | `src/config/constants.ts` → `EDUCATION` |
| Skills / tech stack (About page)     | `src/config/constants.ts` → `TECH_STACK` |
| Social links + contact email         | `src/config/constants.ts` → `SOCIAL_LINKS`, `CONTACT_EMAIL` |
| Resume                               | `Shenabeth_Jenkins_Software_Engineer_Resume.pdf` (repo root) |

Images (certification and school logos) live in `public/certs/` and `public/schools/` and are
referenced by path (e.g. `/certs/aws-ccp.png`).

## Updating the resume

Replace `Shenabeth_Jenkins_Software_Engineer_Resume.pdf` in the repo root. The
build copies it into `public/` automatically, and the Resume buttons already point at it. Keep
the filename the same (it's the name visitors get when they download, and the URL is derived
from it in `RESUME`).

## Adding a project

A project appears in two places, so there are two steps.

### 1. Add the summary card — `src/config/constants.ts`

Add an entry to `FEATURED_PROJECTS`. The `id` is the URL slug used for the detail page.

```ts
{
  id: 'weather-dashboard',               // becomes /projects/weather-dashboard
  title: 'Weather Dashboard',
  category: 'Front-End · Data Viz',
  description: 'Short one-liner shown on the carousel card.',
  longDescription: 'A fuller paragraph (optional).',
  techStack: ['React', 'TypeScript', 'Charts'],  // first 3 show as chips
  githubLink: 'https://github.com/Shenabeth/weather-dashboard', // optional
  caseStudyLink: '/projects/weather-dashboard',
  status: 'live',                        // 'live' | 'coming-soon' | 'in-progress'
  featured: true,
}
```

### 2. Add the detail page — `src/config/case-studies.ts`

Add a `CaseStudy` keyed by the same slug. Only include the sections you want; the page renders
exactly the sections you provide, in a fixed order (tech stack → why built → impact → features
→ lessons). See [ARCHITECTURE.md](ARCHITECTURE.md#the-project--case-study-system-the-template).

```ts
'weather-dashboard': {
  slug: 'weather-dashboard',
  title: 'Weather Dashboard',
  summary: 'One or two sentences introducing the project.',
  languages: [
    { name: 'TypeScript', percent: 94.0, color: '#3178c6' },
    { name: 'CSS', percent: 6.0, color: '#563d7c' },
  ],
  techStack: [
    { label: 'Framework', items: ['React', 'TypeScript'] },
    { label: 'Data', items: ['Open-Meteo API', 'Charts'] },
  ],
  // Optional sections — omit any you don't need:
  // problem: { before: {...}, after: {...} },
  // impact:  [{ value: '…', label: '…', description: '…' }],
  features: [
    { title: 'Feature name', body: 'What it does.' },
  ],
  lessons: ['A takeaway from building it.'],
}
```

**Guidelines**

- Keep it accurate. Describe only what's built; mark planned work as planned.
- For the `languages` bar, use each language's canonical GitHub color and make the percentages
  sum to ~100.
- `impact` tiles read best with 2–4 entries; grids are balanced automatically.

After both edits, the card appears in the carousel, the Projects nav dropdown lists it
automatically, and `/projects/<slug>` renders its page. No new files needed.

## Adding a certification

Add an entry to `CERTIFICATIONS` (shown by default) or `HIDDEN_CERTIFICATIONS` (revealed by the
"view all credentials" toggle) in `src/config/constants.ts`:

```ts
{
  id: 'aws-saa-c03',
  name: 'AWS Certified Solutions Architect – Associate',
  code: 'SAA',                   // fallback label if there's no badge image
  issuer: 'Amazon Web Services',
  dateEarned: 'June 2026',       // or 'In Progress'
  credlyUrl: 'https://www.credly.com/badges/…',
  badgeUrl: '/certs/aws-saa.png', // put the image in public/certs/
}
```

The date is normalized to an "Issued Mon YYYY" format automatically; `In Progress` is shown
as-is.

## Editing skills (About page tech stack)

Edit the `TECH_STACK` array in `src/config/constants.ts`. Each category becomes a tab on the
About page's tech-stack grid. Each skill is matched to an icon in `src/config/techIcons.ts`;
add a mapping there if you introduce a skill that doesn't have one yet (it falls back to a
generic icon otherwise).

## Changing social links or contact email

Edit `SOCIAL_LINKS` and `CONTACT_EMAIL` in `src/config/constants.ts`. These feed the hero, the
contact section, and the footer.
