# Architecture

This document describes how the portfolio site is built.

## Overview

A statically-rendered Next.js App Router site with one small dynamic endpoint. All page
content is stored as typed data in `src/config/` and rendered through shared components, so
pages are composed, not hand-written. There is no database and no application backend. The
only server code is the contact form route, which will send email via Amazon SES.

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 utilities plus a design-token layer in `app/globals.css`
- **UI primitives:** shadcn/ui (`button`, `input`, `textarea`) in `src/components/ui/`
- **Animation:** Framer Motion
- **Hosting:** AWS Amplify (build + host), with AWS Budgets + a CloudWatch billing alarm for cost monitoring

## Routing (App Router)

Routes live in `app/`. Each folder with a `page.tsx` is a route.

| Route                 | File                              | Rendering | Notes |
| --------------------- | --------------------------------- | --------- | ----- |
| `/`                   | `app/page.tsx`                    | Static    | Hero, featured projects, certifications, contact |
| `/about`              | `app/about/page.tsx`              | Static    | Education, certifications, tech stack |
| `/projects`          | `app/projects/page.tsx`           | Static    | Featured projects carousel + "more projects" |
| `/projects/[slug]`    | `app/projects/[slug]/page.tsx`    | SSG       | One case-study page per project, prerendered via `generateStaticParams` |
| `/admin/login`        | `app/admin/login/page.tsx`        | Static    | Sign-in UI; not wired to auth yet |
| `/admin`              | `app/admin/page.tsx`              | Static    | Dashboard + template-driven "new project" form; not wired to storage yet |
| `/api/contact`        | `app/api/contact/route.ts`        | Dynamic   | POST endpoint for the contact form; Amazon SES (planned) |

`app/layout.tsx` is the root layout. It renders the fixed `NavBar`, the `Footer`, a
decorative full-page background, a skip-to-content link, and the `ScrollToTop` helper, then
the page inside `<main>`. Dark mode is the only theme (the `<html>` element is always `dark`).

## Component organization

All components live under `src/components/`, grouped by where they're used. Keep this grouping
when adding components.

- `layout/` — `NavBar` (with the Projects dropdown), `Footer`, `ScrollToTop`
- `home/` — `HeroSection`, `FeaturedProjectsSection`, `CertificationsSection`, `ContactSection`, `ContactForm`, plus hero visuals (`CpuChip`, `CircuitBoardBg`)
- `about/` — `EducationSection`, `SkillsSection`, `TechStackGrid`
- `projects/` — `MoreProjectsSection`
- `case-study/` — the modular sections a project page is composed from (see below)
- `admin/` — `AdminProjectForm`
- `shared/` — `SectionHeading`, `PageTitleBanner`, `SocialLinks`, `ScrambleText`
- `ui/` — shadcn/ui primitives

## The project / case-study system (the "template")

This is the core pattern of the site and the foundation for the planned admin panel.

**Project summaries** (used on the home and projects pages) are defined in
`src/config/constants.ts` as `FEATURED_PROJECTS: Project[]`.

**Project detail pages** are defined in `src/config/case-studies.ts` as
`CASE_STUDIES: Record<slug, CaseStudy>`. The `CaseStudy` type declares the content for each
section. A case study only includes the sections it provides — if a project has no `impact`
array, the Impact section simply doesn't render.

`app/projects/[slug]/page.tsx` is the single template that turns a `CaseStudy` into a page. It:

1. Looks up the slug with `getCaseStudy(slug)`; calls `notFound()` if missing.
2. Renders a banner, the summary, then each section **in a fixed order**, numbering them
   `01 / …`, `02 / …` as it goes.
3. Wraps each section in `CaseStudySection` (consistent width, step label, title, scroll-in animation).

Section order and their components:

