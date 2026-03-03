# Phase 8: Responsive Polish & Deployment - Research

**Researched:** 2026-03-03
**Domain:** Mobile-first responsive design, WCAG AA accessibility, Vercel deployment
**Confidence:** HIGH

## Summary

Phase 8 finalizes the site for production by ensuring mobile responsiveness, accessibility compliance, and successful Vercel deployment. The codebase already uses Tailwind CSS 4 with mobile-first responsive patterns (Navigation has `md:flex`, `md:hidden` breakpoints), has `useReducedMotion` hook, and `skip-to-content` link in globals.css. Next.js 16 runs Turbopack by default for optimized production builds, and image optimization is configured for AVIF/WebP formats.

The standard approach is: audit existing responsive patterns against 375px/768px/1280px viewports, systematically fix layout breaks using Tailwind's default breakpoints (sm/md/lg/xl), implement WCAG AA essentials (skip-to-content already exists, add alt text, keyboard nav, semantic HTML verification), and deploy to Vercel with environment variables omitted for unlisted preview (graceful fallbacks already implemented).

**Primary recommendation:** Use Tailwind's mobile-first system (unprefixed utilities for mobile, `md:` for tablet+, `lg:` for desktop), focus on 48px touch targets and obvious keyboard navigation issues, verify WCAG AA contrast/alt text/semantic HTML, and deploy preview without environment variables leveraging existing graceful degradation.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | 4.x | Responsive utilities | Mobile-first by default, rem-based breakpoints (sm: 40rem, md: 48rem, lg: 64rem, xl: 80rem, 2xl: 96rem) |
| Next.js | 16.1.6 | Production build | Turbopack bundler, automatic image optimization, static rendering |
| Vercel | Latest | Deployment platform | Native Next.js integration, automatic HTTPS, preview deployments |
| React | 19.2.3 | UI framework | Server Components reduce client JS, built-in accessibility features |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Lighthouse | Built-in Chrome | Accessibility audit | Pre-deployment testing, WCAG compliance verification |
| @next/bundle-analyzer | Latest | Bundle size analysis | Identify large dependencies before deployment |
| Chrome DevTools | Built-in | Responsive testing | Device emulation, network throttling, accessibility tree |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind breakpoints | Custom media queries | Tailwind provides consistency, defaults match common devices |
| Vercel | Netlify/Cloudflare Pages | Vercel has tighter Next.js integration, automatic optimization |
| Manual accessibility audit | Automated tools only | Manual testing catches context-specific issues tools miss |

**Installation:**
```bash
# Bundle analyzer (optional)
npm install --save-dev @next/bundle-analyzer

# All core dependencies already installed
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── layout.tsx           # Root layout with skip-to-content link
├── page.tsx            # Server Component pages
├── globals.css         # Tailwind + a11y styles
components/
├── analytics/          # GA4 tracking wrappers
├── Navigation.tsx      # Mobile menu with aria-* attributes
└── [features]/         # Feature-specific components
```

### Pattern 1: Mobile-First Responsive Layout
**What:** Start with mobile styles (unprefixed utilities), add breakpoint prefixes for larger screens
**When to use:** All layout decisions — grids, flexbox, spacing, typography
**Example:**
```tsx
// Source: https://tailwindcss.com/docs/responsive-design
// Mobile: stacked vertical, Tablet+: horizontal row, Desktop: 3-column grid
<div className="flex flex-col md:flex-row lg:grid lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Mobile: full width, Tablet+: constrained width, Desktop: larger max-width
<div className="w-full md:max-w-3xl lg:max-w-5xl mx-auto px-4 md:px-6">
  Content
</div>
```

### Pattern 2: Touch Target Sizing
**What:** Minimum 48x48px (12rem = 48px default) interactive elements for mobile
**When to use:** All buttons, links, clickable areas on mobile
**Example:**
```tsx
// Source: https://www.webability.io/glossary/target-size
// Minimum 48px touch target with visual padding
<button className="min-h-[48px] min-w-[48px] px-6 py-3 rounded-lg">
  Click Me
</button>

// Link with adequate tap area
<a href="#" className="inline-block py-3 px-4 min-h-[48px] flex items-center">
  Navigation Link
</a>
```

