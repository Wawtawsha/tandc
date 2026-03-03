# Phase 6: Contact & Conversion - Research

**Researched:** 2026-03-03
**Domain:** Next.js contact forms, Google Maps embedding, email forwarding services, anchor navigation
**Confidence:** HIGH

## Summary

Phase 6 implements conversion endpoints for a local furniture store: Google Maps location, contact form with email forwarding, and directional navigation. This phase resolves the `#contact` anchor that Phase 4 product CTAs already reference. The primary technical decisions are:

1. **Google Maps iframe embed (not JavaScript API)**: For a static location display with directions link, the Maps Embed API is free, unlimited, and requires only an API key. The JavaScript API would be overkill for "show store location + directions button" use case. Iframe loads lazily, works without client-side JS, and handles responsive sizing naturally.

2. **Next.js Server Actions for form handling**: React 19 + Next.js 16 stabilized Server Actions with `useActionState` hook for managing form state, validation, pending states, and error display. This is the current standard pattern (documented Feb 27, 2026). No API routes needed—forms post directly to server functions with progressive enhancement.

3. **Resend for email forwarding**: Vercel-native integration, 3,000 emails/month free tier, 2 requests/second rate limit. Alternative: Web3Forms (free, serverless, no storage) or Nodemailer with Gmail SMTP (DIY but more configuration). Resend wins on developer experience and Vercel deployment simplicity.

4. **Zod for server-side validation**: Industry standard for TypeScript schema validation with Server Actions. Provides `.safeParse()` for error handling without try/catch, `.flatten().fieldErrors` for field-specific error messages, and compile-time + runtime safety.

5. **Anchor navigation already configured**: `globals.css` sets `scroll-padding-top: 5rem` to prevent sticky nav from obscuring anchor targets. `<a href="#contact">` links work with native smooth scroll via CSS `scroll-behavior: smooth` (respects prefers-reduced-motion). No JavaScript needed.

**Primary recommendation:** Build contact section with Google Maps iframe embed (place mode with store address), implement contact form as Client Component using `useActionState` + Server Action with Zod validation, use Resend to forward submissions to store email, and wire up "Get Directions" button to Google Maps directions URL format.

## Standard Stack

The established libraries/tools for contact forms and maps in Next.js 16:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React useActionState | 19.2.3 | Form state management | Built into React 19, replaces deprecated useFormState, handles pending/error states automatically |
| Next.js Server Actions | 16.1.6 | Server-side form processing | Native Next.js feature, no API routes needed, automatic FormData handling |
| zod | ^3.x | Schema validation | TypeScript-first validation, excellent error messages, `.safeParse()` for graceful errors |
| Resend | ^5.x | Email delivery API | Vercel-native integration, 3k emails/month free, React Email support, reliable deliverability |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-dom/useFormStatus | 19.2.3 | Pending state in child components | When submit button is separate component from form (loading spinners) |
| Google Maps Embed API | N/A (iframe) | Map embed | Free, unlimited, no client JS needed for static location display |
| Web3Forms | N/A (service) | Alternative email forwarding | Zero-config, no API key, serverless, use if avoiding third-party accounts |
| Nodemailer | ^6.x | Direct SMTP sending | DIY email sending via Gmail SMTP, use only if avoiding all third-party email services |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Resend | SendGrid | SendGrid requires more config, UI heavier, similar pricing, less Vercel-optimized |
| Resend | Web3Forms | Web3Forms is free but no delivery tracking, no retry logic, emails may have deliverability issues |
| Resend | Nodemailer + Gmail SMTP | DIY approach, must handle retries/bounces, Gmail has sending limits (500/day), more code |
| Zod | Yup | Yup is older, Zod has better TypeScript integration and more concise syntax |
| Server Actions | API Route (/api/contact) | API routes require separate endpoint, manual FormData parsing, more boilerplate |
| Maps Embed (iframe) | Maps JavaScript API | JS API costs $7 per 1000 loads after free tier, requires more code, overkill for static location |
| Maps iframe | Mapbox/Leaflet | Third-party dependencies, additional API keys, Google Maps more familiar to users |

