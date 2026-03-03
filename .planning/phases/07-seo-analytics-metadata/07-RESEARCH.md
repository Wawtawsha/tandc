# Phase 7: SEO, Analytics & Metadata - Research

**Researched:** 2026-03-03
**Domain:** Next.js 16 SEO, Schema.org structured data, OpenGraph metadata, Google Analytics 4
**Confidence:** HIGH

## Summary

Phase 7 implements comprehensive SEO and analytics for the Town & Country Furniture website using Next.js 16's built-in metadata APIs, schema.org structured data, and Google Analytics 4. The research reveals that Next.js 16 provides file-based conventions for OpenGraph images, the `@next/third-parties` package for GA4 integration, and excellent metadata inheritance patterns.

Key findings show that the existing codebase already has foundational structured data (Organization/FurnitureStore JSON-LD) in place but lacks OpenGraph configuration, per-page metadata optimization, brand affiliation details, and comprehensive event tracking. The About page contains duplicate JSON-LD that should be consolidated with the root layout.

GA4 Enhanced Measurement automatically tracks page views (client-side navigation), scroll depth (90% only), and video engagement (YouTube with enablejsapi=1), but requires custom event setup for phone clicks, form submissions, and granular CTA tracking. The `@next/third-parties/google` package provides the recommended approach with automatic pageview tracking and the `sendGAEvent` function for custom events.

**Primary recommendation:** Use Next.js 16 file-based metadata conventions with `generateMetadata` for per-page OpenGraph images, consolidate duplicate JSON-LD into a shared utility, implement `@next/third-parties/google` for GA4, create client component wrappers for tracking server-rendered links (phone/directions), and document all events in snake_case with a structured tracking plan.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js Metadata API | 16.1.6 | Static & dynamic metadata, OpenGraph, Twitter cards | Built-in, zero-config, official Next.js approach |
| @next/third-parties/google | latest | GA4 integration, GTM support | Official Next.js package, optimized loading, automatic pageview tracking |
| next/og | 16.1.6 (built-in) | Dynamic OpenGraph image generation via ImageResponse | Built into Next.js, uses Satori for JSX-to-PNG conversion |
| schema.org JSON-LD | N/A | Structured data for search engines | Google's recommended format, supports FurnitureStore, Organization, BreadcrumbList |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-lite-youtube-embed | 3.5.1 (already installed) | YouTube embeds with analytics callbacks | Already in use for HeroVideo, provides `onPlay` callback for tracking |
| Google Rich Results Test | N/A (web tool) | Validate structured data | Testing phase - verify FurnitureStore schema renders correctly |
| Google Tag Manager (optional) | N/A | Advanced event tracking, A/B testing | Only if client needs complex marketing tag management beyond GA4 |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @next/third-parties | Direct gtag.js script injection | @next/third-parties provides automatic memoization, better performance, cleaner API |
| File-based opengraph-image | Static og-image.png files | Dynamic generation allows per-page customization but requires more setup |
| next/og | @vercel/og directly | next/og is the recommended wrapper, handles Edge Runtime automatically |
| JSON-LD scripts | Microdata or RDFa | JSON-LD is Google's recommended format, easier to maintain, separate from HTML |

**Installation:**
```bash
npm install @next/third-parties@latest
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── layout.tsx                    # Root metadata, GA4 component, Organization JSON-LD
├── (main)/
│   ├── page.tsx                 # Homepage metadata export, custom og:image
│   ├── opengraph-image.tsx      # Dynamic OG image generation (homepage)
│   └── about/
│       ├── page.tsx             # About page metadata, removes duplicate JSON-LD
│       └── opengraph-image.tsx  # About page OG image
lib/
├── metadata.ts                   # Centralized config (already exists)
├── analytics/
│   ├── events.ts                # Event tracking utilities (sendGAEvent wrappers)
│   └── TRACKING_PLAN.md         # Event documentation for Nessus integration
components/
├── analytics/
│   ├── PhoneLink.tsx            # Client wrapper for tel: links with tracking
│   ├── DirectionsLink.tsx       # Client wrapper for maps links with tracking
│   └── TrackableButton.tsx      # Reusable CTA tracking component
```

