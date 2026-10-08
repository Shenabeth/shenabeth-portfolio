/*
 * File: ContactSection.tsx
 * Purpose: Contact section — IDE-style heading plus a two-column layout
 *          with a quick intro + direct links on the left and the message
 *          form on the right.
 */

import { ContactForm } from './ContactForm';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { SocialLinks } from '@/components/shared/SocialLinks';
import { CONTACT_EMAIL } from '@/config/constants';

/**
 * Contact section with IDE heading and framed two-column body.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="w-[min(92vw,1320px)] mx-auto py-28"
      style={{ scrollMarginTop: '7rem' }}
    >
      <SectionHeading
        kicker="// contact.json"
        title="Contact"
        comment="Looking for a software engineering role where I can keep growing — happy to chat about full-stack, AI systems, frontend, or cloud work."
      />

      <div
        className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-14 rounded-2xl border p-6 md:p-10"
        style={{
          borderColor: 'var(--line)',
          background: 'var(--surface)',
          boxShadow: '0 2rem 5rem rgba(0,0,0,0.28)',
        }}
      >
        {/* Left: direct contact info */}
        <div className="flex flex-col gap-7">
          <div>
            <p
              className="uppercase tracking-widest font-medium mb-3"
              style={{
                color: 'var(--accent-secondary-bright)',
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.78rem',
              }}
            >
              Reach me directly
            </p>
            <p
              className="font-medium leading-tight"
              style={{
                fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                letterSpacing: '-0.035em',
                color: 'var(--text)',
              }}
            >
              The fastest way to get in touch is email or LinkedIn.
            </p>
          </div>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-3 group self-start"
            style={{
              color: 'var(--text)',
              fontFamily: '"DM Mono", monospace',
              fontSize: '1rem',
              paddingBottom: '0.4rem',
              borderBottom: '1px dashed var(--line-strong)',
            }}
          >
            <span style={{ color: 'var(--accent-bright)' }}>›</span>
            {CONTACT_EMAIL}
          </a>

          <div>
            <p
              className="uppercase tracking-widest font-medium mb-3"
              style={{
                color: 'var(--muted)',
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.72rem',
              }}
            >
              Or find me on
            </p>
            <SocialLinks />
          </div>
        </div>

        {/* Right: form */}
        <ContactForm />
      </div>
    </section>
  );
}
