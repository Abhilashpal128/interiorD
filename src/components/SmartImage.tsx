import { useState, type CSSProperties } from 'react';
import { FALLBACK_IMAGE } from '../data/images';

interface SmartImageProps {
  src: string;
  alt: string;
  /** Intrinsic size used to reserve space and avoid layout shift (CSS decides the displayed size). */
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes?: string;
}

const WIDTHS = [480, 800, 1200, 1600];

function buildSrcSet(src: string): string | undefined {
  if (!src.includes('images.unsplash.com') || !/[?&]w=\d+/.test(src)) return undefined;
  return WIDTHS.map((w) => `${src.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`).join(', ');
}

/** Lazy-loaded responsive image with a graceful fallback if the URL fails. */
export function SmartImage({ src, alt, width = 1200, height = 800, className, style, priority, sizes = '(min-width: 1024px) 50vw, 100vw' }: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const finalSrc = failed ? FALLBACK_IMAGE : src;
  return (
    <img
      src={finalSrc}
      srcSet={failed ? undefined : buildSrcSet(src)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      onError={() => setFailed(true)}
      className={`bg-sand object-cover ${className ?? ''}`}
      style={style}
    />
  );
}
