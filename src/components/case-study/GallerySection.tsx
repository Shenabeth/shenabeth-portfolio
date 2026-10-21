/*
 * File: GallerySection.tsx
 * Purpose: A captioned image grid for a case study — process shots, wireframes,
 *          and other figures that document the work but don't each need a
 *          write-up. Images are optional so the layout is complete before
 *          screenshots are added; every tile shares one aspect ratio so the
 *          grid stays even, and each image is contained inside it rather
 *          than cropped, over the `.figure-plate` hatch.
 */

'use client';

import { motion } from 'framer-motion';

import { splitFigureCaption } from '@/lib/figure-caption';

export interface GalleryItem {
  /** Optional image URL (served from /public). When omitted, a frame shows. */
  image?: string;
  /** Caption shown beneath the image, e.g. "Figure 1. World-map brainstorm." */
  caption: string;
}

interface GallerySectionProps {
  items: GalleryItem[];
}

const tileVariants = {
  hidden: { opacity: 0, y: 16 },
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
 * Render a captioned image gallery in a responsive grid.
 *
 * @param items - Gallery entries (image + caption)
 * @returns Grid of figures
 */
export function GallerySection({ items }: GallerySectionProps): React.ReactElement {
  return (
    <motion.div
      className="balanced-grid gallery-grid"
      data-count={items.length}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={gridVariants}
    >
      {items.map((item, i) => {
        const { label, rest } = splitFigureCaption(item.caption);
        return (
        <motion.figure key={item.caption + i} className="gallery-tile" variants={tileVariants}>
          <div className="gallery-tile-media figure-plate">
            {item.image ? (
              /* eslint-disable-next-line @next/next/no-img-element -- static asset */
              <img src={item.image} alt={item.caption} className="gallery-tile-img" />
            ) : (
              <div className="gallery-tile-placeholder" aria-hidden="true">
                <GalleryGlyph />
              </div>
            )}
          </div>
          <figcaption className="gallery-tile-caption">
            {label && <span className="figure-label">{label} </span>}
            {rest}
          </figcaption>
        </motion.figure>
        );
      })}
    </motion.div>
  );
}

/**
 * Small image glyph shown in a gallery tile that has no image yet.
 *
 * @returns Decorative SVG
 */
function GalleryGlyph(): React.ReactElement {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40" aria-hidden="true">
      <rect x="6" y="9" width="36" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="19" r="3.5" stroke="currentColor" strokeWidth="2" />
      <path d="M9 33l9-9 7 7 6-6 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
