/*
 * File: page.tsx
 * Purpose: About page
 */

import { EducationSection } from "@/components/about/EducationSection";
import { SkillsSection } from "@/components/about/SkillsSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";
import { PageTitleBanner } from "@/components/shared/PageTitleBanner";

export default function AboutPage() {
  return (
    <div>
      {/* Full-bleed title banner at the very top of the page (no outer
          container), matching the hero treatment. */}
      <div className="shell">
        <PageTitleBanner
          kicker="// about.json"
          title="About"
          comment="Software developer and cloud architect based in the DMV, building thoughtful full-stack systems from the database up to the interface."
        />
      </div>

      <div className="shell">
        <EducationSection />
        <CertificationsSection />
        <SkillsSection />
      </div>
    </div>
  );
}
