"use client";

import { useEffect, useId, useState } from "react";
import { ContactForm } from "@/components/ContactForm";

type ProductInquiryModalProps = {
  defaultMessage: string;
};

export function ProductInquiryModal({
  defaultMessage,
}: ProductInquiryModalProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-[#2C1810] px-6 py-3.5 text-center text-sm font-semibold text-cream transition-colors duration-200 ease-in-out hover:bg-[#150d08] sm:w-auto"
      >
        Inquire more info
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute inset-0 bg-[rgba(28,18,9,0.55)] backdrop-blur-[2px]"
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 max-h-[min(90vh,640px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-[rgba(44,24,16,0.12)] bg-card p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-md p-2 text-muted transition-colors duration-200 ease-in-out hover:bg-[rgba(44,24,16,0.06)] hover:text-text"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            <ContactForm
              formId="product-inquiry-form"
              heading="Request more information"
              headingId={titleId}
              defaultMessage={defaultMessage}
              className="scroll-mt-0 border-0 bg-transparent p-0 pr-8 shadow-none md:pr-10"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
