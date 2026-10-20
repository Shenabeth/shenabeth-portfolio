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
| `/`                   | `app/page.tsx`                    | Static    | Hero, featured projects, certifications, closing contact callout |
| `/about`              | `app/about/page.tsx`              | Static    | Education, certifications, tech stack |
| `/projects`          | `app/projects/page.tsx`           | Static    | Featured and additional project capability rows |
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
- `home/` — `LandingPage` (the whole single-scroll homepage: hero, projects, about,
  certifications, contact), `CertificationsSection` (the about page's credential list), `ContactSection` /
  `ContactForm` (the full form UI — not rendered yet; see Contact below), the hero
  assistant `ClippyAssistant` + its artwork `ClippyMark`, and the hero visuals
  `CircuitBoardBg` and `CpuChip` (both kept on hand; not currently rendered)
- `about/` — `EducationSection`, `SkillsSection`, `TechStackGrid`
- `projects/` — `CapabilityRow` (the project index's capability cards), `FeaturedProjectPanel` (a reusable featured-project panel, not currently rendered), `ProjectVisual`, and the per-project illustrations in `projects/visuals/`
- `case-study/` — the modular sections a project page is composed from (see below): `CaseStudySection`, `CaseStudyLinks`, `LanguageBar`, `TechStackSection`, `OverviewSection`, `ProblemSection`, `ImpactSection`, `RolesSection`, `ControlsSection`, `ShowcaseSection`, `FeaturesSection`, `GallerySection`, `LessonsSection`
- `admin/` — `AdminProjectForm`
- `shared/` — `PageBanner` (sub-page header), `PathLabel` (the `~/portfolio/<file>` label), `ActionLink` (the shared sweep button), `ProjectCard`, `SkillsCard` (the reusable "what I bring" panel), `SectionHeading`, `SectionLabel`, `PageTitleBanner` (About/Admin only), `SocialLinks`, `ScrambleText`
- `ui/` — shadcn/ui primitives

### The hero assistant (Clippy)

`ClippyAssistant` renders only a trigger in the hero — the paperclip plus a short, fixed
greeting. The conversation is deliberately **not** inline: an inline bubble grew as it typed
and pushed the hero's layout around. Clicking opens `.clippy-window`, a modal dialog over a
dimmed page, which is `position: fixed` and so cannot affect hero layout at any size. It
closes on Escape, on backdrop click, and on the close button, locks background scrolling while
open, and returns focus to the trigger.

Dialogue is data in `src/config/clippy.ts` (a tree of nodes, each with lines and replies);
`ClippyMark` is pure artwork. To change what Clippy says, edit the config only.

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
2. Renders a `PageBanner` (title, summary, any external links), then collects the sections the
   project actually declares into a list **in a fixed order**.
3. Maps that list to `CaseStudySection` (the `.shell` width, a `~/portfolio/<file>` path label,
   the title, a scroll-in animation), tinting every other section's background band. The band
   comes from a section's index in the collected list, which is why the list is built as data
   before rendering — the count differs per project.

Section order and their components (a project renders only the sections it declares, so a
code-heavy project and a game read very differently from the same template):

| Order | Section        | Component            | Shown when |
| ----- | -------------- | -------------------- | ---------- |
| 1     | Tech Stack     | `LanguageBar` + `TechStackSection` | always |
| 2     | At a Glance    | `OverviewSection`    | `overview` is non-empty |
| 3     | Why I Built It | `ProblemSection`     | `problem` is set |
| 4     | Impact         | `ImpactSection`      | `impact` is non-empty |
| 5     | The Team       | `RolesSection`       | `roles` is non-empty |
| 6     | Controls       | `ControlsSection`    | `controls` is non-empty |
| 7     | Showcase       | `ShowcaseSection`    | `showcase.items` is non-empty |
| 8     | Key Features   | `FeaturesSection`    | `features` is non-empty |
| 9     | Gallery        | `GallerySection`     | `gallery.items` is non-empty |
| 10    | Lessons Learned| `LessonsSection`     | `lessons` is non-empty |

A project's summary can also declare `links` (live demo / source buttons), rendered by
`CaseStudyLinks` directly under the summary. `showcase` and `gallery` items carry optional
images (served from `public/projects/`); a card with no image shows a captioned frame.

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

`SectionHeading` renders in one of two visual weights, both driven by the same typewriter-on-
scroll-into-view behavior: `variant="main"` is the heavier page-level `.ide-heading--main`
treatment (gutter, line numbers, caret) used for the About page title; `variant="sub"` (the default, used for ordinary section headings like home Projects
and Certifications) renders the lighter `.section-label` pattern — a small bracket-boxed index
number plus a `~/portfolio/<path>` mono caption above a plain heading.

Homepage sections are also wrapped with the diagonal `.section-seam*` utilities in
`app/globals.css`, which clip each section's edge on an alternating diagonal and step the
background through the `--ink` → `--ink-soft` → `--surface` ramp so sections visually interlock.
This is scoped to the homepage's vertical section flow. The projects index and case-study
pages instead use `PageBanner` + `PathLabel`, so they read as a continuation of the landing
page; `.page-title-banner` remains for the About and Admin pages.

Colors are always referenced through the CSS variables, never hard-coded hex (except where a
third-party API bakes a color into an SVG, which is commented in place).

### Page measure and large-screen scaling

Every full-width section centres its content on `.shell`, which is the single content measure
for the site:

```css
width: min(var(--shell-max), calc(100% - var(--shell-gutter) * 2));
```

Because both gutters come from the same token, the left and right margins are always equal.
`--shell-max` and the `--fs-*` type scale both step up at the `min-width: 1600px` and
`min-width: 2000px` breakpoints at the end of `globals.css`, so on large displays the content
measure widens *and* the text grows — rather than a narrow column of small type stranded
between two huge margins. Use `.shell` for new sections instead of a bespoke `w-[min(…)]`.

### Buttons are always one line

`.primary-action` / `.secondary-action` / `.link-action` never wrap: the label and its trailing
icon stay on a single line and the box grows with the text. This needs `white-space: nowrap`
**and** `flex-wrap: nowrap` on both the button and the inner `.sweep-button > *` wrapper — the
label and icon live inside that one span, so without it the icon drops to a second line even
though the button itself says `nowrap`.

### Overflow guards

The end of `globals.css` caps media at `max-width: 100%`, sets `min-width: 0` on the grid/flex
children that would otherwise take their content's intrinsic width as a minimum, and applies
`overflow-wrap: anywhere` to body copy. Grid tracks that hold free text use `minmax(0, …)` for
the same reason. Together these stop a long string from widening a container past the viewport.

### Balanced grids

Card grids that can hold a variable number of items use the `.balanced-grid` class with a
`data-count` attribute. The CSS picks a column count that avoids an orphaned last row — e.g. a
4-item grid lays out as 2×2 then 1×4, never 3+1. Used by the case-study tech-stack, impact,
and features grids. When adding a new card grid, prefer this over `auto-fit` so layouts stay
balanced at every width.

## Contact

- The homepage (`/`) ends with the `.contact-block` section inside `LandingPage`: a solid
  `--accent` block beside a dark panel carrying the status line, heading, a `mailto:` button
  and the social row — no form. `ContactSection`/`ContactForm` (the full form UI) are not
  rendered anywhere yet; they remain in the codebase as the UI for the planned SES work
  (see ROADMAP.md).
- `src/components/home/ContactForm.tsx` collects name/email/message, validates client-side,
  and POSTs to `/api/contact` via `sendContactEmail` in `src/lib/api.ts`.
- `app/api/contact/route.ts` validates again on the server. When the SES environment variables
  (`SES_FROM_EMAIL`, `SES_TO_EMAIL`) are present it will send the message via Amazon SES; until
  then it returns HTTP 503 with a message telling the visitor to email directly. Contact never
  depends on the form working — the plain `mailto:` link is always available.

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
