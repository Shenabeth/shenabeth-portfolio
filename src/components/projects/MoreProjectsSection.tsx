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
export function MoreProjectsSection({ projects }: MoreProjectsSectionProps): JSX.Element {
  // Phase 1: Show placeholder only
  if (!projects || projects.length === 0) {
    return (
      <section className="py-16">
        <div className="text-center">
          <p className="text-slate-400 text-lg">More projects coming soon...</p>
        </div>
      </section>
    );
  }

  // Phase 2: Would render additional projects here
  return null;
}
