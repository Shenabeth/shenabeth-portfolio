/*
 * File: page.tsx
 * Purpose: Dynamic case study route /projects/[slug]. Looks up the slug
 *          in the case-studies config and composes the modular sections
 *          each project declares, in a fixed order (tech stack, overview,
 *          play, controls, why-built, architecture, impact, team, showcase,
 *          features, gallery, lessons). A project only renders the sections
 *          it provides, so a
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
import { ArrowUpRight } from 'lucide-react';
import { PageBanner } from '@/components/shared/PageBanner';
import { ActionLink } from '@/components/shared/ActionLink';
import { getCaseStudy, getAllCaseStudySlugs } from '@/config/case-studies';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

/** True for an off-site URL, so the link opens in a new tab. */
function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
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

  /* Directly under "Play It": a reader who just opened the build needs the
     keys next, not after the whole write-up. */
  if (study.controls && study.controls.length > 0) {
    sections.push({
      file: 'controls.md',
      title: 'Controls',
      body: <ControlsSection controls={study.controls} />,
    });
  }

  if (study.problem) {
    sections.push({
      file: 'why-built.md',
      title: 'Why I Built It',
      description:
        'The old version was a hand-coded static site. The rebuild makes it modular and runs on a deploy pipeline that is fully controlled.',
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
        'The AWS design that was planned, the one that shipped, and why they are different.',
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

  if (study.features && study.features.length > 0) {
    sections.push({
      file: 'features.md',
      title: 'Key Features',
      body: <FeaturesSection features={study.features} />,
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

  /*
   * The closing card offers a live-demo button, but only for projects that
   * actually have a runnable build. A project's links can include a writeup
   * ("View Project") that is not a demo, so match on the label: "demo" or
   * "play" marks a real live/playable build. Each project keeps its own link.
   */
  const demoLink = study.links?.find((l) =>
    /demo|play/i.test(l.label),
  );

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
          ending on the last section's body. A small bordered card so the
          links do not float alone in empty space. The live-demo button only
          appears for projects that actually have a demo to view, and points
          at that project's own demo. */}
      <section className="shell case-study-outro">
        <div className="case-study-outro-card">
          <h2 className="case-study-outro-title">
            {demoLink ? 'Try It, Or Keep Exploring' : 'Keep Exploring'}
          </h2>
          <p className="case-study-outro-text">
            {demoLink
              ? 'Open the live build, or head back to the full list of work.'
              : 'Head back to the full list of work.'}
          </p>
          <div className="case-study-outro-actions">
            {demoLink && (
              <ActionLink href={demoLink.href} external={isExternal(demoLink.href)}>
                {demoLink.label} <ArrowUpRight />
              </ActionLink>
            )}
            <ActionLink href="/projects" variant="secondary">
              View All Projects
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
