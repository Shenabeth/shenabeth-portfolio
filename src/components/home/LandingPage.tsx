/*
 * File: LandingPage.tsx
 * Purpose: The landing page — hero, projects, about, certifications, contact —
 *          as a single scrolling page. The markup and class names follow the
 *          design ported from docs/Portfolio/src/App.tsx, with the hero order
 *          (name, title, typed intro, actions, socials) and the data-driven
 *          projects section layered on top of it.
 *
 *          The <header>/<footer> are NOT here — they are rendered by
 *          NavBar/Footer via app/layout.tsx.
 *
 *          Backing CSS lives in app/globals.css under the "Reference design
 *          system" banner, ported from docs/Portfolio/src/styles.css.
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import { SocialLinks } from '@/components/shared/SocialLinks';
import { SkillsCard } from '@/components/shared/SkillsCard';
import { ScrambleText } from '@/components/shared/ScrambleText';
import { ClippyHeroFigure } from './ClippyAssistant';
import {
  CONTACT_EMAIL,
  FEATURED_PROJECTS,
  RESUME,
  SOCIAL_LINKS,
} from '@/config/constants';

/** GitHub glyph, inlined from the reference (lucide has no brand icons). */
function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.92c-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.32 9.32 0 0 1 12 6.96c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
    </svg>
  );
}

/** LinkedIn glyph, inlined from the reference. */
function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 8.3H3.2V19h3.3V8.3ZM4.85 3A1.93 1.93 0 1 0 4.8 6.86 1.93 1.93 0 0 0 4.85 3ZM19.8 12.87c0-3.22-1.72-4.72-4.02-4.72a3.46 3.46 0 0 0-3.13 1.72V8.3H9.33V19h3.32v-5.3c0-1.4.26-2.76 2-2.76 1.7 0 1.73 1.6 1.73 2.85V19h3.32l.1-6.13Z" />
    </svg>
  );
}

/** Credly glyph, inlined to match the GitHub/LinkedIn marks. */
function CredlyMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.5 7.3a7.5 7.5 0 1 0 0 9.4 1 1 0 1 0-1.56-1.25 5.5 5.5 0 1 1 0-6.9 1 1 0 1 0 1.56-1.25Z" />
    </svg>
  );
}

/**
 * Credential rows, from the reference's `credentials` array. The badge art
 * is the same image set the reference shipped as resource-1/2/3.png, which
 * already lives in this repo under public/certs/.
 */
const CREDENTIALS = [
  {
    image: '/certs/aws-saa.png',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    meta: 'In progress',
    href: '#certifications',
  },
  {
    image: '/certs/aws-ccp.png',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    meta: 'Issued Sep 2026',
    href: 'https://www.credly.com/badges/77850338-9124-40b8-89cf-3ad16d7e4679',
  },
  {
    image: '/certs/comptia-techplus.png',
    title: 'CompTIA Tech+',
    issuer: 'CompTIA',
    meta: 'Issued Jun 2026',
    href: 'https://www.credly.com/badges/b6841f36-764a-4f46-a5d1-7496c6ec889c',
  },
  {
    image: '/certs/photoshop.png',
    title: 'Adobe Certified Associate — Photoshop',
    issuer: 'Adobe',
    meta: 'Issued Jun 2017',
    href: 'https://www.credly.com/badges/4e8208f9-ae4a-4c04-be03-a969b0dbd681',
  },
] as const;

/** Intro sentences cycled by the hero typewriter. */
const INTRO_LINES = [
  'I can adapt to whatever a project calls for, whether that means cloud architecture, full stack development, or building something from a blank page.',
  'I can work comfortably across infrastructure, software, and design, picking up whatever a team needs without losing momentum.',
  'I enjoy planning out how a system should be architected before a single line of code gets written.',
];

/** The longest line, used to reserve the paragraph's height (see Typewriter). */
const LONGEST_INTRO = INTRO_LINES.reduce((longest, line) =>
  line.length > longest.length ? line : longest,
);

/**
 * Types each intro line out, pauses, deletes it, then moves to the next.
 *
 * The animated text is absolutely positioned over a hidden copy of the
 * LONGEST line, so the paragraph's box is always sized for the worst case and
 * nothing around or below it shifts as characters are added or removed.
 * Renders the first line as static text when reduced motion is requested.
 */
