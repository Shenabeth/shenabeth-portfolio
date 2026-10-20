/*
 * File: page.tsx
 * Purpose: Dynamic case study route /projects/[slug]. Looks up the slug
 *          in the case-studies config and composes the modular sections
 *          each project declares, in a fixed order (tech stack, overview,
 *          why-built, impact, team, controls, showcase, features, gallery,
 *          lessons). A project only renders the sections it provides, so a
 *          code-heavy project and a game read very differently from the
 *          same template.
 *
 *          Rebuilt in the landing page's design language: a PageBanner
 *          header (replacing the circuit-board + IDE-gutter banner) and
 *          CaseStudySection blocks carrying `~/portfolio/` path labels,
 *          alternating their background band so the long page has rhythm.
 */

import { notFound } from 'next/navigation';
import { CaseStudyLinks } from '@/components/case-study/CaseStudyLinks';
import { CaseStudySection } from '@/components/case-study/CaseStudySection';
import { LanguageBar } from '@/components/case-study/LanguageBar';
import { TechStackSection } from '@/components/case-study/TechStackSection';
import { OverviewSection } from '@/components/case-study/OverviewSection';
import { ProblemSection } from '@/components/case-study/ProblemSection';
import { ImpactSection } from '@/components/case-study/ImpactSection';
import { RolesSection } from '@/components/case-study/RolesSection';
import { ControlsSection } from '@/components/case-study/ControlsSection';
import { ShowcaseSection } from '@/components/case-study/ShowcaseSection';
import { FeaturesSection } from '@/components/case-study/FeaturesSection';
import { GallerySection } from '@/components/case-study/GallerySection';
import { PdfSection } from '@/components/case-study/PdfSection';
import { LessonsSection } from '@/components/case-study/LessonsSection';
import { ArchitectureSection } from '@/components/case-study/ArchitectureSection';
import { PlayDemoSection } from '@/components/case-study/PlayDemoSection';
import { PageBanner } from '@/components/shared/PageBanner';
import { ActionLink } from '@/components/shared/ActionLink';
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

  /*
   * The sections this project actually has, in page order. Collecting them
   * as data first (rather than inlining each in the JSX) is what lets the
   * background band alternate: a project declares a different number of
   * sections depending on what it has to say, so the tint has to come from
   * a section's position in THIS list, which is only known once the list is
   * filtered.
   */
  const sections: {
    file: string;
    title: string;
    description?: string;
    body: React.ReactNode;
  }[] = [
    {
      file: 'tech-stack.json',
      title: 'Tech Stack',
      body: (
        <>
          <LanguageBar languages={study.languages} />
          <TechStackSection groups={study.techStack} />
        </>
      ),
    },
  ];

  if (study.overview && study.overview.length > 0) {
    sections.push({
      file: 'overview.md',
      title: 'At a Glance',
      body: <OverviewSection items={study.overview} />,
    });
  }

  /*
   * Near the top on purpose: a reader who wants to try the build should not
   * have to scroll the whole write-up to find the link, and the banner's
   * copy of it is gone from the viewport by this point.
   */
  if (study.playable) {
    sections.push({
      file: 'play.md',
      title: 'Play It',
      description: 'The build runs in the browser — nothing to install.',
      body: <PlayDemoSection demo={study.playable} />,
    });
  }

  if (study.problem) {
    sections.push({
      file: 'why-built.md',
      title: 'Why I Built It',
      description:
        'The old version was a hand-coded static site. This rebuild makes it modular and gives me a deploy pipeline I control.',
      body: (
        <ProblemSection before={study.problem.before} after={study.problem.after} />
      ),
    });
  }

  /* Follows why-built: that section says what changed about the code, this
     one says what changed about the infrastructure under it. */
  if (study.architecture) {
    sections.push({
      file: 'architecture.md',
      title: 'Architecture',
      description:
        'What I planned to build on AWS, what I actually built, and why the two are different.',
      body: <ArchitectureSection content={study.architecture} />,
    });
  }

  if (study.impact && study.impact.length > 0) {
    sections.push({
      file: 'impact.json',
      title: 'Impact',
      description: 'What changed, measured against the old static site.',
      body: <ImpactSection stats={study.impact} />,
    });
  }

  if (study.roles && study.roles.length > 0) {
    sections.push({
      file: 'team.md',
      title: 'The Team',
      description: "A collaborative project — here's who built what.",
      body: <RolesSection roles={study.roles} />,
    });
  }

  if (study.controls && study.controls.length > 0) {
    sections.push({
      file: 'controls.md',
      title: 'Controls',
      body: <ControlsSection controls={study.controls} />,
    });
  }

  if (study.showcase && study.showcase.items.length > 0) {
    sections.push({
      file: 'showcase.tsx',
      title: study.showcase.title ?? 'Showcase',
      description: study.showcase.description,
      body: <ShowcaseSection items={study.showcase.items} />,
    });
  }

  if (study.features && study.features.length > 0) {
    sections.push({
      file: 'features.md',
      title: 'Key Features',
      body: <FeaturesSection features={study.features} />,
    });
  }

  if (study.document) {
    sections.push({
      file: 'report.pdf',
      title: 'Read the Report',
      description: 'The project write-up, previewed inline.',
      body: <PdfSection doc={study.document} />,
    });
  }

  if (study.gallery && study.gallery.items.length > 0) {
    sections.push({
      file: 'gallery.tsx',
      title: study.gallery.title ?? 'Gallery',
      description: study.gallery.description,
      body: <GallerySection items={study.gallery.items} />,
    });
  }

  if (study.lessons && study.lessons.length > 0) {
    sections.push({
      file: 'lessons.md',
      title: 'Lessons Learned',
      body: <LessonsSection lessons={study.lessons} />,
    });
  }

  return (
    <>
      <PageBanner file={`${slug}.md`} title={study.title} lede={study.summary}>
        {study.links && study.links.length > 0 && (
          <CaseStudyLinks links={study.links} />
        )}
      </PageBanner>

      {sections.map((section, index) => (
        <CaseStudySection
          key={section.file}
          file={section.file}
          title={section.title}
          description={section.description}
          /* Every other section is tinted, starting with the first. */
          alt={index % 2 === 0}
        >
          {section.body}
        </CaseStudySection>
      ))}

      {/* Closes the page back out to the rest of the work rather than
          ending on the last section's body. */}
      <section className="shell case-study-outro">
        <ActionLink href="/projects" variant="secondary">
          View All Projects
        </ActionLink>
      </section>
    </>
  );
}
