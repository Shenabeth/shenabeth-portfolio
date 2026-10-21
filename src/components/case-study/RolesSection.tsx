/*
 * File: RolesSection.tsx
 * Purpose: Team / credits block for a case study. Lists each contributor's
 *          role and what they built, with the author's own entry highlighted.
 *          Data-driven via RoleItem[], so any collaborative project can credit
 *          its team.
 */

'use client';

import { motion } from 'framer-motion';

export interface RoleItem {
  /** Who — a name, or a generic label like "Combat System Designer". */
  role: string;
  /** What they contributed. */
  contribution: string;
  /** Marks the author's own row so it reads as "my role". */
  isMe?: boolean;
}

interface RolesSectionProps {
  roles: RoleItem[];
}

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

/**
 * Render a role heading, accenting the leading name on the author's own row.
 *
 * Entries are written as "Name — Title" when there's a name to show, so the
 * part before the em dash is the name: it gets the accent color so the
 * author's row is identifiable at a glance, while the title stays neutral.
 *
 * @param role - The row's heading text
 * @param isMe - True for the author's own row
 * @returns The heading's contents
 */
function renderRoleName(role: string, isMe?: boolean): React.ReactNode {
  const split = role.indexOf('—');
  if (!isMe || split === -1) return role;

  return (
    <>
      <span className="roles-row-me-name">{role.slice(0, split).trim()}</span>
      {` ${role.slice(split)}`}
    </>
  );
}

/**
 * Render a team's roles and contributions as a list.
 *
 * @param roles - Role entries; one may be flagged `isMe`
 * @returns List of role rows
 */
export function RolesSection({ roles }: RolesSectionProps): React.ReactElement {
  return (
    <motion.ul
      className="roles-list"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={listVariants}
    >
      {roles.map((role) => (
        <motion.li
          key={role.role}
          className={`roles-row${role.isMe ? ' roles-row--me' : ''}`}
          variants={rowVariants}
        >
          <div className="roles-row-head">
            <span className="roles-row-name">
              {renderRoleName(role.role, role.isMe)}
            </span>
            {role.isMe && <span className="mono-tag roles-row-tag">That&apos;s Me</span>}
          </div>
          <p className="roles-row-contribution">{role.contribution}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