| Order | Section        | Component            | Shown when |
| ----- | -------------- | -------------------- | ---------- |
| 1     | Tech Stack     | `LanguageBar` + `TechStackSection` | always |
| 2     | Why I Built It | `ProblemSection`     | `problem` is set |
| 3     | Impact         | `ImpactSection`      | `impact` is non-empty |
| 4     | Key Features   | `FeaturesSection`    | `features` is non-empty |
| 5     | Lessons Learned| `LessonsSection`     | `lessons` is non-empty |

Because the page is data-driven, **adding a project is adding a `CaseStudy` entry** — no new
page file. This is exactly what the admin dashboard is designed to do later (see
[ROADMAP.md](ROADMAP.md)).

### The languages bar

Each case study starts its Tech Stack section with a GitHub-style "languages used" bar
(`src/components/case-study/LanguageBar.tsx`): a segmented, animated bar plus a dot legend,
driven by the `languages: LanguageSlice[]` field. Use each language's canonical GitHub color
and keep the percentages summing to ~100.

## Styling

Two layers:

1. **Design tokens + component classes** in `app/globals.css`, defined under `@theme`/`:root`
   as CSS custom properties (e.g. `--accent-bright`, `--surface`, `--line`, `--muted`). Most
   bespoke visuals (hero, IDE-style headings, case-study sections, the language bar) are
   styled with semantic classes here.
2. **Tailwind utilities** for layout and one-off spacing directly in components.

Colors are always referenced through the CSS variables, never hard-coded hex (except where a
third-party API bakes a color into an SVG, which is commented in place).

### Balanced grids

Card grids that can hold a variable number of items use the `.balanced-grid` class with a
`data-count` attribute. The CSS picks a column count that avoids an orphaned last row — e.g. a
4-item grid lays out as 2×2 then 1×4, never 3+1. Used by the case-study tech-stack, impact,
and features grids. When adding a new card grid, prefer this over `auto-fit` so layouts stay
balanced at every width.

## Contact form

- `src/components/home/ContactForm.tsx` collects name/email/message, validates client-side,
  and POSTs to `/api/contact` via `sendContactEmail` in `src/lib/api.ts`.
- `app/api/contact/route.ts` validates again on the server. When the SES environment variables
  (`SES_FROM_EMAIL`, `SES_TO_EMAIL`) are present it will send the message via Amazon SES; until
  then it returns HTTP 503 with a message telling the visitor to email directly. The contact
  section also shows the email address as a plain `mailto:` link, so contact never depends on
  the form working.

## Resume handling

The canonical resume is `Shenabeth_Jenkins_Software_Engineer_Resume.pdf` in the **repo root**
(easy to replace). `scripts/copy-resume.mjs` copies it into `public/` before `dev` and `build`
(via the `predev`/`prebuild` npm scripts), so Next serves it at
`/Shenabeth_Jenkins_Software_Engineer_Resume.pdf`. The copy in `public/` is git-ignored. The
URL and download name come from `RESUME` in `src/config/constants.ts`.

## Deployment

Hosting is **AWS Amplify**, connected to the GitHub repository. A push to `main` triggers an
Amplify build that runs `npm run build` and publishes the output.

- Most routes are prerendered (static/SSG) and served from Amplify's CDN.
- `/api/contact` runs as on-demand server compute (Amplify's Next.js support), which is what
  the SES integration will use.
- Cost is monitored with an AWS Budget and a CloudWatch billing alarm. Projected hosting cost
  at this traffic level is a few cents per month.

A custom domain via Amazon Route 53 is planned; see [ROADMAP.md](ROADMAP.md).

## What this project intentionally does **not** have

To keep the mental model accurate:

- No database (DynamoDB, Postgres, etc.).
- No authentication backend (the admin pages are UI scaffolding only).
- No AWS Lambda / API Gateway / Cognito / S3 backend. (An earlier plan used these; the project
  moved to Amplify for simplicity. The only AWS services in use are Amplify, CloudWatch, and
  Budgets, with SES and Route 53 planned.)
