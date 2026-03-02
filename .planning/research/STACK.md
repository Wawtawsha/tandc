# Technology Stack

**Project:** Ashley Furniture Local Partner Store Website
**Researched:** 2026-03-02

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x | Full-stack React framework | Best balance of static generation (fast page loads), server components (SEO), and dynamic features. Furniture sites need fast image loading and strong SEO -- Next.js excels at both. Vercel hosting aligns with existing infrastructure (Schmoo LLC). |
| React | 19.x | UI library | Ships with Next.js 15. Component model works well for furniture product cards, collection grids, and promotional sections. |

### Alternative Considered: Astro
| Technology | Version | Purpose | Why Not |
|------------|---------|---------|---------|
| Astro | 5.x | Static site generator | Excellent for content-heavy sites with minimal interactivity. However, if the site eventually needs shopping cart functionality, appointment booking, or dynamic financing calculators, Astro's "islands" architecture adds complexity. Next.js provides a smoother path to interactivity. |

**Counterpoint to my own recommendation:** If this site is purely a branding/marketing site that links to ashleyfurniture.com for actual purchasing, Astro would be the better choice -- faster, simpler, cheaper to host. The decision hinges on whether the local store wants any transactional features on their own domain. For an early-stage startup building a local partner site, starting with Next.js gives you room to grow without a framework migration later.

### Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x | Utility-first CSS | Rapid prototyping, easy to match Ashley's exact brand colors, excellent responsive design utilities. The furniture site needs precise color matching (#F48120 orange, #404041 gray) and Tailwind makes custom color configuration trivial. |

### CMS / Content Management
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Sanity | Latest | Headless CMS | Store staff need to update promotions, featured products, and local events without developer involvement. Sanity's real-time editing, image pipeline (automatic optimization/cropping), and generous free tier make it ideal. |

**Alternative approach:** Start with hardcoded content / MDX files for the MVP. Migrate to Sanity only when the store staff is actually updating content frequently enough to justify the complexity. A CMS with empty content types is worse than well-maintained static files.

### Image Handling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Image | Built-in | Image optimization | Automatic WebP/AVIF conversion, lazy loading, responsive sizing. Furniture sites are image-heavy -- this is critical for performance. Ashley product images are typically high-resolution lifestyle shots. |
| Cloudinary | Free tier | Image CDN/transformation | If product images come from Ashley feeds or are uploaded by staff, Cloudinary handles automatic optimization, cropping, and responsive delivery. Only add if image volume warrants it. |

### Hosting
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | Pro | Hosting & CDN | Aligns with existing infrastructure (Schmoo LLC site). Automatic preview deployments, edge CDN for fast loading, built-in analytics. Furniture shoppers are impatient -- 53% of mobile visitors leave if page takes >3 seconds. |

### Forms & Contact
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Hook Form | 7.x | Form handling | Contact forms, delivery inquiry forms, financing pre-qualification. Lightweight, minimal re-renders. |
| Formspree | Free tier | Form backend | No custom backend needed for contact forms. Spam filtering, email forwarding to store. |
| Calendly | Embed | Appointment booking | Already used for Schmoo LLC. Embeddable scheduling for design consultations. |

### Analytics & Tracking
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Google Analytics 4 | Latest | Traffic analytics | Industry standard. Ashley corporate uses GA -- aligning makes reporting easier. Free. |
| Meta Pixel | Latest | Social ad tracking | Furniture purchase decisions are heavily influenced by Facebook/Instagram advertising. Ashley's corporate strategy uses Meta ads heavily. |
| Schema.org | LocalBusiness | Structured data | Rich search results with hours, location, reviews. Critical for local furniture store discovery in Google. |

### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Framer Motion | 12.x | Animations | Subtle entrance animations for product showcases, hero transitions. Do NOT over-animate -- furniture sites should feel calm and trustworthy, not flashy. |
| Lucide React | Latest | Icons | Clean, consistent icon set for trust signals, navigation, and service features. |
| Embla Carousel | 8.x | Product carousels | Lightweight carousel for featured products and lifestyle image galleries. Accessible and touch-friendly. |

