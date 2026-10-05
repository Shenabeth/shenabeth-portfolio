'use client';

import { useState } from 'react';
/*
 * File: TechStackGrid.tsx
 * Purpose: Category-tabbed grid of tech stack icon chips (replaces the
 * old 3D sphere with a plain, reliable 2D layout)
 */

import { TECH_STACK } from '@/config/constants';
import { getTechIcon, getTechIconColor } from '@/config/techIcons';

export function TechStackGrid() {
  const [activeCategory, setActiveCategory] = useState(0);
  const category = TECH_STACK[activeCategory];

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {TECH_STACK.map((cat, idx) => {
          const isActive = idx === activeCategory;
          return (
            <button
              key={cat.category}
              type="button"
              onClick={() => setActiveCategory(idx)}
              className="rounded-full border px-3.5 py-1.5 text-xs transition-colors"
              style={{
                borderColor: isActive ? 'var(--accent)' : 'var(--line-strong)',
                background: isActive ? 'var(--accent)' : 'var(--ink-soft)',
                color: isActive ? 'var(--ink)' : 'var(--muted)',
                fontFamily: '"DM Mono", monospace',
              }}
            >
              {cat.category}
            </button>
          );
        })}
      </div>

      {/* Icon chip grid. Fixed min-height per breakpoint (sized to the
          largest category, AWS Services at 10 items, at that breakpoint's
          column count) so switching tabs never grows/shrinks the page —
          shorter categories just leave empty space below instead. */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-start content-start min-h-[27rem] sm:min-h-[22rem] md:min-h-[17rem]">
        {category.skills.map((skill) => {
          const Icon = getTechIcon(skill);
          const color = getTechIconColor(skill);
          return (
            <div
              key={skill}
              className="flex items-center gap-3 p-4 rounded-xl border"
              style={{
                borderColor: 'var(--line)',
                background: 'var(--surface)',
              }}
            >
              <span
                className="flex items-center justify-center shrink-0 rounded-full border"
                style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  borderColor: 'var(--line-strong)',
                  color,
                }}
              >
                <Icon style={{ width: '1.35rem', height: '1.35rem', color }} />
              </span>
              <span
                className="text-xs leading-tight"
                style={{ color: 'var(--text)', fontFamily: '"DM Mono", monospace' }}
              >
                {skill}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
