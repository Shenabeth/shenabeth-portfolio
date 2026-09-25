/*
 * File: SkillsSection.tsx
 * Purpose: Display skills organized by category
 */

import { SKILLS_BY_CATEGORY } from '@/config/constants';
import { SkillBadge } from '@/components/shared/SkillBadge';

/**
 * Display skills organized by category in a responsive layout
 */
export function SkillsSection(): JSX.Element {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Skills</h2>

      {/* Skills categories */}
      <div className="space-y-8">
        {SKILLS_BY_CATEGORY.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg md:text-xl font-semibold text-slate-200 mb-3">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <SkillBadge key={skill} label={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
