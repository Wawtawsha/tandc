import type { Metadata } from "next";
import { StorySection } from "@/components/about/StorySection";
import { PhotoGrid } from "@/components/about/PhotoGrid";
import { DeliveryPromise } from "@/components/about/DeliveryPromise";

export const metadata: Metadata = {
  title: "About Us | Family Owned Furniture Store in Farmville, VA",
  description: "Town & Country Furniture has been serving Farmville, Virginia families with quality La-Z-Boy and Ashley Furniture. Locally owned, personally delivered.",
  openGraph: {
    title: "About Us | Family Owned Furniture Store in Farmville, VA",
    description: "Town & Country Furniture has been serving Farmville, Virginia families with quality La-Z-Boy and Ashley Furniture. Locally owned, personally delivered.",
    url: "https://townandcountryfurniture.com/about",
    type: "website",
  },
};

export default function About() {
  // Basic FurnitureStore JSON-LD structured data (Phase 7 will expand)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Town & Country Furniture",
    "description": "Family-owned furniture store in Farmville, Virginia specializing in La-Z-Boy and Ashley Furniture.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5301 Farmville Rd",
      "addressLocality": "Farmville",
      "addressRegion": "VA",
      "postalCode": "23901",
      "addressCountry": "US"
    },
    "telephone": "+14342238163",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <main id="main-content">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Intro Section */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            About Town & Country Furniture
          </h1>
          <p className="text-xl text-muted">
            Your local, family-owned furniture store in Farmville, Virginia
          </p>
        </div>
      </section>

      {/* Story Section - bg-background */}
      <StorySection />

      {/* Photo Grid - bg-surface */}
      <PhotoGrid />

      {/* Delivery Promise - bg-background */}
      <DeliveryPromise />
    </main>
  );
}
