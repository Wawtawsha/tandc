# Phase 4: Product Showcase - Research

**Researched:** 2026-03-02
**Domain:** Next.js Image optimization, dual-brand product showcases, configurable product data
**Confidence:** HIGH

## Summary

Phase 4 implements product showcases for a local furniture store carrying two brands (La-Z-Boy and Ashley). The primary technical challenges are distinct from e-commerce product grids:

1. **Dual-brand presentation without visual clash**: Store-brand-primary design system (already established in Phase 1) allows showcasing both brands without color conflicts. Each brand section uses typography, imagery, and subtle accent variations rather than competing color schemes.

2. **Image optimization for furniture photography**: Furniture images are large (often 2000x2000+), making Next.js Image component critical. WebP/AVIF formats reduce file size 50-70%, responsive `sizes` prop prevents over-downloading, and blur placeholders improve perceived performance. With `sharp` already installed, static imports get automatic blur data.

3. **Configurable data without CMS overhead**: TypeScript data files provide type safety, auto-complete, and refactoring support superior to JSON. Pattern: `src/data/products.ts` exports typed arrays, components import and map over them. Changes require rebuild but that's acceptable for v1 where products change monthly, not hourly.

4. **Video embeds already solved**: Phase 3 installed `react-lite-youtube-embed`. Reuse the same HeroVideo component pattern for product marketing videos (self-gliding chair demos, sofa comparisons). Each video is ~2KB facade until clicked.

5. **LCP measurement**: Lighthouse's mobile 4G simulation (Slow 4G, 4x CPU throttling) is the standard. Target: LCP < 3 seconds. Use `loading="eager"` or `fetchPriority="high"` on first product image, lazy-load rest. Measure with Chrome DevTools Lighthouse panel.

**Primary recommendation:** Use Next.js Image with static imports for product photos (automatic blur), TypeScript data file for product catalog with typed Product interface, reuse HeroVideo component from Phase 3 for marketing videos, and implement brand-specific sections with shared ProductCard component that accepts brand prop for subtle styling variations.

## Standard Stack

The established libraries/tools for product showcase pages in Next.js 16:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next/image | 16.1.6 | Image optimization component | Built-in Next.js, automatic WebP/AVIF, srcset generation, blur placeholders |
| sharp | 0.34.5 | Image processing (already installed) | Required by Next.js for local image optimization, generates blur data automatically |
| react-lite-youtube-embed | 3.5.1 | Video facades (already installed) | Reuse from Phase 3 for marketing videos |
| TypeScript | 5.x | Type-safe data files | Better DX than JSON: autocomplete, refactoring, validation at compile time |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| plaiceholder | 3.x | Blur placeholder generation | Only if using remote images that need blur; skip if using static imports |
| zod | 3.x | Runtime validation | Only if accepting user-submitted product data; overkill for static catalog |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| TypeScript data files | JSON with JSON Schema | JSON requires separate validation, no autocomplete, harder refactoring |
| Next.js Image | Cloudinary/imgix | External service adds cost, latency, complexity; Next.js built-in is sufficient |
| Static imports | Remote URLs with remotePatterns | Remote requires manual blur data, width/height props; static is simpler |
| Shared ProductCard | Brand-specific components | DRY violation, maintenance burden, harder to keep styling consistent |

**Installation:**
```bash
# All dependencies already installed from Phase 1-3
# No new packages needed for Phase 4
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── (main)/
│       └── page.tsx              # Homepage (imports product sections)
├── components/
│   ├── hero/
│   │   └── HeroVideo.tsx         # Reuse from Phase 3
│   ├── products/
│   │   ├── ProductCard.tsx       # Shared card component
│   │   ├── LaZBoySection.tsx     # La-Z-Boy best sellers
│   │   ├── AshleySection.tsx     # Ashley collections
│   │   └── VideoShowcase.tsx     # Marketing video grid
│   └── ui/
│       └── SectionHeading.tsx    # Consistent section headers
└── data/
    └── products.ts                # Typed product catalog
public/
└── images/
    └── products/
        ├── lazboy/                # La-Z-Boy product photos
        │   ├── recliner-01.jpg
        │   └── recliner-02.jpg
        └── ashley/                # Ashley product photos
            ├── sofa-nuvella.jpg
            └── sectional-next-gen.jpg
```

