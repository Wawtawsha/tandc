import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  categoryLabel,
  getCatalogProductsByCategory,
} from "@/lib/catalog-products";
import { CatalogCategory } from "@/lib/types";

type PageProps = { params: Promise<{ category: string }> };

function isCatalogCategory(value: string): value is CatalogCategory {
  return (
    value === "sectionals" ||
    value === "recliners" ||
    value === "sofas" ||
    value === "mattresses" ||
    value === "appliances" ||
    value === "grills"
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isCatalogCategory(category)) return { title: "Collections | Town & Country" };
  const label = categoryLabel(category);
  return {
    title: `${label} | Town & Country`,
    description: `Explore ${label.toLowerCase()} in our showroom. Tap any item to view details and inquire for more info.`,
  };
}

function ProductCard({
  href,
  imageSrc,
  title,
  brand,
  priceLine,
  subPriceLine,
}: {
  href: string;
  imageSrc: string;
  title: string;
  brand: string;
  priceLine: string;
  subPriceLine?: string;
}) {
  return (
    <Link
      href={href}
      className="block w-full max-w-[340px] transition-transform duration-200 ease-in-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1810]"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[rgba(44,24,16,0.1)] bg-card shadow-sm transition-all duration-200 ease-in-out hover:border-[rgba(44,24,16,0.25)] hover:shadow-md">
        <div className="relative aspect-[4/3] bg-cream">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 340px, 90vw"
            priority={false}
          />
          <span className="absolute right-2 top-2 rounded bg-card/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text shadow-sm">
            {brand}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4 md:p-5">
          <h3 className="font-serif text-lg font-semibold leading-snug text-text">
            {title}
          </h3>
          <p className="mt-1.5 text-sm text-muted">{priceLine}</p>
          {subPriceLine && (
            <p className="mt-0.5 text-xs text-muted/80">{subPriceLine}</p>
          )}
          <span className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[#2C1810] px-4 py-3 text-center text-sm font-semibold text-cream transition-colors duration-200 ease-in-out hover:bg-[#150d08]">
            View details
          </span>
        </div>
      </article>
    </Link>
  );
}

export default async function CollectionCategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!isCatalogCategory(category)) notFound();

  const label = categoryLabel(category);
  const products = getCatalogProductsByCategory(category);

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <Link
            href="/#products"
            className="text-sm font-semibold text-[rgba(44,24,16,0.65)] underline-offset-4 transition-colors duration-200 ease-in-out hover:text-text"
          >
            ← Back to categories
          </Link>

          <header className="mx-auto mt-8 max-w-2xl text-center">
            <h1 className="font-serif text-4xl font-medium text-text md:text-5xl">
              {label}
            </h1>
            <p className="mt-4 text-muted">
              Tap a product to view the photo, details, and inquire for more info.
            </p>
          </header>

          <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-10">
            {products.map((p) => (
              <ProductCard
                key={p.slug}
                href={`/inquire/${p.slug}`}
                imageSrc={p.imageSrc}
                title={p.title}
                brand={p.brand}
                priceLine={p.priceLine}
                subPriceLine={p.subPriceLine}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

