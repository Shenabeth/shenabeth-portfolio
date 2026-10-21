/*
 * File: ClippyMark.tsx
 * Purpose: The paperclip assistant's artwork. Renders the full canonical
 *          Clippy reference image pixel-for-pixel (public/clippy/clippy.png,
 *          620x696 — the clip standing on its sheet of legal-pad paper, with
 *          its own soft shadow) rather than a hand-drawn SVG recreation,
 *          since nothing redrawn by hand matched the source closely enough.
 *
 *          The source was a flat PNG on a pure-black background; it's cut
 *          out via alpha-matte recovery (distance-from-black), not a simple
 *          color-key threshold — the pupils' and brows' own ink genuinely
 *          dips to near-black in this art, with no color gap from the true
 *          background, so each is additionally protected by its measured
 *          elliptical extent (not a bounding box, which left visible
 *          rectangular artifacts) to stop the matte ramp from eating them.
 *
 *          Animation is layered ON TOP of the static image rather than baked
 *          into it:
 *          - BLINKING: two small eyelid shapes, positioned/sized in
 *            app/globals.css (.clippy-eyelid--left/--right) from pixel
 *            measurements taken directly off the source art, sweep down
 *            over each eye and back up.
 *          - TALKING: the classic Office Clippy "nod" — a small vertical
 *            bounce synced to speech, since the brows are baked into the
 *            image and can't be lifted independently the way the old
 *            hand-drawn SVG's brows were.
 *
 *          Pure presentation: ClippyAssistant.tsx owns all behavior.
 */

interface ClippyMarkProps {
  /** Drives the figure's motion: idle, or the classic nod while mid-sentence. */
  mood?: 'idle' | 'talking';
  /** True while the eyelids are shut, so the pupils hide behind the lids. */
  blinking?: boolean;
  className?: string;
}

/**
 * The real artwork, with animated eyelids layered over the measured eye
 * positions and (while talking) the classic Clippy nod.
 */
export function ClippyMark({
  mood = 'idle',
  blinking = false,
  className,
}: ClippyMarkProps) {
  return (
    <div className={className} role="img" aria-label="A friendly paperclip assistant">
      <div className={mood === 'talking' ? 'clippy-figure-inner is-nodding' : 'clippy-figure-inner'}>
        {/* eslint-disable-next-line @next/next/no-img-element -- plain <img>
            keeps the static-export/Amplify path simple; the site uses no
            next/image anywhere. */}
        <img src="/clippy/clippy.png" alt="" className="clippy-raster" />

        {/* Eyelids: colored to match the wire, sized/positioned from the
            source image's real pixel measurements. Scaled down to nothing
            when not blinking so they never clip the eyes' highlights. */}
        <span
          className={blinking ? 'clippy-eyelid clippy-eyelid--left is-shut' : 'clippy-eyelid clippy-eyelid--left'}
          aria-hidden="true"
        />
        <span
          className={blinking ? 'clippy-eyelid clippy-eyelid--right is-shut' : 'clippy-eyelid clippy-eyelid--right'}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
