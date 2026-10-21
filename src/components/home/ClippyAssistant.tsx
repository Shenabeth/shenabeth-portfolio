/*
 * File: ClippyAssistant.tsx
 * Purpose: The site-wide paperclip assistant. Clippy is a single, shared
 *          piece of state (ClippyProvider) with three visible pieces built
 *          on top of it:
 *
 *          - ClippyHeroFigure: the large greeting + figure shown inside the
 *            homepage hero, permanently. Pure trigger — clicking it opens
 *            the shared conversation. It stays put even once the dock has
 *            appeared; the two are independent, simultaneously-visible
 *            triggers for the same conversation.
 *          - ClippyDock: the small fixed bottom-right button, rendered once
 *            in the root layout so it is present on every route. This is
 *            "docked" Clippy — tapping it reopens the conversation. It reads
 *            as an ordinary chat-widget launcher (a message-bubble icon on a
 *            branded circular button), not a floating character, and it
 *            hides on scroll-down / near the footer, reappearing on
 *            scroll-up, rather than lifting above the footer.
 *          - The conversation window itself (modal), also rendered once in
 *            the root layout, shared by both triggers.
 *
 *          Clippy does not persist conversation state across a navigation.
 *          Each time the route changes while he's been introduced once
 *          already, the next time he's opened he starts on CLIPPY_RETURN_ROOT
 *          — a short "who are you, or what's on this page" beat — instead of
 *          replaying the full intro or trying to remember the old thread.
 *          That is intentional (see src/config/clippy.ts): no context is
 *          saved, so the component carries none either.
 *
 *          Dialogue lives in src/config/clippy.ts; the artwork is ClippyMark.
 *          This file owns behavior: opening/closing, typing lines out,
 *          swapping nodes, the chat-style transcript, blinking, the docking
 *          animation on navigation, and honouring reduced-motion.
 *
 *          The conversation renders as a single scrolling chat log, not a
 *          one-card-at-a-time wizard: Clippy's figure is shown once, pinned
 *          above the log as a static avatar, and every message below it
 *          reads as a plain text bubble — his lines left-aligned, the
 *          reply the visitor picked right-aligned, like any messaging app.
 *          Each node's bubble(s) stay in the log once typed and the next
 *          node's message appends below — so the whole history is always
 *          on screen, nothing hidden behind a separate transcript view, and
 *          nothing shown twice.
 */

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, MessageCircle, X } from 'lucide-react';
import {
  CLIPPY_ROOT,
  CLIPPY_RETURN_ROOT,
  CLIPPY_SCRIPT,
  clippyPageLabel,
  clippyPageTarget,
  type ClippyNode,
  type ClippyReply,
} from '@/config/clippy';
import { ClippyMark } from './ClippyMark';

/** Milliseconds per character while a line types out. */
const TYPE_SPEED = 7;

/** Extra pause at the boundary between two paragraphs. */
const LINE_PAUSE = 160;

/** How long the "thinking" indicator shows before a new node starts typing. */
const THINK_DELAY = 650;

/** The greeting on the hero tag, before the conversation is opened. */
const GREETING = 'Hi, I’m Clippy — want the TLDR?';

// ---------------------------------------------------------------------------
// Shared state: one conversation, opened from either the hero figure or the
// docked button, aware of whether it has ever been opened before (so a
// navigation after that point reopens on the short "welcome back" node
// instead of the full intro).
// ---------------------------------------------------------------------------

interface ClippyContextValue {
  open: boolean;
  /** Which node the window should start on for the open currently in progress. */
  rootId: string;
  /** Bumped on every open, so the conversation remounts fresh each time. */
  openCount: number;
  openClippy: () => void;
  closeClippy: () => void;
  justDocked: boolean;
}

const ClippyContext = createContext<ClippyContextValue | null>(null);

function useClippyContext() {
  const context = useContext(ClippyContext);
  if (!context) {
    throw new Error('Clippy components must be rendered inside ClippyProvider');
  }
  return context;
}

/**
 * Holds the one bit of state every Clippy trigger shares. Mounted once in
 * the root layout, above both ClippyDock and the homepage's hero figure.
 */
