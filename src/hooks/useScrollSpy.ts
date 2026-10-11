import { useEffect, useState } from 'react';

/** Returns the id of the section currently nearest the top of the viewport. */
export function useScrollSpy(ids: readonly string[], enabled = true): string {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.6] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, enabled]);
  return active;
}
