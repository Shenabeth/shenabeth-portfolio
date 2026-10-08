/*
 * File: TechStackSection.tsx
 * Purpose: Case-study tech stack grid. Groups technologies by category and
 *          reveals each chip with a staggered fade/scale-in. Fully modular
 *          — drive it with any TechGroup[].
 */

'use client';

import { motion } from 'framer-motion';

export interface TechGroup {
  label: string;
  items: string[];
}

interface TechStackSectionProps {
  groups: TechGroup[];
}

const chipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

const groupVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

/**
 * Render a tech stack as grouped chips with a staggered reveal.
 *
 * @param groups - Categorized technologies
 * @returns Grid of grouped chips
 */
export function TechStackSection({ groups }: TechStackSectionProps): React.ReactElement {
  return (
    <div className="balanced-grid tech-stack-grid" data-count={groups.length}>
      {groups.map((group) => (
        <motion.div
          key={group.label}
          className="tech-stack-group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={groupVariants}
        >
          <p className="tech-stack-group-label">{group.label}</p>
          <div className="tech-stack-group-chips">
            {group.items.map((item) => (
              <motion.span
                key={item}
                className="tech-stack-chip"
                variants={chipVariants}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
