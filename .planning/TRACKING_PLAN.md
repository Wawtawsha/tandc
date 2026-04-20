# Analytics Tracking Plan

## Overview

**GA4 Property:** `NEXT_PUBLIC_GA_MEASUREMENT_ID` (environment variable)
**Library:** `@next/third-parties/google`
**Naming Convention:** `snake_case` for events and parameters
**Automatic Tracking:**
- Pageviews: Tracked automatically via `GoogleAnalytics` component
- Scroll depth: 90% threshold tracked via GA4 Enhanced Measurement
- YouTube video engagement: Tracked via GA4 Enhanced Measurement (requires `enablejsapi=1`)

---

## Custom Events

| Event Name | Parameters | Type | Fired When | Component | File |
|------------|-----------|------|------------|-----------|------|
| `phone_click` | `phone_number` (string), `click_location` (string: hero/contact_section/footer/nav_desktop/nav_mobile) | Custom | User clicks phone link | PhoneLink / Navigation | components/analytics/PhoneLink.tsx, components/Navigation.tsx |
| `directions_click` | `click_location` (string: hero/contact_section), `destination_address` (string) | Custom | User clicks Get Directions | DirectionsLink | components/analytics/DirectionsLink.tsx |
| `category_click` | `category_name` (string: Recliners/Sofas/Sectionals/Lift Chairs/Living Room/Bedroom), `click_location` (string: homepage_grid) | Custom | User clicks category card | CategoryLink | components/analytics/CategoryLink.tsx |
| `cta_click` | `cta_text` (string: "See In Store"), `click_location` (string: product_card) | Custom | User clicks See In Store button | CTALink | components/analytics/CTALink.tsx |
| `video_play` | `video_title` (string), `video_provider` (string: youtube), `video_id` (string), `video_location` (string: hero/video_showcase) | Custom | User clicks play on YouTube embed | HeroVideo | components/hero/HeroVideo.tsx |
| `form_submit` | `form_name` (string: contact), `form_location` (string: contact_section) | Custom | User submits contact form | ContactForm | components/contact/ContactForm.tsx |
| `form_submit_success` | `form_name` (string: contact), `form_location` (string: contact_section) | Custom | Server action returns success | ContactForm | components/contact/ContactForm.tsx |

---

## Automatic Events (GA4 Enhanced Measurement)

| Event | Source | Notes |
|-------|--------|-------|
| `page_view` | GoogleAnalytics component | Automatic on client-side navigation |
| `scroll` | GA4 Enhanced Measurement | Fires at 90% scroll depth threshold. No custom code needed -- GA4 tracks this automatically when Enhanced Measurement is enabled in the GA4 property settings. Scroll depth tracking satisfies the "scroll depth" success criteria for this phase. |
| `video_start` | GA4 Enhanced Measurement | Requires `enablejsapi=1` on YouTube embeds. Fires when video playback begins. |
| `video_progress` | GA4 Enhanced Measurement | Fires at 25%, 50%, 75% progress milestones. Supplements the custom `video_play` event with granular progress data. |
| `video_complete` | GA4 Enhanced Measurement | Fires when video reaches 100% completion. |

---

## Event Parameter Schema (JSON)

### phone_click

```json
{
  "event_name": "phone_click",
  "parameters": {
    "phone_number": "+14342238163",
    "click_location": "hero"
  },
  "timestamp": "2026-03-03T14:05:30.123Z",
  "page_url": "https://example.com/",
  "page_title": "Town & Country Furniture"
}
```

### directions_click

```json
{
  "event_name": "directions_click",
  "parameters": {
    "click_location": "hero",
    "destination_address": "2311 S Main St, Farmville, VA 23901"
  },
  "timestamp": "2026-03-03T14:05:30.123Z",
  "page_url": "https://example.com/",
  "page_title": "Town & Country Furniture"
}
```

### category_click

```json
{
  "event_name": "category_click",
  "parameters": {
    "category_name": "Recliners",
    "click_location": "homepage_grid"
  },
  "timestamp": "2026-03-03T14:05:30.123Z",
  "page_url": "https://example.com/",
  "page_title": "Town & Country Furniture"
}
```

### cta_click

```json
{
  "event_name": "cta_click",
  "parameters": {
    "cta_text": "See In Store",
    "click_location": "product_card"
  },
  "timestamp": "2026-03-03T14:05:30.123Z",
  "page_url": "https://example.com/#recliners",
  "page_title": "Town & Country Furniture"
}
```

### video_play

```json
{
  "event_name": "video_play",
  "parameters": {
    "video_title": "Ashley Furniture Showroom",
    "video_provider": "youtube",
    "video_id": "dQw4w9WgXcQ",
    "video_location": "hero"
  },
  "timestamp": "2026-03-03T14:05:30.123Z",
  "page_url": "https://example.com/",
  "page_title": "Town & Country Furniture"
}
```

### form_submit

```json
{
  "event_name": "form_submit",
  "parameters": {
    "form_name": "contact",
    "form_location": "contact_section"
  },
  "timestamp": "2026-03-03T14:05:30.123Z",
  "page_url": "https://example.com/",
  "page_title": "Town & Country Furniture"
}
```

### form_submit_success

```json
{
  "event_name": "form_submit_success",
  "parameters": {
    "form_name": "contact",
    "form_location": "contact_section"
  },
  "timestamp": "2026-03-03T14:05:30.123Z",
  "page_url": "https://example.com/",
  "page_title": "Town & Country Furniture"
}
```