### Pattern 1: TypeScript Product Data File
**What:** Typed product catalog with brand, category, pricing metadata
**When to use:** Any configurable product showcase without CMS
**Example:**
```typescript
// src/data/products.ts
// Source: Next.js best practices - static data patterns
export interface Product {
  id: string;                    // Unique identifier (can match SKU)
  brand: 'lazboy' | 'ashley';    // Brand discriminator
  name: string;                  // Product name
  category: 'recliner' | 'sofa' | 'sectional' | 'lift-chair' | 'living-room' | 'bedroom';
  image: string;                 // Path to image in /public or static import
  imageAlt: string;              // Descriptive alt text
  featured: boolean;             // Show in featured section
  bestseller?: boolean;          // La-Z-Boy best sellers flag
  collection?: string;           // Ashley collection name (Next-Gen, Nuvella)
  price?: number;                // Optional display price
  priceNote?: string;            // "Starting at", "See in store for pricing"
}

export const products: Product[] = [
  {
    id: 'lazboy-recliner-pinnacle',
    brand: 'lazboy',
    name: 'Pinnacle Recliner',
    category: 'recliner',
    image: '/images/products/lazboy/recliner-pinnacle.jpg',
    imageAlt: 'La-Z-Boy Pinnacle recliner in brown leather',
    featured: true,
    bestseller: true,
    priceNote: 'See in store for pricing',
  },
  {
    id: 'ashley-nuvella-sofa',
    brand: 'ashley',
    name: 'Nuvella Performance Sofa',
    category: 'sofa',
    image: '/images/products/ashley/sofa-nuvella.jpg',
    imageAlt: 'Ashley Nuvella performance fabric sofa in gray',
    featured: true,
    collection: 'Nuvella',
    priceNote: 'Starting at $899',
  },
];

// Helper functions for filtering
export const getLaZBoyBestSellers = () =>
  products.filter((p) => p.brand === 'lazboy' && p.bestseller);

export const getAshleyCollections = (collection?: string) =>
  products.filter((p) =>
    p.brand === 'ashley' && (collection ? p.collection === collection : true)
  );

export const getFeaturedProducts = () =>
  products.filter((p) => p.featured);
```

### Pattern 2: Optimized Product Card Component
**What:** Reusable card with Next.js Image, brand-aware styling, "See In Store" CTA
**When to use:** All product displays (La-Z-Boy, Ashley, cross-brand featured)
**Example:**
```typescript
// components/products/ProductCard.tsx
// Source: Next.js Image docs - responsive fill pattern
import Image from 'next/image';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  priority?: boolean; // For LCP image (first card)
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      {/* Image Container - Aspect Ratio 4:3 for furniture */}
      <div className="relative aspect-[4/3] bg-surface overflow-hidden">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          // First product card should load eagerly for LCP
          loading={priority ? 'eager' : 'lazy'}
          // Static imports get automatic blur, remote images need blurDataURL
          placeholder="blur"
          blurDataURL={product.blurDataURL} // Optional: only needed for remote images
        />

        {/* Brand Badge - Subtle, not competing with product */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-background/90 backdrop-blur-sm rounded text-xs font-medium">
          {product.brand === 'lazboy' ? 'La-Z-Boy' : 'Ashley'}
        </div>

        {/* Collection Badge for Ashley */}
        {product.collection && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-accent/90 backdrop-blur-sm rounded text-xs font-medium text-white">
            {product.collection}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 bg-background">
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {product.name}
        </h3>

        {product.priceNote && (
          <p className="text-sm text-muted mb-3">{product.priceNote}</p>
        )}

        {/* CTA - "See In Store" not "Buy Now" */}
        <a
          href={`#contact`} // Scroll to contact form
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-accent text-white font-medium rounded hover:bg-accent-hover transition-colors"
        >
          See In Store
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  );
}
```

### Pattern 3: Brand Section with Grid Layout
**What:** Section component for La-Z-Boy or Ashley products, responsive grid
**When to use:** Homepage sections, brand-specific showcase pages
**Example:**
```typescript
// components/products/LaZBoySection.tsx
// Source: Tailwind CSS grid patterns - responsive product grids
import { ProductCard } from './ProductCard';
import { getLaZBoyBestSellers } from '@/data/products';

