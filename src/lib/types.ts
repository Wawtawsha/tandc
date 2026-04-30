export type CatalogCategory =
  | "sectionals"
  | "recliners"
  | "sofas"
  | "mattresses"
  | "appliances"
  | "grills"
  | "safes";

export type CatalogProduct = {
  slug: string;
  imageSrc: string;
  title: string;
  description: string;
  brand: string;
  categories: CatalogCategory[];
};

export type FeaturedProduct = {
  slug: string;
  imageSrc: string;
  title: string;
  description: string;
  categories: CatalogCategory[];
  collectionSectionId: "lazyboy-heading" | "ashley-heading";
  cornerBrand?: string;
  badgeLeft?: string;
  badgeRight?: string;
};

export type AnyProduct = FeaturedProduct | CatalogProduct;