**Installation:**
```bash
npm install zod resend
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── (main)/
│   └── page.tsx                # Homepage (add contact section)
├── actions/
│   └── contact.ts              # Server Action for form submission
components/
├── contact/
│   ├── ContactSection.tsx      # Section wrapper with id="contact"
│   ├── MapEmbed.tsx            # Google Maps iframe embed (Server Component)
│   ├── ContactForm.tsx         # Form with useActionState (Client Component)
│   └── SubmitButton.tsx        # Button with useFormStatus (Client Component)
lib/
└── validations/
    └── contact.ts              # Zod schema for contact form
```

### Pattern 1: Google Maps Iframe Embed
**What:** Static map display using Maps Embed API with place mode
**When to use:** Showing store location, not interactive map features
**Example:**
```typescript
// components/contact/MapEmbed.tsx
// Source: Google Maps Embed API docs - https://developers.google.com/maps/documentation/embed/embedding-map
// Server Component - no 'use client' needed
export function MapEmbed() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const address = '5301+Farmville+Rd,Farmville,VA+23901';

  return (
    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${address}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Town & Country Furniture location at 5301 Farmville Rd, Farmville, VA"
      />
    </div>
  );
}
```

### Pattern 2: Contact Form with useActionState
**What:** Client Component form using React 19 `useActionState` hook
**When to use:** All contact forms in Next.js 16 with Server Actions
**Example:**
```typescript
// components/contact/ContactForm.tsx
// Source: Next.js 16.1.6 Forms Guide - https://nextjs.org/docs/app/guides/forms
'use client';

import { useActionState } from 'react';
import { submitContactForm } from '@/app/actions/contact';
import { SubmitButton } from './SubmitButton';

const initialState = {
  message: '',
  errors: {},
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-accent"
          aria-describedby={state.errors?.name ? "name-error" : undefined}
        />
        {state.errors?.name && (
          <p id="name-error" className="text-red-600 text-sm mt-1" aria-live="polite">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-accent"
          aria-describedby={state.errors?.email ? "email-error" : undefined}
        />
        {state.errors?.email && (
          <p id="email-error" className="text-red-600 text-sm mt-1" aria-live="polite">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Phone field (optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Message field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-accent"
          aria-describedby={state.errors?.message ? "message-error" : undefined}
        />
        {state.errors?.message && (
          <p id="message-error" className="text-red-600 text-sm mt-1" aria-live="polite">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {/* Success/Error message */}
      {state.message && (
        <p
          className={`text-sm ${state.errors ? 'text-red-600' : 'text-green-600'}`}
          aria-live="polite"
        >
          {state.message}
        </p>
      )}

      {/* Submit button - separate component for useFormStatus */}
      <SubmitButton />
    </form>
  );
}
```

### Pattern 3: Server Action with Zod Validation
**What:** Server function that validates form data and sends email
**When to use:** All Server Actions that process form submissions
**Example:**
```typescript
// app/actions/contact.ts
// Source: Next.js Forms Guide + Zod docs
'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  // Extract form data
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  };

  // Validate with Zod
  const validatedFields = contactSchema.safeParse(rawData);

  // Return early if validation fails
  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Send email via Resend
  try {
    const { data, error } = await resend.emails.send({
      from: 'Town & Country Website <noreply@yourdomain.com>',
      to: ['info@townandcountryfurniture.com'], // Store email
      replyTo: validatedFields.data.email,
      subject: `Contact Form: ${validatedFields.data.name}`,
      text: `
Name: ${validatedFields.data.name}
Email: ${validatedFields.data.email}
Phone: ${validatedFields.data.phone || 'Not provided'}

