import React from 'react';
/*
 * File: EducationSection.tsx
 * Purpose: Display education information
 */

import { EDUCATION } from '@/config/constants';

/**
 * Display education section with degree and university
 */
export function EducationSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Education</h2>
      <p className="text-lg text-slate-300">
        {EDUCATION.degree}, {EDUCATION.university}
      </p>
    </section>
  );
}
