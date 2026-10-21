/*
 * File: CapabilityRow.tsx
 * Purpose: The bordered, hairline-gapped row of capability cards —
 *          previously the "Cloud architecture / Full-stack products / AI
 *          systems" block on the landing page, now used on the /projects
 *          index where each card stands for an actual project rather than
 *          an abstract skill area.
 *
 *          Rendered twice on that page with different data: a three-card
 *          row under "Featured Work" and a two-card row under "More
 *          Projects". The grid takes its column count from the number of
 *          cards, so a two-card row fills the width as two halves instead
 *          of leaving a gap where a third card used to be.
 *
 *          Each card ends in an action row — "View Project", plus "Live
 *          Demo" for the projects that have one. The card is an <article>
 *          rather than a wrapping <a> because those buttons are links
 *          themselves, and a link cannot be nested inside another.
 *
 *          Content comes from PROJECT_CAPABILITIES in
 *          src/config/constants.ts. No images, by design — these are
 *          text-and-tags cards.
 *
 *          Backing CSS: `.capability-grid` / `.capability-card` in
 *          app/globals.css.
 */

'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ActionLink } from '@/components/shared/ActionLink';
import { ProjectCapability } from '@/types';

interface CapabilityRowProps {
  items: readonly ProjectCapability[];
  /** Extra class for page-specific spacing. */
  className?: string;
}

/**
 * Render a row of capability cards, each with links to its project.
 *
 * @param items - The capability cards to render, in display order
 * @param className - Optional additional class names
 * @returns The capability grid element
 */
export function CapabilityRow({ items, className }: CapabilityRowProps) {
  return (
    <div
      className={
        className ? `capability-grid ${className}` : 'capability-grid'
      }
      /* Drives the column count — see `.capability-grid[data-count]`. */
      data-count={items.length}
    >
      {items.map((item, index) => (
        <motion.article
          className="capability-card capability-card--link"
          key={item.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
        >
          <div className="capability-card__top">
            <span className="capability-card__kicker">{item.kicker}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          <div className="tag-row">
            {item.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="capability-card__actions">
            <ActionLink href={item.href}>View Project</ActionLink>
            {item.demoLink && (
              <ActionLink href={item.demoLink} variant="secondary" external>
                Live Demo <ArrowUpRight />
              </ActionLink>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
