/*
 * File: page.tsx
 * Purpose: About page
 */

import { EducationSection } from "@/components/about/EducationSection";
import { SkillsSection } from "@/components/about/SkillsSection";

export default function AboutPage() {
  return (
    <div className="px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">About Me</h1>

        <EducationSection />
        <SkillsSection />
      </div>
    </div>
  );
}
