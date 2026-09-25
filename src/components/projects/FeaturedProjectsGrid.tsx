/*
 * File: FeaturedProjectsGrid.tsx
 * Purpose: Display featured projects in a stacked grid layout
 */

import { Project } from '@/types';
import { ExpandedProjectCard } from './ExpandedProjectCard';

interface FeaturedProjectsGridProps {
  projects: Project[];
}

/**
 * Display featured projects stacked vertically
 *
 * @param projects - Array of featured projects
 */
export function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps): JSX.Element {
  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <ExpandedProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          longDescription={project.longDescription}
          techStack={project.techStack}
          demoLink={project.demoLink}
          githubLink={project.githubLink}
          caseStudyLink={project.caseStudyLink}
          status={project.status}
        />
      ))}
    </div>
  );
}
