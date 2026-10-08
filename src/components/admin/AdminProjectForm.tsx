/*
 * File: AdminProjectForm.tsx
 * Purpose: The "new project" form for the admin dashboard. It mirrors the
 *          CaseStudy template so creating a project page is a matter of filling
 *          in fields — title, summary, tech stack, and which optional sections
 *          to include. A live preview lists the case-study sections the entry
 *          would render on /projects/[slug]. Submission does not persist yet
 *          (no backend); when storage is wired, this writes a CaseStudy entry.
 */

'use client';

import { useState } from 'react';

/** The optional case-study sections an admin can toggle for a project. */
const OPTIONAL_SECTIONS: Array<{ key: string; label: string; always?: boolean }> = [
  { key: 'tech-stack', label: 'Tech stack + languages bar', always: true },
  { key: 'why-built', label: 'Why I built it (before / after)' },
  { key: 'impact', label: 'Impact (stat tiles)' },
  { key: 'features', label: 'Key features' },
  { key: 'lessons', label: 'Lessons learned' },
];

/**
 * Turn a project title into a url slug (lowercase, hyphenated).
 *
 * @param title - Human-readable project title
 * @returns Slug suitable for /projects/[slug]
 */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const labelStyle: React.CSSProperties = {
  color: 'var(--muted)',
  fontFamily: '"DM Mono", monospace',
  fontSize: '0.72rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: '0.6rem',
  border: '1px solid var(--line-strong)',
  background: 'var(--ink-soft)',
  color: 'var(--text)',
  padding: '0.6rem 0.8rem',
  fontSize: '0.9rem',
};

export function AdminProjectForm() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [sections, setSections] = useState<Record<string, boolean>>({
    'tech-stack': true,
    'why-built': true,
    impact: false,
    features: true,
    lessons: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const slug = title ? slugify(title) : '';
  const activeSections = OPTIONAL_SECTIONS.filter((s) => s.always || sections[s.key]);

  const toggleSection = (key: string): void => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border p-6"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
    >
      <div>
        <label htmlFor="proj-title" className="block mb-2 uppercase tracking-widest" style={labelStyle}>
          Title
        </label>
        <input
          id="proj-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSubmitted(false);
          }}
          placeholder="e.g. Weather Dashboard"
          style={inputStyle}
        />
        {slug && (
          <p className="mt-1.5" style={{ color: 'var(--muted)', fontFamily: '"DM Mono", monospace', fontSize: '0.72rem' }}>
            /projects/{slug}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="proj-summary" className="block mb-2 uppercase tracking-widest" style={labelStyle}>
          Summary
        </label>
        <textarea
          id="proj-summary"
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
            setSubmitted(false);
          }}
          placeholder="One or two sentences describing the project."
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-3 uppercase tracking-widest" style={labelStyle}>
          Sections to include
        </legend>
        <div className="flex flex-col gap-2.5">
          {OPTIONAL_SECTIONS.map((section) => (
            <label
              key={section.key}
              className="flex items-center gap-3 text-sm"
              style={{ color: section.always ? 'var(--muted)' : 'var(--text)', cursor: section.always ? 'default' : 'pointer' }}
            >
              <input
                type="checkbox"
                checked={section.always ? true : Boolean(sections[section.key])}
                disabled={section.always}
                onChange={() => toggleSection(section.key)}
                style={{ accentColor: 'var(--accent-bright)', width: '1rem', height: '1rem' }}
              />
              {section.label}
              {section.always && (
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.68rem', color: 'var(--muted)' }}>
                  (required)
                </span>
              )}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Live preview of the generated page outline */}
      <div
        className="rounded-xl border p-4"
        style={{ borderColor: 'var(--line)', background: 'var(--ink-soft)' }}
      >
        <p className="mb-2 uppercase tracking-widest" style={labelStyle}>
          Page preview
        </p>
        <p style={{ color: 'var(--text)', fontSize: '0.95rem', fontWeight: 600 }}>
          {title || 'Untitled project'}
        </p>
        <ol className="mt-2 flex flex-col gap-1" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {activeSections.map((section, i) => (
            <li
              key={section.key}
              style={{ color: 'var(--muted)', fontFamily: '"DM Mono", monospace', fontSize: '0.78rem' }}
            >
              {String(i + 1).padStart(2, '0')} / {section.key}
            </li>
          ))}
        </ol>
      </div>

      <button
        type="submit"
        className="primary-action sweep-button justify-center"
        style={{ padding: '0.7rem 1.4rem' }}
      >
        <span>Create project</span>
      </button>

      {submitted && (
        <p
          className="text-sm leading-relaxed rounded-lg p-3"
          style={{ color: 'var(--muted)', background: 'var(--ink-soft)', border: '1px solid var(--line)' }}
        >
          Saving isn&apos;t connected yet. Once storage is wired, this writes a case-study entry and{' '}
          <span style={{ fontFamily: '"DM Mono", monospace', color: 'var(--text)' }}>/projects/{slug || 'your-slug'}</span>{' '}
          renders the sections above automatically.
        </p>
      )}
    </form>
  );
}
