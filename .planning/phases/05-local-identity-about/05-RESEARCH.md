# Phase 5: Local Identity & About - Research

**Researched:** 2026-03-02
**Domain:** Local business trust-building, About page architecture, partner branding
**Confidence:** MEDIUM

## Summary

This research investigates how to build effective "About Us" content for a local furniture store website, focusing on trust-building elements that differentiate Town & Country from corporate competitors. The core challenge is implementing authentic local storytelling, partner brand representation, delivery messaging, and photo placeholders within Next.js 16 app router constraints.

**Key findings:**
- Separate /about page is SEO-superior to homepage-only content in 2026
- Partner badges should appear in footer with consistent sizing and transparent PNG format
- Local delivery messaging should emphasize personal accountability and community presence
- Photo placeholders using oklch backgrounds (existing pattern) work well for "coming soon" states
- FurnitureStore schema markup is more specific than generic LocalBusiness for SEO

**Primary recommendation:** Create a dedicated /about page with structured sections (story, team/photos, delivery promise, partner badges), implement FurnitureStore JSON-LD schema, and use server components throughout for SEO benefits.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16.x | Page structure & SEO | Native metadata API, server components by default |
| Lucide Icons | Latest | Trust icons, delivery badges | Already in use, tree-shakeable, server component compatible |
| Tailwind CSS | 4.x | Layout & responsive design | Already configured, oklch color system |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/image | 16.x (built-in) | Photo placeholders | For store photos, team photos |
| motion/react | Latest | Reveal animations | Optional for About page sections (useScrollReveal hook exists) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Separate /about page | Homepage sections only | SEO worse: 2026 research shows dedicated pages rank better |
| Server Components | Client Components | Lose SEO benefits, increase JS bundle |
| oklch placeholders | Gray skeleton loaders | Less intentional, more generic |

**Installation:**
No new dependencies required - all tools already in project.

## Architecture Patterns

### Recommended About Page Structure
```
app/(main)/about/
└── page.tsx              # Server Component with sections

Components to create:
components/about/
├── StorySection.tsx      # Server Component - family history narrative
├── PhotoGrid.tsx         # Server Component - store/team photo placeholders
├── DeliveryPromise.tsx   # Server Component - local delivery trust messaging
└── PartnerBadges.tsx     # Server Component - La-Z-Boy & Ashley badges
```

### Pattern 1: Dedicated About Page (Not Homepage Sections)
**What:** Create /about as a standalone page with deep content, not just homepage anchors
**When to use:** Always for local SEO in 2026
**Why:** "Creating a dedicated page for each service is the #1 local organic ranking factor according to Whitespark's 2026 data" - separate pages with unique content perform better than cramming everything onto homepage

