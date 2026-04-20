function IconTruck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 14h18v16H8V14zM26 22l8-6v14H26V22zM12 34h4M28 34h6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="36" r="2.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="32" cy="36" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M24 39S8 28.5 8 18.5c0-4.5 3.5-8 8-8 3 0 5.5 1.5 8 4 2.5-2.5 5-4 8-4 4.5 0 8 3.5 8 8C32 28.5 16 39 16 39h8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCard({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="6"
        y="12"
        width="36"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M6 20h36M12 28h10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconRibbon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M18 24l-4 14 10-6 10 6-4-14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ITEMS = [
  {
    icon: IconTruck,
    title: "Local Delivery",
    text: "We deliver personally to your home",
  },
  {
    icon: IconHeart,
    title: "Family Owned",
    text: "Serving Farmville for generations",
  },
  {
    icon: IconCard,
    title: "Financing Available",
    text: "Flexible payment options",
  },
  {
    icon: IconRibbon,
    title: "Authorized Dealer",
    text: "Official La-Z-Boy & Ashley partner",
  },
] as const;

export function TrustBar() {
  return (
    <section
      className="border-y border-[rgba(44,24,16,0.12)] bg-cream py-10 md:py-12"
      aria-label="Why shop with us"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-4 md:gap-6 md:px-8 lg:gap-10">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center"
          >
            <Icon className="mb-4 h-12 w-12 shrink-0 text-text md:h-14 md:w-14" />
            <h3 className="text-sm font-bold text-muted md:text-base">
              {title}
            </h3>
            <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-muted md:text-sm">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
