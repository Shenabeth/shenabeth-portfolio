# FILE_STRUCTURE

## Current Project Structure

```
shenabeth-portfolio/
├── docs/                          # Planning documents (this folder)
│   ├── todo.md                    # Current tasks and progress
│   ├── ruleset.md                 # Code style and standards
│   ├── api.md                     # Backend spec (Lambda, DynamoDB, Cognito)
│   ├── nav-footer.md              # Navigation and footer layout
│   ├── home.md                    # Landing page layout
│   ├── about.md                   # About page layout
│   ├── projects.md                # Projects page layout
│   ├── admin.md                   # Admin panel (Phase 2)
│   ├── shared.md                  # Shared components and hooks
│   └── file-structure.md          # This file
│
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout (NavBar + Footer)
│   ├── page.tsx                   # Home/landing page
│   ├── favicon.ico
│   └── globals.css
│
├── components/                    # React components
│   └── ui/                        # shadcn/ui components
│       └── button.tsx
│
├── lib/
│   └── utils.ts                   # General utility functions
│
├── public/                        # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── CLAUDE.md                      # Entry point (references all planning docs)
├── AGENTS.md                      # Next.js agent rules and breaking changes
├── .gitignore                     # Git ignore rules (includes .env files)
├── package.json                   # Frontend dependencies
├── package-lock.json              # Dependency lock file
├── tsconfig.json                  # TypeScript config
├── next.config.ts                 # Next.js config
├── postcss.config.mjs             # PostCSS config (for Tailwind)
├── eslint.config.mjs              # ESLint config
├── components.json                # shadcn/ui config
├── next-env.d.ts                  # Next.js generated types
└── README.md                      # Project readme
```

---

## Planned Structure (Phase 1)

Once components are built, the structure will expand to:

```
app/
├── about/
│   └── page.tsx
├── projects/
│   └── page.tsx
└── api/
    └── contact/
        └── route.ts

components/
├── layout/
│   ├── NavBar.tsx
│   └── Footer.tsx
├── home/
│   ├── HeroSection.tsx
│   ├── FeaturedProjectsSection.tsx
│   ├── ProjectCard.tsx
│   ├── CertificationsSection.tsx
│   ├── CertificationBadge.tsx
│   ├── ContactSection.tsx
│   └── ContactForm.tsx
├── about/
│   ├── EducationSection.tsx
│   ├── SkillsSection.tsx
│   ├── SkillBadge.tsx
│   └── PhilosophySection.tsx
├── projects/
│   ├── ProjectsGrid.tsx
│   ├── ExpandedProjectCard.tsx
│   └── MoreProjectsSection.tsx
├── shared/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── SocialLinks.tsx
└── ui/
    └── (shadcn/ui auto-generated)

lib/
├── utils.ts
├── api.ts
├── auth.ts
└── dynamodb.ts (optional)

hooks/
├── useAuth.ts
├── useProjects.ts
└── useFetch.ts

types/
└── index.ts

config/
├── constants.ts
└── tailwind.config.ts
```

---

## Key Directory Purposes

### `/docs/`
Planning documents. Reference these when building. Update as you go.

### `/app/`
Next.js App Router. Each folder is a route. `page.tsx` is the page content.

### `/components/`
React components organized by page/feature. Keep components focused and reusable.

### `/lib/`
Business logic, API calls, utilities. No JSX here.

### `/hooks/`
Custom React hooks for state management and API calls.

### `/types/`
TypeScript type definitions. Centralized, imported everywhere.

### `/config/`
Hardcoded constants and configuration. Easy to change without touching components.

### `/public/`
Static assets: images, icons, resume PDF. Accessible by URL.

---

## File Naming Conventions

- **Components:** PascalCase (e.g., `HeroSection.tsx`, `ProjectCard.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useAuth.ts`, `useProjects.ts`)
- **Utilities:** camelCase (e.g., `utils.ts`, `api.ts`, `auth.ts`)
- **Types:** PascalCase (defined inside `index.ts`)
- **Config:** camelCase (e.g., `constants.ts`)
- **Directories:** lowercase (e.g., `components/`, `lib/`, `hooks/`)
- **Pages:** `page.tsx` (Next.js convention)
- **Routes:** `route.ts` (Next.js API routes)
- **Layouts:** `layout.tsx` (Next.js convention)

---

## File Size Guidelines

- **Component files:** 150-300 lines (split if larger)
- **Hook files:** 100-200 lines
- **Utility files:** 50-150 lines per function
- **Type files:** Keep centralized in one `index.ts`

---

## Import Paths

Use path aliases for cleaner imports:

```typescript
// Instead of:
import { Project } from '../../../types';
import { useAuth } from '../../../hooks/useAuth';

// Use:
import { Project } from '@/types';
import { useAuth } from '@/hooks';
```

Configure in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Environment Variables

All `.env*` files are git-ignored to protect secrets:
- `.env` — local development (never commit)
- `.env.local` — local overrides (never commit)
- `.env.production` — production settings (never commit)

---

## Notes
- This structure is flexible. Adjust as you build if needed.
- All secrets (API keys, database credentials) go in `.env` files (git-ignored).
