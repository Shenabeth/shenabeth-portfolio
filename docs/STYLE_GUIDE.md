# Code style guide

Conventions used throughout this codebase. New code should match them.

## TypeScript

- Everything is TypeScript (`.ts` / `.tsx`). `strict` mode is on.
- Avoid `any`. If something is genuinely untyped, narrow it or add a short justifying comment.
- Shared types live in `src/types/index.ts` and are imported with the `@/types` alias. Types
  used by a single component can be defined and exported from that component's file (e.g.
  `TechGroup` in `TechStackSection.tsx`).
- Use `interface` for object/props shapes, `type` for unions.
- Prefer explicit return types on exported functions.

## File + function comments

- Every source file opens with a header comment stating the file and its purpose:

  ```ts
  /*
   * File: ComponentName.tsx
   * Purpose: One or two sentences on what this file does and why it exists.
   */
  ```

- Non-trivial functions get a JSDoc block with `@param` / `@returns`:

  ```ts
  /**
   * Look up a case study by its project slug.
   *
   * @param slug - Project id / url slug
   * @returns Case study entry or undefined
   */
  ```

Comments explain intent and non-obvious decisions, not the obvious. Match the surrounding
density.

## Components

- One component concept per file; name the file after the component (`PascalCase.tsx`).
- Group components by area under `src/components/` (`layout/`, `home/`, `about/`, `projects/`,
  `case-study/`, `admin/`, `shared/`, `ui/`). Put new components in the right group.
- Add `'use client'` only to components that use hooks, state, effects, or browser APIs.
  Prefer server components (the default) for purely presentational pages.
- Keep components focused. Extract repeated UI into `shared/`.
- Props are typed with an `interface` near the top of the file.

## Styling

- Dark mode only. The `<html>` element is always `dark`; there is no light theme.
- Reference colors through the CSS custom properties defined in `app/globals.css`
  (`var(--accent-bright)`, `var(--surface)`, `var(--line)`, `var(--muted)`, …). Do **not**
  hard-code hex values in components. The one exception is a color a third-party library bakes
  into generated output (e.g. `hero-patterns`); comment it where it happens.
- Use Tailwind utilities for layout and spacing. Use the semantic classes in `globals.css` for
  the site's bespoke visuals (IDE-style headings, hero, case-study sections, language bar).
- For variable-count card grids, use `.balanced-grid` with a `data-count` attribute instead of
  `auto-fit`, so layouts never leave an orphaned last row (e.g. 3+1).

## Responsive design

- Mobile-first. Write base styles for small screens, then add `sm:` / `md:` / `lg:` prefixes.
- Every interactive piece must work on phones (the NavBar, carousel, and dropdowns all have
  explicit mobile behavior — keep that parity when editing them).

## Motion

- Animations use Framer Motion. Reveal-on-scroll uses `whileInView` with
  `viewport={{ once: true }}`.
- Respect `prefers-reduced-motion`: animation hooks jump to their final state when reduced
  motion is requested.

## Quality

- No unused imports, variables, or dead files. If something stops being referenced, remove it.
- No `console.log` left in committed code (a real `console.error` in an error path is fine).
- Keep content out of components — it belongs in `src/config/`. Components take data via props
  or read it from config, they don't hard-code copy.

## Tooling

- `npm run lint` runs ESLint (`eslint-config-next`). Fix issues rather than suppressing them;
  only disable a rule inline with a short reason when the rule is genuinely wrong for a correct
  pattern.
- Path alias: `@/*` maps to `src/*` (see `tsconfig.json`). Import app code through it.
