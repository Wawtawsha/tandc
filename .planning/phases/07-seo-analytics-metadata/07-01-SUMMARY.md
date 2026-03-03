---
phase: 07-seo-analytics-metadata
plan: 01
subsystem: seo
tags: [schema.org, opengraph, ga4, metadata, analytics, next-og, next-third-parties]

# Dependency graph
requires:
  - phase: 06-contact-conversion
    provides: Complete site structure with all pages
provides:
  - Enhanced FurnitureStore JSON-LD with brand affiliations, areaServed, payment info
  - OpenGraph and Twitter Card metadata on all pages
  - Dynamic OG images (1200x630) for homepage and about page
  - GA4 GoogleAnalytics component in root layout
  - Environment variable documentation in .env.example
affects: [08-polish-launch, future-phases-needing-analytics-events]

# Tech tracking
tech-stack:
  added: ["@next/third-parties@16.1.6"]
  patterns: ["next/og ImageResponse for OG images", "GoogleAnalytics component from @next/third-parties", "BreadcrumbList JSON-LD for navigation context"]

key-files:
  created:
    - "app/(main)/opengraph-image.tsx"
    - "app/(main)/about/opengraph-image.tsx"
    - ".env.local"
    - ".env.example"
  modified:
    - "lib/metadata.ts"
    - "app/(main)/about/page.tsx"
    - "app/layout.tsx"
    - "app/(main)/page.tsx"

key-decisions:
  - "RGB colors for next/og ImageResponse (not OKLCH - not supported)"
  - "BreadcrumbList JSON-LD on About page instead of duplicate FurnitureStore"
  - "GoogleAnalytics component after </body> before </html> per Next.js pattern"
  - "Conditional GA rendering based on NEXT_PUBLIC_GA_MEASUREMENT_ID presence"
  - "GA4 Enhanced Measurement provides automatic scroll depth tracking"

patterns-established:
  - "opengraph-image.tsx file convention for dynamic OG images per route"
  - "System fonts (serif/sans-serif) in OG images to keep bundle under 500KB"
  - "Environment variables documented in .env.example with placeholder values"

# Metrics
duration: 7min
completed: 2026-03-03
---

# Phase 07 Plan 01: SEO, Analytics & Metadata Foundation Summary

**Enhanced FurnitureStore schema.org with La-Z-Boy and Ashley brand affiliations, dynamic 1200x630 OpenGraph images, and GA4 analytics bootstrapped via @next/third-parties**

## Performance

- **Duration:** 7 minutes
- **Started:** 2026-03-03T08:51:48Z
- **Completed:** 2026-03-03T08:59:24Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments
- FurnitureStore JSON-LD now includes brand array (La-Z-Boy, Ashley Furniture), areaServed (Farmville with Wikidata ID), priceRange ($$), paymentAccepted, currenciesAccepted
- Removed duplicate FurnitureStore JSON-LD from About page, replaced with BreadcrumbList for navigation context
- OpenGraph and Twitter Card metadata configured in root layout, homepage, and about page
- Dynamic OG images generate 1200x630 branded images using next/og ImageResponse with warm gradient backgrounds
- GA4 GoogleAnalytics component installed and conditionally rendered based on NEXT_PUBLIC_GA_MEASUREMENT_ID
- Environment variable documentation created in .env.example for all required keys

## Task Commits

Each task was committed atomically:

1. **Task 1: Enhance schema.org structured data and clean up About page JSON-LD** - `ae5d710` (feat)
2. **Task 2: Configure OpenGraph metadata and create dynamic OG images** - `42edd67` (feat)
3. **Task 3: Install @next/third-parties and add GA4 to root layout** - `d4359a3` (feat)

