/*
 * File: hero-patterns.d.ts
 * Purpose: Ambient module declaration for the hero-patterns npm package,
 *          which ships without bundled TypeScript types. Each exported
 *          pattern function takes (fillColor, fillOpacity) and returns a
 *          CSS-ready `url('data:image/svg+xml,...')` string.
 */

declare module 'hero-patterns' {
  export function circuitBoard(fillColor?: string, fillOpacity?: number): string;
}
