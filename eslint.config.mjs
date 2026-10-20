import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // docs/Portfolio is a standalone reference prototype (Vite + React),
    // not part of this Next.js app — it's read for its layout/CSS ideas,
    // never imported, and isn't held to this app's lint rules.
    "docs/**",
  ]),
]);

export default eslintConfig;
