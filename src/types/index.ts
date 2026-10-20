/*
 * File: index.ts
 * Purpose: Centralized TypeScript type definitions used throughout the site
 */

/**
 * A portfolio project. Featured projects are defined in config/constants.ts;
 * the same shape is what a future admin panel would create when adding a new
 * project page from the case-study template.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  longDescription?: string;
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
  caseStudyLink?: string;
  status?: 'live' | 'coming-soon' | 'in-progress';
  featured?: boolean;
  imageUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  code?: string;
  issuer: string;
  dateEarned: string;
  credlyUrl: string;
  badgeUrl?: string;
}

export interface Education {
  degree: string;
  minor?: string;
  university: string;
  location?: string;
  tag: string;
  logoUrl?: string;
}

/**
 * A "what I do" capability card on the homepage work section. `tags` are
 * pulled from TECH_STACK so the cards stay in sync with the real skill data
 * rather than duplicating it.
 */
export interface Capability {
  number: string;
  title: string;
  copy: string;
  tags: string[];
}

/**
 * A capability card on the /projects index. Unlike `Capability` — which
 * described an abstract skill area — each of these stands for one real
 * project and links to its case study, so the card's kicker carries the
 * discipline ("Cloud architecture") while the title names the project.
 */
export interface ProjectCapability {
  /** The discipline the project demonstrates, e.g. "Cloud architecture". */
  kicker: string;
  /** The project's name. */
  title: string;
  copy: string;
  tags: string[];
  /** Case-study route for this project. */
  href: string;
  /** Live demo URL, when the project has one. Opens in a new tab. */
  demoLink?: string;
}
