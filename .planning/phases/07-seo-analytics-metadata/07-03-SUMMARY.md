---
phase: 07
plan: 03
subsystem: analytics-tracking
tags: [ga4, event-tracking, video-analytics, form-conversion, youtube]
requires: [07-01]
provides:
  - Video play tracking with location context
  - Form conversion funnel tracking
  - Comprehensive analytics documentation
affects: []
tech-stack:
  added: []
  patterns: [event-tracking, conversion-funnel]
key-files:
  created:
    - docs/TRACKING_PLAN.md
  modified:
    - components/hero/HeroVideo.tsx
    - components/products/VideoShowcase.tsx
    - components/contact/ContactForm.tsx
decisions:
  - HeroVideo location prop is required (no default) to enforce explicit location tracking
  - Video play event fires on iframe injection (onIframeAdded) for reliable play detection
  - Form conversion funnel uses two events (attempt + success) for funnel analysis
  - TRACKING_PLAN.md provides data contract for downstream analytics integration (Nessus)
metrics:
  duration: 6min 50sec
  completed: 2026-03-03
---

# Phase [7] Plan [3]: GA4 Video & Form Tracking Summary

**One-liner:** Video play tracking with location context, form conversion funnel events, and comprehensive analytics documentation for Nessus integration

## What Was Built

### Video Play Tracking
- Added required `location` prop to HeroVideo component (no default value)
- Integrated sendGAEvent with video_play event firing on onIframeAdded callback
- Event parameters: video_title, video_provider (youtube), video_id, video_location
- Added enablejsapi=1 to YouTube embed params for GA4 Enhanced Measurement video engagement tracking
- VideoShowcase passes location="video_showcase" to all HeroVideo instances
- HeroSection passes location="hero" (implemented by parallel plan 07-02)

### Form Conversion Tracking
- Added form_submit event on form onSubmit (tracks submission attempts)
- Added form_submit_success event in useEffect when state.success becomes true
- Two-event pattern enables conversion funnel analysis (success rate = success/attempt)
- Both events include form_name ("contact") and form_location ("contact_section") parameters

### Analytics Documentation
- Created comprehensive TRACKING_PLAN.md with 7 custom events + 3 automatic events
- Documented all event parameters with JSON schemas and data types
- Included click_location taxonomy for all 8 UI locations
- Provided Nessus integration guidance (GA4 Data API, BigQuery export)
- Documented scroll depth tracking via GA4 Enhanced Measurement (90% threshold, no custom code)
- Added testing/validation checklist and environment configuration

## Architecture Decisions

### Location Prop Design
**Decision:** Make location prop required (no default value)
**Rationale:** Forces callers to explicitly specify video context, preventing silent miscategorization
**Impact:** TypeScript compilation error if location not provided, ensuring data quality

### Video Play Event Timing
**Decision:** Fire video_play on onIframeAdded callback (not onPlay or similar)
**Rationale:** react-lite-youtube-embed injects iframe when user clicks play thumbnail, making onIframeAdded the most reliable play detection point
**Trade-off:** Fires slightly before actual playback starts, but guarantees capture vs. YouTube Player API callbacks

### Form Conversion Funnel
**Decision:** Two separate events (form_submit + form_submit_success) instead of single event with status parameter
**Rationale:** Enables standard GA4 funnel analysis without custom dimensions/filters
**Benefit:** Can calculate success rate directly: form_submit_success / form_submit

### Documentation Scope
**Decision:** Include full Nessus integration guidance in TRACKING_PLAN.md
**Rationale:** Creates stable data contract for downstream BI systems, reduces integration friction
**Content:** API endpoints, authentication setup, BigQuery schema, recommended dimensions/metrics

## Technical Implementation

### HeroVideo Changes
```typescript
interface HeroVideoProps {
  videoId: string;
  title?: string;
  location: string;  // NEW: required prop
}

<LiteYouTubeEmbed
  params="controls=1&modestbranding=1&rel=0&enablejsapi=1"  // Added enablejsapi=1
  onIframeAdded={() => {
    sendGAEvent('event', 'video_play', {
      video_title: title,
      video_provider: 'youtube',
      video_id: videoId,
      video_location: location,  // Uses required prop
    });
  }}
/>
```

