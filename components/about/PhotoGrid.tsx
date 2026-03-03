// PhotoGrid - 3-photo placeholder grid with Get Directions link
// Server Component - no client-side state
import { Camera } from 'lucide-react';
import type { FC } from 'react';

const photoSlots = [
  { label: 'Store Exterior', hue: 70 },
  { label: 'Showroom Interior', hue: 55 },
  { label: 'Our Team', hue: 80 },
] as const;

export const PhotoGrid: FC = () => {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Visit Our Farmville Showroom
        </h2>

        {/* 3-Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {photoSlots.map((slot) => (
            <div
              key={slot.label}
              className="relative aspect-[4/3] rounded-xl overflow-hidden"
              style={{ backgroundColor: `oklch(0.75 0.08 ${slot.hue})` }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <Camera className="w-12 h-12 text-white/60" strokeWidth={1.5} />
                <span className="text-white/70 text-sm font-medium">Photo Coming Soon</span>
                <span className="text-white/50 text-xs">{slot.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Get Directions Link */}
        <div className="text-center">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=5301+Farmville+Rd+Farmville+VA+23901"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-medium"
          >
            Get Directions to Our Store
            <svg
              className="w-4 h-4"
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
};