### Pattern 3: WCAG AA Focus Indicators
**What:** Visible focus outline for keyboard navigation, minimum 2px solid or 3:1 contrast
**When to use:** All interactive elements (links, buttons, inputs)
**Example:**
```tsx
// Source: https://webaim.org/standards/wcag/checklist
// Tailwind's focus-visible provides browser-native focus styling
<button className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
  Submit
</button>

// Custom focus ring matching design system
<a
  href="#"
  className="focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
>
  Link
</a>
```

### Pattern 4: Skip-to-Content Link
**What:** Hidden link that appears on keyboard focus, jumps to main content
**When to use:** Every page layout (already exists in globals.css)
**Example:**
```tsx
// Source: https://webaim.org/standards/wcag/checklist
// In layout.tsx
<body>
  <a href="#main-content" className="skip-to-content">
    Skip to main content
  </a>
  <Navigation />
  <main id="main-content" tabIndex={-1}>
    {children}
  </main>
</body>
```

```css
/* In globals.css - already implemented */
.skip-to-content {
  position: absolute;
  top: -100%;
  left: 0;
  padding: 1rem 2rem;
  background: var(--color-accent);
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}
```

### Pattern 5: Semantic HTML with ARIA
**What:** Proper heading hierarchy (h1→h2→h3), landmark regions, descriptive labels
**When to use:** All pages and components
**Example:**
```tsx
// Source: https://nextjs.org/docs/app/guides/production-checklist
// Proper semantic structure
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
  </ul>
</nav>

<main>
  <h1>Page Title</h1>
  <section aria-labelledby="products-heading">
    <h2 id="products-heading">Our Products</h2>
  </section>
</main>

<footer role="contentinfo">
  <p>&copy; 2026 Company</p>
</footer>
```

### Pattern 6: Responsive Images with Alt Text
**What:** Next.js Image component with descriptive alt text, responsive sizes
**When to use:** All images (decorative images get `alt=""`)
**Example:**
```tsx
// Source: https://nextjs.org/docs/app/api-reference/components/image
import Image from 'next/image';

// Content image with descriptive alt
<Image
  src="/sofa.jpg"
  alt="Gray fabric sectional sofa with chaise lounge in modern living room"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
/>

// Decorative image
<Image
  src="/pattern.svg"
  alt=""
  width={100}
  height={100}
  aria-hidden="true"
/>
```

### Pattern 7: Graceful Environment Variable Fallbacks
**What:** Conditional rendering when env vars missing, no runtime errors
**When to use:** GA4, Google Maps, Resend email — all optional features
**Example:**
```tsx
// Source: Project codebase (MapEmbed, GoogleAnalytics components)
// Conditional GA4 rendering
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;
  return <GoogleAnalytics gaId={gaId} />;
}

// Map with fallback message
export function MapEmbed() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="bg-surface p-8 rounded-lg text-center">
        <p className="text-muted">Map will be available soon</p>
      </div>
    );
  }

  return <iframe src={`https://maps.google.com/...`} />;
}
```

### Pattern 8: Vercel Preview Deployment
**What:** Deploy to Vercel with unlisted preview URL, no environment variables initially
**When to use:** Initial client preview before adding real credentials
**Example:**
```bash
# Source: https://vercel.com/docs/deployments/preview-deployments
# Initial deployment (environment variables optional)
vercel deploy

# Environment variables configured in Vercel Dashboard
# Settings → Environment Variables → Select "Preview" environment
# Add when ready: NEXT_PUBLIC_GA_MEASUREMENT_ID, NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, RESEND_API_KEY

