import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BROWSE_BRANDS } from "@/lib/brands";
import { Footer } from "@/components/Footer";
import { ProductInquiryModal } from "@/components/ProductInquiryModal";
import { Header } from "@/components/Header";
import {
  ALL_CATALOG_PRODUCTS,
  categoryLabel,
} from "@/lib/catalog-products";
import {
  ALL_FEATURED_PRODUCTS,
} from "@/lib/featured-products";
import {
  getProductBySlug,
} from "@/lib/product-lookup";
import { AnyProduct, FeaturedProduct } from "@/lib/types";

function brandLine(product: AnyProduct): string | undefined {
  if ("brand" in product) return product.brand;
  if (product.cornerBrand) return product.cornerBrand;
  if (product.badgeLeft === "Ashley" || product.badgeRight === "Ashley")
    return "Ashley";
  const parts = [product.badgeLeft, product.badgeRight].filter(Boolean);
  return parts.length ? parts.join(" · ") : undefined;
}

function isFeaturedProduct(product: AnyProduct): product is FeaturedProduct {
  return "collectionSectionId" in product;
}

function safeReturnPath(from: string | undefined): string | null {
  if (!from || typeof from !== "string") return null;
  const t = from.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return null;
  return t;
}

function backLabelForReturnPath(path: string): string {
  const m = path.match(/^\/brands\/([^/?#]+)/);
  if (m) {
    const b = BROWSE_BRANDS.find((x) => x.id === m[1]);
    if (b) return `← Back to ${b.name}`;
  }
  return "← Back";
}

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};

export function generateStaticParams() {
  const allSlugs = [
    ...ALL_FEATURED_PRODUCTS.map((p) => p.slug),
    ...ALL_CATALOG_PRODUCTS.map((p) => p.slug),
  ];
  return Array.from(new Set(allSlugs)).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product | Town & Country" };
  }
  return {
    title: `${product.title} | Town & Country`,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductInquirePage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { from } = await searchParams;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const returnPath = safeReturnPath(from);
  const brand = brandLine(product);
  const defaultMessage = `I'm interested in the ${product.title}${brand ? ` (${brand})` : ""}. Please contact me with more information.`;

  const primaryCategory = product.categories[0];

  const backHref = returnPath
    ? returnPath
    : isFeaturedProduct(product)
      ? `/#${product.collectionSectionId}`
      : `/collections/${primaryCategory}`;

  const backLabel = returnPath
    ? backLabelForReturnPath(returnPath)
    : isFeaturedProduct(product)
      ? "← Back to featured collections"
      : `← Back to ${categoryLabel(primaryCategory)}`;

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
          <Link
            href={backHref}
            className="text-sm font-semibold text-[rgba(44,24,16,0.65)] underline-offset-4 transition-colors duration-200 ease-in-out hover:text-text"
          >
            {backLabel}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[rgba(44,24,16,0.1)] bg-cream shadow-sm lg:aspect-square lg:max-h-[min(520px,70vh)]">
              <Image
                src={product.imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 90vw"
                priority
              />
              {"cornerBrand" in product && product.cornerBrand ? (
                <span className="absolute right-3 top-3 rounded bg-card/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-text shadow-sm">
                  {product.cornerBrand}
                </span>
              ) : null}
              {"badgeLeft" in product && product.badgeLeft ? (
                <span className="absolute left-3 top-3 rounded-md bg-card/95 px-2.5 py-1 text-[10px] font-semibold text-text shadow-sm">
                  {product.badgeLeft}
                </span>
              ) : null}
              {"badgeRight" in product && product.badgeRight ? (
                <span className="absolute right-3 top-3 rounded-md bg-card/95 px-2.5 py-1 text-[10px] font-semibold text-text shadow-sm">
                  {product.badgeRight}
                </span>
              ) : null}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                {brand ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {brand}
                  </p>
                ) : null}
                {product.categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/collections/${cat}`}
                    className="rounded-full border border-[rgba(44,24,16,0.16)] bg-[rgba(44,24,16,0.04)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text transition-colors duration-200 ease-in-out hover:bg-[rgba(44,24,16,0.07)]"
                  >
                    {categoryLabel(cat)}
                  </Link>
                ))}
              </div>
              <h1 className="mt-2 font-serif text-3xl font-medium text-text md:text-4xl">
                {product.title}
              </h1>
              <p className="mt-3 text-base font-medium text-text/90">
                {product.priceLine}
              </p>
              {"subPriceLine" in product && product.subPriceLine ? (
                <p className="mt-0.5 text-sm text-muted">
                  {product.subPriceLine}
                </p>
              ) : null}
              <p className="mt-6 text-base leading-relaxed text-muted">
                {product.description}
              </p>
              <ProductInquiryModal defaultMessage={defaultMessage} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
