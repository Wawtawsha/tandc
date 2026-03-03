import type { Metadata } from "next";
import { HeroSection } from "@/components/hero/HeroSection";
import { TrustStrip } from "@/components/trust/TrustStrip";
import { CategoryGrid } from "@/components/categories/CategoryGrid";
import { LaZBoySection } from "@/components/products/LaZBoySection";
import { AshleySection } from "@/components/products/AshleySection";
import { VideoShowcase } from "@/components/products/VideoShowcase";
import { ContactSection } from "@/components/contact/ContactSection";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Home",
  description: "Town & Country Furniture - Farmville, Virginia's home for La-Z-Boy and Ashley Furniture.",
  openGraph: {
    title: "Town & Country Furniture | Farmville, VA",
    description: "Farmville, Virginia's home for La-Z-Boy and Ashley Furniture.",
    url: SITE_URL,
  },
};

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <TrustStrip />
      <CategoryGrid />
      <LaZBoySection />
      <AshleySection />
      <VideoShowcase />
      <ContactSection />
    </main>
  );
}