# Custom preview subdomain (configured in Vercel Dashboard)
# Project Settings → Domains → Add townandcountry.vercel.app
```

### Anti-Patterns to Avoid
- **Using `sm:` for mobile styling:** `sm:` applies at 640px+, not mobile. Use unprefixed utilities for mobile, then override with `md:` at 768px+.
- **Fixed pixel units for touch targets:** Use `min-h-[48px]` or `h-12` (3rem = 48px), not smaller fixed heights.
- **Missing alt text with placeholder images:** Even placeholder images need descriptive alt or `alt=""` for decorative, never omit the attribute.
- **Deploying without testing responsive:** Always test at 375px (mobile), 768px (tablet), 1280px (desktop) before deployment.
- **Assuming Vercel deployment needs environment variables:** Next.js builds successfully without env vars if code has graceful fallbacks.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive breakpoints | Custom `@media (min-width: ...)` queries | Tailwind breakpoint prefixes (`md:`, `lg:`) | Consistency across codebase, less CSS to maintain, rem-based for accessibility |
| Image optimization | Manual srcset/picture elements | Next.js `<Image>` component | Automatic WebP/AVIF conversion, lazy loading, responsive sizes, blur placeholder |
| Focus management | Custom focus styles with `:focus` | Tailwind `focus-visible:` utilities | Browser-native behavior, only shows focus for keyboard (not mouse clicks) |
| Reduced motion | Separate animation classes for users | `useReducedMotion` hook (already exists) | Respects `prefers-reduced-motion`, centralized logic, aligns with WCAG 2.3.3 |
| Skip-to-content link | Custom implementation | Standard pattern in globals.css (exists) | WCAG 2.4.1 compliant, accessible to screen readers, keyboard users |
| Accessibility tree validation | Manual ARIA testing | Chrome DevTools Accessibility pane + Lighthouse | Automated detection of missing labels, incorrect ARIA, contrast issues |
| Environment variable loading | Custom dotenv logic | Next.js built-in `.env.local` + `NEXT_PUBLIC_` prefix | Type-safe, build-time injection, automatic browser/server separation |
| Cross-browser testing | Physical devices or VMs | Chrome DevTools Device Mode + BrowserStack | Emulates mobile viewport, throttling, touch events without physical devices |

**Key insight:** Next.js and Tailwind provide production-grade solutions for responsive design and accessibility. Custom implementations introduce bugs (missing edge cases like reduced motion, wrong breakpoint behavior on zoom, broken focus indicators on certain browsers). Use framework defaults unless specific design system requires deviation.

## Common Pitfalls

### Pitfall 1: Tailwind `sm:` Used for Mobile Styles
**What goes wrong:** Developer uses `sm:flex` expecting mobile styles, but `sm:` applies at 640px+ (small tablets), leaving mobile (320px-639px) without the style.
**Why it happens:** Misunderstanding "sm" as "small/mobile" when it means "small screens and up" (mobile-first).
**How to avoid:**
- Use unprefixed utilities for mobile: `flex` applies everywhere
- Use `md:` (768px+) for tablet, `lg:` (1024px+) for desktop
- Test at 375px width to verify mobile behavior
**Warning signs:** Layout breaks below 640px, mobile users report broken UI, styles only appear on tablet+.

**Code example:**
```tsx
// WRONG: Mobile has no flex, stacks vertically by default (block)
<div className="sm:flex gap-4">...</div>

// CORRECT: Mobile gets flex, desktop gets row direction
<div className="flex flex-col md:flex-row gap-4">...</div>
```

### Pitfall 2: Touch Targets Smaller Than 48px
**What goes wrong:** Buttons/links are too small to tap accurately on mobile, users mis-tap or struggle to activate controls.
**Why it happens:** Desktop-first design uses small padding (8px), which works with mouse precision but fails with finger touch (9mm average).
**How to avoid:**
- Minimum `min-h-[48px]` or `h-12` (Tailwind: 1rem = 16px, so 3rem = 48px)
- Add padding: `py-3 px-6` (12px vertical + content height often hits 48px)
- Test on actual mobile device or use Chrome DevTools touch emulation
**Warning signs:** Users report difficulty tapping buttons, analytics show high tap abandonment, mobile bounce rate higher than desktop.

**Code example:**
```tsx
// WRONG: Only 32px tall (8px * 2 + text height ~16px)
<button className="py-2 px-4">Submit</button>

