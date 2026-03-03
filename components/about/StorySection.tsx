// StorySection - Family history narrative with two-column layout
// Server Component - no client-side state
import type { FC } from 'react';

export const StorySection: FC = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Placeholder Image - Left Column */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{ backgroundColor: 'oklch(0.75 0.08 45)' }}
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
          </div>

          {/* Story Content - Right Column */}
          <div className="space-y-4">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Your Farmville Furniture Store
            </h2>

            <p className="text-muted leading-relaxed">
              For over two decades, Town & Country Furniture has been helping Farmville families find the perfect furniture for their homes. We're not a corporate chain — we're your neighbors, right here in Prince Edward County.
            </p>

            <p className="text-muted leading-relaxed">
              As an authorized La-Z-Boy dealer and Ashley Furniture partner, we bring you the quality and selection you deserve with the personal touch you won't find anywhere else. When you shop with us, you're not just another order number — you know our names, and we know yours.
            </p>

            <p className="text-muted leading-relaxed">
              Whether you're furnishing your first apartment or redesigning your family room, we're here to help you find exactly what you're looking for. Stop by our showroom on Farmville Road and experience the difference a locally-owned furniture store makes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
