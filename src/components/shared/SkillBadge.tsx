import React from 'react';
import { Badge } from '@/components/ui/badge';

/*
 * File: SkillBadge.tsx
 * Purpose: Display individual skill as a small badge/tag
 */

interface SkillBadgeProps {
  label: string;
}

/**
 * Display a skill as a small pill-shaped badge
 *
 * @param label - Skill name to display
 */
export function SkillBadge({ label }: SkillBadgeProps) {
  return <Badge variant="secondary">{label}</Badge>;
}
