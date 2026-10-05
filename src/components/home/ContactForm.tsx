/*
 * File: ContactForm.tsx
 * Purpose: Contact form with validation and API submission
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendContactEmail } from '@/lib/api';
import { validateEmail } from '@/lib/utils';

/**
 * Contact form with email validation and submission to API
 */
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
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md w-full">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
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

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
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

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message"
          rows={4}
          disabled={isLoading}
          className="resize-none"
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-sm text-destructive font-medium">{error}</div>}

      {/* Success Message */}
      {success && <div className="text-sm text-primary font-medium">Message sent successfully!</div>}

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
