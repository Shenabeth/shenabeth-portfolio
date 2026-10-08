/*
 * File: HeroSection.tsx
 * Purpose: Landing page hero section
 */

'use client';

import { motion } from 'framer-motion';
import { ScrambleText } from '@/components/shared/ScrambleText';
import { SocialLinks } from '@/components/shared/SocialLinks';
import { CpuChip } from '@/components/home/CpuChip';
import { CircuitBoardBg } from '@/components/home/CircuitBoardBg';
import { RESUME } from '@/config/constants';

export function HeroSection() {
  const handleContactScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="hero-section-wrapper">
      {/* Full-bleed circuit background: lives in the wrapper (100% width,
          uncapped) rather than inside .hero-section (capped at
          1320px/92vw), so it reaches the true viewport edges. Paints
          behind .hero-section by DOM order alone — no z-index needed. */}
      <CircuitBoardBg />
      <section className="hero-section">
        {/* Background glow */}
        <div className="hero-glow" aria-hidden="true" />

        {/* Left side: text content stacked on top of a liquid-glass
            panel. The glass PANEL and the motion-animated TEXT are kept
            as sibling elements inside .hero-copy — never nested — so
            that Framer Motion's transform on the text block does NOT
            create a stacking context around the glass. If the glass
            lived inside a transformed parent, backdrop-filter would
            paint against the parent's own backdrop (empty) instead of
            the circuit pattern behind the hero. */}
        <div className="hero-copy">
          <span className="hero-glass" aria-hidden="true" />
          <motion.div
            className="hero-copy-inner"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
          <motion.h1 className="hero-title" variants={itemVariants}>
            <ScrambleText text="Shenabeth" /> <span className="hero-title-stroke"><ScrambleText text="Jenkins" /></span>
          </motion.h1>

          <motion.p className="hero-role" variants={itemVariants}>
            Software Developer &amp; Cloud Architect
          </motion.p>

          <motion.p className="hero-description" variants={itemVariants}>
            I design and build <em>cloud infrastructure</em> and <em>full-stack applications</em>, turning complex technical requirements into scalable, production-ready systems.
          </motion.p>

          {/* Action row: Resume, Let's Talk, and the social icons live
              on the same line so the icons sit against the primary
              actions rather than drifting into the circuit background. */}
          <motion.div
            className="hero-actions"
            variants={itemVariants}
          >
            <a
              href={RESUME.url}
              download={RESUME.downloadName}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-action sweep-button"
            >
              <span>Resume</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4 16h12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
            <button
              onClick={handleContactScroll}
              className="secondary-action sweep-button"
            >
              <span>Let&apos;s Talk</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <SocialLinks className="hero-actions-social" />
          </motion.div>
          </motion.div>
        </div>

        {/* Right side: Animated art */}
        <div className="hero-art hidden lg:block">
          {/* CPU chip with animated robot face */}
          <CpuChip />
        </div>
      </section>
    </section>
  );
}
