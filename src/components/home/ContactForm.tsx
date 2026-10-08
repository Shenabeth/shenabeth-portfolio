/*
 * File: ContactForm.tsx
 * Purpose: Contact form with validation and API submission. Name + email
 *          share a row on wider viewports; message expands below.
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendContactEmail } from '@/lib/api';
import { validateEmail } from '@/lib/utils';

/** Contact form with email validation and submission to API. */
export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!formData.message.trim()) {
      setError('Message is required');
      return;
    }

    setIsLoading(true);
    try {
      await sendContactEmail(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 uppercase tracking-widest"
            style={{
              color: 'var(--muted)',
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.72rem',
            }}
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 uppercase tracking-widest"
            style={{
              color: 'var(--muted)',
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.72rem',
            }}
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block mb-2 uppercase tracking-widest"
          style={{
            color: 'var(--muted)',
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.72rem',
          }}
        >
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="What's on your mind?"
          rows={9}
          disabled={isLoading}
          className="resize-y"
          style={{ minHeight: '12rem' }}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm font-medium"
            style={{ color: 'var(--destructive)' }}
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: 'var(--accent-bright)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Message sent — thanks! I&apos;ll be in touch soon.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="primary-action sweep-button"
          style={{ padding: '0.7rem 1.4rem', fontSize: '0.82rem' }}
        >
          <span>{isLoading ? 'Sending…' : 'Send Message'}</span>
          {!isLoading && (
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
