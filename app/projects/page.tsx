/*
 * File: page.tsx
 * Purpose: Projects page
 */

import { FeaturedProjectsGrid } from "@/components/projects/FeaturedProjectsGrid";
import { MoreProjectsSection } from "@/components/projects/MoreProjectsSection";
import { FEATURED_PROJECTS } from "@/config/constants";

export default function ProjectsPage() {
  return (
    <div className="px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Projects</h1>

        <FeaturedProjectsGrid projects={FEATURED_PROJECTS} />
        <MoreProjectsSection />
      </div>
    </div>
  );
}
