import Link from "next/link";
import { HERITAGE_PHONE_DISPLAY, HERITAGE_PHONE_TEL } from "@/lib/site";

const HEADER_NOISE_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E";

export function Header() {
  return (
    <header className="sticky top-0 z-50 relative border-b border-cozy-stone/35 bg-[#35231C]">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: `url("${HEADER_NOISE_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "96px 96px",
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-8 md:py-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-[2rem]"
          >
            Town &amp; Country
          </Link>
        </div>

        <a
          href={HERITAGE_PHONE_TEL}
          className="inline-flex items-center gap-2 text-right font-semibold tracking-wide text-foreground underline-offset-[3px] hover:underline"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/65">
            Call
          </span>
          <span className="text-sm md:text-lg whitespace-nowrap">
            {HERITAGE_PHONE_DISPLAY}
          </span>
        </a>
      </div>
    </header>
  );
}
