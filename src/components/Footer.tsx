import Link from "next/link";

const col2 = [
  { href: "/#contact", label: "Showroom" },
  { href: "/#contact-store-hours", label: "Store hours" },
];

const col3 = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/shipping", label: "Shipping" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.865-5.008-4.865-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const linkFooter =
  "text-xs font-semibold uppercase tracking-wide text-cream/70 transition-colors duration-200 ease-in-out hover:text-cream";

export function Footer() {
  return (
    <footer className="bg-anchor text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="max-w-[14rem] text-xs font-semibold uppercase leading-relaxed tracking-[0.12em] text-cream/90">
              Curating comfort and tradition for modern living.
            </p>
          </div>
          <div>
            <ul className="space-y-2">
              {col2.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkFooter}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {col3.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkFooter}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <section aria-labelledby="footer-newsletter-heading">
            <h3
              id="footer-newsletter-heading"
              className="mb-3 block text-sm font-semibold uppercase leading-snug tracking-[0.12em] text-[#faf7f2]"
            >
              Sign up for our newsletter
            </h3>
            <form
              className="flex overflow-hidden rounded-md border border-[rgba(250,247,242,0.2)] bg-[rgba(250,247,242,0.08)] shadow-sm"
              aria-labelledby="footer-newsletter-heading"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2.5 text-sm text-cream outline-none placeholder:text-cream/50"
              />
              <button
                type="submit"
                className="bg-cream px-4 text-anchor transition-colors duration-200 ease-in-out hover:bg-cream/90"
                aria-label="Subscribe"
              >
                →
              </button>
            </form>
          </section>
        </div>
      </div>

      <div className="border-t border-cream/10 bg-crust">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-8">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-cream/65 sm:text-left">
            © {new Date().getFullYear()} Town &amp; Country Furniture.
          </p>
          <div className="flex items-center gap-4 text-cream/70">
            <a
              href="#"
              className="transition-colors duration-200 ease-in-out hover:text-cream"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="transition-colors duration-200 ease-in-out hover:text-cream"
              aria-label="Pinterest"
            >
              <PinterestIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="transition-colors duration-200 ease-in-out hover:text-cream"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
