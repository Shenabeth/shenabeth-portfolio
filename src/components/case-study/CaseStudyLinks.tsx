/*
 * File: CaseStudyLinks.tsx
 * Purpose: A row of external action links for a case study (live demo, source,
 *          etc.), shown directly under the summary. The first/primary link gets
 *          the filled button treatment; the rest are outlined. Opens in a new
 *          tab since these point off-site.
 */

import { CaseStudyLink } from '@/config/case-studies';

interface CaseStudyLinksProps {
  links: CaseStudyLink[];
}

/**
 * Render case-study action buttons (demo / source / etc.).
 *
 * @param links - External links to render; the first marked `primary` is filled
 * @returns A row of anchor buttons
 */
export function CaseStudyLinks({ links }: CaseStudyLinksProps): React.ReactElement {
  return (
    <div className="case-study-links">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${link.primary ? 'primary-action' : 'secondary-action'} sweep-button`}
        >
          <span>{link.label}</span>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 15 15 5M8 5h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      ))}
    </div>
  );
}
