/*
 * File: PlayDemoSection.tsx
 * Purpose: A prominent "play / try it" call-out for a case study whose
 *          project has a playable or runnable build.
 *
 *          The banner already carries a demo link among its action
 *          buttons, but on a long page that link scrolls away immediately
 *          and reads as one option among several. This gives the demo its
 *          own full-width block — a bordered panel with the primary button
 *          and the practical notes a player needs before clicking (what it
 *          runs in, how long it takes to load, what state the build is in).
 *
 *          Content comes from a CaseStudy's `playable` field in
 *          src/config/case-studies.ts.
 *
 *          Backing CSS: `.play-demo*` in app/globals.css.
 */

'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Gamepad2 } from 'lucide-react';
import { ActionLink } from '@/components/shared/ActionLink';

export interface PlayableDemo {
  /** Where the build is hosted. */
  href: string;
  /** Button label, e.g. "Play the demo in your browser". */
  label: string;
  /** One or two sentences on what to expect when it opens. */
  copy: string;
  /** Short practical facts — platform, load time, build state. */
  notes?: { label: string; value: string }[];
}

/**
 * Render the playable-demo call-out.
 *
 * @param demo - The demo link, copy, and practical notes
 * @returns The call-out panel
 */
export function PlayDemoSection({
  demo,
}: {
  demo: PlayableDemo;
}): React.ReactElement {
  return (
    <motion.div
      className="play-demo"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <div className="play-demo__body">
        <span className="play-demo__icon" aria-hidden="true">
          <Gamepad2 />
        </span>
        <p className="play-demo__copy">{demo.copy}</p>

        <div className="play-demo__action">
          <ActionLink href={demo.href} external>
            {demo.label} <ArrowUpRight />
          </ActionLink>
        </div>
      </div>

      {demo.notes && demo.notes.length > 0 && (
        <dl className="play-demo__notes">
          {demo.notes.map((note) => (
            <div key={note.label}>
              <dt>{note.label}</dt>
              <dd>{note.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </motion.div>
  );
}
