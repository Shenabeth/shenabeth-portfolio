/*
 * File: CpuChip.tsx
 * Purpose: Decorative CPU-chip visual with an animated idle robot face
 *          (expression state machine). Chip has a dark die, visible pin
 *          bumps on each edge, and radiating tendrils that curve outward
 *          to varied pads (filled and hollow). Used in the hero (large)
 *          and on the About page (small) via the `size` prop.
 *
 *          Interactions:
 *            - click: `mad` face briefly
 *            - continuous mouse movement over the chip ("petting"):
 *              `love` (heart) face stays active while the mouse keeps
 *              moving; reverts to idle ~500ms after movement stops.
 */

'use client';

import { useEffect, useRef, useState } from 'react';

type Expression =
  | 'idle'
  | 'blink'
  | 'lookLeft'
  | 'lookRight'
  | 'thinking'
  | 'mad'
  | 'love'
  | 'wink'
  | 'dead';

interface CpuChipProps {
  className?: string;
  size?: 'large' | 'small';
}

interface Pin {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Tendril {
  id: string;
  d: string;
  endX: number;
  endY: number;
  padR: number;
  hollow: boolean;
  tone: 'dim' | 'bright' | 'gold';
}

const VIEW = 240;
const CENTER = VIEW / 2;
const BODY_SIZE = 110;
const BODY_HALF = BODY_SIZE / 2;
const BODY_MIN = CENTER - BODY_HALF;
const BODY_MAX = CENTER + BODY_HALF;

const PINS_PER_EDGE = 7;

/**
 * Builds pin "bumps" sitting flush against each edge of the chip body —
 * small rounded rectangles that read as the chip's pin array, not thin
 * sticks.
 */
function buildPins(): Pin[] {
  const pins: Pin[] = [];
  const pinW = 5;
  const pinH = 6;
  const spacing = (BODY_SIZE - 20) / (PINS_PER_EDGE - 1);
  const start = BODY_MIN + 10;

  for (let i = 0; i < PINS_PER_EDGE; i++) {
    const pos = start + spacing * i;
    pins.push({ id: `top-${i}`, x: pos - pinW / 2, y: BODY_MIN - pinH, w: pinW, h: pinH });
    pins.push({ id: `bot-${i}`, x: pos - pinW / 2, y: BODY_MAX, w: pinW, h: pinH });
    pins.push({ id: `left-${i}`, x: BODY_MIN - pinH, y: pos - pinW / 2, w: pinH, h: pinW });
    pins.push({ id: `right-${i}`, x: BODY_MAX, y: pos - pinW / 2, w: pinH, h: pinW });
  }

  return pins;
}

const PINS = buildPins();

/**
 * Deterministic tendrils — curving traces radiating from near each pin
 * group out to varied pads. Hand-authored for consistent balance across
 * the four quadrants (not randomly placed), matching the reference's
 * octopus-arm aesthetic.
 */
const TENDRILS: Tendril[] = [
  // top-left region
  { id: 'tl1', d: `M ${CENTER - 30} ${BODY_MIN - 6} L ${CENTER - 30} ${BODY_MIN - 24} L ${CENTER - 55} ${BODY_MIN - 24} L ${CENTER - 55} ${BODY_MIN - 48}`, endX: CENTER - 55, endY: BODY_MIN - 48, padR: 5, hollow: true, tone: 'dim' },
  { id: 'tl2', d: `M ${CENTER - 15} ${BODY_MIN - 6} L ${CENTER - 15} ${BODY_MIN - 36} L ${CENTER - 32} ${BODY_MIN - 36}`, endX: CENTER - 32, endY: BODY_MIN - 36, padR: 3, hollow: false, tone: 'bright' },
  // top-right region
  { id: 'tr1', d: `M ${CENTER + 10} ${BODY_MIN - 6} L ${CENTER + 10} ${BODY_MIN - 22} L ${CENTER + 44} ${BODY_MIN - 22} L ${CENTER + 44} ${BODY_MIN - 46}`, endX: CENTER + 44, endY: BODY_MIN - 46, padR: 6, hollow: false, tone: 'gold' },
  { id: 'tr2', d: `M ${CENTER + 30} ${BODY_MIN - 6} L ${CENTER + 30} ${BODY_MIN - 18}`, endX: CENTER + 30, endY: BODY_MIN - 18, padR: 2.5, hollow: false, tone: 'dim' },
  // left-side region
  { id: 'l1', d: `M ${BODY_MIN - 6} ${CENTER - 25} L ${BODY_MIN - 28} ${CENTER - 25} L ${BODY_MIN - 28} ${CENTER - 50}`, endX: BODY_MIN - 28, endY: CENTER - 50, padR: 4, hollow: true, tone: 'bright' },
  { id: 'l2', d: `M ${BODY_MIN - 6} ${CENTER + 5} L ${BODY_MIN - 36} ${CENTER + 5}`, endX: BODY_MIN - 36, endY: CENTER + 5, padR: 5, hollow: false, tone: 'dim' },
  { id: 'l3', d: `M ${BODY_MIN - 6} ${CENTER + 30} L ${BODY_MIN - 22} ${CENTER + 30} L ${BODY_MIN - 22} ${CENTER + 50}`, endX: BODY_MIN - 22, endY: CENTER + 50, padR: 3, hollow: false, tone: 'bright' },
  // right-side region
  { id: 'r1', d: `M ${BODY_MAX + 6} ${CENTER - 30} L ${BODY_MAX + 24} ${CENTER - 30} L ${BODY_MAX + 24} ${CENTER - 50}`, endX: BODY_MAX + 24, endY: CENTER - 50, padR: 5, hollow: false, tone: 'gold' },
  { id: 'r2', d: `M ${BODY_MAX + 6} ${CENTER} L ${BODY_MAX + 38} ${CENTER}`, endX: BODY_MAX + 38, endY: CENTER, padR: 6, hollow: true, tone: 'dim' },
  { id: 'r3', d: `M ${BODY_MAX + 6} ${CENTER + 28} L ${BODY_MAX + 22} ${CENTER + 28} L ${BODY_MAX + 22} ${CENTER + 46}`, endX: BODY_MAX + 22, endY: CENTER + 46, padR: 3.5, hollow: false, tone: 'bright' },
  // bottom-left region
  { id: 'bl1', d: `M ${CENTER - 30} ${BODY_MAX + 6} L ${CENTER - 30} ${BODY_MAX + 26} L ${CENTER - 50} ${BODY_MAX + 26}`, endX: CENTER - 50, endY: BODY_MAX + 26, padR: 4, hollow: false, tone: 'dim' },
  { id: 'bl2', d: `M ${CENTER - 10} ${BODY_MAX + 6} L ${CENTER - 10} ${BODY_MAX + 42} L ${CENTER - 36} ${BODY_MAX + 42}`, endX: CENTER - 36, endY: BODY_MAX + 42, padR: 5, hollow: true, tone: 'bright' },
  // bottom-right region
  { id: 'br1', d: `M ${CENTER + 15} ${BODY_MAX + 6} L ${CENTER + 15} ${BODY_MAX + 30} L ${CENTER + 46} ${BODY_MAX + 30}`, endX: CENTER + 46, endY: BODY_MAX + 30, padR: 6, hollow: false, tone: 'gold' },
  { id: 'br2', d: `M ${CENTER + 32} ${BODY_MAX + 6} L ${CENTER + 32} ${BODY_MAX + 20}`, endX: CENTER + 32, endY: BODY_MAX + 20, padR: 3, hollow: false, tone: 'dim' },
];

/** Renders the chip body outline, pins, and tendrils as a single SVG layer. */
function ChipArtwork() {
  return (
    <svg className="cpu-chip-art" viewBox={`0 0 ${VIEW} ${VIEW}`} aria-hidden="true">
      <defs>
        {/* Heavy dark shadow with very wide spread — three stacked blur
            offsets build a dense dark halo under the chip die so it reads
            clearly against the busy circuit background behind the hero. */}
        <filter id="cpu-chip-shadow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="18" result="ambient" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="far" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="near" />
          <feOffset in="ambient" dx="0" dy="8" result="ambientOff" />
          <feOffset in="far" dx="0" dy="5" result="farOff" />
          <feOffset in="near" dx="0" dy="2" result="nearOff" />
          <feComponentTransfer in="ambientOff" result="ambientDark">
            <feFuncA type="linear" slope="1.3" />
          </feComponentTransfer>
          <feComponentTransfer in="farOff" result="farDark">
            <feFuncA type="linear" slope="1.4" />
          </feComponentTransfer>
          <feComponentTransfer in="nearOff" result="nearDark">
            <feFuncA type="linear" slope="1.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="ambientDark" />
            <feMergeNode in="farDark" />
            <feMergeNode in="nearDark" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Per-tendril shadow — strong enough that even thin stroke paths
            cast a visible dark halo on the pattern behind them */}
        <filter id="cpu-tendril-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
          <feOffset in="blur" dx="0" dy="2" result="offBlur" />
          <feComponentTransfer in="offBlur" result="darkened">
            <feFuncA type="linear" slope="1.15" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="darkened" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Tendrils with per-element shadow so each one reads individually
          against the circuit pattern behind the chip */}
      {TENDRILS.map((t) => (
        <g key={t.id} className={`cpu-tendril cpu-tendril--${t.tone}`} filter="url(#cpu-tendril-shadow)">
          <path d={t.d} vectorEffect="non-scaling-stroke" />
          {t.hollow ? (
            <circle cx={t.endX} cy={t.endY} r={t.padR} className="cpu-tendril-pad-hollow" vectorEffect="non-scaling-stroke" />
          ) : (
            <circle cx={t.endX} cy={t.endY} r={t.padR} className="cpu-tendril-pad" />
          )}
        </g>
      ))}

