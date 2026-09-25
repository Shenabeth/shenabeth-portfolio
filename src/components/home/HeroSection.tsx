/*
 * File: HeroSection.tsx
 * Purpose: Landing page hero section with name, tagline, avatar, and action buttons
 */

'use client';

import Link from 'next/link';
import { SocialLinks } from '@/components/shared/SocialLinks';

/**
 * Display hero section with introduction, social links, and action buttons
 */
export function HeroSection() {
  const handleContactScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side: Text content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Shenabeth Jenkins
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Full-stack engineer building on AWS
            </p>

            {/* Social Links */}
            <div className="mb-8">
              <SocialLinks />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/resume.pdf"
                download="resume.pdf"
                className="inline-block px-6 py-3 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors text-center"
              >
                Resume
              </a>
              <a
                href="#contact"
                onClick={handleContactScroll}
                className="inline-block px-6 py-3 border border-slate-600 text-slate-300 rounded hover:border-slate-500 hover:text-white transition-colors text-center"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Right side: Avatar placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-slate-500 text-sm">Avatar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