Message:
${validatedFields.data.message}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        message: 'Failed to send message. Please call us at (434) 223-8163.',
        errors: {},
      };
    }

    return {
      message: 'Thank you! We\'ll get back to you within 24 hours.',
      errors: {},
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      message: 'An error occurred. Please try again or call us at (434) 223-8163.',
      errors: {},
    };
  }
}
```

### Pattern 4: Submit Button with useFormStatus
**What:** Separate button component showing loading state
**When to use:** When submit button needs to show pending state
**Example:**
```typescript
// components/contact/SubmitButton.tsx
// Source: Next.js Forms Guide - pending states
'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-6 py-3 bg-accent text-white font-medium rounded hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
}
```

### Pattern 5: Get Directions Button
**What:** Link that opens Google Maps with directions to store
**When to use:** All "Get Directions" CTAs across site
**Example:**
```typescript
// Source: Google Maps URLs documentation
// Component or inline in ContactSection
export function DirectionsButton() {
  const storeAddress = '5301 Farmville Rd, Farmville, VA 23901';
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(storeAddress)}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-medium rounded hover:bg-accent-hover transition-colors"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
      Get Directions
    </a>
  );
}
```

### Pattern 6: Contact Section with Anchor ID
**What:** Full contact section with id="contact" for anchor navigation
**When to use:** Homepage and/or dedicated contact page
**Example:**
```typescript
// components/contact/ContactSection.tsx
// Server Component wrapping Client Component form
import { MapEmbed } from './MapEmbed';
import { ContactForm } from './ContactForm';
import { DirectionsButton } from './DirectionsButton';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-16 bg-surface"
      aria-label="Contact and location"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2
            className="text-4xl font-bold mb-4 text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Visit Our Showroom
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Located in Farmville, Virginia. Stop by to see our full La-Z-Boy and Ashley collections in person.
          </p>
        </div>

        {/* Two-column layout: Map + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map and Directions */}
          <div className="space-y-6">
            <MapEmbed />

            {/* Store Info */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <address className="not-italic text-muted">
                  5301 Farmville Rd<br />
                  Farmville, VA 23901
                </address>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Hours</h3>
                <ul className="text-muted space-y-1">
                  <li>Monday - Friday: 9:00 AM - 5:30 PM</li>
                  <li>Saturday: 9:00 AM - 5:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <a
                  href="tel:+14342238163"
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  (434) 223-8163
                </a>
              </div>

              <DirectionsButton />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Anti-Patterns to Avoid
- **Google Maps JavaScript API for static display**: Costs money after free tier, requires client JS, complex initialization. Use iframe embed for static location.
- **API routes instead of Server Actions**: Server Actions are simpler, type-safe, and progressively enhanced. API routes add unnecessary boilerplate.
- **Client-side only validation**: Forms must validate on server to prevent bypassing. Use Zod on server, HTML validation (`required`, `type="email"`) on client for UX.
- **Storing form submissions in database**: For simple contact form forwarding, email is sufficient. Database adds complexity without value unless building CRM.
- **Missing `referrerPolicy` on Maps iframe**: Without `referrerPolicy="no-referrer-when-downgrade"`, API key restrictions may fail. Always include this attribute.
- **Not using `useFormStatus`**: Putting loading state logic directly in form component works but couples concerns. Separate SubmitButton component is cleaner.
- **Missing `aria-live` on error messages**: Screen readers won't announce dynamically injected errors. Use `aria-live="polite"` and `aria-describedby` for field associations.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form state management | useState + onChange handlers | useActionState | Built into React 19, handles pending/error states, progressive enhancement, works without JS |
| Email delivery | Raw SMTP with net.createConnection | Resend or similar service | Deliverability is hard (SPF, DKIM, DMARC), retries, bounce handling, reputation management |
| Form validation | Manual regex + error messages | Zod schema validation | Type-safe, great error messages, `.flatten().fieldErrors` for field-level errors |
| Google Maps display | Canvas + Mapbox/Leaflet | Google Maps Embed API | Free, unlimited, users trust Google Maps, familiar navigation UI |
| Directions URL | Custom route calculation | Google Maps directions URL | Universal format, works on all devices, opens in Maps app on mobile |
| Anchor scroll handling | scrollIntoView + offset calculation | CSS scroll-padding-top | Native, respects reduced-motion, no JS needed |

**Key insight:** Email deliverability is complex. Resend/SendGrid handle SPF records, DKIM signing, IP reputation, retry logic, bounce classification, spam complaint handling, and throttling. Building this yourself means learning SMTP protocol, managing mail server reputation, handling Gmail/Outlook-specific quirks, and debugging why emails land in spam. Use a service.

## Common Pitfalls

### Pitfall 1: Missing API Key Restrictions on Google Maps
**What goes wrong:** Maps API key gets scraped and used on other sites, racking up charges
**Why it happens:** Default API keys have no domain restrictions
**How to avoid:** In Google Cloud Console, restrict API key to specific domains (e.g., `townandcountryfurniture.com`, `localhost` for dev). Add `referrerPolicy="no-referrer-when-downgrade"` to iframe.
**Warning signs:**
- Unexpected Google Cloud billing charges
- API key shows usage from unknown domains
- Map embed works in dev but fails in production due to referrer policy

### Pitfall 2: Server Action Not Marked 'use server'
**What goes wrong:** Function executes on client, crashes trying to access server-only APIs
**Why it happens:** Forgetting `'use server'` directive at top of action file
**How to avoid:** Every Server Action file must start with `'use server'` directive. Next.js will error if missing.
**Warning signs:**
- Error: "process is not defined" in browser console
- Resend API key exposed in browser Network tab
- Form submission does nothing or throws client-side error

### Pitfall 3: Validation Errors Not Displayed to User
**What goes wrong:** Form shows "failed" but doesn't explain which fields are invalid
**Why it happens:** Not rendering `state.errors` from `useActionState` per field
**How to avoid:** Check `state.errors?.fieldname` for each field, display error message below input with `aria-live="polite"`
**Warning signs:**
- Users re-submit form repeatedly without understanding problem
- Accessibility audit flags errors not associated with fields
- No visual indication of which fields are invalid

### Pitfall 4: Email Sending Fails Silently
**What goes wrong:** Form says "sent successfully" but email never arrives
**Why it happens:** Resend API key incorrect, `from` address not verified, error swallowed
**How to avoid:** Check `error` returned from `resend.emails.send()`, log errors to console, verify domain in Resend dashboard
**Warning signs:**
- Users complain they never heard back after form submission
- No emails arrive in store inbox
- Console shows Resend API errors (401 Unauthorized, 403 Forbidden)

### Pitfall 5: Missing Environment Variables in Production
**What goes wrong:** Contact form works in dev but crashes in production deployment
**Why it happens:** `.env.local` not committed to git, forgot to add env vars in Vercel dashboard
**How to avoid:** Add `RESEND_API_KEY` and `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in Vercel project settings before deploying
**Warning signs:**
- Build succeeds but form submission throws 500 error
- Maps embed shows "Error loading map"
- Console error: "API key is undefined"

### Pitfall 6: Form Doesn't Reset After Submission
**What goes wrong:** User successfully submits form but fields still contain data
**Why it happens:** Server Actions don't automatically reset forms, need manual `formRef.current.reset()` or redirect
**How to avoid:** Add form reset logic in success state, or use `redirect()` to navigate to thank-you page
**Warning signs:**
- Users accidentally double-submit form with same data
- Form shows success message but fields still populated
- UX feels incomplete (no clear "form submitted" state)

### Pitfall 7: Anchor Link Obscured by Sticky Header
**What goes wrong:** Clicking `#contact` link scrolls to section but header covers first heading
**Why it happens:** Sticky nav overlaps anchor target without offset
**How to avoid:** Set `scroll-padding-top: 5rem` in `globals.css` (already done in Phase 1)
**Warning signs:**
- Users click "See In Store" but section header is hidden under nav
- Need to manually scroll down after anchor navigation
- Accessibility issue: heading not visible after navigation

## Code Examples

Verified patterns from official sources:

### Resend Email Sending with Error Handling
```typescript
// Source: Resend Next.js documentation - https://resend.com/docs/send-with-vercel-functions
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: 'Town & Country <noreply@yourdomain.com>',
  to: ['store@example.com'],
  replyTo: userEmail,
  subject: 'Contact Form Submission',
  text: messageBody,
});

if (error) {
  console.error('Resend error:', error);
  // Return user-friendly error message
  return { message: 'Failed to send. Please call us instead.', errors: {} };
}

// Success
return { message: 'Message sent successfully!', errors: {} };
```

### Zod Schema with Custom Error Messages
```typescript
// Source: Zod documentation - https://zod.dev
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Validate
const result = contactSchema.safeParse(formData);

if (!result.success) {
  // Extract field-level errors
  const fieldErrors = result.error.flatten().fieldErrors;
  // fieldErrors = { name: ["Name must be at least 2 characters"], email: [...] }
  return { errors: fieldErrors };
}

// Use validated data
const validData = result.data;
```

### useActionState with TypeScript Types
```typescript
// Source: Next.js Forms Guide - https://nextjs.org/docs/app/guides/forms
'use client';

import { useActionState } from 'react';
import type { ActionState } from '@/app/actions/contact';

const initialState: ActionState = {
  message: '',
  errors: {},
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );

  // state: ActionState
  // formAction: (payload: FormData) => void
  // pending: boolean
}
```

### Google Maps Embed with Proper ARIA Labels
```typescript
// Source: Google Maps Embed API - https://developers.google.com/maps/documentation/embed/embedding-map
<iframe
  src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=5301+Farmville+Rd,Farmville,VA+23901`}
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Town & Country Furniture location at 5301 Farmville Rd, Farmville, VA"
  aria-label="Google Maps showing Town & Country Furniture store location"