function Typewriter() {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Reduced motion: the first line is rendered statically below, so the
    // animation loop never starts and no state is set here.
    if (reducedMotion) return;
    const line = INTRO_LINES[lineIndex];
    const finished = text === line;
    const empty = text === '';
    const timeout = window.setTimeout(
      () => {
        if (finished && !deleting) {
          setDeleting(true);
          return;
        }
        if (empty && deleting) {
          setDeleting(false);
          setLineIndex((current) => (current + 1) % INTRO_LINES.length);
          return;
        }
        setText(line.slice(0, text.length + (deleting ? -1 : 1)));
      },
      finished && !deleting ? 2600 : deleting ? 12 : 26,
    );
    return () => window.clearTimeout(timeout);
  }, [deleting, reducedMotion, lineIndex, text]);

  if (reducedMotion) {
    return <p className="hero__intro">{INTRO_LINES[0]}</p>;
  }

  return (
    <p className="hero__intro hero__intro--typed">
      {/* Height reservation: never visible, never announced, but it fixes the
          paragraph's box at the tallest line it will ever hold. */}
      <span className="hero__intro-sizer" aria-hidden="true">
        {LONGEST_INTRO}
      </span>
      <span className="hero__intro-text" aria-live="polite">
        {text}
        <span className="caret" aria-hidden="true" />
      </span>
    </p>
  );
}

interface MotionLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  external?: boolean;
  download?: string;
}

/**
 * Shared button/link. These are the previous site's buttons: the
 * `.primary-action` / `.secondary-action` shapes, with `.sweep-button`
 * contributing ONLY the hover animation (a white diagonal grows out of the
 * top-left corner and inverts the label, retreating on mouse-leave). That
 * CSS also supplies the hover lift, so only the tap press is left to
 * Framer Motion.
 */
function MotionLink({
  href,
  children,
  variant = 'primary',
  external = false,
  download,
}: MotionLinkProps) {
  const base = variant === 'text' ? 'link-action' : `${variant}-action`;
  return (
    <motion.a
      className={`${base} sweep-button`}
      href={href}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
    >
      <span>{children}</span>
    </motion.a>
  );
}

/** The `~/portfolio/<file>` section label. */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label__path">~/portfolio/{children}</span>
    </div>
  );
}

const GITHUB_URL = SOCIAL_LINKS.github;
const LINKEDIN_URL = SOCIAL_LINKS.linkedin;
const CREDLY_URL = SOCIAL_LINKS.credly;
const MAILTO = `mailto:${CONTACT_EMAIL}`;

