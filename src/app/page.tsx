import { AboutSection } from "@/components/sections/AboutSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { MethodSection } from "@/components/sections/MethodSection";
import { SegmentsSection } from "@/components/sections/SegmentsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

/**
 * Home — Server Component puro.
 * Só as folhas interativas (botões, cards com tracking, revelações de scroll)
 * carregam JavaScript no cliente.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <AboutSection />
      <ServicesSection />
      <CasesSection />
      <SegmentsSection />
      <MethodSection />
      <FinalCTA />
    </>
  );
}
