import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Shipping Policy | Town & Country",
  description: "Local delivery and pickup information.",
};

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="mx-auto max-w-3xl px-4 py-12 text-text md:px-8 md:py-16">
          <Link
            href="/"
            className="text-sm font-semibold text-[rgba(44,24,16,0.65)] underline-offset-4 transition-colors duration-200 ease-in-out hover:text-text"
          >
            ← Back to home
          </Link>

          <h1 className="mt-8 font-serif text-4xl font-medium md:text-5xl">
            Shipping Policy
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-stone mt-8 max-w-none">
            <h2>Local delivery only</h2>
            <p>
              We currently offer <strong>local delivery only</strong>. We do
              not ship orders nationwide.
            </p>

            <h2>Delivery area</h2>
            <p>
              Delivery availability depends on your location. Please inquire
              with your address and the item(s) you’re interested in to confirm
              eligibility and scheduling.
            </p>

            <h2>Delivery fees &amp; scheduling</h2>
            <p>
              Delivery fees and timeframes vary based on distance, item size,
              and service needs. We’ll provide an estimate and available dates
              when you contact us.
            </p>

            <h2>Pickup</h2>
            <p>
              In-store pickup may be available for select items. Contact us to
              coordinate a pickup time.
            </p>

            <h2>Questions</h2>
            <p>
              Use the site inquiry form or call us to ask about delivery,
              pickup, or item availability.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

