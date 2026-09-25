/*
 * File: ContactSection.tsx
 * Purpose: Contact section wrapper with heading and contact form
 */

import { ContactForm } from './ContactForm';

/**
 * Display contact section with heading and contact form
 */
export function ContactSection(): JSX.Element {
  return (
    <section id="contact" className="px-4 py-16 bg-slate-800">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Get in Touch</h2>
        <p className="text-slate-300 text-center mb-8">Have a question or want to collaborate? Send me a message!</p>

        {/* Center the form */}
        <div className="flex justify-center">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
