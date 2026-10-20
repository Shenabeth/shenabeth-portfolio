/*
 * File: ClippyMark.tsx
 * Purpose: The paperclip assistant's artwork, drawn to match the classic
 *          Office assistant reference: a tall slate-purple wire paperclip
 *          standing ON a curled sheet of yellow ruled notepaper, with two
 *          large white eyeballs resting in FRONT of the wire near the top
 *          bend and thick black angled brows above them.
 *
 *          Three things make the reference read the way it does, and all
 *          three are deliberate here:
 *
 *          1. THE PAPER. The clip stands on a sheet of legal-pad paper that
 *             curls up at the right edge, with blue rules, a red margin
 *             line and a soft shadow cast beneath it. Without the paper the
 *             clip just floats, which is what the previous version did.
 *          2. THE CLIP GEOMETRY. A real paperclip is ONE piece of wire bent
 *             into nested hairpins. It is drawn as stroked open paths with
 *             round caps — never as an outlined shape — so the ends read as
 *             cut wire and the loops nest correctly.
 *          3. THE FACE SITS IN FRONT. The wire is laid down first and the
 *             eyes paint over it, so the clip passes BEHIND the eyeballs
 *             exactly as it does in the original art.
 *
 *          Drawn as inline SVG (rather than a bitmap) so the wire takes its
 *          shading from CSS variables, the eyes can be animated by the
 *          component that renders it, and it stays sharp at any size.
 *
 *          Pure presentation: ClippyAssistant.tsx owns all behavior.
 */

interface ClippyMarkProps {
  /** Drives the brow/eye expression: idle, or mid-sentence. */
  mood?: 'idle' | 'talking';
  /** True while the eyelids are shut, so the pupils hide behind the lids. */
  blinking?: boolean;
  className?: string;
}

/**
 * Draws the assistant: the ruled paper, then the wire, then the face.
 *
 * Draw order mirrors the reference — paper at the back, the clip standing on
 * it, and the face painted last so it sits in front of the wire.
 */
