/*
 * File: case-studies.ts
 * Purpose: Case-study content, keyed by project slug. Each entry declares only
 *          the sections it wants, so the dynamic /projects/[slug] page renders a
 *          different shape per project (e.g. only the Portfolio Site has an
 *          Impact section today). This config is the "template" a future admin
 *          panel would write to when adding a new project page.
 *
 *          Content guideline: keep everything here factually accurate. Describe
 *          only what is actually built. Planned work is labeled as planned.
 */

import { TechGroup } from '@/components/case-study/TechStackSection';
import { ProblemColumn } from '@/components/case-study/ProblemSection';
import { ImpactStat } from '@/components/case-study/ImpactSection';
import { FeatureItem } from '@/components/case-study/FeaturesSection';
import { LanguageSlice } from '@/components/case-study/LanguageBar';

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  /** GitHub-style language breakdown shown at the top of the tech stack. */
  languages: LanguageSlice[];
  techStack: TechGroup[];
  problem?: { before: ProblemColumn; after: ProblemColumn };
  impact?: ImpactStat[];
  features?: FeatureItem[];
  lessons?: string[];
}

// Canonical GitHub language colors, so the language bar reads as authentic.
const LANG_COLOR = {
  typescript: '#3178c6',
  javascript: '#f1e05a',
  css: '#563d7c',
  html: '#e34c26',
  plpgsql: '#336790',
  csharp: '#178600',
  shaderlab: '#222c37',
  hlsl: '#aace60',
} as const;

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'portfolio-site': {
    slug: 'portfolio-site',
    title: 'Portfolio Site',
    summary:
      'A rebuild of my original portfolio — a free, hand-coded HTML/CSS/Bootstrap site on GitHub Pages — into a modular Next.js app deployed on AWS Amplify. The goal was a codebase I could extend without copy-pasting markup, and a real deploy pipeline I own end to end.',
    languages: [
      { name: 'TypeScript', percent: 96.8, color: LANG_COLOR.typescript },
      { name: 'CSS', percent: 2.7, color: LANG_COLOR.css },
      { name: 'JavaScript', percent: 0.5, color: LANG_COLOR.javascript },
    ],
    techStack: [
      {
        label: 'Framework',
        items: ['Next.js 16', 'React 19', 'TypeScript'],
      },
      {
        label: 'Styling & Motion',
        items: ['Tailwind CSS', 'Framer Motion', 'shadcn/ui'],
      },
      {
        label: 'Hosting & Ops',
        items: ['AWS Amplify', 'CloudWatch', 'Route 53 (planned)'],
      },
      {
        label: 'Tooling',
        items: ['Git', 'GitHub', 'ESLint', 'Figma'],
      },
    ],
    problem: {
      before: {
        label: '// before',
        heading: 'A hand-coded static site',
        points: [
          'Plain HTML with CSS and Bootstrap, hosted free on GitHub Pages',
          'No components — the nav, footer, and cards were copied into every page',
          'Changing one shared element meant editing the same markup in several files',
          'Styling was global and hard to keep consistent as pages were added',
        ],
      },
      after: {
        label: '// after',
        heading: 'A modular Next.js app',
        points: [
          'Every section is a typed, reusable React component',
          'One shared layout renders the nav and footer across all pages',
          'Project pages are generated from a single case-study template and a config file',
          'Deployed on AWS Amplify with automatic builds on every push to main',
        ],
      },
    },
    impact: [
      {
        value: '~$0.03',
        label: 'Projected hosting / month',
        description:
          'Amplify hosting for a site this size lands around a few cents a month, tracked with an AWS Budget and a CloudWatch billing alarm.',
      },
      {
        value: '1 layout',
        label: 'Nav + footer, defined once',
        description:
          'A single shared layout replaces the nav and footer that were copy-pasted into every page of the old static site.',
      },
      {
        value: '0 steps',
        label: 'Manual deploy work',
        description:
          'Amplify builds and publishes automatically from GitHub on every push to main — no manual upload.',
      },
    ],
    features: [
      {
        title: 'Template-driven project pages',
        body: 'Each project page is composed from modular sections (tech stack, before/after, impact, features, lessons) keyed off a single config file. Adding a project means adding a config entry, not building a page.',
      },
      {
        title: 'One component system',
        body: 'Buttons, headings, badges, and section layouts are shared components reused across the home, about, and project pages, so the whole site stays visually consistent.',
      },
      {
        title: 'Continuous deployment on Amplify',
        body: 'Pushing to main triggers an Amplify build that compiles the Next.js app and publishes it — the same model as the old GitHub Pages site, but with full control over the pipeline.',
      },
      {
        title: 'Cost monitoring from day one',
        body: 'An AWS Budget and a CloudWatch billing alarm watch the account so there are no surprises — useful practice for the Solutions Architect work this project supports.',
      },
    ],
    lessons: [
      'Deciding component boundaries before writing JSX saved far more time than it cost.',
      'A shared layout plus a config-driven page template turns "add a project" into a five-minute change.',
      'Amplify made the deploy story simpler than the serverless stack I originally planned, with nothing lost for a static site.',
      'Setting a budget and billing alarm early is the cheapest insurance in all of AWS.',
    ],
  },

  'sai-system': {
    slug: 'sai-system',
    title: 'SAI System',
    summary:
      'A bring-your-own-key AI platform. Users sign in, add their own LLM API keys, and work with custom agents in a personalized workspace. Chat history and per-user configuration are persisted in Postgres via Supabase. A fuller write-up is coming as the project matures.',
    languages: [
      { name: 'TypeScript', percent: 98.4, color: LANG_COLOR.typescript },
      { name: 'PLpgSQL', percent: 1.1, color: LANG_COLOR.plpgsql },
      { name: 'Other', percent: 0.5, color: '#8e9c95' },
    ],
    techStack: [
      {
        label: 'Framework',
        items: ['Next.js', 'React', 'TypeScript'],
      },
      {
        label: 'Backend & Data',
        items: ['Supabase', 'PostgreSQL', 'Row-Level Security'],
      },
      {
        label: 'AI',
        items: ['Bring-your-own-key', 'OpenAI', 'Anthropic'],
      },
    ],
    features: [
      {
        title: 'Bring your own key',
        body: 'Users supply their own LLM API keys, so the platform stays flexible across providers and each user controls their own usage and billing.',
      },
      {
        title: 'Custom agents',
        body: 'Agents are configured per user, letting each person shape how the assistant behaves for their own workflow.',
      },
      {
        title: 'Persisted chat history',
        body: 'Conversations and settings are stored in Postgres through Supabase, with row-level security scoping data to each user.',
      },
    ],
    lessons: [
      'A fuller case study is on the way as the project moves toward a public demo.',
    ],
  },

  'dog-game': {
    slug: 'dog-game',
    title: 'Dog Game',
    summary:
      'An endless tower-defense game built in Unity and exported to WebGL so it runs in the browser. The focus was readable, satisfying gameplay and a difficulty curve that keeps escalating as the waves get harder.',
    languages: [
      { name: 'C#', percent: 93.2, color: LANG_COLOR.csharp },
      { name: 'ShaderLab', percent: 4.9, color: LANG_COLOR.shaderlab },
      { name: 'HLSL', percent: 1.9, color: LANG_COLOR.hlsl },
    ],
    techStack: [
      {
        label: 'Engine',
        items: ['Unity', 'C#'],
      },
      {
        label: 'Design',
        items: ['Game Design', 'Level Balancing', 'Playtesting'],
      },
      {
        label: 'Delivery',
        items: ['WebGL', 'Browser build'],
      },
    ],
    features: [
      {
        title: 'Endless escalation',
        body: 'Waves keep coming and keep getting harder, so each run is a push for a higher score rather than a fixed finish line.',
      },
      {
        title: 'Readable combat',
        body: 'Clear visual feedback for placements, targeting, and damage keeps the action easy to follow even when the screen fills up.',
      },
      {
        title: 'Runs in the browser',
        body: 'Exported to WebGL so anyone can play from a link — no download or install required.',
      },
    ],
    lessons: [
      'A fuller write-up with gameplay footage is on the way.',
    ],
  },
};

/**
 * Look up a case study by its project slug.
 *
 * @param slug - Project id / url slug
 * @returns Case study entry or undefined
 */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}

/**
 * Return every known case study slug — used by Next's generateStaticParams.
 *
 * @returns Array of slug strings
 */
export function getAllCaseStudySlugs(): string[] {
  return Object.keys(CASE_STUDIES);
}
