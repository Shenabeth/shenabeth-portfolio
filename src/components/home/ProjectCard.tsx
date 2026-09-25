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
}: ProjectCardProps): JSX.Element {
  return (
    <div className="flex-shrink-0 w-80 p-6 rounded border border-slate-600 bg-slate-800 hover:border-slate-500 transition-colors">
      {/* Status Badge */}
      {status && (
        <div className="mb-3">
          <span className="inline-block px-2 py-1 text-xs rounded bg-slate-700 text-slate-300">
            {status === 'coming-soon' && 'Coming Soon'}
            {status === 'live' && 'Live'}
            {status === 'in-progress' && 'In Progress'}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-slate-300 mb-4">{description}</p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">
            {tech}
          </span>
        ))}
        {techStack.length > 3 && (
          <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-400">
            +{techStack.length - 3}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-2 flex-wrap">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
        >
          GitHub
        </a>
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          >
            Demo
          </a>
        )}
        {caseStudyLink && (
          <a
            href={caseStudyLink}
            className="text-xs px-3 py-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          >
            Case Study
          </a>
        )}
      </div>
    </div>
  );
}
