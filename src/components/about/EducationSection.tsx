import React from 'react';
/*
 * File: EducationSection.tsx
 * Purpose: Display education history as spec-plate style cards
 */

import { EDUCATION } from '@/config/constants';

/**
 * Display education section with degree, university, year, and tag
 * for each entry, styled to match the site's card system
 */
export function EducationSection() {
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
          {'// education.json'}
        </p>
        <h2
          className="font-medium leading-tight"
          style={{
            fontSize: 'clamp(2.8rem, 5vw, 5rem)',
            letterSpacing: '-0.065em',
            margin: 0,
          }}
        >
          Education
        </h2>
      </div>

      {/* Education cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EDUCATION.map((entry, idx) => (
          <article
            key={entry.degree}
            className="relative p-6 rounded-xl border"
            style={{
              borderColor: idx === 0 ? 'rgba(84,213,170,.45)' : 'var(--line)',
              background: 'var(--surface)',
            }}
          >
            {/* Corner screws */}
            <span
              className="absolute w-1 h-1 rounded-full"
              style={{ top: '0.75rem', left: '0.75rem', background: 'var(--line-strong)' }}
              aria-hidden="true"
            />
            <span
              className="absolute w-1 h-1 rounded-full"
              style={{ top: '0.75rem', right: '0.75rem', background: 'var(--line-strong)' }}
              aria-hidden="true"
            />
            <span
              className="absolute w-1 h-1 rounded-full"
              style={{ bottom: '0.75rem', left: '0.75rem', background: 'var(--line-strong)' }}
              aria-hidden="true"
            />
            <span
              className="absolute w-1 h-1 rounded-full"
              style={{ bottom: '0.75rem', right: '0.75rem', background: 'var(--line-strong)' }}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between mb-6">
              <p
                className="text-xs uppercase tracking-wider font-medium"
                style={{
                  color: 'var(--accent-bright)',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.75rem',
                }}
              >
                {entry.tag}
              </p>
              <p
                className="text-xs"
                style={{
                  color: 'var(--muted)',
                  fontFamily: '"DM Mono", monospace',
                }}
              >
                {entry.year}
              </p>
            </div>

            <h3
              className="font-medium leading-tight mb-2"
              style={{
                fontSize: '1.5rem',
                letterSpacing: '-0.035em',
              }}
            >
              {entry.degree}
            </h3>
            <p style={{ color: 'var(--muted)' }}>{entry.university}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
