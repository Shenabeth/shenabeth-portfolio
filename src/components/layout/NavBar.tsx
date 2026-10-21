/*
 * File: NavBar.tsx
 * Purpose: Fixed site header: the `<>` brand mark + wordmark, a monospace
 *          anchor-link row whose active item is tracked with an
 *          IntersectionObserver, and a hamburger slide-down menu on small
 *          screens.
 *
 *          The links are in-page anchors (#home, #projects, ...) because the
 *          landing page is a single scrolling page. On other routes they fall
 *          back to `/#<id>` so they still land on the right section.
 *
 *          The active-item underline is a single shared element that SLIDES
 *          between links (Framer `layoutId`) rather than one `::after` per
 *          link appearing and disappearing in place. Clicking a link pins
 *          it to that destination for the duration of the smooth scroll,
 *          so it travels straight there instead of hopping through every
 *          section the page passes on the way.
 *
 *          "Projects" carries a submenu (the three case studies + the
 *          all-projects page), marked with a chevron and opened on
 *          hover/focus on desktop. In the hamburger menu the same submenu is
 *          collapsed behind a disclosure button so the project pages do not
 *          clutter the menu.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { FEATURED_PROJECTS } from '@/config/constants';

/** The five in-page destinations. */
const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

/**
 * The Projects submenu: each featured case study, then the all-projects
 * page. Built from config so adding a project to FEATURED_PROJECTS adds it
 * here too.
 */
const PROJECT_LINKS = [
  ...FEATURED_PROJECTS.map((project) => ({
    label: project.title,
    href: project.caseStudyLink ?? `/projects/${project.id}`,
  })),
  { label: 'View All Projects', href: '/projects' },
];

/** The site's `<>` mark, carried over from the previous navigation bar. */
function BrandMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 6 2 12l6 6M16 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The sliding active-item underline.
 *
 * Every nav link renders this same component when it is the active one.
 * Because they all share one `layoutId`, Framer treats the old and new
 * underline as the SAME element and animates it from the previous link's
 * box to the new one, instead of fading one out and another in.
 */
function ActiveUnderline() {
  return (
    <motion.span
      className="nav-underline"
      layoutId="nav-underline"
      transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.7 }}
    />
  );
}

/* Matches the `max-width: 980px` breakpoint in globals.css where the
 * desktop link row gives way to the hamburger. */