export function LaZBoySection() {
  const bestSellers = getLaZBoyBestSellers();

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">La-Z-Boy Best Sellers</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            America's most comfortable recliners and furniture, hand-selected for quality and comfort.
          </p>
        </div>

        {/* Product Grid - Responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              // First card is priority for LCP
              priority={index === 0}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <a
            href="/lazboy" // Future: dedicated La-Z-Boy page
            className="inline-flex items-center text-accent font-semibold hover:underline"
          >
            View All La-Z-Boy Products
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
```

### Pattern 4: Marketing Video Showcase
**What:** Reuse HeroVideo from Phase 3 for product marketing videos
**When to use:** Ashley/La-Z-Boy product demos, feature showcases
**Example:**
```typescript
// components/products/VideoShowcase.tsx
// Source: Phase 3 HeroVideo component pattern
import { HeroVideo } from '@/components/hero/HeroVideo';

interface VideoItem {
  id: string;
  title: string;
  videoId: string; // YouTube video ID
  brand: 'lazboy' | 'ashley' | 'both';
}

const videos: VideoItem[] = [
  {
    id: 'lazboy-self-gliding',
    title: 'La-Z-Boy Self-Gliding Chair Technology',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube ID
    brand: 'lazboy',
  },
  {
    id: 'ashley-sofa-comparison',
    title: 'Ashley Sofa Fabrics: Nuvella vs Traditional',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube ID
    brand: 'ashley',
  },
  {
    id: 'ashley-outdoor',
    title: 'Ashley Outdoor Furniture Collection',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube ID
    brand: 'ashley',
  },
];

export function VideoShowcase() {
  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">See Our Furniture In Action</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Watch product demonstrations and learn about the features that make our furniture exceptional.
          </p>
        </div>

        {/* Video Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col">
              <h3 className="text-xl font-semibold mb-4">{video.title}</h3>
              {/* Reuse HeroVideo component from Phase 3 */}
              <HeroVideo videoId={video.videoId} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Pattern 5: Image Placeholder Strategy
**What:** Graceful degradation when product photos aren't available yet
**When to use:** Initial launch, adding new products before photography
**Example:**
```typescript
// Pattern A: OKLCH color backgrounds (already used in Phase 3 CategoryGrid)
// components/products/ProductCardPlaceholder.tsx
export function ProductCardPlaceholder({ product }: { product: Product }) {
  // Use deterministic color based on category
  const categoryColors = {
    recliner: 'oklch(75% 0.12 150)',    // Muted teal
    sofa: 'oklch(75% 0.12 200)',        // Muted blue
    sectional: 'oklch(75% 0.12 250)',   // Muted purple
    'lift-chair': 'oklch(75% 0.12 100)', // Muted yellow-green
    'living-room': 'oklch(75% 0.12 50)', // Muted orange
    bedroom: 'oklch(75% 0.12 300)',     // Muted magenta
  };

  return (
    <article className="group relative flex flex-col rounded-lg overflow-hidden shadow-md">
      {/* Color placeholder - aspect ratio preserved */}
      <div
        className="relative aspect-[4/3] flex items-center justify-center"
        style={{ backgroundColor: categoryColors[product.category] }}
      >
        <div className="text-center text-white/80">
          <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm font-medium">Photo Coming Soon</p>
        </div>
      </div>

      {/* Same content structure as ProductCard */}
      <div className="flex-1 p-4 bg-background">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        {product.priceNote && <p className="text-sm text-muted mb-3">{product.priceNote}</p>}
        <a href="#contact" className="inline-flex items-center justify-center w-full px-4 py-2 bg-accent text-white font-medium rounded hover:bg-accent-hover transition-colors">
          See In Store
        </a>
      </div>
    </article>
  );
}
```

### Anti-Patterns to Avoid
- **E-commerce "Add to Cart" patterns**: This is a local store driving in-store visits, not online sales. Use "See In Store", "Visit Us", "Call for Pricing" CTAs.
- **Brand color competition**: Don't use La-Z-Boy red and Ashley brown simultaneously. Store-brand-primary design system (neutral base, single accent) prevents clashing.
- **Missing `sizes` prop on product images**: Without `sizes`, Next.js assumes 100vw and generates unnecessarily large images. Use `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw` for 3-column grids.
- **All images with `priority`**: Only first visible product image should use `priority` or `loading="eager"`. Rest should lazy-load to optimize LCP.
- **Remote images without blur data**: If using URLs instead of static imports, you must provide `blurDataURL` manually (via plaiceholder or inline data URI). Static imports get this automatically.
- **Separate components per brand**: Don't make LaZBoyProductCard and AshleyProductCard. Use shared ProductCard with `product.brand` prop for subtle variations.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image format conversion (WebP/AVIF) | Custom sharp scripts | Next.js Image component | Automatic format negotiation via Accept header, caching, srcset generation |
| Blur placeholder generation | Custom canvas blur | Static imports (automatic) or plaiceholder | Static imports get blur data free, plaiceholder handles edge cases for remote images |
| Responsive image sizing | Manual srcset/picture | Next.js Image `sizes` prop | Declarative breakpoints, automatic srcset generation at build time |
| Video lazy loading | Intersection Observer + iframe inject | react-lite-youtube-embed (already installed) | Handles thumbnail quality, accessibility, params encoding |
| TypeScript validation for data | Runtime JSON.parse checks | TypeScript interfaces + compile-time checks | Catch errors at build time, autocomplete in editor, refactoring support |
| Product filtering/search | Custom array filter logic | Helper functions in data file | Centralized, typed, reusable across components |

**Key insight:** Next.js Image optimization is not just "resize image". It negotiates format (WebP/AVIF) based on browser Accept header, generates blur placeholders for static imports, creates responsive srcset at 8+ sizes, caches optimized images with immutable headers, and serves from /_next/image with proper Cache-Control. Recreating this is 1000+ lines of sharp/cache logic.

## Common Pitfalls

### Pitfall 1: Missing `sizes` Prop Wastes Bandwidth
**What goes wrong:** Product images download at full screen width even in 3-column grid
**Why it happens:** Next.js defaults to `sizes="100vw"` when prop is omitted
**How to avoid:** Always provide `sizes` prop matching actual rendered size. For 3-column grid: `"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
**Warning signs:**
- Lighthouse "Properly size images" warning
- Network tab shows 1920w images loading on 640w viewport
- Mobile users on 4G have slow product grid loading

### Pitfall 2: All Products Load Eagerly, Hurting LCP
**What goes wrong:** Homepage LCP is 5+ seconds because 12 product images load simultaneously
**Why it happens:** Missing `loading="lazy"` or setting `priority` on all images
**How to avoid:** Only first visible image gets `loading="eager"` or `fetchPriority="high"`. Rest are `loading="lazy"` (default).
**Warning signs:**
- Lighthouse LCP > 3s
- Network waterfall shows 12+ images loading before hero paint
- User sees blank grid during initial render

### Pitfall 3: Remote Images Without Blur Data Cause Layout Shift
**What goes wrong:** Products pop in without smooth blur-up effect
**Why it happens:** Remote image URLs don't get automatic `blurDataURL` like static imports
**How to avoid:** Either use static imports (`import reclineImg from '@/public/images/recliner.jpg'`) or generate blur data with plaiceholder/sharp for remote URLs
**Warning signs:**
- CLS (Cumulative Layout Shift) score > 0.1
- No blur animation on image load
- Images appear abruptly instead of fading in

### Pitfall 4: TypeScript Data File Not Imported Correctly
**What goes wrong:** Products array is empty or undefined at runtime
**Why it happens:** Importing JSON-style instead of ES module, or circular dependency
**How to avoid:** Use `export const products: Product[] = [...]` in data file, import with `import { products } from '@/data/products'`. Avoid importing components in data file.
**Warning signs:**
- Products section renders but shows no cards
- TypeScript error: "Cannot find module '@/data/products'"
- Runtime error: "products.map is not a function"

### Pitfall 5: Brand Sections Visually Clash
**What goes wrong:** La-Z-Boy section has red accents, Ashley section has brown, result is chaotic
**Why it happens:** Trying to use brand colors instead of store-brand-primary design system
**How to avoid:** Use store's accent color for all CTAs, brand name in typography/badge only. Subtle variations (typography weight, badge placement) not color.
**Warning signs:**
- Designer feedback: "looks like two different websites"
- Accessibility contrast issues with brand colors
- Buttons have inconsistent styling between sections

### Pitfall 6: Hardcoded Product Data in Components
**What goes wrong:** Updating featured products requires editing React components
**Why it happens:** Defining product arrays directly in component files
**How to avoid:** Always centralize product data in `src/data/products.ts`. Components import and filter, never define products.
**Warning signs:**
- Changing featured products requires changing component code
- Duplicate product definitions across multiple files
- No single source of truth for product catalog

### Pitfall 7: Missing Alt Text on Product Images
**What goes wrong:** Screen readers can't describe products, SEO suffers
**Why it happens:** Using product name as alt text without descriptive detail
**How to avoid:** Alt text should describe image content, not just product name. "La-Z-Boy Pinnacle recliner in brown leather" not "Pinnacle Recliner".
**Warning signs:**
- Lighthouse accessibility score flags missing/poor alt text
- Alt text is same as product name
- Generic alt like "product image"

## Code Examples

Verified patterns from official sources:

### Next.js Image with Static Import (Automatic Blur)
```typescript
// Source: Next.js 16.1.6 docs - https://nextjs.org/docs/app/getting-started/images
import Image from 'next/image';
import reclineImg from '@/public/images/products/lazboy/recliner-pinnacle.jpg';

export function FeaturedProduct() {
  return (
    <div className="relative aspect-[4/3]">
      <Image
        src={reclineImg}
        alt="La-Z-Boy Pinnacle recliner in brown leather with extended footrest"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        placeholder="blur" // Automatic from static import
        // blurDataURL automatically generated by Next.js
        loading="eager" // Only for LCP image
      />
    </div>
  );
}
```

### Responsive Product Grid with CSS Grid
```typescript
// Source: Tailwind CSS official docs - responsive grids
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          // First card loads eagerly for LCP optimization
          priority={index === 0}
        />
      ))}
    </div>
  );
}
```

### TypeScript Product Interface with Brand Discrimination
```typescript
// Source: TypeScript handbook - discriminated unions
export interface BaseProduct {
  id: string;
  brand: 'lazboy' | 'ashley';
  name: string;
  category: 'recliner' | 'sofa' | 'sectional' | 'lift-chair' | 'living-room' | 'bedroom';
  image: string;
  imageAlt: string;
  featured: boolean;
  priceNote?: string;
}

