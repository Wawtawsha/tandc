import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy Policy | Town & Country",
  description: "How Town & Country collects and uses information.",
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-stone mt-8 max-w-none">
            <h2>Overview</h2>
            <p>
              This Privacy Policy describes how Town &amp; Country Furniture
              (“we”, “us”, “our”) collects, uses, and shares information when
              you visit our website or contact us.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li>
                <strong>Contact information</strong>: such as your name, email
                address, phone number, and any message you submit through our
                inquiry forms.
              </li>
              <li>
                <strong>Basic usage information</strong>: standard technical
                data that may be logged by our hosting providers (for example,
                IP address, browser type, and timestamps).
              </li>
            </ul>

            <h2>How we use information</h2>
            <ul>
              <li>To respond to inquiries and provide customer support.</li>
              <li>To communicate about products, availability, and showroom visits.</li>
              <li>To maintain and improve the website.</li>
            </ul>

            <h2>Sharing</h2>
            <p>
              We do not sell your personal information. We may share information
              with service providers who help us operate our website and
              communications, only as needed to provide those services.
            </p>

            <h2>Retention</h2>
            <p>
              We keep information only as long as needed to respond to your
              request, provide services, and comply with applicable obligations.
            </p>

            <h2>Your choices</h2>
            <p>
              You can request access, correction, or deletion of your
              information by contacting us using the details on our Contact
              section.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about this Privacy Policy, please contact us using
              the website contact form or the phone number listed on our site.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

