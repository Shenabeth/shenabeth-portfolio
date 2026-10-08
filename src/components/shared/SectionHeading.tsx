'use client';

/*
 * File: SectionHeading.tsx
 * Purpose: Reusable section heading styled as a multi-line IDE snippet.
 *
 *          Each row (kicker, title, optional comment) sits next to a left
 *          gutter showing its line number in muted DM Mono, divided from
 *          the content by a vertical accent rule — like a real code
 *          editor's line-number column. The gutter has its own subtle
 *          background panel so it reads as a distinct editor sidebar,
 *          not just a thin border.
 *
 *          A blinking block caret pulses after the title and a typewriter
 *          effect reveals the title text once per page load when it
 *          scrolls into view.
 *
 *          Supports two sizes:
 *            - `variant="main"` — big page-level h1 title (About, Projects)
 *            - `variant="sub"` — smaller subsection h2 title (Education,
 *              Certifications, Tech Stack, home Projects/Contact rows)
 *
 *          The `// filename.ext` kicker is ALWAYS rendered in green —
 *          that's the project's convention for "// slug.json" labels.
 */

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface SectionHeadingProps {
  kicker: string;
  title: string;
  comment?: string;
  variant?: 'main' | 'sub';
  startLine?: number;
}

/** Reveal `title` character-by-character on scroll into view. */
function useTypewriter(text: string, active: boolean, durationMs = 420) {
  const [out, setOut] = useState('');
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      started.current = true;
      setTimeout(() => setOut(text), 0);
      return;
    }
    started.current = true;
    const perChar = Math.max(20, durationMs / Math.max(text.length, 1));
    let i = 0;
    const tick = () => {
      i++;
      setOut(text.slice(0, i));
      if (i < text.length) setTimeout(tick, perChar);
    };
    setTimeout(tick, perChar);
  }, [active, text, durationMs]);

  return out;
}

export function SectionHeading({
  kicker,
  title,
  comment,
  variant = 'sub',
  startLine = 1,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const typed = useTypewriter(title, inView);

  const rootClass = variant === 'main' ? 'ide-heading ide-heading--main' : 'ide-heading ide-heading--sub';

  const kickerNum = String(startLine).padStart(2, '0');
  const titleNum = String(startLine + 1).padStart(2, '0');
  const commentNum = String(startLine + 2).padStart(2, '0');

  const TitleTag = variant === 'main' ? 'h1' : 'h2';
  const titleClass = variant === 'main' ? 'ide-heading-title' : 'ide-heading-title ide-heading-title--sub';

  return (
    <div ref={ref} className={rootClass}>
      {/* Row-grid layout: each line-number sits in the gutter column
          aligned to the first line-box of its row, so a wrapped comment
          keeps "03" on its first line instead of drifting. The gutter
          background and accent border span all rows via a single visual
          overlay element. */}
      <span className="ide-heading-gutter-bg" aria-hidden="true" />
      <span className="ide-heading-gutter-num ide-heading-row-kicker" aria-hidden="true">{kickerNum}</span>
      <p className="ide-heading-kicker ide-heading-row-kicker">{kicker}</p>

      <span className="ide-heading-gutter-num ide-heading-gutter-num--title ide-heading-row-title" aria-hidden="true">{titleNum}</span>
      {/* Give the heading its full accessible name via aria-label so
          screen readers and WCAG checkers never see it as empty while
          the typewriter is still animating in the visible text. */}
      <TitleTag className={`${titleClass} ide-heading-row-title`} aria-label={title}>
        <span aria-hidden="true">{typed}</span>
        <span className="ide-heading-caret" aria-hidden="true" />
      </TitleTag>

      {comment && (
        <>
          <span className="ide-heading-gutter-num ide-heading-row-comment" aria-hidden="true">{commentNum}</span>
          <p className="ide-heading-comment ide-heading-row-comment">{comment}</p>
        </>
      )}
    </div>
  );
}
