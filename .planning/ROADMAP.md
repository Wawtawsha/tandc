# Roadmap: Town & Country Furniture Website

**Created:** 2026-03-02
**Depth:** Comprehensive
**Requirements:** 31 v1

## Overview

This roadmap delivers a local furniture store website for Town & Country in Farmville, VA. The site exists to do one thing: when someone searches for furniture in Farmville, they find Town & Country, see what is available, trust the local store, and either call or walk in. Built from Shrike Media's Next.js 16 + Tailwind CSS 4 template, the site showcases La-Z-Boy and Ashley product lines under Town & Country's own brand identity, emphasizing local trust and personal service as the competitive advantage over corporate e-commerce.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Brand System** - Clone Shrike template, establish Town & Country visual identity and theming
- [ ] **Phase 2: Navigation & Layout Shell** - Persistent site structure with header, footer, phone, and hours
- [ ] **Phase 3: Homepage Hero & Trust Strip** - Primary landing experience with video hero and trust signals
- [ ] **Phase 4: Product Showcase** - La-Z-Boy and Ashley featured products with video and optimized imagery
- [ ] **Phase 5: Local Identity & About** - Town & Country's story, partner badges, and local service messaging
- [ ] **Phase 6: Contact & Conversion** - Map, contact form, directions, and conversion endpoints
- [ ] **Phase 7: SEO, Analytics & Metadata** - Structured data, social sharing, GA4 tracking, and Nessus documentation
- [ ] **Phase 8: Responsive Polish & Deployment** - Mobile-first audit, accessibility pass, and Vercel production deploy

## Phase Details

