---
phase: 06-contact-conversion
plan: 01
subsystem: ui
tags: [contact, google-maps, conversion, cta]

# Dependency graph
requires:
  - phase: 04-product-showcase
    provides: ProductCard with See In Store CTA linking to #contact
  - phase: 02-navigation-layout-shell
    provides: scroll-padding-top for anchor offset
provides:
  - MapEmbed component with Google Maps iframe embed
  - ContactSection component with id=contact anchor target
  - Store info display (address, phone, hours)
  - Get Directions CTA opening Google Maps
  - Form placeholder column for future ContactForm
affects: [07-seo-analytics, 06-02-contact-form]

# Tech tracking
tech-stack:
  added: [Google Maps Embed API]
  patterns: [Server Component contact section, graceful degradation for missing API key]

key-files:
  created:
    - components/contact/MapEmbed.tsx
    - components/contact/ContactSection.tsx
  modified:
    - app/(main)/page.tsx

key-decisions:
  - "MapEmbed with graceful degradation if NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing"
  - "Form placeholder in right column awaiting Plan 02 ContactForm"
  - "Get Directions uses Google Maps Directions API format for universal device support"
  - "ContactSection bg-surface for alternating section pattern"

patterns-established:
  - "Pattern: Contact sections use two-column grid (map/info left, form right)"
  - "Pattern: Store info in styled card with address, phone, hours"
  - "Pattern: Inline SVG icons for CTAs (consistent with HeroSection)"

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 6 Plan 1: Contact & Location Summary

**Google Maps embed with store location, directions CTA, and #contact anchor resolving ProductCard See In Store links**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-03T12:27:18Z
- **Completed:** 2026-03-03T12:29:49Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- ContactSection with id="contact" resolves anchor target from Phase 4 ProductCard CTAs
- Google Maps iframe displays store at 5301 Farmville Rd, Farmville, VA
- Get Directions button opens Google Maps with driving directions
- Store address, hours, and click-to-call phone number displayed
- Form placeholder ready for Plan 02 ContactForm component

## Task Commits

Each task was committed atomically:

1. **Task 1: Create MapEmbed and ContactSection components** - `cb7c484` (feat)
2. **Task 2: Add ContactSection to homepage** - `d98981a` (feat)

## Files Created/Modified
- `components/contact/MapEmbed.tsx` - Google Maps iframe embed with place mode API, graceful degradation
- `components/contact/ContactSection.tsx` - Full contact section with map, store info, directions CTA, form placeholder
- `app/(main)/page.tsx` - Added ContactSection after VideoShowcase

## Decisions Made

**1. Graceful degradation for missing Google Maps API key**
- Rationale: Dev environment may not have NEXT_PUBLIC_GOOGLE_MAPS_API_KEY set
- Fallback: Renders store address with "View on Google Maps" link using search API (no key required)
- Impact: Component works in any environment

**2. Form placeholder with call-to-action fallback**
- Rationale: Plan 02 will build ContactForm component
- Placeholder: "Send Us a Message" heading with explanation and "Call Us" CTA
- Impact: Right column ready for ContactForm drop-in replacement

**3. Get Directions uses Google Maps Directions API format**
- Rationale: Universal device support (iOS Maps, Android, desktop)
- Format: `https://www.google.com/maps/dir/?api=1&destination=...`
- Impact: Works on all platforms without app-specific links

**4. ContactSection background matches alternating pattern**
- Rationale: LaZBoySection (bg-background), AshleySection (bg-surface), VideoShowcase (implicit bg-background)
- Choice: ContactSection bg-surface continues alternating visual rhythm
- Impact: Visual hierarchy guides visitor scroll

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - both tasks completed without errors or blockers.

## User Setup Required

**Environment variable (optional):**
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps Embed API key
- If not set: Graceful fallback with "View on Google Maps" link
- If set: Full iframe embed with interactive map

**To add:**
1. Get API key from Google Cloud Console (Maps Embed API)
2. Add to `.env.local`: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key-here`
3. Restart dev server

## Next Phase Readiness

**Ready for Plan 02:**
- ContactSection exists with form placeholder column
- Right column div ready to receive ContactForm component
- All store info (address, phone, hours) already displayed in left column

**Blocker resolved:**
- #contact anchor target now exists (blocker from Phase 4 removed)
- ProductCard "See In Store" CTAs now scroll correctly to contact section

**Ready for Phase 7 (SEO):**
- Contact section provides content for FurnitureStore JSON-LD schema expansion
- Address and phone number machine-readable for structured data

---
*Phase: 06-contact-conversion*
*Completed: 2026-03-03*