      {/* Chip body + pins + screws share a bold shadow filter so the
          whole die lifts off the background */}
      <g filter="url(#cpu-chip-shadow)">
        {PINS.map((p) => (
          <rect key={p.id} x={p.x} y={p.y} width={p.w} height={p.h} rx={1} className="cpu-pin" />
        ))}

        <rect
          x={BODY_MIN}
          y={BODY_MIN}
          width={BODY_SIZE}
          height={BODY_SIZE}
          rx={10}
          className="cpu-body-rect"
        />

        <rect
          x={BODY_MIN + 10}
          y={BODY_MIN + 10}
          width={BODY_SIZE - 20}
          height={BODY_SIZE - 20}
          rx={6}
          className="cpu-body-inset"
        />

        {[
          [BODY_MIN + 6, BODY_MIN + 6],
          [BODY_MAX - 6, BODY_MIN + 6],
          [BODY_MIN + 6, BODY_MAX - 6],
          [BODY_MAX - 6, BODY_MAX - 6],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={1.6} className="cpu-body-screw" />
        ))}
      </g>
    </svg>
  );
}

/** Renders the eye pair for the current expression. */
function EyesFor({ expression }: { expression: Expression }) {
  switch (expression) {
    case 'blink':
      return (
        <>
          <rect x={28} y={44} width={16} height={2.5} rx={1} className="chip-eye" />
          <rect x={56} y={44} width={16} height={2.5} rx={1} className="chip-eye" />
        </>
      );
    case 'lookLeft':
      return (
        <>
          <rect x={26} y={34} width={18} height={18} rx={6} className="chip-eye-socket" />
          <circle cx={31} cy={43} r={4} className="chip-eye" />
          <rect x={54} y={34} width={18} height={18} rx={6} className="chip-eye-socket" />
          <circle cx={59} cy={43} r={4} className="chip-eye" />
        </>
      );
    case 'lookRight':
      return (
        <>
          <rect x={26} y={34} width={18} height={18} rx={6} className="chip-eye-socket" />
          <circle cx={39} cy={43} r={4} className="chip-eye" />
          <rect x={54} y={34} width={18} height={18} rx={6} className="chip-eye-socket" />
          <circle cx={67} cy={43} r={4} className="chip-eye" />
        </>
      );
    case 'thinking':
      return (
        <>
          <rect x={28} y={30} width={16} height={5} rx={2.5} className="chip-eye" transform="rotate(-14 36 32)" />
          <rect x={56} y={28} width={16} height={5} rx={2.5} className="chip-eye" transform="rotate(-14 64 30)" />
        </>
      );
    case 'mad':
      return (
        <>
          <line x1={27} y1={36} x2={44} y2={44} className="chip-eye-mad" />
          <line x1={73} y1={36} x2={56} y2={44} className="chip-eye-mad" />
          <circle cx={36} cy={46} r={2.5} className="chip-eye-mad-pupil" />
          <circle cx={64} cy={46} r={2.5} className="chip-eye-mad-pupil" />
        </>
      );
    case 'love':
      return (
        <>
          <path d="M36 38 c-3 -5 -11 -3 -11 3 c0 5 7 9 11 12 c4 -3 11 -7 11 -12 c0 -6 -8 -8 -11 -3 Z" className="chip-eye-love" />
          <path d="M64 38 c-3 -5 -11 -3 -11 3 c0 5 7 9 11 12 c4 -3 11 -7 11 -12 c0 -6 -8 -8 -11 -3 Z" className="chip-eye-love" />
        </>
      );
    case 'wink':
      return (
        <>
          <rect x={28} y={44} width={16} height={2.5} rx={1} className="chip-eye" />
          <rect x={56} y={34} width={16} height={16} rx={6} className="chip-eye" />
        </>
      );
    case 'dead':
      return (
        <>
          <line x1={27} y1={35} x2={43} y2={51} className="chip-eye-mad" />
          <line x1={43} y1={35} x2={27} y2={51} className="chip-eye-mad" />
          <line x1={57} y1={35} x2={73} y2={51} className="chip-eye-mad" />
          <line x1={73} y1={35} x2={57} y2={51} className="chip-eye-mad" />
        </>
      );
    case 'idle':
    default:
      return (
        <>
          <rect x={28} y={34} width={16} height={16} rx={6} className="chip-eye" />
          <rect x={56} y={34} width={16} height={16} rx={6} className="chip-eye" />
        </>
      );
  }
}

