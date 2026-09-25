/*
 * File: index.ts
 * Purpose: Centralized TypeScript type definitions used throughout the site
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  demoLink?: string;
  githubLink: string;
  caseStudyLink?: string;
  status?: 'live' | 'coming-soon' | 'in-progress';
  featured?: boolean;
  imageUrl?: string;
  architectureImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  createdAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  code?: string;
  statusCode?: number;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateEarned: string;
  credlyUrl: string;
  badgeUrl?: string;
}
