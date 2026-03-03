import { CategoryLink } from '@/components/analytics/CategoryLink';

const categories = [
  { name: 'Recliners', href: '#recliners', color: 'oklch(0.55 0.12 70)' },
  { name: 'Sofas', href: '#sofas', color: 'oklch(0.50 0.10 55)' },
  { name: 'Sectionals', href: '#sectionals', color: 'oklch(0.58 0.08 80)' },
  { name: 'Lift Chairs', href: '#lift-chairs', color: 'oklch(0.52 0.14 65)' },
  { name: 'Living Room', href: '#living-room', color: 'oklch(0.48 0.10 75)' },
  { name: 'Bedroom', href: '#bedroom', color: 'oklch(0.45 0.08 60)' },
];

export function CategoryGrid() {
  return (
    <section aria-labelledby="categories-heading" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          id="categories-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-14 text-foreground"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <CategoryLink
              key={cat.name}
              href={cat.href}
              categoryName={cat.name}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              style={{ backgroundColor: cat.color }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Category name */}
              <h3 className="absolute bottom-4 left-4 text-white text-lg md:text-xl font-bold drop-shadow-lg">
                {cat.name}
              </h3>

              {/* Arrow indicator */}
              <span className="absolute bottom-4 right-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" aria-hidden="true">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </CategoryLink>
          ))}
        </div>
      </div>
    </section>
  );
}
