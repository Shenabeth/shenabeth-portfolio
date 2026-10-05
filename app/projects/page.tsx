/*
 * File: page.tsx
 * Purpose: Projects page
 */

import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { MoreProjectsSection } from "@/components/projects/MoreProjectsSection";
import { FEATURED_PROJECTS } from "@/config/constants";

export default function ProjectsPage() {
  return (
    <div className="pt-16 pb-16">
      <div className="w-[min(92vw,1320px)] mx-auto" style={{ marginBottom: '3rem' }}>
        <h1
          className="font-medium leading-tight"
          style={{
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            letterSpacing: '-0.065em',
            margin: 0,
          }}
        >
          Projects
        </h1>
        <p
          className="max-w-lg mt-5"
          style={{
            color: 'var(--muted)',
            fontSize: '0.95rem',
            lineHeight: '1.7',
          }}
        >
          A closer look at what I&apos;ve built, from full-stack systems to the small tools that make development easier.
        </p>
      </div>

      <FeaturedProjectsSection projects={FEATURED_PROJECTS} pageHero showHeading={false} />
      <MoreProjectsSection />
    </div>
  );
}
