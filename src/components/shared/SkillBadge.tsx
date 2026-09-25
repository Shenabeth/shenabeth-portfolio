import React from 'react';
/*
 * File: SkillBadge.tsx
 * Purpose: Display individual skill as a small badge/tag
 */

interface SkillBadgeProps {
  label: string;
}

/**
 * Display a skill as a small pill-shaped badge
 *
 * @param label - Skill name to display
 */
export function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="inline-block px-3 py-1 text-sm rounded-full bg-slate-700 text-slate-100">
      {label}
    </span>
  );
}
