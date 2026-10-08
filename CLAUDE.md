# Portfolio Site — Project Guide

Personal portfolio for Shenabeth Jenkins. Modular Next.js (App Router) app in TypeScript,
styled with Tailwind + custom CSS tokens, deployed on **AWS Amplify**. No application backend:
content is typed data in `src/config/`, rendered by shared components.

## Read these first

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — how the app is structured, the project/case-study template system, and deployment. **Start here.**
- [docs/CONTENT.md](docs/CONTENT.md) — how to add or edit projects, certifications, skills, and the resume.
- [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md) — code conventions (TypeScript, components, styling, grids).
- [docs/ROADMAP.md](docs/ROADMAP.md) — planned work (SES contact, Route 53 domain, admin panel).
- [README.md](README.md) — project overview and scripts.

## Key facts

- **Tech stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion.
- **Hosting:** AWS Amplify (CI from GitHub on push to `main`). Cost watched with AWS Budgets +
  a CloudWatch billing alarm. SES (contact form) and Route 53 (custom domain) are planned, not
  yet wired. There is **no** Lambda/DynamoDB/Cognito/S3 backend — an earlier plan used those,
  but the project moved to Amplify.
- **Pages** live in `app/`. **Everything else** (components, config, lib, types) lives in
  `src/`, with the `@/*` → `src/*` path alias.
- **Projects are data.** A project's card is an entry in `FEATURED_PROJECTS`
  (`src/config/constants.ts`); its detail page is a `CaseStudy` entry in
  `src/config/case-studies.ts`, rendered by the single `app/projects/[slug]/page.tsx` template.
  Adding a project means adding config, not files. This is also the basis for the planned admin
  panel.
- **Resume** is `Shenabeth_Jenkins_Software_Engineer_Resume.pdf` in the repo root; a prebuild
  script copies it into `public/`.

## Conventions (summary — full details in STYLE_GUIDE.md)

- Every file starts with a `/* File / Purpose */` header comment; non-trivial functions get
  JSDoc.
- Dark mode only. Reference colors via CSS variables in `app/globals.css`, never hard-coded hex.
- Group components by area under `src/components/`.
- Use `.balanced-grid` + `data-count` for variable-count card grids (avoids 3+1 layouts).
- Keep content in `src/config/`, not in component markup.
- Keep docs accurate: describe what exists; mark planned work as planned. No stale task lists.

## Verifying changes

```bash
npm run build   # typechecks + builds; the real gate before deploy
npm run lint    # ESLint
```
