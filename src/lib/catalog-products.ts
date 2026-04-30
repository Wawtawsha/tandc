import { CatalogCategory, CatalogProduct } from "./types";

// ── 7.jpg ─────────────────────────────────────────────────────────────
const SECTIONALS: CatalogProduct[] = [
  {
    slug: "sectional-ashley-5z-pittson",
    categories: ["sectionals"],
    brand: "Ashley",
    title: "Ashley 5Z Pittson Sectional",
    imageSrc: "/products/7.jpg",
    description: "Transitional modular sectional with a padded track arm, upholstered in pigmented corrective top grain leather.",
  },
];

// ── 6.jpg ─────────────────────────────────────────────────────────────
// ── 8.jpg ─────────────────────────────────────────────────────────────
// ── 9.jpg ─────────────────────────────────────────────────────────────
// ── 11.jpg ────────────────────────────────────────────────────────────
// ── 12.png ────────────────────────────────────────────────────────────
// ── 13.jpg ────────────────────────────────────────────────────────────
const SOFAS: CatalogProduct[] = [
  {
    slug: "sofa-leesworth-power-loveseat",
    categories: ["sofas", "recliners"],
    brand: "Leesworth",
    title: "Leesworth Power Leather Reclining Loveseat",
    imageSrc: "/products/6.jpg",
    description: "Power leather reclining loveseat with headrests for comfortable, easy-to-use seating.",
  },
  {
    slug: "sofa-lazboy-morrison",
    categories: ["sofas", "recliners"],
    brand: "La-Z-Boy",
    title: "La-Z-Boy Morrison — Power Reclining Sofa",
    imageSrc: "/products/8.jpg",
    description: "Morrison Power Reclining Sofa with Headrest and Wireless Remote upgrade. U44-766 W2 Option.",
  },
  {
    slug: "sofa-lazboy-trouper",
    categories: ["sofas", "recliners"],
    brand: "La-Z-Boy",
    title: "La-Z-Boy Trouper — Power Reclining Sofa",
    imageSrc: "/products/9.jpg",
    description: "Trouper Power Reclining Sofa w/ Headrest — U44724. Dual side-mounted controls, powered backs and legrests, adjustable power-tilt headrests. Also available as a loveseat with console.",
  },
  {
    slug: "sofa-franklin-laurel",
    categories: ["sofas"],
    brand: "Franklin",
    title: "Franklin Laurel — Loveseat",
    imageSrc: "/products/11.jpg",
    description: "Laurel Loveseat (99220) — timeless elegance and a delightfully comfy seat. Matching chair and a half also available. Made in America.",
  },
  {
    slug: "sofa-franklin-laurel-chair-half",
    categories: ["sofas"],
    brand: "Franklin",
    title: "Franklin Laurel — Chair and a Half",
    imageSrc: "/products/12.png",
    description: "The Laurel collection brings timeless elegance and extra comfort in a chair and a half silhouette. Matching sofa, loveseat, and ottoman available to order.",
  },
  {
    slug: "sofa-franklin-teagan-chair-half",
    categories: ["sofas"],
    brand: "Franklin",
    title: "Franklin Teagan — Chair and a Half",
    imageSrc: "/products/13.jpg",
    description: "A roomy Teagan chair and a half from Franklin Corporation — built for comfort with scale to add extra seating.",
  },
];

// ── 2.jpg ─────────────────────────────────────────────────────────────
// ── 3.jpg ─────────────────────────────────────────────────────────────
const MATTRESSES: CatalogProduct[] = [
  {
    slug: "mattress-m311-memory-foam",
    categories: ["mattresses"],
    brand: "Mattress Tech",
    title: "M311 Series Memory Foam Firm",
    imageSrc: "/products/2.jpg",
    description: "M311 Series Memory Foam Firm mattress built in the USA. Features high-density support foam base and green tea-infused gel memory foam.",
  },
  {
    slug: "mattress-timeless-cloud-o-pedic",
    categories: ["mattresses"],
    brand: "Mattress Tech",
    title: "Timeless Cloud-O-Pedic II (Black Oasis)",
    imageSrc: "/products/3.jpg",
    description: "Cloud-O-Pedic II Black Oasis Collection by Timeless Bedding by Mattress Tech Enterprises. Ultra Plush Pillow Top Foam with 792 Pocketed Coil System. 20-Year Non-Prorated Warranty.",
  },
];

// ── 4.jpg ─────────────────────────────────────────────────────────────
const APPLIANCES: CatalogProduct[] = [
  {
    slug: "appliance-speed-queen-dryer",
    categories: ["appliances"],
    brand: "Speed Queen",
    title: "Speed Queen DC5 — 7.0 Cu. Ft. Electric Dryer",
    imageSrc: "/products/4.jpg",
    description: "Speed Queen DC5 electric dryer with 5 cycles, 4 temperature selections, Sensor Dry moisture sensor, steam refresh, lint filter guard, and leveling legs.",
  },
];

// ── 10.jpg ────────────────────────────────────────────────────────────
const GRILLS: CatalogProduct[] = [
  {
    slug: "grill-deck-boss-800",
    categories: ["grills"],
    brand: "Recteq Grills",
    title: "RT-800DB with Folding Shelf — Deck Boss 800",
    imageSrc: "/products/10.jpg",
    description: "The new and improved Deck Boss 800 — the perfect mid-size pellet grill. 800 sq. in. of cooking space, 180°F–700°F range, stainless steel construction, advanced PID controller, and Wi-Fi enabled.",
  },
];

// ── 1.jpg ─────────────────────────────────────────────────────────────
// ── 5.jpg ─────────────────────────────────────────────────────────────
const SAFES: CatalogProduct[] = [
  {
    slug: "safe-browning-gloss-white",
    categories: ["safes"],
    brand: "Browning",
    title: "Browning / Gloss — 33 Silver Series",
    imageSrc: "/products/1.jpg",
    description: "Gloss White 33 Silver Series safe with a clean showroom look and a premium feel.",
  },
  {
    slug: "safe-browning-crimson-two-tone",
    categories: ["safes"],
    brand: "Browning",
    title: "Browning / Two-Tone — 33 Silver Series",
    imageSrc: "/products/5.jpg",
    description: "Crimson Two-Tone 33 Silver Series safe built to stand out in the showroom.",
  },
];

export const ALL_CATALOG_PRODUCTS: CatalogProduct[] = [
  ...SECTIONALS,
  ...SOFAS,
  ...MATTRESSES,
  ...APPLIANCES,
  ...GRILLS,
  ...SAFES,
];

export function getCatalogProductsByCategory(category: CatalogCategory): CatalogProduct[] {
  return ALL_CATALOG_PRODUCTS.filter((p) => p.categories.includes(category));
}

export function getCatalogProductBySlug(slug: string): CatalogProduct | undefined {
  return ALL_CATALOG_PRODUCTS.find((p) => p.slug === slug);
}

export function categoryLabel(category: CatalogCategory): string {
  if (category === "sectionals") return "Sectionals";
  if (category === "recliners") return "Recliners";
  if (category === "sofas") return "Sofas";
  if (category === "mattresses") return "Mattresses";
  if (category === "appliances") return "Appliances";
  if (category === "grills") return "Grills";
  if (category === "safes") return "Safes";
  return "Furniture";
}
