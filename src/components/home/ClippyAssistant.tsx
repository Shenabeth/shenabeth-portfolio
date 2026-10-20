/*
 * File: ClippyAssistant.tsx
 * Purpose: The hero's paperclip assistant. In the hero he only sits there
 *          with a short greeting tag — the full conversation is NOT inline,
 *          because a growing bubble pushed the hero layout around.
 *
 *          Clicking him opens the conversation as its own window above the
 *          site: a centred modal over a dimmed page, which behaves the same
 *          on desktop, tablet and phone.
 *
 *          Dialogue lives in src/config/clippy.ts; the artwork is ClippyMark.
 *          This file owns only behavior: opening/closing the window, typing
 *          the current node's lines out, swapping nodes when a reply is
 *          chosen, blinking, and honouring reduced-motion (which renders
 *          every line instantly).
 */

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { CLIPPY_ROOT, CLIPPY_SCRIPT, type ClippyReply } from '@/config/clippy';
import { ClippyMark } from './ClippyMark';

/** Milliseconds per character while a line types out. */
const TYPE_SPEED = 16;

/** Extra pause at the boundary between two paragraphs. */
const LINE_PAUSE = 320;

/** The greeting on the hero tag, before the conversation is opened. */
const GREETING = 'Hi, I’m Clippy — want the TL;DR?';

/**
 * Types an array of paragraphs out one after another.
 *
 * Returns the text to render for each line plus whether the node has
 * finished, which gates the reply buttons: they appear only once Clippy has
 * stopped talking, so the choices never shift under the cursor. With reduced
 * motion every line is returned complete on the first render.
 */
function useTypedLines(lines: string[], skipAnimation: boolean, resetKey: string) {
  const [charCount, setCharCount] = useState(0);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.length, 0),
    [lines],
  );

  /*
   * Restart the typing whenever the dialogue node changes. Done during
   * render (the React "adjust state on prop change" pattern) rather than in
   * an effect, so the new node never paints with the previous node's
   * character count and then visibly re-types.
   */
  const [typedKey, setTypedKey] = useState(resetKey);
  if (typedKey !== resetKey) {
    setTypedKey(resetKey);
    setCharCount(0);
  }

  useEffect(() => {
    if (skipAnimation || charCount >= total) return;
    // A short extra beat at each paragraph boundary, so the lines feel
    // spoken rather than poured out as one continuous stream.
    const atBoundary =
      charCount > 0 &&
      charCount < total &&
      lines.some(
        (_, index) =>
          charCount ===
          lines.slice(0, index + 1).reduce((sum, line) => sum + line.length, 0),
      );
    const timeout = window.setTimeout(
      () => setCharCount((count) => count + 1),
      atBoundary ? LINE_PAUSE : TYPE_SPEED,
    );
    return () => window.clearTimeout(timeout);
  }, [charCount, lines, skipAnimation, total]);

  // Spend the character budget across the paragraphs in order: each line
  // shows what is left over once the lines before it have been filled.
  const budget = skipAnimation ? total : charCount;
  const visible = useMemo(
    () =>
      lines.map((line, index) => {
        // Characters the preceding lines claim before this one starts.
        const offset = lines
          .slice(0, index)
          .reduce((sum, previous) => sum + previous.length, 0);
        return line.slice(0, Math.max(0, Math.min(line.length, budget - offset)));
      }),
    [budget, lines],
  );

  return { visible, done: budget >= total };
}

/** Blinks the eyes shut at irregular intervals, the way a real face does. */
function useBlink(enabled: boolean) {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let nextTimer = 0;
    let shutTimer = 0;
    const schedule = () => {
      // 2.4–7.4s between blinks keeps it from reading as a metronome.
      nextTimer = window.setTimeout(
        () => {
          setBlinking(true);
          shutTimer = window.setTimeout(() => {
            setBlinking(false);
            schedule();
          }, 140);
        },
        2400 + Math.random() * 5000,
      );
    };
    schedule();
    return () => {
      window.clearTimeout(nextTimer);
      window.clearTimeout(shutTimer);
    };
  }, [enabled]);

  return blinking;
}

/**
 * The conversation itself, rendered inside the modal window. Kept separate
 * from the hero figure so the typing state is created when the window opens
 * and thrown away when it closes — reopening always starts a fresh tour.
 */
