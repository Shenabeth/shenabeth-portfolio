/*
 * File: page.tsx
 * Purpose: Admin login screen (/admin/login). This is the private entry point
 *          for the planned admin panel, where new project pages will be created
 *          from the case-study template. Authentication is not wired to a
 *          backend yet, so the form validates input and shows an honest notice
 *          on submit. The UI is complete so wiring auth later is a drop-in.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { validateEmail } from '@/lib/utils';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    // Auth backend isn't connected yet. Rather than fake a login, say so.
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      setNotice('Admin sign-in isn’t connected yet. This panel is where new project pages will be created from the case-study template.');
    }, 500);
  };

  return (
    <div className="w-[min(92vw,30rem)] mx-auto py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="text-center mb-8">
          <span
            className="inline-flex items-center justify-center rounded-2xl border mb-5"
            style={{
              width: '3.25rem',
              height: '3.25rem',
              borderColor: 'var(--line-strong)',
              background: 'var(--ink-soft)',
              color: 'var(--accent-bright)',
            }}
          >
            <Lock size={22} aria-hidden="true" />
          </span>
          <p
            className="uppercase tracking-widest mb-2"
            style={{
              color: 'var(--accent-secondary-bright)',
              fontFamily: 'var(--mono)',
              fontSize: '0.72rem',
            }}
          >
            {'// admin'}
          </p>
          <h1
            className="font-semibold leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', letterSpacing: '-0.03em', color: 'var(--text)' }}
          >
            Sign in
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border p-6 md:p-8"
          style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
        >
          <div>
            <label
              htmlFor="admin-email"
              className="block mb-2 uppercase tracking-widest"
              style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}
            >
              Email
            </label>
            <Input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block mb-2 uppercase tracking-widest"
              style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}
            >
              Password
            </label>
            <Input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="text-sm font-medium" style={{ color: 'var(--destructive)' }}>
              {error}
            </p>
          )}
          {notice && (
            <p
              className="text-sm leading-relaxed rounded-lg p-3"
              style={{ color: 'var(--muted)', background: 'var(--ink-soft)', border: '1px solid var(--line)' }}
            >
              {notice}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="primary-action sweep-button justify-center"
            style={{ padding: '0.75rem 1.4rem' }}
          >
            <span>{isLoading ? 'Signing in…' : 'Sign in'}</span>
          </button>
        </form>

        <p className="text-center mt-6">
          <Link
            href="/"
            className="text-sm transition-colors"
            style={{ color: 'var(--muted)' }}
          >
            ← Back to site
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
