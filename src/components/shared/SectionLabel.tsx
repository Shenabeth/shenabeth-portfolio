/*
 * File: SectionLabel.tsx
 * Purpose: Numbered terminal-style section label used above each homepage
 *          section heading — a boxed index ("01") beside a monospace
 *          pseudo-path ("~/portfolio/selected-work.tsx").
 */

interface SectionLabelProps {
  /** Two-digit section index, e.g. "01". */
  index: string;
  /** The filename shown after the ~/portfolio/ prefix. */
  file: string;
}

/**
 * Renders the numbered path label that precedes a section heading.
 *
 * @param index - Two-digit section index
 * @param file - Pseudo-filename for the section
 */
export function SectionLabel({ index, file }: SectionLabelProps) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span className="section-label__path">~/portfolio/{file}</span>
    </div>
  );
}
