'use client';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HeroVideoProps {
  videoId: string;
  title?: string;
}

export function HeroVideo({ videoId, title = 'Ashley Furniture Showroom' }: HeroVideoProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
      <LiteYouTubeEmbed
        id={videoId}
        title={title}
        poster="maxresdefault"
        noCookie={true}
        params="controls=1&modestbranding=1&rel=0"
      />
    </div>
  );
}
