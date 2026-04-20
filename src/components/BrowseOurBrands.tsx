import Image from "next/image";
import Link from "next/link";
import { BROWSE_BRANDS } from "@/lib/brands";
import { ArrowIcon } from "./icons";

/** Logos at 75% of original 120×140px / 240px-wide slots */
function BrandLogo({ src }: { src: string }) {
  const isRaster = src.endsWith(".png") || src.endsWith(".jpg");
  if (isRaster) {
    return (
      <div className="relative h-[90px] w-full max-w-[180px] md:h-[105px]">
        <Image
          src={src}
          alt=""
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 768px) 180px, 70vw"
        />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local SVG wordmarks from /public
    <img
      src={src}
      alt=""
      className="max-h-[90px] w-full max-w-[180px] object-contain transition-transform duration-500 group-hover:scale-[1.03] md:max-h-[105px]"
    />
  );
}

export function BrowseOurBrands() {
  return (
    <div
      className="mt-16 border-t border-[rgba(44,24,16,0.12)] pt-16 md:mt-20 md:pt-20"
      aria-labelledby="browse-brands-heading"
    >
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <h2
          id="browse-brands-heading"
          className="scroll-mt-28 font-serif text-3xl font-semibold text-text md:text-4xl"
        >
          Browse our brands
        </h2>
        <p className="mt-4 text-muted">
          We partner with trusted names in furniture, sleep, laundry, and
          outdoor cooking. Open a brand to preview sample pieces—then visit us
          in Farmville for the full lineup.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {BROWSE_BRANDS.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.id}`}
            className="group relative isolate block min-h-[210px] w-full overflow-hidden rounded-2xl border border-[rgba(44,24,16,0.1)] bg-card text-left shadow-sm transition-all duration-200 ease-in-out hover:border-[rgba(44,24,16,0.25)] hover:shadow-md md:min-h-[270px]"
          >
            <div className="absolute inset-x-0 bottom-[3.25rem] top-0 flex items-center justify-center bg-gradient-to-b from-[#faf7f2] to-[#efe8de] p-6">
              <BrandLogo src={brand.logoSrc} />
            </div>
            <span className="absolute bottom-0 left-0 flex w-full items-center justify-between gap-2 border-t border-[rgba(44,24,16,0.08)] bg-card px-4 py-3.5">
              <span className="font-serif text-lg font-medium text-text md:text-xl">
                {brand.name}
              </span>
              <ArrowIcon className="shrink-0 text-text opacity-70 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
