import type { Metadata } from "next";
import { StorySection } from "@/components/about/StorySection";
import { PhotoGrid } from "@/components/about/PhotoGrid";
import { DeliveryPromise } from "@/components/about/DeliveryPromise";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "About Us | Family Owned Furniture Store in Farmville, VA",
  description: "Town & Country Furniture has been serving Farmville, Virginia families with quality La-Z-Boy and Ashley Furniture. Locally owned, personally delivered.",
  openGraph: {
    title: "About Us | Family Owned Furniture Store in Farmville, VA",
    description: "Town & Country Furniture has been serving Farmville, Virginia families with quality La-Z-Boy and Ashley Furniture. Locally owned, personally delivered.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

export default function About() {
  // BreadcrumbList JSON-LD for navigation context
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
      },
    ],
  };

  return (
    <main id="main-content">
      {/* BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
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
