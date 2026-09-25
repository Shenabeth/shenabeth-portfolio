import React from 'react';
/*
 * File: FeaturedProjectsSection.tsx
 * Purpose: Display featured projects in a horizontal scrollable container
 */

import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

/**
 * Display featured projects in a horizontal scrollable section
 *
 * @param projects - Array of featured projects to display
 */
export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Featured Projects</h2>

        {/* Horizontal scrollable container */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-min">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                demoLink={project.demoLink}
                githubLink={project.githubLink}
                caseStudyLink={project.caseStudyLink}
                status={project.status}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