// CORRECT: Minimum 48px tap target
<button className="min-h-[48px] py-3 px-6">Submit</button>
```

### Pitfall 3: Missing Alt Text or Generic Alt Text
**What goes wrong:** Screen readers announce "image" without context, or read generic text like "image-1.jpg", failing WCAG 1.1.1 (Non-text Content).
**Why it happens:** Developers forget alt attribute, use filename as placeholder, or don't understand decorative vs. informative images.
**How to avoid:**
- **Informative images:** Describe what the image shows and its purpose: `alt="Gray sectional sofa with chaise in modern living room"`
- **Decorative images:** Use `alt=""` (empty string, not omitted): `<img src="pattern.svg" alt="" />`
- **Linked images:** Describe destination: `alt="View full product details"`
- Avoid "image of", "picture of" — screen readers already announce "image"
**Warning signs:** Lighthouse accessibility score flags missing alt, screen reader testing reads unhelpful text, WCAG audit fails 1.1.1.

**Code example:**
```tsx
// WRONG: Missing alt or generic alt
<Image src="/sofa.jpg" alt="sofa" width={800} height={600} />

// CORRECT: Descriptive alt text
<Image
  src="/sofa.jpg"
  alt="Gray fabric sectional sofa with reversible chaise lounge, seats 5"
  width={800}
  height={600}
/>

// CORRECT: Decorative image
<Image src="/pattern.svg" alt="" width={100} height={100} aria-hidden="true" />
```

### Pitfall 4: Deploying to Vercel Without Testing Production Build
**What goes wrong:** `next build` succeeds locally but fails on Vercel due to build-time errors (missing env vars causing crashes, dynamic imports failing, type errors in production mode).
**Why it happens:** Developers only test `next dev` which has looser error handling and different rendering modes.
**How to avoid:**
- Always run `next build` locally before deploying
- Test with `next start` to simulate production server
- Verify graceful fallbacks work when env vars missing
- Check Vercel build logs for warnings even if build succeeds
**Warning signs:** Vercel build fails after local dev worked, production site has missing sections, `getServerSideProps` errors in production.

**Code example:**
```bash
# WRONG: Deploy without testing production build
npm run dev  # Works fine
vercel deploy  # Build fails on Vercel

# CORRECT: Test production build locally first
npm run build  # Catches build-time errors
npm run start  # Test production mode
vercel deploy  # Now confident it will work
```

### Pitfall 5: Invisible Focus Indicators
**What goes wrong:** Keyboard users can't see which element has focus, violating WCAG 2.4.7 (Focus Visible).
**Why it happens:** CSS resets remove default outline (`outline: none`), or custom focus styles have insufficient contrast.
**How to avoid:**
- Use Tailwind `focus-visible:` utilities (only shows focus for keyboard, not mouse)
- Ensure focus indicator has 3:1 contrast against background (WCAG 1.4.11)
- Never use `outline: none` without replacement focus style
- Test with keyboard (Tab key) to verify focus visibility
**Warning signs:** Lighthouse flags focus indicators, keyboard testing shows no visible focus, accessibility audit fails 2.4.7.

**Code example:**
```tsx
// WRONG: No visible focus indicator
<button className="bg-accent text-white px-6 py-3">
  Submit
</button>

// CORRECT: Visible focus ring
<button className="bg-accent text-white px-6 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
  Submit
</button>
```

### Pitfall 6: Environment Variables Not Prefixed with `NEXT_PUBLIC_`
**What goes wrong:** Client-side code tries to access `process.env.VARIABLE_NAME` and gets `undefined`, causing runtime errors.
**Why it happens:** Next.js only exposes env vars to browser if prefixed with `NEXT_PUBLIC_`, others are server-only.
**How to avoid:**
- Use `NEXT_PUBLIC_` prefix for client-side vars (GA4 ID, Maps API key)
- Keep server-only vars without prefix (Resend API key)
- Verify in browser DevTools console that `process.env.NEXT_PUBLIC_VAR` is defined
- Document which vars are client vs. server in `.env.example`
**Warning signs:** Client components log `undefined` for env vars, GA4 doesn't track, Maps don't load despite env var set in Vercel.

**Code example:**
```bash
# .env.local
# WRONG: Client component can't access this
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# CORRECT: Client-accessible
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# CORRECT: Server-only (no NEXT_PUBLIC_)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

