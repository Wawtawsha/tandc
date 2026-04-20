import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { ContactExperience } from "@/components/ContactExperience";
import {
  AshleyFeatured,
  LazyBoyFeatured,
} from "@/components/FeaturedDealerSections";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TrustBar } from "@/components/TrustBar";

/** Showroom photography — order: sectionals, recliners, sofas */
const CATEGORY_IMAGES = {
  sectionals: "/category-sectionals.jpg",
  recliners: "/category-recliners.jpg",
  sofas: "/category-sofas.jpg",
  mattresses: "/products/3.jpg",
  appliances: "/products/4.jpg",
  grills: "/products/10.5.jpg",
  safes: "/products/1.jpg",
} as const;

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        {/* Hero */}
        <section className="relative isolate min-h-[min(85vh,720px)] w-full overflow-hidden bg-black">
          <video
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 z-[1] bg-black/45"
            aria-hidden
          />
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-t from-black/65 via-black/35 to-black/15"
            aria-hidden
          />
          <div className="relative z-[2] mx-auto flex max-w-7xl flex-col justify-end px-4 pb-16 pt-32 text-white md:min-h-[min(85vh,720px)] md:justify-center md:px-8 md:pb-0 md:pt-24">
            <h1 className="max-w-3xl font-serif text-4xl font-medium leading-tight drop-shadow-[0_2px_28px_rgba(0,0,0,0.65)] md:text-5xl lg:text-6xl">
              Quality furniture for every generation
            </h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#products"
                className="inline-flex items-center justify-center rounded-md bg-[#2C1810] px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-cream shadow-lg transition-colors duration-200 ease-in-out hover:bg-[#150d08]"
              >
                Browse collections
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center rounded-md border border-[rgba(250,247,242,0.35)] bg-transparent px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-cream transition-colors duration-200 ease-in-out hover:bg-[#2C1810] hover:text-cream"
              >
                Our story
              </Link>
            </div>
          </div>
        </section>

        <TrustBar />

        {/* Curated comfort */}
        <section
          id="products"
          className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24"
          aria-labelledby="curated-heading"
        >
          <div
            id="about"
            className="mx-auto mb-12 max-w-2xl scroll-mt-28 text-center"
          >
            <h2
              id="curated-heading"
              className="font-serif text-3xl font-medium text-text md:text-4xl"
            >
              Curated comfort
            </h2>
            <p className="mt-4 text-muted">
              Generous sectionals, showroom recliners, and sofas built for
              everyday life—chosen for lasting comfort, honest materials, and
              rooms that feel lived-in and loved.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <CategoryCard
              title="Sectionals"
              href="/collections/sectionals"
              imageSrc={CATEGORY_IMAGES.sectionals}
              imageSizes="(min-width: 768px) 34vw, 100vw"
              className="min-h-[280px] md:min-h-[360px]"
              priority
            />
            <CategoryCard
              title="Recliners"
              href="/collections/recliners"
              imageSrc={CATEGORY_IMAGES.recliners}
              imageSizes="(min-width: 768px) 34vw, 100vw"
              className="min-h-[280px] md:min-h-[360px]"
            />
            <CategoryCard
              title="Sofas"
              href="/collections/sofas"
              imageSrc={CATEGORY_IMAGES.sofas}
              imageSizes="(min-width: 768px) 34vw, 100vw"
              className="min-h-[280px] md:min-h-[360px]"
            />
            <CategoryCard
              title="Mattresses"
              href="/collections/mattresses"
              imageSrc={CATEGORY_IMAGES.mattresses}
              imageSizes="(min-width: 768px) 34vw, 100vw"
              className="min-h-[280px] md:min-h-[360px]"
            />
            <CategoryCard
              title="Appliances"
              href="/collections/appliances"
              imageSrc={CATEGORY_IMAGES.appliances}
              imageSizes="(min-width: 768px) 34vw, 100vw"
              className="min-h-[280px] md:min-h-[360px]"
            />
            <CategoryCard
              title="Grills"
              href="/collections/grills"
              imageSrc={CATEGORY_IMAGES.grills}
              imageSizes="(min-width: 768px) 34vw, 100vw"
              className="min-h-[280px] md:min-h-[360px]"
            />
            <CategoryCard
              title="Safes"
              href="/collections/safes"
              imageSrc={CATEGORY_IMAGES.safes}
              imageSizes="(min-width: 768px) 34vw, 100vw"
              className="min-h-[280px] md:min-h-[360px]"
            />
          </div>
        </section>

        <LazyBoyFeatured />
        <AshleyFeatured />

        <ContactExperience />
      </main>
      <Footer />
    </>
  );
}
