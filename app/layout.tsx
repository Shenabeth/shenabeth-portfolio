import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

// Fonts (Space Grotesk for UI/headings, JetBrains Mono for the code voice)
// load via the @import at the top of globals.css, and are exposed as the
// --sans / --mono tokens rather than being named at each use site.

export const metadata: Metadata = {
  title: "Shenabeth Jenkins — Software Developer",
  description:
    "Shenabeth Jenkins — software developer and cloud architect building thoughtful, production-ready systems.",
};

// themeColor belongs in `viewport`, not `metadata`, in the App Router.
// `width`/`initialScale` emit the device-width viewport meta; without it
// phones lay the page out at a ~980px default and scale it down, which cuts
// off the right edge of the hero.
export const viewport: Viewport = {
  themeColor: "#0b0d0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {/* The reference's single background layer: one soft radial wash
            plus faint horizontal rules. Replaces the previous site's
            blurred glow stack. */}
        <div className="ambient" aria-hidden="true" />
        <ScrollToTop />
        <NavBar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
