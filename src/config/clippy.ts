/*
 * File: clippy.ts
 * Purpose: The script behind the hero assistant — Clippy, talking ABOUT
 *          Shenabeth (not as her), offering TLDRs of the site. Each node is
 *          a card of dialogue plus the replies that lead out of it, so the
 *          whole tour can be rewritten here without touching the component.
 *
 *          Every node offers at most 3 replies, so a visitor is never
 *          looking at a wall of choices. The root is exactly: "Who are
 *          you?", "About Shenabeth", "Something else" — and "Something
 *          else" is the one consistent way back to that root menu from
 *          anywhere in the tree.
 *
 *          Rendered by src/components/home/ClippyAssistant.tsx.
 */

import { RESUME } from '@/config/constants';

/** Where a reply sends the visitor, if anywhere, in addition to advancing. */
export interface ClippyAction {
  /** Same-page anchor or route pushed when the reply is chosen. */
  href: string;
  /** Opens in a new tab (external links and the résumé). */
  external?: boolean;
}

/** One reply button under a dialogue card. */
export interface ClippyReply {
  /** Button label. */
  label: string;
  /** Node this reply advances to. Omit to stay on the current node. */
  to?: string;
  /** Optional navigation performed alongside the advance. */
  action?: ClippyAction;
}

/** One card of dialogue: what Clippy says, and the ways out of it. */
export interface ClippyNode {
  /** Node id, referenced by `ClippyReply.to`. */
  id: string;
  /** Short mono label shown in the bubble's header. */
  kicker: string;
  /** Paragraphs Clippy types out, in order. */
  lines: string[];
  /** Replies offered under the dialogue — 3 at most. */
  replies: ClippyReply[];
}

/** The node the assistant opens on, and the root "Something else" returns to. */
export const CLIPPY_ROOT = 'intro';

/**
 * The node Clippy re-opens on after he's already been introduced once this
 * session and the visitor has navigated to a new page — a short, focused
 * "want more on where you are, or who I am?" beat, rather than replaying the
 * full intro or expecting any memory of the earlier conversation.
 */
export const CLIPPY_RETURN_ROOT = 'return';

/**
 * Picks the label for the "tell me about where I am" reply on the `return`
 * node, from the current pathname. Falls back to a generic phrasing for
 * routes with no specific tie-in (e.g. /about, /admin).
 */
export function clippyPageLabel(pathname: string): string {
  if (pathname === '/') return 'Tell me about this page';
  if (pathname.startsWith('/projects/sai-system')) return 'Tell me about SAI System';
  if (pathname.startsWith('/projects/dog-game')) return 'Tell me about Dog Game';
  if (pathname.startsWith('/projects/portfolio-site')) return 'Tell me about this site';
  if (pathname.startsWith('/projects')) return 'Tell me about the projects';
  if (pathname.startsWith('/about')) return 'Tell me about Shenabeth';
  return 'What should I know about this page?';
}

/** Which dialogue node `clippyPageLabel`'s reply should land on, by route. */
export function clippyPageTarget(pathname: string): string {
  if (pathname === '/') return 'menu-projects';
  if (pathname.startsWith('/projects/sai-system')) return 'menu-projects';
  if (pathname.startsWith('/projects/dog-game')) return 'menu-projects';
  if (pathname.startsWith('/projects/portfolio-site')) return 'menu-projects';
  if (pathname.startsWith('/projects')) return 'menu-projects';
  if (pathname.startsWith('/about')) return 'about';
  return 'menu';
}

/**
 * The dialogue tree. Every `to` and every `id` must agree; the component
 * falls back to the root node if a reply ever points at a missing id.
 */
