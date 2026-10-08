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