const HAMBURGER_BREAKPOINT = '(max-width: 980px)';

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  /*
   * While a click-initiated smooth scroll is in flight, this holds the id
   * the viewer asked for. The observer fires for every section the page
   * flies past, so without it the underline would walk link by link to the
   * destination instead of going straight there.
   */
  const pendingSection = useRef<string | null>(null);
  const scrollSettleTimer = useRef<number | null>(null);
  const pathname = usePathname();
  const onHome = pathname === '/';
  const onProjectRoute = pathname.startsWith('/projects');

  // Track which section is in view to drive the active underline. Only the
  // homepage has these sections, so the observer is skipped elsewhere.
  useEffect(() => {
    if (!onHome) return;
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(
      Boolean,
    ) as Element[];
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (!current) return;
        // A click already chose the destination; ignore the sections the
        // smooth scroll passes until it actually arrives there.
        if (pendingSection.current !== null) {
          if (current.target.id !== pendingSection.current) return;
          pendingSection.current = null;
        }
        setActiveSection(current.target.id);
      },
      { rootMargin: '-25% 0px -65%' },
    );
    sections.forEach((section) => observerRef.current?.observe(section));
    return () => observerRef.current?.disconnect();
  }, [onHome]);

  // Collapse the mobile menu on route change.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setProjectsOpen(false);
    setMobileProjectsOpen(false);
  }

  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
      if (scrollSettleTimer.current !== null)
        window.clearTimeout(scrollSettleTimer.current);
    },
    [],
  );

  /** Close the hamburger menu and reset its Projects disclosure. */
  const closeMenu = () => {
    setMenuOpen(false);
    setMobileProjectsOpen(false);
  };

  // Collapse the hamburger menu the moment the viewer does anything other
  // than use it: click outside it, start scrolling, or widen the window past
  // the breakpoint where the full link row returns.
  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (headerRef.current?.contains(target)) return;
      if (mobileNavRef.current?.contains(target)) return;
      closeMenu();
    };
    const handleScroll = () => closeMenu();
    const mediaQuery = window.matchMedia(HAMBURGER_BREAKPOINT);
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (!event.matches) closeMenu();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    mediaQuery.addEventListener('change', handleBreakpointChange);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleBreakpointChange);
    };
  }, [menuOpen]);

  /** On the homepage anchors work as-is; elsewhere they route home first. */
  const resolve = (href: string) => (onHome ? href : `/${href}`);

  /**
   * Is this nav item the one the viewer is currently on? On the homepage
   * that is the section in view; on a /projects route it is always
   * "Projects", so the header still shows where you are once you leave the
   * landing page.
   */
  const isActive = (href: string) => {
    if (onProjectRoute) return href === '#projects';
    if (!onHome) return false;
    return activeSection === href.slice(1);
  };

  /**
   * Move the underline to the clicked link immediately and hold it there
   * while the page scrolls. The lock is released when the observer reports
   * the destination in view, or after a timeout in case it never does (an
   * anchor too short to scroll to, say).
   */
  const handleAnchorClick = (href: string) => {
    if (!onHome || !href.startsWith('#')) return;
    const id = href.slice(1);
    pendingSection.current = id;
    setActiveSection(id);
    if (scrollSettleTimer.current !== null)
      window.clearTimeout(scrollSettleTimer.current);
    scrollSettleTimer.current = window.setTimeout(() => {
      pendingSection.current = null;
    }, 1200);
  };

  /*
   * The submenu stays open while the pointer travels from the trigger to the
   * panel: closing is deferred briefly so the gap between them does not
   * dismiss it mid-move.
   */
  const openProjects = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    setProjectsOpen(true);
  };

  const closeProjects = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setProjectsOpen(false), 140);
  };

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <a className="brand" href={resolve('#home')} aria-label="Shenabeth Jenkins, home">
          <span className="brand__mark">
            <BrandMark />
          </span>
          <span className="brand__name">Shenabeth Jenkins</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) =>
            item.href === '#projects' ? (
              <div
                className="nav-projects"
                key={item.href}
                onMouseEnter={openProjects}
                onMouseLeave={closeProjects}
                onFocus={openProjects}
                onBlur={closeProjects}
              >
                {/*
                 * The trigger wraps label + chevron, and the underline is a
                 * child of THIS element — so the chevron sits directly under
                 * the word "Projects" and the underline spans the pair,
                 * rather than either drifting toward a neighbouring link.
                 */}
                <a
                  className={`nav-link nav-link--has-menu${
                    isActive(item.href) ? ' is-active' : ''
                  }`}
                  href={resolve(item.href)}
                  aria-expanded={projectsOpen}
                  aria-haspopup="true"
                  onClick={() => handleAnchorClick(item.href)}
                >
                  <span className="nav-link__label">{item.label}</span>
                  <ChevronDown
                    className={`nav-link__chevron${projectsOpen ? ' is-open' : ''}`}
                    aria-hidden="true"
                  />
                  {isActive(item.href) && <ActiveUnderline />}
                </a>

                <AnimatePresence>
                  {projectsOpen && (
                    <motion.div
                      className="nav-projects__menu"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                    >
                      {PROJECT_LINKS.map((link, index) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={
                            index === PROJECT_LINKS.length - 1
                              ? 'nav-projects__all'
                              : undefined
                          }
                          onClick={() => setProjectsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={item.href}
                className={`nav-link${isActive(item.href) ? ' is-active' : ''}`}
                href={resolve(item.href)}
                onClick={() => handleAnchorClick(item.href)}
              >
                <span className="nav-link__label">{item.label}</span>
                {isActive(item.href) && <ActiveUnderline />}
              </a>
            ),
          )}
        </nav>

        <div className="header-actions">
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            ref={mobileNavRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {NAV_ITEMS.map((item) => (
              <div className="mobile-nav__item" key={item.href}>
                {item.href === '#projects' ? (
                  <>
                    {/*
                     * Projects is a row of two controls: the link itself,
                     * and a disclosure button for the project pages. The
                     * sublist stays collapsed by default so the menu is five
                     * rows, not nine.
                     */}
                    <div className="mobile-nav__row">
                      <a
                        href={resolve(item.href)}
                        className={isActive(item.href) ? 'is-active' : ''}
                        onClick={() => {
                          handleAnchorClick(item.href);
                          closeMenu();
                        }}
                      >
                        {item.label}
                      </a>
                      <button
                        type="button"
                        className="mobile-nav__toggle"
                        aria-expanded={mobileProjectsOpen}
                        aria-label={
                          mobileProjectsOpen
                            ? 'Hide project pages'
                            : 'Show project pages'
                        }
                        onClick={() => setMobileProjectsOpen((open) => !open)}
                      >
                        <ChevronDown
                          className={mobileProjectsOpen ? 'is-open' : undefined}
                        />
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {mobileProjectsOpen && (
                        <motion.div
                          className="mobile-nav__sub"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {PROJECT_LINKS.map((link) => (
                            <Link key={link.href} href={link.href} onClick={closeMenu}>
                              {link.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a
                    href={resolve(item.href)}
                    className={isActive(item.href) ? 'is-active' : ''}
                    onClick={() => {
                      handleAnchorClick(item.href);
                      closeMenu();
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
