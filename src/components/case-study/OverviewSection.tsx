/*
 * File: OverviewSection.tsx
 * Purpose: "At a glance" fact grid for a case study — a small set of
 *          label/value pairs (genre, tools, role, team size, etc.) rendered as
 *          tiles with a staggered scroll-in. Fully data-driven via OverviewItem[],
 *          so any project can summarize its key facts up top.
 */

'use client';

import { motion } from 'framer-motion';

export interface OverviewItem {
  /** Short label, e.g. "Role" or "Tools". */
  label: string;
  /** The value, e.g. "Team Leader" or "Unity, C#, Blender". */
  value: string;
}

interface OverviewSectionProps {
  items: OverviewItem[];
}

const tileVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/**
 * Render a grid of label/value fact tiles.
 *
 * @param items - Fact pairs to display
 * @returns Responsive fact grid
 */
export function OverviewSection({ items }: OverviewSectionProps): React.ReactElement {
  return (
    <motion.dl
      className="balanced-grid overview-grid"
      data-count={items.length}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={gridVariants}
    >
      {items.map((item) => (
        <motion.div key={item.label} className="overview-tile" variants={tileVariants}>
          <dt className="overview-tile-label">{item.label}</dt>
          <dd className="overview-tile-value">{item.value}</dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}
