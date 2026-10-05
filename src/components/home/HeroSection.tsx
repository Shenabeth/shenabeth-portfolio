/*
 * File: HeroSection.tsx
 * Purpose: Landing page hero section
 */

'use client';

import { motion } from 'framer-motion';
import { ScrambleText } from '@/components/shared/ScrambleText';

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
      <section className="hero-section">
        {/* Background glow */}
        <div className="hero-glow" aria-hidden="true" />

        {/* Left side: Text content */}
        <motion.div
          className="hero-copy"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            <ScrambleText text="Shenabeth" /> <span className="hero-title-stroke"><ScrambleText text="Jenkins" /></span>
          </motion.h1>

          <motion.p className="hero-role" variants={itemVariants}>
            Software Developer & Cloud Architect
          </motion.p>

          <motion.p className="hero-description" variants={itemVariants}>
            I build <em>scalable cloud systems</em> and craft the interfaces that connect them to real users, designing infrastructure and user experiences with care and precision.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="hero-actions"
            variants={itemVariants}
          >
            <a
              href="/resume.pdf"
              download="resume.pdf"
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
          </motion.div>
        </motion.div>

        {/* Right side: Animated art */}
        <div className="hero-art hidden lg:block">
          {/* Orbits */}
          <div className="orbit" />
          <div className="orbit orbit-reverse">
            <span className="orbit-dot orbit-dot-alt" />
          </div>

          {/* Art card */}
          <div className="art-card">

            <div className="flex justify-between mb-auto text-xs uppercase tracking-widest" style={{ color: 'var(--muted)', fontFamily: '"DM Mono", monospace' }}>
              <span>01 — Principle</span>
              <i className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)', marginTop: '0.2rem' }} />
            </div>

            <div
              className="my-auto flex flex-col font-medium leading-tight"
              style={{
                fontSize: 'clamp(3rem, 5vw, 5.5rem)',
                letterSpacing: '-0.085em',
              }}
            >
              <span style={{ color: 'var(--muted)' }}>under</span>
              <strong style={{ color: 'var(--accent-bright)', fontWeight: 500, paddingLeft: '12%' }}>stand</strong>
            </div>

            <div className="flex flex-col gap-2 w-7/12 mb-7">
              <i className="h-px" style={{ background: 'var(--line-strong)' }} />
              <i className="h-px" style={{ background: 'var(--line-strong)', width: '78%' }} />
              <i className="h-px" style={{ background: 'var(--line-strong)', width: '91%' }} />
              <i className="h-px" style={{ background: 'var(--line-strong)', width: '52%' }} />
            </div>

            <p className="text-xs" style={{ color: 'var(--muted)', fontFamily: '"DM Mono", monospace' }}>
              Complexity, Made Clear.
            </p>
          </div>

          {/* Floating tags */}
          <div className="floating-tag floating-tag-code">&lt;/&gt;</div>
          <div className="floating-tag floating-tag-logic">Logic</div>
        </div>
      </section>
    </section>
  );
}
