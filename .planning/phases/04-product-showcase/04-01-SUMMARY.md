---
phase: 04-product-showcase
plan: 01
subsystem: data-layer
tags: [typescript, product-catalog, discriminated-unions, next-image, server-components]

# Dependency graph
requires:
  - phase: 03-homepage-hero-trust
    provides: CategoryGrid with anchor IDs and oklch placeholders
provides:
  - Typed product data file with Product discriminated union (LaZBoyProduct | AshleyProduct)
  - Sample catalog with 10 products (5 La-Z-Boy, 5 Ashley)
  - Four filter helper functions with type narrowing
  - Shared ProductCard component with image/placeholder rendering
  - OKLCH placeholder strategy with category-specific colors
affects: [04-02-brand-sections, 04-03-video-showcase, future-product-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "TypeScript data files over JSON for type safety and autocomplete"
    - "Discriminated unions with brand field for type narrowing"
    - "OKLCH placeholders with category-specific colors"
    - "Explicit ternary on optional fields (product.image) for undefined handling"
    - "Server Components as default (no use client unless needed)"

key-files:
  created:
    - data/products.ts
    - components/products/ProductCard.tsx
  modified: []

key-decisions:
  - "Use image: undefined for placeholder strategy (not magic string)"
  - "Category values match CategoryGrid anchor IDs (recliner, sofa, sectional, lift-chair, living-room, bedroom)"
  - "Filter helpers are ONLY way components access products (encapsulation)"
  - "ProductCard is Server Component (no client-side state needed)"
  - "See In Store CTA linking to #contact (not Buy Now)"

patterns-established:
  - "Product data centralized in data/products.ts with typed interfaces"
  - "Filter helpers return narrowed types (LaZBoyProduct[] not Product[])"
  - "ProductCard handles both image and placeholder via explicit ternary"
  - "Category-specific oklch colors for visual consistency with CategoryGrid"

# Metrics
duration: 2min 17sec
completed: 2026-03-03
---

# Phase 4 Plan 01: Product Data Foundation Summary

**Typed product catalog with 10 sample products and shared ProductCard component rendering image or oklch placeholder with furniture SVG icon**

## Performance

- **Duration:** 2min 17sec
- **Started:** 2026-03-03T04:02:14Z
- **Completed:** 2026-03-03T04:04:31Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created typed product data file with discriminated union (LaZBoyProduct | AshleyProduct)
- Populated sample catalog with 10 products (all using placeholder strategy: image undefined)
- Built 4 filter helper functions with TypeScript type narrowing
- Implemented shared ProductCard component as Server Component
- OKLCH placeholder rendering with category-specific colors and furniture SVG icon

## Task Commits

Each task was committed atomically:

1. **Task 1: Create typed product data file** - `5551a44` (feat)
   - Product type system with BaseProduct, LaZBoyProduct, AshleyProduct
   - Sample catalog with 10 products (5 La-Z-Boy, 5 Ashley)
   - Four filter helper functions with type narrowing

2. **Task 2: Build shared ProductCard component** - `d7e12d6` (feat)
   - Server Component (no use client)
   - Image or oklch placeholder with explicit ternary
   - Brand badge and optional collection badge
   - See In Store CTA linking to #contact

## Files Created/Modified
- `data/products.ts` - Typed product catalog with discriminated union, sample products, filter helpers
- `components/products/ProductCard.tsx` - Shared card component with image/placeholder rendering, brand badges, CTA

## Decisions Made

**1. Use `image: undefined` for placeholder strategy**
- NOT a magic string like "placeholder" - just omit the field
- ProductCard uses explicit ternary: `product.image ? <Image /> : <Placeholder />`
- Handles both undefined and falsy values correctly

**2. Category values match CategoryGrid anchor IDs**
- Ensures consistency between category cards and product filtering
- Categories: recliner, sofa, sectional, lift-chair, living-room, bedroom
- Allows getFeaturedByCategory() to power anchor link navigation in Plan 02

**3. Filter helpers are ONLY way components access products**
- Components import helpers, never filter raw products array
- Encapsulation: data structure can change without breaking consumers
- Type narrowing: getLaZBoyBestSellers() returns LaZBoyProduct[], not Product[]

**4. ProductCard is Server Component**
- No client-side state needed for rendering product cards
- Image optimization via Next.js Image component
- Keeps bundle small, rendering fast

**5. See In Store CTA (not Buy Now)**
- Local furniture store drives showroom visits, not online sales
- Links to #contact anchor (will be contact form in future phase)
- Consistent with store-first business model

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - TypeScript compilation passed on first attempt, imports resolved correctly via tsconfig paths.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Plan 02 (Brand Sections):**
- Product data available via filter helpers
- ProductCard ready to render in grid layouts
- OKLCH placeholders provide visual consistency until product photography available
- Type system supports brand-specific features (bestseller for La-Z-Boy, collection for Ashley)

**Blockers/Concerns:**
- Product photography not yet available (planned - using placeholder strategy)
- Exact best sellers require client input (sample products are representative)
- Contact form anchor target (#contact) doesn't exist yet (will be created in Phase 5)

---
*Phase: 04-product-showcase*
*Completed: 2026-03-03*
