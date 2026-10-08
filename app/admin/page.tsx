/*
 * File: page.tsx
 * Purpose: Admin dashboard (/admin). The home of the planned admin panel: it
 *          lists the existing projects and provides the "new project" form that
 *          mirrors the case-study template, so adding a project is filling in a
 *          template rather than writing a page. Nothing persists yet (no
 *          backend), so the form shows a preview of the case-study sections the
 *          entry would produce. When auth + storage are wired, this form writes
 *          a new CaseStudy entry and the /projects/[slug] route renders it.
 */

import Link from 'next/link';
import { FEATURED_PROJECTS } from '@/config/constants';
import { AdminProjectForm } from '@/components/admin/AdminProjectForm';
import { PageTitleBanner } from '@/components/shared/PageTitleBanner';

export default function AdminDashboardPage() {
  return (
    <div className="pb-16">
      <div className="w-[min(92vw,1320px)] mx-auto" style={{ marginBottom: '2rem' }}>
        <PageTitleBanner
          kicker="// admin"
          title="Dashboard"
          comment="Create and manage project pages. New projects are built from the shared case-study template — fill in the fields and a full project page is generated."
        />
      </div>

      <div className="w-[min(92vw,1320px)] mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10">
        {/* Existing projects */}
        <section>
          <h2
            className="font-semibold mb-5"
            style={{ fontSize: '1.3rem', letterSpacing: '-0.02em', color: 'var(--text)' }}
          >
            Existing projects
          </h2>
          <ul className="flex flex-col gap-3">
            {FEATURED_PROJECTS.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between gap-4 rounded-xl border p-4"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
              >
                <div>
                  <p className="font-medium" style={{ color: 'var(--text)' }}>
                    {project.title}
                  </p>
                  <p
                    style={{
                      color: 'var(--muted)',
                      fontFamily: '"DM Mono", monospace',
                      fontSize: '0.75rem',
                    }}
                  >
                    /projects/{project.id}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs"
                    style={{
                      borderColor: 'var(--line-strong)',
                      color: project.status === 'live' ? 'var(--accent-bright)' : 'var(--muted)',
                      fontFamily: '"DM Mono", monospace',
                    }}
                  >
                    {project.status ?? 'draft'}
                  </span>
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--muted)' }}
                  >
                    View →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* New project form (template) */}
        <section>
          <h2
            className="font-semibold mb-5"
            style={{ fontSize: '1.3rem', letterSpacing: '-0.02em', color: 'var(--text)' }}
          >
            New project
          </h2>
          <AdminProjectForm />
        </section>
      </div>
    </div>
  );
}
