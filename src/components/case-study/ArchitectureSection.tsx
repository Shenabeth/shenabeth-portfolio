/*
 * File: ArchitectureSection.tsx
 * Purpose: The architecture diagram block on a case study — one or two
 *          labeled image slots plus the reasoning that connects them.
 *
 *          Two stages render side by side as "considered" and "shipped".
 *          There is no arrow between them: the shipped frame carries a green
 *          border to mark it as the option that was used, so the comparison
 *          reads without extra chrome. A single stage renders as one
 *          full-width figure instead.
 *
 *          Each diagram is clickable. Clicking opens a zoomable lightbox
 *          (zoom in/out buttons, scroll/pinch to zoom, drag to pan) so the
 *          detail in a dense diagram is actually readable. Until a stage has
 *          an `image`, it draws a captioned placeholder frame in the same box
 *          the image will occupy, so nothing shifts when the diagram is added.
 *
 *          Content comes from a CaseStudy's `architecture` field in
 *          src/config/case-studies.ts.
 *
 *          Backing CSS: `.architecture-*` and `.diagram-lightbox-*` in
 *          app/globals.css.
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, X } from 'lucide-react';

/** One architecture diagram: a stage in how the design evolved. */
export interface ArchitectureStage {
  /** Mono label above the frame, e.g. "// considered" or "// shipped". */
  label: string;
  /** Short title under the label, e.g. "Old plan". */
  title: string;
  /**
   * Path to the diagram under /public (e.g.
   * '/projects/portfolio-site/architecture-old.svg'). Omit it and the frame
   * renders as a placeholder sized the same as the image will be.
   */
  image?: string;
  /** Caption under the frame explaining what the diagram shows. */
  caption: string;
}

export interface ArchitectureContent {
  /** Paragraph above the diagrams, explaining the decision. */
  intro?: string;
  /** One stage renders full width; two render as "considered" and "shipped". */
  stages: ArchitectureStage[];
  /** Closing note under the diagrams, e.g. what the tradeoff bought. */
  note?: string;
}

const stageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Zoom bounds for the lightbox, so the image can't vanish or blow up. */
const MIN_ZOOM = 1;
const MAX_ZOOM = 6;
const ZOOM_STEP = 0.5;

/**
 * A full-screen, zoomable viewer for one diagram. Opens over the page,
 * traps nothing but a close on Escape / backdrop click, and supports
 * button zoom, wheel zoom, and drag-to-pan once zoomed in.
 */
function DiagramLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}): React.ReactElement {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragState = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

  const zoomIn = useCallback(() => setZoom((z) => clampZoom(z + ZOOM_STEP)), []);
  const zoomOut = useCallback(
    () =>
      setZoom((z) => {
        const next = clampZoom(z - ZOOM_STEP);
        // Recenter when returning to 1x so a panned image snaps back.
        if (next === MIN_ZOOM) setOffset({ x: 0, y: 0 });
        return next;
      }),
    [],
  );

  // Escape closes; arrow-free so it never interferes with page scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
    };
    window.addEventListener('keydown', onKey);
    // Lock page scroll while the overlay is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, zoomIn, zoomOut]);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => {
      const next = clampZoom(z - Math.sign(e.deltaY) * ZOOM_STEP);
      if (next === MIN_ZOOM) setOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= MIN_ZOOM) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: offset.x,
      originY: offset.y,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragState.current;
    if (!d.dragging) return;
    setOffset({
      x: d.originX + (e.clientX - d.startX),
      y: d.originY + (e.clientY - d.startY),
    });
  };

  const endDrag = () => {
    dragState.current.dragging = false;
  };

  return (
    <div
      className="diagram-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <div className="diagram-lightbox-toolbar" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={zoomOut}
          aria-label="Zoom out"
          disabled={zoom <= MIN_ZOOM}
        >
          <ZoomOut />
        </button>
        <span className="diagram-lightbox-level">{Math.round(zoom * 100)}%</span>
        <button
          type="button"
          onClick={zoomIn}
          aria-label="Zoom in"
          disabled={zoom >= MAX_ZOOM}
        >
          <ZoomIn />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="diagram-lightbox-close"
        >
          <X />
        </button>
      </div>

      <div
        className="diagram-lightbox-stage"
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        style={{ cursor: zoom > MIN_ZOOM ? 'grab' : 'default' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- plain <img>
            matches the rest of the site (no next/image anywhere). */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          }}
        />
      </div>
    </div>
  );
}

/** Render one diagram frame with its label and caption. */
function Stage({
  stage,
  shipped,
}: {
  stage: ArchitectureStage;
  shipped: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.figure
      className={`architecture-stage${shipped ? ' architecture-stage--shipped' : ''}`}
      variants={stageVariants}
    >
      <p className="architecture-stage-label">{stage.label}</p>
      <h3 className="architecture-stage-title">{stage.title}</h3>

      {stage.image ? (
        <button
          type="button"
          className="architecture-stage-media architecture-stage-media--button"
          onClick={() => setOpen(true)}
          aria-label={`Open ${stage.title} diagram to zoom`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- plain <img>
              matches the rest of the site (no next/image anywhere). */}
          <img
            src={stage.image}
            alt={`${stage.title}. ${stage.caption}`}
            className="architecture-stage-img"
          />
          <span className="architecture-stage-zoomhint" aria-hidden="true">
            <ZoomIn />
            Click to zoom
          </span>
        </button>
      ) : (
        /* The diagram has not been added yet. This keeps the frame at the
           size the image will fill, so adding it changes nothing else. */
        <div className="architecture-stage-media">
          <div className="architecture-stage-placeholder" aria-hidden="true">
            <span>diagram</span>
          </div>
        </div>
      )}

      <figcaption className="architecture-stage-caption">
        {stage.caption}
      </figcaption>

      {open && stage.image && (
        <DiagramLightbox
          src={stage.image}
          alt={`${stage.title}. ${stage.caption}`}
          onClose={() => setOpen(false)}
        />
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
  /* Two stages sit side by side as a comparison; one renders full width. */
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
          <Stage
            key={stage.label}
            stage={stage}
            /* In a two-stage comparison the second stage is the one that
               shipped, so it takes the green "chosen" border. */
            shipped={comparing && i === stages.length - 1}
          />
        ))}
      </motion.div>

      {note && (
        <div className="architecture-note">
          <p className="architecture-note-label">TLDR</p>
          <p className="architecture-note-body">{note}</p>
        </div>
      )}
    </div>
  );
}
