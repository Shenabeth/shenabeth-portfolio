/*
 * File: PageBanner.tsx
 * Purpose: The banner at the top of a sub-page (/projects and each case
 *          study). Replaces the old circuit-board + IDE-gutter banner with
 *          the landing page's language: a `~/portfolio/<file>` path label,
 *          an oversized heading, and a muted lede — set against the same
 *          diagonal hatch the skills card uses, with a green rule closing
 *          the block.
 *
 *          Clears the fixed 72px header on its own, so pages can render it
 *          as their first element.
 *
 *          Backing CSS: `.page-banner*` in app/globals.css.
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface PageBannerProps {
  /** Filename for the `~/portfolio/` path label. */
  file: string;
  title: string;
  /** Optional lede under the title. */
  lede?: string;
  /** Optional trailing content, e.g. a row of action buttons. */
  children?: React.ReactNode;
}

/**
 * Render a sub-page banner.
 *
 * @param file - Pseudo-filename shown in the path label
 * @param title - The page title (rendered as the h1)
 * @param lede - Short supporting paragraph
 * @param children - Optional extra content below the lede
 */
export function PageBanner({ file, title, lede, children }: PageBannerProps) {
  /* Framer keeps `initial` under reduced motion, so the final state is
     rendered directly instead of fading up. */
  const reducedMotion = useReducedMotion();

  return (
    <header className="page-banner">
      <div className="page-banner__hatch" aria-hidden="true" />
      <motion.div
        className="shell page-banner__inner"
        initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section-label">
          <span className="section-label__path">~/portfolio/{file}</span>
        </div>
        <h1 className="page-banner__title">{title}</h1>
        {lede && <p className="page-banner__lede">{lede}</p>}
        {children}
      </motion.div>
    </header>
  );
}
