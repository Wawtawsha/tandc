import { FeaturedProduct } from "./types";

// ── 8.png — La-Z-Boy Morrison ─────────────────────────────────────────
export const LAZY_BOY_ITEMS: FeaturedProduct[] = [
  {
    slug: "sofa-lazboy-morrison",
    categories: ["sofas", "recliners"],
    collectionSectionId: "lazyboy-heading",
    title: "La-Z-Boy Morrison — Power Reclining Sofa",
    cornerBrand: "La-Z-Boy",
    badgeLeft: "Power",
    imageSrc: "/products/8.jpg",
    description: "Morrison Power Reclining Sofa with Headrest and Wireless Remote upgrade. U44-766 W2 Option.",
  },
  {
    slug: "sofa-lazboy-trouper",
    categories: ["sofas", "recliners"],
    collectionSectionId: "lazyboy-heading",
    title: "La-Z-Boy Trouper — Power Reclining Sofa",
    cornerBrand: "La-Z-Boy",
    badgeLeft: "Power",
    imageSrc: "/products/9.jpg",
    description: "Trouper Power Reclining Sofa w/ Headrest — U44724. Also available as Loveseat w/ Console.",
  },
];

// ── 7.png — Ashley 5Z Pittson ─────────────────────────────────────────
export const ASHLEY_ITEMS: FeaturedProduct[] = [
  {
    slug: "sectional-ashley-5z-pittson",
    categories: ["sectionals"],
    collectionSectionId: "ashley-heading",
    title: "Ashley 5Z Pittson Sectional",
    badgeLeft: "Ashley",
    imageSrc: "/products/7.jpg",
    description: "Transitional modular sectional with a padded track arm, upholstered in pigmented corrective top grain leather.",
  },
];

export const ALL_FEATURED_PRODUCTS: FeaturedProduct[] = [
  ...LAZY_BOY_ITEMS,
  ...ASHLEY_ITEMS,
];

export function getFeaturedProductBySlug(slug: string): FeaturedProduct | undefined {
  return ALL_FEATURED_PRODUCTS.find((p) => p.slug === slug);
}
