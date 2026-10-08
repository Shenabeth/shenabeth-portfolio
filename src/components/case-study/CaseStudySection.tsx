/*
 * File: CaseStudySection.tsx
 * Purpose: Reusable section wrapper for case study pages. Provides a
 *          consistent container width, a monospace step label, a title,
 *          an optional eyebrow description, and a scroll-triggered
 *          fade-up animation on all children.
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CaseStudySectionProps {
  step: string;
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
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
 * @param step - Short label like "01 / tech-stack"
 * @param title - Section heading
 * @param description - Optional short lead paragraph beneath the title
 * @param children - Body content for the section
 * @param id - Optional anchor id
 * @returns Styled section element
 */
export function CaseStudySection({
  step,
  title,
  description,
  children,
  id,
}: CaseStudySectionProps): React.ReactElement {
  return (
    <motion.section
      id={id}
      className="case-study-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
    >
      <div className="case-study-section-inner">
        <p className="case-study-section-step">{step}</p>
        <h2 className="case-study-section-title">{title}</h2>
        {description && <p className="case-study-section-description">{description}</p>}
        <div className="case-study-section-body">{children}</div>
      </div>
    </motion.section>
  );
}
