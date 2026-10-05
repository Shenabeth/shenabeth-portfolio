import React from 'react';
/*
 * File: CertificationBadge.tsx
 * Purpose: Display individual certification badge
 */

interface CertificationBadgeProps {
  name: string;
  issuer: string;
  dateEarned: string;
  credlyUrl: string;
}

/**
 * Display a certification badge that links to Credly
 *
 * @param name - Certification name
 * @param issuer - Issuing organization
 * @param dateEarned - Date certification was earned
 * @param credlyUrl - URL to Credly badge
 */
export function CertificationBadge({
  name,
  issuer,
  dateEarned,
  credlyUrl,
}: CertificationBadgeProps) {
  return (
    <a
      href={credlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg border border-border bg-background hover:border-primary hover:bg-card transition-colors group"
    >
      <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{name}</div>
      <div className="text-xs text-muted-foreground">{issuer}</div>
      <div className="text-xs text-muted-foreground/70 mt-2">{dateEarned}</div>
    </a>
  );
}
