# Architecture Patterns

**Domain:** La-Z-Boy Local Dealer Website
**Researched:** 2026-03-02

## Recommended Architecture

A statically generated, content-driven website with minimal JavaScript, optimized for local SEO and mobile performance.

```
                    [Vercel CDN / Edge Network]
                              |
                    [Static Site Generator]
                     (Astro or Next.js SSG)
                              |
              +---------------+---------------+
              |               |               |
        [Page Routes]   [Components]    [Content]
        /             /              /
    index.astro    Header.astro    /content/*.md
    /about         Hero.astro     /data/hours.json
    /recliners     CategoryCard   /data/categories.json
    /sofas         TestimonialCard
    /contact       Map.astro
    /services      ContactForm
    /promotions    Footer.astro
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| Layout | Page shell: header, footer, meta tags, global styles | All page routes |
| Header/Nav | Logo, navigation links, phone CTA, mobile menu | Layout |
| Hero | Full-width lifestyle image, headline, CTA button(s) | Page routes (homepage, category pages) |
| CategoryCard | Product category preview with image, title, description, link | Homepage, possibly category pages |
| TestimonialCard | Customer review with quote, attribution, optional star rating | Homepage, about page |
| TrustStrip | Horizontal bar with trust signals (warranty, financing, delivery, design services) | Homepage, possibly all pages |
| ContactForm | Form fields, validation, submission to Formspree/external | Contact page |
| MapEmbed | Google Maps embed with store location | Contact page |
| PromoBanner | Current sale/promotion announcement | Homepage (top), possibly site-wide |
| Footer | Contact info, nav links, social links, hours, legal | Layout |

### Data Flow

```
Content Sources (Markdown, JSON, images)
         |
         v
  Build Step (Astro/Next.js SSG)
         |
         v
  Static HTML + optimized images + minimal JS
         |
         v
  Vercel CDN (global edge delivery)
         |
         v
  User's browser (fast load, SEO-friendly)

External Services (runtime):
  - Google Maps API --> MapEmbed component
  - Formspree --> ContactForm submissions --> dealer email
  - Calendly --> Design consultation booking (iframe embed)
  - Google Analytics --> Page view tracking
```

## Page Architecture

### Homepage Layout (Top to Bottom)

```
+--------------------------------------------------+
| [Promo Bar: "Spring Sale - Save 30%"]            |  <- Dismissible promo banner
+--------------------------------------------------+
| [LZB Logo] [Store Name]    [Phone] [Nav]         |  <- Dual-brand header
+--------------------------------------------------+
| HERO SECTION                                      |  <- Full-width lifestyle photo
| "Your Comfort Starts Here"                        |  <- Warm, inviting headline
| [Visit Showroom] [Book Design Consultation]       |  <- Two CTAs
+--------------------------------------------------+
| TRUST STRIP                                       |  <- 4 icons in a row
| [Free Design] [Delivery] [Financing] [Warranty]   |
+--------------------------------------------------+
| CATEGORY GRID (2x3 or 3x2)                       |  <- Category cards
| [Recliners] [Sofas] [Sectionals]                  |
| [Lift Chairs] [Chairs] [Accessories]              |
+--------------------------------------------------+
| ABOUT TEASER                                      |  <- Local identity
| "Family-owned since [year]"                       |
| [Store photo] [Brief story] [Meet Our Team ->]    |
+--------------------------------------------------+
| DESIGN SERVICES CALLOUT                           |  <- Differentiator
| "Free In-Home Design Consultations"               |
| [Book Now]                                        |
+--------------------------------------------------+
| TESTIMONIALS                                      |  <- 2-3 customer quotes
| [Quote 1] [Quote 2] [Quote 3]                    |
+--------------------------------------------------+
| FULL-WIDTH CTA                                    |  <- Conversion section
| Branded background, "Find Your Perfect La-Z-Boy"  |
| [Call Us] [Get Directions]                        |
+--------------------------------------------------+
| FOOTER                                            |
| Hours | Address | Phone | Nav | Social | Legal    |
+--------------------------------------------------+
```

### Category Page Layout

```
+--------------------------------------------------+
| [Header - same as homepage]                       |
+--------------------------------------------------+
| CATEGORY HERO                                     |
| Lifestyle image, "Recliners" headline             |
| Brief category description                        |
+--------------------------------------------------+
| FEATURED STYLES (3-6 items)                       |
| [Style card with image + name]                    |
| No prices - "Visit showroom for pricing"          |
+--------------------------------------------------+
| CUSTOMIZATION CALLOUT                             |
| "900+ Fabrics & Leathers"                         |
| [Sample images] [Learn more]                      |
+--------------------------------------------------+
| CTA STRIP                                         |
| "See these in person" / "Book consultation"       |
+--------------------------------------------------+
| [Footer]                                          |
+--------------------------------------------------+
```

## Patterns to Follow

### Pattern 1: Content-Driven Static Generation

**What:** All page content lives in markdown files or JSON data files. The build process generates static HTML.
**When:** Always. This is the core architecture pattern.
**Why:** Maximum performance, zero server costs, excellent SEO, minimal attack surface. The La-Z-Boy corporate site is heavily JS-dependent and frequently fails to load -- a local dealer site must not have this problem.

```
/content/
  categories/
    recliners.md        # frontmatter: title, image, description, order
    sofas.md
    sectionals.md
    chairs.md
    lift-chairs.md
  testimonials/
    testimonial-1.md    # frontmatter: name, date, rating
    testimonial-2.md
  promotions/
    current-sale.md     # frontmatter: title, startDate, endDate, image