/>
```

### Accessible Error Messages with ARIA
```typescript
// Source: W3C WAI ARIA Techniques - https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21
<input
  id="email"
  name="email"
  type="email"
  required
  aria-invalid={!!state.errors?.email}
  aria-describedby={state.errors?.email ? "email-error" : undefined}
/>
{state.errors?.email && (
  <p id="email-error" className="text-red-600" aria-live="polite">
    {state.errors.email[0]}
  </p>
)}
```

### Progressive Enhancement with Server Actions
```typescript
// Source: Next.js Forms Guide - progressive enhancement
// Form works without JavaScript - browser POSTs to server
// With JavaScript - React intercepts, calls Server Action, updates UI
export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction}> {/* Works with or without JS */}
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| API routes for forms | Server Actions | Next.js 13 (beta), stable in 14 (2023) | Less boilerplate, type-safe, progressive enhancement, no manual FormData parsing |
| useFormState | useActionState | React 19 (2025) | Cleaner API, includes pending state built-in, better TypeScript types |
| SendGrid/Mailgun | Resend | Resend launched 2023, gained traction 2024-2026 | Better DX, Vercel integration, React Email support, simpler pricing |
| Maps JavaScript API for static display | Maps Embed API (iframe) | Always available, but modern practice (2024+) | Free vs paid, simpler implementation, better performance |
| Client-side validation only | Server validation with Zod | TypeScript ecosystem shift (2022+) | Security (no bypass), type safety, better error messages |
| Manual FormData.get() | Zod .parse(Object.fromEntries(formData)) | Pattern emerged 2024+ | Less manual parsing, automatic validation, type inference |

