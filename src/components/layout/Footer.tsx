/*
 * File: Footer.tsx
 * Purpose: Footer with brand block, explore column, contact column, links
 *          column, and a copyright/admin row — the previous site's footer,
 *          restored in place of the single-row reference footer.
 *
 *          Styling is class-based (`.site-footer--columns`, see
 *          app/globals.css) rather than the inline styles the old version
 *          used, so it reads against the same CSS variables as the rest of
 *          the ported design.
 */

import React from 'react';
import Link from 'next/link';
import { CONTACT_EMAIL, SOCIAL_LINKS, RESUME } from '@/config/constants';

/** Site footer: brand, three link columns, copyright + admin row. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer--columns">
      <div className="shell">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <span className="footer-brand__name">Shenabeth Jenkins</span>
            <p className="footer-brand__role">Computer Science · Cloud Architect</p>
          </div>

          <FooterColumn label="Explore">
            <FooterLink href="/#home">Home</FooterLink>
            <FooterLink href="/#projects">Projects</FooterLink>
            <FooterLink href="/#about">About</FooterLink>
            <FooterLink href="/#certifications">Certifications</FooterLink>
          </FooterColumn>

          <FooterColumn label="Contact">
            <FooterLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</FooterLink>
            <FooterLink href={RESUME.url} download={RESUME.downloadName} target="_blank">
              R&eacute;sum&eacute;
            </FooterLink>
          </FooterColumn>

          <FooterColumn label="Links">
            <FooterLink href={SOCIAL_LINKS.github} target="_blank">
              GitHub
            </FooterLink>
            <FooterLink href={SOCIAL_LINKS.linkedin} target="_blank">
              LinkedIn
            </FooterLink>
            <FooterLink href={SOCIAL_LINKS.credly} target="_blank">
              Credly
            </FooterLink>
          </FooterColumn>
        </div>

        <div className="footer-bottom">
          <p>© {year} Shenabeth Jenkins. Hosted on AWS Amplify.</p>
          <Link className="footer-admin" href="/admin/login">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

/** Column heading + stacked link list used in each footer section. */
function FooterColumn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="footer-column">
      <p className="footer-column__label">{label}</p>
      <div className="footer-column__links">{children}</div>
    </div>
  );
}

/** Single footer link; `target` implies the usual noopener pairing. */
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
    <Link href={href} {...extraProps}>
      {children}
    </Link>
  );
}
