/*
 * File: scripts/copy-resume.mjs
 * Purpose: Copy the canonical resume PDF from the repo root into public/ so
 *          Next.js serves it at the site root. The root copy is the one to
 *          edit; public/ is git-ignored and regenerated on every build.
 *          Runs automatically via the `prebuild` npm script (and before
 *          `dev`). Kept dependency-free and cross-platform so it adds no
 *          measurable build time.
 */

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILENAME = 'Shenabeth_Jenkins_Software_Engineer_Resume.pdf';

const source = join(root, FILENAME);
const destDir = join(root, 'public');
const dest = join(destDir, FILENAME);

if (!existsSync(source)) {
  console.warn(`[copy-resume] ${FILENAME} not found in repo root — skipping.`);
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });
copyFileSync(source, dest);
console.log(`[copy-resume] Copied ${FILENAME} -> public/`);
