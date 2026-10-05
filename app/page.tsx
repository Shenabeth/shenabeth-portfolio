import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FEATURED_PROJECTS } from "@/config/constants";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection projects={FEATURED_PROJECTS} />
      <CertificationsSection variant="link" />
      <ContactSection />
    </>
  );
}
