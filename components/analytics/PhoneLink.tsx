'use client';
import { sendGAEvent } from '@next/third-parties/google';

interface PhoneLinkProps {
  phone: string;
  location: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function PhoneLink({ phone, location, children, className, ariaLabel }: PhoneLinkProps) {
  return (
    <a
      href={`tel:${phone}`}
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        sendGAEvent('event', 'phone_click', {
          phone_number: phone,
          click_location: location,
        });
      }}
    >
      {children}
    </a>
  );
}
