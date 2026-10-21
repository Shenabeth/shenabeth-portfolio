/*
 * File: figure-caption.ts
 * Purpose: Splits a figure caption such as "Figure 3. Testing turrets." into its
 *          label ("Figure 3.") and the rest, so the label can be styled apart
 *          from the description. Captions without a leading label pass through.
 */

/**
 * Split a caption into its leading "Figure N." label and the remaining text.
 *
 * @param caption - Full caption text from the case-study config
 * @returns The label (empty when absent) and the rest of the caption
 */
export function splitFigureCaption(caption: string): { label: string; rest: string } {
  const match = /^(Figure \d+\.)\s*(.*)$/.exec(caption);
  return match ? { label: match[1], rest: match[2] } : { label: '', rest: caption };
}