### Phase 1: Foundation & Brand System
**Goal:** The project has a working Next.js application with Town & Country's own visual identity established -- color palette, typography, smooth scroll, and page transitions all functioning.
**Depends on:** Nothing (first phase)
**Requirements:** DSGN-01, DSGN-02, DSGN-03, DSGN-04
**Plans:** 3 plans
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` serves a Next.js application at localhost with no build errors
  2. The site displays Town & Country's own color palette (warm, inviting, neutral tones) distinct from both La-Z-Boy vermilion/celadon and Ashley orange/gray
  3. Typography renders using free Google Fonts (serif + sans-serif pairing) with no licensed brand fonts
  4. Smooth scroll (Lenis) operates on page scroll and page transitions animate between routes

Plans:
- [ ] 01-01-PLAN.md -- Clone Shrike template skeleton, strip unused content, install dependencies
- [ ] 01-02-PLAN.md -- Apply T&C oklch color palette, typography, metadata, and content branding
- [ ] 01-03-PLAN.md -- Verify smooth scroll, page transitions, colors, and fonts (human checkpoint)

### Phase 2: Navigation & Layout Shell
**Goal:** Every page on the site shares a consistent header with navigation, phone number, and logo, plus a footer with store hours -- the persistent frame that all content lives inside.
**Depends on:** Phase 1
**Requirements:** HOME-04, HOME-05, CONV-01, CONV-04
**Success Criteria** (what must be TRUE):
  1. A sticky navigation bar with Town & Country logo and nav links is visible on every page, collapsing to a hamburger menu on mobile
  2. The phone number (434) 223-8163 appears in the header on every page and initiates a phone call when tapped on mobile
  3. Store hours (Mon-Fri 9am-5:30pm, Sat 9am-5pm, Closed Sunday) display in the footer on every page
  4. The layout shell renders correctly at mobile, tablet, and desktop widths
**Plans:** TBD

Plans:
- [ ] 02-01: Build sticky header with logo, navigation links, and click-to-call phone
- [ ] 02-02: Build footer with store hours, contact info, and site links
- [ ] 02-03: Implement mobile hamburger navigation

### Phase 3: Homepage Hero & Trust Strip
**Goal:** A visitor landing on the homepage immediately sees a compelling video hero with clear calls to action, trust signals that establish credibility, and visual product category navigation.
**Depends on:** Phase 2
**Requirements:** HOME-01, HOME-02, HOME-03
**Success Criteria** (what must be TRUE):
  1. The homepage displays a full-width hero section with an embedded Ashley marketing video, headline text, and prominent "Call Us" and "Get Directions" CTA buttons
  2. A trust signal strip below the hero shows icons for Local Delivery, Family Owned, Financing Available, and Authorized Dealer
  3. A product category grid displays visual cards (Recliners, Sofas, Sectionals, Lift Chairs, Living Room, Bedroom) that link to the appropriate showcase sections
**Plans:** TBD

Plans:
- [ ] 03-01: Build hero section with HeroVideo component and CTA buttons
- [ ] 03-02: Build trust signal strip with icons
- [ ] 03-03: Build product category grid with visual cards

### Phase 4: Product Showcase
**Goal:** Visitors can browse featured La-Z-Boy and Ashley products, watch marketing videos, and see high-quality optimized imagery -- all driving "See In Store" actions rather than online purchase.
**Depends on:** Phase 3
**Requirements:** PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, TECH-05
**Success Criteria** (what must be TRUE):
  1. A La-Z-Boy best sellers section displays featured products with images, names, and "See In Store" CTAs
  2. An Ashley collections section displays featured products (Next-Gen, Nuvella, lifestyle pieces) with images and "See In Store" CTAs
  3. Marketing videos (self-gliding chair, sofa comparison, outdoor furniture) are embedded and playable inline
  4. Featured products are configurable by editing data files (JSON or similar) without code changes
  5. All product images are served as WebP/AVIF through Next.js Image with responsive sizing, blur placeholders, and lazy loading -- LCP under 3 seconds on simulated mobile 4G
**Plans:** TBD

Plans:
- [ ] 04-01: Create product data schema and configurable data files
- [ ] 04-02: Build La-Z-Boy best sellers showcase section
- [ ] 04-03: Build Ashley collections showcase section
- [ ] 04-04: Integrate video embeds for marketing material
- [ ] 04-05: Configure Next.js Image optimization and verify LCP target

### Phase 5: Local Identity & About
**Goal:** The site communicates that Town & Country is a real, local, family-owned business with deep community roots -- the trust angle that corporate furniture sites cannot replicate.
**Depends on:** Phase 2
**Requirements:** TRUST-01, TRUST-02, TRUST-03, TRUST-04
**Success Criteria** (what must be TRUE):
  1. An About Us section tells Town & Country's story as a long-standing, family-owned Farmville business
  2. "Authorized La-Z-Boy Dealer" and "Ashley Furniture Partner" badges display in the header and/or footer
  3. Local delivery messaging is prominent -- "We deliver personally" language that differentiates from corporate delivery complaints
  4. The About section includes placeholder slots for store exterior/interior photos, ready for client-provided imagery
**Plans:** TBD

Plans:
- [ ] 05-01: Build About Us section with story content and photo placeholders
- [ ] 05-02: Implement dual-brand partner badges (La-Z-Boy and Ashley)
- [ ] 05-03: Build local delivery and service messaging components

### Phase 6: Contact & Conversion
**Goal:** A visitor who is ready to act can immediately get directions, submit a question, or find the store on a map -- every conversion path is one click away.
**Depends on:** Phase 2
**Requirements:** CONV-02, CONV-03, CONV-05
**Success Criteria** (what must be TRUE):
  1. A Google Maps embed shows the store location at 5301 Farmville Rd, Farmville, VA 23901
  2. A contact form captures name, email, phone (optional), and message, and submissions are forwarded to the store email
  3. A "Get Directions" button opens Google Maps driving directions to the store address
**Plans:** TBD

Plans:
- [ ] 06-01: Build contact section with Google Maps embed and directions link
- [ ] 06-02: Build contact form with email forwarding
- [ ] 06-03: Wire up all conversion CTAs across the site

### Phase 7: SEO, Analytics & Metadata
**Goal:** The site is discoverable by search engines for Farmville furniture queries, shares well on social media, and tracks every meaningful user interaction for business intelligence.
**Depends on:** Phases 3, 4, 5, 6 (content must exist to annotate)
**Requirements:** TECH-01, TECH-02, TECH-03, TECH-04
**Success Criteria** (what must be TRUE):
  1. FurnitureStore schema.org structured data is present on all pages with correct name, address, phone, hours, and brand affiliations
  2. OpenGraph metadata (og:image, og:title, og:description) renders correct social sharing previews for every page
  3. Google Analytics 4 fires events for page views, phone clicks, direction clicks, form submissions, video plays, category clicks, scroll depth, and CTA interactions
  4. The analytics event layer is documented with event names, parameters, data schema, and integration points for future Nessus connection
**Plans:** TBD

Plans:
- [ ] 07-01: Implement FurnitureStore schema.org structured data
- [ ] 07-02: Configure OpenGraph metadata for all pages
- [ ] 07-03: Implement GA4 with comprehensive event tracking
- [ ] 07-04: Document analytics event layer for Nessus integration

### Phase 8: Responsive Polish & Deployment
**Goal:** The site is production-ready: fully responsive on mobile, accessible to all users, and deployed to Vercel with custom domain support.
**Depends on:** All previous phases
**Requirements:** TECH-06, TECH-07, DSGN-05
**Success Criteria** (what must be TRUE):
  1. The site renders correctly in single-column layout on mobile, grid layouts on tablet/desktop, with 48px minimum touch targets throughout
  2. WCAG AA accessibility passes: skip-to-content link, semantic HTML, alt text on all images, full keyboard navigation, and reduced-motion support
  3. The site is deployed to Vercel with a successful production build and custom domain support configured
**Plans:** TBD

Plans:
- [ ] 08-01: Mobile-first responsive audit and fixes across all sections
- [ ] 08-02: WCAG AA accessibility pass
- [ ] 08-03: Vercel deployment and custom domain configuration
- [ ] 08-04: Final cross-browser and performance validation

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8
Note: Phases 5 and 6 depend only on Phase 2 and could execute in parallel with Phases 3-4.

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Foundation & Brand System | 0/3 | Planning complete | - |
| 2. Navigation & Layout Shell | 0/3 | Not started | - |
| 3. Homepage Hero & Trust Strip | 0/3 | Not started | - |
| 4. Product Showcase | 0/5 | Not started | - |
| 5. Local Identity & About | 0/3 | Not started | - |
| 6. Contact & Conversion | 0/3 | Not started | - |
| 7. SEO, Analytics & Metadata | 0/4 | Not started | - |
| 8. Responsive Polish & Deployment | 0/4 | Not started | - |
