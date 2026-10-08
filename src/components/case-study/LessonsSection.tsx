/*
 * File: LessonsSection.tsx
 * Purpose: Final reflection block for a case study — a short list of
 *          takeaways rendered as monospace lines with scroll-in reveal.
 */

'use client';

import { motion } from 'framer-motion';

interface LessonsSectionProps {
  lessons: string[];
}

/**
 * Reflection bullets rendered as monospace code comments.
 *
 * @param lessons - Takeaway strings
 * @returns List element
 */
export function LessonsSection({ lessons }: LessonsSectionProps): React.ReactElement {
  return (
    <ul className="lessons-list">
      {lessons.map((lesson, i) => (
        <motion.li
          key={lesson}
          className="lessons-item"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
        >
          <span className="lessons-item-marker">{`// 0${i + 1}`}</span>
          <span className="lessons-item-text">{lesson}</span>
        </motion.li>
      ))}
    </ul>
  );
}
