# Shenabeth Jenkins Portfolio

This is the portfolio site for Shenabeth Jenkins. It is a Next.js App Router application
written in TypeScript, styled with Tailwind CSS and custom CSS tokens, and deployed on
AWS Amplify with continuous deployment from GitHub.

The site replaces an earlier hand coded HTML, CSS, and Bootstrap site that was hosted on
GitHub Pages. Every section is a reusable React component, and every project page is
generated from one case study template fed by typed config files.

**Live sections:** Home, About, and Projects, including a case study page for each project.

## Tech stack

| Area       | Choice                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router) and React 19                                   |
| Language   | TypeScript                                                             |
| Styling    | Tailwind CSS v4 and design tokens defined in `app/globals.css`         |
| UI         | shadcn/ui primitives (button, input, textarea) built on Radix UI       |
| Motion     | Framer Motion                                                          |
| Icons      | Lucide React and React Icons (Simple Icons set)                        |
| Fonts      | Space Grotesk and JetBrains Mono from Google Fonts                     |
| Hosting    | AWS Amplify, built and hosted from the `main` branch                   |
| Monitoring | AWS Budgets and an Amazon CloudWatch billing alarm                     |

## Backend status

The site has no application backend. The only server endpoint is the contact form route at
`/api/contact`. It validates the form and returns a clear message asking the visitor to email
directly, because email delivery is not configured yet. Once the environment variables
`SES_FROM_EMAIL` and `SES_TO_EMAIL` are set, the route is ready for an Amazon Simple Email
Service (SES) call through `@aws-sdk/client-ses`. That SDK is not installed yet.

The admin pages at `/admin` and `/admin/login` exist as interface only. They are not connected
to any data store or sign in flow. The plans for the admin panel, SES, and a custom domain are
in [docs/ROADMAP.md](docs/ROADMAP.md).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script                | What it does                                                    |
| --------------------- | --------------------------------------------------------------- |
| `npm run dev`         | Copies the resume into `public/`, then starts the dev server    |
| `npm run build`       | Copies the resume, then runs a production build                 |
| `npm run start`       | Serves the production build                                     |
| `npm run lint`        | Runs ESLint                                                     |
| `npm run copy-resume` | Copies the root resume PDF into `public/` on its own            |

## Project structure

```
shenabeth-portfolio/
├── app/                          # Routes, layout, and global styles
│   ├── layout.tsx                # Root layout with NavBar, Footer, and background
│   ├── page.tsx                  # Home
│   ├── globals.css               # Design tokens and component styles
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── projects/[slug]/page.tsx  # Case study template, statically generated per project
│   ├── admin/page.tsx            # Admin dashboard (interface only)
│   ├── admin/login/page.tsx      # Admin sign in (interface only)
│   └── api/contact/route.ts      # Contact form endpoint
├── src/
│   ├── components/
│   │   ├── layout/               # NavBar, Footer, ScrollToTop
│   │   ├── home/                 # Hero, Clippy assistant, certifications, contact form
│   │   ├── about/                # Education, skills, and tech stack grid
│   │   ├── projects/             # Projects page sections and visuals
│   │   ├── case-study/           # Section components used by the case study template
│   │   ├── admin/                # Admin project form
│   │   ├── shared/               # Shared pieces such as page banners, cards, and headings
│   │   └── ui/                   # shadcn/ui primitives
│   ├── config/
│   │   ├── constants.ts          # Projects, certifications, education, skills, and links
│   │   ├── case-studies.ts       # Content for each project's case study page
│   │   ├── clippy.ts             # Script for the home page assistant
│   │   └── techIcons.ts          # Skill to icon mapping
│   ├── lib/                      # Helpers (API client, class utilities, figure captions)
│   └── types/                    # Shared TypeScript types
├── public/                       # Static assets, including project images and the copied resume
├── scripts/copy-resume.mjs       # Copies the root resume PDF into public/
├── docs/                         # Project documentation
└── Shenabeth_Jenkins_Software_Engineer_Resume.pdf   # Served at build time
```

## Editing content

Most of the content is data rather than markup.

- Projects, certifications, education, skills, and social links are in
  [src/config/constants.ts](src/config/constants.ts).
- Each project's case study page is in [src/config/case-studies.ts](src/config/case-studies.ts).
- The resume is `Shenabeth_Jenkins_Software_Engineer_Resume.pdf` in the repo root. Replace that
  file to update it.

See [docs/CONTENT.md](docs/CONTENT.md) for the full guide.

## Dependencies

Runtime dependencies:

| Package                    | Purpose                                                        |
| -------------------------- | -------------------------------------------------------------- |
| `next`                     | Framework, routing, and static generation                      |
| `react`, `react-dom`       | UI library                                                     |
| `framer-motion`            | Scroll and entrance animations                                 |
| `lucide-react`             | Interface icons                                                |
| `react-icons`              | Technology logos from the Simple Icons set                     |
| `hero-patterns`            | Circuit board SVG pattern behind the home hero                 |
| `radix-ui`                 | Accessible primitives used by the shadcn/ui button             |
| `class-variance-authority` | Variant styling for the button component                       |
| `clsx`                     | Conditional class names                                        |
| `tailwind-merge`           | Merges conflicting Tailwind classes                            |
| `tw-animate-css`           | Animation utilities imported by `app/globals.css`              |

Development dependencies:

| Package                | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `tailwindcss`, `@tailwindcss/postcss` | Tailwind CSS v4 and its PostCSS plugin                |
| `shadcn`               | shadcn/ui CLI and the `shadcn/tailwind.css` stylesheet           |
| `typescript`           | Type checking                                                    |
| `eslint`, `eslint-config-next` | Linting with the Next.js rule set                        |
| `@types/node`, `@types/react`, `@types/react-dom` | Type definitions              |

## Documentation

| Doc                                          | Purpose                                              |
| -------------------------------------------- | ---------------------------------------------------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the app is structured and how it deploys         |
| [docs/CONTENT.md](docs/CONTENT.md)           | How to add and edit projects, certifications, and other content |
| [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md)   | Code conventions used across the codebase            |
| [docs/ROADMAP.md](docs/ROADMAP.md)           | Planned work: admin panel, SES contact, custom domain |

## Deployment

Pushing to `main` starts an AWS Amplify build that runs `npm run build` and publishes the app.
The contact route runs as on demand server compute. The other pages are prerendered as static
HTML. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#deployment) for details.