### ContactForm Changes
```typescript
// Track submission attempt
<form
  onSubmit={() => {
    sendGAEvent('event', 'form_submit', {
      form_name: 'contact',
      form_location: 'contact_section',
    });
  }}
>

// Track successful submission
useEffect(() => {
  if (state.success) {
    formRef.current?.reset();
    sendGAEvent('event', 'form_submit_success', {
      form_name: 'contact',
      form_location: 'contact_section',
    });
  }
}, [state.success]);
```

## Testing & Validation

### Build Verification
- ✅ `npm run build` passes with no TypeScript errors
- ✅ All sendGAEvent imports present
- ✅ enablejsapi=1 parameter added to YouTube embeds
- ✅ location prop required in HeroVideoProps interface

### Code Verification
- ✅ HeroVideo: sendGAEvent, enablejsapi, video_location, location prop all present
- ✅ VideoShowcase: location="video_showcase" passed to HeroVideo
- ✅ ContactForm: form_submit and form_submit_success events both present
- ✅ TRACKING_PLAN.md: All 7 custom events + 3 automatic events documented

### Documentation Completeness
- ✅ Event parameter schemas (JSON format)
- ✅ Click location taxonomy (8 locations)
- ✅ Scroll depth coverage (GA4 Enhanced Measurement, 90% threshold)
- ✅ Nessus integration points (API, BigQuery, authentication)
- ✅ Testing/validation checklist

## Deviations from Plan

### Auto-fixed Issues

**1. [Parallel Plan Coordination] TRACKING_PLAN.md created by 07-02**
- **Found during:** Task 2
- **Issue:** Plan 07-02 (running in parallel) already created identical TRACKING_PLAN.md in commit 6841872
- **Resolution:** Verified both versions are identical (0 byte diff), accepted 07-02's committed version
- **Files affected:** docs/TRACKING_PLAN.md
- **Outcome:** No additional commit needed for Task 2, documentation complete

## Files Changed

### Created
- `docs/TRACKING_PLAN.md` (created by plan 07-02, validated by 07-03)

### Modified
- `components/hero/HeroVideo.tsx`: Added location prop, sendGAEvent, enablejsapi=1
- `components/products/VideoShowcase.tsx`: Pass location="video_showcase"
- `components/contact/ContactForm.tsx`: Added form_submit and form_submit_success events

## Decisions Made

1. **HeroVideo location prop is required (no default)** - Enforces explicit location tracking, prevents miscategorization
2. **Video play event on onIframeAdded** - Most reliable play detection point with react-lite-youtube-embed
3. **Two-event form funnel** - form_submit (attempt) + form_submit_success enables funnel analysis
4. **Comprehensive TRACKING_PLAN.md** - Documents all events, parameters, and Nessus integration for stable data contract

## Next Phase Readiness

### Ready
- ✅ All video play events tracked with location context
- ✅ Form conversion funnel complete (attempt + success)
- ✅ Analytics documentation complete for Nessus integration
- ✅ Scroll depth covered by GA4 Enhanced Measurement (automatic)

### Blockers
None

### Recommended Next Steps
1. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in production environment
2. Validate events in GA4 DebugView after deployment
3. Verify scroll event fires at 90% in GA4 Enhanced Measurement
4. Share TRACKING_PLAN.md with Nessus integration team

## Phase 7 Integration

This plan completes the Client Component event tracking layer (video plays, form submissions). Combined with plan 07-01 (metadata foundation) and plan 07-02 (link tracking wrappers), Phase 7 delivers:

- Comprehensive SEO metadata (Open Graph, JSON-LD, sitemap, robots.txt)
- GA4 tracking for all interactive elements (phones, directions, categories, CTAs, videos, forms)
- Complete analytics documentation for downstream integration
- Automatic scroll depth and video engagement tracking

The tracking infrastructure is now production-ready, pending only the NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable.
