/** Heritage House HQ — Contact / map */
export const SHOWROOM_ADDRESS =
  "1200 Craftsmans Row, Grand Rapids, MI 49503" as const;

export const SHOWROOM_NAME = "Town & County" as const;

export const HERITAGE_PHONE_DISPLAY = "(434) 223-8163" as const;

export const HERITAGE_PHONE_TEL = "tel:+14342238163" as const;

export function mapsEmbedUrl(address: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    address,
  )}&hl=en&z=15&output=embed`;
}
