# Shenabeth Jenkins — Portfolio

My personal portfolio site. A modular [Next.js](https://nextjs.org) (App Router) application
written in TypeScript, styled with Tailwind CSS, and deployed on **AWS Amplify** with
continuous deployment from GitHub.

It replaces my original portfolio — a hand-coded HTML/CSS/Bootstrap site hosted on GitHub
Pages — with a component-driven codebase where every section is a reusable React component
and every project page is generated from a single case-study template.

**Live sections:** Home · About · Projects (with per-project case-study pages)

## Tech stack

| Area        | Choice                                             |
| ----------- | -------------------------------------------------- |
| Framework   | Next.js 16 (App Router), React 19                  |
| Language    | TypeScript                                         |
| Styling     | Tailwind CSS v4, custom CSS tokens in `globals.css`|
| UI          | shadcn/ui primitives (button, input, textarea)     |
| Motion      | Framer Motion                                      |
| Icons       | lucide-react, react-icons (Simple Icons)           |
| Hosting     | AWS Amplify (build + host)                         |
| Monitoring  | AWS Budgets + CloudWatch billing alarm             |

There is no application backend today. The only server endpoint is the contact form route
(`/api/contact`), which is wired to send email through **Amazon SES** once configured; until
then it returns a clear "email me directly" response. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Scripts:

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Start the dev server (copies the resume into `public/` first) |
| `npm run build`     | Production build (copies the resume, then `next build`)   |
| `npm run start`     | Serve the production build                                |
| `npm run lint`      | Run ESLint                                                |
| `npm run copy-resume` | Copy the root resume PDF into `public/` manually        |

## Project structure

```
shenabeth-portfolio/
├── app/                         # Next.js App Router (routes + API)
│   ├── layout.tsx               # Root layout: NavBar + Footer + background
│   ├── page.tsx                 # Home
│   ├── globals.css              # All design tokens + component styles
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── projects/[slug]/page.tsx # Dynamic case-study pages (SSG)
│   ├── admin/login/page.tsx     # Admin sign-in (UI only, not yet wired)
│   ├── admin/page.tsx           # Admin dashboard (template-driven, not yet wired)
│   └── api/contact/route.ts     # Contact form endpoint (Amazon SES, planned)
├── src/
│   ├── components/              # All React components, grouped by area
│   │   ├── layout/              # NavBar, Footer, ScrollToTop
│   │   ├── home/                # Hero, featured projects, certs, contact
│   │   ├── about/               # Education, skills, tech-stack grid
│   │   ├── projects/            # Projects-page sections
│   │   ├── case-study/          # Modular case-study section components
│   │   ├── admin/               # Admin form(s)
│   │   ├── shared/              # Cross-page pieces (headings, socials, …)
│   │   └── ui/                  # shadcn/ui primitives
│   ├── config/                  # Site content as typed data
│   │   ├── constants.ts         # Projects, certs, education, skills, links
│   │   ├── case-studies.ts      # Per-project case-study content (the template)
│   │   └── techIcons.ts         # Skill → icon mapping
│   ├── lib/                     # Non-UI helpers (api.ts, utils.ts)
│   └── types/                   # Shared TypeScript types
├── public/                      # Static assets (cert/school logos); resume copied here at build
├── scripts/copy-resume.mjs      # Copies the root resume PDF into public/
├── docs/                        # Project documentation (start here)
└── Shenabeth_Jenkins_Software_Engineer_Resume.pdf   # Edit this; it's served at build time
```

## Editing content

Almost all content is data, not markup:

- **Projects, certifications, education, skills, social links** → [`src/config/constants.ts`](src/config/constants.ts)
- **A project's case-study page** → [`src/config/case-studies.ts`](src/config/case-studies.ts)
- **Resume** → replace `Shenabeth_Jenkins_Software_Engineer_Resume.pdf` in the repo root

See [docs/CONTENT.md](docs/CONTENT.md) for the full guide.

## Documentation

| Doc                                      | Purpose                                             |
| ---------------------------------------- | --------------------------------------------------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the app is structured and how it deploys    |
| [docs/CONTENT.md](docs/CONTENT.md)       | How to add/edit projects, certs, and other content  |
| [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md) | Code conventions used throughout the codebase     |
| [docs/ROADMAP.md](docs/ROADMAP.md)       | Planned work (admin panel, SES contact, custom domain) |

## Deployment

Pushing to `main` triggers an AWS Amplify build that runs `npm run build` and publishes the
app. The contact route runs as on-demand server compute; everything else is prerendered. See
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#deployment).
