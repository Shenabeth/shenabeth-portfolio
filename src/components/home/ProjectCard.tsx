import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/*
 * File: ProjectCard.tsx
 * Purpose: Display a single project in card format for featured projects section
 */

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  demoLink?: string;
  githubLink: string;
  caseStudyLink?: string;
  status?: 'live' | 'coming-soon' | 'in-progress';
}

/**
 * Display a project card with title, description, tech stack, and action links
 *
 * @param title - Project title
 * @param description - Short project description
 * @param techStack - Array of technology names
 * @param demoLink - Optional link to live demo
 * @param githubLink - Link to GitHub repository
 * @param caseStudyLink - Optional link to case study
 * @param status - Optional project status badge
 */
export function ProjectCard({
  title,
  description,
  techStack,
  demoLink,
  githubLink,
  caseStudyLink,
  status,
}: ProjectCardProps) {
  return (
    <div className="flex-shrink-0 w-96 p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group">
      {/* Status Badge */}
      {status && (
        <div className="mb-3">
          <Badge variant={status === 'live' ? 'default' : 'outline'}>
            {status === 'coming-soon' && 'Coming Soon'}
            {status === 'live' && 'Live'}
            {status === 'in-progress' && 'In Progress'}
          </Badge>
        </div>
      )}

      {/* Title */}
      <h4 className="text-foreground mb-3 group-hover:text-primary transition-colors">{title}</h4>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">
            {tech}
          </span>
        ))}
        {techStack.length > 3 && (
          <span className="text-xs px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground/70 font-medium">
            +{techStack.length - 3}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-2 flex-wrap">
        <Button asChild variant="outline" size="sm">
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Button>
        {demoLink && (
          <Button asChild variant="outline" size="sm">
            <a href={demoLink} target="_blank" rel="noopener noreferrer">
              Demo
            </a>
          </Button>
        )}
        {caseStudyLink && (
          <Button asChild variant="outline" size="sm">
            <a href={caseStudyLink}>
              Case Study
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