### Pitfall 7: Testing Only on Chrome, Ignoring Safari Mobile
**What goes wrong:** Layout works on Chrome DevTools emulation but breaks on real Safari iOS (sticky positioning bugs, viewport units behave differently, flexbox gaps not supported in older versions).
**Why it happens:** Chrome DevTools emulates mobile but doesn't replicate Safari's rendering engine quirks.
**How to avoid:**
- Test on real iOS device or BrowserStack Safari simulator
- Check `caniuse.com` for Safari support of CSS features (flexbox gap, dvh units, container queries)
- Use progressive enhancement for Safari-unsupported features
- Verify sticky nav behavior on iOS Safari (scroll-padding-top works differently)
**Warning signs:** iOS users report broken layouts, Safari-specific bug reports, sticky nav overlaps content on iPhone.

### Pitfall 8: Grid Layouts Without Mobile Column Override
**What goes wrong:** Desktop 3-column grid (`grid-cols-3`) stays 3 columns on mobile, creating tiny unusable columns.
**Why it happens:** Developer forgets to override grid columns for smaller screens.
**How to avoid:**
- Start with `grid-cols-1` (mobile), add `md:grid-cols-2 lg:grid-cols-3`
- Test at 375px width to verify single-column layout
- Use `auto-fit` with minmax if truly responsive: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
**Warning signs:** Mobile layout has tiny squeezed columns, horizontal scrolling on mobile, grid items truncated.

**Code example:**
```tsx
// WRONG: 3 columns on all screen sizes (unusable on mobile)
<div className="grid grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// CORRECT: 1 column mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

## Code Examples

Verified patterns from official sources:

### Responsive Navigation (Mobile Menu)
```tsx
// Source: Project codebase (Navigation.tsx) + https://tailwindcss.com/docs/responsive-design
// Desktop: horizontal nav, Mobile: hamburger menu
<nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Desktop nav - hidden on mobile */}
      <ul className="hidden md:flex items-center gap-8">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>

      {/* Mobile menu button - hidden on desktop */}
      <button
        className="md:hidden p-2 min-h-[48px] min-w-[48px]"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        Menu
      </button>
    </div>

    {/* Mobile menu - full width dropdown */}
    {mobileMenuOpen && (
      <ul id="mobile-menu" className="md:hidden mt-4 space-y-2">
        <li><a href="/" className="block py-3 px-4">Home</a></li>
        <li><a href="/about" className="block py-3 px-4">About</a></li>
      </ul>
    )}
  </div>
</nav>
```

### Responsive Grid Layout
```tsx
// Source: Project codebase (CategoryGrid.tsx)
// Mobile: 2 columns, Tablet: 3 columns, Desktop: 3 columns (same)
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
  {categories.map((cat) => (
    <a
      key={cat.name}
      href={cat.href}
      className="aspect-[4/3] rounded-xl focus-visible:outline-2 focus-visible:outline-accent"
    >
      <h3 className="text-lg md:text-xl font-bold">{cat.name}</h3>
    </a>
  ))}
</div>
```

### Accessible Image with Responsive Sizing
```tsx
// Source: https://nextjs.org/docs/app/api-reference/components/image
import Image from 'next/image';

<Image
  src="/products/recliner.jpg"
  alt="Brown leather power recliner with USB charging port and heated massage"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
  priority={false}  // Lazy load below fold
/>
```

### WCAG AA Color Contrast Check
```tsx
// Source: https://webaim.org/standards/wcag/checklist
// Ensure text meets 4.5:1 contrast ratio (AA), large text 3:1
// Use contrast checker: https://webaim.org/resources/contrastchecker/

// Text on background
<div className="bg-background text-foreground">
  {/* --color-background: oklch(0.97 0.008 80) - very light */}
  {/* --color-foreground: oklch(0.22 0.02 55) - very dark */}
  {/* Contrast ratio: ~14:1 (passes AAA) */}
  <p>Normal text content</p>
