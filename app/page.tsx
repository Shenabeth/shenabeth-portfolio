/*
 * File: page.tsx
 * Purpose: Homepage. Renders the landing page ported from the reference
 *          prototype (docs/Portfolio) — hero, selected work, about,
 *          credentials, contact — as a single scrolling page.
 *
 *          All of it lives in LandingPage so the reference markup stays in
 *          one piece rather than being split across the older per-section
 *          home components (HeroSection, WorkSection, AboutSection,
 *          CredentialsSection, ContactCallout), which the homepage no
 *          longer uses.
 */

import { LandingPage } from "@/components/home/LandingPage";

export default function Home() {
  return <LandingPage />;
}
