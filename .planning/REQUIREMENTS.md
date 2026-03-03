# Requirements: Town & Country Furniture Website

**Defined:** 2026-03-02
**Core Value:** When someone in Farmville searches for furniture, they find Town & Country, see what's available, trust the local store, and either call or walk in.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Homepage & Navigation

- [x] **HOME-01**: Homepage displays full-width hero section with Ashley marketing video, headline text, and prominent CTA buttons (Call Us, Get Directions)
- [x] **HOME-02**: Trust signal strip displays below hero with icons: Local Delivery, Family Owned, Financing Available, Authorized Dealer
- [x] **HOME-03**: Product category grid shows visual cards for furniture categories (Recliners, Sofas, Sectionals, Lift Chairs, Living Room, Bedroom) linking to showcase sections
- [ ] **HOME-04**: Sticky navigation bar with Town & Country logo, nav links, and phone number; collapses to hamburger menu on mobile
- [ ] **HOME-05**: Navigation phone number is click-to-call on mobile devices

### Product Showcase

- [x] **PROD-01**: La-Z-Boy best sellers section displays featured products with images, product names, and "See In Store" CTAs
- [x] **PROD-02**: Ashley collections section displays featured products (Next-Gen & Nuvella, lifestyle pieces) with images and "See In Store" CTAs
- [x] **PROD-03**: Video product showcases embed marketing videos (self-gliding chair, sofa comparison, outdoor furniture) as playable content *(placeholder video IDs — needs client marketing videos)*
- [x] **PROD-04**: Product sections are configurable -- store can update featured items by editing data files without code changes
- [~] **PROD-05**: All product imagery optimized through Next.js Image (WebP/AVIF, responsive sizing, blur placeholders) *(infrastructure wired, LCP untestable without real images)*

### Local Identity & Trust

- [x] **TRUST-01**: About Us section tells Town & Country's story -- long-standing local business, family-owned, community presence in Farmville
- [x] **TRUST-02**: Dual-brand partner badges displayed -- "Authorized La-Z-Boy Dealer" and "Ashley Furniture Partner" in header and/or footer
- [x] **TRUST-03**: Local delivery messaging prominently featured -- "We deliver personally" language that differentiates from corporate delivery complaints
- [x] **TRUST-04**: About section includes store exterior/interior photo placeholder slots for client-provided imagery

### Contact & Conversion

- [ ] **CONV-01**: Phone number displayed prominently in header on every page, tap-to-call on mobile
- [x] **CONV-02**: Google Maps embed shows store location with driving directions link
- [x] **CONV-03**: Contact form captures name, email, phone (optional), and message -- submissions forwarded to store email
- [ ] **CONV-04**: Store hours displayed in footer on every page and prominently in contact section
- [x] **CONV-05**: "Get Directions" button links to Google Maps directions to 5301 Farmville Rd, Farmville, VA 23901

### Technical & SEO

- [ ] **TECH-01**: FurnitureStore schema.org structured data on all pages -- name, address, phone, hours, brand affiliations
- [ ] **TECH-02**: OpenGraph metadata (og:image, og:title, og:description) on every page for social sharing previews
- [ ] **TECH-03**: Google Analytics 4 with comprehensive event tracking -- page views, phone clicks, direction clicks, form submissions, video plays, category clicks, scroll depth, CTA interactions
- [ ] **TECH-04**: Analytics event layer documented thoroughly for future Nessus integration -- event names, parameters, data schema, and integration points all documented
- [~] **TECH-05**: All images served as WebP/AVIF with responsive sizing and lazy loading; LCP target under 3 seconds on mobile 4G *(infrastructure wired, verification pending real images)*
- [ ] **TECH-06**: Site deployed to Vercel with production build, custom domain support configured
- [ ] **TECH-07**: Mobile-first responsive design -- single column on mobile, grid layouts on tablet/desktop, 48px minimum touch targets

### Design & Brand

