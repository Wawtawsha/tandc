import { CatalogCategory, CatalogProduct } from "./types";

// ── 1.jpg ─────────────────────────────────────────────────────────────
const SECTIONALS: CatalogProduct[] = [
  {
    slug: "sectional-browning-gloss-white",
    category: "sectionals",
    brand: "Browning",
    title: "Browning / Gloss — 33 Silver Series",
    priceLine: "$4,199.00",
    imageSrc: "/products/1.jpg",
    description: "Gloss White 33 Silver Series sectional with a clean showroom look and a premium feel.",
  },
  // ── 5.jpg ────────────────────────────────────────────────────────────
  {
    slug: "sectional-browning-crimson-two-tone",
    category: "sectionals",
    brand: "Browning",
    title: "Browning / Two-Tone — 33 Silver Series",
    priceLine: "$4,499.00",
    imageSrc: "/products/5.jpg",
    description: "Crimson Two-Tone 33 Silver Series sectional built to stand out in the showroom.",
  },
  // ── 7.jpg ────────────────────────────────────────────────────────────
  {
    slug: "sectional-ashley-5z-pittson",
    category: "sectionals",
    brand: "Ashley",
    title: "Ashley 5Z Pittson Sectional",
    priceLine: "$6,600.00",
    imageSrc: "/products/7.jpg",
    description: "Transitional modular sectional with a padded track arm, upholstered in pigmented corrective top grain leather.",
  },
];

// ── 12.png ────────────────────────────────────────────────────────────
// ── 13.jpg ────────────────────────────────────────────────────────────
const RECLINERS: CatalogProduct[] = [
  {
    slug: "recliner-franklin-laurel-chair-half",
    category: "recliners",
    brand: "Franklin",
    title: "Franklin Laurel — Chair and a Half",
    priceLine: "$775.00",
    imageSrc: "/products/12.png",
    description: "The Laurel collection brings timeless elegance and extra comfort in a chair and a half silhouette. Matching sofa, loveseat, and ottoman available to order.",
  },
  {
    slug: "recliner-franklin-teagan-chair-half",
    category: "recliners",
    brand: "Franklin",
    title: "Franklin Teagan — Chair and a Half",
    priceLine: "$1,049.95",
    imageSrc: "/products/13.jpg",
    description: "A roomy Teagan chair and a half from Franklin Corporation — built for comfort with scale to add extra seating.",
  },
];

// ── 6.jpg / 6.5.jpg (same image, loveseat listing + sofa sub-price) ───
// ── 8.jpg ─────────────────────────────────────────────────────────────
// ── 9.jpg / 9.5.jpg (same image, sofa listing + loveseat sub-price) ───
// ── 11.jpg ────────────────────────────────────────────────────────────
const SOFAS: CatalogProduct[] = [
  {
    slug: "sofa-leesworth-power-loveseat",
    category: "sofas",
    brand: "Leesworth",
    title: "Leesworth Power Leather Reclining Loveseat",
    priceLine: "$1,550.00",
    imageSrc: "/products/6.jpg",
    description: "Power leather reclining loveseat with headrests for comfortable, easy-to-use seating.",
  },
  {
    slug: "sofa-lazboy-morrison",
    category: "sofas",
    brand: "La-Z-Boy",
    title: "La-Z-Boy Morrison — Power Reclining Sofa",
    priceLine: "$2,550.00",
    imageSrc: "/products/8.jpg",
    description: "Morrison Power Reclining Sofa with Headrest and Wireless Remote upgrade. U44-766 W2 Option.",
  },
  {
    slug: "sofa-lazboy-trouper",
    category: "sofas",
    brand: "La-Z-Boy",
    title: "La-Z-Boy Trouper — Power Reclining Sofa",
    priceLine: "$2,525.00",
    subPriceLine: "Loveseat w/ Headrest & Console: $2,600.00",
    imageSrc: "/products/9.jpg",
    description: "Trouper Power Reclining Sofa w/ Headrest — U44724. Dual side-mounted controls, powered backs and legrests, adjustable power-tilt headrests. Also available as a loveseat with console for $2,600.",
  },
  {
    slug: "sofa-franklin-laurel",
    category: "sofas",
    brand: "Franklin",
    title: "Franklin Laurel — Loveseat",
    priceLine: "$1,025.00",
    subPriceLine: "Chair and a Half: $875.00",
    imageSrc: "/products/11.jpg",
    description: "Laurel Loveseat (99220) — timeless elegance and a delightfully comfy seat. Chair and a half available for $875. Made in America.",
  },
];

// ── 2.jpg ─────────────────────────────────────────────────────────────
// ── 3.jpg ─────────────────────────────────────────────────────────────
const MATTRESSES: CatalogProduct[] = [
  {
    slug: "mattress-m311-memory-foam",
    category: "mattresses",
    brand: "M311",
    title: "M311 Series Memory Foam Firm",
    priceLine: "Queen: $999 | King: $1,099 | TXL: $669",
    imageSrc: "/products/2.jpg",
    description: "M311 Series Memory Foam Firm mattress built in the USA. Features high-density support foam base and green tea-infused gel memory foam.",
  },
  {
    slug: "mattress-timeless-cloud-o-pedic",
    category: "mattresses",
    brand: "Timeless",
    title: "Timeless Cloud-O-Pedic II (Black Oasis)",
    priceLine: "Twin: $849.95 | Full: $999.95 | Queen: $1,049.95 | King: $1,449.95",
    subPriceLine: "Foundation — Twin: $249.95 | Full: $289.95 | Queen: $329.95 | King: $469.95",
    imageSrc: "/products/3.jpg",
    description: "Cloud-O-Pedic II Black Oasis Collection by Timeless Bedding by Mattress Tech Enterprises. Ultra Plush Pillow Top Foam with 792 Pocketed Coil System. 20-Year Non-Prorated Warranty.",
  },
];

// ── 4.jpg ─────────────────────────────────────────────────────────────
const APPLIANCES: CatalogProduct[] = [
  {
    slug: "appliance-speed-queen-dryer",
    category: "appliances",
    brand: "Speed Queen",
    title: "Speed Queen DC5 — 7.0 Cu. Ft. Electric Dryer",
    priceLine: "$1,549.00",
    imageSrc: "/products/4.jpg",
    description: "Speed Queen DC5 electric dryer with 5 cycles, 4 temperature selections, Sensor Dry moisture sensor, steam refresh, lint filter guard, and leveling legs.",
  },
];

// ── 10.jpg ────────────────────────────────────────────────────────────
const GRILLS: CatalogProduct[] = [
  {
    slug: "grill-deck-boss-800",
    category: "grills",
    brand: "Recteq Grills",
    title: "RT-800DB with Folding Shelf — Deck Boss 800",
    priceLine: "$1,198.00",
    imageSrc: "/products/10.jpg",
    description: "The new and improved Deck Boss 800 — the perfect mid-size pellet grill. 800 sq. in. of cooking space, 180°F–700°F range, stainless steel construction, advanced PID controller, and Wi-Fi enabled.",
  },
];

export const ALL_CATALOG_PRODUCTS: CatalogProduct[] = [
  ...SECTIONALS,
  ...RECLINERS,
  ...SOFAS,
  ...MATTRESSES,
  ...APPLIANCES,
  ...GRILLS,
];

export function getCatalogProductsByCategory(category: CatalogCategory): CatalogProduct[] {
  return ALL_CATALOG_PRODUCTS.filter((p) => p.category === category);
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
  return "Furniture";
}
