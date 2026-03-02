# Domain Pitfalls

**Domain:** La-Z-Boy Local Dealer Website
**Researched:** 2026-03-02

## Critical Pitfalls

Mistakes that cause rewrites, brand compliance issues, or major business impact.

### Pitfall 1: Brand Identity Confusion (Pre-Refresh vs. Post-Refresh)

**What goes wrong:** Using outdated La-Z-Boy branding elements. The company completed its most extensive brand refresh in 22 years in mid-2025. The old minimalist sans-serif logo, the old color palette, and the old typography (Helvetica Neue family) are all deprecated. Using them signals "this dealer is out of touch."
**Why it happens:** Outdated La-Z-Boy assets are widely available online. Many dealers have not updated their materials. The brand guidelines site (brandguidelines.la-z-boy.com) sections return 404 errors, suggesting the guidelines are being restructured.
**Consequences:** Looks unprofessional and disconnected from the brand. Potential brand compliance issues with La-Z-Boy corporate.
**Prevention:** Obtain current brand assets directly from La-Z-Boy's dealer support team or marketing department. The 2025 refresh introduced: (1) a hand-drawn script logotype, (2) Bookmania + Gotham typography, (3) burnt vermilion and soft celadon green color palette. Verify all brand elements against the current la-z-boy.com website.
**Detection:** If your logo is a clean sans-serif wordmark (the pre-2025 logo), your site uses Helvetica, or your color palette lacks the distinctive warm vermilion and forest greens, you are using outdated branding.

### Pitfall 2: Competing With Corporate E-Commerce

**What goes wrong:** Building a full product catalog with individual product pages, pricing, and add-to-cart functionality on the local dealer site. This puts you in direct competition with la-z-boy.com, which has 3D configurators, WebAR, 29 million+ product configurations, and a team of engineers maintaining it.
**Why it happens:** It seems obvious that a furniture store website should sell furniture online. Many web agencies pitch this. It feels like a feature gap.
**Consequences:** Stale pricing, inventory mismatches, customer frustration when online price does not match in-store, massive maintenance burden, and you will always lose to the corporate site on product breadth, search, and SEO.
**Prevention:** Frame the local website as a "showroom visit driver" and "consultation booking engine," not an e-commerce platform. Category-level showcases with "See In Store" and "Call for Best Price" CTAs. Link to la-z-boy.com for full product details and online purchasing.
**Detection:** If you are spending more than 20% of development effort on product data management, you have fallen into this trap.

### Pitfall 3: Slow Page Load From Unoptimized Images

**What goes wrong:** Furniture sites are image-heavy by nature. Using full-resolution lifestyle photography (often 3000x3000px JPEG) without optimization causes 5-10 second page loads.
**Why it happens:** La-Z-Boy's brand refresh emphasizes rich, sensory imagery. High-resolution source images are uploaded directly without resizing, compressing, or converting to modern formats.
**Consequences:** 53% of mobile visitors leave if a page takes more than 3 seconds. A slow furniture site hemorrhages potential showroom visitors.
**Prevention:** Use the framework's built-in image optimization (Astro Image or Next.js Image component) with automatic WebP/AVIF conversion. Set explicit width/height. Use lazy loading for below-the-fold images. Target sub-3-second page load on 4G mobile.
**Detection:** Run Google PageSpeed Insights. If Largest Contentful Paint (LCP) exceeds 2.5 seconds, you have an image problem.

### Pitfall 4: Ignoring La-Z-Boy's Mixed Reputation

