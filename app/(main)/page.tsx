import type { Metadata } from "next";
import { HeroSection } from "@/components/hero/HeroSection";
import { TrustStrip } from "@/components/trust/TrustStrip";
import { CategoryGrid } from "@/components/categories/CategoryGrid";

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
    </main>
  );
}
