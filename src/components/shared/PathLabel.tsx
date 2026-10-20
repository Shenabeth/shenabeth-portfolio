/*
 * File: PathLabel.tsx
 * Purpose: The `~/portfolio/<file>` monospace label that sits above a
 *          section heading in the landing-page design. Shared by the
 *          landing page, the projects index, and the case-study pages so
 *          every route opens its sections the same way.
 *
 *          Backing CSS: `.section-label` in app/globals.css.
 */

interface PathLabelProps {
  /** The filename shown after the `~/portfolio/` prefix. */
  children: React.ReactNode;
}

/**
 * Render the pseudo-path label preceding a section heading.
 *
 * @param children - Filename text, e.g. "projects.tsx"
 */
export function PathLabel({ children }: PathLabelProps) {
  return (
    <div className="section-label">
      <span className="section-label__path">~/portfolio/{children}</span>
    </div>
  );
}
