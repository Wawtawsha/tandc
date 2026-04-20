export type Brand = {
  id: string;
  name: string;
  logoSrc: string;
};

/** Logos: La-Z-Boy, Ashley, Speed Queen, and Browning buckmark from Wikimedia Commons; wordmarks are local SVGs styled for the site. */
export const BROWSE_BRANDS: Brand[] = [
  { id: "la-z-boy", name: "La-Z-Boy", logoSrc: "/brands/la-z-boy.svg" },
  { id: "ashley", name: "Ashley", logoSrc: "/brands/ashley.svg" },
  { id: "mattress-tech", name: "Mattress Tech", logoSrc: "/brands/mattress-tech.svg" },
  { id: "franklin", name: "Franklin", logoSrc: "/brands/franklin.svg" },
  { id: "liberty", name: "Liberty", logoSrc: "/brands/liberty.svg" },
  { id: "best", name: "Best", logoSrc: "/brands/best.svg" },
  { id: "browning", name: "Browning", logoSrc: "/brands/browning.png" },
  { id: "speed-queen", name: "Speed Queen", logoSrc: "/brands/speed-queen.png" },
  { id: "recteq", name: "Recteq Grills", logoSrc: "/brands/recteq.svg" },
];

