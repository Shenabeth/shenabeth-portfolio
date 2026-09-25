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
      className="block p-4 rounded border border-slate-600 hover:border-slate-500 hover:bg-slate-800 transition-colors"
    >
      <div className="text-sm font-semibold text-slate-100">{name}</div>
      <div className="text-xs text-slate-400">{issuer}</div>
      <div className="text-xs text-slate-500 mt-1">{dateEarned}</div>
    </a>
  );
}
