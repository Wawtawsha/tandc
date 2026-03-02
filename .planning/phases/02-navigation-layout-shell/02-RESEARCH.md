# Phase 2: Navigation & Layout Shell - Research

**Researched:** 2026-03-02
**Domain:** Next.js App Router persistent layout patterns, responsive navigation, accessibility
**Confidence:** HIGH

## Summary

Phase 2 implements the persistent navigation and footer structure for Town & Country Furniture's website. The research focused on Next.js 16 App Router layout patterns, sticky navigation best practices, hamburger menu accessibility, and click-to-call implementation.

**Key findings:**
- Next.js App Router's nested layout system already provides the correct architecture (root layout with navigation/footer in `(main)/layout.tsx`)
- Sticky navigation with backdrop-blur is a mature, performant technique when implemented with accessibility considerations
- Hamburger menus require specific ARIA patterns and must close on route change to avoid UX issues
- Motion library (v12.29.2) has built-in `useReducedMotion` hook that respects user motion preferences
- Tel links should use international format with country code for reliability across devices

**Primary recommendation:** Extend the existing Navigation and Footer scaffolds in place. The template structure is correct; implementation requires adding phone number, store hours, mobile menu close behavior, and accessibility enhancements.

## Standard Stack

The project already has the correct stack from Phase 1:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router framework | App Router layouts provide persistent UI without re-render |
| Motion | 12.29.2 | Navigation animations | Built-in accessibility with useReducedMotion hook |
| Tailwind CSS | 4.x | Responsive utilities | Container queries, backdrop-blur, mobile-first patterns |
| Lenis | 1.3.17 | Smooth scroll | Existing integration for scroll behavior |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/navigation | Built-in | usePathname hook | Close mobile menu on route change |
| React 19 | 19.2.3 | Hooks (useEffect, useState, useRef) | Menu state and keyboard handling |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Motion | Framer Motion | Motion is the evolution of Framer Motion (same team, better DX) |
| usePathname | Router events | Router events removed in App Router, usePathname is the modern pattern |
| CSS sticky | JavaScript scroll listener | CSS is more performant, avoid JS unless absolutely necessary |

**Installation:**
All dependencies already installed in Phase 1. No additional packages needed.

## Architecture Patterns

### Recommended Project Structure
The existing structure is correct:
```
app/
├── layout.tsx              # Root layout (HTML shell, metadata)
├── (main)/
│   ├── layout.tsx          # Persistent Navigation + Footer wrapper
│   ├── main.css            # Navigation animations (.nav-link::after)
│   └── page.tsx            # Homepage content
└── globals.css             # Design tokens, skip-to-content, reduced motion

components/
├── Navigation.tsx          # Sticky header with mobile menu (extend)
└── Footer.tsx              # Store hours and contact (extend)
```

### Pattern 1: Next.js App Router Nested Layouts
**What:** Layouts in Next.js App Router persist across navigations and don't re-render
**When to use:** For headers, footers, navigation—any UI shared across multiple pages
**How it works:**
- Root `layout.tsx` defines `<html>` and `<body>` tags
- Nested layouts (like `(main)/layout.tsx`) wrap page content
- Navigation and Footer components remain mounted during route changes
- Lenis smooth scroll provider wraps children to maintain scroll state

