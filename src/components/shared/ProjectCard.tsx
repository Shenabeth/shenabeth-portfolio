/*
 * File: ProjectCard.tsx
 * Purpose: The project card used on the landing page and the projects
 *          index: green category kicker, title, description, tech tags,
 *          and the view/demo action row, revealed on scroll.
 *
 *          Driven entirely by a Project from src/config/constants.ts, so
 *          adding a project to config adds its card everywhere this is
 *          rendered.
 *
 *          Backing CSS: `.project-card*` in app/globals.css.
 */

'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ActionLink } from './ActionLink';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  /** Position in the grid; staggers the reveal. */
  index?: number;
}

/**
 * Render one project card.
 *
 * @param project - The project to render
 * @param index - Grid position, used to stagger the scroll-in
 */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="project-card__head">
        <span className="project-kicker">{project.category}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-row">
        {project.techStack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className="project-card__actions">
        <ActionLink href={project.caseStudyLink ?? `/projects/${project.id}`}>
          View Project
        </ActionLink>
        {project.demoLink && (
          <ActionLink href={project.demoLink} variant="secondary" external>
            Live Demo <ArrowUpRight />
          </ActionLink>
        )}
      </div>
    </motion.article>
  );
}