### Pattern 1: Consolidated JSON-LD in Root Layout

**What:** Single source of truth for Organization/FurnitureStore schema in root layout, imported by all pages that need to extend it.

**When to use:** Always - avoid duplicate JSON-LD across multiple pages.

**Current problem:** About page has inline FurnitureStore JSON-LD that duplicates root layout's Organization JSON-LD.

**Example:**
```typescript
// lib/metadata.ts (update existing function)
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "Town & Country Furniture",
    url: SITE_URL,
    description: siteMetadata.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "5301 Farmville Rd",
      addressLocality: "Farmville",
      addressRegion: "VA",
      postalCode: "23901",
      addressCountry: "US",
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
    // ADD brand affiliations
    brand: [
      {
        "@type": "Brand",
        name: "La-Z-Boy"
      },
      {
        "@type": "Brand",
        name: "Ashley Furniture"
      }
    ],
    // ADD service area
    areaServed: {
      "@type": "City",
      name: "Farmville",
      "@id": "https://www.wikidata.org/wiki/Q1399115"
    },
    // ADD price range
    priceRange: "$$",
    // ADD accepted payments
    paymentAccepted: "Cash, Credit Card, Debit Card",
    currenciesAccepted: "USD"
  };
}
```

### Pattern 2: Per-Page Metadata with generateMetadata

**What:** Export static `Metadata` object or dynamic `generateMetadata` function from each page to set page-specific title, description, and OpenGraph config.

**When to use:** Every page should export metadata to override defaults and provide social sharing previews.

**Example:**
```typescript
// app/(main)/page.tsx (homepage)
import type { Metadata } from 'next';
import { siteMetadata, SITE_URL } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Home',
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: SITE_URL,
    siteName: siteMetadata.og.siteName,
    images: [
      {
        url: '/og-image-home.png', // or use dynamic opengraph-image.tsx
        width: 1200,
        height: 630,
        alt: 'Town & Country Furniture - Farmville VA Furniture Store'
      }
    ],
    locale: siteMetadata.og.locale,
    type: siteMetadata.og.type,
  },
  twitter: {
    card: siteMetadata.twitter.card,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ['/og-image-home.png'],
  }
};

export default function HomePage() {
  // ...
}
```

### Pattern 3: Dynamic OpenGraph Images with opengraph-image.tsx

**What:** Create `opengraph-image.tsx` files in route segments to generate dynamic OG images using JSX and CSS.

**When to use:** When you need page-specific OG images with branding, or want to avoid creating static image files manually.

**Example:**
```typescript
// app/(main)/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Town & Country Furniture - Farmville VA';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Load custom font if needed
  const interSemiBold = await readFile(
    join(process.cwd(), 'public/fonts/DMSans-SemiBold.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 20 }}>
          Town & Country Furniture
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>
          La-Z-Boy & Ashley Furniture | Farmville, VA
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'DM Sans',
          data: interSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  );
}
```

**Constraints:**
- Flexbox layout only (no CSS Grid)
- 500KB bundle size limit (including fonts/images)
- Limited CSS property support
- Must use Node.js runtime for fs access (default)

### Pattern 4: GA4 Integration with @next/third-parties

**What:** Use `GoogleAnalytics` component in root layout for site-wide tracking, `sendGAEvent` function in client components for custom events.

**When to use:** Always use this over manual gtag.js injection - provides better performance and cleaner API.

**Example:**
```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Existing JSON-LD script */}
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </html>
  );
}
```

**Key behavior:** GoogleAnalytics component automatically tracks pageviews when browser history state changes (client-side navigation). No manual pageview tracking needed.

### Pattern 5: Client Component Event Tracking Wrappers

