/*
 * File: page.tsx
 * Purpose: Dynamic case study route /projects/[slug]. Looks up the slug
 *          in the case-studies config and composes the modular sections
 *          each project declares. Projects without a given section (e.g.
 *          Dog Game has no cloud diagram) simply omit it.
 */

import { notFound } from 'next/navigation';
import { CaseStudyBanner } from '@/components/case-study/CaseStudyBanner';
import { CaseStudySection } from '@/components/case-study/CaseStudySection';
import { LanguageBar } from '@/components/case-study/LanguageBar';
import { TechStackSection } from '@/components/case-study/TechStackSection';
import { ProblemSection } from '@/components/case-study/ProblemSection';
import { ImpactSection } from '@/components/case-study/ImpactSection';
import { FeaturesSection } from '@/components/case-study/FeaturesSection';
import { LessonsSection } from '@/components/case-study/LessonsSection';
import { getCaseStudy, getAllCaseStudySlugs } from '@/config/case-studies';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-render a page for every known case study at build time.
 *
 * @returns Array of params objects consumed by Next.js
 */
export function generateStaticParams(): { slug: string }[] {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

/**
 * Render a case study page. Composes only the sections the config
 * declares, keeping each project's write-up as long or as short as it
 * needs to be.
 *
 * @param params - Dynamic route params containing the project slug
 * @returns Composed case study page or 404
 */
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  let step = 1;
  const nextStep = (name: string): string => {
    const n = String(step).padStart(2, '0');
    step++;
    return `${n} / ${name}`;
  };

  return (
    <div className="pb-16">
      <div className="w-[min(92vw,1320px)] mx-auto" style={{ marginBottom: '2rem' }}>
        <CaseStudyBanner title={study.title} />
      </div>

      <div className="case-study-summary-wrap">
        <p className="case-study-summary">{study.summary}</p>
      </div>

      <CaseStudySection step={nextStep('tech-stack')} title="Tech Stack">
        <LanguageBar languages={study.languages} />
        <TechStackSection groups={study.techStack} />
      </CaseStudySection>

      {study.problem && (
        <CaseStudySection
          step={nextStep('why-built')}
          title="Why I Built It"
          description="The old version was a hand-coded static site. This rebuild makes it modular and gives me a deploy pipeline I control."
        >
          <ProblemSection before={study.problem.before} after={study.problem.after} />
        </CaseStudySection>
      )}

      {study.impact && study.impact.length > 0 && (
        <CaseStudySection
          step={nextStep('impact')}
          title="Impact"
          description="What changed, measured against the old static site."
        >
          <ImpactSection stats={study.impact} />
        </CaseStudySection>
      )}

      {study.features && study.features.length > 0 && (
        <CaseStudySection step={nextStep('features')} title="Key Features">
          <FeaturesSection features={study.features} />
        </CaseStudySection>
      )}

      {study.lessons && study.lessons.length > 0 && (
        <CaseStudySection
          step={nextStep('lessons')}
          title="Lessons Learned"
        >
          <LessonsSection lessons={study.lessons} />
        </CaseStudySection>
      )}
    </div>
  );
}
