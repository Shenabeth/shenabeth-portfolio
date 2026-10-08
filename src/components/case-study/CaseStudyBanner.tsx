/*
 * File: CaseStudyBanner.tsx
 * Purpose: Full-bleed banner at the top of a case study page. Reuses the
 *          project's circuit-board pattern (fading to transparent at the
 *          bottom) and renders a single-line IDE-style heading containing
 *          only the project title with a typewriter animation and blinking
 *          caret. No kicker, no comment — just the title.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { circuitBoard } from 'hero-patterns';

const TRACE_COLOR = '#54d5aa';
const TRACE_OPACITY = 0.3;

interface CaseStudyBannerProps {
  title: string;
}

/**
 * Reveal `title` character-by-character once it enters the viewport.
 *
 * @param text - Full title text to type out
 * @param active - Whether animation should begin
 * @param durationMs - Total duration budget for the type-in
 * @returns Partial text as it is being typed
 */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function useTypewriter(text: string, active: boolean, durationMs = 520): string {
  // Always start empty so server and client first render agree (the title is
  // also exposed via aria-label, so it's never hidden from assistive tech).
  const [out, setOut] = useState('');
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    // Honor reduced-motion by jumping straight to the full title. This runs
    // only after mount (client-only), so it can't cause a hydration mismatch.
    if (prefersReducedMotion()) {
      setTimeout(() => setOut(text), 0);
      return;
    }

    const perChar = Math.max(28, durationMs / Math.max(text.length, 1));
    let i = 0;
    const tick = (): void => {
      i++;
      setOut(text.slice(0, i));
      if (i < text.length) setTimeout(tick, perChar);
    };
    setTimeout(tick, perChar);
  }, [active, text, durationMs]);

  return out;
}

/**
 * Full-bleed title banner for a case study page.
 *
 * @param title - Project title to display with the typewriter animation
 * @returns Banner element with circuit pattern and animated title
 */
export function CaseStudyBanner({ title }: CaseStudyBannerProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const typed = useTypewriter(title, inView);

  return (
    <div className="page-title-banner">
      <div className="page-title-banner-bg" aria-hidden="true">
        <div
          className="page-title-banner-pattern"
          style={{ backgroundImage: circuitBoard(TRACE_COLOR, TRACE_OPACITY) }}
        />
      </div>

      <div ref={ref} className="ide-heading ide-heading--main case-study-heading">
        <span className="ide-heading-gutter-bg" aria-hidden="true" />
        <span
          className="ide-heading-gutter-num ide-heading-gutter-num--title ide-heading-row-title"
          aria-hidden="true"
        >
          01
        </span>
        <h1
          className="ide-heading-title ide-heading-row-title"
          aria-label={title}
        >
          <span aria-hidden="true">{typed}</span>
          <span className="ide-heading-caret" aria-hidden="true" />
        </h1>
      </div>
    </div>
  );
}