// La-Z-Boy specific fields
export interface LaZBoyProduct extends BaseProduct {
  brand: 'lazboy';
  bestseller?: boolean;
}

// Ashley specific fields
export interface AshleyProduct extends BaseProduct {
  brand: 'ashley';
  collection?: 'Next-Gen' | 'Nuvella' | 'Outdoor';
}

// Discriminated union
export type Product = LaZBoyProduct | AshleyProduct;

// Type-safe filtering
export function getLaZBoyProducts(products: Product[]): LaZBoyProduct[] {
  return products.filter((p): p is LaZBoyProduct => p.brand === 'lazboy');
}
```

### Generating Blur Placeholder with Sharp (for remote images)
```typescript
// Source: https://blog.olivierlarose.com/articles/placeholder-guide-using-next-image
// Only needed if using remote images instead of static imports
import sharp from 'sharp';
import { promises as fs } from 'fs';

async function getBase64ImageUrl(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  const blurredBuffer = await sharp(Buffer.from(buffer))
    .resize(10) // Very small, will be enlarged and blurred
    .toBuffer();

  const base64 = blurredBuffer.toString('base64');
  return `data:image/jpeg;base64,${base64}`;
}

// Usage in getStaticProps or similar
export async function generateProductData() {
  const products = await Promise.all(
    rawProducts.map(async (product) => ({
      ...product,
      blurDataURL: await getBase64ImageUrl(product.image),
    }))
  );
  return products;
}
```

### Conditional Image vs Placeholder Rendering
```typescript
// Source: React conditional rendering patterns
import Image from 'next/image';
import { Product } from '@/data/products';

