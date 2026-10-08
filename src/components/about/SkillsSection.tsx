import React from 'react';
/*
 * File: SkillsSection.tsx
 * Purpose: Display tech stack organized by category
 */

import { TechStackGrid } from '@/components/about/TechStackGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';

/**
 * Display tech stack organized by category, rendered as a tabbed icon grid
 */
export function SkillsSection() {
  return (
    <section className="py-28">
      <SectionHeading
        kicker="// stack.json"
        title="Tech Stack"
        comment="Languages, frameworks, and services I reach for in production work."
      />


      <TechStackGrid />
    </section>
  );
}
