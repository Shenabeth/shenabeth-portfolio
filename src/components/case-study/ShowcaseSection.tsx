/*
 * File: ShowcaseSection.tsx
 * Purpose: A grid of "showcase" cards for a case study — each card pairs a
 *          figure (image) with a title and short write-up. Built for walking a
 *          reader through the distinct pieces of a project (e.g. each defense
 *          type in a game, or each surface of an app). Images are optional: a
 *          card with no `image` shows a captioned frame instead, so the page is
 *          complete before screenshots are dropped in. Every figure uses the
 *          same fixed aspect ratio so cards stay uniform, with the image
 *          contained inside it (never cropped) over the `.figure-plate`
 *          hatch, so the full design is visible and the letterbox margins
 *          carry the page banner's pattern.
 */

'use client';

import { motion } from 'framer-motion';

import { splitFigureCaption } from '@/lib/figure-caption';

export interface ShowcaseItem {
  /** Card heading, e.g. "Turrets". */
  title: string;
  /** Short description of this piece. */
  body: string;
  /** Optional image URL (served from /public). When omitted, a frame shows. */
  image?: string;
  /** Optional caption shown under the figure, e.g. "Figure 2. Testing turrets." */
  caption?: string;
}

interface ShowcaseSectionProps {
  items: ShowcaseItem[];
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
  visible: { transition: { staggerChildren: 0.08 } },
};

/**
 * Render showcase cards (figure + title + body) in a responsive grid.
 *
 * @param items - Showcase entries to display
 * @returns Grid of figure cards
 */
export function ShowcaseSection({ items }: ShowcaseSectionProps): React.ReactElement {
  return (
    <motion.div
      className="balanced-grid showcase-grid"
      data-count={items.length}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={gridVariants}
    >
      {items.map((item) => (
        <motion.figure key={item.title} className="showcase-card" variants={cardVariants}>
          <div className="showcase-card-media figure-plate">
            {item.image ? (
              /* eslint-disable-next-line @next/next/no-img-element -- static
                 asset; the site uses plain <img> throughout for the Amplify
                 export path. */
              <img src={item.image} alt={item.caption ?? item.title} className="showcase-card-img" />
            ) : (
              <div className="showcase-card-placeholder" aria-hidden="true">
                <span>{item.title}</span>
              </div>
            )}
          </div>
          <figcaption className="showcase-card-body">
            <h3 className="showcase-card-title">{item.title}</h3>
            <p className="showcase-card-text">{item.body}</p>
            {item.caption && (
              <p className="showcase-card-caption">
                {splitFigureCaption(item.caption).label && (
                  <span className="figure-label">{splitFigureCaption(item.caption).label} </span>
                )}
                {splitFigureCaption(item.caption).rest}
              </p>
            )}
          </figcaption>
        </motion.figure>
      ))}
    </motion.div>
  );
}
