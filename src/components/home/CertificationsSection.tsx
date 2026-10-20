'use client';

import { motion, useReducedMotion } from 'framer-motion';
/*
 * File: CertificationsSection.tsx
 * Purpose: Display certifications as a row-list (index, badge, title +
 *          issuer, date, hover-shift, arrow) — the reference prototype's
 *          credentials-list pattern (docs/Portfolio/src/{App.tsx,
 *          styles.css}) re-skinned to real CERTIFICATIONS/
 *          CERTIFICATIONS data, replacing the previous card grid.
 */

import { CERTIFICATIONS, SOCIAL_LINKS } from '@/config/constants';
import type { Certification } from '@/types';
import { SectionHeading } from '@/components/shared/SectionHeading';

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Normalize the stored dateEarned string into the "Issued Mon DD, YYYY"
 * (or "Issued Mon YYYY" when the day isn't specified) form the card
 * displays, matching the Credly reference layout. Returns the raw value
 * for "In Progress" / "TBD" since those aren't dates.
 */
function formatIssuedDate(dateEarned: string): string {
  if (dateEarned === 'In Progress' || dateEarned === 'TBD') return dateEarned;
  const parsed = new Date(dateEarned);
  if (Number.isNaN(parsed.getTime())) return dateEarned;
  const month = MONTH_ABBR[parsed.getMonth()];
  const year = parsed.getFullYear();
  // Detect "Month YYYY" strings (no day) so we don't invent a bogus day
  const hasDay = /\d{1,2}(?!\d)/.test(dateEarned.replace(String(year), ''));
  if (hasDay) {
    return `Issued ${month} ${parsed.getDate()}, ${year}`;
  }
  return `Issued ${month} ${year}`;
}

/** A single credential row: index, badge, title/issuer, date, arrow. */
function CredentialRow({ cert, index }: { cert: Certification; index: number }) {
  const dateLabel = formatIssuedDate(cert.dateEarned);
  const reducedMotion = useReducedMotion();
  const isExternal = cert.credlyUrl !== '#';

  return (
    <motion.a
      href={cert.credlyUrl}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="credential-row"
      whileHover={reducedMotion ? undefined : { x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <span className="credential-row-index">{String(index + 1).padStart(2, '0')}</span>
      <span className="credential-row-badge">
        {cert.badgeUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cert.badgeUrl} alt={`${cert.name} badge, issued by ${cert.issuer}`} />
        ) : (
          <span className="credential-row-badge-fallback" aria-hidden="true">
            {cert.code || 'CERT'}
          </span>
        )}
      </span>
      <span>
        <h3 className="credential-row-title">{cert.name}</h3>
        <p className="credential-row-issuer">{cert.issuer}</p>
      </span>
      <span className="credential-row-meta">{dateLabel}</span>
      <svg className="credential-row-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 15 15 5M8 5h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}

/**
 * Display certifications as a row-list. Every certification is listed, with
 * a link out to the Credly profile beneath them.
 */
export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="shell py-28"
      style={{
        scrollMarginTop: '7rem',
      }}
    >
      <SectionHeading
        kicker="// certifications.json"
        title="Certifications"
        comment="Industry credentials supporting a strong foundation in cloud architecture and information technology."
      />

      <div className="credentials-list">
        {CERTIFICATIONS.map((cert, i) => (
          <CredentialRow key={cert.id} cert={cert} index={i} />
        ))}
      </div>

      {/*
        All certifications are listed above, so this links out to the Credly
        profile rather than expanding a hidden set in place.
      */}
      <div className="credentials-toggle">
        <a
          className="secondary-action sweep-button"
          href={SOCIAL_LINKS.credly}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>View All On Credly</span>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 15 15 5M8 5h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
