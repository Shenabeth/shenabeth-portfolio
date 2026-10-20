/*
 * File: DogGameArt.tsx
 * Purpose: Hand-built illustration for the Dog Game card. Depicts the game's
 *          premise — a dog hero defending the last skyscraper from waves of
 *          cats with placed turrets — as a stylized game frame with a currency /
 *          wave HUD drawn as icons and pips (no text on the image). Drawn in the
 *          site's tokens as a single scalable SVG so it never distorts.
 */

/**
 * SVG depiction of the Dog Game tower-defense scene.
 *
 * @returns Scalable illustration node
 */
export function DogGameArt(): React.ReactElement {
  return (
    <svg
      className="project-visual-art"
      viewBox="0 0 640 440"
      role="img"
      aria-label="Preview of the Dog Game: a dog defending a tower from cats"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="dg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f1512" />
          <stop offset="1" stopColor="#0b0f0e" />
        </linearGradient>
        <linearGradient id="dg-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141b17" />
          <stop offset="1" stopColor="#0d1210" />
        </linearGradient>
        <radialGradient id="dg-moon" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f4d157" stopOpacity="0.5" />
          <stop offset="1" stopColor="#f4d157" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Scene frame */}
      <rect x="0" y="0" width="640" height="440" rx="14" fill="url(#dg-sky)" />

      {/* Moon glow */}
      <circle cx="120" cy="90" r="70" fill="url(#dg-moon)" />
      <circle cx="120" cy="90" r="26" fill="#f4d157" opacity="0.85" />

      {/* Distant ruined skyline */}
      <g fill="#10171400" stroke="#1c2724" strokeWidth="1.5">
        <rect x="360" y="150" width="40" height="150" fill="#101714" />
        <rect x="408" y="120" width="30" height="180" fill="#121a16" />
        <rect x="300" y="180" width="34" height="120" fill="#101714" />
      </g>

      {/* The last skyscraper (what Doge defends) */}
      <g>
        <rect x="470" y="70" width="86" height="236" rx="4" fill="#161d1a" stroke="#2a332f" strokeWidth="2" />
        {/* lit windows */}
        <g fill="#54d5aa" opacity="0.9">
          <rect x="484" y="92" width="14" height="14" rx="2" />
          <rect x="508" y="92" width="14" height="14" rx="2" />
          <rect x="532" y="92" width="14" height="14" rx="2" />
          <rect x="484" y="120" width="14" height="14" rx="2" />
          <rect x="532" y="120" width="14" height="14" rx="2" />
          <rect x="508" y="148" width="14" height="14" rx="2" />
          <rect x="484" y="176" width="14" height="14" rx="2" />
          <rect x="532" y="176" width="14" height="14" rx="2" />
        </g>
        <rect x="500" y="48" width="26" height="24" fill="#161d1a" stroke="#2a332f" strokeWidth="2" />
      </g>

      {/* Ground */}
      <rect x="0" y="300" width="640" height="140" fill="url(#dg-ground)" />
      <line x1="0" y1="300" x2="640" y2="300" stroke="#33af87" strokeWidth="1.5" opacity="0.5" />

      {/* Turret guarding the tower */}
      <g transform="translate(372 258)">
        <ellipse cx="22" cy="48" rx="30" ry="8" fill="#0b0f0e" />
        <rect x="6" y="26" width="32" height="24" rx="6" fill="#1b2420" stroke="#33af87" strokeWidth="1.5" />
        <circle cx="22" cy="24" r="12" fill="#161d1a" stroke="#33af87" strokeWidth="1.5" />
        <rect x="30" y="18" width="34" height="8" rx="3" fill="#2a332f" />
        {/* muzzle flash */}
        <circle cx="70" cy="22" r="5" fill="#f4d157" />
      </g>

      {/* Projectiles */}
      <g fill="#54d5aa">
        <circle cx="258" cy="276" r="4" />
        <circle cx="228" cy="278" r="3" />
        <circle cx="198" cy="280" r="2.5" />
      </g>

      {/* Doge, the hero dog */}
      <g transform="translate(96 250)">
        {/* body */}
        <ellipse cx="34" cy="56" rx="30" ry="8" fill="#0b0f0e" />
        <rect x="14" y="30" width="48" height="28" rx="12" fill="#d4af37" />
        {/* head */}
        <circle cx="20" cy="26" r="18" fill="#e0bb45" />
        {/* ears */}
        <path d="M6 14 L2 -2 L18 8 Z" fill="#c79f32" />
        <path d="M34 14 L40 0 L24 10 Z" fill="#c79f32" />
        {/* snout + eye */}
        <circle cx="10" cy="30" r="7" fill="#f0d98a" />
        <circle cx="8" cy="30" r="2.5" fill="#0b0f0e" />
        <circle cx="19" cy="22" r="2.5" fill="#0b0f0e" />
        {/* tail */}
        <path d="M60 36 Q78 26 72 10" stroke="#d4af37" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* legs */}
        <rect x="20" y="54" width="7" height="10" rx="3" fill="#c79f32" />
        <rect x="46" y="54" width="7" height="10" rx="3" fill="#c79f32" />
      </g>

      {/* Incoming cat enemies */}
      <g>
        <CatEnemy x={250} y={322} />
        <CatEnemy x={300} y={336} />
        <CatEnemy x={210} y={344} />
      </g>

      {/* HUD: bones (currency) + wave — drawn as icon + pips, no text */}
      <g>
        {/* bone icon */}
        <g transform="translate(28 30)" fill="#edf5f1">
          <circle cx="6" cy="6" r="5" />
          <circle cx="6" cy="14" r="5" />
          <circle cx="26" cy="6" r="5" />
          <circle cx="26" cy="14" r="5" />
          <rect x="6" y="7" width="20" height="6" />
        </g>
        {/* currency amount as a small bar */}
        <rect x="66" y="34" width="40" height="8" rx="4" fill="#edf5f1" opacity="0.85" />

        {/* wave gauge: filled pips showing progress */}
        <rect x="520" y="26" width="92" height="26" rx="13" fill="#0b0f0e" stroke="#33af87" strokeWidth="1.2" />
        <g>
          <circle cx="536" cy="39" r="3.5" fill="#54d5aa" />
          <circle cx="550" cy="39" r="3.5" fill="#54d5aa" />
          <circle cx="564" cy="39" r="3.5" fill="#54d5aa" />
          <circle cx="578" cy="39" r="3.5" fill="#2a332f" />
          <circle cx="592" cy="39" r="3.5" fill="#2a332f" />
        </g>
      </g>
    </svg>
  );
}

/**
 * A small stylized cat enemy, used for the advancing wave.
 *
 * @param x - Left offset in the scene's coordinate space
 * @param y - Top offset in the scene's coordinate space
 * @returns Cat glyph group
 */
function CatEnemy({ x, y }: { x: number; y: number }): React.ReactElement {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="14" cy="26" rx="16" ry="5" fill="#0b0f0e" />
      <rect x="2" y="12" width="24" height="14" rx="7" fill="#5a6b63" />
      <circle cx="8" cy="10" r="8" fill="#6a7d73" />
      <path d="M2 6 L1 -3 L9 3 Z" fill="#5a6b63" />
      <path d="M14 6 L16 -3 L9 3 Z" fill="#5a6b63" />
      <circle cx="6" cy="10" r="1.8" fill="#f4d157" />
      <path d="M24 16 Q34 12 30 2" stroke="#5a6b63" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  );
}
