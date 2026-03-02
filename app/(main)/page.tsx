import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Town & Country Furniture - Farmville, Virginia",
};

export default function Home() {
  return (
    <main id="main-content">
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Town &amp; Country Furniture
          </h1>
          <p className="text-lg text-muted">
            Farmville, Virginia&apos;s home for La-Z-Boy and Ashley Furniture
          </p>
        </div>
      </section>
    </main>
  );
}
