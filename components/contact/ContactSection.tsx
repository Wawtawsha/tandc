// Server Component - Contact section with map, store info, and contact form
import { MapEmbed } from './MapEmbed';
import { ContactForm } from './ContactForm';
import { PhoneLink } from '@/components/analytics/PhoneLink';
import { DirectionsLink } from '@/components/analytics/DirectionsLink';

export function ContactSection() {
  const storeAddress = "5301 Farmville Rd, Farmville, VA 23901";

  return (
    <section
      id="contact"
      aria-label="Contact and location"
      className="bg-surface py-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Visit Our Showroom
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Experience our full collection of La-Z-Boy recliners, sofas, and sectionals,
            plus Ashley&apos;s Next-Gen and Nuvella collections in person.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Map and Store Info */}
          <div className="space-y-6">
            <MapEmbed />

            {/* Store Address */}
            <div className="bg-background rounded-lg p-6 border border-border-subtle">
              <h3
                className="text-xl font-semibold mb-4 text-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Store Information
              </h3>

              <address className="not-italic space-y-4">
                {/* Address */}
                <div>
                  <p className="font-medium text-foreground mb-1">Address</p>
                  <p className="text-muted">
                    5301 Farmville Rd
                    <br />
                    Farmville, VA 23901
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <p className="font-medium text-foreground mb-1">Phone</p>
                  <PhoneLink
                    phone="+14342238163"
                    location="contact_section"
                    className="text-accent hover:text-accent-hover transition-colors"
                    ariaLabel="Call Town and Country Furniture at 4 3 4, 2 2 3, 8 1 6 3"
                  >
                    (434) 223-8163
                  </PhoneLink>
                </div>

                {/* Hours */}
                <div>
                  <p className="font-medium text-foreground mb-2">Hours</p>
                  <ul className="space-y-1 text-muted text-sm">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 5:30 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </address>

              {/* Get Directions Button */}
              <DirectionsLink
                destination={storeAddress}
                location="contact_section"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors mt-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Get Directions
              </DirectionsLink>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-background rounded-lg p-6 lg:p-8 border border-border-subtle">
            <h3
              className="text-xl font-semibold mb-4 text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Send Us a Message
            </h3>
            <p className="text-muted mb-6">
              Have a question about our furniture? Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
