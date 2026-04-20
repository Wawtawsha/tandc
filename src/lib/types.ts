export type CatalogCategory =
  | "sectionals"
  | "recliners"
  | "sofas"
  | "mattresses"
  | "appliances"
  | "grills";

export type CatalogProduct = {
  slug: string;
  imageSrc: string;
  title: string;
  priceLine: string;
  subPriceLine?: string;
  description: string;
  brand: string;
  category: CatalogCategory;
};

export type FeaturedProduct = {
  slug: string;
  imageSrc: string;
  title: string;
  priceLine: string;
  description: string;
  category: CatalogCategory;
  collectionSectionId: "lazyboy-heading" | "ashley-heading";
  cornerBrand?: string;
  badgeLeft?: string;
  badgeRight?: string;
};

export type AnyProduct = FeaturedProduct | CatalogProduct;
