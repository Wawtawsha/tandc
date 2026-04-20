import { getCatalogProductBySlug, ALL_CATALOG_PRODUCTS } from "@/lib/catalog-products";
import { getFeaturedProductBySlug, ALL_FEATURED_PRODUCTS } from "@/lib/featured-products";
import { AnyProduct, CatalogProduct, FeaturedProduct } from "./types";

export function getProductBySlug(slug: string): AnyProduct | undefined {
  return getFeaturedProductBySlug(slug) ?? getCatalogProductBySlug(slug);
}

export function getProductsByBrand(brandName: string): AnyProduct[] {
  // Use a map to prevent duplicates by slug
  const productMap = new Map<string, AnyProduct>();

  ALL_FEATURED_PRODUCTS.forEach((p) => {
    // Featured products use cornerBrand or badgeLeft for brand identification.
    if (p.cornerBrand === brandName || p.badgeLeft === brandName) {
      productMap.set(p.slug, p);
    }
  });

  ALL_CATALOG_PRODUCTS.forEach((p) => {
    // Catalog products use brand
    // Also matching 'Deck Boss' if brandName is 'Recteq Grills' since RT-800DB is a Recteq Grill but named 'Deck Boss' here, wait
    let matches = p.brand === brandName;
    if (brandName === "Recteq Grills" && p.brand === "Deck Boss") {
      matches = true;
    }
    
    if (matches && !productMap.has(p.slug)) {
      productMap.set(p.slug, p);
    }
  });

  return Array.from(productMap.values());
}
