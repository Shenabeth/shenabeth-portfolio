'use client';

/*
 * File: SectionHeading.tsx
 * Purpose: Reusable section heading, in two visual weights:
 *
 *          - `variant="main"` — the heavier page-level IDE treatment (big
 *            h1 title + full gutter/line-number/caret system). Used for
 *            About/Projects page titles and case-study banners.
 *          - `variant="sub"` (default) — the lighter "section-label"
 *            pattern ported from the reference prototype (docs/Portfolio/
 *            src/{App.tsx,styles.css}): a small bracket-boxed index number
 *            + a `~/path/file.ext`-style mono caption above a plain h2
 *            title, instead of the full gutter/caret/comment system. Used
 *            for ordinary section headings (home Projects, Certifications).
 *
 *          Both variants keep the same typewriter-on-scroll-into-view
 *          behavior and a blinking caret after the title; only the markup
 *          and visual weight differ.
 *
 *          The kicker (e.g. "// certifications.json") is ALWAYS rendered
 *          in green — that's the project's convention for "// slug.json"
 *          labels. For the `sub` variant, `kicker` is parsed into an index
 *          number (`startLine`) and a `~/portfolio/<path>` caption.
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

/**
 * Strip a leading `// ` comment marker from a kicker string, e.g.
 * `"// certifications.json"` -> `"certifications.json"`, so the `sub`
 * variant can reuse the same `kicker` prop as a file-path caption.
 */
function stripCommentMarker(kicker: string): string {
  return kicker.replace(/^\/\/\s*/, '');
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

  if (variant === 'sub') {
    const index = String(startLine).padStart(2, '0');
    const path = stripCommentMarker(kicker);
    return (
      <div ref={ref}>
        <div className="section-label">
          <span className="section-label-index" aria-hidden="true">{index}</span>
          <span className="section-label-path">~/portfolio/{path}</span>
        </div>
        <div className="section-label-heading">
          {/* Give the heading its full accessible name via aria-label so
              screen readers and WCAG checkers never see it as empty while
              the typewriter is still animating in the visible text. */}
          <h2 className="section-label-heading-title" aria-label={title}>
            <span aria-hidden="true">{typed}</span>
            <span className="section-label-caret" aria-hidden="true" />
          </h2>
          {comment && <p className="section-label-heading-comment">{comment}</p>}
        </div>
      </div>
    );
  }

  const kickerNum = String(startLine).padStart(2, '0');
  const titleNum = String(startLine + 1).padStart(2, '0');
  const commentNum = String(startLine + 2).padStart(2, '0');

  return (
    <div ref={ref} className="ide-heading ide-heading--main">
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
      <h1 className="ide-heading-title ide-heading-row-title" aria-label={title}>
        <span aria-hidden="true">{typed}</span>
        <span className="ide-heading-caret" aria-hidden="true" />
      </h1>

      {comment && (
        <>
          <span className="ide-heading-gutter-num ide-heading-row-comment" aria-hidden="true">{commentNum}</span>
          <p className="ide-heading-comment ide-heading-row-comment">{comment}</p>
        </>
      )}
    </div>
  );
}
