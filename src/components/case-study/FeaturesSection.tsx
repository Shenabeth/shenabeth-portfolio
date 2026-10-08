/*
 * File: FeaturesSection.tsx
 * Purpose: Grid of feature cards for a case study. Each card lists a
 *          title, short body, and reveals with a staggered fade-up.
 */

'use client';

import { motion } from 'framer-motion';

export interface FeatureItem {
  title: string;
  body: string;
}

interface FeaturesSectionProps {
  features: FeatureItem[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/**
 * Render feature cards in a responsive grid.
 *
 * @param features - Feature entries to display
 * @returns Grid of cards
 */
export function FeaturesSection({ features }: FeaturesSectionProps): React.ReactElement {
  return (
    <motion.div
      className="balanced-grid features-grid"
      data-count={features.length}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={gridVariants}
    >
      {features.map((feature, i) => (
        <motion.div
          key={feature.title}
          className="feature-card"
          variants={cardVariants}
        >
          <span className="feature-card-index">0{i + 1}</span>
          <h3 className="feature-card-title">{feature.title}</h3>
          <p className="feature-card-body">{feature.body}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