/** Renders the mouth shape for the current expression. */
function MouthFor({ expression }: { expression: Expression }) {
  switch (expression) {
    case 'thinking':
      return (
        <>
          <circle cx={42} cy={68} r={2} className="chip-eye" />
          <circle cx={50} cy={68} r={2} className="chip-eye" />
          <circle cx={58} cy={68} r={2} className="chip-eye" />
        </>
      );
    case 'mad':
      return <path d="M36 72 L44 66 L52 72 L60 66 L68 72" className="chip-mouth" />;
    case 'love':
      return <path d="M36 64 Q50 78 64 64" className="chip-mouth" />;
    case 'wink':
      return <path d="M38 65 Q50 72 62 63" className="chip-mouth" />;
    case 'dead':
      return <line x1={38} y1={68} x2={62} y2={68} className="chip-mouth" />;
    case 'idle':
    case 'blink':
    default:
      return <path d="M40 64 Q50 70 60 64" className="chip-mouth" />;
  }
}

/** Renders the chip-face SVG (eyes + mouth) for the current expression. */
function ChipFace({ expression }: { expression: Expression }) {
  const isLooking = expression === 'lookLeft' || expression === 'lookRight';
  return (
    <svg className={`cpu-chip-face${isLooking ? ' is-looking' : ''}`} viewBox="0 0 100 100" aria-hidden="true">
      <EyesFor expression={expression} />
      <MouthFor expression={expression} />
    </svg>
  );
}

