/*
 * File: api.ts
 * Purpose: Client-side API helpers. The site is a static Amplify build with
 *          no custom backend, so the only live endpoint is the contact form,
 *          which posts to the same-origin Next.js route handler at
 *          /api/contact. Add future client calls here as the API grows.
 */

import { ContactFormData } from '@/types';

/**
 * Submit the contact form to the same-origin /api/contact route handler.
 *
 * @param data - Contact form fields (name, email, message)
 * @returns Resolves on success; throws an Error with the server message otherwise
 */
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? 'Failed to send message');
  }
}