- [ ] **DSGN-01**: Town & Country's own visual identity as primary -- custom color palette (warm, inviting, neutral) distinct from both La-Z-Boy and Ashley brand colors
- [ ] **DSGN-02**: Typography uses free Google Fonts -- no licensed brand fonts. Clean serif + sans-serif pairing.
- [ ] **DSGN-03**: Smooth scroll behavior with Lenis (from Shrike template)
- [ ] **DSGN-04**: Page transitions between routes (from Shrike template)
- [ ] **DSGN-05**: WCAG AA accessible -- skip-to-content, semantic HTML, alt text, keyboard navigation, reduced-motion support

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Content

- **V2-01**: Dedicated category pages per furniture type (recliners, sofas, sectionals, etc.) with curated product grids
- **V2-02**: Financing details page with store-specific terms (verified with their financing provider)
- **V2-03**: Staff profiles -- "Meet your design consultant" with photos and specialties
- **V2-04**: Before/after room galleries -- real customer rooms furnished with store products
- **V2-05**: Links to Ashley Room Planner and Style Quiz as value-add tools

### Engagement

- **V2-06**: Appointment booking via Calendly embed for design consultations
- **V2-07**: Email capture for sale notifications -- "Be first to know about our next sale"
- **V2-08**: Seasonal promotion banner system -- updatable hero for Memorial Day, Black Friday, etc.
- **V2-09**: Google Reviews integration -- display star rating from Google Business Profile

### Analytics Integration

- **V2-10**: Nessus analytics integration -- connect GA4 event data to Shrike Media's Nessus tracking system
- **V2-11**: Meta Pixel for Facebook/Instagram ad tracking

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce / shopping cart | Can't compete with corporate sites; local value is showroom experience |
| Real-time inventory display | No POS integration; stale "in stock" data destroys trust faster than no data |
| Custom room planner | Ashley provides one free at roombuilder.ashleyfurniture.com |
| AR / 3D visualization | Ashley's mobile app handles this |
| User accounts / login | Furniture purchases are infrequent (every 7-10 years); no login needed |
| Live chat / chatbot | High-consideration purchase; poorly implemented chat destroys trust. Phone preferred. |
| Customer review system | No credibility on store's own site; link to Google Reviews instead |
| Blog / content marketing | Unless client commits to maintaining it; stale blog looks worse than none |
| Online price display | In-store pricing may differ; "Visit us for best pricing" messaging instead |
| CMS for content updates | v1 uses hardcoded data files; CMS only if update frequency justifies it |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| HOME-01 | Phase 3 | Complete |
| HOME-02 | Phase 3 | Complete |
| HOME-03 | Phase 3 | Complete |
| HOME-04 | Phase 2 | Complete |
| HOME-05 | Phase 2 | Complete |
| PROD-01 | Phase 4 | Complete |
| PROD-02 | Phase 4 | Complete |
| PROD-03 | Phase 4 | Complete (placeholder video IDs) |
| PROD-04 | Phase 4 | Complete |
| PROD-05 | Phase 4 | Partial (infra wired, needs images) |
| TRUST-01 | Phase 5 | Complete |
| TRUST-02 | Phase 5 | Complete |
| TRUST-03 | Phase 5 | Complete |
| TRUST-04 | Phase 5 | Complete |
| CONV-01 | Phase 2 | Complete |
| CONV-02 | Phase 6 | Complete |
| CONV-03 | Phase 6 | Complete |
| CONV-04 | Phase 2 | Complete |
| CONV-05 | Phase 6 | Complete |
| TECH-01 | Phase 7 | Pending |
| TECH-02 | Phase 7 | Pending |
| TECH-03 | Phase 7 | Pending |
| TECH-04 | Phase 7 | Pending |
| TECH-05 | Phase 4 | Partial (infra wired, needs images) |
| TECH-06 | Phase 8 | Pending |
| TECH-07 | Phase 8 | Pending |
| DSGN-01 | Phase 1 | Complete |
| DSGN-02 | Phase 1 | Complete |
| DSGN-03 | Phase 1 | Complete |
| DSGN-04 | Phase 1 | Complete |
| DSGN-05 | Phase 8 | Pending |

**Coverage:**
- v1 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0

---
*Requirements defined: 2026-03-02*
*Last updated: 2026-03-03 after Phase 6 completion*
