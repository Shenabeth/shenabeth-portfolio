/*
 * File: NavBar.tsx
 * Purpose: Navigation bar with responsive mobile menu, styled from old site
 */

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface NavBarProps {
  currentPage?: string;
}

export function NavBar({ currentPage }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    return pathname === href;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
  ];

  return (
    <nav className="nav-fixed">
      <div className="flex items-center justify-between h-[4.25rem] px-6 py-2">
        {/* Logo/Wordmark - Left */}
        <Link href="/" className="wordmark">
          Shenabeth
        </Link>

        {/* Desktop Navigation - Center */}
        <div className="hidden lg:flex items-center justify-center gap-9">
          {navLinks.map(({ href, label }) => (
            <div key={href} className="relative">
              <Link
                href={href}
                className="monospace-label text-xs font-medium relative"
                style={{
                  color: isActive(href) ? 'var(--text)' : 'var(--muted)',
                }}
              >
                {label}
                {/* Active underline */}
                {isActive(href) && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-[-4px] left-0 right-0 h-1 rounded-full"
                    style={{
                      background: 'var(--accent-bright)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </Link>

              {/* Hover underline - shows on hover, even for non-active links */}
              {!isActive(href) && (
                <div className="absolute bottom-[-4px] left-0 right-0 h-1 rounded-full bg-transparent hover:bg-[var(--accent)] opacity-0 hover:opacity-60 transition-all duration-200" />
              )}
            </div>
          ))}
        </div>

        {/* Resume Button & Mobile Menu - Right */}
        <div className="flex items-center gap-3 ml-auto">
          <Button
            asChild
            className="hidden lg:inline-flex text-xs font-semibold px-5 py-2 rounded-md"
            style={{
              background: 'var(--text)',
              color: 'var(--ink)',
            }}
          >
            <a href="/resume.pdf" download="resume.pdf">
              Resume
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-lg leading-none"
            style={{ color: 'var(--text)' }}
            aria-label="Toggle menu"
            animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="lg:hidden border-t border-[var(--line)] bg-black/20 overflow-hidden"
          >
            <div className="space-y-3 p-4">
              {navLinks.map(({ href, label }) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <Link
                    href={href}
                    className="block py-2 monospace-label text-xs font-medium relative"
                    style={{
                      color: isActive(href) ? 'var(--text)' : 'var(--muted)',
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                    {isActive(href) && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 rounded-full"
                        style={{
                          background: 'var(--accent-bright)',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Button
                  asChild
                  className="w-full text-xs font-semibold px-5 py-2 rounded-md"
                  style={{
                    background: 'var(--text)',
                    color: 'var(--ink)',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <a href="/resume.pdf" download="resume.pdf">
                    Resume
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