/data/
  store.json            # hours, address, phone, email
  navigation.json       # nav structure
```

### Pattern 2: Dual-Brand Header

**What:** Header that displays both La-Z-Boy corporate branding and local store identity.
**When:** Every page.
**Why:** La-Z-Boy logo establishes brand recognition and authorized dealer trust. Local store name establishes community connection and personal service.

```html
<!-- Structure concept -->
<header>
  <!-- Top bar: Brand alignment -->
  <div class="bg-celadon-dark text-white text-sm py-1 text-center">
    Authorized La-Z-Boy Furniture Gallery
  </div>
  <!-- Main header: Local identity -->
  <div class="container flex items-center justify-between py-4">
    <div class="flex items-center gap-4">
      <img src="/lazboy-logo.svg" alt="La-Z-Boy" class="h-8" />
      <span class="font-serif text-xl font-bold">Your Store Name</span>
    </div>
    <nav><!-- Category links --></nav>
    <a href="tel:+1XXXXXXXXXX" class="text-vermilion font-bold">
      (XXX) XXX-XXXX
    </a>
  </div>
</header>
```

### Pattern 3: Trust Signal Strip

**What:** Horizontal bar of local service differentiators with icons.
**When:** Homepage (below hero), optionally repeated on other pages.
**Why:** La-Z-Boy has mixed reviews on warranty fulfillment. Local trust signals (not generic corporate promises) are what convert visitors.

```
[Truck icon]          [Palette icon]        [Credit icon]         [Shield icon]
Free Local            Free Design           Financing             Limited Lifetime
Delivery              Services              Available             Warranty
```

### Pattern 4: Mobile-First Responsive Layout

**What:** Design for mobile viewport first, progressively enhance for larger screens.
**When:** All components, all pages.
**Why:** 60%+ of local business web traffic is mobile. La-Z-Boy's brand refresh emphasizes "intuitive, welcoming" experiences.

```css
/* Mobile first - single column */
.category-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* Tablet - 2 columns */
@media (min-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop - 3 columns */
@media (min-width: 1024px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Pattern 5: Image Optimization Pipeline

**What:** All images processed at build time into multiple sizes and modern formats (WebP, AVIF).
**When:** Every image on the site.
**Why:** Furniture sites are image-heavy. Unoptimized images are the number one performance killer.

```html
<!-- Astro example -->
<Image
  src={heroImage}
  widths={[400, 800, 1200, 1600]}
  formats={['avif', 'webp', 'jpg']}
  alt="Showroom interior with La-Z-Boy recliners and sofas"
  loading="eager"
/>
```

### Pattern 6: Local SEO Structured Data

**What:** Every page includes Schema.org structured data optimized for local search.
**When:** All pages, with special attention to homepage and contact page.
**Why:** Local search is the primary discovery channel for furniture dealers.

```json
{
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "name": "[Store Name] - La-Z-Boy Furniture Gallery",
  "description": "Authorized La-Z-Boy dealer serving [City]. Recliners, sofas, sectionals with free design services.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "...",
    "addressRegion": "...",
    "postalCode": "..."
  },
  "telephone": "...",
  "openingHoursSpecification": [],
  "brand": { "@type": "Brand", "name": "La-Z-Boy" },
  "priceRange": "$$-$$$"
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Replicating Corporate E-Commerce

**What:** Building a product catalog with individual product pages, pricing, add-to-cart functionality.
**Why bad:** Unsustainable content maintenance, competes with corporate site, prices and inventory go stale, development cost is 10x what is needed.
**Instead:** Category-level showcases with "Visit our showroom" and "Call for pricing" CTAs. Link to la-z-boy.com for product details.

### Anti-Pattern 2: Heavy JavaScript SPA

**What:** Building the site as a single-page application with client-side routing.
**Why bad:** Hurts SEO, slower initial load, accessibility issues, unnecessary complexity. The corporate site already suffers from JS-dependency issues.
**Instead:** Static HTML pages with minimal JS for interactive components only.

### Anti-Pattern 3: Generic Stock Photography

**What:** Using only generic furniture stock photos instead of actual showroom imagery.
**Why bad:** Looks identical to every other furniture site. Fails to communicate the local, personal experience.
**Instead:** Mix of La-Z-Boy brand photography (from dealer marketing assets) with actual showroom photos, staff photos, and local imagery.

### Anti-Pattern 4: Carousel/Slider Overload

**What:** Multiple auto-playing carousels for hero, products, testimonials.
**Why bad:** Users rarely interact past the first slide. Auto-play is an accessibility issue. Adds JavaScript weight.
**Instead:** Single strong hero image. Static grids for categories and testimonials.

### Anti-Pattern 5: Buried Contact Information

**What:** Contact info only on the contact page, phone number hidden behind navigation.
**Why bad:** The primary conversion is a phone call or showroom visit. Every extra click loses customers.
**Instead:** Phone number in header (click-to-call on mobile), address in footer of every page, floating phone button on mobile.

## Responsive Breakpoint Strategy

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| Mobile (<640px) | Single column | Full-width images, stacked cards, hamburger nav, tap-to-call, simplified hero |
| Tablet (640-1024px) | 2-column grid | Side-by-side cards, expanded nav, hero with overlay text |
| Desktop (1024px+) | 3-column grid | Full navigation bar, category grid, side-by-side content sections |
| Large (1280px+) | Max-width container | Centered content, generous whitespace, larger imagery |

## Scalability Considerations

| Concern | Current (Launch) | Growth (Year 1) | Scale (Year 2+) |
|---------|-----------------|------------------|------------------|
| Content updates | Developer edits markdown | Developer edits markdown | Consider headless CMS |
| Image volume | ~50-100 optimized images | ~150-200 images | Consider Cloudinary CDN |
| Traffic | Vercel free tier (100GB bandwidth) | Vercel free tier (likely sufficient) | Vercel Pro if exceeded |
| Form submissions | Formspree free tier (50/month) | Formspree paid ($10/month) | Custom backend if needed |

## Sources

- [La-Z-Boy Comfort Studio](https://lazboycomfortstudio.com/) - Dealer site architecture reference (HIGH confidence)
- [Colle McVoy: La-Z-Boy](https://www.collemcvoy.com/work/la-z-boy) - Brand design principles for layout (HIGH confidence)
- Hero section best practices from [LogRocket](https://blog.logrocket.com/ux-design/hero-section-examples-best-practices/) and [Omniconvert](https://www.omniconvert.com/blog/hero-section-examples/) (MEDIUM confidence)
- [McMillanDoolittle: La-Z-Boy Lifestyle Brand](https://www.mcmillandoolittle.com/is-la-z-boy-becoming-a-lifestyle-brand/) - Retail strategy and experiential store concepts (HIGH confidence)
