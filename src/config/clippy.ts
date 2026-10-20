/*
 * File: clippy.ts
 * Purpose: The script behind the hero assistant — the TL;DR "Clippy" offers
 *          about Shenabeth, as typed data rather than markup. Each node is a
 *          card of dialogue plus the replies that lead out of it, so the
 *          whole tour can be rewritten here without touching the component.
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
  /** Replies offered under the dialogue. */
  replies: ClippyReply[];
}

/** The node the assistant opens on, and returns to via "Start over". */
export const CLIPPY_ROOT = 'intro';

/**
 * The dialogue tree. Every `to` and every `id` must agree; the component
 * falls back to the root node if a reply ever points at a missing id.
 */
export const CLIPPY_SCRIPT: ClippyNode[] = [
  {
    id: 'intro',
    kicker: 'tl;dr.exe',
    lines: [
      'It looks like you’re reading a portfolio. Want the short version?',
      'I’m Shenabeth — computer science grad, AWS certified, and happiest building systems other people can actually understand.',
    ],
    replies: [
      { label: 'What do you build?', to: 'build' },
      { label: 'Show me the projects', to: 'projects' },
      { label: 'Are you available?', to: 'available' },
    ],
  },
  {
    id: 'build',
    kicker: 'what i build',
    lines: [
      'Three things, mostly: cloud architecture on AWS, full-stack products in Next.js and TypeScript, and AI agent systems with real boundaries around them.',
      'The throughline is restraint — secure foundations and interfaces that stay legible long after the demo is over.',
    ],
    replies: [
      { label: 'Prove it', to: 'projects' },
      { label: 'What’s the stack?', to: 'stack' },
      { label: 'Credentials?', to: 'certs' },
      { label: 'Start over', to: 'intro' },
    ],
  },
  {
    id: 'stack',
    kicker: 'stack.json',
    lines: [
      'Day to day: TypeScript, React and Next.js on the front, Python and Node behind it, AWS underneath — Amplify, Cognito, Lambda, S3.',
      'Plus the unglamorous half that makes it hold together: CI, IaC, cost alarms, and accessibility that is checked rather than assumed.',
    ],
    replies: [
      { label: 'See it in practice', to: 'projects' },
      { label: 'Credentials?', to: 'certs' },
      { label: 'Start over', to: 'intro' },
    ],
  },
  {
    id: 'projects',
    kicker: 'projects.tsx',
    lines: [
      'Start with SAI System — a platform for specialized AI agents that stay in their lane, shaped by transparent Markdown instructions.',
      'Then there’s this site, and Dog Game, a Unity project built with a team of five. Each one has a full case study.',
    ],
    replies: [
      { label: 'Take me there', to: 'projects', action: { href: '#projects' } },
      { label: 'The AI one', to: 'projects', action: { href: '/projects/sai-system' } },
      { label: 'What do you build?', to: 'build' },
      { label: 'Start over', to: 'intro' },
    ],
  },
  {
    id: 'certs',
    kicker: 'certifications.json',
    lines: [
      'AWS Certified Cloud Practitioner and CompTIA Tech+, with the Solutions Architect – Associate in progress.',
      'Design certificates from Google, Microsoft and Adobe too — which is why the interfaces get as much attention as the infrastructure.',
    ],
    replies: [
      { label: 'See the badges', to: 'certs', action: { href: '#certifications' } },
      { label: 'Are you available?', to: 'available' },
      { label: 'Start over', to: 'intro' },
    ],
  },
  {
    id: 'available',
    kicker: 'contact.ts',
    lines: [
      'Yes — open to roles and collaborations in cloud architecture, full-stack engineering, and applied AI.',
      'The résumé is one click away, and so is my inbox. I read both.',
    ],
    replies: [
      { label: 'Get in touch', to: 'available', action: { href: '#contact' } },
      {
        label: 'Read the résumé',
        to: 'available',
        action: { href: RESUME.url, external: true },
      },
      { label: 'Start over', to: 'intro' },
    ],
  },
];