**Deprecated/outdated:**
- **`useFormState` hook**: Renamed to `useActionState` in React 19. Update imports from `react` not `react-dom`.
- **API routes for simple form handling**: Server Actions are now the standard. API routes still valid for webhooks or third-party integrations.
- **Nodemailer without SMTP service**: Gmail now requires app passwords, has strict sending limits (500/day), and requires 2FA. Use Resend/SendGrid instead.
- **Google Maps JavaScript API for static embeds**: Costs $7 per 1000 loads after free tier. Use free Embed API (iframe) for static location display.
- **Storing submissions in database for contact forms**: Unless building CRM or ticket system, email forwarding is simpler and sufficient.

## Open Questions

Things that couldn't be fully resolved:

1. **Store email address for form submissions**
   - What we know: Contact form needs to forward to store email
   - What's unclear: Client hasn't provided actual store email address (info@, contact@, owner email?)
   - Recommendation: Use placeholder `info@townandcountryfurniture.com` in code, update in environment variables when client provides actual address. Document in deployment checklist.

2. **Resend domain verification for production**
   - What we know: Resend requires domain verification to send from `@townandcountryfurniture.com`
   - What's unclear: Whether client has access to DNS records, whether they want emails from their domain or from generic sender
   - Recommendation: Start with Resend's default `onboarding@resend.dev` sender for testing. Phase 7 (deployment) can add custom domain verification with DNS records.

