import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./icons";

type CategoryCardProps = {
  title: string;
  href: string;
  imageSrc: string;
  className?: string;
  imageSizes: string;
  priority?: boolean;
};

export function CategoryCard({
  title,
  href,
  imageSrc,
  className = "",
  imageSizes,
  priority,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={`group relative isolate block min-h-[220px] overflow-hidden rounded-2xl border border-[rgba(44,24,16,0.1)] bg-card shadow-sm transition-all duration-200 ease-in-out hover:border-[rgba(44,24,16,0.25)] hover:shadow-md md:min-h-[280px] ${className}`}
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes={imageSizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <span className="absolute bottom-0 left-0 flex w-full items-center justify-between gap-2 p-4 text-white">
        <span className="font-serif text-lg font-medium md:text-xl">{title}</span>
        <ArrowIcon className="shrink-0 opacity-90 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