**What:** Wrap server-rendered links (phone, directions, email) in client components to add `onClick` handlers that call `sendGAEvent`.

**When to use:** Any time you need to track interactions with Server Component rendered elements (tel: links, mailto: links, external links).

**Why necessary:** Server Components can't have `onClick` handlers, so tracking must happen in Client Component boundary.

**Example:**
```typescript
// components/analytics/PhoneLink.tsx
'use client';

import { sendGAEvent } from '@next/third-parties/google';

interface PhoneLinkProps {
  phone: string;
  children: React.ReactNode;
  className?: string;
}

export function PhoneLink({ phone, children, className }: PhoneLinkProps) {
  const handleClick = () => {
    sendGAEvent('event', 'phone_click', {
      phone_number: phone,
      location: 'contact_section',
    });
  };

  return (
    <a
      href={`tel:${phone}`}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
```

### Pattern 6: BreadcrumbList Schema for Multi-Page Sites

**What:** Add BreadcrumbList JSON-LD to pages with navigation hierarchy (e.g., About page).

**When to use:** Pages beyond homepage that have a clear navigation path (Home > About).

**Example:**
```typescript
// app/(main)/about/page.tsx
export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://townandcountryfarmville.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        // Current page has no 'item' property
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Page content */}
    </>
  );
}
```

### Anti-Patterns to Avoid

- **Duplicate JSON-LD across pages:** Leads to conflicting structured data. Use single source in root layout, extend as needed.
- **Missing metadataBase in root layout:** Causes build errors for relative OpenGraph image paths. Always set in app/layout.tsx.
- **Tracking events in Server Components:** `onClick` handlers don't work in RSC. Always create Client Component wrappers.
- **Using both metadata object AND generateMetadata:** Not allowed in same route segment. Choose one based on whether metadata is static or dynamic.
- **Forgetting openGraph config:** Setting only title/description in metadata doesn't create og: tags automatically. Must explicitly configure `openGraph` object.
- **Hardcoding GA_MEASUREMENT_ID:** Always use environment variable for GA ID to separate dev/staging/prod properties.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OpenGraph image generation | Custom image manipulation library, canvas API | Next.js `opengraph-image.tsx` + ImageResponse | Built-in, uses Satori for JSX rendering, automatic optimization, Edge Runtime support |
| GA4 script loading | Manual `<script>` tag with gtag.js | @next/third-parties/google | Optimized loading strategy (afterInteractive), automatic pageview tracking, memoization, cleaner API |
| Scroll depth tracking (90%) | Custom scroll event listeners | GA4 Enhanced Measurement | Automatically enabled, no code needed, fires at 90% scroll depth |
| YouTube video tracking | Custom YouTube iframe API integration | react-lite-youtube-embed with `onPlay` callback | Already installed, provides privacy-first embed, callback support for analytics |
| Metadata inheritance | Manual prop drilling of SEO data | Next.js Metadata API with template/default | Built-in merging/inheritance, automatic head tag generation |
| Structured data validation | Custom JSON-LD validators | Google Rich Results Test + Schema Markup Validator | Official tools, show exactly what Google sees, catch errors before deployment |
| Event naming conventions | Ad-hoc event names | GA4 recommended events (snake_case) | Predefined parameters, future-proof for GA4 reporting features, consistency |
| Pageview tracking in App Router | Manual gtag('event', 'page_view') calls | Automatic via GoogleAnalytics component | Next.js Link navigation triggers pageviews automatically, no manual tracking needed |

**Key insight:** Next.js 16 has mature, battle-tested APIs for metadata and OpenGraph. Google's Enhanced Measurement covers common interactions automatically. Focus implementation effort on custom events (phone clicks, form submissions, CTA interactions) rather than reinventing automatic tracking.

## Common Pitfalls

### Pitfall 1: Duplicate FurnitureStore JSON-LD

**What goes wrong:** About page currently has inline FurnitureStore schema that duplicates the Organization JSON-LD in root layout. Google may show conflicting data or ignore one schema entirely.