const IDLE_BEATS: { expression: Expression; weight: number; holdMs: number }[] = [
  { expression: 'blink', weight: 0.42, holdMs: 180 },
  { expression: 'lookLeft', weight: 0.14, holdMs: 1600 },
  { expression: 'lookRight', weight: 0.14, holdMs: 1600 },
  { expression: 'thinking', weight: 0.14, holdMs: 1400 },
  { expression: 'wink', weight: 0.08, holdMs: 500 },
  { expression: 'dead', weight: 0.04, holdMs: 650 },
];

/** Picks a weighted-random idle beat from IDLE_BEATS. */
function pickIdleBeat() {
  const roll = Math.random();
  let cumulative = 0;
  for (const beat of IDLE_BEATS) {
    cumulative += beat.weight;
    if (roll < cumulative) return beat;
  }
  return IDLE_BEATS[0];
}

/** Random wait (ms) before the next idle beat. */
function randomIdleDelay(): number {
  return 2500 + Math.random() * 3500;
}

const PET_IDLE_TIMEOUT_MS = 500;
const PET_MIN_MOVEMENT_PX = 6;

/**
 * Decorative CPU-chip visual with pins, radiating tendrils, and an
 * animated idle robot face. Idles with randomized blink/look/thinking/wink
 * /dead-eyes beats; reacts to click (mad) and continuous mouse movement
 * ("petting" → love/hearts).
 */
