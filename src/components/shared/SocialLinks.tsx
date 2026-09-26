'use client';

import React from 'react';
/*
 * File: SocialLinks.tsx
 * Purpose: Display social media links with SVG icons (GitHub, LinkedIn, X, Dribbble)
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
    name: 'x',
    ariaLabel: 'X',
    href: 'https://twitter.com',
    path: (
      <path d="M18.3 3H21l-6 7 7 11h-5.5l-4.3-5.8L7.1 21H4.3l6.6-7.7L4.2 3h5.7l3.9 5.3L18.3 3Zm-1 16h1.5L9 4.9H7.4L17.3 19Z" />
    ),
  },
  {
    name: 'credly',
    ariaLabel: 'Credly',
    href: SOCIAL_LINKS.credly,
    path: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
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
    <div className={`flex gap-2.5 ${className}`}>
      {socialIcons.map(({ name, ariaLabel, href, path }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className="flex items-center justify-center w-11 h-11 rounded-full border transition-all"
          style={{
            borderColor: 'var(--line)',
            color: 'var(--muted)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-bright)';
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.transform = 'translateY(-0.2rem)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--muted)';
            e.currentTarget.style.borderColor = 'var(--line)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            {path}
          </svg>
        </a>
      ))}
    </div>
  );
}
