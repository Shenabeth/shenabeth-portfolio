/*
 * File: HeroSection.tsx
 * Purpose: Landing page hero section with animated ASCII grid background
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ASCIIGrid {
  chars: string[][];
  displayChars: string[][];
  scrambling: boolean;
  currentWord?: string;
  wordRow: number;
  wordCol: number;
}

const TECH_WORDS = [
  'CLOUD',
  'ARCHITECT',
  'DEVOPS',
  'SERVERLESS',
  'LAMBDA',
  'DYNAMODB',
  'INFRASTRUCTURE',
  'SCALABLE',
  'BACKEND',
  'AWS',
  'REACT',
  'TYPESCRIPT',
  'DEPLOY',
  'BUILD',
];

const ASCII_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function ASCIIGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<ASCIIGrid | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const charWidth = 16;
    const charHeight = 24;
    const cols = Math.ceil(canvas.width / charWidth);
    const rows = Math.ceil(canvas.height / charHeight);

    const chars: string[][] = [];
    const displayChars: string[][] = [];

    for (let r = 0; r < rows; r++) {
      chars[r] = [];
      displayChars[r] = [];
      for (let c = 0; c < cols; c++) {
        const randomChar = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
        chars[r][c] = randomChar;
        displayChars[r][c] = randomChar;
      }
    }

    gridRef.current = {
      chars,
      displayChars,
      scrambling: false,
      wordRow: Math.floor(rows / 2),
      wordCol: Math.floor((cols - 15) / 2),
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.textBaseline = 'top';

    let frameCount = 0;
    let wordDisplayTime = 0;
    const WORD_DISPLAY_DURATION = 180; // 3 seconds at 60fps
    const SCRAMBLE_DURATION = 60; // 1 second

    const selectNewWord = () => {
      const grid = gridRef.current;
      if (!grid) return;

      const newWord = TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)];
      grid.currentWord = newWord;
      grid.wordRow = Math.floor(Math.random() * Math.max(1, rows - 4));
      grid.wordCol = Math.max(0, Math.floor(Math.random() * Math.max(1, cols - newWord.length - 5)));
      wordDisplayTime = 0;
      grid.scrambling = false;

      // Reset the grid area where word will appear
      if (grid.displayChars[grid.wordRow]) {
        for (let i = 0; i < newWord.length; i++) {
          const col = grid.wordCol + i;
          if (col < grid.displayChars[grid.wordRow].length) {
            grid.displayChars[grid.wordRow][col] = grid.chars[grid.wordRow][col];
          }
        }
      }
    };

    selectNewWord();

    const animate = () => {
      const grid = gridRef.current;
      if (!grid) return;

      // Clear canvas with slight fade
      ctx.fillStyle = 'rgba(10, 14, 39, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const reactivityRadius = 180;

      // Handle word display, scrambling, and transition
      if (wordDisplayTime < WORD_DISPLAY_DURATION) {
        // Show the word clearly
        if (grid.currentWord && grid.displayChars[grid.wordRow]) {
          for (let i = 0; i < grid.currentWord.length; i++) {
            const col = grid.wordCol + i;
            if (col < grid.displayChars[grid.wordRow].length) {
              grid.displayChars[grid.wordRow][col] = grid.currentWord[i];
            }
          }
        }
      } else if (wordDisplayTime < WORD_DISPLAY_DURATION + SCRAMBLE_DURATION) {
        // Scramble animation
        const scrambleProgress = (wordDisplayTime - WORD_DISPLAY_DURATION) / SCRAMBLE_DURATION;

        if (grid.currentWord && grid.displayChars[grid.wordRow]) {
          for (let i = 0; i < grid.currentWord.length; i++) {
            const col = grid.wordCol + i;
            if (col < grid.displayChars[grid.wordRow].length) {
              if (Math.random() < scrambleProgress) {
                grid.displayChars[grid.wordRow][col] = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
              }
            }
          }
        }
      } else {
        // Select new word
        selectNewWord();
      }

      wordDisplayTime++;

      // Render grid with mouse reactivity
      for (let r = 0; r < displayChars.length; r++) {
        for (let c = 0; c < displayChars[r].length; c++) {
          const x = c * charWidth;
          const y = r * charHeight;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let opacity = 0.25;
          let color = '#33af87';

          // Mouse reactivity - brighten nearby characters
          if (distance < reactivityRadius) {
            opacity = 0.3 + (1 - distance / reactivityRadius) * 0.6;
            color = '#54d5aa';
          }

          // Highlight word being displayed
          if (
            r === grid.wordRow &&
            c >= grid.wordCol &&
            c < grid.wordCol + (grid.currentWord?.length || 0) &&
            wordDisplayTime < WORD_DISPLAY_DURATION
          ) {
            opacity = 0.95;
            color = '#54d5aa';
          }

          ctx.fillStyle = color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
          ctx.fillText(displayChars[r][c], x, y);
        }
      }

      frameCount++;
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
        {/* ASCII Grid Background */}
        <div className="hero-background-container">
          <ASCIIGridBackground />
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
