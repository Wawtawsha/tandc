'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-6 py-3 min-h-[48px] bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
}