## Typography

| Font | Source | Purpose | Notes |
|------|--------|---------|-------|
| Open Sans | Google Fonts | Headlines / display | Detected as Ashley's web headline font via Brandfetch. Clean, modern, highly readable. |
| Roboto | Google Fonts | Body text | Detected as Ashley's web body font via Brandfetch. Pairs well with Open Sans. |

**Confidence note:** These fonts were detected from the ashleyfurniture.com domain by Brandfetch (last updated Feb 2025). The 2023 rebrand may have introduced different fonts in official brand guidelines that are not publicly available. Verify with Ashley licensee brand assets if possible.

## Color System (Tailwind Configuration)

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ashley: {
          orange: "#F48120",       // Primary brand accent (Pantone 158 C)
          "orange-light": "#F88D2A", // Lighter accent variation (from Brandfetch)
          gray: "#404041",          // Primary text / dark elements (Pantone 446 C)
          "gray-mid": "#626365",    // Secondary text
          cream: "#FAFBFD",         // Light backgrounds
          white: "#FFFFFF",         // Card backgrounds
        },
      },
      fontFamily: {
        sans: ["Open Sans", "system-ui", "sans-serif"],
        body: ["Roboto", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative |
|----------|-------------|-------------|---------------------|
| Framework | Next.js | Astro | See counterpoint above -- depends on transactional needs |
| Framework | Next.js | WordPress + Elementor | Many local furniture stores use WordPress. It works, but it is slow, requires security maintenance, and produces bloated pages. A modern static approach outperforms. |
| Framework | Next.js | Shopify | Shopify is excellent for e-commerce but overkill for a site that primarily drives store visits. Monthly cost adds up without offsetting revenue. |
| Styling | Tailwind CSS | Styled Components | CSS-in-JS adds runtime overhead. Tailwind is zero-runtime and easier to match exact brand colors. |
| CMS | Sanity | WordPress (headless) | Over-complicated for this use case. Sanity is purpose-built for headless content. |
| CMS | Sanity | Contentful | Contentful's free tier is more restrictive. Sanity's pricing is more startup-friendly. |
| Hosting | Vercel | Netlify | Both are excellent. Vercel edges out due to Next.js-native optimization and existing familiarity. |
| Hosting | Vercel | Self-hosted VPS | Adds operational burden (SSL, CDN, deployments) with no benefit for this type of site. |

## Installation

```bash
# Initialize Next.js project
npx create-next-app@latest ashley-local-store --typescript --tailwind --app --src-dir

# Core dependencies
npm install framer-motion embla-carousel-react lucide-react react-hook-form @formspree/react

# Google Fonts (loaded via next/font)
# No npm install needed -- use next/font/google in layout.tsx

# CMS (add when needed, not at start)
# npm install next-sanity @sanity/image-url

# Dev dependencies
npm install -D @types/node @types/react prettier eslint-config-prettier
```

## Google Fonts Setup

```typescript
// src/app/layout.tsx
import { Open_Sans, Roboto } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

## Sources

- Brand colors: [BrandColorCode - Ashley Furniture](https://www.brandcolorcode.com/ashley-furniture) -- Orange #F48120 (Pantone 158 C), Gray #404041 (Pantone 446 C) (HIGH confidence)
- Brand fonts: [Brandfetch - Ashley HomeStore](https://brandfetch.com/ashleyfurniturehomestore.com) -- Open Sans + Roboto detected on domain (MEDIUM confidence -- may be pre-rebrand)
- Mobile traffic data: [Shopify furniture ecommerce analysis](https://www.shopify.com/enterprise/blog/home-furnishing-ecommerce-sites) -- 52.31% mobile, 53% bounce at 3+ seconds (HIGH confidence)
- Logo/identity evolution: [1000Logos - Ashley HomeStore](https://1000logos.net/ashley-furniture-homestore-logo/) (HIGH confidence)
- Market position: Ashley holds ~7.3% of online home furnishing market (HIGH confidence, Shopify source)
