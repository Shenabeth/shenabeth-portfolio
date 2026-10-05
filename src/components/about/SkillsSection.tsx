import React from 'react';
/*
 * File: SkillsSection.tsx
 * Purpose: Display tech stack organized by category
 */

import { TechStackGrid } from '@/components/about/TechStackGrid';

/**
 * Display tech stack organized by category, rendered as a tabbed icon grid
 */
export function SkillsSection() {
  return (
    <section className="py-28">
      {/* Section heading */}
      <div className="mb-14">
        <p
          className="mb-4 text-xs tracking-widest font-medium"
          style={{
            color: 'var(--accent-bright)',
            fontFamily: '"DM Mono", monospace',
          }}
        >
          {'// stack.json'}
        </p>
        <h2
          className="font-medium leading-tight"
          style={{
            fontSize: 'clamp(2.8rem, 5vw, 5rem)',
            letterSpacing: '-0.065em',
            margin: 0,
          }}
        >
          Tech Stack
        </h2>
      </div>

      <TechStackGrid />
    </section>
  );
}