export function ProductCard({ product }: { product: Product }) {
  const hasImage = product.image && !product.image.includes('placeholder');

  return (
    <article className="rounded-lg overflow-hidden shadow-md">
      <div className="relative aspect-[4/3]">
        {hasImage ? (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            placeholder="blur"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: 'oklch(75% 0.12 150)' }}
          >
            <div className="text-center text-white/80">
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium">Photo Coming Soon</p>
            </div>
          </div>
        )}
      </div>
      {/* Card content */}
    </article>
  );
}
```

### LCP Optimization with fetchPriority
```typescript
// Source: MDN Web Docs - fetchPriority
import Image from 'next/image';

export function HeroProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {products.map((product, index) => (
        <div key={product.id} className="relative aspect-[4/3]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="33vw"
            // First image is LCP candidate
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            placeholder="blur"
          />
        </div>
      ))}
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual srcset generation | Next.js Image `sizes` prop | Next.js 10 (2020), stabilized 13 (2022) | Automatic responsive images, 40-60% bandwidth savings |
| JSON product data | TypeScript data files | TypeScript 3.7+ (2019), mainstream 2023+ | Compile-time validation, autocomplete, refactoring support |
| Remote image URLs only | Static imports with automatic blur | Next.js 11 (2021) | Zero-config blur placeholders, better CLS scores |
| WebP only | AVIF + WebP fallback | Next.js 12 (2021), AVIF mainstream 2024+ | 20% smaller than WebP, graceful degradation |
| `priority` prop | `preload` prop + `fetchPriority` | Next.js 16 (2026) | Clearer semantics, better browser hints |
| plaiceholder for all images | Static imports (automatic) + plaiceholder (remote only) | Next.js 13+ optimization (2023) | Simpler setup, faster builds |

