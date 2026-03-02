import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Town & Country Furniture - a family-owned furniture store in Farmville, Virginia.",
};

export default function About() {
  return (
    <main id="main-content">
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            About Us
          </h1>
          <p className="text-xl text-muted mb-4">
            Your local furniture store in Farmville, Virginia
          </p>
          <p className="text-muted">
            Town &amp; Country has been serving the Farmville community with quality furniture
            from trusted brands like La-Z-Boy and Ashley Furniture.
          </p>
        </div>
      </section>
    </main>
  );
}