3. **Form submission rate limiting**
   - What we know: Resend has 2 requests/second limit, vulnerable to spam bots
   - What's unclear: Whether to implement honeypot field, reCAPTCHA, or Turnstile for spam prevention
   - Recommendation: Start without captcha (simplest UX). Add honeypot field (hidden field that bots fill but humans don't) if spam becomes issue. Reserve reCAPTCHA for last resort.

4. **Google Maps API key billing**
   - What we know: Maps Embed API is free and unlimited
   - What's unclear: Whether client has existing Google Cloud account, who manages API key
   - Recommendation: Create new Google Cloud project for Town & Country, enable Maps Embed API (free tier), restrict key to production domain. Document key management in deployment guide.

5. **Contact form success behavior**
   - What we know: Form should show success message after submission
   - What's unclear: Whether to redirect to thank-you page, reset form, or just show inline message
   - Recommendation: Show inline success message with form reset. Simpler than separate page, keeps user on site, follows Phase 4 "single-page" pattern.

6. **Alternative email service for free tier**
   - What we know: Resend has 3,000 emails/month free tier
   - What's unclear: Whether traffic will exceed 100 submissions/day (unlikely for local store)
   - Recommendation: Resend free tier is sufficient for 100 submissions/day. If exceeded, upgrade to Pro ($20/month for 50k emails). Extremely unlikely for local furniture store.

## Sources

### Primary (HIGH confidence)
- [Next.js 16.1.6 Forms Guide](https://nextjs.org/docs/app/guides/forms) - Updated Feb 27, 2026 - Server Actions, useActionState, form validation
- [Google Maps Embed API Documentation](https://developers.google.com/maps/documentation/embed/embedding-map) - Embed iframe, place mode, API key setup
- [Resend Next.js Integration](https://resend.com/docs/send-with-vercel-functions) - Vercel Functions, API key, code examples
- [Zod Documentation](https://zod.dev) - Schema validation, safeParse, error messages
- [React 19 useActionState Documentation](https://react.dev/reference/react/useActionState) - Form state management, pending states

### Secondary (MEDIUM confidence)
- [W3C WAI ARIA Techniques - ARIA21](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21) - aria-invalid for error fields
- [W3C WAI ARIA Techniques - ARIA19](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA19) - aria-live for dynamic error messages
- [FreeCodeCamp - Next.js Forms with Server Actions and Zod](https://www.freecodecamp.org/news/handling-forms-nextjs-server-actions-zod/) - January 2026 tutorial
- [Mailtrap - Vercel Send Email Tutorial](https://mailtrap.io/blog/vercel-send-email/) - 2026 comparison of email services
- [Web3Forms vs FormSubmit Comparison](https://web3forms.com/alternatives/formsubmit-alternative) - Alternative email forwarding services
- [Resend Pricing Documentation](https://resend.com/docs/knowledge-base/account-quotas-and-limits) - Free tier limits, rate limiting

### Tertiary (LOW confidence - WebSearch only, marked for validation)
- Various Next.js + Resend tutorials from 2025-2026 - code examples, not authoritative
- Google Maps iframe embed blog posts - general implementation patterns
- Contact form accessibility articles - WCAG compliance patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Server Actions stable in Next.js 16, useActionState documented in React 19, Resend official Vercel integration
- Architecture: HIGH - Patterns verified from Next.js official forms guide (Feb 27, 2026), Google Maps Embed API official docs
- Email forwarding: HIGH - Resend free tier confirmed (3,000 emails/month), official documentation current
- Form validation: HIGH - Zod is industry standard for TypeScript validation, well-documented pattern with Server Actions
- Accessibility: MEDIUM - ARIA patterns from W3C official techniques, but specific implementation needs testing
- Pitfalls: HIGH - Common issues verified from Next.js GitHub issues, Google Maps API key restrictions from official error documentation

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (30 days - Next.js 16 is stable, Server Actions API unlikely to change)
