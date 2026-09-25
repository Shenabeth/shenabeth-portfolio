import React from 'react';
/*
 * File: Footer.tsx
 * Purpose: Footer with social links and admin link
 */

import Link from 'next/link';
import { SocialLinks } from '@/components/shared/SocialLinks';

/**
 * Footer with name, social links, contact link, and admin link
 */
export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="px-4 md:px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Name */}
          <div className="text-slate-300 font-medium">Shenabeth Jenkins</div>

          {/* Right: Social links and contact */}
          <div className="flex items-center gap-6">
            <SocialLinks className="gap-6" />
            <Link
              href="#contact"
              className="text-slate-300 hover:text-white transition-colors text-sm"
            >
              Contact
            </Link>
            <Link
              href="/admin/login"
              className="text-slate-500 hover:text-slate-400 transition-colors text-xs"
              aria-label="Admin login"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
