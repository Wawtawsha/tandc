"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HERITAGE_PHONE_DISPLAY, HERITAGE_PHONE_TEL } from "@/lib/site";

const HEADER_NOISE_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#browse-brands-heading", label: "Brands" },
  { href: "/#visit-showroom", label: "Visit Us" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open]);

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
      <div className="relative z-10 mx-auto flex max-w-7xl items-center gap-3 px-4 py-5 md:gap-6 md:px-8 md:py-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="-ml-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <Link
          href="/"
          className="whitespace-nowrap font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl lg:text-[2rem]"
        >
          Town &amp; Country
        </Link>

        <nav
          className="ml-8 hidden items-center gap-6 md:flex"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/75 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={HERITAGE_PHONE_TEL}
          className="ml-auto inline-flex items-center gap-2 text-right font-semibold tracking-wide text-foreground underline-offset-[3px] hover:underline"
        >
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/65 md:inline">
            Call
          </span>
          <span className="whitespace-nowrap text-sm md:text-lg">
            {HERITAGE_PHONE_DISPLAY}
          </span>
        </a>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          id="mobile-menu"
        >
          <div
            className="absolute inset-0 bg-[rgba(28,18,9,0.55)] backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 flex h-full w-[85%] max-w-sm flex-col bg-[#35231C] shadow-2xl">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage: `url("${HEADER_NOISE_SVG}")`,
                backgroundRepeat: "repeat",
                backgroundSize: "96px 96px",
              }}
              aria-hidden
            />
            <div className="relative flex items-center justify-between border-b border-cozy-stone/35 px-4 py-5">
              <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                aria-label="Close menu"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav
              className="relative flex flex-col gap-1 p-4"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 font-serif text-2xl font-medium text-foreground transition-colors hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={HERITAGE_PHONE_TEL}
                onClick={() => setOpen(false)}
                className="mt-2 rounded-md px-3 py-3 font-serif text-2xl font-medium text-foreground transition-colors hover:bg-white/5"
              >
                Call {HERITAGE_PHONE_DISPLAY}
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
