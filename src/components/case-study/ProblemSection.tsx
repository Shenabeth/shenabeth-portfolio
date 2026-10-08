/*
 * File: ProblemSection.tsx
 * Purpose: Side-by-side "before vs. after" narrative block for case
 *          studies. Each column reveals with a scroll-triggered slide-in
 *          from its own edge.
 */

'use client';

import { motion } from 'framer-motion';

export interface ProblemColumn {
  label: string;
  heading: string;
  points: string[];
}

interface ProblemSectionProps {
  before: ProblemColumn;
  after: ProblemColumn;
}

const colVariants = {
  hidden: (fromLeft: boolean) => ({ opacity: 0, x: fromLeft ? -40 : 40 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

/**
 * Render a two-column before/after comparison.
 *
 * @param before - Left column (prior state)
 * @param after - Right column (current state)
 * @returns Grid of two narrative columns
 */
export function ProblemSection({ before, after }: ProblemSectionProps): React.ReactElement {
  return (
    <div className="problem-grid">
      <motion.div
        className="problem-col problem-col--before"
        custom={true}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={colVariants}
      >
        <p className="problem-col-label">{before.label}</p>
        <h3 className="problem-col-heading">{before.heading}</h3>
        <ul className="problem-col-points">
          {before.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </motion.div>

      <div className="problem-arrow" aria-hidden="true">
        <svg viewBox="0 0 48 24" fill="none">
          <motion.path
            d="M2 12 H44 M36 4 L44 12 L36 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <motion.div
        className="problem-col problem-col--after"
        custom={false}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={colVariants}
      >
        <p className="problem-col-label">{after.label}</p>
        <h3 className="problem-col-heading">{after.heading}</h3>
        <ul className="problem-col-points">
          {after.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
