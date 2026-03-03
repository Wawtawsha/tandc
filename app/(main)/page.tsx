import type { Metadata } from "next";
import { HeroSection } from "@/components/hero/HeroSection";
import { TrustStrip } from "@/components/trust/TrustStrip";
import { CategoryGrid } from "@/components/categories/CategoryGrid";
import { LaZBoySection } from "@/components/products/LaZBoySection";
import { AshleySection } from "@/components/products/AshleySection";
import { VideoShowcase } from "@/components/products/VideoShowcase";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Home",
  description: "Town & Country Furniture - Farmville, Virginia's home for La-Z-Boy and Ashley Furniture.",
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
