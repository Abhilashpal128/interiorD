import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface Props {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}

/** Draggable comparison slider. Works with mouse, touch, pen and keyboard (arrow keys / Home / End). */
export function BeforeAfter({ before, after, beforeAlt, afterAlt }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => dragging.current && update(e.clientX);
  const stop = () => {
    dragging.current = false;
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - step));
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + step));
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={`${Math.round(pos)}% before image visible`}
      data-testid="before-after"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      onKeyDown={onKeyDown}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden bg-sand sm:aspect-[16/10]"
      style={{ touchAction: 'pan-y' }}
    >
      <SmartImage src={after} alt={afterAlt} className="pointer-events-none absolute inset-0 h-full w-full" sizes="(min-width: 1024px) 60vw, 100vw" />
      <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SmartImage src={before} alt={beforeAlt} className="absolute inset-0 h-full w-full [filter:saturate(.55)_brightness(.92)]" sizes="(min-width: 1024px) 60vw, 100vw" />
      </div>
      <span className="pointer-events-none absolute left-3 top-3 bg-charcoal/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ivory">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 bg-bronze px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-ivory shadow-[0_0_0_1px_rgba(0,0,0,.15)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-charcoal shadow-lift">
          <MoveHorizontal size={20} />
        </span>
      </div>
    </div>
  );
}
