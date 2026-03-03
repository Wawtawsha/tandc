'use client';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { sendGAEvent } from '@next/third-parties/google';

interface HeroVideoProps {
  videoId: string;
  title?: string;
  location: string;
}

export function HeroVideo({ videoId, title = 'Ashley Furniture Showroom', location }: HeroVideoProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
      <LiteYouTubeEmbed
        id={videoId}
        title={title}
        poster="maxresdefault"
        noCookie={true}
        params="controls=1&modestbranding=1&rel=0&enablejsapi=1"
        onIframeAdded={() => {
          sendGAEvent('event', 'video_play', {
            video_title: title,
            video_provider: 'youtube',
            video_id: videoId,
            video_location: location,
          });
        }}
      />
    </div>
  );
}
