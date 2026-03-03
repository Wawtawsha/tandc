// Server Component - Google Maps Embed
export function MapEmbed() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const address = "5301 Farmville Rd, Farmville, VA 23901";
  const encodedAddress = encodeURIComponent(address);

  // Graceful degradation if API key is missing
  if (!apiKey) {
    return (
      <div
        className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface border border-border-subtle flex flex-col items-center justify-center p-6 text-center"
        role="img"
        aria-label="Map showing Town & Country Furniture location"
      >
        <p className="text-foreground font-medium mb-2">
          Town &amp; Country Furniture
        </p>
        <p className="text-muted text-sm mb-4">{address}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          View on Google Maps
        </a>
      </div>
    );
  }

  return (
    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Town & Country Furniture location at 5301 Farmville Rd, Farmville, VA"
      />
    </div>
  );
}
