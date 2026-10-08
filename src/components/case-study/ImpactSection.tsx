/*
 * File: ImpactSection.tsx
 * Purpose: Grid of impact stats for a case study. Each stat animates its
 *          numeric value counting up when the tile scrolls into view.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export interface ImpactStat {
  value: string;
  numeric?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
}

interface ImpactSectionProps {
  stats: ImpactStat[];
}

/**
 * Count a numeric value up from 0 to target when `active` is true.
 *
 * @param target - Final numeric value
 * @param active - Whether to begin counting
 * @param durationMs - Total animation duration
 * @returns Current count value as an integer
 */
function useCountUp(target: number, active: boolean, durationMs = 1200): number {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      const id = setTimeout(() => setValue(target), 0);
      return () => clearTimeout(id);
    }
    const start = performance.now();
    let raf = 0;
    const step = (now: number): void => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, durationMs]);

  return value;
}

interface StatTileProps {
  stat: ImpactStat;
  index: number;
}

/**
 * Individual stat tile with scroll-in reveal and optional count-up.
 */
function StatTile({ stat, index }: StatTileProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const n = useCountUp(stat.numeric ?? 0, inView && stat.numeric !== undefined);
  const display = stat.numeric !== undefined
    ? `${stat.prefix ?? ''}${n}${stat.suffix ?? ''}`
    : stat.value;

  return (
    <motion.div
      ref={ref}
      className="impact-tile"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <p className="impact-tile-value">{display}</p>
      <p className="impact-tile-label">{stat.label}</p>
      <p className="impact-tile-description">{stat.description}</p>
    </motion.div>
  );
}

/**
 * Grid of impact stats.
 *
 * @param stats - Metrics to display
 * @returns Responsive stat grid
 */
export function ImpactSection({ stats }: ImpactSectionProps): React.ReactElement {
  return (
    <div className="balanced-grid impact-grid" data-count={stats.length}>
      {stats.map((stat, i) => (
        <StatTile key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  );
}
