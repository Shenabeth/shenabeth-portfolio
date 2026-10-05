/*
 * File: AboutStrip.tsx
 * Purpose: Decorative strip with design principles (between hero and projects)
 */

export function AboutStrip() {
  return (
    <div
      className="flex items-center justify-center gap-14 min-h-32 px-4 py-8 overflow-hidden md:overflow-visible whitespace-nowrap md:whitespace-normal justify-start md:justify-center"
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        color: 'var(--muted)',
        fontFamily: '"DM Mono", monospace',
        fontSize: 'clamp(0.65rem, 1.2vw, 0.82rem)',
        textTransform: 'uppercase',
        letterSpacing: '0.11em',
        paddingInline: '1rem',
      }}
    >
      <span>Design With Intent</span>
      <i
        className="hidden md:inline-block w-1 h-1 rounded-full flex-shrink-0"
        style={{ background: 'var(--accent)' }}
      />
      <span>Build With Care</span>
      <i
        className="hidden md:inline-block w-1 h-1 rounded-full flex-shrink-0"
        style={{ background: 'var(--accent)' }}
      />
      <span>Learn Relentlessly</span>
    </div>
  );
}
