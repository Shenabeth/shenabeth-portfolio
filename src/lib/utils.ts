/*
 * File: utils.ts
 * Purpose: Small, framework-agnostic helpers used across the site.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with automatic conflict resolution. Used by the
 * shadcn/ui primitives and anywhere class names are composed conditionally.
 *
 * @param classes - Class names or conditional class values
 * @returns Merged, de-duplicated class string
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}

/**
 * Validate an email address with a pragmatic format check.
 *
 * @param email - Email address to validate
 * @returns True if the format looks like a valid email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
