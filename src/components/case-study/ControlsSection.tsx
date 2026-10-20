/*
 * File: ControlsSection.tsx
 * Purpose: A compact key → action reference for a case study, styled like a
 *          keyboard legend. Built for games and interactive tools that have a
 *          control scheme worth showing. Data-driven via ControlItem[].
 */

'use client';

import { motion } from 'framer-motion';

export interface ControlItem {
  /** The input, e.g. "WASD", "Space", or "1–6". */
  keys: string;
  /** What it does, e.g. "Move" or "Bark (crowd control)". */
  action: string;
}

interface ControlsSectionProps {
  controls: ControlItem[];
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

/**
 * Render a key → action control legend.
 *
 * @param controls - Control bindings to display
 * @returns Grid of key/action rows
 */
export function ControlsSection({ controls }: ControlsSectionProps): React.ReactElement {
  return (
    <motion.ul
      className="controls-list"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={listVariants}
    >
      {controls.map((control) => (
        <motion.li key={control.action} className="controls-row" variants={rowVariants}>
          <kbd className="controls-key">{control.keys}</kbd>
          <span className="controls-action">{control.action}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
