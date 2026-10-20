/*
 * File: ActionLink.tsx
 * Purpose: The shared button/link used across the site — the
 *          `.primary-action` / `.secondary-action` shapes with
 *          `.sweep-button` contributing the hover animation (a near-white
 *          diagonal grows out of the top-left corner and inverts the
 *          label, retreating on mouse-leave). That CSS also supplies the
 *          hover lift, so only the tap press is left to Framer Motion.
 *
 *          Extracted from LandingPage so the projects index and the
 *          case-study pages use the same buttons rather than their own.
 */

'use client';

import { motion } from 'framer-motion';

interface ActionLinkProps {
  href: string;
  children: React.ReactNode;
  /** `text` is the borderless link variant (no sweep fill). */
  variant?: 'primary' | 'secondary' | 'text';
  /** Opens in a new tab with `rel="noreferrer"`. */
  external?: boolean;
  download?: string;
}

/**
 * Render a site action button.
 *
 * @param href - Link target
 * @param children - Label content (text plus an optional trailing icon)
 * @param variant - Which button shape to use
 * @param external - Whether to open in a new tab
 * @param download - Suggested filename when the target is a download
 */
export function ActionLink({
  href,
  children,
  variant = 'primary',
  external = false,
  download,
}: ActionLinkProps) {
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
