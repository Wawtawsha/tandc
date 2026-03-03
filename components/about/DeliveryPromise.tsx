// DeliveryPromise - "Why Buy Local?" trust messaging section
// Server Component - no client-side state
import { Truck, Heart, Users } from 'lucide-react';
import type { FC } from 'react';

const promises = [
  {
    icon: Truck,
    title: 'We Deliver Personally',
    description: 'Our team brings furniture to your Farmville home with care -- not a third-party shipping company you\'ll never see again.',
  },
  {
    icon: Heart,
    title: 'Your Neighbors, Not a Chain',
    description: 'We live in this community. When something needs attention, we\'re a phone call away -- not a 1-800 number.',
  },
  {
    icon: Users,
    title: 'Family-Owned Accountability',
    description: 'The family behind Town & Country stands behind every piece we sell. Your satisfaction is our reputation.',
  },
] as const;

export const DeliveryPromise: FC = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Why Buy Local?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {promises.map((promise) => {
            const Icon = promise.icon;
            return (
              <div key={promise.title} className="text-center">
                <Icon className="w-12 h-12 text-accent mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {promise.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {promise.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
