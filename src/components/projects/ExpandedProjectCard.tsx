import React from 'react';
/*
 * File: ExpandedProjectCard.tsx
 * Purpose: Display a single project in expanded detail format
 */

interface ExpandedProjectCardProps {
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  demoLink?: string;
  githubLink: string;
  caseStudyLink?: string;
  status?: 'live' | 'coming-soon' | 'in-progress';
  whyBuilt?: string;
}

/**
 * Display an expanded project card with full details
 *
 * @param title - Project title
 * @param description - Short project description
 * @param longDescription - Detailed project description
 * @param techStack - Array of technology names
 * @param demoLink - Optional link to live demo
 * @param githubLink - Link to GitHub repository
 * @param caseStudyLink - Optional link to case study
 * @param status - Optional project status badge
 * @param whyBuilt - Optional explanation of why project was built
 */
export function ExpandedProjectCard({
  title,
  description,
  longDescription,
  techStack,
  demoLink,
  githubLink,
  caseStudyLink,
  status,
  whyBuilt,
}: ExpandedProjectCardProps) {
  const displayDescription = longDescription || description;

  return (
    <div className="p-8 rounded border border-slate-600 bg-slate-800">
      {/* Header with status */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex-1">{title}</h2>
        {status && (
          <span className="ml-4 px-3 py-1 text-sm rounded bg-slate-700 text-slate-300 whitespace-nowrap">
            {status === 'coming-soon' && 'Coming Soon'}
            {status === 'live' && 'Live'}
            {status === 'in-progress' && 'In Progress'}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-lg text-slate-300 mb-6">{displayDescription}</p>

      {/* Why Built Section */}
      {whyBuilt && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Why I Built It
          </h3>
          <p className="text-slate-300">{whyBuilt}</p>
        </div>
      )}

      {/* Tech Stack */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 rounded bg-slate-700 text-slate-300 text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors font-medium"
        >
          GitHub
        </a>
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors font-medium"
          >
            Live Demo
          </a>
        )}
        {caseStudyLink && (
          <a
            href={caseStudyLink}
            className="px-4 py-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors font-medium"
          >
            Case Study
          </a>
        )}
      </div>
    </div>
  );
}
