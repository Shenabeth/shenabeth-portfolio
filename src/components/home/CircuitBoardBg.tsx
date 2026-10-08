/*
 * File: CircuitBoardBg.tsx
 * Purpose: Full-bleed hero circuit-board background. The canonical
 *          hero-patterns `circuitBoard` SVG tiled across the hero with a
 *          soft gradient fade at the bottom so the section below blends
 *          in instead of the pattern cutting off hard.
 */

'use client';

import { circuitBoard } from 'hero-patterns';

// Hex literal, not a CSS var — hero-patterns bakes the color into an SVG
// data URI at call time, so this must be kept in sync with --accent-bright
// in app/globals.css if that token ever changes.
const TRACE_COLOR = '#54d5aa';
const TRACE_OPACITY = 0.35;

/**
 * Renders the full-bleed hero circuit-board background. The tiled
 * pattern layer owns the bottom mask-fade (via `.hero-circuit-bg-pattern`
 * in globals.css) so the pattern dissolves to transparent at the bottom
 * instead of blending to a solid color.
 */
export function CircuitBoardBg() {
  return (
    <div className="hero-circuit-bg" aria-hidden="true">
      <div
        className="hero-circuit-bg-pattern"
        style={{ backgroundImage: circuitBoard(TRACE_COLOR, TRACE_OPACITY) }}
      />
    </div>
  );
}