---

## Click Location Values

All possible `click_location` values and where they appear in the UI:

| Value | Description |
|-------|-------------|
| `hero` | Hero section CTAs (top of homepage) |
| `contact_section` | Contact section at bottom of homepage |
| `footer` | Site footer (all pages) |
| `nav_desktop` | Desktop navigation bar |
| `nav_mobile` | Mobile navigation menu |
| `homepage_grid` | Category card grid on homepage |
| `video_showcase` | Video showcase section on homepage |
| `product_card` | Product card "See In Store" buttons (La-Z-Boy and Ashley sections) |

---

## Nessus Integration Points

### Data Access

**Option 1: GA4 Data API (Google Analytics Data API v1)**
- Endpoint: `https://analyticsdata.googleapis.com/v1beta/properties/{propertyId}:runReport`
- Authentication: OAuth2 service account with Analytics Viewer role
- Use case: Real-time reporting, custom dashboards

**Option 2: BigQuery Export (Recommended)**
- Export: Daily automated export from GA4 to BigQuery
- Schema: Standard GA4 event model (event_name + event_params)
- Use case: Full event-level data, complex analysis, data warehousing

### Event Format

All events follow the standard GA4 event model:
- `event_name`: String identifier (e.g., "phone_click")
- `event_params`: Key-value pairs (e.g., `{"phone_number": "+14342238163", "click_location": "hero"}`)
- Automatic parameters: `page_location`, `page_title`, `timestamp`, `user_id`, `session_id`

### Recommended Dimensions for Reporting

- `event_name`: Event type
- `page_location`: URL where event occurred
- `date`: Event date (YYYYMMDD format in BigQuery)
- Event parameters: Access via `event_params.key` and `event_params.value.string_value`

### Recommended Metrics

- `event_count`: Total number of events
- `total_users`: Unique users who triggered event
- `sessions`: Sessions containing event
- Conversion rate: `form_submit_success` / `form_submit`

### Authentication Setup

1. Create a Google Cloud service account
2. Grant "Analytics Viewer" role on the GA4 property
3. Download JSON key file
4. Use service account credentials for API requests

### Notes

- "Nessus" integration specifics should be clarified with the client
- This document provides the data contract that any downstream system can consume
- Event naming and parameter structure is stable and documented for long-term integration
- All timestamps are in ISO 8601 format (UTC)

---

## Implementation Notes

### Custom Event Tracking

- All custom events use `sendGAEvent` from `@next/third-parties/google`
- Server Components use Client Component wrappers (PhoneLink, DirectionsLink, CategoryLink, CTALink) for tracking
- Client Components (HeroVideo, ContactForm, Navigation) call `sendGAEvent` directly
- GA4 only loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (graceful no-op when unset)

### Tel: Link Tracking

- Tel: link tracking uses explicit custom `phone_click` events (not GA4 Enhanced Measurement)
- Reason: GA4 Enhanced Measurement for outbound link clicks has known reliability issues since November 2024
- Custom tracking provides guaranteed accuracy for high-value phone click conversions

### Scroll Depth Tracking

- Tracked automatically by GA4 Enhanced Measurement at 90% threshold
- No custom code required
- Ensure Enhanced Measurement is toggled ON in GA4 property settings (Admin > Data Streams > Enhanced Measurement)
- 90% threshold provides signal for users who consume full page content

### YouTube Video Tracking

- **Custom event (`video_play`)**: Fires when user clicks play (iframe injection)
- **Enhanced Measurement events**: Provide granular engagement data
  - `video_start`: Playback begins
  - `video_progress`: 25%, 50%, 75% milestones
  - `video_complete`: 100% completion
- Requires `enablejsapi=1` parameter in YouTube embed URL for Enhanced Measurement to work
- Custom event supplements Enhanced Measurement with context (`video_location`, `video_title`)

### Form Conversion Funnel

- `form_submit`: Tracks submission attempts (fires on form `onSubmit`)
- `form_submit_success`: Tracks successful submissions (fires in `useEffect` when `state.success === true`)
- Funnel analysis: `form_submit_success` / `form_submit` = success rate
- Identifies validation errors or server-side failures impacting conversions

### Environment Configuration

```bash
# Required for GA4 tracking
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional (for development/testing)
NEXT_PUBLIC_GA_DEBUG=true
```

When `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not set:
- `sendGAEvent` is a no-op (fails gracefully)
- No GA4 script is loaded
- No network requests to Google Analytics

---

## Testing & Validation

### Development Testing

1. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`
2. Open browser DevTools > Network tab
3. Filter by "google-analytics.com" or "analytics.google.com"
4. Trigger events (click phone, submit form, play video)
5. Verify POST requests to GA4 with event payloads

### GA4 DebugView

1. Enable debug mode: `NEXT_PUBLIC_GA_DEBUG=true`
2. Open GA4 property > Configure > DebugView
3. Trigger events on the site
4. View real-time event stream with parameter details

### Event Validation Checklist

- [ ] All custom events appear in DebugView with correct parameters
- [ ] `scroll` event fires at 90% scroll depth
- [ ] `video_start`, `video_progress`, `video_complete` fire for YouTube embeds
- [ ] `form_submit` fires on form submission attempt
- [ ] `form_submit_success` fires only after server action succeeds
- [ ] `phone_click` includes correct `click_location` for all instances
- [ ] Event parameter data types match schema (strings for all custom params)

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-03-03 | 1.0 | Initial tracking plan for Phase 07 GA4 implementation |
