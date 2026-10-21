/*
 * File: page.tsx
 * Purpose: The /projects index — the full list of work. Titled "All
 *          Projects" so it reads as distinct from the landing page's own
 *          "Projects" section. Uses the landing page's design language for
 *          its page banner, section labels, and project capability rows.
 */

import {
  MORE_PROJECTS,
  MORE_PROJECT_CAPABILITIES,
  PROJECT_CAPABILITIES,
} from '@/config/constants';
import { PageBanner } from '@/components/shared/PageBanner';
import { PathLabel } from '@/components/shared/PathLabel';
import { CapabilityRow } from '@/components/projects/CapabilityRow';

export const metadata = {
  title: 'All Projects — Shenabeth Jenkins',
  description:
    'Selected work: cloud infrastructure, full-stack applications, applied AI, and games.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageBanner
        file="all-projects.tsx"
        title="All Projects"
        lede="Ideas brought to life through strategy and a healthy obsession with detail."
      />

      <section className="section shell">
        <PathLabel>featured.tsx</PathLabel>
        <div className="section-heading">
          <h2>Featured Work</h2>
          <p>
            The three projects I would want to walk someone through: a rebuild, a
            platform, and a game that taught me more about scope than any of them.
          </p>
        </div>

        {/* The capability row, moved here from the landing page. Each card
            is one featured project under the discipline it demonstrates. */}
        <CapabilityRow
          items={PROJECT_CAPABILITIES}
          className="capability-grid--featured"
        />
      </section>

      {MORE_PROJECTS.length > 0 && (
        <section className="section section--more-projects">
          <div className="shell">
            <PathLabel>archive.tsx</PathLabel>
            <div className="section-heading">
              <h2>More Projects</h2>
              <p>
                Coursework and research projects that are smaller in scope but were worth
                writing up.
              </p>
            </div>

            {/* The same capability row again, with the two smaller
                projects — two cards, so the grid splits the width in
                halves rather than leaving a third slot empty. */}
            <CapabilityRow
              items={MORE_PROJECT_CAPABILITIES}
              className="capability-grid--featured"
            />
          </div>
        </section>
      )}
    </>
  );
}
