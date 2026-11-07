import { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import type { WorkVideo } from '../data/media';
import { SmartImage } from './SmartImage';

/** No MP4 request is made until the visitor presses play. */
export function WorkVideoPlayer({ video }: { video: WorkVideo }) {
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const pauseOther = (event: Event) => {
      if ((event as CustomEvent).detail !== player.current) player.current?.pause();
    };
    const pauseHidden = () => { if (document.hidden) player.current?.pause(); };
    document.addEventListener('sd-video-play', pauseOther);
    document.addEventListener('visibilitychange', pauseHidden);
    const current = player.current;
    const observer = new IntersectionObserver(([entry]) => { if (entry && !entry.isIntersecting) current?.pause(); });
    if (current) observer.observe(current);
    return () => {
      observer.disconnect();
      document.removeEventListener('sd-video-play', pauseOther);
      document.removeEventListener('visibilitychange', pauseHidden);
      current?.pause();
    };
  }, [started, failed]);

  return (
    <div className="work-video-player">
      {!started ? (
        <button type="button" className="video-poster-button" aria-label={`Play video: ${video.title}`} onClick={() => setStarted(true)}>
          <SmartImage src={video.poster} alt="" width={478} height={850} className="video-poster" />
          <span className="video-poster-shade" />
          <span className="video-play-icon"><Play size={27} fill="currentColor" aria-hidden /></span>
          <span className="video-poster-caption">Watch the walkthrough <span>{video.duration}</span></span>
        </button>
      ) : failed ? (
        <div className="video-error" role="alert"><p>This video could not be loaded.</p><button type="button" className="text-link" onClick={() => { setFailed(false); setStarted(false); }}><RotateCcw size={16} /> Try again</button><a href={video.src} target="_blank" rel="noopener noreferrer">Open the video directly</a></div>
      ) : (
        <video ref={player} src={video.src} poster={video.poster} controls playsInline autoPlay muted preload="metadata" aria-label={video.title} onError={() => setFailed(true)} onPlay={() => document.dispatchEvent(new CustomEvent('sd-video-play', { detail: player.current }))}>
          Your browser does not support video. <a href={video.src}>Open {video.title}</a>.
        </video>
      )}
    </div>
  );
}
