'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
/*
 * File: TechStackGrid.tsx
 * Purpose: Category-tabbed grid of tech-stack chips. Each chip can expose
 *          an optional menu of related projects — clicking a chip that
 *          has related projects opens a Framer Motion dropdown listing
 *          them. Chips without related projects render as flat
 *          non-interactive tiles (no hover lift, no cursor pointer), so
 *          affordance matches behavior.
 */

import { TECH_STACK } from '@/config/constants';
import { getTechIcon, getTechIconColor } from '@/config/techIcons';

/**
 * Related-projects lookup keyed by skill name. When a skill has one or
 * more entries, its tile becomes clickable and reveals a dropdown menu
 * listing those projects. Add entries here as projects are added to the
 * site.
 */
const RELATED_PROJECTS: Record<string, Array<{ title: string; href?: string }>> = {
  // Placeholder entries — fill these in as projects are added. Any skill
  // with an entry here renders as a clickable chip with a dropdown menu.
  // Example: 'React': [{ title: 'Portfolio Site', href: '/projects#portfolio-site' }],
};

export function TechStackGrid() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const category = TECH_STACK[activeCategory];

  const toggleSkill = (skill: string) => {
    setOpenSkill((current) => (current === skill ? null : skill));
  };

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {TECH_STACK.map((cat, idx) => {
          const isActive = idx === activeCategory;
          return (
            <button
              key={cat.category}
              type="button"
              onClick={() => {
                setActiveCategory(idx);
                setOpenSkill(null);
              }}
              className="rounded-full border px-4 py-2 transition-colors"
              style={{
                borderColor: isActive ? 'var(--accent)' : 'var(--line-strong)',
                background: isActive ? 'var(--accent)' : 'var(--ink-soft)',
                color: isActive ? 'var(--ink)' : 'var(--text)',
                fontFamily: 'var(--mono)',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              {cat.category}
            </button>
          );
        })}
      </div>

      {/* Icon chip grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 items-start content-start min-h-[42rem] sm:min-h-[26rem]">
        {category.skills.map((skill) => {
          const Icon = getTechIcon(skill);
          const color = getTechIconColor(skill);
          const projects = RELATED_PROJECTS[skill] ?? [];
          const interactive = projects.length > 0;
          const isOpen = openSkill === skill;
          return (
            <SkillChip
              key={skill}
              skill={skill}
              Icon={Icon}
              color={color}
              interactive={interactive}
              isOpen={isOpen}
              projects={projects}
              onToggle={() => toggleSkill(skill)}
            />
          );
        })}
      </div>
    </div>
  );
}

interface SkillChipProps {
  skill: string;
  Icon: React.ComponentType<{ style?: React.CSSProperties }>;
  color: string;
  interactive: boolean;
  isOpen: boolean;
  projects: Array<{ title: string; href?: string }>;
  onToggle: () => void;
}

/**
 * Single skill tile. When `interactive` is true the whole tile is a
 * button that opens a dropdown of related projects; otherwise it renders
 * as a static tile with no hover affordance so viewers aren't misled
 * into clicking something that doesn't do anything.
 */
function SkillChip({ skill, Icon, color, interactive, isOpen, projects, onToggle }: SkillChipProps) {
  const baseTileStyle: React.CSSProperties = {
    borderColor: 'var(--line)',
    background: 'var(--surface)',
  };

  const content = (
    <div
      className="flex items-center gap-4 p-5 border"
      style={{
        ...baseTileStyle,
        borderColor: isOpen ? 'rgba(84,213,170,0.4)' : baseTileStyle.borderColor,
        borderBottomLeftRadius: isOpen ? 0 : undefined,
        borderBottomRightRadius: isOpen ? 0 : undefined,
        transition: 'border-color 200ms ease, transform 200ms ease',
      }}
    >
      <span
        className="flex items-center justify-center shrink-0"
        style={{
          width: '3.5rem',
          height: '3.5rem',
          background: 'var(--ink-soft)',
          border: '1px solid var(--line-strong)',
          color,
        }}
      >
        <Icon style={{ width: '1.9rem', height: '1.9rem', color }} />
      </span>
      <span
        className="whitespace-nowrap flex-1"
        style={{
          color: 'var(--text)',
          fontFamily: 'var(--mono)',
          fontSize: '1rem',
          fontWeight: 500,
        }}
      >
        {skill}
      </span>
      {interactive && (
        <ChevronDown
          aria-hidden="true"
          style={{
            width: '1rem',
            height: '1rem',
            color: 'var(--muted)',
            transition: 'transform 200ms ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      )}
    </div>
  );

  if (!interactive) {
    // Static tile: no cursor pointer, no hover lift. Matches the actual
    // behavior (nothing to click), so the chip doesn't invite action it
    // can't deliver.
    return <div>{content}</div>;
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`skill-menu-${skill}`}
        className="block w-full text-left"
        style={{ cursor: 'pointer' }}
        onMouseEnter={(e) => {
          const tile = e.currentTarget.firstElementChild as HTMLElement | null;
          if (tile && !isOpen) {
            tile.style.borderColor = 'rgba(84,213,170,0.35)';
            tile.style.transform = 'translateY(-0.2rem)';
          }
        }}
        onMouseLeave={(e) => {
          const tile = e.currentTarget.firstElementChild as HTMLElement | null;
          if (tile && !isOpen) {
            tile.style.borderColor = 'var(--line)';
            tile.style.transform = 'translateY(0)';
          }
        }}
      >
        {content}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`skill-menu-${skill}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            style={{ overflow: 'hidden' }}
            className="rounded-b-xl border border-t-0"
          >
            <ul
              className="flex flex-col"
              style={{
                borderColor: 'rgba(84,213,170,0.4)',
                background: 'var(--ink-soft)',
                padding: '0.75rem 0.5rem',
              }}
            >
              {projects.length === 0 ? (
                <li
                  className="px-3 py-2"
                  style={{
                    color: 'var(--muted)',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.85rem',
                  }}
                >
                  Related projects coming soon.
                </li>
              ) : (
                projects.map((p) => (
                  <li key={p.title}>
                    {p.href ? (
                      <a
                        href={p.href}
                        className="block px-3 py-2 rounded-md transition-colors"
                        style={{
                          color: 'var(--text)',
                          fontSize: '0.9rem',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(84,213,170,0.08)';
                          e.currentTarget.style.color = 'var(--accent-bright)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text)';
                        }}
                      >
                        {p.title}
                      </a>
                    ) : (
                      <span
                        className="block px-3 py-2"
                        style={{
                          color: 'var(--text)',
                          fontSize: '0.9rem',
                        }}
                      >
                        {p.title}
                      </span>
                    )}
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