**What goes wrong:** Prominently featuring generic La-Z-Boy corporate trust signals (warranty claims, delivery promises) without addressing the local store's own service commitment. Customers research before buying furniture -- they will find mixed reviews on Trustpilot (764 reviews) and common complaints about warranty fulfillment through third parties like Serveco.
**Why it happens:** Local dealers assume the La-Z-Boy brand name is purely positive. It carries strong recognition but also well-documented customer service complaints, especially around warranty service and third-party warranty providers.
**Consequences:** Informed customers will not trust generic "Limited Lifetime Warranty" claims. Uninformed customers will discover the reviews and become skeptical.
**Prevention:** Lead with LOCAL trust signals: "Family-owned since [year]." "Our delivery team, not a third party." "Walk into our store for warranty service." Differentiate your service from corporate La-Z-Boy. Do NOT hide the La-Z-Boy name -- it still has powerful brand recognition -- but layer your local credibility on top. Be specific about what YOUR store does differently.
**Detection:** If your trust signals section only says "La-Z-Boy Limited Lifetime Warranty" without explaining what YOUR store does to support it, you are not differentiating.

## Moderate Pitfalls

Mistakes that cause delays, technical debt, or reduced effectiveness.

### Pitfall 5: Building CMS Before Content Exists

**What goes wrong:** Setting up an elaborate headless CMS (Sanity, Contentful) with content models for products, promotions, blog posts, team bios, events, testimonials -- then launching with empty sections because nobody has created the content yet.
**Why it happens:** Developers plan for the ideal content strategy. Store staff are busy running a furniture store, not writing website content.
**Prevention:** Start with hardcoded content (markdown files) for the MVP. Move to a CMS only for content that actually needs regular updates. Store hours change maybe twice a year -- that does not require a CMS.
**Detection:** If your CMS has more empty content types than populated ones, you over-engineered.

### Pitfall 6: Desktop-Only Promotional Graphics

**What goes wrong:** Marketing materials from La-Z-Boy are typically landscape-oriented and detail-dense, designed for in-store displays, print, or desktop viewing. Using these directly as mobile hero banners results in tiny, unreadable images.
**Why it happens:** La-Z-Boy's brand refresh is visually rich with sensory color palettes and detailed typography. These designs do not automatically scale down to mobile.
**Prevention:** Create mobile-specific crops of every promotional banner. Use art direction with the HTML picture element or framework-specific responsive image components to serve different crops at different breakpoints. Test every banner on a 375px-wide phone screen.
**Detection:** If you cannot read the headline text or identify the product on a mobile screen, you need a mobile crop.

### Pitfall 7: Financing Misinformation

**What goes wrong:** Advertising financing terms that apply to la-z-boy.com online purchases or other dealers, not to THIS specific store's financing arrangements. La-Z-Boy corporate explicitly states: "La-Z-Boy Incorporated does not handle billing or financing for any of the authorized dealerships. Since these dealers establish their own policies and procedures regarding the terms of the sale, billing, financing, etc."
**Why it happens:** Copying promotional text from the corporate site or from other dealers without verifying it applies to your specific store. Financing providers and terms vary by dealer.
**Prevention:** Verify all financing terms with your actual financing provider. Include required disclaimers. Use "Subject to credit approval" and the specific terms YOUR store offers. Have the store's financing partner review all website claims before publishing.
**Detection:** If your financing text was copied from another source without modification, it needs review.

### Pitfall 8: Neglecting Google Business Profile Consistency

**What goes wrong:** Building a website but not ensuring the information matches the Google Business Profile listing. Hours, address, phone number, and categories on the website do not match Google.
**Why it happens:** Website and Google Business Profile are managed by different people. Initial setup matches but drifts over time.
**Prevention:** Treat the Google Business Profile as the source of truth for NAP (Name, Address, Phone). Match the website to it. Include Schema.org FurnitureStore structured data that exactly mirrors the Google listing. Check quarterly.
**Detection:** Search for your store name on Google. Compare every detail with your website.

## Minor Pitfalls

Mistakes that cause annoyance but are fixable without significant rework.

### Pitfall 9: Missing Social Sharing Metadata

**What goes wrong:** Someone shares a link to your store on Facebook or texts it to a friend. The preview shows no image, a broken title, or a generic favicon.
**Prevention:** Set og:image, og:title, og:description on every page. Use a high-quality showroom or lifestyle image as the default og:image. Test with Facebook's Sharing Debugger and Twitter Card Validator.