**Example:**
```typescript
// app/(main)/layout.tsx
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <LenisProvider>
        <PageTransition>{children}</PageTransition>
      </LenisProvider>
      <Footer />
    </div>
  );
}
```
**Source:** [Next.js Layouts Documentation](https://nextjs.org/docs/app/getting-started/layouts-and-pages)

### Pattern 2: Close Mobile Menu on Route Change
**What:** Use `usePathname()` in `useEffect` to auto-close hamburger menu when user navigates
**When to use:** Any mobile navigation menu that can be opened/closed
**Why:** Without this, menu stays open after clicking a link, confusing users

**Example:**
```typescript
// components/Navigation.tsx
'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // rest of component...
}
```
**Source:** [Closing a navigation menu in React](https://dev.to/nicm42/closing-a-navigation-menu-in-react-8ad)

### Pattern 3: Click-to-Call Tel Links
**What:** Use `tel:` protocol with international format for mobile phone calls
**When to use:** Phone numbers in header, footer, contact sections
**Format:** `tel:+[country code][area code][number]` (no spaces, dashes, or special characters in href)

**Example:**
```typescript
<a
  href="tel:+14342238163"
  className="hover:text-accent transition-colors"
  aria-label="Call Town & Country Furniture at 4 3 4 2 2 3 8 1 6 3"
>
  (434) 223-8163
</a>
```
**Best practices:**
- Always include country code (+1 for US)
- Display formatted number to humans: (434) 223-8163
- Provide unformatted number to `href`: +14342238163
- Use descriptive aria-label with spaced digits for screen readers
- Test on both iOS and Android devices

**Source:** [Click-to-call best practices](https://firt.dev/click-to-call)

### Pattern 4: Accessible Hamburger Menu
**What:** Mobile menu button with proper ARIA attributes and keyboard handling
**When to use:** Navigation that collapses on mobile viewports
**Requirements:**
- `aria-expanded` attribute (true/false based on menu state)
- `aria-controls` pointing to menu element ID
- `aria-label` describing button function
- Escape key closes menu and returns focus to button
- Menu closes on outside click or route change

**Example:**
```typescript
<button
  ref={menuButtonRef}
  className="md:hidden p-2 hover:bg-surface rounded-lg transition-colors"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-expanded={mobileMenuOpen}
  aria-controls="mobile-menu"
  aria-label="Toggle navigation menu"
>
  {/* Hamburger/X icon */}
</button>

{mobileMenuOpen && (
  <ul id="mobile-menu" className="md:hidden mt-4 pt-4 border-t border-border-subtle space-y-2">
    {/* Navigation links */}
  </ul>
)}
```
**Keyboard handling:**
```typescript
useEffect(() => {
  if (!mobileMenuOpen) return;
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };
  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}, [mobileMenuOpen]);
```

**Source:** [Mobile Navigation Accessibility](https://a11ymatters.com/pattern/mobile-nav/)

### Pattern 5: Sticky Navigation with Backdrop Blur
**What:** Navigation bar stays at top of viewport with translucent background blur
**When to use:** Sites with long scrolling pages where navigation needs constant access
**Performance:** `backdrop-blur-sm` or `backdrop-blur-md` is performant on modern devices
**Accessibility:** Respect reduced motion preferences

**Example (already in template):**
```typescript
<nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border-subtle">
  {/* Navigation content */}
</nav>
```

**CSS considerations:**
```css
/* Prevent sticky header from obscuring focused elements */
html {
  scroll-padding-top: 80px; /* Height of sticky header */
}

/* Reduce blur for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .backdrop-blur-lg {
    backdrop-filter: none;
    background: var(--color-background);
  }
}
```

**Source:** [Prevent focused elements from being obscured by sticky headers](https://www.tpgi.com/prevent-focused-elements-from-being-obscured-by-sticky-headers/)

### Anti-Patterns to Avoid
- **Don't duplicate header navigation in footer** - Footer should have different links (legal, social, about) not just repeat the main nav
- **Don't use JavaScript for sticky positioning** - CSS `position: sticky` is more performant
- **Don't forget to close mobile menu on navigation** - Leads to confusing UX where menu stays open after clicking link
- **Don't use `router.events` in App Router** - That API was removed, use `usePathname` instead
- **Don't make sticky headers too tall** - Keep under 60-80px to avoid eating screen space, especially on mobile

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll | Custom scroll event listeners | Lenis (already installed) | Handles scroll hijacking, momentum, touch devices, reduced motion |
| Reduced motion detection | useState + matchMedia | Motion's `useReducedMotion` hook | Reactive to system changes, handles SSR |
| Animation library | Custom CSS transitions | Motion library (already installed) | Accessibility built-in, declarative API, SSR-safe |
| Mobile menu animations | Custom transforms | Motion's `<motion.div>` | Respects reduced motion automatically |
| Phone number formatting | Regex patterns | Display formatted, keep href simple | Internationalization is complex, keep it simple |
| Skip-to-content link | Custom implementation | Template's `.skip-to-content` in globals.css | Already WCAG compliant |

**Key insight:** The Shrike template already solved most navigation patterns correctly. Don't rebuild—extend what exists.

## Common Pitfalls

### Pitfall 1: Sticky Header Obscuring Content
**What goes wrong:** When users click anchor links or tab through focusable elements, sticky header covers the target content
**Why it happens:** Browser scrolls element to viewport top, but sticky header sits on top of viewport
**How to avoid:** Add `scroll-padding-top` to `html` element matching header height
```css
html {
  scroll-padding-top: 80px;
}
```
**Warning signs:** Users complain they can't see what they clicked; focus outline hidden behind header

**Source:** [TPGI - Prevent focused elements from being obscured](https://www.tpgi.com/prevent-focused-elements-from-being-obscured-by-sticky-headers/)

### Pitfall 2: Mobile Menu Stays Open After Navigation
**What goes wrong:** User taps a link in mobile menu, navigates to new page, but menu remains open
**Why it happens:** Menu state is controlled by `useState`, doesn't automatically reset on navigation
**How to avoid:** Use `useEffect` with `pathname` dependency to close menu
```typescript
const pathname = usePathname();
useEffect(() => {
  setMobileMenuOpen(false);
}, [pathname]);
```
**Warning signs:** Mobile users report menu "stuck" open; QA finds menu doesn't close after clicking links

**Source:** [Closing a navigation menu in React](https://dev.to/nicm42/closing-a-navigation-menu-in-react-8ad)

### Pitfall 3: Backdrop Blur Performance on Low-End Devices
**What goes wrong:** Sticky header with heavy backdrop blur causes scroll jank on older phones
**Why it happens:** Backdrop filters are GPU-intensive, especially with large blur radius
**How to avoid:**
- Use `backdrop-blur-sm` (4px) or `backdrop-blur-md` (8px) instead of `backdrop-blur-lg` (16px)
- Add `motion-reduce:backdrop-blur-0` to disable blur for users who prefer reduced motion
- Consider increasing opacity of background color to compensate for less blur
```typescript
className="bg-background/90 backdrop-blur-sm motion-reduce:backdrop-blur-0"
```
**Warning signs:** Scroll feels janky on mobile; performance profiling shows high GPU usage

**Source:** [Tailwind CSS Backdrop Blur Production Guide](https://thelinuxcode.com/tailwind-css-backdrop-blur-a-practical-production-ready-guide/)

### Pitfall 4: Touch Targets Too Small on Mobile
**What goes wrong:** Users miss navigation links, especially older adults or users with motor impairments
**Why it happens:** Desktop-sized targets (24-32px) are too small for touch
**How to avoid:** Ensure all interactive elements are at least 44x44px (WCAG 2.5.5)
```typescript
// Desktop link
<a className="py-2 px-4"> {/* Ensures 44px+ height */}

// Mobile menu button
<button className="p-2 w-12 h-12"> {/* 48x48px touch target */}
```
**Warning signs:** Analytics show high bounce rate on mobile; users report "can't click links"

**Source:** [Mobile Navigation Patterns That Work in 2026](https://phone-simulator.com/blog/mobile-navigation-patterns-in-2026)

### Pitfall 5: Missing Keyboard Escape from Mobile Menu
**What goes wrong:** Keyboard users open mobile menu but can't close it without mouse
**Why it happens:** Only onClick handler for button, no Escape key listener
**How to avoid:** Add keyboard event listener that closes menu on Escape and returns focus
```typescript
useEffect(() => {
  if (!mobileMenuOpen) return;
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus(); // Return focus to button
    }
  };
  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}, [mobileMenuOpen]);
```
**Warning signs:** Keyboard-only users can't close menu; accessibility audit fails

**Source:** [Accessible Web Dev - Navigation](https://accessibleweb.dev/navigation)

### Pitfall 6: Sticky Navigation Too Tall on Mobile
**What goes wrong:** Header takes up 30-40% of mobile screen, leaving little room for content
**Why it happens:** Desktop header height not adjusted for mobile viewports
**How to avoid:**
- Keep mobile header under 60px height
- Consider hiding secondary items (tagline, extra links) on mobile
- Use smaller logo/text on mobile breakpoints
```typescript
<nav className="sticky top-0 z-50 h-16 md:h-20"> {/* 64px mobile, 80px desktop */}
  <div className="h-full flex items-center justify-between">
    <h1 className="text-xl md:text-2xl">{/* Smaller on mobile */}</h1>
  </div>
</nav>
```
**Warning signs:** Mobile users bounce quickly; heatmaps show users struggle with limited content area

**Source:** [What is a Sticky Header? UX Best Practices](https://www.parallelhq.com/blog/what-sticky-header)

## Code Examples

Verified patterns from official sources:

### Store Hours Display
```typescript
// components/Footer.tsx
export function Footer() {
  const currentYear = new Date().getFullYear();

  const storeHours = [
    { days: 'Monday - Friday', hours: '9:00 AM - 5:30 PM' },
    { days: 'Saturday', hours: '9:00 AM - 5:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ];

  return (
    <footer className="border-t border-border-subtle py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Store Hours */}
          <div>
            <h3 className="font-display text-lg mb-4">Store Hours</h3>
            <ul className="space-y-2 text-sm text-muted">
              {storeHours.map((schedule, idx) => (
                <li key={idx}>
                  <span className="font-medium text-foreground">{schedule.days}:</span>{' '}
                  {schedule.hours}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href="tel:+14342238163"
                  className="hover:text-accent transition-colors"
                  aria-label="Call 4 3 4 2 2 3 8 1 6 3"
                >
                  (434) 223-8163
                </a>
              </li>
              <li>5301 Farmville Rd<br />Farmville, VA 23901</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm text-muted">
              &copy; {currentYear} Town &amp; Country Furniture
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
```
**Source:** Composite pattern from [Website Footer Best Practices](https://www.orbitmedia.com/blog/website-footer-design-best-practices/)

### Navigation with Phone Number
```typescript
// components/Navigation.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle Escape key to close menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mobileMenuOpen]);

  return (
    <nav
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border-subtle"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight hover:text-accent transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Town &amp; Country
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.div
                  whileHover={reducedMotion ? { opacity: 0.8 } : { scale: 1.05, opacity: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className={`relative font-medium transition-colors hover:text-accent nav-link ${
                      pathname === link.href ? 'text-accent' : 'text-foreground'
                    }`}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              </li>
            ))}
            {/* Phone Number - Desktop */}
            <li>
              <a
                href="tel:+14342238163"
                className="font-medium hover:text-accent transition-colors"
                aria-label="Call Town & Country Furniture at 4 3 4 2 2 3 8 1 6 3"
              >
                (434) 223-8163
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            className="md:hidden p-2 hover:bg-surface rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <ul
            id="mobile-menu"
            className="md:hidden mt-4 pt-4 border-t border-border-subtle space-y-2"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 px-4 rounded-lg font-medium transition-colors hover:bg-surface ${
                    pathname === link.href ? 'text-accent bg-surface' : 'text-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Phone Number - Mobile */}
            <li>
              <a
                href="tel:+14342238163"
                className="block py-2 px-4 rounded-lg font-medium text-foreground hover:bg-surface transition-colors"
                aria-label="Call Town & Country Furniture at 4 3 4 2 2 3 8 1 6 3"
              >
                (434) 223-8163
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
```
**Source:** Composite pattern from Next.js docs + accessibility guidelines

### CSS for Sticky Header Scroll Padding
```css
/* app/globals.css - Add to existing file */

/* Prevent sticky header from obscuring anchor targets */
html {
  scroll-padding-top: 80px; /* Match navigation height */
}

/* Reduce backdrop blur for reduced motion users */
@media (prefers-reduced-motion: reduce) {
  .backdrop-blur-lg {
    backdrop-filter: none !important;
    background-color: var(--color-background) !important;
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router with getServerSideProps | App Router with Server Components | Next.js 13+ (2023) | Layouts persist without re-render, better performance |
| router.events for route changes | usePathname + useEffect | Next.js 13+ App Router | Router events API removed in App Router |
| Framer Motion | Motion library | 2024 | Same team, better tree-shaking, 30M+ monthly downloads |
| Custom matchMedia for reduced motion | useReducedMotion hook | Built into Motion | Reactive to system changes, handles SSR |
| JavaScript scroll listeners for sticky nav | CSS position: sticky | Widely supported (2020+) | Better performance, no JavaScript needed |
| Headless UI for mobile menus | Custom implementation with ARIA | 2024-2026 | Simpler, less dependencies for basic patterns |

**Deprecated/outdated:**
- **router.events API**: Removed in App Router, use `usePathname()` instead
- **next/router**: Use `next/navigation` in App Router
- **Custom scroll position tracking**: Use Lenis (already installed) or native `position: sticky`

## Open Questions

Things that couldn't be fully resolved:

1. **Container queries for navigation responsiveness**
   - What we know: Tailwind CSS 4 supports container queries with `@md:` syntax
   - What's unclear: Whether navigation should use container queries or media queries
   - Recommendation: Use media queries (`md:`) for navigation breakpoints. Container queries are for component-level responsiveness; navigation responds to viewport, not parent container

2. **Phone number format for international visitors**
   - What we know: Tel links should use international format `+14342238163`
   - What's unclear: Should we display country code in the phone number text?
   - Recommendation: Display as `(434) 223-8163` for US audience. Add country code `+1` in future internationalization phase if needed

3. **Logo image vs text**
   - What we know: Template currently uses text logo "Town & Country"
   - What's unclear: Will client provide SVG logo in future phases?
   - Recommendation: Build with text logo now. Add `<Image>` component placeholder if logo asset expected in Phase 5 (Local Identity)

## Sources

### Primary (HIGH confidence)
- [Next.js Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages) - Official Next.js 16 documentation
- [Next.js usePathname Hook](https://nextjs.org/docs/app/api-reference/functions/use-pathname) - Official API reference
- [Motion Library Accessibility](https://motion.dev/docs/react-accessibility) - Official Motion docs
- [Motion useReducedMotion Hook](https://motion.dev/docs/react-use-reduced-motion) - Official API docs
- [TPGI: Prevent focused elements from being obscured](https://www.tpgi.com/prevent-focused-elements-from-being-obscured-by-sticky-headers/) - WCAG guidance
- [WebAIM: Skip Navigation Links](https://webaim.org/techniques/skipnav/) - Accessibility authority

### Secondary (MEDIUM confidence)
- [Mobile Navigation Patterns That Work in 2026](https://phone-simulator.com/blog/mobile-navigation-patterns-in-2026) - Recent UX patterns
- [What is a Sticky Header? UX Best Practices & 2026 Design](https://www.parallelhq.com/blog/what-sticky-header) - UX guidance
- [Designing Sticky Menus: UX Guidelines (Smashing Magazine)](https://www.smashingmagazine.com/2023/05/sticky-menus-ux-guidelines/) - Industry patterns
- [Mobile Navigation Accessibility (A11y Matters)](https://a11ymatters.com/pattern/mobile-nav/) - Accessibility patterns
- [Closing a navigation menu in React (DEV Community)](https://dev.to/nicm42/closing-a-navigation-menu-in-react-8ad) - Route change pattern
- [Click-to-call best practices (firt.dev)](https://firt.dev/click-to-call) - Tel link format
- [Website Footer Design Best Practices (Orbit Media)](https://www.orbitmedia.com/blog/website-footer-design-best-practices/) - Footer patterns
- [Tailwind CSS Backdrop Blur Production Guide](https://thelinuxcode.com/tailwind-css-backdrop-blur-a-practical-production-ready-guide/) - Performance guidance

### Tertiary (LOW confidence)
- Various blog posts on navigation patterns - Cross-referenced with official sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed, versions verified in package.json
- Architecture patterns: HIGH - Official Next.js patterns, verified in existing template structure
- Accessibility: HIGH - Sourced from WCAG authorities (WebAIM, TPGI) and official docs
- Click-to-call: MEDIUM - Multiple sources agree on international format, verified with mobile testing guides
- Footer design: MEDIUM - Composite pattern from multiple reputable UX sources
- Pitfalls: HIGH - Documented from official sources and common GitHub issues

**Research date:** 2026-03-02
**Valid until:** 30-60 days (stable stack, but watch for Next.js 16.x point releases)