## Files Created/Modified
- `lib/metadata.ts` - Added brand, areaServed, priceRange, paymentAccepted, currenciesAccepted to FurnitureStore JSON-LD
- `app/(main)/about/page.tsx` - Removed duplicate FurnitureStore JSON-LD, added BreadcrumbList, fixed openGraph.url
- `app/layout.tsx` - Added openGraph and twitter metadata, imported and rendered GoogleAnalytics component
- `app/(main)/page.tsx` - Added openGraph metadata with SITE_URL
- `app/(main)/opengraph-image.tsx` - Dynamic OG image for homepage (1200x630, RGB gradient, serif/sans-serif fonts)
- `app/(main)/about/opengraph-image.tsx` - Dynamic OG image for about page (1200x630, distinct gradient angle)
- `.env.local` - Created with empty NEXT_PUBLIC_GA_MEASUREMENT_ID, NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, RESEND_API_KEY
- `.env.example` - Created with placeholder values documenting all required environment variables
- `package.json` / `package-lock.json` - Added @next/third-parties@16.1.6

## Decisions Made
- **RGB colors for OG images:** next/og ImageResponse doesn't support OKLCH syntax, used RGB equivalents for warm brand gradients
- **BreadcrumbList instead of duplicate FurnitureStore:** Root layout already injects FurnitureStore JSON-LD on every page; About page now has BreadcrumbList for navigation context
- **GoogleAnalytics after body, before html:** Follows Next.js documented pattern for @next/third-parties GoogleAnalytics component
- **System fonts in OG images:** Used fontFamily: 'serif' and 'sans-serif' to keep bundle under 500KB without custom font loading
- **Enhanced Measurement scroll tracking:** GA4 Enhanced Measurement provides automatic 90% scroll depth tracking once enabled in property settings - no custom code needed

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed OKLCH color syntax not supported in next/og**
- **Found during:** Task 2 (Dynamic OG image creation)
- **Issue:** Build failed with "Unexpected token type: function in CSS rule `background: oklch(...)`" - next/og ImageResponse doesn't support OKLCH color syntax
- **Fix:** Converted OKLCH colors to RGB equivalents: `oklch(25% 0.03 30)` → `rgb(54, 47, 42)`, `oklch(80% 0.05 50)` → `rgb(212, 198, 185)`, etc.
- **Files modified:** app/(main)/opengraph-image.tsx, app/(main)/about/opengraph-image.tsx
- **Verification:** Build succeeded, OG image routes generated successfully at /opengraph-image-12jlf3 and /about/opengraph-image-2sch2s
- **Committed in:** 42edd67 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (blocking issue)
**Impact on plan:** Auto-fix necessary for OG images to render. No scope creep - RGB colors achieve same visual result as OKLCH.

## Issues Encountered
None - plan executed smoothly after OKLCH → RGB conversion.

## User Setup Required

**Environment variables require configuration.** See .env.example for:

**Required for full functionality:**
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 measurement ID (format: G-XXXXXXXXXX). Obtain from GA4 property settings. Once set, GA4 will track pageviews and Enhanced Measurement events (scroll depth at 90%).
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key for MapEmbed component (already has graceful degradation if missing).
- `RESEND_API_KEY` - Resend API key for contact form email delivery (already configured in contact form Server Action).

**To configure:**
1. Copy .env.example to .env.local
2. Fill in the values from respective service dashboards
3. Restart dev server to pick up env vars

**Verification:**
- GA4: Check Real-Time view in GA4 dashboard after deploying with measurement ID
- Maps: Visit contact section, map should render if API key valid
- Resend: Submit contact form, check Resend dashboard for email delivery

## Next Phase Readiness

**Ready for Phase 7 Plan 02 (Analytics Implementation):**
- GA4 foundation in place via GoogleAnalytics component
- Scroll depth tracking automatic via Enhanced Measurement (no custom code needed)
- Ready to add custom event tracking for CTA clicks, form submissions, etc.

**Ready for Phase 7 Plan 03 (sitemap.xml and robots.txt):**
- Metadata foundation complete
- All pages have proper metadata for search engine indexing
- Next step: Generate sitemap.xml and configure robots.txt

**Ready for Phase 8 (Polish & Launch):**
- SEO metadata complete with schema.org structured data
- Social sharing ready with OpenGraph images
- Analytics ready to track user behavior once measurement ID provided

**No blockers.**

---
*Phase: 07-seo-analytics-metadata*
*Completed: 2026-03-03*
