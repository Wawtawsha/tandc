import { HeroVideo } from './HeroVideo';

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative min-h-[60vh] md:min-h-[80vh] flex items-center py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left column: Text content and CTAs */}
          <div>
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Quality Furniture for Every Room
            </h1>
            <p className="text-lg md:text-xl text-muted mb-8">
              Farmville, Virginia&apos;s home for La-Z-Boy and Ashley Furniture
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+14342238163"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors text-lg"
                aria-label="Call Town and Country Furniture at 4 3 4, 2 2 3, 8 1 6 3"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=5301+Farmville+Rd+Farmville+VA+23901"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-white transition-colors text-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>

          {/* Right column: Video */}
          <HeroVideo videoId="dQw4w9WgXcQ" title="Ashley Furniture Showroom" />
        </div>
      </div>
    </section>
  );
}
