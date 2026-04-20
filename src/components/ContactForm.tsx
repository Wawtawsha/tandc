"use client";

import { FormEvent } from "react";

const inputClass =
  "w-full rounded-lg border border-[rgba(44,24,16,0.15)] bg-cream px-3.5 py-2.5 text-sm text-text outline-none transition-[color,box-shadow] duration-200 ease-in-out placeholder:text-text/35 focus:border-[#2C1810] focus:ring-1 focus:ring-[#2C1810]";

export type ContactFormProps = {
  formId?: string;
  heading?: string;
  headingId?: string;
  defaultMessage?: string;
  className?: string;
};

export function ContactForm({
  formId = "contact-form",
  heading = "Send us a message",
  headingId,
  defaultMessage = "",
  className = "scroll-mt-28 rounded-2xl border border-[rgba(44,24,16,0.1)] bg-card p-6 shadow-sm md:p-8",
}: ContactFormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className={className}>
      <h3
        id={headingId}
        className="font-serif text-xl font-medium text-text md:text-2xl"
      >
        {heading}
      </h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder=""
          />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder=""
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="contact-phone"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
          >
            Phone number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder=""
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
          >
            Your message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            className={inputClass}
            placeholder=""
            defaultValue={defaultMessage}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-[#2C1810] py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-colors duration-200 ease-in-out hover:bg-[#150d08] sm:w-auto sm:px-10"
      >
        Send message
      </button>
    </form>
  );
}
