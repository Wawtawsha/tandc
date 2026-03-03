---
phase: 06-contact-conversion
plan: 02
subsystem: ui
tags: [contact-form, zod, resend, server-actions, validation, email]

# Dependency graph
requires:
  - phase: 06-01
    provides: ContactSection with map/info left column and form placeholder right column
provides:
  - ContactForm with name, email, phone (optional), message fields
  - Zod validation schema (contactSchema) with field-level error messages
  - Server Action (submitContactForm) with Resend email delivery
  - SubmitButton with useFormStatus pending state
  - Form reset after successful submission
affects: [07-seo-analytics, 06-03-conversion-optimization]

# Tech tracking
tech-stack:
  added: [zod, resend]
  patterns: [Server Actions with useActionState, useFormStatus for pending state, Zod validation]

key-files:
  created:
    - lib/validations/contact.ts
    - app/actions/contact.ts
    - components/contact/ContactForm.tsx
    - components/contact/SubmitButton.tsx
  modified:
    - components/contact/ContactSection.tsx
    - package.json

key-decisions:
  - "Zod for validation with field-level error messages"
  - "Resend for email delivery (onboarding@resend.dev sender until custom domain in Phase 7)"
  - "useActionState for server action integration (React 19)"
  - "Phone field optional with no format validation (keep simple)"
  - "Form resets after success via useEffect watching state.success"

patterns-established:
  - "Pattern: Server Actions ('use server') keep API keys server-side"
  - "Pattern: useFormStatus in child component for submit button pending state"
  - "Pattern: Accessible forms with aria-invalid, aria-describedby, role=alert"
  - "Pattern: Inline SVG for success checkmark (minimal bundle)"

# Metrics
duration: 3min 30sec
completed: 2026-03-03
---

# Phase 6 Plan 2: Contact Form with Validation & Email Summary

**Contact form with Zod validation, Server Action email delivery via Resend, and useActionState/useFormStatus React 19 patterns**

## Performance

- **Duration:** 3min 30sec
- **Started:** 2026-03-03T12:46:36Z
- **Completed:** 2026-03-03T12:50:42Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Four-field contact form (name, email, phone optional, message) with HTML5 and Zod validation
- Field-level error messages from Zod schema violations
- Server Action sends email via Resend with error handling
- Submit button shows "Sending..." pending state during submission
- Success message with checkmark icon, form resets after submission
- No client-side API key exposure (Server Action pattern)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install deps, create Zod schema and Server Action** - `4fe485e` (chore)
2. **Task 2: Create ContactForm and SubmitButton, update ContactSection** - `9ceb644` (feat)

## Files Created/Modified
- `lib/validations/contact.ts` - Zod schema (contactSchema) with min-length validation, ActionState type
- `app/actions/contact.ts` - Server Action with Zod validation and Resend email delivery
- `components/contact/ContactForm.tsx` - Client Component using useActionState, form reset on success
- `components/contact/SubmitButton.tsx` - Client Component using useFormStatus for pending state
- `components/contact/ContactSection.tsx` - Updated to render ContactForm in right column
- `package.json` - Added zod and resend dependencies

## Decisions Made

**1. Zod for validation with field-level errors**
- Rationale: Type-safe validation, automatic field-level error extraction via `flatten().fieldErrors`
- Implementation: contactSchema validates all fields, returns structured errors to form
- Impact: Clear user feedback on which field failed and why

**2. Resend for email delivery**
- Rationale: Simple API, free tier sufficient for contact form, modern developer experience
- Sender: `onboarding@resend.dev` (Resend default for dev) -- will use custom domain in Phase 7
- Error handling: Falls back to "Call us" message if email fails
- Impact: Immediate email notification to store, no additional infrastructure

**3. React 19 Server Actions pattern**
- Rationale: useActionState (not deprecated useFormState), useFormStatus for pending
- Server Action: 'use server' directive keeps RESEND_API_KEY server-side only
- Progressive enhancement: Form works without JS (though needs JS for inline errors)
- Impact: Modern pattern, secure API key handling

**4. Phone field optional with no format validation**
- Rationale: Keep simple, avoid false positives from strict regex
- Validation: Optional via `z.string().optional()` -- accepts any string if provided
- Impact: Lower friction for visitors, store can follow up via email if phone missing

**5. Form reset after success**
- Rationale: Clear form for repeat submissions, visual confirmation of success
- Implementation: useEffect watches `state.success`, calls `formRef.current?.reset()`
- Impact: Good UX, prevents accidental duplicate submissions

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - both tasks completed without errors or blockers. Build passed on first attempt.

## User Setup Required

**Environment variables required:**
- `RESEND_API_KEY` - Resend API key for email delivery
  - Get from: https://resend.com/api-keys (create free account)
  - Add to `.env.local`: `RESEND_API_KEY=re_...`
  - Test: Submit contact form, check store email inbox

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps Embed API key (from Phase 6.1)
  - Get from: https://console.cloud.google.com/apis/credentials
  - Add to `.env.local`: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...`
  - Test: Visit homepage, verify map embed renders

- `STORE_EMAIL` (optional) - Email address for contact form submissions
  - Default: `info@townandcountryfurniture.com`
  - Add to `.env.local` to override: `STORE_EMAIL=custom@example.com`

**Manual testing checklist:**
1. Submit empty form → HTML5 validation prevents submission (required fields)
2. Submit invalid email → Zod validation shows "Please enter a valid email address"
3. Submit message < 10 chars → Zod validation shows "Message must be at least 10 characters"
4. Submit valid form → See "Sending..." → See success message → Form resets
5. Check store email inbox for contact form submission

## Next Phase Readiness

**Ready for Plan 03 (Conversion Optimization):**
- Contact form captures name, email, phone, message
- Email forwarding working via Resend
- Success/error feedback in place
- Plan 03 can add conversion tracking, analytics, or A/B testing

**Ready for Phase 7 (SEO & Analytics):**
- Contact form ready for analytics events (form start, submit, success)
- Email delivery ready for conversion funnel tracking
- Custom Resend domain can be added for professional sender address

**No blockers.**

---
*Phase: 06-contact-conversion*
*Completed: 2026-03-03*
