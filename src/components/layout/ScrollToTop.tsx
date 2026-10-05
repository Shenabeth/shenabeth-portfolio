'use client';

/*
 * File: ScrollToTop.tsx
 * Purpose: Force the window to the top whenever the route changes, unless
 * the new URL targets a hash anchor (e.g. /about#certifications) — in that
 * case scroll to the anchored element instead of resetting to the top.
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
