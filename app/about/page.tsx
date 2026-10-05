/*
 * File: page.tsx
 * Purpose: About page
 */

import { EducationSection } from "@/components/about/EducationSection";
import { SkillsSection } from "@/components/about/SkillsSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";

export default function AboutPage() {
  return (
    <div className="w-[min(92vw,1320px)] mx-auto pt-16">
      <h1
        className="font-medium leading-tight"
        style={{
          fontSize: 'clamp(3rem, 6vw, 5.5rem)',
          letterSpacing: '-0.065em',
          margin: 0,
        }}
      >
        About
      </h1>
      <p
        className="max-w-lg mt-5"
        style={{
          color: 'var(--muted)',
          fontSize: '0.95rem',
          lineHeight: '1.7',
        }}
      >
        Software developer and cloud architect based in the DMV, building thoughtful full-stack systems from the database up to the interface.
      </p>

      <EducationSection />
      <CertificationsSection />
      <SkillsSection />
    </div>
  );
}
