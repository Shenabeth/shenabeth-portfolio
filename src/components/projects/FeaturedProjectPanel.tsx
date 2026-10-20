/*
 * File: FeaturedProjectPanel.tsx
 * Purpose: A featured project on the /projects index, given the wide panel
 *          treatment: its illustration (or screenshot) on one side and the
 *          kicker / title / copy / tech tags / actions on the other.
 *
 *          Panels alternate which side the visual sits on (`flip`), so a
 *          column of them reads as a rhythm rather than three identical
 *          rows. Content comes from a Project in src/config/constants.ts
 *          and the artwork from ProjectVisual, so nothing here names a
 *          project.
 *
 *          Backing CSS: `.featured-panel*` in app/globals.css.
 */

'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ActionLink } from '@/components/shared/ActionLink';
import { ProjectVisual } from '@/components/projects/ProjectVisual';
import { Project } from '@/types';

interface FeaturedProjectPanelProps {
  project: Project;
  /** Puts the visual on the left instead of the right. */
  flip?: boolean;
}

/**
 * Render one featured project panel.
 *
 * @param project - The project to render
 * @param flip - Whether to mirror the layout (visual on the left)
 */
export function FeaturedProjectPanel({
  project,
  flip = false,
}: FeaturedProjectPanelProps) {
  return (
    <motion.article
      className={`featured-panel${flip ? ' featured-panel--flip' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="featured-panel__copy">
        <span className="project-kicker">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.longDescription ?? project.description}</p>
        <div className="tag-row">
          {project.techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="featured-panel__actions">
          <ActionLink href={project.caseStudyLink ?? `/projects/${project.id}`}>
            View Project
          </ActionLink>
          {project.demoLink && (
            <ActionLink href={project.demoLink} variant="secondary" external>
              Live Demo <ArrowUpRight />
            </ActionLink>
          )}
        </div>
      </div>

      <div className="featured-panel__visual">
        <ProjectVisual
          id={project.id}
          title={project.title}
          imageUrl={project.imageUrl}
        />
      </div>
    </motion.article>
  );
}
