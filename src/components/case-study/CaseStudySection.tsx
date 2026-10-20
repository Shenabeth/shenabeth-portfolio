/*
 * File: CaseStudySection.tsx
 * Purpose: Reusable section wrapper for case study pages, in the landing
 *          page's design language: a `~/portfolio/<slug>.<n>` path label,
 *          the shared `.section-heading` treatment (title left, optional
 *          description right), and a scroll-triggered fade-up on the body.
 *
 *          Replaces the earlier "01 / tech-stack" step label + centred
 *          IDE-style heading, so a case study reads like a continuation of
 *          the landing page rather than a separate template.
 *
 *          Backing CSS: `.case-study-section*` in app/globals.css.
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { PathLabel } from '@/components/shared/PathLabel';

interface CaseStudySectionProps {
  /** Pseudo-filename for the path label, e.g. "tech-stack.json". */
  file: string;
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
  /** Tints the section band, used to alternate background between blocks. */
  alt?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

/**
 * Wrapper that lays out a titled block for a case study.
 *
 * @param file - Pseudo-filename shown in the path label
 * @param title - Section heading
 * @param description - Optional short lead paragraph beside the title
 * @param children - Body content for the section
 * @param id - Optional anchor id
 * @param alt - Whether to tint this section's background band
 * @returns Styled section element
 */
export function CaseStudySection({
  file,
  title,
  description,
  children,
  id,
  alt = false,
}: CaseStudySectionProps): React.ReactElement {
  return (
    <motion.section
      id={id}
      className={`case-study-section${alt ? ' case-study-section--alt' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
    >
      <div className="shell case-study-section-inner">
        <PathLabel>{file}</PathLabel>
        <div className="section-heading section-heading--case-study">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <div className="case-study-section-body">{children}</div>
      </div>
    </motion.section>
  );
}
