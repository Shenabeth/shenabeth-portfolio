# Portfolio Site Planning Docs

Reference these files in order based on what you're building.

## Quick Navigation
- [**TODO.md**](docs/todo.md) — Current tasks and what's next (check this first)
- [**RULESET.md**](docs/ruleset.md) — Code style, TypeScript, comments, all standards
- [**API.md**](docs/api.md) — All backend: Lambda routes, DynamoDB schema, Cognito flow, SES
- [**NAV_FOOTER.md**](docs/nav-footer.md) — Navigation bar and footer layout + tasks
- [**HOME.md**](docs/home.md) — Landing page (hero, featured projects, certs, contact form)
- [**ABOUT.md**](docs/about.md) — About page (education, skills, philosophy)
- [**PROJECTS.md**](docs/projects.md) — Projects page (featured expanded, admin-added projects)
- [**ADMIN.md**](docs/admin.md) — Admin panel components (login, project form, project list, auth guard)
- [**SHARED.md**](docs/shared.md) — Shared/utility components (buttons, cards, badges, forms)
- [**FILE_STRUCTURE.md**](docs/file-structure.md) — Directory layout for src/ and config files

## When Coding
Drag this file (CLAUDE.md) into your session. It tells Claude where to find everything.

## Tech Stack (Reference)
- **Frontend:** Next.js 14+, React, TypeScript
- **Styling:** Tailwind CSS (dark mode default, pretty animations Phase 2)
- **Components:** shadcn/ui
- **Animations:** Framer Motion (Phase 2)
- **Backend:** AWS Lambda, API Gateway, Cognito, DynamoDB, SES, S3, CloudFront
- **Database:** DynamoDB
- **Hosting:** S3 + CloudFront

## Phase 1 (MVP - Ship This)
Landing page + Projects page + About page + Contact form. No admin panel yet.

See TODO.md for current blockers and next steps.
