/*
 * File: SocialLinks.tsx
 * Purpose: Display social media links (GitHub, LinkedIn, Credly)
 */

import { SOCIAL_LINKS } from '@/config/constants';

interface SocialLinksProps {
  className?: string;
}

/**
 * Display social media links in a horizontal row
 *
 * @param className - Optional CSS class for custom styling
 */
export function SocialLinks({ className = '' }: SocialLinksProps): JSX.Element {
  return (
    <div className={`flex gap-4 ${className}`}>
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-300 hover:text-white transition-colors"
        aria-label="GitHub"
      >
        GitHub
      </a>
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-300 hover:text-white transition-colors"
        aria-label="LinkedIn"
      >
        LinkedIn
      </a>
      <a
        href={SOCIAL_LINKS.credly}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-300 hover:text-white transition-colors"
        aria-label="Credly"
      >
        Credly
      </a>
    </div>
  );
}
