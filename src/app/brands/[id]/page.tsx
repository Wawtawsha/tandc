import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandPlaceholderCard } from "@/components/BrandPlaceholderCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BROWSE_BRANDS } from "@/lib/brands";
import { getProductsByBrand } from "@/lib/product-lookup";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return BROWSE_BRANDS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const brand = BROWSE_BRANDS.find((b) => b.id === id);
  if (!brand) return { title: "Brand" };
  return {
    title: `${brand.name} | Town and Country`,
    description: `Sample pieces from ${brand.name}—visit our Farmville showroom for the full selection.`,
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { id } = await params;
  const brand = BROWSE_BRANDS.find((b) => b.id === id);
  if (!brand) notFound();

  const brandProducts = getProductsByBrand(brand.name).map((product) => ({
    slug: product.slug,
    title: product.title,
    imageSrc: product.imageSrc,
  }));

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <nav className="mb-8 text-sm text-muted">
            <Link
              href="/#browse-brands-heading"
              className="font-semibold text-[rgba(44,24,16,0.7)] underline-offset-4 transition-colors hover:text-text hover:underline"
            >
              Browse our brands
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span className="text-text">{brand.name}</span>
          </nav>

          <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <h1 className="font-serif text-3xl font-semibold text-text md:text-4xl">
              {brand.name}
            </h1>
            <p className="mt-4 text-muted">
              Sample pieces we carry—styles and availability vary. Stop by the
              showroom or call us to see what&apos;s in stock.
            </p>
          </header>

          {brandProducts.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-8 md:gap-10">
              {brandProducts.map((item) => (
                <BrandPlaceholderCard
                  key={item.slug}
                  slug={item.slug}
                  brandId={brand.id}
                  imageSrc={item.imageSrc}
                  title={item.title}
                  brandName={brand.name}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted">
              We do not currently have any catalog items available online for {brand.name}. 
              Please call or visit our showroom to see the full selection!
            </div>
          )}

          <p className="mt-12 text-center">
            <Link
              href="/#visit-showroom"
              className="text-sm font-semibold text-[rgba(44,24,16,0.7)] underline-offset-4 transition-colors hover:text-text hover:underline"
            >
              Plan your visit to the showroom →
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