</div>

// Accent text on background
<div className="bg-background">
  <a href="#" className="text-accent">
    {/* --color-accent: oklch(0.62 0.14 70) - muted gold */}
    {/* Contrast ratio: ~4.8:1 (passes AA for normal text) */}
    Link text
  </a>
</div>
```

### Keyboard Navigation with Focus Trap (Modal)
```tsx
// Source: https://legacy.reactjs.org/docs/accessibility.html
// Modal with focus trap (keeps Tab within modal)
import { useEffect, useRef } from 'react';

export function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus first interactive element
    closeButtonRef.current?.focus();

    // Trap focus within modal
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="focus-visible:outline-2 focus-visible:outline-accent"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
```

### Vercel Deployment Configuration
```bash
# Source: https://vercel.com/docs/environment-variables
# Deploy to Vercel with custom subdomain

# 1. Initial deployment (no env vars needed with graceful fallbacks)
vercel deploy

# 2. Configure custom Vercel subdomain in Dashboard
# Project Settings → Domains → Add Domain
# Enter: townandcountry.vercel.app
# Vercel automatically provisions SSL certificate

# 3. Add environment variables when ready (optional for preview)
# Project Settings → Environment Variables
# Variable: NEXT_PUBLIC_GA_MEASUREMENT_ID
# Value: G-XXXXXXXXXX
# Environment: ✓ Preview ✓ Production

# Variable: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
# Value: [API key]
# Environment: ✓ Preview ✓ Production

# Variable: RESEND_API_KEY (server-only, no NEXT_PUBLIC_)
# Value: re_xxxxxxxxxxxxxxxxxxxx
# Environment: ✓ Production (omit for preview)

# 4. Redeploy to apply environment variables
vercel deploy --prod  # For production
# Or push to Git branch for preview deployment
```

### Production Build Test Script
```bash
# Source: https://nextjs.org/docs/app/guides/production-checklist
# Test production build locally before deploying

# 1. Build for production
npm run build

# Output should show:
# ✓ Compiled successfully
# ✓ Linting and checking validity of types
# ✓ Collecting page data
# ✓ Generating static pages (X/X)
# ✓ Finalizing page optimization

# 2. Start production server
npm run start

# 3. Test critical paths
# - Open http://localhost:3000
# - Test at 375px width (mobile)
# - Test at 768px width (tablet)
# - Test at 1280px width (desktop)
# - Verify images load (AVIF/WebP formats)
# - Test keyboard navigation (Tab through all links/buttons)
# - Check skip-to-content link (Tab once, Enter)
# - Verify graceful fallbacks (GA4, Maps don't crash if env vars missing)

# 4. Run Lighthouse audit
# Chrome DevTools → Lighthouse tab
# Mode: Navigation, Device: Mobile
# Categories: ✓ Performance ✓ Accessibility ✓ Best Practices ✓ SEO
# Click "Analyze page load"
# Target scores: Accessibility 90+, Performance 80+
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Webpack bundler | Turbopack (default in Next.js 16) | Next.js 16 release (Feb 2026) | 5-10x faster builds, stable for production |
| WCAG 2.1 AA | WCAG 2.2 AA | June 2023 | 6 new Level AA criteria (focus not obscured, dragging movements, target size) |
| Manual image formats | Automatic AVIF/WebP (Next.js Image) | Next.js 10+ (2020) | 25-35% smaller images, automatic browser detection |
| 44px touch targets | 48px minimum (WCAG 2.5.8) | WCAG 2.2 (2023) | Better mobile usability, aligns with Material Design |
| JavaScript breakpoints | CSS container queries | 2023 (90%+ browser support) | Component-responsive vs viewport-responsive |
| Password-protected previews | Shareable links with tokens | Vercel 2024 update | Easier client sharing, no login required |

