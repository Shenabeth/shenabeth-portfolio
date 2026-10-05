import React from 'react';
/*
 * File: MoreProjectsSection.tsx
 * Purpose: Placeholder section for additional projects (Phase 2)
 */

import { Project } from '@/types';

interface MoreProjectsSectionProps {
  projects?: Project[];
}

/**
 * Display placeholder for more projects (Phase 2 feature)
 *
 * @param projects - Optional array of additional projects (Phase 2)
 */
export function MoreProjectsSection({ projects }: MoreProjectsSectionProps) {
  // Phase 1: Show placeholder only
  if (!projects || projects.length === 0) {
    return (
      <section className="carousel-bleed py-20" style={{ background: 'var(--ink-soft)' }}>
        <div className="w-[min(92vw,1320px)] mx-auto text-center">
          <h2
            className="font-medium leading-tight mb-4"
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              letterSpacing: '-0.05em',
              margin: 0,
            }}
          >
            More Projects
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>More projects coming soon...</p>
        </div>
      </section>
    );
  }

  // Phase 2: Would render additional projects here
  return null;
}