### Pitfall 10: No Analytics From Day One

**What goes wrong:** The site launches without Google Analytics or any tracking. Weeks of traffic data are lost. When the store owner asks "how many people visited?" there is no answer.
**Prevention:** GA4 should be configured in the initial deployment. Set up basic events: page views, phone number clicks, direction link clicks, form submissions, "Visit Showroom" button clicks.

### Pitfall 11: Broken Mobile Navigation

**What goes wrong:** Desktop navigation works with category links. Mobile hamburger menu is untested -- links overlap, menu does not close on link tap, or the menu covers the logo.
**Prevention:** Test navigation on real mobile devices (not just browser dev tools). Ensure menu closes on link tap. Ensure the hamburger button is at least 44x44px for touch targets. Test with screen readers.

### Pitfall 12: Font Licensing Issues

**What goes wrong:** Using Bookmania (licensed from Mark Simonson Studio) or Gotham (licensed from Hoefler & Co.) without proper web font licenses. These are commercial fonts with per-pageview or per-domain licensing.
**Why it happens:** The brand uses these fonts, so the dealer assumes they can too. But web font licenses are separate from print or desktop licenses.
**Prevention:** Check if the dealer agreement includes web font licenses for brand typography. If not, use the recommended free alternatives (Libre Baskerville + Inter/DM Sans) that capture the same warm-serif-plus-clean-sans aesthetic. A local dealer using similar-spirit free fonts is more appropriate than unlicensed use of brand fonts.
**Detection:** If you are using @font-face with Bookmania or Gotham files and do not have a web font license, you are at legal risk.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Brand Identity Setup | Using pre-2025 La-Z-Boy assets | Get current assets from dealer support; verify against current la-z-boy.com |
| Color Implementation | Guessing at brand colors without official values | Use approximations clearly marked as such; verify with dealer's brand assets |
| Typography | Using licensed brand fonts without licenses | Check dealer agreement; default to free alternatives if unsure |
| Homepage Hero | Landscape promotional graphics unusable on mobile | Create mobile-specific crops for every banner image |
| Product Showcase | Attempting to build full product catalog | Curate category-level showcases; link to la-z-boy.com for details |
| Navigation | Too many categories (copying corporate site's depth) | Start with 5-6 categories relevant to top sellers |
| Financing Section | Copying corporate financing terms | Verify all terms with YOUR financing provider |
| Trust Signals | Generic corporate warranty claims | Lead with LOCAL service differentiators |
| Image Performance | Unoptimized high-res photography | Use framework image optimization with format conversion |
| Mobile Testing | Testing only in Chrome DevTools | Test on real iPhone and Android devices |
| Analytics | Forgetting tracking until post-launch | GA4 in initial deployment |

## Sources

- La-Z-Boy warranty and financing FAQ: [la-z-boy.com/content/CustomerCare/FAQs](https://www.la-z-boy.com/content/CustomerCare/FAQs) (HIGH confidence)
- La-Z-Boy review data: [Trustpilot (764 reviews)](https://www.trustpilot.com/review/www.la-z-boy.com), [ConsumerAffairs](https://www.consumeraffairs.com/furniture/lazboy.html) (HIGH confidence)
- Brand refresh details: [The Drum](https://www.thedrum.com/news/2025/07/31/how-la-z-boy-made-comfort-cool-again), [GDUSA](https://gdusa.com/la-z-boy-rebrand-by-colle-mcvoy-seeks-to-own-the-idea-of-comfort/) (HIGH confidence)
- Page load impact data: General web performance research (MEDIUM confidence -- applies broadly to all furniture sites)
- Dealer autonomy on financing: [la-z-boy.com FAQ](https://www.la-z-boy.com/content/CustomerCare/FAQs) explicitly states dealers set their own financing terms (HIGH confidence)
