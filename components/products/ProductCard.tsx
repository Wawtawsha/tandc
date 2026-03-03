// Shared ProductCard component for both La-Z-Boy and Ashley products
// Server Component - no 'use client' directive
import Image from 'next/image';
import type { Product } from '@/data/products';
import { CTALink } from '@/components/analytics/CTALink';

interface ProductCardProps {
  product: Product;
  priority?: boolean; // true for first card in each section (LCP optimization)
}

// Category-specific placeholder colors matching CategoryGrid pattern
const categoryColors: Record<Product['category'], string> = {
  recliner: 'oklch(0.75 0.08 70)',
  sofa: 'oklch(0.75 0.08 55)',
  sectional: 'oklch(0.75 0.08 80)',
  'lift-chair': 'oklch(0.75 0.08 65)',
  'living-room': 'oklch(0.75 0.08 75)',
  bedroom: 'oklch(0.75 0.08 60)',
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      {/* Image Container - 4:3 aspect ratio */}
      <div className="relative aspect-[4/3] bg-surface overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={priority ? 'eager' : 'lazy'}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: categoryColors[product.category] }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-12 h-12 text-white/60"
            >
              <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
              <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
              <path d="M4 18v2" />
              <path d="M20 18v2" />
            </svg>
            <span className="text-white/70 text-sm font-medium">Photo Coming Soon</span>
          </div>
        )}

        {/* Brand Badge - top right */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-background/90 backdrop-blur-sm rounded text-xs font-medium text-foreground">
          {product.brand === 'lazboy' ? 'La-Z-Boy' : 'Ashley'}
        </div>

        {/* Collection Badge - Ashley only, top left */}
        {product.brand === 'ashley' && product.collection && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-accent/90 backdrop-blur-sm rounded text-xs font-medium text-white">
            {product.collection}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 bg-background flex flex-col">
        <h3
          className="text-lg font-semibold mb-2 text-foreground"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {product.name}
        </h3>

        {product.priceNote && (
          <p className="text-sm text-muted mb-3">{product.priceNote}</p>
        )}

        {/* CTA - "See In Store" not "Buy Now" */}
        <CTALink
          href="#contact"
          ctaText="See In Store"
          location="product_card"
          className="inline-flex items-center justify-center w-full px-4 py-3 min-h-[48px] bg-accent text-white font-medium rounded hover:bg-accent-hover transition-colors mt-auto"
        >
          See In Store
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </CTALink>
      </div>
    </article>
  );
}
