"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SLIDE_MS = 5000;

const GALLERY_IMAGES = [
  "/gallery/01.png",
  "/gallery/02.png",
  "/gallery/03.png",
  "/gallery/04.png",
  "/gallery/05.png",
  "/gallery/06.png",
] as const;

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={dir === "right" ? "" : "rotate-180"}
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function InsideGallery() {
  const n = GALLERY_IMAGES.length;
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + n) % n);
    },
    [n],
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [n]);

  const pct = (100 / n) * index;

  const outlineBtn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(44,24,16,0.3)] text-text transition-colors duration-200 ease-in-out hover:bg-[#2C1810] hover:text-cream";

  return (
    <section
      className="bg-cream py-16 md:py-24"
      aria-labelledby="gallery-heading"
      role="region"
      aria-roledescription="carousel"
      aria-label="Inside the gallery"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
              The experience
            </p>
            <h2
              id="gallery-heading"
              className="mt-2 font-serif text-3xl font-medium text-text md:text-4xl"
            >
              Inside the gallery
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className={outlineBtn}
              aria-label="Previous slide"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className={outlineBtn}
              aria-label="Next slide"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[rgba(44,24,16,0.12)] bg-card shadow-sm">
          <div
            className="relative aspect-[16/10] w-full md:aspect-[21/9]"
            aria-live="polite"
          >
            <div
              className="flex h-full ease-out motion-safe:transition-transform motion-safe:duration-700"
              style={{
                width: `${n * 100}%`,
                transform: `translateX(-${pct}%)`,
              }}
            >
              {GALLERY_IMAGES.map((src, i) => (
                <div
                  key={src}
                  className="relative h-full shrink-0"
                  style={{ width: `${100 / n}%` }}
                  aria-hidden={i !== index}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex items-center justify-center gap-2 py-4 md:py-5"
            role="tablist"
            aria-label="Slide indicators"
          >
            {GALLERY_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1} of ${n}`}
                onClick={() => setIndex(i)}
                className={
                  i === index
                    ? "h-2 w-8 rounded-full bg-[#2C1810] transition-all duration-200 ease-in-out"
                    : "h-2 w-2 rounded-full bg-[#2C1810]/25 transition-all duration-200 ease-in-out hover:bg-[#2C1810]/45"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
