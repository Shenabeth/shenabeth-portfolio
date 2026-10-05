/*
 * File: techIcons.ts
 * Purpose: Map TECH_STACK skill names to a logo/icon component for the
 * about page's tech stack grid. Prefers a real brand icon (Simple Icons via
 * react-icons/si); falls back to a generic lucide-react icon for skills
 * that don't have a Simple Icons brand mark (notably most AWS services,
 * C#, OAuth, VS Code, and the combined "REST APIs"/"HTML/CSS" entries).
 */

import type { ComponentType, CSSProperties } from 'react';
import {
  SiC,
  SiCplusplus,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import {
  Box,
  Cloud,
  Code2,
  Database,
  KeyRound,
  Layers,
  Mail,
  Server,
  ShieldCheck,
  TerminalSquare,
} from 'lucide-react';

export type TechIcon = ComponentType<{ className?: string; style?: CSSProperties }>;

export const FALLBACK_ICON: TechIcon = Box;

export const TECH_ICON_MAP: Record<string, TechIcon> = {
  // Languages
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Java: SiOpenjdk,
  'HTML/CSS': SiHtml5,
  C: SiC,
  'C++': SiCplusplus,
  'C#': Code2,
  Kotlin: SiKotlin,

  // Frontend & Backend
  React: SiReact,
  'React Native': SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  PostgreSQL: SiPostgresql,
  'REST APIs': Layers,
  OAuth: KeyRound,

  // AWS Services
  S3: Database,
  CloudFront: Cloud,
  Lambda: Server,
  'API Gateway': Layers,
  DynamoDB: Database,
  Cognito: ShieldCheck,
  EC2: Server,
  RDS: Database,
  'Secrets Manager': KeyRound,
  SES: Mail,

  // Tools
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
  'VS Code': TerminalSquare,
};

export function getTechIcon(skillName: string): TechIcon {
  return TECH_ICON_MAP[skillName] ?? FALLBACK_ICON;
}

const FALLBACK_COLOR = '#8a8f8c';

/**
 * Real brand colors (sourced from Simple Icons' official hex values, or the
 * vendor's brand color for lucide-fallback entries that have no Simple
 * Icons mark). Black/white marks that would vanish against the site's dark
 * background (GitHub, Next.js) use their recognized light variant.
 */
export const TECH_ICON_COLOR_MAP: Record<string, string> = {
  // Languages
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  Java: '#437291',
  'HTML/CSS': '#E34F26',
  C: '#A8B9CC',
  'C++': '#00599C',
  'C#': '#512BD4',
  Kotlin: '#7F52FF',

  // Frontend & Backend
  React: '#61DAFB',
  'React Native': '#61DAFB',
  'Next.js': '#FFFFFF',
  'Tailwind CSS': '#38BDF8',
  'Node.js': '#5FA04E',
  PostgreSQL: '#4169E1',
  'REST APIs': '#33AF87',
  OAuth: '#33AF87',

  // AWS Services (Simple Icons doesn't cover these individually — AWS brand orange)
  S3: '#FF9900',
  CloudFront: '#FF9900',
  Lambda: '#FF9900',
  'API Gateway': '#FF9900',
  DynamoDB: '#FF9900',
  Cognito: '#FF9900',
  EC2: '#FF9900',
  RDS: '#FF9900',
  'Secrets Manager': '#FF9900',
  SES: '#FF9900',

  // Tools
  Git: '#F05032',
  GitHub: '#FFFFFF',
  Figma: '#F24E1E',
  'VS Code': '#007ACC',
};

export function getTechIconColor(skillName: string): string {
  return TECH_ICON_COLOR_MAP[skillName] ?? FALLBACK_COLOR;
}
