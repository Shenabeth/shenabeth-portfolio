import React from 'react';
/*
 * File: ContactSection.tsx
 * Purpose: Contact section wrapper with heading and contact form
 */

import { ContactForm } from './ContactForm';

/**
 * Display contact section with heading and contact form
 */
export function ContactSection() {
  return (
    <section id="contact" className="container-main py-20 bg-card/50">
      <div className="content-width mx-auto">
        <h2 className="text-foreground mb-4 text-center">Get in Touch</h2>
        <p className="text-muted-foreground text-center mb-12 text-lg">Have a question or want to collaborate? Send me a message!</p>

        {/* Center the form */}
        <div className="flex justify-center">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
