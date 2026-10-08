'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
/*
 * File: CertificationsSection.tsx
 * Purpose: Display certifications (styled from old site)
 */

import { CERTIFICATIONS, HIDDEN_CERTIFICATIONS } from '@/config/constants';
import type { Certification } from '@/types';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface CertificationsSectionProps {
  /**
   * 'dropdown' (default, used on the About page): full grid with an
   * expand/collapse toggle for additional certifications.
   * 'link' (used on the Home page): a trimmed preview that links out to
   * the About page's certifications section instead of expanding in place.
   */
  variant?: 'dropdown' | 'link';
}

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

function CertificationCard({ cert }: { cert: Certification }) {
  const dateLabel = formatIssuedDate(cert.dateEarned);
  return (
    <a
      href={cert.credlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl border transition-all duration-240"
      style={{
        borderColor: 'var(--line)',
        background: 'var(--surface)',
        padding: '1.75rem',
        minHeight: '18rem',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-0.35rem)';
        e.currentTarget.style.borderColor = 'rgba(84,213,170,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--line)';
      }}
    >
      {/* Badge image: centered horizontally in the top block. AWS circular
          badges fill a square tightly; non-AWS logos (CompTIA, Google,
          Microsoft, Adobe Photoshop) tend to be wider-than-tall and read
          as visually smaller at the same bounding box. Scale non-AWS
          logos up so their perceived size matches. */}
      <div className="flex items-center justify-center" style={{ height: '9rem', marginBottom: '1.25rem' }}>
        {cert.badgeUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cert.badgeUrl}
            alt={`${cert.name} badge, issued by ${cert.issuer}`}
            className="object-contain"
            style={
              cert.issuer === 'Amazon Web Services'
                ? { maxWidth: '7.5rem', maxHeight: '7.5rem' }
                : { maxWidth: '11rem', maxHeight: '8.5rem' }
            }
          />
        ) : (
          <div
            className="flex items-center justify-center rounded-full border"
            style={{
              width: '6.5rem',
              height: '6.5rem',
              borderColor: 'var(--line-strong)',
              color: 'var(--accent-bright)',
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.9rem',
            }}
          >
            {cert.code || 'CERT'}
          </div>
        )}
      </div>

      {/* Text column: left-aligned, consistent spacing between title/issuer/date */}
      <div className="flex flex-col text-left" style={{ gap: '0.4rem' }}>
        <h3
          className="font-semibold leading-snug"
          style={{
            color: 'var(--text)',
            fontSize: '1.05rem',
            letterSpacing: '-0.015em',
          }}
        >
          {cert.name}
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{cert.issuer}</p>
      </div>

      <p
        className="text-left"
        style={{
          color: 'var(--muted)',
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.8rem',
          marginTop: 'auto',
          paddingTop: '1.25rem',
        }}
      >
        {dateLabel}
      </p>
    </a>
  );
}

/**
 * Display certifications in a 3-column grid (old site style). On the About
 * page (variant="dropdown") a toggle reveals additional certifications
 * below the trigger button without the button itself shifting position. On
 * the Home page (variant="link") only the base set is shown, with a link
 * out to the About page's certifications section instead.
 */
export function CertificationsSection({ variant = 'dropdown' }: CertificationsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  return (
    <section
      id="certifications"
      className="w-[min(92vw,1320px)] mx-auto py-28"
      style={{
        scrollMarginTop: '7rem',
      }}
    >
      <SectionHeading
        kicker="// certifications.json"
        title="Certifications"
        comment="Industry credentials supporting a strong foundation in cloud architecture and information technology."
      />


      {/* Certifications grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CERTIFICATIONS.map((cert) => (
          <CertificationCard key={cert.id} cert={cert} />
        ))}
      </div>

      {HIDDEN_CERTIFICATIONS.length > 0 && variant === 'link' && (
        <div className="flex justify-center mt-10">
          <Link href="/about#certifications" className="primary-action sweep-button">
            <span>View all credentials</span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      )}

      {HIDDEN_CERTIFICATIONS.length > 0 && variant === 'dropdown' && (
        <>
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              className="primary-action sweep-button"
            >
              <span>{showAll ? 'Hide additional credentials' : 'View all credentials'}</span>
              <ChevronDown
                className="transition-transform duration-200"
                style={{
                  transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>
          </div>

          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {HIDDEN_CERTIFICATIONS.map((cert) => (
                    <CertificationCard key={cert.id} cert={cert} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}
