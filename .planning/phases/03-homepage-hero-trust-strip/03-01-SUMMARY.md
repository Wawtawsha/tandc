---
phase: 03-homepage-hero-trust-strip
plan: 01
subsystem: ui
tags: [react, next.js, youtube, lucide, video-embed, trust-signals]

# Dependency graph
requires:
  - phase: 02-navigation-layout-shell
    provides: Navigation header with phone CTA, Footer with store hours, layout shell pattern
provides:
  - HeroVideo Client Component wrapping LiteYouTubeEmbed facade (click-to-play, noCookie)
  - HeroSection Server Component with headline, subtitle, Call Us/Get Directions CTAs
  - TrustStrip Server Component with four Lucide icon trust signals
  - react-lite-youtube-embed and lucide-react dependencies installed
affects: [03-02-homepage-composition, 04-product-showcase]

# Tech tracking
tech-stack:
  added: [react-lite-youtube-embed, lucide-react]
  patterns: [lite-youtube facade pattern, client/server component boundary, inline SVG for CTAs, Lucide icons for static UI]

key-files:
  created:
    - components/hero/HeroVideo.tsx
    - components/hero/HeroSection.tsx
    - components/trust/TrustStrip.tsx
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "HeroVideo as Client Component, HeroSection as Server Component (boundary pushed deep)"
  - "Inline SVG icons for CTAs to keep HeroSection server-rendered"
  - "Lucide icons for trust signals (tree-shakeable, works in Server Components)"
  - "Placeholder YouTube videoId dQw4w9WgXcQ (to be replaced with actual Ashley marketing video)"
  - "Trust signal descriptions hidden on mobile (md:block) for compact layout"

patterns-established:
  - "Client/Server boundary: only interactive components need 'use client', wrapper stays server"
  - "LiteYouTubeEmbed facade: click-to-play, noCookie, maxresdefault poster for performance"
  - "Inline SVGs for simple icons in Server Components, Lucide imports for repeated/complex icons"
  - "Google Maps directions URL format: api=1&destination=[address]"

# Metrics
duration: 3min 24sec
completed: 2026-03-02
---

# Phase 3 Plan 1: Homepage Hero & Trust Strip Summary

**YouTube video hero with click-to-play facade, dual CTA buttons (tel:/maps), and four-icon trust signal strip using Lucide**

## Performance

- **Duration:** 3 min 24 sec
- **Started:** 2026-03-02T18:56:30Z
- **Completed:** 2026-03-02T18:59:54Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- HeroVideo Client Component with react-lite-youtube-embed facade pattern (saves ~500KB, defers iframe load until click)
- HeroSection Server Component with responsive headline, subtitle, Call Us (tel:+14342238163), and Get Directions (Google Maps URL) CTAs
- TrustStrip Server Component with four Lucide icons (Truck, Heart, CreditCard, Award) in responsive grid (2x2 mobile, 4x1 desktop)
- Dependencies installed cleanly with no build errors or type issues

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies and build HeroVideo + HeroSection** - `40f071d` (feat)
2. **Task 2: Build TrustStrip component with Lucide icons** - `962f50d` (feat)

## Files Created/Modified
- `components/hero/HeroVideo.tsx` - Client Component wrapping LiteYouTubeEmbed with click-to-play, noCookie=true, maxresdefault poster
- `components/hero/HeroSection.tsx` - Server Component with headline (display font), subtitle, Call Us/Get Directions CTAs (inline SVG icons), HeroVideo child
- `components/trust/TrustStrip.tsx` - Server Component with four trust signals in responsive grid, descriptions hidden on mobile
- `package.json` - Added react-lite-youtube-embed ^3.5.1, lucide-react ^0.576.0
- `package-lock.json` - Dependency lockfile updated

## Decisions Made

**1. Client/Server Component Boundary**
- Only HeroVideo.tsx has 'use client' directive
- HeroSection.tsx remains Server Component by using inline SVG icons instead of importing from lucide-react
- Maximizes server-rendering benefits while isolating client-side interactivity

**2. Placeholder Video ID**
- Used "dQw4w9WgXcQ" as placeholder (well-known Rick Astley placeholder)
- Actual Ashley marketing video ID to be provided by client and swapped in Plan 02 homepage composition

**3. Trust Signal UX**
- Descriptions hidden on mobile (hidden md:block) to keep trust strip compact
- Lucide strokeWidth 1.5 for visual consistency with brand's clean aesthetic
- 2x2 grid on mobile prioritizes readability over showing all four in one row

**4. CTA Link Patterns**
- Call Us: `tel:+14342238163` for mobile click-to-call
- Get Directions: Google Maps URL API format with `api=1&destination=` parameter (verified working format)
- Both buttons use inline SVG icons (phone, map-pin) to avoid client-side imports in Server Component

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - both dependencies installed cleanly, TypeScript passed, build succeeded on first attempt.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Plan 02 (Homepage Composition):**
- HeroSection component ready to render on homepage
- TrustStrip component ready to render below hero
- Both components are fully responsive (mobile-first)
- All CTAs functional (tel: link and Google Maps directions)

**Pending items:**
- Actual Ashley marketing video ID from client (currently using placeholder)
- Category grid component (Plan 02 scope)
- Homepage page.tsx composition (Plan 02 scope)

---
*Phase: 03-homepage-hero-trust-strip*
*Completed: 2026-03-02*
