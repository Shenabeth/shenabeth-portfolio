/*
 * File: ArchitectureSection.tsx
 * Purpose: The architecture diagram block on a case study — one or two
 *          labeled image slots plus the reasoning that connects them.
 *
 *          Two stages render side by side as "considered → shipped", with
 *          an arrow between them, so a page can show how a design changed
 *          rather than only where it landed. A single stage renders as one
 *          full-width figure instead, and the arrow is dropped. That's what
 *          makes the section safe to declare before the art exists: until a
 *          stage has an `image`, it draws a captioned placeholder frame in
 *          the same box the image will occupy, so nothing shifts when the
 *          diagram is dropped in.
 *
 *          Content comes from a CaseStudy's `architecture` field in
 *          src/config/case-studies.ts.
 *
 *          Backing CSS: `.architecture-*` in app/globals.css.
 */

'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/** One architecture diagram: a stage in how the design evolved. */
export interface ArchitectureStage {
  /** Mono label above the frame, e.g. "// considered" or "// shipped". */
  label: string;
  /** Short title under the label, e.g. "Serverless on S3 + Lambda". */
  title: string;
  /**
   * Path to the diagram under /public (e.g.
   * '/projects/portfolio-site/architecture-new.png'). Omit it and the frame
   * renders as a placeholder sized the same as the image will be.
   */
  image?: string;
  /** Caption under the frame explaining what the diagram shows. */
  caption: string;
  /** The services drawn in the diagram, listed as chips under the caption. */
  services?: string[];
}

export interface ArchitectureContent {
  /** Paragraph above the diagrams, explaining the decision. */
  intro?: string;
  /** One stage renders full width; two render as "considered → shipped". */
  stages: ArchitectureStage[];
  /** Closing note under the diagrams, e.g. what the tradeoff bought. */
  note?: string;
}

const stageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Render one diagram frame with its label, caption, and service chips. */
function Stage({ stage }: { stage: ArchitectureStage }) {
  return (
    <motion.figure className="architecture-stage" variants={stageVariants}>
      <p className="architecture-stage-label">{stage.label}</p>
      <h3 className="architecture-stage-title">{stage.title}</h3>

      <div className="architecture-stage-media">
        {stage.image ? (
          /* eslint-disable-next-line @next/next/no-img-element -- plain <img>
             matches the rest of the site (no next/image anywhere). */
          <img
            src={stage.image}
            alt={`${stage.title} — ${stage.caption}`}
            className="architecture-stage-img"
          />
        ) : (
          /* The diagram has not been added yet. This keeps the frame at the
             size the image will fill, so adding it changes nothing else. */
          <div className="architecture-stage-placeholder" aria-hidden="true">
            <span>diagram</span>
          </div>
        )}
      </div>

      <figcaption className="architecture-stage-caption">
        {stage.caption}
      </figcaption>

      {stage.services && stage.services.length > 0 && (
        <div className="architecture-stage-services">
          {stage.services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      )}
    </motion.figure>
  );
}

/**
 * Render the architecture block.
 *
 * @param content - The intro copy, diagram stages, and closing note
 * @returns The architecture section body
 */
export function ArchitectureSection({
  content,
}: {
  content: ArchitectureContent;
}): React.ReactElement {
  const { intro, stages, note } = content;
  /* The arrow is only meaningful between two stages — with one diagram
     there is no "changed from" to point at. */
  const comparing = stages.length > 1;

  return (
    <div className="architecture">
      {intro && <p className="architecture-intro">{intro}</p>}

      <motion.div
        className={`architecture-stages${
          comparing ? ' architecture-stages--compare' : ''
        }`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.12 }}
      >
        {stages.map((stage, i) => (
          <Fragment key={stage.label}>
            {comparing && i > 0 && (
              <div className="architecture-arrow" aria-hidden="true">
                <ArrowRight />
              </div>
            )}
            <Stage stage={stage} />
          </Fragment>
        ))}
      </motion.div>

      {note && <p className="architecture-note">{note}</p>}
    </div>
  );
}
