'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
/*
 * File: FeaturedProjectsSection.tsx
 * Purpose: Display featured projects in an auto-rotating carousel (old site design)
 */

import { Project } from '@/types';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface FeaturedProjectsSectionProps {
  projects: Project[];
  pageHero?: boolean;
  /** Whether to render the "Featured Projects" heading + description above the carousel. */
  showHeading?: boolean;
}

const AUTO_ROTATE_MS = 10000;
const SWIPE_TRANSITION = { type: 'spring' as const, stiffness: 300, damping: 30 };

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
  }),
};

/**
 * Display featured projects in an auto-rotating carousel.
 *
 * @param projects - Array of featured projects to display
 * @param pageHero - Whether this is the page hero on /projects (larger heading)
 * @param showHeading - Whether to render the "Featured Projects" heading block
 */
export function FeaturedProjectsSection({ projects, pageHero = false, showHeading = true }: FeaturedProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<number | null>(null);

  const startAutoRotate = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setDirection(1);
      setActiveProject((current) => (current + 1) % projects.length);
    }, AUTO_ROTATE_MS);
  }, [projects.length]);

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [startAutoRotate]);

  const goToProject = useCallback(
    (idx: number) => {
      setDirection(idx > activeProject ? 1 : -1);
      setActiveProject(((idx % projects.length) + projects.length) % projects.length);
      startAutoRotate();
    },
    [activeProject, projects.length, startAutoRotate],
  );

  const current = projects[activeProject];

  return (
    <section className={pageHero ? 'pt-16' : 'py-28'} style={{ paddingBottom: '8.5rem' }}>
      {showHeading && (
        <div className="w-[min(92vw,1320px)] mx-auto">
          <SectionHeading
            kicker="// projects.json"
            title="Projects"
            comment="Ideas brought to life through strategy, systems, and a healthy obsession with detail."
          />
        </div>
      )}

      {/* Carousel: full-bleed background, contained content */}
      <div className="carousel-bleed">
        <div className="relative w-[min(92vw,1320px)] mx-auto px-14 md:px-20">
          <div className="overflow-hidden md:h-[clamp(34rem,58vh,42rem)] py-10 md:py-14">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SWIPE_TRANSITION}
                className="grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr] gap-8 md:gap-12 md:h-full"
                style={{
                  gap: 'clamp(2rem, 5vw, 6rem)',
                }}
              >
                {/* Project copy */}
                <div className="flex flex-col items-start justify-center py-2 md:h-full">
                  <p
                    className="mb-4 text-xs uppercase tracking-widest"
                    style={{
                      color: 'var(--accent-secondary-bright)',
                      fontFamily: '"DM Mono", monospace',
                    }}
                  >
                    {current.category || 'Project'}
                  </p>
                  <h3
                    className="font-medium leading-tight mt-0"
                    style={{
                      fontSize: 'clamp(2.2rem, 5vw, 4.8rem)',
                      letterSpacing: '-0.065em',
                    }}
                  >
                    {current.title}
                  </h3>
                  <p
                    className="max-w-2xl mt-5 mb-7"
                    style={{
                      color: 'var(--muted)',
                      lineHeight: '1.7',
                    }}
                  >
                    {current.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {current.techStack?.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 rounded-full border text-xs"
                        style={{
                          borderColor: 'var(--line)',
                          color: 'var(--muted)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`/projects/${current.id}`}
                    className="primary-action sweep-button mt-8"
                  >
                    <span>View Project</span>
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </a>
                </div>

                {/* Project visual */}
                <div
                  className="flex items-center justify-center h-64 md:h-full rounded-xl border"
                  style={{
                    borderColor: 'var(--line)',
                    background: 'var(--ink-soft)',
                  }}
                >
                  <div className="text-center" style={{ color: 'var(--muted)' }}>
                    <p className="text-sm">{current.title} Visual</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left/right arrows, in the reserved side margin so they're never clipped */}
          <button
            type="button"
            onClick={() => goToProject(activeProject - 1)}
            aria-label="Previous project"
            className="absolute hidden md:flex items-center justify-center rounded-full border transition-colors w-10 h-10"
            style={{
              left: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              borderColor: 'var(--line-strong)',
              background: 'rgba(8,11,10,0.6)',
              color: 'var(--text)',
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M16 10H4M9 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goToProject(activeProject + 1)}
            aria-label="Next project"
            className="absolute hidden md:flex items-center justify-center rounded-full border transition-colors w-10 h-10"
            style={{
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              borderColor: 'var(--line-strong)',
              background: 'rgba(8,11,10,0.6)',
              color: 'var(--text)',
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Mobile arrow row (arrows sit below the stacked content instead of overlapping it) */}
        <div className="w-[min(92vw,1320px)] mx-auto px-14 flex md:hidden items-center justify-center gap-4 pb-8">
          <button
            type="button"
            onClick={() => goToProject(activeProject - 1)}
            aria-label="Previous project"
            className="flex items-center justify-center rounded-full border transition-colors w-9 h-9"
            style={{
              borderColor: 'var(--line-strong)',
              background: 'rgba(8,11,10,0.6)',
              color: 'var(--text)',
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M16 10H4M9 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goToProject(activeProject + 1)}
            aria-label="Next project"
            className="flex items-center justify-center rounded-full border transition-colors w-9 h-9"
            style={{
              borderColor: 'var(--line-strong)',
              background: 'rgba(8,11,10,0.6)',
              color: 'var(--text)',
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel controls: centered dot markers */}
      <div className="w-[min(92vw,1320px)] mx-auto flex items-center justify-center mt-6">
        <div className="flex gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className="transition-all duration-200"
              style={{
                width: '3.5rem',
                height: '0.25rem',
                border: 0,
                borderRadius: '1rem',
                background: idx === activeProject ? 'var(--accent)' : 'var(--line-strong)',
                cursor: 'pointer',
              }}
              onClick={() => goToProject(idx)}
              aria-label={`Show project ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
