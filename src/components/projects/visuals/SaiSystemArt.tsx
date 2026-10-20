/*
 * File: SaiSystemArt.tsx
 * Purpose: Hand-built illustration for the SAI System card. Depicts the
 *          product's core idea — specialized AI agents that each "stay in their
 *          lane" — as an app window with a row of specialist agent tiles, a
 *          bring-your-own-key chip, and a short chat exchange. All copy is drawn
 *          as graphical bars, never live text, so nothing sits as text on the
 *          card image. Drawn in the site's tokens as a single scalable SVG.
 */

/**
 * SVG depiction of the SAI System agent workspace.
 *
 * @returns Scalable illustration node
 */
export function SaiSystemArt(): React.ReactElement {
  return (
    <svg
      className="project-visual-art"
      viewBox="0 0 640 440"
      role="img"
      aria-label="Preview of SAI System showing specialized AI agents and a chat"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sai-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b0f0e" />
          <stop offset="1" stopColor="#0f1512" />
        </linearGradient>
        <radialGradient id="sai-glow" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#33af87" stopOpacity="0.28" />
          <stop offset="1" stopColor="#33af87" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* App frame */}
      <rect x="0" y="0" width="640" height="440" rx="14" fill="#0d1210" />
      <rect x="0" y="0" width="640" height="40" rx="14" fill="#111715" />
      <rect x="0" y="26" width="640" height="14" fill="#111715" />
      <circle cx="26" cy="20" r="5" fill="#2a332f" />
      <circle cx="46" cy="20" r="5" fill="#2a332f" />
      <circle cx="66" cy="20" r="5" fill="#2a332f" />
      <rect x="92" y="16" width="72" height="5" rx="2.5" fill="#2a332f" />
      {/* BYO-key chip in the title bar */}
      <rect x="486" y="11" width="140" height="18" rx="9" fill="#0b0f0e" stroke="#2a332f" strokeWidth="1" />
      <circle cx="500" cy="20" r="3" fill="#54d5aa" />
      <rect x="510" y="17" width="104" height="5" rx="2.5" fill="#2a332f" />

      <rect x="0" y="40" width="640" height="400" fill="url(#sai-bg)" />
      <ellipse cx="320" cy="150" rx="280" ry="150" fill="url(#sai-glow)" />

      {/* Headline, drawn as graphical bars (no text on the image) */}
      <rect x="40" y="84" width="118" height="8" rx="4" fill="#f4d157" opacity="0.85" />
      <rect x="38" y="110" width="360" height="22" rx="6" fill="#edf5f1" />

      {/* Specialist agent tiles — labels drawn as bars (no text on the image) */}
      <g>
        {/* Forge — available */}
        <g transform="translate(40 160)">
          <rect width="132" height="92" rx="12" fill="#111715" stroke="#33af87" strokeWidth="1.5" />
          <circle cx="24" cy="28" r="12" fill="#0b0f0e" stroke="#33af87" strokeWidth="1.5" />
          <path d="M18 28 L30 28 M24 22 L24 34" stroke="#54d5aa" strokeWidth="2" />
          <rect x="46" y="22" width="48" height="10" rx="5" fill="#edf5f1" />
          <rect x="16" y="52" width="88" height="6" rx="3" fill="#8e9c95" />
          <rect x="16" y="66" width="70" height="6" rx="3" fill="#8e9c95" />
          <circle cx="118" cy="20" r="4" fill="#54d5aa" />
        </g>
        {/* Challenger — soon */}
        <g transform="translate(184 160)" opacity="0.8">
          <rect width="132" height="92" rx="12" fill="#0f1512" stroke="#2a332f" strokeWidth="1.5" />
          <circle cx="24" cy="28" r="12" fill="#0b0f0e" stroke="#2a332f" strokeWidth="1.5" />
          <rect x="46" y="22" width="64" height="10" rx="5" fill="#cdd6d1" />
          <rect x="16" y="52" width="60" height="6" rx="3" fill="#6f7d76" />
          <rect x="16" y="66" width="46" height="6" rx="3" fill="#6f7d76" />
          <circle cx="112" cy="16" r="3" fill="#d4af37" />
        </g>
        {/* Scout — soon */}
        <g transform="translate(328 160)" opacity="0.8">
          <rect width="132" height="92" rx="12" fill="#0f1512" stroke="#2a332f" strokeWidth="1.5" />
          <circle cx="24" cy="28" r="12" fill="#0b0f0e" stroke="#2a332f" strokeWidth="1.5" />
          <rect x="46" y="22" width="44" height="10" rx="5" fill="#cdd6d1" />
          <rect x="16" y="52" width="58" height="6" rx="3" fill="#6f7d76" />
          <rect x="16" y="66" width="40" height="6" rx="3" fill="#6f7d76" />
          <circle cx="112" cy="16" r="3" fill="#d4af37" />
        </g>
        {/* Pathfinder — soon */}
        <g transform="translate(472 160)" opacity="0.8">
          <rect width="128" height="92" rx="12" fill="#0f1512" stroke="#2a332f" strokeWidth="1.5" />
          <circle cx="24" cy="28" r="12" fill="#0b0f0e" stroke="#2a332f" strokeWidth="1.5" />
          <rect x="46" y="22" width="60" height="10" rx="5" fill="#cdd6d1" />
          <rect x="16" y="52" width="48" height="6" rx="3" fill="#6f7d76" />
          <rect x="16" y="66" width="44" height="6" rx="3" fill="#6f7d76" />
          <circle cx="110" cy="16" r="3" fill="#d4af37" />
        </g>
      </g>

      {/* Chat exchange — message lines drawn as bars (no text on the image) */}
      <g>
        {/* user bubble */}
        <rect x="40" y="278" width="300" height="34" rx="12" fill="#161d1a" />
        <rect x="56" y="291" width="224" height="7" rx="3.5" fill="#cdd6d1" opacity="0.8" />

        {/* agent reply bubble */}
        <rect x="300" y="326" width="300" height="76" rx="12" fill="#0f1512" stroke="#33af87" strokeWidth="1.2" />
        <rect x="316" y="340" width="40" height="7" rx="3.5" fill="#54d5aa" />
        <rect x="316" y="360" width="256" height="7" rx="3.5" fill="#cdd6d1" opacity="0.8" />
        <rect x="316" y="376" width="240" height="7" rx="3.5" fill="#cdd6d1" opacity="0.8" />
        <rect x="316" y="392" width="180" height="7" rx="3.5" fill="#8e9c95" opacity="0.8" />
      </g>
    </svg>
  );
}
