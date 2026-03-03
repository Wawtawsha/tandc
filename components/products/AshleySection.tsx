// Ashley Collections section
// Server Component - displays featured Ashley products in responsive grid

import { ProductCard } from '@/components/products/ProductCard';
import { getAshleyFeatured } from '@/data/products';

export function AshleySection() {
  const products = getAshleyFeatured();

  return (
    <section
      id="sofas"
      aria-labelledby="ashley-heading"
      className="py-16 md:py-20 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <h2
          id="ashley-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Ashley Collections
        </h2>
        <p className="text-center text-muted max-w-3xl mx-auto mb-12">
          From the performance fabrics of Nuvella to the innovative Next-Gen collection.
          Visit our store to experience Ashley quality firsthand.
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={false}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
          >
            Explore Ashley Collections In Store
            <svg
              className="w-5 h-5 ml-2"
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
          </a>
        </div>
      </div>
    </section>
  );
}
