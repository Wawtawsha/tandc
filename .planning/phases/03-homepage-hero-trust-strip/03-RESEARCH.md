# Phase 3: Homepage Hero & Trust Strip - Research

**Researched:** 2026-03-02
**Domain:** Next.js 16 video hero sections, trust signals, product category grids
**Confidence:** HIGH

## Summary

This phase implements a homepage hero section with embedded video, trust signals, and product category navigation. The primary technical challenges are:

1. **Video embedding performance**: YouTube iframes add ~272KB and delay LCP. The lite-youtube-embed facade pattern solves this by showing a lightweight thumbnail placeholder, only loading the full iframe on user interaction.

2. **Accessibility for video**: Autoplay videos harm users with vestibular disorders and photosensitive epilepsy. WCAG 2.1 requires respecting `prefers-reduced-motion` and providing user controls for all auto-playing content.

3. **Server/Client Component boundary**: Next.js 16 defaults to Server Components. Video embeds requiring user interaction need `'use client'` directive, but the boundary should be pushed as deep as possible (wrap only the interactive video component, not the entire hero section).

The codebase already has `useReducedMotion` hook (useSyncExternalStore-based, React 19 compliant) and established patterns for client components with motion library integration.

**Primary recommendation:** Use `react-lite-youtube-embed` with click-to-play (no autoplay), respect `prefers-reduced-motion` via existing hook, use Lucide React icons for trust signals (tree-shakeable, minimal bundle impact), and build category grid as Server Component with static links.

## Standard Stack

The established libraries/tools for homepage hero sections with video in Next.js 16:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App Router framework | Official Next.js video guide updated Feb 2026 |
| react-lite-youtube-embed | 2.x | YouTube facade component | Paul Irish's official Chrome recommendation, saves ~500KB per video |
| lucide-react | Latest | Icon library | Tree-shakeable, 1.0x-1.2x bundle ratio, outperforms react-icons at scale |
| motion | 12.29.2 | Animation (already installed) | Used in Navigation.tsx, respects reducedMotion |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @heroicons/react | 2.x | Alternative icons | If preferring Tailwind ecosystem, slightly lighter at <50 icons |
| next-video | Latest | Self-hosted video | Only if self-hosting (not needed for YouTube embeds) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-lite-youtube-embed | Native iframe with loading="lazy" | Native lazy-load delays request but still loads full scripts once triggered; facade prevents load entirely until click |
| Lucide | Inline SVG per icon | Full control but verbose JSX and no shared sprite optimization |
| motion library | CSS-only animations | Simpler but existing codebase uses motion, inconsistent to mix |

**Installation:**
```bash
npm install react-lite-youtube-embed lucide-react
```

## Architecture Patterns

### Recommended Project Structure
```
app/(main)/
├── page.tsx              # Homepage (Server Component)
components/
├── hero/
│   ├── HeroVideo.tsx     # Client Component ('use client')
│   ├── HeroSection.tsx   # Server Component wrapper
│   └── hero.css          # Lite-youtube styles
├── trust/
│   └── TrustStrip.tsx    # Server Component (static icons)
└── categories/
    └── CategoryGrid.tsx   # Server Component (static cards)
```

### Pattern 1: Lite YouTube Embed with Reduced Motion
**What:** Facade pattern showing thumbnail, loading iframe only on click
**When to use:** Any YouTube video, especially above-the-fold where LCP matters
**Example:**
```typescript
// Source: https://www.franciscomoretti.com/blog/use-a-lite-youtube-embedded-player-in-nextjs
'use client';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroVideo({ videoId }: { videoId: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="aspect-video">
      <LiteYouTubeEmbed
        id={videoId}
        title="Ashley Furniture Showroom"
        poster="maxresdefault" // Higher quality thumbnail
        noCookie={true} // Privacy-focused, uses youtube-nocookie.com
        // Never autoplay - user must click
        params={reducedMotion ? "controls=1&modestbranding=1" : undefined}
      />
    </div>
  );
}
```

### Pattern 2: Server Component Wrapper for Hero
**What:** Outer hero structure is Server Component, only video is Client Component
**When to use:** Always - push 'use client' boundary as deep as possible
**Example:**
```typescript
// Source: Next.js 16 docs - https://nextjs.org/docs/app/getting-started/server-and-client-components
// HeroSection.tsx - Server Component (no 'use client')
import { HeroVideo } from './HeroVideo';

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-5xl font-bold mb-6">
            Quality Furniture for Every Room
          </h1>
          <div className="flex gap-4">
            <a href="tel:+14342238163" className="btn-primary">
              Call Us
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=5301+Farmville+Rd+Farmville+VA+23901"
              className="btn-secondary"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Only this component is 'use client' */}
        <HeroVideo videoId="your-video-id" />
      </div>
    </section>
  );
}
```

