'use client';
import { sendGAEvent } from '@next/third-parties/google';

interface CategoryLinkProps {
  href: string;
  categoryName: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function CategoryLink({ href, categoryName, children, className, style }: CategoryLinkProps) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={() => {
        sendGAEvent('event', 'category_click', {
          category_name: categoryName,
          click_location: 'homepage_grid',
        });
      }}
    >
      {children}
    </a>
  );
}
