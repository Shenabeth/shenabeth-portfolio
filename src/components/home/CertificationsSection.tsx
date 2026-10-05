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

interface CertificationsSectionProps {
  /**
   * 'dropdown' (default, used on the About page): full grid with an
   * expand/collapse toggle for additional certifications.
   * 'link' (used on the Home page): a trimmed preview that links out to
   * the About page's certifications section instead of expanding in place.
   */
  variant?: 'dropdown' | 'link';
}

function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <article
      className="relative grid grid-rows-[1fr_auto] min-h-64 p-6 rounded-xl border transition-all duration-240"
      style={{
        borderColor: 'var(--line)',
        background: 'var(--surface)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-0.35rem)';
        e.currentTarget.style.borderColor = 'rgba(84,213,170,.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--line)';
      }}
    >
      {/* Code badge - top right */}
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full border self-start justify-self-end"
        style={{
          borderColor: 'var(--line-strong)',
          color: 'var(--accent-bright)',
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.75rem',
        }}
      >
        {cert.code || 'CERT'}
      </div>

      {/* Cert info - bottom */}
      <div className="self-end">
        <p
          className="mb-2 text-xs uppercase tracking-wider font-medium"
          style={{
            color: 'var(--muted)',
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.75rem',
          }}
        >
          {cert.issuer}
        </p>
        <h3
          className="font-medium leading-tight"
          style={{
            fontSize: '1.35rem',
            letterSpacing: '-0.035em',
            maxWidth: '14rem',
            margin: 0,
          }}
        >
          {cert.name}
        </h3>
      </div>

      {/* Arrow icon - bottom right */}
      <svg
        className="absolute bottom-6 right-6 w-5"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        style={{
          color: 'var(--muted)',
        }}
      >
        <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </article>
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
      {/* Section heading */}
      <div
        className="flex items-end justify-between gap-16 mb-14"
        style={{
          marginBottom: '3.5rem',
        }}
      >
        <div>
          {variant === 'dropdown' && (
            <p
              className="mb-4 text-xs tracking-widest font-medium"
              style={{
                color: 'var(--accent-bright)',
                fontFamily: '"DM Mono", monospace',
              }}
            >
              {'// certifications.json'}
            </p>
          )}
          <h2
            className="font-medium leading-tight"
            style={{
              fontSize: 'clamp(2.8rem, 5vw, 5rem)',
              letterSpacing: '-0.065em',
              margin: 0,
            }}
          >
            Certifications
          </h2>
        </div>
        <p
          className="max-w-lg"
          style={{
            color: 'var(--muted)',
            fontSize: '0.95rem',
            lineHeight: '1.7',
          }}
        >
          Industry credentials supporting a strong foundation in cloud architecture and information technology.
        </p>
      </div>

      {/* Certifications grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CERTIFICATIONS.map((cert) => (
          <CertificationCard key={cert.id} cert={cert} />
        ))}
      </div>

      {HIDDEN_CERTIFICATIONS.length > 0 && variant === 'link' && (
        <div className="flex justify-center mt-10">
          <Link href="/about#certifications" className="secondary-action sweep-button">
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
              className="secondary-action sweep-button"
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
