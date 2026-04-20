import Image from "next/image";
import Link from "next/link";
import { BrowseOurBrands } from "@/components/BrowseOurBrands";
import {
  ASHLEY_ITEMS,
  LAZY_BOY_ITEMS,
} from "@/lib/featured-products";
import { FeaturedProduct } from "@/lib/types";

function ProductCard(product: FeaturedProduct) {
  const { slug, imageSrc, title, priceLine, cornerBrand, badgeLeft, badgeRight } =
    product;

  return (
    <Link
      href={`/inquire/${slug}`}
      className="block w-full max-w-[320px] transition-transform duration-200 ease-in-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1810]"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[rgba(44,24,16,0.1)] bg-card shadow-sm transition-all duration-200 ease-in-out hover:border-[rgba(44,24,16,0.25)] hover:shadow-md">
        <div className="relative aspect-[4/3] bg-cream">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 320px, 90vw"
          />
          {cornerBrand ? (
            <span className="absolute right-2 top-2 rounded bg-card/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text shadow-sm">
              {cornerBrand}
            </span>
          ) : null}
          {badgeLeft ? (
            <span className="absolute left-2 top-2 rounded-md bg-card/95 px-2 py-0.5 text-[10px] font-semibold text-text shadow-sm">
              {badgeLeft}
            </span>
          ) : null}
          {badgeRight ? (
            <span className="absolute right-2 top-2 rounded-md bg-card/95 px-2 py-0.5 text-[10px] font-semibold text-text shadow-sm">
              {badgeRight}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-4 md:p-5">
          <h3 className="font-serif text-lg font-semibold leading-snug text-text">
            {title}
          </h3>
          <p className="mt-1.5 text-sm text-muted">{priceLine}</p>
          <span className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[#2C1810] px-4 py-3 text-center text-sm font-semibold text-cream transition-colors duration-200 ease-in-out hover:bg-[#150d08]">
            View details
          </span>
        </div>
      </article>
    </Link>
  );
}

const linkClass =
  "inline-flex items-center gap-1 text-sm font-semibold text-[rgba(44,24,16,0.7)] underline-offset-4 transition-colors duration-200 ease-in-out hover:text-text";

export function LazyBoyFeatured() {
  return (
    <section
      className="border-t border-[rgba(44,24,16,0.12)] bg-cream py-16 md:py-24"
      aria-labelledby="lazyboy-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="lazyboy-heading"
            className="scroll-mt-28 font-serif text-3xl font-semibold text-text md:text-4xl"
          >
            La-Z-Boy Best Sellers
          </h2>
          <p className="mt-4 text-muted">
            America&apos;s favorite recliners and furniture, hand-selected for
            quality and comfort. See them in our Farmville showroom.
          </p>
        </header>
        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {LAZY_BOY_ITEMS.map((item) => (
            <ProductCard key={item.slug} {...item} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/#visit-showroom" className={linkClass}>
            Visit us to see the full La-Z-Boy collection &gt;
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AshleyFeatured() {
  return (
    <section
      className="border-t border-[rgba(44,24,16,0.12)] bg-cream py-16 md:py-24"
      aria-labelledby="ashley-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="ashley-heading"
            className="scroll-mt-28 font-serif text-3xl font-semibold text-text md:text-4xl"
          >
            Ashley Collections
          </h2>
          <p className="mt-4 text-muted">
            On-trend styles for every room—from performance fabrics to power
            reclining—curated for comfort and value. Visit us in Farmville to
            explore the full line.
          </p>
        </header>

        <div className="flex w-full flex-wrap justify-center gap-8 md:gap-10">
          {ASHLEY_ITEMS.map((item) => (
            <ProductCard key={item.slug} {...item} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/#visit-showroom" className={linkClass}>
            Shop Ashley in store &gt;
          </Link>
        </div>

        <BrowseOurBrands />
      </div>
    </section>
  );
}
