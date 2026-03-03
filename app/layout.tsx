import type { Metadata } from "next";
import { libreBaskerville, dmSans } from "@/lib/fonts";
import { siteMetadata, SITE_URL, generateOrganizationJsonLd } from "@/lib/metadata";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteMetadata.title,
    template: "%s | Town & Country Furniture",
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  openGraph: {
    type: siteMetadata.og.type,
    locale: siteMetadata.og.locale,
    siteName: siteMetadata.og.siteName,
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: SITE_URL,
  },
  twitter: {
    card: siteMetadata.twitter.card,
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <html lang="en">
      <body
        className={`${libreBaskerville.variable} ${dmSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