**Why it happens:** Initial implementation added JSON-LD directly to About page without checking root layout.

**How to avoid:** Remove duplicate JSON-LD from About page. Rely on root layout's Organization JSON-LD which automatically applies to all pages. Only add page-specific schema (like BreadcrumbList) to child pages.

**Warning signs:** Google Search Console shows "Duplicate structured data" warnings, or Rich Results Test shows multiple Organization schemas for same page.

### Pitfall 2: Missing OpenGraph Images

**What goes wrong:** Homepage and About page lack `openGraph.images` configuration. Social media platforms show generic fallback images or no preview at all.

**Why it happens:** Existing metadata exports have title/description but no `openGraph` object with images.

**How to avoid:** Every page metadata export must include `openGraph` with at least one image. Use static image path or create `opengraph-image.tsx` for dynamic generation.

**Warning signs:** Sharing site URL on Facebook/LinkedIn shows no image preview, or Twitter card validator shows missing image.

### Pitfall 3: Server Component Event Tracking

**What goes wrong:** Adding `onClick` handlers directly to `<a>` tags in Server Components for tracking phone/direction clicks. Handler never fires because RSC don't support event handlers.

**Why it happens:** Forgetting that most components in Next.js App Router are Server Components by default.

**How to avoid:** Create Client Component wrappers (`'use client'` directive) for any interactive elements that need tracking. Server Components render the structure, Client Components add interactivity.

**Warning signs:** Event tracking never fires in GA4 real-time reports despite clicking tracked elements.

### Pitfall 4: YouTube Video Tracking Without enablejsapi=1

**What goes wrong:** Embedded YouTube videos in HeroVideo component don't fire video_start/video_progress events in GA4 Enhanced Measurement.

**Why it happens:** GA4 Enhanced Measurement requires `?enablejsapi=1` parameter in YouTube iframe URL to access JavaScript API for event tracking.

**How to avoid:** Ensure react-lite-youtube-embed is configured to include enablejsapi parameter. Additionally, use component's `onPlay` callback to fire custom GA4 event for more reliable tracking.

**Warning signs:** No video engagement events in GA4 despite users watching videos.

### Pitfall 5: Scroll Depth Tracking Gaps

**What goes wrong:** Expecting granular scroll tracking (25%, 50%, 75%) but GA4 Enhanced Measurement only tracks 90% scroll depth.

**Why it happens:** Misunderstanding GA4 Enhanced Measurement capabilities - only 90% threshold is automatic.

**How to avoid:** Document that default scroll tracking is 90% only. For granular tracking, plan to implement custom scroll listeners with Intersection Observer API or use Google Tag Manager.

**Warning signs:** Missing scroll depth milestones in GA4 reports, only seeing 90% scroll events.

### Pitfall 6: Not Setting metadataBase

**What goes wrong:** Build fails with error: "metadataBase is required when using relative paths for OpenGraph images."

**Why it happens:** Using relative paths like `/og-image.png` in openGraph.images without defining metadataBase in root layout.

**How to avoid:** Root layout already has `metadataBase: new URL(SITE_URL)` - don't remove it. This allows all child pages to use relative paths for images.

**Warning signs:** Build error during `next build`, metadata validation errors.

### Pitfall 7: Form Submission Tracking Without Explicit Events

**What goes wrong:** Assuming GA4 automatically tracks form submissions. Enhanced Measurement does NOT include form tracking by default.

**Why it happens:** Confusion between GA4 and older Google Analytics form tracking capabilities.

**How to avoid:** ContactForm component must explicitly call `sendGAEvent('form_submit', ...)` in the form submit handler. Plan to wrap form submission in try/catch to ensure analytics doesn't block submission.

**Warning signs:** No form_submit events in GA4 despite successful form submissions via Resend.

### Pitfall 8: Tel: Link Tracking Breaking in November 2024

**What goes wrong:** Research shows tel: and mailto: link tracking via GA4 UI stopped working in November 2024 for some users.