function ClippyConversation({
  skipAnimation,
  onClose,
}: {
  skipAnimation: boolean;
  onClose: () => void;
}) {
  const [nodeId, setNodeId] = useState(CLIPPY_ROOT);

  const node = useMemo(
    () =>
      CLIPPY_SCRIPT.find((candidate) => candidate.id === nodeId) ??
      CLIPPY_SCRIPT.find((candidate) => candidate.id === CLIPPY_ROOT) ??
      CLIPPY_SCRIPT[0],
    [nodeId],
  );

  const { visible, done } = useTypedLines(node.lines, skipAnimation, node.id);
  const blinking = useBlink(!skipAnimation);

  // Index of the line currently being typed, so only it carries the caret.
  const activeLine = visible.reduce(
    (last, line, index) => (line.length > 0 ? index : last),
    0,
  );

  const choose = useCallback((reply: ClippyReply) => {
    if (reply.to) setNodeId(reply.to);
  }, []);

  return (
    <div className="clippy-window__body">
      {/* Clippy, small, beside the dialogue — the same character as the hero. */}
      <div className="clippy-window__figure" aria-hidden="true">
        <ClippyMark
          className="clippy__art"
          mood={done ? 'idle' : 'talking'}
          blinking={blinking}
        />
      </div>

      <div className="clippy-window__dialogue">
        <span className="clippy__kicker">{node.kicker}</span>

        <div className="clippy__lines" aria-live="polite">
          {visible.map((line, index) => (
            <p key={`${node.id}-${index}`} className="clippy__line">
              {line}
              {!done && index === activeLine && (
                <span className="caret" aria-hidden="true" />
              )}
            </p>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {done && (
            <motion.div
              className="clippy__replies"
              key={node.id}
              initial={skipAnimation ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {node.replies.map((reply) => {
                const label = (
                  <>
                    <span aria-hidden="true">&gt;</span> {reply.label}
                  </>
                );

                /*
                 * Replies that navigate render as real links, so they can be
                 * opened in a new tab and are announced as links; the rest
                 * are buttons that only advance the script. Navigating also
                 * closes the window, so the visitor lands on the page they
                 * asked for rather than behind the overlay.
                 */
                if (reply.action) {
                  return (
                    <Link
                      className="clippy__reply"
                      key={reply.label}
                      href={reply.action.href}
                      target={reply.action.external ? '_blank' : undefined}
                      rel={reply.action.external ? 'noreferrer' : undefined}
                      onClick={() => {
                        choose(reply);
                        if (!reply.action?.external) onClose();
                      }}
                    >
                      {label}
                    </Link>
                  );
                }

                return (
                  <button
                    className="clippy__reply"
                    key={reply.label}
                    type="button"
                    onClick={() => choose(reply)}
                  >
                    {label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * The hero assistant. Renders the paperclip plus a short greeting tag;
 * clicking either opens the conversation in a modal window above the page.
 */
export function ClippyAssistant() {
  const reducedMotion = useReducedMotion();
  const skipAnimation = Boolean(reducedMotion);
  const [open, setOpen] = useState(false);
  const blinking = useBlink(!skipAnimation);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  /*
   * While the window is open: close on Escape, lock the page behind it from
   * scrolling, and move focus into the dialog. On close, focus returns to
   * the trigger so keyboard users are not dropped at the top of the page.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    // Captured now: by cleanup time the ref may point elsewhere.
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [close, open]);

  return (
    <>
      <div className="clippy">
        {/*
          The whole character is the trigger. It is a button (not a figure
          with a separate link) so it is reachable by keyboard and announced
          as the control that opens the conversation.
        */}
        <button
          className="clippy__trigger"
          type="button"
          ref={triggerRef}
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className="clippy__greeting">
            {GREETING}
            <span className="clippy__greeting-tail" aria-hidden="true" />
          </span>

          <motion.span
            className="clippy__figure"
            animate={
              skipAnimation ? undefined : { y: [0, -9, 0], rotate: [-1.2, 1.2, -1.2] }
            }
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ClippyMark className="clippy__art" mood="idle" blinking={blinking} />
            <span className="clippy__shadow" aria-hidden="true" />
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="clippy-overlay"
            initial={skipAnimation ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <motion.div
              className="clippy-window"
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio summary assistant"
              ref={dialogRef}
              tabIndex={-1}
              initial={skipAnimation ? false : { opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              // The backdrop closes on click; the window itself must not.
              onClick={(event) => event.stopPropagation()}
            >
              <div className="clippy-window__head">
                <span className="clippy-window__title">clippy.exe</span>
                <button
                  className="clippy-window__close"
                  type="button"
                  onClick={close}
                  aria-label="Close assistant"
                >
                  <X />
                </button>
              </div>

              <ClippyConversation skipAnimation={skipAnimation} onClose={close} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
