'use client';

import { useActionState, useRef, useEffect } from 'react';
import { submitContactForm } from '@/app/actions/contact';
import { SubmitButton } from './SubmitButton';
import type { ActionState } from '@/lib/validations/contact';

const initialState: ActionState = {
  message: '',
  errors: {},
  success: false,
};

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form after successful submission
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          aria-invalid={state.errors.name ? 'true' : 'false'}
          aria-describedby={state.errors.name ? 'name-error' : undefined}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
        />
        {state.errors.name && (
          <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-invalid={state.errors.email ? 'true' : 'false'}
          aria-describedby={state.errors.email ? 'email-error' : undefined}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
        />
        {state.errors.email && (
          <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Phone Field (Optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          Phone <span className="text-muted text-sm">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          aria-invalid={state.errors.phone ? 'true' : 'false'}
          aria-describedby={state.errors.phone ? 'phone-error' : undefined}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
        />
        {state.errors.phone && (
          <p id="phone-error" className="text-red-600 text-sm mt-1" role="alert">
            {state.errors.phone[0]}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={state.errors.message ? 'true' : 'false'}
          aria-describedby={state.errors.message ? 'message-error' : undefined}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-y"
        />
        {state.errors.message && (
          <p id="message-error" className="text-red-600 text-sm mt-1" role="alert">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {/* Success/Error Message */}
      {state.message && (
        <div
          aria-live="polite"
          className={`p-4 rounded-lg ${
            state.success
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-start">
            {state.success && (
              <svg
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <p className="text-sm font-medium">{state.message}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <SubmitButton />
    </form>
  );
}
