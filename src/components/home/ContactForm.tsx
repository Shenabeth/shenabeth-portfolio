/*
 * File: ContactForm.tsx
 * Purpose: Contact form with validation and API submission
 */

'use client';

import { useState } from 'react';
import { sendContactEmail } from '@/lib/api';
import { validateEmail } from '@/lib/utils';

/**
 * Contact form with email validation and submission to API
 */
export function ContactForm(): JSX.Element {
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

    // Validation
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-slate-500 border border-slate-600 focus:border-slate-500 focus:outline-none"
          disabled={isLoading}
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-slate-500 border border-slate-600 focus:border-slate-500 focus:outline-none"
          disabled={isLoading}
        />
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message"
          rows={4}
          className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-slate-500 border border-slate-600 focus:border-slate-500 focus:outline-none resize-none"
          disabled={isLoading}
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-sm text-red-400">{error}</div>}

      {/* Success Message */}
      {success && <div className="text-sm text-green-400">Message sent successfully!</div>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-slate-700 text-white rounded hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 transition-colors font-medium"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
