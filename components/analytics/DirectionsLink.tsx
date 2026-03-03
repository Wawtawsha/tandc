'use client';
import { sendGAEvent } from '@next/third-parties/google';

interface DirectionsLinkProps {
  destination: string;
  location: string;
  children: React.ReactNode;
  className?: string;
  newTab?: boolean;
}

export function DirectionsLink({ destination, location, children, className, newTab = true }: DirectionsLinkProps) {
  const href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  return (
    <a
      href={href}
      className={className}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      onClick={() => {
        sendGAEvent('event', 'directions_click', {
          click_location: location,
          destination_address: destination,
        });
      }}
    >
      {children}
    </a>
  );
}
