/*
 * File: NavBar.tsx
 * Purpose: Fixed top navigation. The "Projects" item is a dropdown that lists
 *          each project plus a "View all" link. On desktop it opens on hover
 *          and keyboard focus and closes when the pointer/focus leaves; on
 *          mobile it is an inline expandable submenu inside the slide-down
 *          menu. Project links are derived from FEATURED_PROJECTS so the menu
 *          stays in sync as projects are added.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import { RESUME, FEATURED_PROJECTS } from '@/config/constants';

interface ProjectLink {
  href: string;
  label: string;
}

/** Project dropdown entries, derived from config, plus the catch-all. */
const PROJECT_LINKS: ProjectLink[] = [
  ...FEATURED_PROJECTS.map((project) => ({
    href: `/projects/${project.id}`,
    label: project.title,
  })),
  { href: '/projects', label: 'View all projects' },
];

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const pathname = usePathname();

  // Close-on-hover-out is handled with a short timeout so moving the pointer
  // from the "Projects" trigger down into the menu doesn't flicker it shut.
  const closeTimer = useRef<number | null>(null);

  const openProjects = (): void => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    setProjectsOpen(true);
  };

  const closeProjectsSoon = (): void => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setProjectsOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, []);

  // Collapse every menu on route change.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileMenuOpen(false);
    setMobileProjectsOpen(false);
    setProjectsOpen(false);
  }

  const isActive = (href: string): boolean => pathname === href;
  const isProjectsActive = (): boolean => pathname.startsWith('/projects');

  const simpleLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="nav-fixed">
      <div className="flex items-center justify-between h-[4.25rem] px-6 py-2">
        {/* Logo/Wordmark - Left */}
        <Link href="/" className="flex items-center gap-2 wordmark">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            style={{ color: 'var(--accent-bright)' }}
          >
            <path
              d="M8 6 2 12l6 6M16 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Shenabeth
        </Link>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center justify-center gap-9 flex-1 self-stretch">
          <NavItem href="/" label="Home" active={isActive('/')} />
          <NavItem href="/about" label="About" active={isActive('/about')} />

          {/* Projects dropdown trigger: stretched to the bar's height so the menu opens below it */}
          <div
            className="relative self-stretch flex items-center"
            onMouseEnter={openProjects}
            onMouseLeave={closeProjectsSoon}
            onFocusCapture={openProjects}
            onBlurCapture={(e) => {
              // Close only when focus leaves the whole dropdown subtree.
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                closeProjectsSoon();
              }
            }}
          >
            <Link
              href="/projects"
              className="monospace-label text-xs font-medium inline-flex items-center gap-1 transition-colors duration-200"
              style={{ color: isProjectsActive() ? 'var(--text)' : 'var(--muted)' }}
              aria-haspopup="true"
              aria-expanded={projectsOpen}
            >
              {/* Underline is scoped to the label so it doesn't extend under the arrow */}
              <span className="relative">
                Projects
                {isProjectsActive() && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-[-4px] left-0 right-0 h-1 rounded-full"
                    style={{ background: 'var(--accent-bright)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </span>
              <ChevronDown
                size={13}
                className="transition-transform duration-200"
                style={{ transform: projectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-hidden="true"
              />
            </Link>

            <AnimatePresence>
              {projectsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute left-1/2 -translate-x-1/2 pt-3"
                  style={{ top: 'calc(100% + 0.5rem)' }}
                  role="menu"
                >
                  <div
                    className="flex flex-col rounded-xl border p-2 min-w-[14rem]"
                    style={{
                      borderColor: 'var(--line-strong)',
                      background: 'rgba(13,18,16,0.96)',
                      backdropFilter: 'blur(18px)',
                      boxShadow: '0 1rem 3rem rgba(0,0,0,0.4)',
                    }}
                  >
                    {PROJECT_LINKS.map((link, i) => {
                      const isViewAll = i === PROJECT_LINKS.length - 1;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          role="menuitem"
                          className="rounded-lg px-3 py-2.5 text-sm transition-colors duration-150"
                          style={{
                            color: isViewAll ? 'var(--accent-bright)' : 'var(--text)',
                            borderTop: isViewAll ? '1px solid var(--line)' : undefined,
                            marginTop: isViewAll ? '0.25rem' : undefined,
                            paddingTop: isViewAll ? '0.75rem' : undefined,
                            fontFamily: isViewAll ? '"DM Mono", monospace' : undefined,
                            fontSize: isViewAll ? '0.78rem' : undefined,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(84,213,170,0.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Resume Button & Mobile Menu - Right */}
        <div className="flex items-center gap-3 ml-auto">
          <a
            href={RESUME.url}
            download={RESUME.downloadName}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-action sweep-button hidden md:inline-flex text-xs"
            style={{ padding: '0.6rem 1.1rem' }}
          >
            <span>Resume</span>
            <Download size={14} />
          </a>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-lg leading-none"
            style={{ color: 'var(--text)' }}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
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
            className="md:hidden border-t border-[var(--line)] bg-black/20 overflow-hidden"
          >
            <div className="flex flex-col items-stretch gap-1 py-5 px-4">
              {simpleLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-center rounded-lg py-3 monospace-label text-xs font-medium transition-colors duration-200 hover:bg-[rgba(84,213,170,0.08)]"
                  style={{ color: isActive(href) ? 'var(--text)' : 'var(--muted)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {/* Mobile Projects submenu: tap to expand */}
              <button
                type="button"
                onClick={() => setMobileProjectsOpen((prev) => !prev)}
                aria-expanded={mobileProjectsOpen}
                className="flex items-center justify-center gap-1.5 rounded-lg py-3 monospace-label text-xs font-medium transition-colors duration-200 hover:bg-[rgba(84,213,170,0.08)]"
                style={{ color: isProjectsActive() ? 'var(--text)' : 'var(--muted)' }}
              >
                Projects
                <ChevronDown
                  size={13}
                  className="transition-transform duration-200"
                  style={{ transform: mobileProjectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {mobileProjectsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="flex flex-col mx-auto my-1 w-[min(18rem,100%)] rounded-xl border p-1.5"
                      style={{ borderColor: 'var(--line)', background: 'var(--ink-soft)' }}
                    >
                      {PROJECT_LINKS.map((link, i) => {
                        const isViewAll = i === PROJECT_LINKS.length - 1;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block text-center rounded-lg py-2.5 text-sm transition-colors duration-150 hover:bg-[rgba(84,213,170,0.08)]"
                            style={{
                              color: isViewAll ? 'var(--accent-bright)' : 'var(--text)',
                              fontFamily: isViewAll ? '"DM Mono", monospace' : undefined,
                              fontSize: isViewAll ? '0.78rem' : undefined,
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href={RESUME.url}
                download={RESUME.downloadName}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-action sweep-button text-xs mt-3 self-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Resume</span>
                <Download size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

interface NavItemProps {
  href: string;
  label: string;
  active: boolean;
}

/** A single top-level desktop nav link with the shared active/hover underline. */
function NavItem({ href, label, active }: NavItemProps) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className="monospace-label text-xs font-medium relative transition-colors duration-200"
        style={{ color: active ? 'var(--text)' : 'var(--muted)' }}
      >
        {label}
        {active && (
          <motion.div
            layoutId="navbar-underline"
            className="absolute bottom-[-4px] left-0 right-0 h-1 rounded-full"
            style={{ background: 'var(--accent-bright)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
      {!active && (
        <div className="absolute bottom-[-4px] left-0 right-0 h-1 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
      )}
    </div>
  );
}