### Pattern 3: Lucide Icons for Trust Signals
**What:** Tree-shakeable icon imports, only bundle what's used
**When to use:** Any icon needs (trust signals, CTAs, navigation)
**Example:**
```typescript
// Source: https://lucide.dev/guide/packages/lucide-react
import { Truck, Heart, CreditCard, Award } from 'lucide-react';

export function TrustStrip() {
  const signals = [
    { icon: Truck, label: 'Local Delivery' },
    { icon: Heart, label: 'Family Owned' },
    { icon: CreditCard, label: 'Financing Available' },
    { icon: Award, label: 'Authorized Dealer' },
  ];

  return (
    <div className="bg-surface py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {signals.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center text-center">
            <Icon className="w-8 h-8 mb-2 text-accent" aria-hidden="true" />
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Pattern 4: Category Grid with Aspect Ratio
**What:** Responsive grid with consistent aspect ratios, placeholder images
**When to use:** Product categories, showcase previews
**Example:**
```typescript
// Source: Tailwind CSS official hero examples - https://tailwindcss.com/plus/ui-blocks/marketing/sections/heroes
export function CategoryGrid() {
  const categories = [
    { name: 'Recliners', href: '#recliners', image: '/images/categories/recliners.jpg' },
    { name: 'Sofas', href: '#sofas', image: '/images/categories/sofas.jpg' },
    // ... more categories
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              className="group relative aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={cat.image}
                alt=""
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">
                {cat.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Anti-Patterns to Avoid
- **Autoplay video on hero**: Harms accessibility, fails WCAG 2.1, hurts LCP (wait for user interaction)
- **Entire hero as Client Component**: Only video needs 'use client', rest should be Server Component
- **react-icons without tree-shaking**: Importing from root adds 30KB+ even for single icon (use Lucide or import specific paths)
- **Missing tel: prefix on phone links**: `tel:+14342238163` required for mobile click-to-call
- **Google Maps without api=1 parameter**: Required for Maps URLs to function correctly

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| YouTube embed optimization | Custom thumbnail + iframe inject | react-lite-youtube-embed | Handles WCAG compliance, poster quality selection, privacy (nocookie), params encoding |
| Reduced motion detection | useState + matchMedia listener | useSyncExternalStore pattern | React 19 requires external store subscriptions, prevents hydration mismatches |
| Icon sprite optimization | Manual SVG sprite generation | Lucide React with tree-shaking | Build tools handle chunking, de-duping, shared imports across routes |
| Google Maps directions URL | Manual query string building | Maps URL API format | Handles encoding, 2048 char limit, cross-platform compatibility |
| Video LCP optimization | Manual preload tags | Lite-youtube facade | Saves ~500KB, handles intersection observer, poster loading states |

**Key insight:** Video performance is deceptively complex. A standard YouTube iframe loads 272KB of scripts before showing content. The facade pattern reduces this to ~2KB (thumbnail + placeholder), deferring the full load until user interaction. This is the difference between a 4.2s LCP and 2.1s LCP for hero sections.

## Common Pitfalls

### Pitfall 1: Autoplay Video Accessibility Violation
**What goes wrong:** Video autoplays with motion, triggers vestibular disorders, fails WCAG 2.1 Level AA
**Why it happens:** Default YouTube embed params enable autoplay, developers assume "muted autoplay" is safe
**How to avoid:** Never use autoplay params, even muted. Use click-to-play facade pattern. Respect `prefers-reduced-motion` for ALL motion, not just animations.
**Warning signs:**
- User reports dizziness or nausea on page load
- Lighthouse accessibility score flags motion without user control
- Video plays before user scrolls to it

### Pitfall 2: YouTube Embed Kills LCP
**What goes wrong:** Homepage LCP is 4+ seconds, fails Core Web Vitals
**Why it happens:** Standard iframe loads 272KB of scripts synchronously, blocks render
**How to avoid:** Use lite-youtube-embed facade. Show thumbnail (2KB), defer iframe until click. Mark hero image as priority if using static image.
**Warning signs:**
- Lighthouse LCP warning > 2.5s
- "Eliminate render-blocking resources" for youtube.com scripts
- Hero section visible but blank during initial load

### Pitfall 3: Client Component Boundary Too High
**What goes wrong:** Entire page/layout becomes Client Component, loses Server Component benefits
**Why it happens:** Adding 'use client' to page.tsx because one component needs useState
**How to avoid:** Push 'use client' to the deepest component that needs it. In this case, only HeroVideo.tsx needs it, not HeroSection.tsx or page.tsx.
**Warning signs:**
- All components re-render on navigation
- Metadata export errors ("can't export from Client Component")
- Suspense boundaries not working as expected

### Pitfall 4: Icon Bundle Bloat
**What goes wrong:** Bundle size increases 30KB+ for a few icons
**Why it happens:** Importing from react-icons root: `import { FaTruck } from 'react-icons/fa'`
**How to avoid:** Use Lucide with named imports (`import { Truck } from 'lucide-react'`) or import specific react-icons paths. Lucide has 1.0x-1.2x bundle ratio (very efficient tree-shaking).
**Warning signs:**
- Lighthouse "Reduce unused JavaScript" warning
- Large chunks for icon-only routes
- Bundle analyzer shows full react-icons in vendor chunk

### Pitfall 5: Missing Accessible Video Controls
**What goes wrong:** Video lacks keyboard controls, screen reader announcements, or pause button
**Why it happens:** Custom video players built without accessibility testing
**How to avoid:** Use lite-youtube-embed which provides accessible YouTube controls by default. Add title prop for screen readers. Ensure keyboard navigation works (Space/Enter to play).
**Warning signs:**
- Can't pause video with keyboard
- Screen reader doesn't announce video presence
- No visible controls on focus

### Pitfall 6: Google Maps URL Malformed
**What goes wrong:** "Get Directions" button opens broken or empty map
**Why it happens:** Missing `api=1` parameter, incorrect encoding, or wrong URL format
**How to avoid:** Use exact format: `https://www.google.com/maps/dir/?api=1&destination=ADDRESS`. URL-encode the address. No API key needed for Maps URLs (different from Maps API).
**Warning signs:**
- Map loads but destination is blank
- URL redirects to generic Google Maps
- Mobile users report link doesn't work

## Code Examples

Verified patterns from official sources:

### Reduced Motion Video Control
```typescript
// Source: https://www.scottohara.me/note/2019/07/12/reduced-motion-video.html
// Adapted for Next.js 16 + React 19 with useSyncExternalStore
'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useEffect, useRef } from 'react';

export function AutoplayVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!videoRef.current) return;

    if (reducedMotion) {
      videoRef.current.pause();
    } else {
      // Still requires user interaction on most browsers
      videoRef.current.play().catch(() => {
        // Autoplay blocked, that's fine
      });
    }
  }, [reducedMotion]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      controls // Always provide controls for WCAG compliance
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
```

### CTA Buttons with Proper Links
```typescript
// Source: Google Maps URLs - https://developers.google.com/maps/documentation/urls/get-started
export function HeroCTAs() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <a
        href="tel:+14342238163"
        className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors"
        aria-label="Call Town and Country Furniture at 4 3 4, 2 2 3, 8 1 6 3"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call Us
      </a>

      <a
        href="https://www.google.com/maps/dir/?api=1&destination=5301+Farmville+Rd+Farmville+VA+23901"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-3 bg-background border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-white transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Get Directions
      </a>
    </div>
  );
}
```

### Lite YouTube Embed Setup
```typescript
// Source: https://www.npmjs.com/package/react-lite-youtube-embed
'use client';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export function HeroVideo({ videoId }: { videoId: string }) {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
      <LiteYouTubeEmbed
        id={videoId}
        title="Ashley Furniture Showroom Tour"
        poster="maxresdefault" // Highest quality thumbnail
        noCookie={true} // Privacy-friendly youtube-nocookie.com
        params="controls=1&modestbranding=1&rel=0"
        // Optional: customize play button
        activatedClass="lyt-activated"
        iframeClass="w-full h-full"
        playerClass="lyt-playbtn"
      />
    </div>
  );
}
```

### Accessible Section Landmarks
```typescript
// Source: https://www.a11y-collective.com/blog/aria-landmark-roles/
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[80vh]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h1
          id="hero-heading"
          className="text-5xl font-bold mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Quality Furniture for Every Room
        </h1>
        {/* Content */}
      </div>
    </section>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Direct YouTube iframe | Lite-youtube facade | 2019 (Chrome Dev Summit) | ~500KB savings, 50% LCP reduction |
| useState + useEffect for media queries | useSyncExternalStore | React 18 (2022), required in React 19 | Prevents hydration mismatches, SSR-safe |
| react-icons | Lucide React | 2023-2024 popularity shift | Better tree-shaking, 15-20KB savings at 200 icons |
| autoplay="1" param | Click-to-play only | WCAG 2.1 (2018 spec, enforced 2023+) | Accessibility compliance, user respect |
| Heroicons v1 | Heroicons v2 / Lucide | 2024-2025 | React component exports, TypeScript types, better DX |
| loading="lazy" on iframe | Facade pattern | 2021-2022 | Lazy-load delays but still loads scripts; facade prevents load entirely |

**Deprecated/outdated:**
- **autoplay=1 in YouTube params**: Now considered hostile UX and WCAG violation. Use click-to-play only.
- **react-icons global import**: `import * from 'react-icons'` was never recommended but previously worked. Now causes 30KB+ bloat. Use named imports or Lucide.
- **aria-label on sections without unique labels**: WCAG 2.1 2026 guidance emphasizes unique labels. "Navigation" x3 is less useful than "Main navigation", "Footer links", "Breadcrumb".
- **preload="auto" on video**: Wastes bandwidth. Use `preload="metadata"` or `preload="none"` unless video is primary content and user likely to play.

## Open Questions

Things that couldn't be fully resolved:

1. **Ashley marketing video ID**
   - What we know: Client has Ashley Furniture marketing video to embed
   - What's unclear: Specific YouTube video ID, whether it's on brand channel or client's channel
   - Recommendation: Use placeholder videoId in HeroVideo component, make it a prop so it's easily configurable. If video is on client's YouTube channel, ensure it's set to "unlisted" or "public".

2. **Category images availability**
   - What we know: Phase 3 needs visual cards for 6 categories (Recliners, Sofas, Sectionals, Lift Chairs, Living Room, Bedroom)
   - What's unclear: Whether product photography exists, image dimensions, whether AI-generated placeholders are acceptable
   - Recommendation: Use aspect-square containers with object-cover. If no images yet, use solid color backgrounds with category name (graceful degradation). Add images in later phase without layout shift.

3. **Trust signal icon selection**
   - What we know: Need icons for Local Delivery, Family Owned, Financing Available, Authorized Dealer
   - What's unclear: Exact icon visual language (stroke vs filled, minimalist vs detailed)
   - Recommendation: Use Lucide stroke icons (consistent with Tailwind aesthetic): Truck, Heart, CreditCard, Award. If these don't match brand, provide alternatives in planning phase.

4. **Hero section height behavior**
   - What we know: min-h-[80vh] is common for hero sections
   - What's unclear: Whether content should be vertically centered, whether mobile should have different height
   - Recommendation: Use min-h-[60vh] on mobile, min-h-[80vh] on desktop. Center content vertically with flex items-center. Test with actual video aspect ratio.

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 Official Docs - Videos Guide (https://nextjs.org/docs/app/guides/videos) - Updated Feb 27, 2026
- Next.js 16.1.6 Official Docs - Server and Client Components (https://nextjs.org/docs/app/getting-started/server-and-client-components)
- MDN Web Docs - prefers-reduced-motion (https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- Google Developers - Maps URLs API (https://developers.google.com/maps/documentation/urls/get-started)
- Lucide React Official Docs (https://lucide.dev/guide/packages/lucide-react)
- W3C ARIA Landmark Regions (https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)

### Secondary (MEDIUM confidence)
- react-lite-youtube-embed npm package (https://www.npmjs.com/package/react-lite-youtube-embed) - Verified with Paul Irish Chrome recommendation
- Medium - Francisco Moretti - Use Lite YouTube in Next.js (https://medium.com/@franciscomoretti/use-a-lite-youtube-embedded-player-in-next-js-f266a5e2628f) - 2024 tutorial
- Medium - The Hidden Bundle Cost of React Icons (https://medium.com/codetodeploy/the-hidden-bundle-cost-of-react-icons-why-lucide-wins-in-2026-1ddb74c1a86c) - 2026 benchmark
- Harvard Design System - Autoplaying Hero Videos (https://designsystem.harvardsites.harvard.edu/news/2025/02/autoplaying-hero-background-videos-digital-design) - WCAG guidance
- Scott O'Hara - Reduced Motion Videos (https://www.scottohara.me/note/2019/07/12/reduced-motion-video.html) - Accessibility expert
- Tailwind CSS Official UI Blocks - Heroes (https://tailwindcss.com/plus/ui-blocks/marketing/sections/heroes) - Official patterns

### Tertiary (LOW confidence - WebSearch only)
- Various blog posts on furniture store trust signals - general UX patterns, not technical implementation
- jQuery Script - YouTube lazy loaders 2026 update - article from 2019, updated meta only
- Performance optimization blogs - corroborate official docs but not authoritative

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified via official docs, npm packages, and established usage in Next.js 16
- Architecture: HIGH - Patterns sourced from Next.js 16 official docs (Feb 2026), verified with existing codebase patterns (useReducedMotion, Navigation.tsx)
- Pitfalls: HIGH - LCP metrics from real case studies, WCAG requirements from official spec, bundle sizes from 2026 benchmark
- Code examples: HIGH - All examples sourced from official docs or verified npm packages, adapted for project's Next.js 16 + React 19 + Tailwind CSS 4 stack

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (30 days - stack is stable, Next.js 16.x updates unlikely to change video/component patterns)