export function ClippyProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [rootId, setRootId] = useState(CLIPPY_ROOT);
  const [openCount, setOpenCount] = useState(0);
  const [justDocked, setJustDocked] = useState(false);
  const pathname = usePathname();

  // Read with a ref (not state) at the moment `openClippy` runs, so the very
  // next open can tell "first time" from "welcome back" without waiting a
  // render behind a state update.
  const openedBefore = useRef(false);

  const openClippy = useCallback(() => {
    setRootId(openedBefore.current ? CLIPPY_RETURN_ROOT : CLIPPY_ROOT);
    openedBefore.current = true;
    setOpenCount((count) => count + 1);
    setOpen(true);
  }, []);

  const closeClippy = useCallback(() => setOpen(false), []);

  // On every route change, if Clippy was open, close him and play a short
  // "docking" flourish on the dock button so the handoff reads as him
  // animating down into the corner rather than just vanishing.
  const lastPathname = useRef(pathname);
  useEffect(() => {
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;
    setOpen((wasOpen) => {
      if (wasOpen) {
        setJustDocked(true);
        window.setTimeout(() => setJustDocked(false), 900);
      }
      return false;
    });
  }, [pathname]);

  const value = useMemo(
    () => ({ open, rootId, openCount, openClippy, closeClippy, justDocked }),
    [open, rootId, openCount, openClippy, closeClippy, justDocked],
  );

  return (
    <ClippyContext.Provider value={value}>
      {children}
      <ClippyWindow />
    </ClippyContext.Provider>
  );
}

/**
 * Types an array of paragraphs out one after another, after a brief
 * "thinking" beat (see THINK_DELAY) that fakes Clippy composing a reply in
 * real time, the way a chat AI does, rather than text appearing instantly.
 *
 * Returns the text to render for each line, whether the node has finished
 * (which gates the reply buttons: they appear only once Clippy has stopped
 * talking, so the choices never shift under the cursor), and whether it's
 * still in the pre-typing "thinking" beat. With reduced motion, thinking is
 * skipped and every line is returned complete on the first render.
 */
function useTypedLines(lines: string[], skipAnimation: boolean, resetKey: string) {
  const [charCount, setCharCount] = useState(0);
  const [thinking, setThinking] = useState(!skipAnimation);

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
    setThinking(!skipAnimation);
  }

  // The thinking beat: a fixed pause before the first character of a new
  // node appears, during which the caller shows the ellipsis indicator.
  useEffect(() => {
    if (!thinking) return;
    const timeout = window.setTimeout(() => setThinking(false), THINK_DELAY);
    return () => window.clearTimeout(timeout);
  }, [thinking]);

  useEffect(() => {
    if (skipAnimation || thinking || charCount >= total) return;
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
  }, [charCount, lines, skipAnimation, thinking, total]);

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

  return { visible, done: budget >= total, thinking };
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

/** One line of the chat log: either something Clippy said, or a reply the
 *  visitor picked (rendered right-aligned, like a sent message). */
type ClippyLogEntry =
  | { kind: 'clippy'; node: ClippyNode; key: string }
  | { kind: 'visitor'; label: string; key: string };

/**
 * The conversation itself, rendered inside the modal window as a scrolling
 * chat log. Kept separate from the trigger figures so the typing/log state
 * is created when the window opens and thrown away when it closes —
 * reopening always starts a fresh tour from whichever root the session
 * calls for.
 */
