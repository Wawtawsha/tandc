import Image from "next/image";
import Link from "next/link";

type BrandPlaceholderCardProps = {
  slug: string;
  brandId: string;
  title: string;
  imageSrc: string;
  brandName: string;
};

export function BrandPlaceholderCard({
  slug,
  brandId,
  title,
  imageSrc,
  brandName,
}: BrandPlaceholderCardProps) {
  const href = `/inquire/${slug}?from=${encodeURIComponent(`/brands/${brandId}`)}`;

  return (
    <Link
      href={href}
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
          <span className="absolute right-2 top-2 rounded bg-card/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text shadow-sm">
            {brandName}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4 md:p-5">
          <h3 className="font-serif text-lg font-semibold leading-snug text-text">
            {title}
          </h3>
          <p className="mt-1.5 text-sm text-muted">See in store for details</p>
          <span className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[#2C1810] px-4 py-3 text-center text-sm font-semibold text-cream transition-colors duration-200 ease-in-out hover:bg-[#150d08]">
            View details
          </span>
        </div>
      </article>
    </Link>
  );
}
