import { mapsEmbedUrl } from "@/lib/site";

type MapEmbedProps = {
  address: string;
  className?: string;
};

export function MapEmbed({ address, className }: MapEmbedProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[rgba(44,24,16,0.12)] bg-card shadow-sm ${className ?? ""}`}
    >
      <iframe
        title={`Map: ${address}`}
        src={mapsEmbedUrl(address)}
        className="aspect-[4/3] min-h-[220px] w-full border-0 md:min-h-[280px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
