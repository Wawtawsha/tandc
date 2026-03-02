export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://townandcountryfarmville.com";

export const siteMetadata = {
  title: "Town & Country Furniture | Farmville, VA",
  description:
    "Farmville, Virginia's home for La-Z-Boy recliners, Ashley Furniture, and quality home furnishings. Family-owned, locally trusted. Visit our showroom today.",
  author: "Town & Country Furniture",
  keywords: [
    "furniture store Farmville VA",
    "La-Z-Boy dealer Farmville",
    "Ashley Furniture Farmville Virginia",
    "recliners Farmville",
    "sofas Farmville VA",
    "furniture near me Farmville",
    "Town and Country Furniture",
  ],
  og: {
    type: "website" as const,
    locale: "en_US",
    siteName: "Town & Country Furniture",
  },
  twitter: {
    card: "summary_large_image" as const,
    creator: "",
  },
};

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "Town & Country Furniture",
    url: SITE_URL,
    description: siteMetadata.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "5301 Farmville Rd",
      addressLocality: "Farmville",
      addressRegion: "VA",
      postalCode: "23901",
      addressCountry: "US",
    },
    telephone: "+14342238163",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
  };
}
