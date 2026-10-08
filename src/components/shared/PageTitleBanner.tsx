/*
 * File: PageTitleBanner.tsx
 * Purpose: Full-bleed title banner used at the top of the About and
 *          Projects pages. Mirrors the hero treatment — the same circuit
 *          pattern tiles behind the title, masked to fade to transparent
 *          at the bottom edge so the pattern dissolves into whatever
 *          sits below rather than cutting off hard against a background
 *          color.
 */

'use client';

import { circuitBoard } from 'hero-patterns';
import { SectionHeading } from '@/components/shared/SectionHeading';

const TRACE_COLOR = '#54d5aa';
const TRACE_OPACITY = 0.3;

interface PageTitleBannerProps {
  kicker: string;
  title: string;
  comment?: string;
}

/**
 * Full-bleed banner that wraps the main (h1) IDE section heading for a
 * page. The banner's circuit pattern is painted behind the title and
 * fades to transparent on the bottom edge via a CSS mask.
 */
export function PageTitleBanner({ kicker, title, comment }: PageTitleBannerProps) {
  return (
    <div className="page-title-banner">
      <div className="page-title-banner-bg" aria-hidden="true">
        <div
          className="page-title-banner-pattern"
          style={{ backgroundImage: circuitBoard(TRACE_COLOR, TRACE_OPACITY) }}
        />
      </div>
      <SectionHeading kicker={kicker} title={title} comment={comment} variant="main" />
    </div>
  );
}
