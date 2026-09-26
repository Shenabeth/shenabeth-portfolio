/*
 * File: HeroSection.tsx
 * Purpose: Landing page hero section with animated art, name, and action buttons
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SocialLinks } from '@/components/shared/SocialLinks';

interface MagneticParticle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
}

function MagneticFilingsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<MagneticParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particleCount = 120;
    const particles: MagneticParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    particlesRef.current = particles;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'transparent';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        const mouse = mouseRef.current;
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * 0.3;
          particle.vy += Math.sin(angle) * 0.3;
        } else {
          const driftX = particle.targetX - particle.x;
          const driftY = particle.targetY - particle.y;
          particle.vx += driftX * 0.001;
          particle.vy += driftY * 0.001;
        }

        particle.vx *= 0.92;
        particle.vy *= 0.92;

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        const hue = (particle.id * (360 / particleCount) + Date.now() * 0.1) % 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.6)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

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
        {/* Magnetic Filings Background */}
        <div className="hero-background-container">
          <div
            className="hero-gradient-bg"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 0, 100, 0.15) 0%, rgba(0, 100, 255, 0.15) 25%, rgba(100, 0, 255, 0.15) 50%, rgba(0, 255, 100, 0.15) 75%, rgba(255, 100, 0, 0.15) 100%)',
              backgroundSize: '400% 400%',
              animation: 'gradient-shift 15s ease infinite',
            }}
            aria-hidden="true"
          />
          <MagneticFilingsBackground />
        </div>

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

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <SocialLinks className="social-links-hero" />
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