export function ClippyMark({
  mood = 'idle',
  blinking = false,
  className,
}: ClippyMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 360"
      fill="none"
      role="img"
      aria-label="A friendly paperclip assistant standing on a sheet of notepaper"
    >
      <defs>
        {/* The wire's rounded, metallic shading: lit from the upper left. */}
        <linearGradient id="clippy-wire" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0%" stopColor="var(--clippy-wire-light)" />
          <stop offset="45%" stopColor="var(--clippy-wire-mid)" />
          <stop offset="100%" stopColor="var(--clippy-wire-dark)" />
        </linearGradient>

        {/* Eyeball shading, so the sclera reads as a sphere not a flat disc. */}
        <radialGradient id="clippy-eye" cx="0.36" cy="0.3" r="0.82">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="72%" stopColor="#f4f2f8" />
          <stop offset="100%" stopColor="#cfcbdc" />
        </radialGradient>

        {/* The flat face of the notepaper: warm legal-pad yellow, very
            slightly deeper toward the back edge so it reads as lying down
            in perspective rather than standing up flat. */}
        <linearGradient id="clippy-paper" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" stopColor="#efe2a4" />
          <stop offset="45%" stopColor="#f7edbc" />
          <stop offset="100%" stopColor="#f3e5ab" />
        </linearGradient>

        {/* The underside revealed by the curl — in shadow, so it is darker
            and a touch browner than the face. */}
        <linearGradient id="clippy-paper-curl" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#c9b976" />
          <stop offset="100%" stopColor="#e2d093" />
        </linearGradient>

        {/* Soft contact shadow under the whole sheet. */}
        <radialGradient id="clippy-drop" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(0,0,0,0.42)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Clips the blue rules to the paper's face so they cannot run off
            the edge or across the curl. */}
        <clipPath id="clippy-paper-clip">
          <path d="M26 182 Q96 150 168 156 Q222 160 258 124 Q286 150 276 206 Q266 262 256 300 L60 306 Q28 250 26 182 Z" />
        </clipPath>
      </defs>

      {/* ---- Shadow cast on the ground beneath the sheet ---- */}
      <ellipse cx="152" cy="308" rx="136" ry="17" fill="url(#clippy-drop)" />

      {/*
        ---- The notepaper ----
        A tall sheet standing BEHIND him, as in the reference: the left edge
        is near-straight, while the right side bows toward the viewer and
        peels forward into a curl at the far edge. He stands in front of it,
        so the whole group is drawn before the wire.
      */}
      <g className="clippy-paper">
        {/* The sheet's face. */}
        <path d="M26 182 Q96 150 168 156 Q222 160 258 124 Q286 150 276 206 Q266 262 256 300 L60 306 Q28 250 26 182 Z" fill="url(#clippy-paper)" />

        {/* Ruled lines, clipped to the sheet. They bow with the page, which
            is what makes it read as a curved surface rather than a flat
            quadrilateral. */}
        <g
          clipPath="url(#clippy-paper-clip)"
          stroke="#9db4d0"
          strokeWidth="1.5"
          opacity="0.7"
        >
          <path d="M20 196 Q110 168 184 176 Q238 182 276 150" fill="none" />
          <path d="M20 222 Q110 196 184 204 Q238 210 278 180" fill="none" />
          <path d="M22 248 Q110 224 184 232 Q238 238 278 210" fill="none" />
          <path d="M24 274 Q110 252 184 260 Q238 266 276 240" fill="none" />
          <path d="M28 300 Q110 280 184 288 Q238 294 272 270" fill="none" />
        </g>

        {/* The red margin rule, as on a real legal pad. */}
        <path
          d="M62 176 Q56 244 62 306"
          stroke="#d98a8a"
          strokeWidth="1.5"
          fill="none"
          opacity="0.75"
          clipPath="url(#clippy-paper-clip)"
        />

        {/* The curled far edge: the page rolling back on itself, showing
            its shaded underside. Drawn as a closed band so it has real
            width instead of reading as a thin hook. */}
        <path
          d="M258 124 Q286 150 276 206 Q266 262 256 300
             Q282 290 290 232 Q298 166 276 128 Q268 118 258 124 Z"
          fill="url(#clippy-paper-curl)"
        />

        {/* A crisp highlight down the ridge of the curl, where it catches
            the light — this is what sells it as a fold rather than a blob. */}
        <path
          d="M260 128 Q284 164 278 220 Q272 272 258 296"
          stroke="#fdf6d4"
          strokeWidth="2.2"
          fill="none"
          opacity="0.75"
        />

        {/* The bottom edge, slightly darker, giving the sheet thickness. */}
        <path
          d="M60 306 Q28 250 26 182"
          stroke="#d8c88e"
          strokeWidth="1.5"
          fill="none"
          opacity="0.85"
        />
      </g>

      {/*
        ---- The wire clip ----
        Pushed up so its bottom bend rests ON the paper rather than floating
        above it. Two nested hairpins, stroked with round caps.
      */}
      <g
        stroke="url(#clippy-wire)"
        strokeWidth="19"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/*
          Outer loop. Starts low on the left, runs up the left side, round
          the wide top bend, down the right side, and into the long bottom
          hairpin — the tall, narrow proportions of a real clip.
        */}
        <path d="M108 252V88a44 44 0 0 1 88 0v170a36 36 0 0 1-72 0V110" />

        {/*
          Inner loop: the shorter hairpin nested inside the outer one,
          ending in the free cut tip partway up.
        */}
        <path d="M160 134v124a26 26 0 0 1-52 0V130" />
      </g>

      {/* ---- The face, painted last so it sits in FRONT of the wire ---- */}
      <g className="clippy-face">
        {/* ---- Left eye ---- */}
        <g className="clippy-eye clippy-eye--left">
          <ellipse cx="133" cy="128" rx="29" ry="32" fill="url(#clippy-eye)" />
          <ellipse
            cx="133"
            cy="128"
            rx="29"
            ry="32"
            fill="none"
            stroke="rgba(38,34,56,0.28)"
            strokeWidth="2.5"
          />
          {!blinking && (
            <>
              <ellipse
                className="clippy-pupil"
                cx="137"
                cy="132"
                rx="13"
                ry="16"
                fill="#15131d"
              />
              {/* Catchlight — the glint that makes the eye read as wet. */}
              <circle cx="128" cy="121" r="4.2" fill="#ffffff" opacity="0.95" />
            </>
          )}
          {blinking && (
            <path
              d="M106 128h54"
              stroke="#2a2636"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
          )}
        </g>

        {/* ---- Right eye ---- */}
        <g className="clippy-eye clippy-eye--right">
          <ellipse cx="190" cy="136" rx="28" ry="31" fill="url(#clippy-eye)" />
          {!blinking && (
            <>
              <ellipse
                className="clippy-pupil"
                cx="193"
                cy="140"
                rx="12"
                ry="15"
                fill="#15131d"
              />
              <circle cx="185" cy="129" r="4" fill="#ffffff" opacity="0.95" />
            </>
          )}
          {blinking && (
            <path
              d="M164 136h52"
              stroke="#2a2636"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
          )}
          <ellipse
            cx="190"
            cy="136"
            rx="28"
            ry="31"
            fill="none"
            stroke="rgba(38,34,56,0.28)"
            strokeWidth="2.5"
          />
        </g>

        {/*
          Brows: thick black arcs that taper toward the outer end, angled
          down toward the nose — the single most recognisable part of the
          character after the clip itself. Stroked (not filled blobs) so
          they read as eyebrows at every size. The `talking` mood lifts
          them, which is what sells the character as mid-sentence.
        */}
        <g
          className={mood === 'talking' ? 'clippy-brows is-raised' : 'clippy-brows'}
          stroke="var(--clippy-brow)"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M106 92c14-15 33-18 50-9" strokeWidth="11" />
          <path d="M170 84c16-9 36-6 50 11" strokeWidth="11" />
        </g>
      </g>
    </svg>
  );
}
