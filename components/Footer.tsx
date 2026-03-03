import Link from 'next/link';
import { Award } from 'lucide-react';
import { PhoneLink } from '@/components/analytics/PhoneLink';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const storeHours = [
    { days: 'Monday - Friday', hours: '9:00 AM - 5:30 PM' },
    { days: 'Saturday', hours: '9:00 AM - 5:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ];

  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer
      className="bg-surface border-t border-border-subtle py-12 mt-auto"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Store Hours */}
          <div>
            <h2
              className="text-lg font-semibold mb-4 text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Store Hours
            </h2>
            <ul className="space-y-2">
              {storeHours.map((schedule, index) => (
                <li key={index}>
                  <div className="font-medium text-foreground text-sm">
                    {schedule.days}
                  </div>
                  <div
                    className={`text-sm ${
                      schedule.hours === 'Closed' ? 'text-muted' : 'text-muted'
                    }`}
                  >
                    {schedule.hours}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2
              className="text-lg font-semibold mb-4 text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Contact Us
            </h2>
            <div className="space-y-3">
              <div>
                <PhoneLink
                  phone="+14342238163"
                  location="footer"
                  className="min-h-[48px] inline-flex items-center text-sm text-muted hover:text-accent transition-colors"
                  ariaLabel="Call Town and Country Furniture at 4 3 4, 2 2 3, 8 1 6 3"
                >
                  (434) 223-8163
                </PhoneLink>
              </div>
              <address className="text-sm text-muted not-italic">
                5301 Farmville Rd
                <br />
                Farmville, VA 23901
              </address>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2
              className="text-lg font-semibold mb-4 text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Quick Links
            </h2>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="min-h-[48px] flex items-center text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partner Badges & Copyright */}
        <div className="border-t border-border-subtle mt-8 pt-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-sm text-muted">Authorized La-Z-Boy Dealer</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-sm text-muted">Ashley Furniture Partner</span>
            </div>
          </div>
          <p className="text-sm text-muted">
            &copy; {currentYear} Town &amp; Country Furniture. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
