'use client';

// Marketing video showcase section
// Client Component - renders HeroVideo which is a Client Component

import { HeroVideo } from '@/components/hero/HeroVideo';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoId: string;
}

const videos: VideoItem[] = [
  {
    id: 'self-gliding-chair',
    title: 'Self-Gliding Recliner Technology',
    description: 'Experience the smooth La-Z-Boy mechanism that made recliners famous. See how our best-selling models provide unmatched comfort and support.',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: 'sofa-comparison',
    title: 'Sofa Fabric Comparison',
    description: 'Discover the difference between Nuvella performance fabrics and traditional upholstery. Stain-resistant, durable, and family-friendly.',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: 'outdoor-furniture',
    title: 'Outdoor Furniture Collection',
    description: 'Explore Ashley outdoor furniture designed for Virginia seasons. Weather-resistant materials that withstand heat, humidity, and winter weather.',
    videoId: 'dQw4w9WgXcQ',
  },
];

export function VideoShowcase() {
  return (
    <section
      id="sectionals"
      aria-labelledby="videos-heading"
      className="py-16 md:py-20 bg-background"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <h2
          id="videos-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          See Our Furniture In Action
        </h2>
        <p className="text-center text-muted max-w-3xl mx-auto mb-12">
          Watch product demonstrations and learn about the features that make our furniture exceptional.
        </p>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col gap-4">
              <h3
                className="text-lg md:text-xl font-semibold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {video.title}
              </h3>
              <p className="text-muted text-sm">{video.description}</p>
              <HeroVideo videoId={video.videoId} title={video.title} location="video_showcase" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
