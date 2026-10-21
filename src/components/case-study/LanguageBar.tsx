/*
 * File: LanguageBar.tsx
 * Purpose: A GitHub-style "languages used" breakdown for a case study. Renders
 *          a single segmented bar (one colored segment per language, widths =
 *          percentages) that animates its segments in on scroll, with a dot
 *          legend beneath it — mirroring the language bar GitHub shows on a
 *          repo. Driven entirely by the `languages` prop so any project can
 *          declare its own mix.
 */

'use client';

import { motion } from 'framer-motion';

export interface LanguageSlice {
  /** Language name, e.g. "TypeScript". */
  name: string;
  /** Share of the codebase, 0–100. Values should sum to ~100. */
  percent: number;
  /** Bar/legend color. Use the language's canonical GitHub color. */
  color: string;
}

interface LanguageBarProps {
  languages: LanguageSlice[];
}

/**
 * Format a percentage the way GitHub does: one decimal place.
 *
 * @param percent - Raw percentage value
 * @returns String like "98.4%"
 */
function formatPercent(percent: number): string {
  return `${percent.toFixed(1)}%`;
}

/**
 * Render the segmented language bar plus its legend.
 *
 * @param languages - Ordered language slices (largest first reads best)
 * @returns Language breakdown block
 */
export function LanguageBar({ languages }: LanguageBarProps): React.ReactElement {
  return (
    <div className="language-bar">
      <p className="language-bar-title">Languages</p>

      {/* Segmented bar. The track animates its width from 0 so the whole bar
          "draws" in; each segment is a flex child sized by its percentage.
          This block sits at the top of the first section, so it animates on
          mount rather than on scroll. whileInView was unreliable here: when
          the bar is already on screen at load (common on smaller viewports),
          the enter animation sometimes never fired, leaving the track stuck
          at scaleX: 0 and invisible until a resize re-ran the measurement. */}
      <motion.div
        className="language-bar-track"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        style={{ transformOrigin: 'left' }}
      >
        {languages.map((lang) => (
          <span
            key={lang.name}
            className="language-bar-segment"
            style={{ width: `${lang.percent}%`, background: lang.color }}
            title={`${lang.name} ${formatPercent(lang.percent)}`}
          />
        ))}
      </motion.div>

      {/* Dot legend */}
      <motion.ul
        className="language-bar-legend"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
      >
        {languages.map((lang) => (
          <motion.li
            key={lang.name}
            className="language-bar-legend-item"
            variants={{
              hidden: { opacity: 0, y: 4 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
            }}
          >
            <span className="language-bar-dot" style={{ background: lang.color }} aria-hidden="true" />
            <span className="language-bar-name">{lang.name}</span>
            <span className="language-bar-percent">{formatPercent(lang.percent)}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