export function CpuChip({ className = '', size = 'large' }: CpuChipProps) {
  const [expression, setExpression] = useState<Expression>('idle');
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revertTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const petIdleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInteracting = useRef(false);
  const lastLookDir = useRef<Expression | null>(null);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const isPetting = useRef(false);

  function scheduleNextIdleBeat(): void {
    idleTimer.current = setTimeout(runRandomIdleBeat, randomIdleDelay());
  }

  function runRandomIdleBeat(): void {
    if (isInteracting.current) {
      scheduleNextIdleBeat();
      return;
    }
    let beat = pickIdleBeat();
    const isLook = beat.expression === 'lookLeft' || beat.expression === 'lookRight';
    if (isLook && lastLookDir.current) {
      beat = pickIdleBeat();
    }
    lastLookDir.current =
      beat.expression === 'lookLeft' || beat.expression === 'lookRight' ? beat.expression : null;
    setExpression(beat.expression);
    setTimeout(() => {
      if (!isInteracting.current) setExpression('idle');
    }, beat.holdMs);
    scheduleNextIdleBeat();
  }

  useEffect(() => {
    scheduleNextIdleBeat();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (revertTimeout.current) clearTimeout(revertTimeout.current);
      if (petIdleTimer.current) clearTimeout(petIdleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function triggerReaction(next: Expression, holdMs: number): void {
    isInteracting.current = true;
    if (revertTimeout.current) clearTimeout(revertTimeout.current);
    setExpression(next);
    revertTimeout.current = setTimeout(() => {
      isInteracting.current = false;
      setExpression('idle');
    }, holdMs);
  }

  /** Ends a petting session: clear love expression and reset state. */
  function endPetting(): void {
    isPetting.current = false;
    isInteracting.current = false;
    lastMousePos.current = null;
    if (petIdleTimer.current) {
      clearTimeout(petIdleTimer.current);
      petIdleTimer.current = null;
    }
    setExpression('idle');
  }

  /**
   * Tracks mouse movement over the chip. Keeps the `love` expression
   * active while the mouse keeps moving (any discernible distance each
   * event). If no movement is detected for PET_IDLE_TIMEOUT_MS, reverts
   * to idle — even if the mouse is still hovering, matching the user's
   * explicit "petting = movement" model.
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const prev = lastMousePos.current;
    const now = { x: e.clientX, y: e.clientY };
    if (prev) {
      const dx = now.x - prev.x;
      const dy = now.y - prev.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= PET_MIN_MOVEMENT_PX) {
        // Movement detected — start / continue petting.
        if (!isPetting.current) {
          isPetting.current = true;
          isInteracting.current = true;
          if (revertTimeout.current) clearTimeout(revertTimeout.current);
          setExpression('love');
        }
        if (petIdleTimer.current) clearTimeout(petIdleTimer.current);
        petIdleTimer.current = setTimeout(endPetting, PET_IDLE_TIMEOUT_MS);
      }
    }
    lastMousePos.current = now;
  };

  const handleMouseLeave = (): void => {
    if (isPetting.current) endPetting();
    lastMousePos.current = null;
  };

  const handlePointerDown = (): void => triggerReaction('mad', 1200);

  return (
    <div
      className={`cpu-chip cpu-chip--${size} ${className}`}
      onMouseDown={handlePointerDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Decorative animated CPU chip"
    >
      <div className="cpu-chip-assembly">
        <ChipArtwork />
        <div className="cpu-chip-face-wrap">
          <ChipFace expression={expression} />
        </div>
      </div>
    </div>
  );
}
