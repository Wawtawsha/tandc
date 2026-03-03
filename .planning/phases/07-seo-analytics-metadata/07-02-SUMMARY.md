---
phase: 07-seo-analytics-metadata
plan: 02
subsystem: analytics
tags: [ga4, google-analytics, event-tracking, next-third-parties, client-components]

# Dependency graph
requires:
  - phase: 07-01
    provides: GoogleAnalytics component and GA4 setup
provides:
  - GA4 event tracking for phone clicks (phone_click)
  - GA4 event tracking for directions clicks (directions_click)
  - GA4 event tracking for category navigation (category_click)
  - GA4 event tracking for CTA buttons (cta_click)
  - Reusable tracking wrapper components (PhoneLink, DirectionsLink, CategoryLink, CTALink)
affects: [07-03]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Client component wrappers for tracking in Server Components
    - sendGAEvent from @next/third-parties/google for event tracking
    - Location-based tracking (hero, footer, nav_desktop, nav_mobile, contact_section, product_card, homepage_grid)

key-files:
  created:
    - components/analytics/PhoneLink.tsx
    - components/analytics/DirectionsLink.tsx
    - components/analytics/CategoryLink.tsx
    - components/analytics/CTALink.tsx
    - docs/TRACKING_PLAN.md
  modified:
    - components/hero/HeroSection.tsx
    - components/contact/ContactSection.tsx
    - components/Footer.tsx
    - components/Navigation.tsx
    - components/categories/CategoryGrid.tsx
    - components/products/ProductCard.tsx

key-decisions:
  - "Client component wrappers pattern: PhoneLink, DirectionsLink, CategoryLink, CTALink wrap links with onClick tracking while accepting children for flexibility"
  - "Server Components import client wrappers to add tracking without becoming client components themselves"
  - "Navigation (already client component) uses sendGAEvent directly without wrapper"
  - "Location parameter distinguishes same action in different contexts (e.g., phone_click from hero vs footer)"
  - "HeroVideo receives location='hero' prop from HeroSection for future video tracking (07-03)"

patterns-established:
  - "Tracking wrapper pattern: Client components that add onClick + sendGAEvent while preserving link behavior, styling, and children"
  - "Location-based event parameters for multi-instance tracking (same link type in multiple places)"
  - "Server Component + Client wrapper boundary pattern for tracking in SSR contexts"

# Metrics
duration: 5min 42sec
completed: 2026-03-03
---

# Phase 07 Plan 02: GA4 Event Tracking Implementation Summary

**Four tracking wrapper components (PhoneLink, DirectionsLink, CategoryLink, CTALink) wired into all interactive links across HeroSection, ContactSection, Footer, Navigation, CategoryGrid, and ProductCard for comprehensive GA4 click tracking**

## Performance

- **Duration:** 5 min 42 sec
- **Started:** 2026-03-03T14:03:43Z
- **Completed:** 2026-03-03T14:09:25Z
- **Tasks:** 2
- **Files modified:** 10 (4 created, 6 updated)

## Accomplishments

- All phone number links tracked with phone_click events across 5 locations (hero, contact_section, footer, nav_desktop, nav_mobile)
- All directions links tracked with directions_click events in 2 locations (hero, contact_section)
- All category cards tracked with category_click events in CategoryGrid (homepage_grid location)
- All "See In Store" CTAs tracked with cta_click events in ProductCard (product_card location)
- Zero visual or accessibility regressions - all className, aria-label, and styling preserved
- HeroVideo receives explicit location="hero" prop for future video tracking integration (07-03)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create PhoneLink, DirectionsLink, CategoryLink, and CTALink tracking wrappers** - `b1e76f9` (feat)
2. **Task 2: Wire tracking wrappers into existing components** - `6841872` (feat)

## Files Created/Modified

**Created:**
- `components/analytics/PhoneLink.tsx` - Client wrapper for tel: links with phone_click tracking
- `components/analytics/DirectionsLink.tsx` - Client wrapper for Google Maps directions with directions_click tracking
- `components/analytics/CategoryLink.tsx` - Client wrapper for category anchors with category_click tracking
- `components/analytics/CTALink.tsx` - Client wrapper for CTA buttons with cta_click tracking
- `docs/TRACKING_PLAN.md` - Comprehensive GA4 event tracking documentation

**Modified:**
- `components/hero/HeroSection.tsx` - PhoneLink (hero), DirectionsLink (hero), HeroVideo location prop
- `components/contact/ContactSection.tsx` - PhoneLink (contact_section), DirectionsLink (contact_section), removed encodedAddress logic (DirectionsLink handles encoding)
- `components/Footer.tsx` - PhoneLink (footer)
- `components/Navigation.tsx` - sendGAEvent for desktop and mobile phone links (nav_desktop, nav_mobile)
- `components/categories/CategoryGrid.tsx` - CategoryLink for all 6 category cards (homepage_grid)
- `components/products/ProductCard.tsx` - CTALink for "See In Store" button (product_card)

## Decisions Made

**Pattern: Client component wrappers for Server Component tracking**
- Server Components cannot have onClick handlers
- Solution: Create minimal client wrappers (PhoneLink, DirectionsLink, CategoryLink, CTALink) that accept children
- Wrappers add sendGAEvent onClick while preserving all link behavior, styling, and accessibility
- Parent Server Component controls visual content via children, wrapper only adds tracking

**Direct sendGAEvent for Navigation**
- Navigation is already a Client Component (needs useState, usePathname)
- No wrapper needed - import sendGAEvent directly and add onClick to phone links
- Avoids unnecessary component nesting

**Location-based tracking**
- Same action type tracked with different location parameters
- Examples: phone_click from "hero" vs "footer" vs "nav_desktop"
- Enables analysis of which CTA placements drive conversions

**HeroVideo location prop**
- HeroSection passes location="hero" to HeroVideo explicitly
- Prepares for 07-03 video tracking integration
- Makes location a required prop (not optional/inferred)

## Deviations from Plan

**Removed encodedAddress variable from ContactSection**
- **Found during:** Task 2 (ContactSection update)
- **Issue:** ContactSection computed `encodedAddress` but DirectionsLink wrapper handles URL encoding internally
- **Fix:** Removed `const encodedAddress = encodeURIComponent(storeAddress)` and passed raw `storeAddress` to DirectionsLink destination prop
- **Files modified:** components/contact/ContactSection.tsx
- **Verification:** Build passes, directions links work correctly
- **Rule applied:** Rule 1 (Bug) - duplicate/unused encoding logic
- **Committed in:** 6841872 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Minimal - removed redundant code that DirectionsLink wrapper already handles. No functional impact.

## Issues Encountered

None - plan executed smoothly with TypeScript compilation passing after each task.

## User Setup Required

None - no external service configuration required. GA4 tracking will function when NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable is set (already documented in 07-01).

## Next Phase Readiness

**Ready for 07-03:**
- Phone, directions, category, and CTA tracking complete
- Video and form tracking remain (07-03 scope)
- HeroVideo receives location="hero" prop (07-03 will add video_play tracking)
- ContactForm needs form_submit tracking (07-03 scope)

**Tracking coverage:**
- ✅ phone_click (5 locations)
- ✅ directions_click (2 locations)
- ✅ category_click (1 location, 6 categories)
- ✅ cta_click (1 location, all product cards)
- ⏳ video_play (Plan 07-03)
- ⏳ form_submit (Plan 07-03)

**No blockers.** All foundation work for remaining tracking is in place.

---
*Phase: 07-seo-analytics-metadata*
*Completed: 2026-03-03*
