'use client';
import { sendGAEvent } from '@next/third-parties/google';

interface CTALinkProps {
  href: string;
  ctaText: string;
  location: string;
  children: React.ReactNode;
  className?: string;
}

export function CTALink({ href, ctaText, location, children, className }: CTALinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        sendGAEvent('event', 'cta_click', {
          cta_text: ctaText,
          click_location: location,
        });
      }}
    >
      {children}
    </a>
  );
}