/** The landing page: hero, projects, about, certifications, contact. */
export function LandingPage() {
  /*
   * The hero's entrance starts at opacity 0 and animates in. Framer does not
   * drop `initial` for reduced motion on its own, so with motion reduced the
   * hero is rendered in its final state instead of fading up.
   */
  const reducedMotion = useReducedMotion();
  const heroEntrance = (from: Record<string, number>) =>
    reducedMotion ? undefined : from;

  return (
    <>
      <section className="hero shell" id="home">
        <motion.div
          className="hero__copy"
          initial={heroEntrance({ opacity: 0, y: 24 })}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="hero__name">
            <ScrambleText text="Shenabeth Jenkins" />
          </h1>
          <p className="hero__role">Software Developer &amp; Cloud Architect</p>
          <Typewriter />
          <div className="hero__actions">
            <MotionLink href={RESUME.url} external download={RESUME.downloadName}>
              Résumé <ArrowUpRight />
            </MotionLink>
            <MotionLink href="/projects" variant="secondary">
              View All Projects
            </MotionLink>
          </div>
          <SocialLinks className="hero__socials" />
        </motion.div>

        <motion.div
          className="hero__assistant"
          initial={heroEntrance({ opacity: 0, scale: 0.97, x: 20 })}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          <ClippyHeroFigure />
        </motion.div>

      </section>

      <section className="section shell" id="projects">
        <SectionLabel>projects.tsx</SectionLabel>
        <div className="section-heading">
          <h2>Projects</h2>
          <p>
            Ideas brought to life through strategy and a healthy obsession with detail.
          </p>
        </div>

        {/* The skills panel. Lives in src/components/shared/SkillsCard.tsx so
            it can be reused on another page without copying the markup. */}
        <SkillsCard />

        {/* Cards come from FEATURED_PROJECTS, so adding a project to config
            adds it here — and each card links to its own case-study page. */}
        <div className="project-cards">
          {FEATURED_PROJECTS.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <div className="project-card__head">
                <span className="project-kicker">{project.category}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-card__actions">
                <MotionLink href={project.caseStudyLink ?? `/projects/${project.id}`}>
                  View Project
                </MotionLink>
                {project.demoLink && (
                  <MotionLink href={project.demoLink} variant="secondary" external>
                    Live Demo <ArrowUpRight />
                  </MotionLink>
                )}
              </div>
            </motion.article>
          ))}
        </div>

      </section>

      <section className="section section--about" id="about">
        <div className="shell about-grid">
          <div>
            <SectionLabel>about.md</SectionLabel>
            <h2>About Me</h2>
          </div>
          <div className="about-copy">
            <p className="about-copy__lead">
              I&rsquo;m <span className="about-copy__name">Shenabeth</span>, a computer
              science professional who enjoys finding the clean path through complicated
              problems.
            </p>
            <p>
              My work spans cloud infrastructure, full-stack development, and applied AI.
              What carries across all three is pretty simple: I want to be able to open a
              project six months later and still understand it, and I would rather the
              interesting part be the problem than my own code.
            </p>
            <div className="principles">
              <div>
                <strong>Clear beats clever</strong>
              </div>
              <div>
                <strong>Works beats impressive</strong>
              </div>
              <div>
                <strong>Readable six months later</strong>
              </div>
            </div>
            <MotionLink
              href={RESUME.url}
              variant="secondary"
              external
              download={RESUME.downloadName}
            >
              View Résumé <ArrowUpRight />
            </MotionLink>
          </div>
        </div>
      </section>

      <section className="section shell" id="certifications">
        <SectionLabel>certifications.json</SectionLabel>
        <div className="section-heading">
          <h2>Certifications</h2>
          <p>
            Industry credentials that support hands-on experience in cloud architecture
            and information technology.
          </p>
        </div>
        <div className="credentials-list">
          {CREDENTIALS.map((credential) => (
            <motion.a
              className="credential-row"
              href={credential.href}
              target={credential.href.startsWith('http') ? '_blank' : undefined}
              rel={credential.href.startsWith('http') ? 'noreferrer' : undefined}
              key={credential.title}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- plain <img>
                  matches the reference and the rest of the site (no next/image). */}
              <img src={credential.image} alt="" />
              <div className="credential-row__body">
                <h3>{credential.title}</h3>
                <p>{credential.issuer}</p>
              </div>
              <span className="credential-row__meta">{credential.meta}</span>
              <ArrowUpRight />
            </motion.a>
          ))}

        </div>

        {/*
          All four credentials are listed above, so this is a plain link out
          to the Credly profile rather than an expand/collapse toggle.
        */}
        <div className="credentials-toggle">
          <MotionLink href={CREDLY_URL} variant="secondary" external>
            View All <ArrowUpRight />
          </MotionLink>
        </div>
      </section>

      {/*
        Contact, laid out as "Option E" from the Section Divider Options
        canvas: a solid green block used as a layout device (not a gradient
        or glow) running down one side, carrying mono labels at its top and
        bottom, with the dark content panel beside it. The content is the
        same as before — status line, heading, email button, social row.
      */}
      <section className="contact-block shell" id="contact">
        <div className="contact-block__bar" aria-hidden="true">
          <span className="contact-block__bar-top">SHENABETH JENKINS</span>
          <span className="contact-block__bar-bottom">
            SOFTWARE DEVELOPER
            <br />
            CLOUD ARCHITECT
          </span>
        </div>

        <div className="contact-block__panel">
          <SectionLabel>contact.ts</SectionLabel>
          <span className="contact__status">
            <Sparkles /> Seeking full-time software engineering roles
          </span>
          <h2>Looking for a team building something worth maintaining.</h2>
          <p className="contact-block__copy">
            Open to full-time roles in cloud architecture, full-stack engineering,
            and applied AI. I&rsquo;d be glad to talk about where I could fit on
            your team.
          </p>

          <div className="contact-block__actions">
            <MotionLink href={MAILTO}>
              <Mail /> {CONTACT_EMAIL}
            </MotionLink>
            <div className="socials">
              <motion.a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                aria-label="GitHub"
              >
                <GitHubMark />
              </motion.a>
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                aria-label="LinkedIn"
              >
                <LinkedInMark />
              </motion.a>
              <motion.a
                href={CREDLY_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                aria-label="Credly"
              >
                <CredlyMark />
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
