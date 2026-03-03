// La-Z-Boy Best Sellers section
// Server Component - displays featured La-Z-Boy products in responsive grid

import { ProductCard } from '@/components/products/ProductCard';
import { getLaZBoyBestSellers } from '@/data/products';

export function LaZBoySection() {
  const products = getLaZBoyBestSellers();

  return (
    <section
      id="recliners"
      aria-labelledby="lazboy-heading"
      className="py-16 md:py-20 bg-background"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <h2
          id="lazboy-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          La-Z-Boy Best Sellers
        </h2>
        <p className="text-center text-muted max-w-3xl mx-auto mb-12">
          America&apos;s favorite recliners and furniture, hand-selected for quality and comfort.
          See them in our Farmville showroom.
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
          >
            Visit Us to See the Full La-Z-Boy Collection
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