function ClippyConversation({
  skipAnimation,
  rootId,
  onClose,
}: {
  skipAnimation: boolean;
  rootId: string;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [nodeId, setNodeId] = useState(rootId);
  // Every node Clippy has fully said, interleaved with the reply the
  // visitor picked after each one. The live node (currently typing or
  // awaiting a reply) is `nodeId`/`node` below, appended to this log once
  // it's fully typed.
  const [log, setLog] = useState<ClippyLogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Whether the log is scrolled to (or near) its latest message. Drives both
  // the auto-scroll below and the "jump to latest" arrow: the arrow only
  // shows once the visitor has scrolled up away from the bottom, and hides
  // itself again the moment they're back.
  const [pinnedToBottom, setPinnedToBottom] = useState(true);

  const node = useMemo(
    () =>
      CLIPPY_SCRIPT.find((candidate) => candidate.id === nodeId) ??
      CLIPPY_SCRIPT.find((candidate) => candidate.id === CLIPPY_ROOT) ??
      CLIPPY_SCRIPT[0],
    [nodeId],
  );

  const { visible, done, thinking } = useTypedLines(node.lines, skipAnimation, node.id);
  const blinking = useBlink(!skipAnimation);

  // Append the live node to the log the first time it's fully typed, so the
  // log always holds everything that's finished appearing, and the live
  // slot below is only ever the one currently talking.
  const loggedFor = useRef<string | null>(null);
  useEffect(() => {
    if (!done || loggedFor.current === node.id) return;
    loggedFor.current = node.id;
    setLog((previous) => [
      ...previous,
      { kind: 'clippy', node, key: `${node.id}-${previous.length}` },
    ]);
  }, [done, node]);

  // True once this node has been handed off to the log above. Derived
  // directly from `log` itself (not a ref or extra state), so the live slot
  // stops rendering that node's text the same render the log picks it up —
  // otherwise the fully-typed node would briefly appear twice (once in the
  // log, once still "live").
  const lastLogged = log[log.length - 1];
  const justLogged = done && lastLogged?.kind === 'clippy' && lastLogged.node.id === node.id;

  // Keep the log pinned to its latest entry as Clippy types and as replies
  // are appended, the way a chat window does — but only while the visitor
  // hasn't scrolled up to read earlier messages, so new text never yanks
  // them back down to the bottom mid-read.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !pinnedToBottom) return;
    container.scrollTop = container.scrollHeight;
  }, [log, visible, pinnedToBottom]);

  // Tracks how close the log's scroll position is to its bottom, so the
  // "jump to latest" arrow appears only once the visitor has actually
  // scrolled away from it, and disappears the instant they're snapped back.
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    setPinnedToBottom(distanceFromBottom < 24);
  }, []);

  const scrollToBottom = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: skipAnimation ? 'auto' : 'smooth' });
    setPinnedToBottom(true);
  }, [skipAnimation]);

  // Index of the line currently being typed, so only it carries the caret.
  const activeLine = visible.reduce(
    (last, line, index) => (line.length > 0 ? index : last),
    0,
  );

  const choose = useCallback((reply: ClippyReply) => {
    setLog((previous) => [
      ...previous,
      { kind: 'visitor', label: reply.label, key: `reply-${previous.length}` },
    ]);
    if (reply.to) setNodeId(reply.to);
  }, []);

  // `return`'s third reply is page-specific, so it's assembled here rather
  // than hardcoded in the script.
  const replies = useMemo(() => {
    if (node.id !== CLIPPY_RETURN_ROOT) return node.replies;
    return [
      ...node.replies,
      { label: clippyPageLabel(pathname), to: clippyPageTarget(pathname) },
    ];
  }, [node, pathname]);

  return (
    <div className="clippy-window__body">
      <div className="clippy-chat" ref={scrollRef} onScroll={handleScroll}>
        {log.map((entry) =>
          entry.kind === 'visitor' ? (
            <p className="clippy-chat__bubble clippy-chat__bubble--out" key={entry.key}>
              {entry.label}
            </p>
          ) : (
            // Clippy's avatar sits bottom-left of his own message group,
            // the way a messaging app anchors the sender's avatar beside
            // their bubbles rather than repeating it per line.
            <div className="clippy-chat__row" key={entry.key}>
              <div className="clippy-chat__avatar" aria-hidden="true">
                <ClippyMark className="clippy__art" mood="idle" />
              </div>
              <div className="clippy-chat__bubble-group">
                {entry.node.lines.map((line, lineIndex) => (
                  <p className="clippy-chat__bubble clippy-chat__bubble--in" key={lineIndex}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ),
        )}

        {/* The live message: whichever node is currently typing (or a
            "thinking" beat before it starts) or awaiting a reply. Once
            that node has been handed off to the log above (`justLogged`),
            it stops rendering here so the same message never appears
            twice at once. */}
        {!justLogged && (
          <div className="clippy-chat__row">
            <div className="clippy-chat__avatar" aria-hidden="true">
              <ClippyMark className="clippy__art" mood={done ? 'idle' : 'talking'} blinking={blinking} />
            </div>
            <div className="clippy-chat__bubble-group">
              {thinking ? (
                <span className="clippy-chat__bubble clippy-chat__bubble--in clippy-thinking" aria-label="Clippy is thinking">
                  <span className="clippy-thinking__dot" />
                  <span className="clippy-thinking__dot" />
                  <span className="clippy-thinking__dot" />
                </span>
              ) : (
                visible.map((line, index) => (
                  <p className="clippy-chat__bubble clippy-chat__bubble--in" key={`${node.id}-${index}`}>
                    {line}
                    {!done && index === activeLine && <span className="caret" aria-hidden="true" />}
                  </p>
                ))
              )}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {done && (
            <motion.div
              className="clippy__replies"
              key={node.id}
              initial={skipAnimation ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {replies.map((reply) => {
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

      {/* Jump-to-latest arrow: appears once the visitor scrolls away from
          the bottom of the log, disappears the moment they're snapped back
          to it (handleScroll above tracks that). */}
      <AnimatePresence>
        {!pinnedToBottom && (
          <motion.button
            className="clippy-chat__jump"
            type="button"
            onClick={scrollToBottom}
            aria-label="Jump to latest message"
            initial={skipAnimation ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={skipAnimation ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            <ChevronDown />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/** The modal window + overlay, shared by every trigger. Lives in the provider. */
function ClippyWindow() {
  const { open, rootId, openCount, closeClippy } = useClippyContext();
  const reducedMotion = useReducedMotion();
  const skipAnimation = Boolean(reducedMotion);
  const dialogRef = useRef<HTMLDivElement>(null);

  /*
   * While the window is open: close on Escape and lock the page behind it
   * from scrolling. Focus moves into the dialog on open.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeClippy();
    };

    // `overscroll-behavior: contain` on the chat log (see globals.css) keeps
    // scrolling inside it from chaining to the page once the log itself
    // hits its scroll limits; locking body overflow here is the fallback
    // for the backdrop area, which has nothing of its own to scroll.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [closeClippy, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="clippy-overlay"
          initial={skipAnimation ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeClippy}
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
                onClick={closeClippy}
                aria-label="Close assistant"
              >
                <X />
              </button>
            </div>

            <ClippyConversation
              key={openCount}
              skipAnimation={skipAnimation}
              rootId={rootId}
              onClose={closeClippy}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Decides whether the dock should be visible, based on scroll direction and
 * proximity to the footer — rather than lifting it to clear the footer, it
 * simply disappears once the footer comes into view, and reappears as soon
 * as the visitor scrolls back up (same rule as scrolling down elsewhere on
 * the page: scrolling down hides it, scrolling up brings it back).
 */
function useDockVisible() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const measure = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current + 4;
      const scrollingUp = currentScrollY < lastScrollY.current - 4;

      // Hides well before the dock could ever overlap the footer's text
      // (its own height plus the margin it keeps from the viewport edge),
      // not just the instant the footer's top edge appears.
      const footer = document.querySelector('.site-footer--columns');
      const dockClearance = 56 + Math.min(28, Math.max(16, window.innerWidth * 0.04));
      const nearFooter = footer
        ? footer.getBoundingClientRect().top < window.innerHeight - dockClearance
        : false;

      if (nearFooter) {
        setVisible(false);
      } else if (scrollingDown) {
        setVisible(false);
      } else if (scrollingUp || currentScrollY < 80) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    // Run once immediately, so a short page that already shows the footer
    // on load (before any scroll/resize event fires) never briefly shows
    // the dock on top of it.
    measure();

    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return visible;
}

/**
 * The docked trigger: a small fixed button in the bottom-right corner,
 * present on every page. This is "Clippy docked" — closing the window, or
 * navigating while it's open, always leaves him here.
 *
 * Styled as an ordinary chat/messaging launcher (a message-bubble icon on a
 * branded circular button), not a floating character — it reads as "open
 * chat" the way any site's support widget does. It hides entirely rather
 * than lifting above the footer: scrolling down hides it, scrolling back up
 * (or approaching the footer) brings it back/away respectively.
 */
export function ClippyDock() {
  const { open, openClippy, closeClippy, justDocked } = useClippyContext();
  const reducedMotion = useReducedMotion();
  const visible = useDockVisible();

  return (
    <AnimatePresence>
      {(visible || open) && (
        <motion.button
          className="clippy-dock"
          type="button"
          onClick={() => (open ? closeClippy() : openClippy())}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={open ? 'Close Clippy' : 'Open Clippy, the portfolio assistant'}
          initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: !reducedMotion && justDocked ? [0.85, 1] : 1,
          }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="clippy-dock__shell">
            {open ? <X /> : <MessageCircle />}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/**
 * The homepage hero's greeting + figure. Purely a trigger for the shared
 * conversation — stays in the hero permanently (it does not fade away once
 * the dock has appeared; the hero figure and the dock are two separate,
 * simultaneously-visible triggers for the same conversation).
 */
export function ClippyHeroFigure() {
  const { openClippy } = useClippyContext();
  const reducedMotion = useReducedMotion();
  const skipAnimation = Boolean(reducedMotion);
  const blinking = useBlink(!skipAnimation);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="clippy">
      {/*
        The whole character is the trigger. It is a button (not a figure
        with a separate link) so it is reachable by keyboard and
        announced as the control that opens the conversation.
      */}
      <button
        className="clippy__trigger"
        type="button"
        ref={triggerRef}
        onClick={openClippy}
        aria-haspopup="dialog"
      >
        <span className="clippy__greeting">
          {GREETING}
          <span className="clippy__greeting-tail" aria-hidden="true" />
        </span>

        <span className="clippy__figure">
          <ClippyMark className="clippy__art" mood="idle" blinking={blinking} />
        </span>
      </button>
    </div>
  );
}