**SEO Implementation:**
```typescript
// app/(main)/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Family Owned Furniture Store in Farmville, VA",
  description: "Town & Country Furniture has been serving Farmville, Virginia with quality La-Z-Boy and Ashley Furniture. Family owned, locally delivered.",
  openGraph: {
    title: "About Town & Country Furniture",
    description: "Family owned furniture store serving Farmville since [year]",
    type: "website",
  },
};

export default function About() {
  return (
    <main>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FurnitureStore",
            name: "Town & Country Furniture",
            address: {
              "@type": "PostalAddress",
              streetAddress: "5301 Farmville Rd",
              addressLocality: "Farmville",
              addressRegion: "VA",
              postalCode: "23901",
            },
            telephone: "+14342238163",
            openingHoursSpecification: [
              // ... hours
            ],
            image: "[store exterior photo URL]",
            priceRange: "$$",
          }),
        }}
      />
      {/* Page content */}
    </main>
  );
}
```
**Source:** [Next.js Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), [Google LocalBusiness Schema](https://developers.google.com/search/docs/appearance/structured-data/local-business)

### Pattern 2: Photo Placeholder with oklch Background
**What:** Reuse ProductCard placeholder pattern for store/team photos
**When to use:** When client hasn't provided images yet
**Example:**
```typescript
// components/about/PhotoGrid.tsx
export function PhotoGrid() {
  const placeholderPhotos = [
    { id: 1, alt: "Store exterior", color: "oklch(0.75 0.08 70)" },
    { id: 2, alt: "Showroom interior", color: "oklch(0.75 0.08 55)" },
    { id: 3, alt: "Team photo", color: "oklch(0.75 0.08 80)" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {placeholderPhotos.map((photo) => (
        <div
          key={photo.id}
          className="relative aspect-[4/3] rounded-lg overflow-hidden"
          style={{ backgroundColor: photo.color }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <svg className="w-12 h-12 text-white/60" /* camera icon */>
              {/* Icon path */}
            </svg>
            <span className="text-white/70 text-sm font-medium">
              Photo Coming Soon
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
```
**Source:** Existing codebase pattern from ProductCard.tsx (lines 36-54)

### Pattern 3: Partner Badges in Footer
**What:** Add La-Z-Boy and Ashley logos to footer as authorized dealer badges
**When to use:** Always - establishes brand credibility
**Example:**
```typescript
// components/Footer.tsx (add to existing footer)
<div className="border-t border-border-subtle mt-8 pt-6">
  {/* Partner Badges */}
  <div className="flex items-center justify-center gap-8 mb-6">
    <div className="flex items-center gap-2">
      <Award className="w-5 h-5 text-accent" />
      <span className="text-sm text-muted">Authorized La-Z-Boy Dealer</span>
    </div>
    <div className="flex items-center gap-2">
      <Award className="w-5 h-5 text-accent" />
      <span className="text-sm text-muted">Ashley Furniture Partner</span>
    </div>
  </div>

  {/* Copyright */}
  <p className="text-sm text-muted text-center">
    &copy; {currentYear} Town &amp; Country Furniture. All rights reserved.
  </p>
</div>
```
**Why text-based initially:** Official badge assets require dealer portal access (not publicly available). Text with Award icon provides same trust signal without trademark risk.
**Source:** [Partner badge placement research](https://elfsight.com/logo-showcase-widget/templates/partner-logo/), existing TrustStrip pattern using Lucide icons

### Pattern 4: Two-Column Story Layout
**What:** Image-text alternating sections for storytelling
**When to use:** About page narrative sections
**Example:**
```typescript
// components/about/StorySection.tsx
export function StorySection() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            {/* Placeholder or actual image */}
          </div>

          {/* Right: Text */}
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Family Owned Since [Year]
            </h2>
            <p className="text-muted mb-4">
              {/* Story content */}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```
**Source:** [Two-column layout patterns](https://www.uxpin.com/studio/blog/web-layout-best-practices-12-timeless-ui-patterns-explained/), existing HeroSection pattern (lines 7-51)

### Anti-Patterns to Avoid
- **Homepage-only content:** Don't put About content only on homepage - creates weak SEO signal
- **Generic LocalBusiness schema:** Use FurnitureStore type instead for more precise signal
- **Vague delivery messaging:** Avoid corporate-speak like "fast shipping" - use specific "We deliver personally to your Farmville home"
- **Client components by default:** Don't add 'use client' unless interactivity needed - hurts SEO

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Metadata/SEO tags | Custom head manipulation | Next.js Metadata API | Built-in, supports OpenGraph, Twitter cards, canonical |
| Structured data | Manual JSON-LD strings | Next.js script with dangerouslySetInnerHTML | Type-safe, validated by Rich Results Test |
| Image optimization | Custom lazy loading | next/image component | Automatic WebP, size optimization, lazy load |
| Responsive grids | Custom media queries | Tailwind grid classes | Mobile-first, tested breakpoints |
| Partner badge SVGs | Hand-coded SVGs | Lucide Award icon + text | Accessible, no trademark risk, works in server components |

**Key insight:** Next.js 16 App Router provides SEO and performance optimizations out-of-box. Using native features (Metadata API, next/image, server components) is faster and more maintainable than custom solutions.

## Common Pitfalls

### Pitfall 1: Partner Badge Trademark Violations
**What goes wrong:** Using official La-Z-Boy/Ashley logos without proper authorization can violate trademark rules
**Why it happens:** Official badge assets aren't publicly available - require dealer portal access
**How to avoid:** Start with text-based badges ("Authorized La-Z-Boy Dealer") using Lucide Award icon. Client can provide official assets later if they have portal access.
**Warning signs:**
- Downloading logos from unofficial sources (Google Images, logo sites)
- Using logos without dealer agreement language
**Source:** [La-Z-Boy Brand Guidelines](https://brandguidelines.la-z-boy.com/corporate/logo-guidelines) require contacting marketing for dealer badges

### Pitfall 2: Vague "About Us" Content That Lacks Specificity
**What goes wrong:** Generic placeholder text like "We've been serving the community for years" doesn't build trust
**Why it happens:** Waiting for client to provide exact history/details
**How to avoid:** Use realistic placeholders that show the *structure* of good content:
- Specific founding year (even if placeholder)
- Names of family members (even if "the [Family] family")
- Concrete local references ("Farmville community", "Prince Edward County")
**Warning signs:**
- Text could apply to any business in any town
- No proper nouns (names, places, dates)
**Source:** [Family Business Storytelling](https://www.familybusinessunited.com/post/the-power-of-storytelling-elevating-family-businesses-as-brands) - authenticity requires specifics

### Pitfall 3: Delivery Messaging That Echoes Corporate Complaints
**What goes wrong:** Using phrases like "fast shipping" or "reliable delivery" sounds like the corporate competitors customers complain about
**Why it happens:** Default to standard e-commerce language
**How to avoid:** Emphasize personal, local differentiation:
- **Good:** "We deliver personally to your Farmville home"
- **Good:** "Our team handles your furniture with care - we see you in our community"
- **Bad:** "Fast, reliable shipping"
- **Bad:** "Free delivery on orders over $X"
**Warning signs:** Language could be on Wayfair or Amazon
**Source:** [Local furniture retailer differentiation](https://myhfa.org/blog/restoring-joy-and-confidence-in-the-furniture-shopping-experience-with-data-driven-insights/) - "local accountability matters"

### Pitfall 4: Using Client Components for Static Content
**What goes wrong:** Adding 'use client' to About page sections when no interactivity needed - increases JS bundle, hurts SEO
**Why it happens:** Habit from older Next.js patterns or misunderstanding server component constraints
**How to avoid:**
- Keep About page and all sections as server components
- Only use 'use client' if section needs useState, onClick, etc.
- Icons from Lucide work fine in server components
**Warning signs:**
- Adding 'use client' "just in case"
- Using useState for data that never changes
**Source:** [Next.js Server Components Guide](https://nextjs.org/docs/app/getting-started/server-and-client-components) - server components by default

### Pitfall 5: FurnitureStore vs LocalBusiness Schema
**What goes wrong:** Using generic LocalBusiness type when FurnitureStore is more specific
**Why it happens:** Most tutorials show LocalBusiness examples
**How to avoid:** Use "@type": "FurnitureStore" - it's a subtype of Store which is a subtype of LocalBusiness
**Warning signs:** Copy-pasted schema examples without checking schema.org subtypes
**Source:** [Schema.org FurnitureStore](https://schemantra.com/schema_list/FurnitureStore) - "the more precise the type, the clearer the signal"

## Code Examples

Verified patterns from official sources:

### Example 1: About Page with FurnitureStore Schema
```typescript
// app/(main)/about/page.tsx
import type { Metadata } from "next";
import { StorySection } from "@/components/about/StorySection";
import { PhotoGrid } from "@/components/about/PhotoGrid";
import { DeliveryPromise } from "@/components/about/DeliveryPromise";

export const metadata: Metadata = {
  title: "About Us - Family Owned Furniture Store in Farmville, VA",
  description: "Town & Country Furniture has been serving Farmville, Virginia families with quality La-Z-Boy and Ashley Furniture. Locally owned, personally delivered.",
  openGraph: {
    title: "About Town & Country Furniture",
    description: "Family owned furniture store serving Farmville since [year]",
    url: "https://townandcountryfurniture.com/about",
    type: "website",
  },
};

export default function About() {
  return (
    <main id="main-content">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FurnitureStore",
            name: "Town & Country Furniture",
            description: "Family owned furniture store specializing in La-Z-Boy and Ashley Furniture",
            address: {
              "@type": "PostalAddress",
              streetAddress: "5301 Farmville Rd",
              addressLocality: "Farmville",
              addressRegion: "VA",
              postalCode: "23901",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "37.30164",
              longitude: "-78.38809",
            },
            telephone: "+14342238163",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "17:30",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "09:00",
                closes: "17:00",
              },
            ],
            image: "https://townandcountryfurniture.com/store-exterior.jpg",
            priceRange: "$$",
            url: "https://townandcountryfurniture.com",
          }),
        }}
      />

      {/* Hero/Introduction */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            About Town &amp; Country Furniture
          </h1>
          <p className="text-xl text-muted">
            Your local, family-owned furniture store in Farmville, Virginia
          </p>
        </div>
      </section>

      <StorySection />
      <PhotoGrid />
      <DeliveryPromise />
    </main>
  );
}
```
**Source:** [Next.js Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), [Google Local Business Schema](https://developers.google.com/search/docs/appearance/structured-data/local-business)

### Example 2: DeliveryPromise Component (Trust Messaging)
```typescript
// components/about/DeliveryPromise.tsx
import { Truck, Heart, Users } from 'lucide-react';

const promises = [
  {
    icon: Truck,
    title: "We Deliver Personally",
    description: "Not a corporate truck - our team brings furniture to your Farmville home with care",
  },
  {
    icon: Heart,
    title: "Your Neighbors, Not a Chain",
    description: "We're part of this community. When something goes wrong, we make it right - we'll see you at the grocery store.",
  },
  {
    icon: Users,
    title: "Family-Owned Accountability",
    description: "The [Family] family stands behind every piece. Your satisfaction is our reputation.",
  },
];

export function DeliveryPromise() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Why Buy Local?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {promises.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center">
              <Icon className="w-12 h-12 text-accent mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```
**Source:** Adapted from TrustStrip.tsx pattern, messaging informed by [local furniture retailer research](https://myhfa.org/blog/restoring-joy-and-confidence-in-the-furniture-shopping-experience-with-data-driven-insights/)

### Example 3: Photo Placeholder Grid
```typescript
// components/about/PhotoGrid.tsx
export function PhotoGrid() {
  const photoSlots = [
    { id: "exterior", alt: "Store exterior", color: "oklch(0.75 0.08 70)" },
    { id: "showroom", alt: "Showroom interior", color: "oklch(0.75 0.08 55)" },
    { id: "team", alt: "Our team", color: "oklch(0.75 0.08 80)" },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Visit Our Farmville Showroom
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photoSlots.map((slot) => (
            <div
              key={slot.id}
              className="relative aspect-[4/3] rounded-xl overflow-hidden"
              style={{ backgroundColor: slot.color }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <svg
                  className="w-12 h-12 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span className="text-white/70 text-sm font-medium">
                  Photo Coming Soon
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=5301+Farmville+Rd+Farmville+VA+23901"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors"
          >
            Get Directions to Our Store
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
```
**Source:** Reuses ProductCard placeholder pattern (ProductCard.tsx lines 36-54)

### Example 4: Updated Footer with Partner Badges
```typescript
// components/Footer.tsx (additions to existing footer)
import Link from 'next/link';
import { Award } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // ... existing footer content (hours, contact, links) ...

  return (
    <footer className="bg-surface border-t border-border-subtle py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        {/* Existing 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ... hours, contact, links ... */}
        </div>

        {/* Partner Badges + Copyright */}
        <div className="border-t border-border-subtle mt-8 pt-6">
          {/* Partner Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" strokeWidth={1.5} />
              <span className="text-sm text-muted">Authorized La-Z-Boy Dealer</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" strokeWidth={1.5} />
              <span className="text-sm text-muted">Ashley Furniture Partner</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted text-center">
            &copy; {currentYear} Town &amp; Country Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```
**Source:** Adapted from TrustStrip.tsx Lucide icon pattern, placement informed by [partner badge research](https://forgeandsmith.com/blog/website-footer-best-practices-improve-ux/)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Homepage-only About sections | Dedicated /about page | 2025-2026 SEO shift | Better ranking: separate pages preferred |
| pages/ directory | app/ directory | Next.js 13+ | Metadata API, server components default |
| Generic LocalBusiness schema | FurnitureStore schema | Always available | More precise signal to Google |
| Manual meta tags in Head | Metadata API export | Next.js 13+ | Type-safe, supports all social platforms |
| Gray skeleton loaders | Color-matched placeholders | Design trend 2024+ | More intentional, brand-aligned |

**Deprecated/outdated:**
- **next-seo package:** Next.js 16 Metadata API makes this unnecessary
- **getStaticProps for About content:** Server components fetch at request time, no build-time data fetching needed
- **pages/about.tsx:** Use app/(main)/about/page.tsx instead

## Open Questions

Things that couldn't be fully resolved:

1. **Official Partner Badge Assets**
   - What we know: La-Z-Boy and Ashley have brand guidelines sites, but dealer badge assets aren't publicly available
   - What's unclear: Whether Town & Country has dealer portal access to download official logos
   - Recommendation: Start with text-based badges using Award icon. Client can provide official assets if available. Verify trademark compliance before using any downloaded logos.

2. **Actual Store History Details**
   - What we know: Need founding year, family names, specific community involvement details
   - What's unclear: How long has store been operating? Who founded it? Multi-generational?
   - Recommendation: Use realistic placeholder structure ("Since [YEAR]", "The [FAMILY] family") that shows proper storytelling format. Client fills in actual details.

3. **Store Photo Requirements**
   - What we know: Need exterior, showroom interior, possibly team photo
   - What's unclear: Photo quality, aspect ratio preferences, number of photos client can provide
   - Recommendation: Create 3-photo grid with 4:3 aspect placeholders (matches ProductCard pattern). Easy to extend to 4 or 6 photos by changing grid-cols class.

4. **Delivery Area Specificity**
   - What we know: Should emphasize local, personal delivery
   - What's unclear: Specific delivery radius (just Farmville? Prince Edward County? Larger region?)
   - Recommendation: Use "Farmville area" language initially. Client can specify exact delivery zone later.

## Sources

### Primary (HIGH confidence)
- [Next.js 16 Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) - Official Next.js documentation
- [Google Local Business Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business) - Official Google guidelines
- [Next.js Server Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) - Official Next.js documentation
- [Schema.org FurnitureStore](https://schema.org/FurnitureStore) - Official schema definition
- Existing codebase patterns (ProductCard.tsx, TrustStrip.tsx, Footer.tsx, HeroSection.tsx)

### Secondary (MEDIUM confidence)
- [Local SEO 2026 Best Practices](https://searchengineland.com/local-seo-sprints-a-90-day-plan-for-service-businesses-in-2026-469059) - Industry analysis, verified dedicated pages > homepage sections
- [FurnitureStore Schema Guide](https://schemantra.com/schema_list/FurnitureStore) - Schema implementation resource
- [La-Z-Boy Brand Guidelines](https://brandguidelines.la-z-boy.com/corporate/logo-guidelines) - Official brand site (dealer badge access requires authorization)
- [Partner Logo Placement](https://forgeandsmith.com/blog/website-footer-best-practices-improve-ux/) - UX best practices
- [Family Business Storytelling](https://www.familybusinessunited.com/post/the-power-of-storytelling-elevating-family-businesses-as-brands) - Authentic content patterns
- [Local Furniture Retailer Differentiation](https://myhfa.org/blog/restoring-joy-and-confidence-in-the-furniture-shopping-experience-with-data-driven-insights/) - Industry research on delivery messaging

### Tertiary (LOW confidence)
- [CSS Skeleton Loaders](https://www.freecodecamp.org/news/how-to-build-skeleton-screens-using-css-for-better-user-experience/) - General pattern, not oklch-specific
- [Two-Column Layout Examples](https://www.uxpin.com/studio/blog/web-layout-best-practices-12-timeless-ui-patterns-explained/) - General web design patterns
- [About Page Examples](https://www.canva.com/learn/unique-inspiring-about-page/) - Design inspiration, not technical implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Next.js 16 features are official and documented
- Architecture: HIGH - Pattern verified in existing codebase, SEO research from authoritative sources (Google, Whitespark 2026)
- Pitfalls: MEDIUM - Based on industry research and brand guidelines sites, but trademark rules require legal verification
- Partner badges: MEDIUM - Placement patterns verified, but official asset access unclear
- Content strategy: LOW - Storytelling patterns identified, but specific Town & Country details unknown

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (30 days - stable Next.js features, but SEO best practices evolve)