**Deprecated/outdated:**
- **`priority` prop**: Deprecated in Next.js 16 in favor of `preload` prop and `fetchPriority` attribute. Use `loading="eager"` and `fetchPriority="high"` for LCP images.
- **Manual blur data generation for static images**: Next.js automatically generates `blurDataURL` for statically imported JPG, PNG, WebP, AVIF. Only remote images need manual blur data.
- **JSON product catalogs without types**: TypeScript data files provide superior DX (autocomplete, refactoring) with no runtime cost. JSON requires separate schema validation.
- **`layout` prop**: Removed in Next.js 13. Use `fill` prop with parent `position: relative` for container-filling images.
- **E-commerce product schemas for local stores**: Schema.org Product markup is for online sales. Local stores should use LocalBusiness schema with address, phone, hours instead.

## Open Questions

Things that couldn't be fully resolved:

1. **Actual product inventory and photography**
   - What we know: Store needs client input on which La-Z-Boy models are bestsellers, which Ashley collections to feature
   - What's unclear: Whether professional product photography exists, image dimensions, whether supplier (La-Z-Boy/Ashley) provides stock photos
   - Recommendation: Start with placeholder strategy (OKLCH color backgrounds), add images incrementally as photography becomes available. Design for aspect-[4/3] (standard furniture photography ratio).

2. **Product pricing display policy**
   - What we know: Local furniture stores often don't display prices online (MAP pricing agreements, negotiation flexibility)
   - What's unclear: Client's policy on showing prices vs "See in store for pricing" vs "Starting at $X"
   - Recommendation: Make `priceNote` field optional in Product interface, allow per-product decisions. Default to "See in store for pricing" if uncertain.

