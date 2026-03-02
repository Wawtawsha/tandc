# Town & Country Furniture — Website

## What This Is

A website for Town & Country, a furniture store in Farmville, Virginia. They are the only La-Z-Boy distributor in town and are partnered with Ashley Furniture. The site showcases their best-selling furniture, establishes local trust, and drives showroom visits and phone calls. Built by Shrike Media as a client engagement.

## Core Value

When someone in Farmville searches for furniture, they find Town & Country's site, see what's available, trust the local store, and either call or walk in. Every page exists to make that happen.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Homepage with hero video, best sellers, and clear CTAs (call, visit, get directions)
- [ ] Best sellers showcase — configurable product sections for La-Z-Boy and Ashley lines
- [ ] Store info prominently displayed — address, phone (click-to-call), hours, map
- [ ] About section — family/local-owned story, long-standing Farmville business
- [ ] La-Z-Boy authorized dealer branding — partner badge, featured recliner/sofa categories
- [ ] Ashley Furniture partner branding — partner badge, Next-Gen & Nuvella collections
- [ ] Contact section — phone, directions, contact form
- [ ] Mobile-responsive design — mobile-first, 60%+ traffic expected on phones
- [ ] Video integration — Ashley marketing videos embedded as product showcases
- [ ] Trust signals — local delivery, local service, community presence
- [ ] Local SEO — FurnitureStore schema, OpenGraph, meta tags optimized for Farmville VA
- [ ] Deployed to Vercel with custom domain support

### Out of Scope

- E-commerce / shopping cart — no online purchasing, drives in-store visits instead
- Inventory display — no real-time stock; "visit us" or "call for availability" messaging
- Custom room planner — link to Ashley's free tool at roombuilder.ashleyfurniture.com instead
- User accounts — furniture purchases are infrequent, no login needed
- Blog / content marketing — unless client commits to maintaining it
- Live chat — high-consideration purchase, phone calls preferred
- Customer review system — link to Google Reviews instead
- AR / 3D visualization — link to Ashley's mobile app instead

## Context

**Client:** Town & Country, Farmville, VA
**Address:** 5301 Farmville Rd, Farmville, VA 23901
**Phone:** (434) 223-8163
**Hours:** Mon-Fri 9am-5:30pm, Sat 9am-5pm, Closed Sunday

**Brand positioning:** Town & Country's own identity is primary. La-Z-Boy and Ashley appear as authorized partner/dealer badges. This avoids the color palette conflict between La-Z-Boy (burnt vermilion + celadon green, 2025 refresh) and Ashley (orange #F48120 + gray #404041, 2023 rebrand) and gives the store its own visual presence.

**Marketing materials available:**
- 6 MP4 videos from Ashley (outdoor furniture, self-gliding chair, sofa comparison, YBOR-AI content)
- 2 JPEG images (Next-Gen & Nuvella collection collage, power reclining loveseat lifestyle shot)
- Located at: `marketingmaterial/`

**Product lines to feature:**
- La-Z-Boy: Full lineup (recliners, sofas, sectionals, lift chairs) — exact best sellers TBD with client
- Ashley: Next-Gen & Nuvella collections (sectionals, power lift chairs, reclining sofas), outdoor furniture

**Building from:** Shrike Media's production Next.js 16 + React 19 + Tailwind CSS 4 template (at `C:\Users\steph\OneDrive\Desktop\claude\shrike`). Includes HeroVideo component, parallax sections, smooth scroll, page transitions, mobile navigation, image optimization, WCAG AAA accessibility, and oklch theming system.

**Research completed:** Domain research on La-Z-Boy (2025 brand refresh, dealer patterns), Ashley Furniture (brand colors, reputation analysis, partner site patterns), and local furniture store UX best practices. Files in `.planning/research/`.

**Key research insight:** Both La-Z-Boy and Ashley have mixed-to-poor corporate reputations on review platforms. Town & Country's "we're local, we're here, walk in and talk to us" angle is a genuine competitive advantage — not just marketing fluff.

## Constraints

- **Tech stack**: Next.js 16 + Tailwind CSS 4, cloned from Shrike template — consistency with Shrike Media's toolchain
- **Hosting**: Vercel — consistent with existing Shrike infrastructure (Schmoo LLC, shrikemedia.co)
- **No CMS initially**: Hardcoded content for v1. CMS only if/when client needs frequent updates.
- **Font licensing**: La-Z-Boy's brand fonts (Bookmania, Gotham) require commercial licenses. Use free alternatives (Libre Baskerville + Inter/DM Sans) unless dealer agreement includes web licenses.
- **Image optimization**: Furniture sites are image-heavy. All images must go through Next.js Image optimization (WebP/AVIF). Target sub-3-second LCP on mobile.
- **Content dependency**: Some product-specific content (exact best sellers, store history details, staff photos) requires client input. Build structure to be easily updatable.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Store-brand-primary identity | Avoids La-Z-Boy vs Ashley color clash; gives Town & Country its own presence | — Pending |
| Clone from Shrike template | Proven production codebase with all needed components; faster than starting fresh | — Pending |
| No e-commerce | Can't compete with corporate sites; local value is showroom experience | — Pending |
| Hardcoded content over CMS | Simpler, faster, no empty content types; CMS adds complexity without clear need yet | — Pending |
| Family/local trust angle | Research shows corporate brand reputation is a liability; local ownership is genuine differentiator | — Pending |
| Free font alternatives | Brand fonts require commercial licenses; similar-spirit free fonts avoid legal risk | — Pending |

---
*Last updated: 2026-03-02 after initialization*
