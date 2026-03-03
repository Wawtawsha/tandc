---
phase: 08-responsive-polish-deployment
plan: 03
subsystem: infra
tags: [vercel, deployment, next.js, build, env-vars]

# Dependency graph
requires:
  - phase: 08-01
    provides: Mobile-responsive layout tested and verified
  - phase: 08-02
    provides: WCAG AA accessibility features implemented
provides:
  - Production build verified with zero errors
  - Environment variable documentation (.env.example)
  - Live Vercel preview deployment at tandc-six.vercel.app
  - Graceful fallbacks confirmed for GA4, Maps, and Resend
affects: [08-04-performance-optimization, future-deployment]

# Tech tracking
tech-stack:
  added: [vercel-cli]
  patterns: [vercel-deployment, env-documentation, graceful-fallbacks]

key-files:
  created: []
  modified: [.env.example]

key-decisions:
  - "Document env vars with empty values (not placeholder secrets)"
  - "Deploy without env vars to verify graceful fallbacks work in production"
  - "Use Vercel auto-detected settings (Next.js framework, default build)"

patterns-established:
  - "Pattern 1: .env.example uses empty values with detailed comments for where to obtain keys"
  - "Pattern 2: Deploy preview first to verify build before configuring env vars"
  - "Pattern 3: Custom subdomain configured via Vercel Dashboard (not CLI)"

# Metrics
duration: 3min 31sec
completed: 2026-03-03
---

# Phase 8 Plan 3: Production Build & Deployment Summary

**Next.js production build verified, deployed to Vercel at tandc-six.vercel.app with graceful fallbacks for all environment variables**

## Performance

- **Duration:** 3min 31sec
- **Started:** 2026-03-03T15:40:21Z
- **Completed:** 2026-03-03T15:43:52Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Production build completes with zero errors (8 static pages generated)
- Live deployment to Vercel preview URL: https://tandc-six.vercel.app
- Environment variable documentation with detailed instructions
- Verified graceful fallbacks work in production (GA4, Maps, Resend)

## Task Commits

Each task was committed atomically:

1. **Task 1: Verify production build and create env documentation** - `b13d927` (docs)

**No commit for Task 2:** Vercel deployment succeeded but no code changes (only .vercel/ folder which is gitignored)

## Files Created/Modified
- `.env.example` - Documented all 3 environment variables with detailed comments, source URLs, and optional/required status

## Decisions Made

**1. Empty env var values instead of placeholders**
- Rationale: Prevents accidental commits of placeholder values that look real but are invalid
- Pattern: `NEXT_PUBLIC_GA_MEASUREMENT_ID=` (not `G-XXXXXXXXXX`)

**2. Deploy without environment variables**
- Rationale: Verifies graceful fallbacks work in production before client configures real keys
- Result: Site loads successfully, tracking disabled, map shows fallback, form shows error message as designed

**3. Vercel auto-configuration**
- Rationale: Auto-detected Next.js settings are correct, no custom overrides needed
- Build command: `next build` (default)
- Output directory: `.next` (default)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

**Issue: No GitHub remote configured**
- Status: Documented in completion message for user action
- Blocker: Cannot push to GitHub until user creates repo and adds remote
- Impact: Does not block Vercel deployment (Vercel uploads files directly)

## User Setup Required

### GitHub Remote (Not Blocking)
The repository has no GitHub remote configured. To push code:
```bash
# User needs to create GitHub repo under Wawtawsha org, then:
git remote add origin https://github.com/Wawtawsha/tandc.git
git push -u origin master
```

### Vercel Custom Subdomain (Optional)
Current production URL: https://tandc-six.vercel.app

To configure custom subdomain:
1. Go to Vercel Dashboard -> Project Settings -> Domains
2. Add domain: `townandcountry.vercel.app`
3. If taken, try: `townandcountry-furniture.vercel.app` or `town-and-country.vercel.app`

### Environment Variables (For Full Functionality)
See `.env.example` for detailed instructions on:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 tracking
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Interactive map embed
- `RESEND_API_KEY` - Contact form email delivery

All are optional for preview. Site has graceful fallbacks.

## Deployment Details

**Vercel Project:** `shrike-medias-projects/tandc`
**Production URL:** https://tandc-six.vercel.app
**Deployment URL:** https://tandc-595yzwesy-shrike-medias-projects.vercel.app

**Build Output:**
- 8 static pages generated (/, /about, /robots.txt, /sitemap.xml, Open Graph images)
- Build time: 31 seconds
- All pages verified with HTTP 200 status

**Verified Graceful Fallbacks:**
- Homepage loads without GA4 tracking script (no NEXT_PUBLIC_GA_MEASUREMENT_ID)
- Map section shows address text with "View on Google Maps" link (no NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
- Contact form displays but will show error on submit (no RESEND_API_KEY) - expected behavior

## Next Phase Readiness

**Ready for Phase 08-04 (Performance Optimization):**
- Production build is stable and deployable
- Live preview URL available for testing
- No blocking issues

**Pending Items:**
- GitHub remote setup (not blocking - user action)
- Custom subdomain configuration (optional - user preference)
- Environment variables (optional for preview - client will provide when ready)

---
*Phase: 08-responsive-polish-deployment*
*Completed: 2026-03-03*
