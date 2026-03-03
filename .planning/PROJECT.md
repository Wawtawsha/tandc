# Town & Country Furniture -- Website

## What This Is

A website for Town & Country, a furniture store in Farmville, Virginia. They are the only La-Z-Boy distributor in town and are partnered with Ashley Furniture. The site showcases their best-selling furniture, establishes local trust, and drives showroom visits and phone calls. Built by Shrike Media as a client engagement. Shipped v1.0 and deployed to Vercel.

## Core Value

When someone in Farmville searches for furniture, they find Town & Country's site, see what's available, trust the local store, and either call or walk in. Every page exists to make that happen.

## Requirements

### Validated

- HOME-01: Homepage hero with video, headline, CTAs -- v1.0
- HOME-02: Trust signal strip (Local Delivery, Family Owned, Financing, Authorized Dealer) -- v1.0
- HOME-03: Product category grid linking to showcase sections -- v1.0
- HOME-04: Sticky navigation with logo, nav links, phone number, hamburger mobile menu -- v1.0
- HOME-05: Click-to-call phone number on mobile -- v1.0
- PROD-01: La-Z-Boy best sellers section with "See In Store" CTAs -- v1.0
- PROD-02: Ashley collections section with "See In Store" CTAs -- v1.0
- PROD-03: Video showcases with embedded marketing videos -- v1.0 (placeholder IDs)
- PROD-04: Configurable product data via TypeScript data files -- v1.0
- PROD-05: Next.js Image optimization infrastructure -- v1.0 (partial, awaiting real images)
- TRUST-01: About Us family-owned story -- v1.0
- TRUST-02: Dual-brand partner badges in footer -- v1.0
- TRUST-03: Local delivery messaging -- v1.0
- TRUST-04: Photo placeholder slots for client imagery -- v1.0
- CONV-01: Phone number in header on every page, tap-to-call -- v1.0
- CONV-02: Google Maps embed with store location -- v1.0
- CONV-03: Contact form with Zod validation and Resend email -- v1.0
- CONV-04: Store hours in footer on every page -- v1.0
- CONV-05: Get Directions button to Google Maps -- v1.0
- TECH-01: FurnitureStore schema.org structured data -- v1.0
- TECH-02: OpenGraph metadata and dynamic OG images -- v1.0
- TECH-03: GA4 with 8 event types tracking all interactions -- v1.0
- TECH-04: TRACKING_PLAN.md documenting analytics layer for Nessus -- v1.0
- TECH-05: Image optimization infrastructure -- v1.0 (partial, awaiting real images)
- TECH-06: Deployed to Vercel with production build -- v1.0
- TECH-07: Mobile-first responsive with 48px touch targets -- v1.0
- DSGN-01: Custom oklch color palette (warm ivory/gold) -- v1.0
- DSGN-02: Libre Baskerville + DM Sans typography -- v1.0
- DSGN-03: Lenis smooth scroll -- v1.0
- DSGN-04: Page transitions between routes -- v1.0
- DSGN-05: WCAG AA accessible (focus-visible, semantic HTML, alt text, skip-to-content) -- v1.0

### Active

(None -- next milestone requirements TBD)

### Out of Scope

- E-commerce / shopping cart -- local value is showroom experience
- Inventory display -- no POS integration; stale data destroys trust
- Custom room planner -- link to Ashley's free tool instead
- User accounts -- furniture purchases infrequent, no login needed
- Blog / content marketing -- unless client commits to maintaining it
- Live chat -- high-consideration purchase, phone preferred
- Customer review system -- link to Google Reviews instead
- AR / 3D visualization -- link to Ashley's mobile app instead
- Online price display -- in-store pricing may differ
- CMS -- v1 uses hardcoded data files

## Context

**Client:** Town & Country, Farmville, VA
**Address:** 5301 Farmville Rd, Farmville, VA 23901
**Phone:** (434) 223-8163
**Hours:** Mon-Fri 9am-5:30pm, Sat 9am-5pm, Closed Sunday

**Current state:** v1.0 shipped. 45 source files, 2,634 LOC TypeScript/CSS. Next.js 16 + React 19 + Tailwind CSS 4. Deployed at https://tandc-six.vercel.app.

**Content dependencies (client action needed):**
- Product photography for 10 products (currently oklch placeholders)
- 3 store photos for About page (exterior, showroom, team)
- Ashley marketing video IDs (currently placeholder YouTube IDs)
- GA4 measurement ID (G-XXXXXXXXXX)
- Google Maps API key (optional, graceful fallback working)
- Resend API key (for contact form email delivery)
- Custom domain configuration in Vercel dashboard

**Brand positioning:** Town & Country's own identity is primary. La-Z-Boy and Ashley appear as authorized partner/dealer badges. This avoids the color palette conflict between La-Z-Boy and Ashley and gives the store its own visual presence.

## Constraints

- **Tech stack**: Next.js 16 + Tailwind CSS 4, from Shrike template
- **Hosting**: Vercel
- **No CMS**: Hardcoded content for v1
- **Font licensing**: Free alternatives (Libre Baskerville + DM Sans)
- **Image optimization**: All images through Next.js Image. Target sub-3-second LCP on mobile.
- **Content dependency**: Some content requires client input. Structure is easily updatable.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Store-brand-primary identity | Avoids La-Z-Boy vs Ashley color clash | Good -- distinct warm palette works |
| Clone from Shrike template | Proven production codebase | Good -- all infrastructure ready |
| No e-commerce | Local showroom value proposition | Good -- drives in-store visits |
| Hardcoded content over CMS | Simpler, faster for v1 | Good -- easy to update data files |
| Family/local trust angle | Corporate brand reputation is a liability | Good -- genuine differentiator |
| Free font alternatives | Avoids licensing risk | Good -- Libre Baskerville + DM Sans pair well |
| Server Components by default | Push client boundaries deep | Good -- minimal JS bundle |
| oklch placeholder strategy | Awaiting client photos | Good -- graceful, branded placeholders |
| GA4 with client component wrappers | Track in Server Components | Good -- clean separation |
| focus-visible (not focus) | Keyboard-only indicators | Good -- no visual noise on mouse clicks |
| Resend for email | Simple API, free tier | Pending -- needs API key to verify |
| No m-dashes in copy | Client preference | Good -- cleaner punctuation |

---
*Last updated: 2026-03-03 after v1.0 milestone*
