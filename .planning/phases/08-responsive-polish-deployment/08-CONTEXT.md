# Phase 8: Responsive Polish & Deployment - Context

**Gathered:** 2026-03-03
**Status:** Ready for planning

<domain>
## Phase Boundary

The site is production-ready: fully responsive on mobile and desktop, accessible to all users, and deployed to Vercel as an unlisted preview. Content placeholders remain until client provides real assets. No new features or capabilities.

</domain>

<decisions>
## Implementation Decisions

### Mobile breakpoint strategy
- Equal weight on mobile and desktop — both matter
- Spot-check critical paths: homepage, about, contact at 375px (mobile), 768px (tablet), 1280px (desktop)
- Use Tailwind default breakpoints (sm/md/lg/xl) — no custom breakpoints
- Fix anything visibly broken; don't over-audit
- Haven't been tested on mobile yet — first look will be during this phase

### Accessibility depth
- Claude's discretion on depth — do what's reasonable without slowing launch
- Not a legal concern right now — small local business
- No specific a11y features requested — pragmatic essentials
- Reduced-motion support already exists from Phase 1 (useReducedMotion hook)
- Focus on: skip-to-content, alt text, semantic HTML, basic keyboard nav where obvious

### Deployment & domain setup
- Vercel URL: `townandcountry.vercel.app` (custom Vercel subdomain, not a purchased domain)
- Deploy under Shrike Media Vercel org account
- GitHub remote: push to Wawtawsha org (github.com/Wawtawsha)
- Environment variables: deploy WITHOUT them — graceful fallbacks for GA4, Maps, Resend
- No env vars needed for preview; add real keys when going public

### Launch strategy
- Two-stage launch: unlisted preview first, then public with real content
- Real content is required before public launch (product photos, YouTube videos, about page photos)
- Preview deploy does NOT need password protection — unlisted URL is sufficient
- Preview bar: just needs to look right visually; forms/map/analytics don't need to work
- Preview purpose: show client, collect real assets, iterate

### Claude's Discretion
- Accessibility audit depth (pragmatic judgment)
- Which responsive issues to fix vs leave
- Build optimization or performance tweaks if obvious wins exist
- Cross-browser testing scope

</decisions>

<specifics>
## Specific Ideas

- Preview URL will be shared with Town & Country client to collect real product photos, marketing video IDs, and store photos
- The site has existing graceful fallbacks: MapEmbed degrades without API key, GA4 conditionally renders, contact form shows but won't send without Resend key

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-responsive-polish-deployment*
*Context gathered: 2026-03-03*
