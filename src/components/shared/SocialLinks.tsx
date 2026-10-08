'use client';

import React from 'react';
/*
 * File: SocialLinks.tsx
 * Purpose: Display social media links with SVG icons (GitHub, LinkedIn, Credly, Email)
 */

import { SOCIAL_LINKS } from '@/config/constants';

interface SocialLinksProps {
  className?: string;
  variant?: 'icons' | 'text';
}

interface SocialIcon {
  name: string;
  path: React.ReactNode;
  ariaLabel: string;
  href: string;
}

const socialIcons: SocialIcon[] = [
  {
    name: 'github',
    ariaLabel: 'GitHub',
    href: SOCIAL_LINKS.github,
    path: (
      <path d="M12 2.8a9.4 9.4 0 0 0-3 18.3c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.3-2.3-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A9.4 9.4 0 0 0 12 2.8Z" />
    ),
  },
  {
    name: 'linkedin',
    ariaLabel: 'LinkedIn',
    href: SOCIAL_LINKS.linkedin,
    path: (
      <path d="M6.2 20H3V9.7h3.2V20ZM4.6 8.3A1.9 1.9 0 1 1 4.6 4.5a1.9 1.9 0 0 1 0 3.8ZM20 20h-3.2v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H9.9V9.7H13v1.4h.1c.4-.8 1.5-1.7 3-1.7 3.3 0 3.9 2.1 3.9 5V20Z" />
    ),
  },
  {
    name: 'credly',
    ariaLabel: 'Credly',
    href: SOCIAL_LINKS.credly,
    path: (
      <path d="M19 7.8a7.5 7.5 0 1 0 0 8.4 1 1 0 1 0-1.56-1.26 5.5 5.5 0 1 1 0-5.88A1 1 0 1 0 19 7.8Z" transform="translate(-0.5 0)" />
    ),
  },
];

/**
 * Display social media links with SVG icons in a horizontal row
 *
 * @param className - Optional CSS class for custom styling
 * @param variant - 'icons' (default) for SVG icons, 'text' for text links
 */
export function SocialLinks({ className = '', variant = 'icons' }: SocialLinksProps) {
  if (variant === 'text') {
    return (
      <div className={`flex gap-4 ${className}`}>
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors font-medium"
          aria-label="GitHub"
        >
          GitHub
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors font-medium"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 ${className}`}>
      {socialIcons.map(({ name, ariaLabel, href, path }) => {
        const isExternal = !href.startsWith('mailto:');
        return (
          <a
            key={name}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-label={ariaLabel}
            className="social-chip"
          >
            <span className="social-chip-ring" aria-hidden="true" />
            <svg viewBox="0 0 24 24" fill="currentColor" className="social-chip-icon">
              {path}
            </svg>
          </a>
        );
      })}
    </div>
  );
}
