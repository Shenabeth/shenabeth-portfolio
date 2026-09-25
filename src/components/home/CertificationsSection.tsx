/*
 * File: CertificationsSection.tsx
 * Purpose: Display certifications in a responsive grid layout
 */

import { CERTIFICATIONS } from '@/config/constants';
import { CertificationBadge } from '@/components/shared/CertificationBadge';

/**
 * Display certifications in a responsive grid
 */
export function CertificationsSection(): JSX.Element {
  return (
    <section className="px-4 py-16 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Certifications</h2>

        {/* Grid layout: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <CertificationBadge
              key={cert.id}
              name={cert.name}
              issuer={cert.issuer}
              dateEarned={cert.dateEarned}
              credlyUrl={cert.credlyUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
