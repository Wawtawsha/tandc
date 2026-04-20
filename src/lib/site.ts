/** Heritage House HQ — Contact / map */
export const SHOWROOM_ADDRESS =
  "5301 Farmville Rd, Farmville, VA 23901" as const;

export const SHOWROOM_NAME = "Town & Country" as const;

export const HERITAGE_PHONE_DISPLAY = "(434) 223-8163" as const;

export const HERITAGE_PHONE_TEL = "tel:+14342238163" as const;

export function mapsEmbedUrl(address: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    address,
  )}&hl=en&z=15&output=embed`;
}
