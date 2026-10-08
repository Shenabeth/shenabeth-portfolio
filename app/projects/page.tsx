/*
 * File: page.tsx
 * Purpose: Projects page
 */

import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { MoreProjectsSection } from "@/components/projects/MoreProjectsSection";
import { FEATURED_PROJECTS } from "@/config/constants";
import { PageTitleBanner } from "@/components/shared/PageTitleBanner";

export default function ProjectsPage() {
  return (
    <div className="pb-16">
      <div className="w-[min(92vw,1320px)] mx-auto" style={{ marginBottom: '2rem' }}>
        <PageTitleBanner
          kicker="// projects.json"
          title="Projects"
          comment="A closer look at what I've built, from full-stack systems to the small tools that make development easier."
        />
      </div>

      <FeaturedProjectsSection projects={FEATURED_PROJECTS} pageHero showHeading={false} />
      <MoreProjectsSection />
    </div>
  );
}
