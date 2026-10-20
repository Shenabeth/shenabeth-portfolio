# Editing content

Almost everything on the site is typed data in `src/config/`, rendered by shared components.
You rarely touch markup to change content. This guide covers the common edits.

## Where each thing lives

| Content                              | File |
| ------------------------------------ | ---- |
| Featured projects (home page)        | `src/config/constants.ts` → `FEATURED_PROJECTS` |
| Project index capability cards      | `src/config/constants.ts` → `PROJECT_CAPABILITIES`, `MORE_PROJECT_CAPABILITIES` |
| A project's detail / case-study page | `src/config/case-studies.ts` → `CASE_STUDIES` |
| Certifications                       | `src/config/constants.ts` → `CERTIFICATIONS` |
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
  demoLink: 'https://weather-dashboard.example.com',            // optional live link
  caseStudyLink: '/projects/weather-dashboard',
  status: 'live',                        // 'live' | 'coming-soon' | 'in-progress'
  featured: true,
  // imageUrl: '/projects/weather-dashboard.png', // optional; see "Project card visuals" below
}
```

This entry feeds the home page's project cards. The `/projects` index uses separate capability
cards, configured in `PROJECT_CAPABILITIES` and `MORE_PROJECT_CAPABILITIES`.

### 2. Add the detail page — `src/config/case-studies.ts`

Add a `CaseStudy` keyed by the same slug. Only include the sections you want; the page renders
exactly the sections you provide, in a **fixed order**: tech stack → at a glance → why built →
impact → team → controls → showcase → features → gallery → lessons. See
[ARCHITECTURE.md](ARCHITECTURE.md#the-project--case-study-system-the-template).

```ts
'weather-dashboard': {
  slug: 'weather-dashboard',
  title: 'Weather Dashboard',
  summary: 'One or two sentences introducing the project.',
  links: [                               // optional live/source buttons under the summary
    { label: 'Live demo', href: 'https://…', primary: true },
    { label: 'View source', href: 'https://github.com/…' },
  ],
  languages: [
    { name: 'TypeScript', percent: 94.0, color: '#3178c6' },
    { name: 'CSS', percent: 6.0, color: '#563d7c' },
  ],
  techStack: [
    { label: 'Framework', items: ['React', 'TypeScript'] },
    { label: 'Data', items: ['Open-Meteo API', 'Charts'] },
  ],
  // Optional sections — omit any you don't need:
  // overview: [{ label: 'Role', value: 'Solo' }, { label: 'Status', value: 'Live' }],
  // problem:  { before: {...}, after: {...} },
  // impact:   [{ value: '…', label: '…', description: '…' }],
  // roles:    [{ role: 'Me', contribution: '…', isMe: true }, { role: 'Teammate', contribution: '…' }],
  // controls: [{ keys: 'WASD', action: 'Move' }],
  // showcase: { title: 'Mechanics', description: '…', items: [{ title: '…', body: '…', image: '/projects/…png', caption: 'Figure 1. …' }] },
  // gallery:  { title: 'Process', items: [{ image: '/projects/…png', caption: 'Figure 1. …' }] },
  features: [
    { title: 'Feature name', body: 'What it does.' },
  ],
  lessons: ['A takeaway from building it.'],
}
```

**The optional sections**

| Field      | Renders as | Use it for |
| ---------- | ---------- | ---------- |
| `overview` | "At a Glance" fact tiles (label/value) | Genre, tools, role, team size, status |
| `problem`  | Before / after columns | A rebuild or migration story |
| `impact`   | Stat tiles (optional count-up) | Measurable outcomes |
| `roles`    | "The Team" credits list | Collaborative projects (flag your row with `isMe: true`) |
| `controls` | Key → action legend | Games / interactive tools |
| `showcase` | Figure cards (image + title + body + caption) | Walking through the distinct pieces of a project |
| `features` | Feature cards (title + body) | Headline capabilities |
| `gallery`  | Captioned image grid | Process shots, wireframes, screenshots |
| `lessons`  | Numbered takeaways | Reflection, what you'd do next |

`showcase` and `gallery` images are **optional** — a card with no `image` renders a clean
captioned frame, so the page is complete before screenshots exist. When you add images, every
figure shares one aspect ratio and is cover-fit, so cards stay uniform.

**Guidelines**

- Keep it accurate. Describe only what's built; mark planned work as planned.
- For the `languages` bar, use each language's canonical GitHub color and make the percentages
  sum to ~100.
- `impact`, `overview`, `features`, and `showcase` grids read best with 2–4 or 6 entries; grids
  are balanced automatically via `.balanced-grid`.

## Project card visuals

`FeaturedProjectPanel` can show a visual next to a project's copy, rendered by
`src/components/projects/ProjectVisual.tsx`, but it is not currently used on the public project
listings. The `/projects` page uses capability cards, and the home page uses text-first project
cards. The optional panel visual works as follows:

1. If the project's `imageUrl` is set (in `FEATURED_PROJECTS`), that screenshot is shown,
   cover-fit inside a fixed frame so every card's image is the same size and never distorts.
   Put the file in `public/projects/` and set `imageUrl: '/projects/<name>.png'`.
2. Otherwise, each of the three known project ids (`portfolio-site`, `sai-system`, `dog-game`)
   has a hand-built SVG illustration in `src/components/projects/visuals/`. These are finished
   visuals, not placeholders.
3. Any other project with no image falls back to a titled frame.

To give a new project an illustration instead of a screenshot, add a component under
`visuals/` and map its id in `ART_BY_ID` in `ProjectVisual.tsx`.

### Dog Game screenshots

The Dog Game case study's `showcase` and `gallery` items have empty `image` fields, ready for
screenshots. Drop files in `public/projects/dog-game/` and set each item's `image` path (the
figure captions in `case-studies.ts` say what each one should show).

After both edits, the project appears on the home page, the Projects nav dropdown lists it
automatically, and `/projects/<slug>` renders its page. To list it on `/projects`, also add a
capability entry to the appropriate array above.

## Adding a certification

Add an entry to `CERTIFICATIONS` in `src/config/constants.ts`. Every certification in the list
is shown; order the array newest first, since it renders in order. Below the list a single
button links out to the Credly profile:

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