export const CLIPPY_SCRIPT: ClippyNode[] = [
  /*
   * `return`'s third reply ("Tell me about where you are") is appended at
   * render time by ClippyAssistant.tsx, since it depends on the current
   * route — everything else about this node is static.
   */
  {
    id: 'return',
    kicker: 'TLDR',
    lines: ['Welcome back. Want to know more about where you are, or who I am?'],
    replies: [
      { label: 'Who are you?', to: 'who-are-you' },
      { label: 'Something else', to: 'menu' },
    ],
  },
  {
    id: 'intro',
    kicker: 'TLDR',
    lines: [
      'It looks like you’re looking at a portfolio. Want the short version?',
    ],
    replies: [
      { label: 'Who are you?', to: 'who-are-you' },
      { label: 'About Shenabeth', to: 'about' },
      { label: 'Something else', to: 'menu' },
    ],
  },
  {
    id: 'who-are-you',
    kicker: 'clippy.exe',
    lines: [
      'I’m Clippy. I live in this corner of the site and give TLDRs about whatever you want to know — Shenabeth, her projects, her skills, her certs.',
      'Think of me as the fast path through this portfolio. Ask away.',
    ],
    replies: [
      { label: 'About Shenabeth', to: 'about' },
      { label: 'Something else', to: 'menu' },
    ],
  },
  {
    id: 'about',
    kicker: 'about.md',
    lines: [
      'Shenabeth is a software developer and cloud architect — computer science grad, AWS certified, happiest when a system is secure AND makes sense to the next person who opens it.',
      'Cloud architecture on AWS, full-stack products in Next.js and TypeScript, and AI agent systems with real boundaries around them. That’s the throughline.',
    ],
    replies: [
      { label: 'What does she build?', to: 'build' },
      { label: 'Is she available?', to: 'available' },
      { label: 'Something else', to: 'menu' },
    ],
  },
  {
    id: 'build',
    kicker: 'build.ts',
    lines: [
      'Three things, mostly: cloud infrastructure, full-stack web apps, and AI agent platforms.',
      'The common thread is restraint — secure foundations and interfaces that stay legible long after the demo is over.',
    ],
    replies: [
      { label: 'Show me a project', to: 'menu-projects' },
      { label: 'Is she available?', to: 'available' },
      { label: 'Something else', to: 'menu' },
    ],
  },
  {
    id: 'available',
    kicker: 'contact.ts',
    lines: [
      'Yes — open to roles and collaborations in cloud architecture, full-stack engineering, and applied AI.',
      'The résumé is one click away, and so is her inbox.',
    ],
    replies: [
      { label: 'Get in touch', to: 'available', action: { href: '#contact' } },
      {
        label: 'Read the résumé',
        to: 'available',
        action: { href: RESUME.url, external: true },
      },
      { label: 'Something else', to: 'menu' },
    ],
  },

  /*
   * ---- "Something else": the menu, and everything it fans out to.
   * Every leaf down here returns to `menu`, never straight to `intro` —
   * that keeps "Something else" meaning one consistent thing: the list of
   * topics, not the very first screen.
   */
  {
    id: 'menu',
    kicker: 'menu.json',
    lines: ['What do you want the TLDR on?'],
    replies: [
      { label: 'Projects', to: 'menu-projects' },
      { label: 'Skills', to: 'menu-skills' },
      { label: 'Certifications', to: 'menu-certs' },
    ],
  },
  {
    id: 'menu-projects',
    kicker: 'projects.tsx',
    lines: [
      'Start with SAI System — a platform for specialized AI agents that stay in their lane, each one shaped by its own folder of transparent Markdown instructions.',
      'Then there’s this site, and Dog Game — a Unity tower-defense game built with a five-person team she led.',
    ],
    replies: [
      { label: 'Take me there', to: 'menu-projects', action: { href: '#projects' } },
      { label: 'The AI one', to: 'menu-projects', action: { href: '/projects/sai-system' } },
      { label: 'Something else', to: 'menu' },
    ],
  },
  {
    id: 'menu-skills',
    kicker: 'skills.json',
    lines: [
      'Day to day: TypeScript, React and Next.js on the front, Python and Node behind it, AWS underneath — Lambda, Cognito, DynamoDB, API Gateway, S3.',
      'Plus the unglamorous half that makes it hold together: CI, infra as code, and accessibility that’s checked rather than assumed.',
    ],
    replies: [
      { label: 'See it all', to: 'menu-skills', action: { href: '/about' } },
      { label: 'Certifications', to: 'menu-certs' },
      { label: 'Something else', to: 'menu' },
    ],
  },
  {
    id: 'menu-certs',
    kicker: 'certs.json',
    lines: [
      'AWS Certified Cloud Practitioner and CompTIA Tech+, with the Solutions Architect – Associate in progress.',
      'An Adobe Certified Associate badge in Photoshop too — design gets real attention, not just the infrastructure.',
    ],
    replies: [
      { label: 'See the badges', to: 'menu-certs', action: { href: '#certifications' } },
      { label: 'Projects', to: 'menu-projects' },
      { label: 'Something else', to: 'menu' },
    ],
  },
];
