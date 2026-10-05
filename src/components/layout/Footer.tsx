'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
/*
 * File: Footer.tsx
 * Purpose: Footer with social links and admin link, revealed via a
 * sticky "pull to reveal" scroll effect (site sits above, footer sticks
 * to the bottom of the viewport and reveals as the page scrolls past it),
 * fading in as it's uncovered
 */

import Link from 'next/link';
import { SocialLinks } from '@/components/shared/SocialLinks';

/**
 * Footer with name, social links, and admin link
 */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'start start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer
      ref={footerRef}
      className="diagonal-texture sticky bottom-0 z-0 w-full"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <motion.div style={{ opacity }} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-8 w-[min(92vw,1320px)] mx-auto min-h-60 py-12 px-6 md:px-0">
        {/* Left: Name and tagline */}
        <div>
          <span
            className="block font-semibold text-xl leading-tight"
            style={{
              letterSpacing: '-0.04em',
            }}
          >
            Shenabeth Jenkins
          </span>
          <p
            className="mt-2 text-xs uppercase tracking-widest font-medium"
            style={{
              color: 'var(--foreground)',
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.75rem',
            }}
          >
            Computer Science · Cloud Architect
          </p>
        </div>

        {/* Right: Social links and admin */}
        <div className="flex flex-col items-start gap-6 md:items-end md:justify-between">
          {/* Social links */}
          <div className="flex gap-2.5">
            <SocialLinks />
          </div>

          {/* Admin link */}
          <Link
            href="/admin/login"
            className="text-xs uppercase tracking-widest transition-all"
            style={{
              color: 'var(--muted)',
              opacity: 0.6,
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.75rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent-bright)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.opacity = '0.6';
            }}
          >
            Admin
          </Link>
        </div>
      </motion.div>
    </footer>
  );
}
