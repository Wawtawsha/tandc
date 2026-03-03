// Product data catalog for Town & Country Furniture
// Typed interfaces for La-Z-Boy and Ashley product lines

export interface BaseProduct {
  id: string;
  brand: 'lazboy' | 'ashley';
  name: string;
  category: 'recliner' | 'sofa' | 'sectional' | 'lift-chair' | 'living-room' | 'bedroom';
  image?: string; // Path in /public or undefined for placeholder
  imageAlt: string;
  featured: boolean;
  priceNote?: string; // "See in store for pricing", "Starting at $X"
}

export interface LaZBoyProduct extends BaseProduct {
  brand: 'lazboy';
  bestseller?: boolean;
}

export interface AshleyProduct extends BaseProduct {
  brand: 'ashley';
  collection?: 'Next-Gen' | 'Nuvella' | 'Outdoor';
}

export type Product = LaZBoyProduct | AshleyProduct;

// Sample product catalog
export const products: Product[] = [
  // La-Z-Boy products
  {
    id: 'lazboy-pinnacle-recliner',
    brand: 'lazboy',
    name: 'Pinnacle Recliner',
    category: 'recliner',
    imageAlt: 'La-Z-Boy Pinnacle recliner in premium leather with extended footrest',
    featured: true,
    bestseller: true,
    priceNote: 'See in store for pricing',
  },
  {
    id: 'lazboy-asher-recliner',
    brand: 'lazboy',
    name: 'Asher Reclina-Rocker Recliner',
    category: 'recliner',
    imageAlt: 'La-Z-Boy Asher recliner with rocker base in brown microfiber',
    featured: true,
    bestseller: true,
    priceNote: 'See in store for pricing',
  },
  {
    id: 'lazboy-kennedy-sofa',
    brand: 'lazboy',
    name: 'Kennedy Premier Sofa',
    category: 'sofa',
    imageAlt: 'La-Z-Boy Kennedy three-cushion sofa in neutral fabric',
    featured: true,
    bestseller: true,
    priceNote: 'See in store for pricing',
  },
  {
    id: 'lazboy-vail-lift-chair',
    brand: 'lazboy',
    name: 'Vail Platinum Power Lift Recliner',
    category: 'lift-chair',
    imageAlt: 'La-Z-Boy Vail power lift recliner with USB charging port',
    featured: true,
    priceNote: 'See in store for pricing',
  },
  {
    id: 'lazboy-devon-sectional',
    brand: 'lazboy',
    name: 'Devon Sectional',
    category: 'sectional',
    imageAlt: 'La-Z-Boy Devon L-shaped sectional with chaise in gray fabric',
    featured: true,
    priceNote: 'See in store for pricing',
  },

  // Ashley products
  {
    id: 'ashley-nuvella-sofa',
    brand: 'ashley',
    name: 'Nuvella Performance Sofa',
    category: 'sofa',
    imageAlt: 'Ashley Nuvella performance fabric sofa in slate gray with rolled arms',
    featured: true,
    collection: 'Nuvella',
    priceNote: 'Starting at $899',
  },
  {
    id: 'ashley-next-gen-sectional',
    brand: 'ashley',
    name: 'Next-Gen Power Reclining Sectional',
    category: 'sectional',
    imageAlt: 'Ashley Next-Gen sectional with power recliners and USB charging',
    featured: true,
    collection: 'Next-Gen',
    priceNote: 'Starting at $1,899',
  },
  {
    id: 'ashley-outdoor-loveseat',
    brand: 'ashley',
    name: 'Outdoor Wicker Loveseat',
    category: 'living-room',
    imageAlt: 'Ashley outdoor wicker loveseat with weather-resistant cushions',
    featured: true,
    collection: 'Outdoor',
    priceNote: 'Starting at $699',
  },
  {
    id: 'ashley-panel-bed',
    brand: 'ashley',
    name: 'Porter Panel Bed',
    category: 'bedroom',
    imageAlt: 'Ashley Porter panel bed in rustic brown finish with carved details',
    featured: true,
    priceNote: 'Starting at $799',
  },
  {
    id: 'ashley-reclining-loveseat',
    brand: 'ashley',
    name: 'Power Reclining Loveseat',
    category: 'sofa',
    imageAlt: 'Ashley power reclining loveseat in espresso brown with center console',
    featured: true,
    priceNote: 'Starting at $1,299',
  },
];

// Filter helper functions with type narrowing
export const getLaZBoyBestSellers = (): LaZBoyProduct[] =>
  products.filter((p): p is LaZBoyProduct => p.brand === 'lazboy' && p.bestseller === true);

export const getAshleyCollections = (collection?: AshleyProduct['collection']): AshleyProduct[] =>
  products.filter((p): p is AshleyProduct =>
    p.brand === 'ashley' && (collection ? p.collection === collection : true)
  );

export const getAshleyFeatured = (): AshleyProduct[] =>
  products.filter((p): p is AshleyProduct => p.brand === 'ashley' && p.featured);

export const getFeaturedByCategory = (category: Product['category']): Product[] =>
  products.filter((p) => p.category === category && p.featured);
