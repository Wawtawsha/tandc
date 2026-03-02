import { Truck, Heart, CreditCard, Award } from 'lucide-react';

const signals = [
  {
    icon: Truck,
    label: 'Local Delivery',
    description: 'We deliver personally to your home',
  },
  {
    icon: Heart,
    label: 'Family Owned',
    description: 'Serving Farmville for generations',
  },
  {
    icon: CreditCard,
    label: 'Financing Available',
    description: 'Flexible payment options',
  },
  {
    icon: Award,
    label: 'Authorized Dealer',
    description: 'Official La-Z-Boy & Ashley partner',
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Why choose Town and Country" className="bg-surface py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {signals.map(({ icon: Icon, label, description }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <Icon className="w-8 h-8 text-accent" aria-hidden="true" strokeWidth={1.5} />
              <h3 className="text-sm md:text-base font-semibold text-foreground">{label}</h3>
              <p className="text-xs md:text-sm text-muted hidden md:block">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
