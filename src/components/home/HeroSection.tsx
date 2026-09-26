/*
 * File: HeroSection.tsx
 * Purpose: Landing page hero section with animated art, name, and action buttons
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CircuitNode {
  x: number;
  y: number;
  active: boolean;
  brightness: number;
}

function CircuitBoardBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<CircuitNode[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const gridSize = 60;
    const nodes: CircuitNode[] = [];

    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        nodes.push({
          x,
          y,
          active: false,
          brightness: 0,
        });
      }
    }

    nodesRef.current = nodes;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = '#0a0e27';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const activationRadius = 200;

      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < activationRadius) {
          node.active = true;
          node.brightness = Math.max(node.brightness, 1 - distance / activationRadius);
        } else {
          node.brightness = Math.max(0, node.brightness - 0.05);
          if (node.brightness < 0.1) {
            node.active = false;
          }
        }
      });

      ctx.strokeStyle = 'rgba(100, 150, 200, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length - 1; i++) {
        const node1 = nodes[i];
        const node2 = nodes[i + 1];

        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;

        if (Math.abs(dx) < gridSize * 1.5 && Math.abs(dy) < gridSize * 1.5) {
          const avgBrightness = (node1.brightness + node2.brightness) / 2;
          ctx.strokeStyle = `rgba(100, 200, 255, ${avgBrightness * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(node1.x, node1.y);
          ctx.lineTo(node2.x, node2.y);
          ctx.stroke();
        }
      }

      nodes.forEach((node) => {
        ctx.fillStyle = `rgba(100, 200, 255, ${node.brightness * 0.8})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2 + node.brightness * 2, 0, Math.PI * 2);
        ctx.fill();

        if (node.brightness > 0.3) {
          ctx.fillStyle = `rgba(150, 220, 255, ${node.brightness * 0.3})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4 + node.brightness * 6, 0, Math.PI * 2);
          ctx.fill();
        }
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
        {/* Circuit Board Background */}
        <div className="hero-background-container">
          <CircuitBoardBackground />
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
