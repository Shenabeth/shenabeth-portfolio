/*
 * File: NavBar.tsx
 * Purpose: Navigation bar with responsive mobile menu
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavBarProps {
  currentPage?: string;
}

/**
 * Sticky navigation bar with desktop and mobile responsive layouts
 *
 * @param currentPage - Optional current page for active link highlighting
 */
export function NavBar({ currentPage }: NavBarProps): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (page: string): boolean => currentPage === page;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700">
      <div className="px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo/Name */}
          <Link href="/" className="text-xl font-bold text-white hover:text-slate-300 transition-colors">
            Shenabeth
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`transition-colors ${isActive('home') ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${isActive('about') ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'}`}
            >
              About
            </Link>
            <Link
              href="/projects"
              className={`transition-colors ${isActive('projects') ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'}`}
            >
              Projects
            </Link>
          </div>

          {/* Resume Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              download="resume.pdf"
              className="hidden md:inline-block px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors text-sm font-medium"
            >
              Resume
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-700 space-y-3">
            <Link
              href="/"
              className="block py-2 text-slate-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-2 text-slate-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/projects"
              className="block py-2 text-slate-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <a
              href="/resume.pdf"
              download="resume.pdf"
              className="block py-2 text-slate-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
