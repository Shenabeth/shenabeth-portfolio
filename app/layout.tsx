import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shenabeth Jenkins | Portfolio",
  description: "Full-stack engineer building on AWS",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="site-background" aria-hidden="true">
          <div className="site-background-grid" />
          <div className="site-background-glow-1" />
          <div className="site-background-glow-2" />
          <div className="site-background-fade" />
        </div>
        <ScrollToTop />
        <NavBar />
        <div className="relative z-10 flex-grow">
          <main className="pt-24">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
