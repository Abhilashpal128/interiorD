import { useCallback, useEffect, useState, type FocusEvent } from 'react';

export function useAutoCarousel(slideCount: number, intervalMs = 3000) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const activeIndex = slideCount > 0 ? index % slideCount : 0;

  const step = useCallback((direction: number) => {
    if (slideCount > 0) setIndex((current) => (current + direction + slideCount) % slideCount);
  }, [slideCount]);

  const goTo = useCallback((target: number) => {
    if (slideCount > 0) setIndex(((target % slideCount) + slideCount) % slideCount);
  }, [slideCount]);

  const toggleAutoPlay = useCallback(() => {
    setPointerInside(false);
    setFocusInside(false);
    setIsPlaying((playing) => !playing);
  }, []);

  const handleBlurCapture = useCallback((event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusInside(false);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setIsPlaying(!preference.matches);
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (!isPlaying || pointerInside || focusInside || slideCount < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % slideCount), intervalMs);
    return () => window.clearInterval(timer);
  }, [activeIndex, focusInside, intervalMs, isPlaying, pointerInside, slideCount]);

  return {
    activeIndex,
    isPlaying,
    step,
    goTo,
    toggleAutoPlay,
    interactionHandlers: {
      onPointerEnter: () => setPointerInside(true),
      onPointerLeave: () => setPointerInside(false),
      onFocusCapture: () => setFocusInside(true),
      onBlurCapture: handleBlurCapture,
    },
  };
}