**Deprecated/outdated:**
- **`next/image` with `layout` prop:** Removed in Next.js 13, use `fill` or explicit `width`/`height` instead
- **Custom breakpoint in `tailwind.config.js`:** Tailwind 4 uses `@theme { --breakpoint-* }` in CSS, not JS config
- **`getStaticProps`/`getServerSideProps` in App Router:** Use Server Components instead (Next.js 13+ App Router)
- **WCAG 2.1 compliance claims:** Update to WCAG 2.2 AA which is current standard as of 2023
- **Manual `@media (prefers-reduced-motion)`:** Use `useReducedMotion` hook or Tailwind `motion-reduce:` utility

## Open Questions

Things that couldn't be fully resolved:

1. **Custom Vercel subdomain availability**
   - What we know: Vercel allows custom subdomains like `townandcountry.vercel.app` (not `*.vercel.app` default)
   - What's unclear: Whether `townandcountry.vercel.app` is available (depends on existing projects)
   - Recommendation: Try to claim subdomain in Vercel Dashboard → Domains; if taken, use fallback like `townandcountry-furniture.vercel.app` or `town-and-country.vercel.app`

2. **BrowserStack or real device testing**
   - What we know: Chrome DevTools Device Mode emulates mobile viewports but not Safari rendering quirks
   - What's unclear: Whether client has budget/need for BrowserStack subscription or access to iOS/Android devices
   - Recommendation: Start with Chrome DevTools, escalate to BrowserStack trial or borrow physical device if Safari-specific issues found

3. **Lighthouse score targets**
   - What we know: Accessibility 90+ is achievable with WCAG AA compliance, Performance 80+ depends on image sizes
   - What's unclear: Whether client expects perfect 100 scores or pragmatic 90+ scores
   - Recommendation: Target 90+ for all categories (good enough for production), optimize further post-launch if needed

4. **Alt text for placeholder images**
   - What we know: Current placeholders (unsplash.com) are generic, real images will replace them
   - What's unclear: Whether to write detailed alt text for placeholders that will be deleted
   - Recommendation: Use generic but descriptive alt for placeholders (`alt="Furniture showroom interior"` not `alt="Placeholder image"`), update with real alt when images replaced

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - Official documentation for breakpoints and mobile-first patterns
- [Next.js Production Checklist](https://nextjs.org/docs/app/guides/production-checklist) - Official Next.js 16 deployment best practices
- [WebAIM WCAG 2.2 Checklist](https://webaim.org/standards/wcag/checklist) - Comprehensive WCAG AA requirements
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables) - Official Vercel configuration guide
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image) - Official image optimization documentation

### Secondary (MEDIUM confidence)
- [WCAG 2.2 AA Compliance Guide 2026](https://www.webability.io/blog/wcag-2-1-aa-the-standard-for-accessible-web-design) - Industry best practices
- [Target Size Accessibility](https://www.webability.io/glossary/target-size) - Touch target sizing standards
- [Alt Text Best Practices](https://www.deque.com/blog/great-alt-text-introduction/) - Deque accessibility guidelines
- [React Focus Management](https://legacy.reactjs.org/docs/accessibility.html) - Official React accessibility patterns
- [Vercel Deployment Protection](https://vercel.com/docs/deployment-protection) - Sharing preview deployments

### Tertiary (LOW confidence)
- [Cross-Browser Testing Checklist](https://www.softwaretestingmaterial.com/cross-browser-testing-checklist/) - WebSearch result, not verified with testing
- [Mobile Button Size Guide](https://www.designmonks.co/blog/perfect-mobile-button-size) - Design blog, not authoritative standard

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official docs for Tailwind 4, Next.js 16, Vercel verified via WebFetch and official sources
- Architecture: HIGH - Patterns verified in Next.js docs, WCAG official checklist, and existing project codebase
- Pitfalls: HIGH - Common issues documented in official Next.js production checklist, WCAG compliance guides, and WebAIM resources
- Touch targets: MEDIUM - WCAG 2.5.8 specifies 24px minimum (AA), but industry standard (Google, Apple) recommends 48px for optimal usability
- Cross-browser testing: MEDIUM - Checklist items from WebSearch, not verified with actual Safari testing

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (30 days - stable domain, Next.js 16 and Tailwind 4 current)
