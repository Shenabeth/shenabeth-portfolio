/*
 * File: SkillsCard.tsx
 * Purpose: The "what I bring" skills panel — a wide bordered card holding
 *          the kicker / heading / copy / skill rows / link, flanked by a
 *          narrow strip of the diagonal hatch pattern on each side.
 *
 *          Extracted from LandingPage so the card can be dropped into any
 *          page: it takes its own content as props and defaults to the
 *          landing-page copy, and its skill rows come from TECH_STACK, so a
 *          second placement stays in step with the stack rather than
 *          hard-coding a copy of it.
 *
 *          Layout note: the card is a 10% / 80% / 10% split — a hatch bar,
 *          the content, and a matching hatch bar. The hatch columns hold
 *          nothing: the product-window mock that used to fill the right
 *          side was decorative and crowded the copy, so the content keeps
 *          the middle 80% and the pattern is reduced to symmetric edges.
 *
 *          Backing CSS: `.skills-card*` in app/globals.css.
 */

'use client';

import { motion } from 'framer-motion';
import { TECH_STACK } from '@/config/constants';

/**
 * The three skill groups the card advertises. Pulled from TECH_STACK
 * (src/config/constants.ts) and trimmed to the leading few, so editing the
 * stack there updates this card too.
 */
const TOP_SKILLS = [
  { label: 'Languages', category: 'Languages', take: 4 },
  { label: 'Web', category: 'Frontend & Backend', take: 4 },
  { label: 'Cloud', category: 'AWS Services', take: 4 },
].map(({ label, category, take }) => ({
  label,
  items:
    TECH_STACK.find((group) => group.category === category)
      ?.skills.slice(0, take)
      .join(', ') ?? '',
}));

interface SkillsCardProps {
  /** Small uppercase label above the heading. */
  kicker?: string;
  /** The card's headline. */
  heading?: string;
  /** Body paragraph under the headline. */
  copy?: string;
  /** Call-to-action link text; omit `ctaHref` to hide the link entirely. */
  ctaLabel?: string;
  ctaHref?: string;
  /** Extra class for page-specific spacing. */
  className?: string;
}

/**
 * Render the skills panel.
 *
 * @param kicker - Uppercase eyebrow label
 * @param heading - Card headline
 * @param copy - Body paragraph
 * @param ctaLabel - Link text for the trailing call to action
 * @param ctaHref - Link target; the CTA is omitted when this is undefined
 * @param className - Optional additional class names
 * @returns The skills card element
 */
export function SkillsCard({
  kicker = 'What I bring',
  heading = 'Infrastructure, and the thing running on it.',
  copy = 'I build the AWS side and the application on top of it, which means I get to blame exactly one person when the bill looks strange. I also leave it readable, mostly so that person is not future me at 2am.',
  ctaLabel = 'View All Projects',
  ctaHref = '/projects',
  className,
}: SkillsCardProps) {
  return (
    <motion.article
      className={className ? `skills-card ${className}` : 'skills-card'}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      /* `amount` is the fraction of this panel that must be on screen
         before it animates in. At 0.25 the card stayed blank until it was a
         quarter visible, which on a laptop meant scrolling well past the
         heading. A small margin triggers it just before the top edge
         arrives instead. */
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Leading hatch bar — see the layout note in the file header. */}
      <div className="skills-card__edge skills-card__edge--start" aria-hidden="true" />

      <div className="skills-card__copy">
        <div>
          <span className="project-kicker">{kicker}</span>
          <h3>{heading}</h3>
          <p>{copy}</p>
        </div>
        <div>
          <ul className="project-details">
            {TOP_SKILLS.map((group) => (
              <li key={group.label}>
                <span>{group.label}</span>
                <strong>{group.items}</strong>
              </li>
            ))}
          </ul>
          {ctaHref && (
            <a className="link-action sweep-button" href={ctaHref}>
              <span>
                {ctaLabel}
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Trailing hatch bar, matching the leading one. */}
      <div className="skills-card__edge skills-card__edge--end" aria-hidden="true" />
    </motion.article>
  );
}
