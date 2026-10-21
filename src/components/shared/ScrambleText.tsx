'use client';

import { useEffect, useState } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
const INSTANT_DURATION = 350;
const REVEAL_DURATION = 1400;
const SCRAMBLE_INTERVAL = 50;

/**
 * @param instant - When true, every character scrambles together for a
 * short beat and then snaps directly to the final text all at once,
 * instead of revealing left-to-right over the full duration.
 */
export function ScrambleText({ text, instant = false }: { text: string; instant?: boolean }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let startTime: number;
    let lastScrambleTime = 0;
    const duration = instant ? INSTANT_DURATION : REVEAL_DURATION;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress >= 1) {
        setDisplayText(text);
        return;
      }

      if (currentTime - lastScrambleTime >= SCRAMBLE_INTERVAL) {
        lastScrambleTime = currentTime;
        const newText = text
          .split('')
          .map((char, index) => {
            if (instant) {
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            }
            const charDelay = (index / text.length) * duration;
            if (elapsed < charDelay) {
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            }
            return char;
          })
          .join('');

        setDisplayText(newText);
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [text, instant]);

  return displayText;
}