**Why it happens:** GA4 automatic outbound link tracking changes, possible browser API changes.

**How to avoid:** Always use explicit custom event tracking via Client Component wrappers with sendGAEvent. Don't rely on GA4 Enhanced Measurement's outbound click tracking for tel: links.

**Warning signs:** Phone click events suddenly stop appearing in GA4 reports.

## Code Examples

Verified patterns from official sources:

### Example 1: Root Layout with Metadata and GA4

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { libreBaskerville, dmSans } from "@/lib/fonts";
import { siteMetadata, SITE_URL, generateOrganizationJsonLd } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteMetadata.title,
    template: "%s | Town & Country Furniture",
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <html lang="en">
      <body
        className={`${libreBaskerville.variable} ${dmSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
```

### Example 2: Page with Full OpenGraph Configuration

```typescript
// app/(main)/about/page.tsx
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Family-owned furniture store serving Farmville, Virginia for over 20 years. La-Z-Boy and Ashley Furniture dealer.',
  openGraph: {
    title: 'About Town & Country Furniture',
    description: 'Family-owned furniture store serving Farmville, Virginia for over 20 years.',
    url: `${SITE_URL}/about`,
    siteName: 'Town & Country Furniture',
    images: [
      {
        url: '/og-image-about.png',
        width: 1200,
        height: 630,
        alt: 'Town & Country Furniture Store Interior',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Town & Country Furniture',
    description: 'Family-owned furniture store serving Farmville, Virginia for over 20 years.',
    images: ['/og-image-about.png'],
  }
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Page content */}
    </>
  );
}
```

### Example 3: Custom Event Tracking with sendGAEvent

```typescript
// components/analytics/PhoneLink.tsx
'use client';

import { sendGAEvent } from '@next/third-parties/google';

interface PhoneLinkProps {
  phone: string;
  displayText: string;
  location: string; // e.g., 'header', 'contact_section', 'footer'
  className?: string;
}

export function PhoneLink({ phone, displayText, location, className }: PhoneLinkProps) {
  const handleClick = () => {
    sendGAEvent('event', 'phone_click', {
      phone_number: phone,
      click_location: location,
      link_text: displayText,
    });
  };

  return (
    <a
      href={`tel:${phone}`}
      onClick={handleClick}
      className={className}
    >
      {displayText}
    </a>
  );
}

// Usage in Server Component:
// import { PhoneLink } from '@/components/analytics/PhoneLink';
// <PhoneLink phone="4342238163" displayText="(434) 223-8163" location="contact_section" />
```

### Example 4: Video Play Event Tracking

```typescript
// components/sections/VideoShowcase.tsx
'use client';

import dynamic from 'next/dynamic';
import { sendGAEvent } from '@next/third-parties/google';

const HeroVideo = dynamic(() => import('@/components/HeroVideo'), {
  ssr: false,
});

export function VideoShowcase() {
  const handleVideoPlay = () => {
    sendGAEvent('event', 'video_play', {
      video_title: 'Town & Country Furniture Showroom Tour',
      video_location: 'homepage_hero',
      video_provider: 'youtube',
    });
  };

  return (
    <section className="video-showcase">
      <HeroVideo
        videoId="your-youtube-id"
        onPlay={handleVideoPlay}
      />
    </section>
  );
}
```

### Example 5: Form Submission Event Tracking

```typescript
// components/contact/ContactForm.tsx (existing component, add tracking)
'use client';

import { useActionState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { submitContactForm } from '@/app/actions/contact';

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, null);

  const handleSubmit = async (formData: FormData) => {
    // Track form submission attempt
    sendGAEvent('event', 'form_submit', {
      form_name: 'contact_form',
      form_location: 'contact_page',
    });

    // Call server action
    return formAction(formData);
  };

  // Track successful submission when state.success is true
  if (state?.success) {
    sendGAEvent('event', 'form_submit_success', {
      form_name: 'contact_form',
      form_location: 'contact_page',
    });
  }

  return (
    <form action={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Example 6: CTA Button with Event Tracking

```typescript
// components/analytics/TrackableButton.tsx
'use client';

import { sendGAEvent } from '@next/third-parties/google';

interface TrackableButtonProps {
  href?: string;
  onClick?: () => void;
  eventName: string;
  eventParams: Record<string, string | number>;
  children: React.ReactNode;
  className?: string;
}

export function TrackableButton({
  href,
  onClick,
  eventName,
  eventParams,
  children,
  className
}: TrackableButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    sendGAEvent('event', eventName, eventParams);
    onClick?.();
  };

  if (href) {
    return (
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

// Usage:
// <TrackableButton
//   href="/about"
//   eventName="cta_click"
//   eventParams={{
//     cta_text: 'Learn More About Us',
//     cta_location: 'homepage_hero',
//     destination: '/about'
//   }}
// >
//   Learn More About Us
// </TrackableButton>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual `<head>` tags, Helmet | Next.js Metadata API | Next.js 13.2 (Feb 2023) | Automatic head tag generation, type safety, inheritance patterns |
| Static OG images only | Dynamic opengraph-image.tsx + ImageResponse | Next.js 13.3 (May 2023) | Per-page OG image generation without design tools |
| Manual gtag.js script injection | @next/third-parties/google | Next.js 14 (Oct 2023) | Optimized loading, automatic pageview tracking, cleaner API |
| Universal Analytics (UA) | Google Analytics 4 (GA4) | July 2023 (UA sunset) | Event-based model, Enhanced Measurement, better privacy controls |
| GA4 UI-based tel: link tracking | GTM or custom sendGAEvent tracking | November 2024 | Tel: link auto-tracking unreliable, must use explicit events |
| Microdata, RDFa for structured data | JSON-LD in script tags | Google recommendation (2015+) | Easier maintenance, separation from HTML, Google's preferred format |

**Deprecated/outdated:**
- **viewport/themeColor in metadata object:** Deprecated in Next.js 14, use generateViewport function instead
- **Universal Analytics (analytics.js):** Sunset July 2023, must use GA4
- **Google Structured Data Testing Tool:** Retired 2020, replaced with Rich Results Test and Schema Markup Validator
- **GA4 automatic tel: link tracking:** Broken as of Nov 2024, use explicit custom events

## Open Questions

Things that couldn't be fully resolved:

1. **Client GA4 Property Status**
   - What we know: Implementation requires a GA4 Measurement ID (G-XXXXXXXXXX format)
   - What's unclear: Does client already have GA4 property set up? Need property ID before implementation.
   - Recommendation: Ask client for existing GA4 Measurement ID, or document steps to create new GA4 property in Google Analytics during planning. Provide client with setup instructions if needed.

2. **Nessus Analytics Integration Format**
   - What we know: Research shows Nessus is a vulnerability scanning tool (Tenable Nessus), not an analytics platform. Client context mentions "Nessus integration" for analytics.
   - What's unclear: Is "Nessus" a client-internal analytics/BI platform, or is this referring to a different system? No public documentation exists for "Nessus analytics integration."
   - Recommendation: Clarify with client what "Nessus integration" means. If it's a custom BI system, document GA4 event schema in JSON format with event names, parameters, data types, and sample payloads. This can be consumed by any data pipeline.

3. **Product Photography Timeline**
   - What we know: Site currently uses oklch placeholder colors, no product photography available yet
   - What's unclear: Will product images be available during Phase 7, or should OG images use brand colors/logos only?
   - Recommendation: Create dynamic OG images with brand identity (logo, colors, typography) rather than waiting for product photos. Can be updated later without code changes.

4. **Video Embed Analytics Reliability**
   - What we know: react-lite-youtube-embed provides `onPlay` callback, GA4 Enhanced Measurement tracks YouTube videos with enablejsapi=1
   - What's unclear: Which is more reliable - component callback or Enhanced Measurement? Should both be implemented?
   - Recommendation: Implement both - use react-lite-youtube-embed's onPlay callback for primary tracking (more reliable, immediate feedback), treat GA4 Enhanced Measurement as backup. Document both in tracking plan.

5. **Scroll Depth Granularity Requirement**
   - What we know: GA4 Enhanced Measurement only tracks 90% scroll depth automatically
   - What's unclear: Does client need granular scroll tracking (25%, 50%, 75%) for engagement analysis?
   - Recommendation: Start with 90% automatic tracking. Document in tracking plan that granular scroll depth requires custom implementation or Google Tag Manager. Revisit if client requests detailed scroll analytics.

6. **Category Click Tracking Scope**
   - What we know: Success criteria requires "category clicks" event tracking
   - What's unclear: Does this mean clicks on category cards (Living Room, Bedroom, etc.) on homepage, or navigation menu category links, or both?
   - Recommendation: Track both - use `category_click` event with `click_location` parameter ('homepage_grid' vs 'navigation_menu') to distinguish contexts.

## Sources

### Primary (HIGH confidence)
- [Next.js 16.1.6 Metadata API - opengraph-image file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) (updated 2026-02-27)
- [Next.js 16.1.6 - generateMetadata function](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) (updated 2026-02-27)
- [Next.js 16.1.6 - Third Party Libraries (@next/third-parties)](https://nextjs.org/docs/app/guides/third-party-libraries) (updated 2026-02-27)
- [Schema.org FurnitureStore Type](https://schema.org/FurnitureStore)
- [react-lite-youtube-embed GitHub README](https://github.com/ibrahimcesar/react-lite-youtube-embed/blob/main/README.md) - Event callbacks documentation

### Secondary (MEDIUM confidence)
- [Google Analytics GA4 Recommended Events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events) - Ecommerce event reference
- [Google Analytics Event Naming Rules](https://support.google.com/analytics/answer/13316687?hl=en) - Snake_case convention, reserved prefixes
- [Google Rich Results Test](https://search.google.com/test/rich-results) - Official structured data testing tool
- [GA4 Event Naming Best Practices - Bounteous](https://www.bounteous.com/insights/2021/01/28/event-naming-considerations-google-analytics-4-properties/)
- [Schema.org BreadcrumbList Implementation](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)

### Tertiary (LOW confidence - requires verification)
- [Enhanced Measurement in GA4 - Analytics Mania](https://www.analyticsmania.com/post/enhanced-measurement-in-google-analytics-4-the-guide/) - 90% scroll depth tracking
- [GA4 Tel Link Tracking Broken Nov 2024 - Wolfenden Agency](https://wolfenden.agency/insights/complete-guide-track-email-phone-clicks-in-google-analytics-wolfenden/) - Community report, needs client testing
- [GA4 Custom Events Guide 2026 - Analytify](https://analytify.io/ga4-custom-events/) - Implementation patterns
- [Event Schema Guide - Jery.net](https://jery.net/event-schema-explained-complete-guide-for-marketers-2026/) - Tracking plan documentation format

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Next.js 16 metadata APIs and @next/third-parties are official, documented, and current
- Architecture: HIGH - Patterns sourced from official Next.js 16.1.6 documentation updated Feb 2026
- Pitfalls: MEDIUM - Duplicate JSON-LD and missing OpenGraph configs verified in codebase, tel: link tracking issue from community reports (needs verification)
- Event tracking: MEDIUM - GA4 Enhanced Measurement capabilities well-documented, but custom event implementation requires testing in production environment

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (30 days - Next.js and GA4 are stable but evolving)

**Key unknowns requiring client input:**
1. GA4 Measurement ID (G-XXXXXXXXXX)
2. Definition of "Nessus integration" for analytics documentation
3. Granular scroll depth tracking requirement (25%, 50%, 75% vs 90% only)
4. Product photography availability timeline for OG images