3. **Video source and ownership**
   - What we know: Marketing videos likely come from Ashley/La-Z-Boy official YouTube channels
   - What's unclear: Whether store has rights to embed manufacturer videos, whether they want custom videos shot in-store
   - Recommendation: Use manufacturer videos (publicly available, already optimized, authoritative). Phase 4 can embed, Phase 5+ can add custom in-store tours.

4. **Best sellers vs featured products logic**
   - What we know: La-Z-Boy "best sellers" and Ashley "collections" are different categorization schemes
   - What's unclear: How store determines "best sellers" (sales data, margin, inventory, subjective quality)
   - Recommendation: Make both `bestseller` and `featured` boolean flags. Client can mark products via either criterion, filters handle both cases.

5. **Remote image optimization setup**
   - What we know: Next.js requires `remotePatterns` configuration for external image URLs
   - What's unclear: Whether product images will be on external CDN (La-Z-Boy/Ashley assets) or local `/public` directory
   - Recommendation: Start with static imports from `/public` (simplest, automatic blur). If using remote URLs, add `remotePatterns` for specific hostnames only (security).

## Sources

### Primary (HIGH confidence)
- [Next.js 16.1.6 Official Docs - Image Component](https://nextjs.org/docs/app/api-reference/components/image) - Updated Feb 27, 2026
- [Next.js 16.1.6 Official Docs - Image Optimization](https://nextjs.org/docs/app/getting-started/images) - Updated Feb 27, 2026
- [MDN Web Docs - fetchPriority](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/fetchPriority)
- [Google Chrome Lighthouse - Throttling Documentation](https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md)
- [TypeScript Handbook - Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)

### Secondary (MEDIUM confidence)
- [Olivier Larose - Complete Guide on Placeholder using Next.js Image](https://blog.olivierlarose.com/articles/placeholder-guide-using-next-image) - 2024 tutorial
- [Defacto - Color Placeholders for Loading Images](https://en.defacto.nl/blog/color-placeholders-for-loading-images/) - CSS background strategies
- [Sling Academy - Next.js: Read and Display Data from a Local JSON File](https://www.slingacademy.com/article/next-js-read-and-display-data-from-a-local-json-file/) - Data file patterns
- [Contentful - How to optimize images with the Next.js Image Component](https://www.contentful.com/blog/nextjs-image-component/)
- [Lightspeed - SKU Numbers Explained: What Retailers Need to Know](https://www.lightspeedhq.com/blog/sku-numbers/) - Furniture product data modeling
- [Zolak - Furniture eCommerce 2026: Trends, Challenges](https://zolak.tech/blog/furniture-ecommerce) - Industry omnichannel patterns
- [Shopware - Furniture ecommerce 2026: trends, growth & online furniture sales](https://www.shopware.com/en/news/furniture-ecommerce/) - "See In Store" and local integration patterns

### Tertiary (LOW confidence - WebSearch only, marked for validation)
- Various furniture ecommerce blog posts - general UX patterns for dual-brand stores
- PureCode AI Next.js product card templates - code examples, not authoritative on architecture
- Bootstrap placeholders documentation - loading state patterns, not Next.js specific

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed (Next.js Image, sharp, react-lite-youtube-embed), official Next.js 16.1.6 docs from Feb 2026
- Architecture: HIGH - Patterns verified from Next.js official docs, TypeScript handbook, existing Phase 3 patterns (HeroVideo reuse)
- Image optimization: HIGH - Next.js Image API fully documented, blur placeholders verified via static import documentation, sharp already in package.json
- Product data structure: MEDIUM - TypeScript data files are best practice but specific Product interface tailored to furniture domain based on research
- Pitfalls: HIGH - Next.js Image pitfalls (missing sizes, all priority, remote blur data) verified via official docs and common GitHub issues
- LCP measurement: HIGH - Lighthouse throttling documented officially, mobile 4G simulation is standard

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (30 days - Next.js 16.x is stable, image optimization patterns unlikely to change)
