/*
 * File: HeroSection.tsx
 * Purpose: Landing page hero section with animated art, name, and action buttons
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SocialLinks } from '@/components/shared/SocialLinks';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let startTime: number;
    const duration = 1400;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const newText = text
        .split('')
        .map((char, index) => {
          const charDelay = (index / text.length) * duration;
          if (elapsed < charDelay) {
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          }
          return char;
        })
        .join('');

      setDisplayText(newText);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [text]);

  return displayText;
}

export function HeroSection() {
  const handleContactScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* Background glow */}
      <div className="hero-glow" aria-hidden="true" />

      {/* Left side: Text content */}
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="hero-title">
          <ScrambleText text="Shenabeth" /> <span className="hero-title-stroke"><ScrambleText text="Jenkins" /></span>
        </h1>

        <p className="hero-role">Software Developer & Cloud Architect</p>

        <p className="hero-description">
          I build <em>scalable cloud systems</em> and craft the interfaces that connect them to real users, designing infrastructure and user experiences with care and precision.
        </p>

        {/* Action Buttons */}
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <a
            href="/resume.pdf"
            download="resume.pdf"
            className="primary-action"
          >
            Resume
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4 16h12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
          <button
            onClick={handleContactScroll}
            className="secondary-action"
          >
            Let&apos;s Talk
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

      {/* Scroll cue */}
      <div className="scroll-cue hidden lg:flex">
        <span>Scroll To Explore</span>
        <div className="scroll-cue-line" />
      </div>
    </section>
  );
}
