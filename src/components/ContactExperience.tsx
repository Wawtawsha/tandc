import {
  HERITAGE_PHONE_DISPLAY,
  HERITAGE_PHONE_TEL,
  SHOWROOM_ADDRESS,
  SHOWROOM_NAME,
} from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { InsideGallery } from "./InsideGallery";
import { MapEmbed } from "./MapEmbed";

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function ContactExperience() {
  return (
    <div id="contact" className="scroll-mt-28">
      <InsideGallery />

      <div
        id="visit-showroom"
        className="scroll-mt-28 border-t border-[rgba(250,247,242,0.12)] bg-[#1C1209] px-4 py-12 md:px-8 md:py-16"
        aria-labelledby="visit-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h1
            id="visit-heading"
            className="font-serif text-4xl font-medium italic leading-tight text-cream md:text-5xl"
          >
            Visit our showroom
          </h1>
          <p className="mt-5 text-base leading-relaxed text-cream/85 md:text-lg">
            Experience the tactile beauty of handcrafted furniture in person.
            Our curators are ready to help you find the next heirloom for your
            home.
          </p>
        </div>
      </div>

      <section
        className="border-t border-[rgba(44,24,16,0.12)] bg-cream pb-16 pt-12 md:pb-20 md:pt-14"
        aria-label="Contact and location"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mt-0 grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
            <div className="space-y-6">
              <div className="rounded-2xl border border-[rgba(44,24,16,0.1)] bg-card p-6 md:p-8">
                <h2 className="font-serif text-xl font-medium text-text md:text-2xl">
                  {SHOWROOM_NAME}
                </h2>
                <ul
                  id="contact-store-hours"
                  className="mt-6 scroll-mt-28 space-y-4 text-sm text-text md:text-base"
                >
                  <li className="flex gap-3">
                    <PinIcon className="mt-0.5 shrink-0 text-muted" />
                    <span className="leading-relaxed">{SHOWROOM_ADDRESS}</span>
                  </li>
                  <li className="flex gap-3">
                    <ClockIcon className="mt-0.5 shrink-0 text-muted" />
                    <span className="leading-relaxed">
                      <span className="block font-medium text-text">
                        Store hours
                      </span>
                      Mon–Fri: 9:00 AM – 6:00 PM
                      <br />
                      Saturday: 10:00 AM – 4:00 PM
                      <br />
                      Sunday: By appointment
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <PhoneIcon className="mt-0.5 shrink-0 text-muted" />
                    <a
                      href={HERITAGE_PHONE_TEL}
                      className="font-medium text-text underline-offset-4 hover:underline"
                    >
                      {HERITAGE_PHONE_DISPLAY}
                    </a>
                  </li>
                </ul>
              </div>

              <MapEmbed address={SHOWROOM_ADDRESS} />
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
