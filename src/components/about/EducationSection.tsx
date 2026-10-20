/*
 * File: EducationSection.tsx
 * Purpose: Education timeline card. Modeled on a compact "timeline, most
 *          recent first" layout — vertical gold rail with timestamped
 *          nodes, each row stacking tag chip, degree, school, and
 *          location. Replaces the previous side-by-side chip cards.
 */

import { EDUCATION } from '@/config/constants';
import { SectionHeading } from '@/components/shared/SectionHeading';

const GREEN = 'var(--accent-bright)';
const GREEN_MUTED = 'rgba(84,213,170,0.55)';
const GOLD = 'var(--accent-secondary-bright)';
const GOLD_MUTED = 'rgba(212,175,55,0.6)';

const DOT_SIZE = '0.85rem';

/**
 * Education timeline — vertical rail with one node per credential,
 * ordered most recent first. Gold accent runs throughout (rail, dots,
 * tag text).
 */
export function EducationSection() {
  return (
    <section className="py-28">
      <SectionHeading
        kicker="// education.json"
        title="Education"
        comment="Formal coursework and credentials behind the systems I build."
      />

      {/* Constrain the card to a professional width — the surrounding
          page container is 1320px wide, which makes a two-entry timeline
          look stretched and sparse. Cap at ~44rem and center. */}
      <div
        className="relative border p-6 md:p-9 mx-auto"
        style={{
          borderColor: 'var(--line)',
          background: 'var(--surface)',
          maxWidth: '44rem',
        }}
      >
        <div className="mb-8">
          <p
            className="uppercase tracking-widest font-medium mb-3"
            style={{
              color: GOLD,
              fontFamily: 'var(--mono)',
              fontSize: '0.85rem',
            }}
          >
            Education · {EDUCATION.length} {EDUCATION.length === 1 ? 'degree' : 'degrees'}
          </p>
          <h3
            className="font-semibold leading-tight"
            style={{
              fontSize: 'clamp(1.75rem, 2.8vw, 2.1rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            Shenabeth Jenkins
          </h3>
          <p
            className="mt-2"
            style={{
              color: 'var(--muted)',
              fontSize: '0.95rem',
              lineHeight: 1.5,
            }}
          >
            Software Developer &amp; Cloud Architect
          </p>
        </div>

        {/*
          Timeline: vertical rail with one node per entry.
          Layout approach — the rail and node dots sit in the ol's left
          padding gutter (NOT inside the li content box), so text can
          never cross the rail. The ol is position:relative so the rail
          anchors to it; the dot in each li uses the li's own
          position:relative but is shifted left into the gutter via a
          negative left value equal to (gutter width − half the dot).
        */}
        <ol
          className="relative"
          style={{
            paddingLeft: '2rem',
            margin: 0,
            listStyle: 'none',
          }}
        >
          {/* Single rail spanning the full list, drawn once in the gutter. */}
          <span
            aria-hidden="true"
            className="absolute"
            style={{
              left: '0.55rem',
              top: '0.4rem',
              bottom: '0.4rem',
              width: '2px',
              background: GREEN_MUTED,
              borderRadius: '1px',
            }}
          />

          {EDUCATION.map((entry, idx) => {
            const isLast = idx === EDUCATION.length - 1;
            return (
              <li
                key={entry.degree}
                className="relative"
                style={{
                  paddingBottom: isLast ? 0 : '2.25rem',
                }}
              >
                {/* Node dot: hollow ring, sits in the ol's left padding
                    gutter so it never overlaps text. Left value =
                    −(2rem gutter) + (0.55rem rail offset) − (dot/2) +
                    (rail width/2). Simplified: shift fully into the
                    gutter column centered on the rail. */}
                <span
                  aria-hidden="true"
                  className="absolute rounded-full"
                  style={{
                    left: `calc(-2rem + 0.55rem + 1px - ${DOT_SIZE} / 2)`,
                    top: '0.4rem',
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    border: `2px solid ${GREEN}`,
                    background: 'var(--surface)',
                    boxShadow: `0 0 8px rgba(84,213,170,0.55)`,
                  }}
                />

                {/* Tag chip */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className="inline-flex items-center uppercase tracking-widest font-medium rounded-full border px-3 py-1"
                    style={{
                      borderColor: GREEN_MUTED,
                      color: GREEN,
                      fontFamily: 'var(--mono)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.1em',
                      lineHeight: 1,
                    }}
                  >
                    {entry.tag}
                  </span>
                </div>

                {/* Degree type (small eyebrow) */}
                <p
                  className="uppercase tracking-widest mb-1"
                  style={{
                    color: 'var(--muted)',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                  }}
                >
                  {entry.degree.split(' in ')[0] || entry.degree}
                </p>

                {/* Field of study (main title line) */}
                <h4
                  className="font-semibold leading-snug"
                  style={{
                    fontSize: 'clamp(1.15rem, 1.5vw, 1.35rem)',
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {entry.degree.includes(' in ')
                    ? entry.degree.split(' in ').slice(1).join(' in ')
                    : entry.degree}
                </h4>

                {entry.minor && (
                  <p
                    className="mb-1"
                    style={{
                      color: 'var(--muted)',
                      fontSize: '0.88rem',
                      fontStyle: 'italic',
                    }}
                  >
                    Minor in {entry.minor}
                  </p>
                )}

                {/* University + location */}
                <p
                  className="flex flex-wrap items-center gap-2"
                  style={{ fontSize: '0.95rem' }}
                >
                  <span style={{ color: 'var(--text)', fontWeight: 500 }}>{entry.university}</span>
                  {entry.location && (
                    <>
                      <span aria-hidden="true" style={{ color: GREEN }}>·</span>
                      <span style={{ color: 'var(--muted)' }}>{entry.location}</span>
                    </>
                  )}
                </p>
              </li>
            );
          })}
        </ol>

        <p
          className="mt-7 pt-4"
          style={{
            borderTop: `1px dashed ${GOLD_MUTED}`,
            color: 'var(--muted)',
            fontFamily: 'var(--mono)',
            fontSize: '0.85rem',
            letterSpacing: '0.06em',
          }}
        >
          Timeline — most recent first
        </p>
      </div>
    </section>
  );
}
