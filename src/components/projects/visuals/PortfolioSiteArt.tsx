/*
 * File: PortfolioSiteArt.tsx
 * Purpose: Hand-built illustration of this portfolio site, used as the
 *          Portfolio Site card's visual. It draws a browser window framing the
 *          site's actual hero — a two-line wordmark (second line outlined, as on
 *          the real page), a role line, the Resume / Let's Talk actions, and a
 *          hint of the circuit-board motif with the CPU chip. All copy is drawn
 *          as graphical bars, never live text, so nothing sits as text on the
 *          card image. Rendered as a single SVG that scales to fill its frame.
 */

/**
 * SVG depiction of the portfolio's hero inside a browser chrome.
 *
 * @returns Scalable illustration node
 */
export function PortfolioSiteArt(): React.ReactElement {
  return (
    <svg
      className="project-visual-art"
      viewBox="0 0 640 440"
      role="img"
      aria-label="Preview of the portfolio site showing the Shenabeth Jenkins hero"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Page background wash */}
        <linearGradient id="pf-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b0f0e" />
          <stop offset="1" stopColor="#0f1512" />
        </linearGradient>
        {/* Accent glow behind the chip */}
        <radialGradient id="pf-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#33af87" stopOpacity="0.5" />
          <stop offset="1" stopColor="#33af87" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pf-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#161d1a" />
          <stop offset="1" stopColor="#0d1210" />
        </linearGradient>
      </defs>

      {/* Browser frame */}
      <rect x="0" y="0" width="640" height="440" rx="14" fill="#0d1210" />
      <rect x="0" y="0" width="640" height="40" rx="14" fill="#111715" />
      <rect x="0" y="26" width="640" height="14" fill="#111715" />
      <circle cx="26" cy="20" r="5" fill="#2a332f" />
      <circle cx="46" cy="20" r="5" fill="#2a332f" />
      <circle cx="66" cy="20" r="5" fill="#2a332f" />
      <rect x="92" y="12" width="300" height="16" rx="8" fill="#0b0f0e" />
      <rect x="108" y="18" width="92" height="4" rx="2" fill="#2a332f" />

      {/* Page canvas */}
      <rect x="0" y="40" width="640" height="400" fill="url(#pf-bg)" />

      {/* Faint circuit traces, bottom-right, echoing the real hero background */}
      <g stroke="#1c2724" strokeWidth="1.5" fill="none" opacity="0.9">
        <path d="M400 300 H470 V360 H540" />
        <path d="M430 300 V250 H520" />
        <path d="M470 360 V410" />
        <path d="M540 360 H600" />
        <path d="M520 250 V210 H600" />
      </g>
      <g fill="#33af87" opacity="0.75">
        <circle cx="400" cy="300" r="3" />
        <circle cx="470" cy="360" r="3" />
        <circle cx="540" cy="360" r="3" />
        <circle cx="520" cy="250" r="3" />
      </g>

      {/* CPU chip, upper-right, with accent glow */}
      <circle cx="516" cy="150" r="96" fill="url(#pf-glow)" />
      <g transform="translate(468 102)">
        <rect x="0" y="0" width="96" height="96" rx="12" fill="url(#pf-chip)" stroke="#2a332f" strokeWidth="1.5" />
        <rect x="18" y="18" width="60" height="60" rx="7" fill="#0b0f0e" stroke="#33af87" strokeWidth="1.5" />
        {/* chip pins */}
        <g fill="#2a332f">
          <rect x="24" y="-6" width="5" height="8" rx="1" />
          <rect x="45" y="-6" width="5" height="8" rx="1" />
          <rect x="66" y="-6" width="5" height="8" rx="1" />
          <rect x="24" y="94" width="5" height="8" rx="1" />
          <rect x="45" y="94" width="5" height="8" rx="1" />
          <rect x="66" y="94" width="5" height="8" rx="1" />
          <rect x="-6" y="24" width="8" height="5" rx="1" />
          <rect x="-6" y="45" width="8" height="5" rx="1" />
          <rect x="-6" y="66" width="8" height="5" rx="1" />
          <rect x="94" y="24" width="8" height="5" rx="1" />
          <rect x="94" y="45" width="8" height="5" rx="1" />
          <rect x="94" y="66" width="8" height="5" rx="1" />
        </g>
        {/* robot face hint */}
        <circle cx="36" cy="44" r="5" fill="#54d5aa" />
        <circle cx="60" cy="44" r="5" fill="#54d5aa" />
        <rect x="38" y="60" width="20" height="4" rx="2" fill="#33af87" />
      </g>

      {/* Hero copy, drawn as graphical bars (no text on the image) */}
      {/* kicker */}
      <rect x="48" y="104" width="90" height="8" rx="4" fill="#f4d157" opacity="0.85" />

      {/* Wordmark line 1 — solid */}
      <rect x="46" y="140" width="262" height="30" rx="6" fill="#edf5f1" />
      {/* Wordmark line 2 — outlined, echoing the real "Jenkins" treatment */}
      <rect x="46" y="200" width="206" height="30" rx="6" fill="#0d1210" stroke="#edf5f1" strokeWidth="1.5" />

      {/* role line */}
      <rect x="48" y="282" width="236" height="8" rx="4" fill="#54d5aa" opacity="0.85" />

      {/* Action buttons (shapes only) */}
      <g>
        <rect x="48" y="322" width="118" height="38" rx="19" fill="#33af87" />
        <rect x="90" y="337" width="34" height="8" rx="4" fill="#08110b" opacity="0.7" />
        <rect x="178" y="322" width="118" height="38" rx="19" fill="none" stroke="#54d5aa" strokeWidth="1.5" />
        <rect x="214" y="337" width="46" height="8" rx="4" fill="#54d5aa" opacity="0.7" />
      </g>
    </svg>
  );
}
