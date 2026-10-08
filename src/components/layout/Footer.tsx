'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
/*
 * File: Footer.tsx
 * Purpose: Footer with brand block, quick-nav column, contact column,
 *          socials, and copyright. Uses the sticky "pull-to-reveal" scroll
 *          effect so the site sits above it and reveals as you scroll past.
 */

import Link from 'next/link';
import { CONTACT_EMAIL, SOCIAL_LINKS, RESUME } from '@/config/constants';

/**
 * Site footer with multi-column layout (brand, nav, contact), social
 * links, and a copyright/admin row. Fades in slightly as the viewer
 * scrolls past the main content to reveal it.
 */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'start start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0.85, 1], { clamp: true });
  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="diagonal-texture sticky bottom-0 z-0 w-full"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <motion.div
        style={{ opacity }}
        className="w-[min(92vw,1320px)] mx-auto px-6 md:px-0 py-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-10 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span
              className="block font-semibold text-xl leading-tight"
              style={{ letterSpacing: '-0.04em' }}
            >
              Shenabeth Jenkins
            </span>
            <p
              className="uppercase tracking-widest font-medium"
              style={{
                color: 'var(--text)',
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.78rem',
              }}
            >
              Computer Science · Cloud Architect
            </p>
          </div>

          {/* Explore nav */}
          <FooterColumn label="Explore">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/projects">Projects</FooterLink>
            <FooterLink href="/about#certifications">Credentials</FooterLink>
          </FooterColumn>

          {/* Contact */}
          <FooterColumn label="Contact">
            <FooterLink href="/#contact">Send a message</FooterLink>
            <FooterLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</FooterLink>
            <FooterLink href={RESUME.url} download={RESUME.downloadName} target="_blank">Resume</FooterLink>
          </FooterColumn>

          {/* Socials */}
          <FooterColumn label="Links">
            <FooterLink href={SOCIAL_LINKS.github} target="_blank">GitHub</FooterLink>
            <FooterLink href={SOCIAL_LINKS.linkedin} target="_blank">LinkedIn</FooterLink>
            <FooterLink href={SOCIAL_LINKS.credly} target="_blank">Credly</FooterLink>
          </FooterColumn>
        </div>

        {/* Divider + bottom row */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <p
            style={{
              color: 'var(--muted)',
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.78rem',
            }}
          >
            © {year} Shenabeth Jenkins. Hosted on AWS Amplify.
          </p>
          <Link
            href="/admin/login"
            className="text-xs uppercase tracking-widest transition-all"
            style={{
              color: 'var(--muted)',
              opacity: 0.6,
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.72rem',
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

/** Column heading + stacked link list used in each footer section. */
function FooterColumn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p
        className="uppercase tracking-widest font-medium"
        style={{
          color: 'var(--muted)',
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.72rem',
        }}
      >
        {label}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

/** Single footer link styled to match the DM Mono column treatment. */
function FooterLink({
  href,
  children,
  download,
  target,
}: {
  href: string;
  children: React.ReactNode;
  download?: boolean | string;
  target?: string;
}) {
  const extraProps: Record<string, string | boolean> = {};
  if (download !== undefined) extraProps.download = download;
  if (target) {
    extraProps.target = target;
    extraProps.rel = 'noopener noreferrer';
  }
  return (
    <Link
      href={href}
      {...extraProps}
      className="transition-colors"
      style={{
        color: 'var(--text)',
        fontSize: '0.92rem',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-bright)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)';
      }}
    >
      {children}
    </Link>
  );
}
