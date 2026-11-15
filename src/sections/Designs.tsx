import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Pause, Play } from 'lucide-react';
import { designCategories, designs } from '../data/designs';
import type { DesignCategory, DesignItem } from '../types';
import { SectionHeading } from '../components/SectionHeading';
import { SmartImage } from '../components/SmartImage';
import { Modal } from '../components/Modal';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';
import { photoAlt } from '../data/media';
import { useAutoCarousel } from '../hooks/useAutoCarousel';

export function Designs() {
  const [category, setCategory] = useState<DesignCategory | 'All'>('All');
  const [selected, setSelected] = useState<DesignItem | null>(null);
  const filtered = useMemo(() => (category === 'All' ? designs : designs.filter((d) => d.category === category)), [category]);
  const visible = filtered;
  const { activeIndex, isPlaying, step, goTo, toggleAutoPlay, interactionHandlers } = useAutoCarousel(visible.length);
  const design = visible[activeIndex]!;

  return (
    <section id="designs" aria-labelledby="designs-title" className="section bg-sand/40">
      <div className="container-x">
        <SectionHeading id="designs-title" eyebrow="A closer look" title="It’s all in the details." intro="Explore the colours, shapes and thoughtful touches in our interiors and installations." />
        <div role="group" aria-label="Filter designs by category" className="hide-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {(['All', ...designCategories] as const).map((c) => (
            <button key={c} type="button" className="chip shrink-0" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{visible.length} designs shown</p>
        <Reveal>
          <div className="design-carousel" role="region" aria-label="Featured design ideas" aria-roledescription="carousel" {...interactionHandlers}>
            <button type="button" onClick={() => setSelected(design)} className="design-carousel-image" data-testid="design-grid" aria-label={`View design: ${design.title}`}>
              <SmartImage src={design.image} alt={photoAlt(design.image) ?? design.title} className="h-full w-full" width={1500} height={1000} sizes="(min-width: 1024px) 65vw, 100vw" />
              <span aria-hidden className="design-carousel-shade" />
              <span className="design-carousel-image-caption">
                <span>{design.category}</span>
                <strong>{design.title}</strong>
                <Expand size={18} aria-hidden />
              </span>
            </button>
            <div className="design-carousel-copy">
              <p className="eyebrow">{design.category} <span className="section-index">{String(activeIndex + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}</span></p>
              <h3>{design.title}</h3>
              <p>{design.description}</p>
              <div className="design-carousel-controls" role="group" aria-label="Design carousel controls">
                <button type="button" aria-label="Previous design" onClick={() => step(-1)}><ChevronLeft size={18} /></button>
                <button type="button" aria-label="Next design" onClick={() => step(1)}><ChevronRight size={18} /></button>
                <button type="button" aria-label={isPlaying ? 'Pause design carousel' : 'Play design carousel'} aria-pressed={!isPlaying} onClick={toggleAutoPlay}>
                  {isPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
                </button>
              </div>
            </div>
            <div className="design-carousel-thumbnails" role="group" aria-label="Choose a design">
              {visible.map((item, index) => (
                <button key={item.id} type="button" aria-label={`Show design: ${item.title}`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => goTo(index)}>
                  <SmartImage src={item.image} alt="" width={180} height={120} sizes="(min-width: 768px) 12vw, 28vw" />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      <DesignModal design={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function DesignModal({ design, onClose }: { design: DesignItem | null; onClose: () => void }) {
  const { openEnquiry } = useEnquiry();
  const [idx, setIdx] = useState(0);
  const [lastId, setLastId] = useState<string | null>(null);
  if (design && design.id !== lastId) {
    setLastId(design.id);
    setIdx(0);
  }
  const imgs = design?.gallery ?? [];
  const step = (d: number) => setIdx((i) => (i + d + imgs.length) % imgs.length);

  return (
    <Modal open={!!design} onClose={onClose} title={design?.title ?? 'Design'} size="xl">
      {design && (
        <div className="grid lg:grid-cols-[1.25fr_1fr]">
          <div className="relative bg-charcoal">
            <SmartImage src={imgs[idx] ?? design.image} alt={photoAlt(imgs[idx] ?? design.image) ?? design.title} className="aspect-[4/3] w-full !bg-charcoal !object-contain lg:aspect-auto lg:h-full lg:min-h-[480px] lg:max-h-[75vh]" width={1200} height={900} sizes="(min-width: 1024px) 60vw, 100vw" />
            {imgs.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/90 text-charcoal shadow-soft hover:bg-ivory"><ChevronLeft /></button>
                <button type="button" onClick={() => step(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/90 text-charcoal shadow-soft hover:bg-ivory"><ChevronRight /></button>
                <span className="absolute bottom-3 left-3 bg-charcoal/80 px-3 py-1 text-xs text-ivory" aria-live="polite">{idx + 1} / {imgs.length}</span>
              </>
            )}
          </div>
          <div className="p-6 sm:p-9">
            <p className="eyebrow">{design.category}</p>
            <h3 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">{design.title}</h3>
            <p className="mt-4 leading-relaxed text-ink/85">{design.description}</p>
            <dl className="mt-6 space-y-4 text-sm">
              <div><dt className="font-semibold text-charcoal">Room</dt><dd className="text-ink/80">{design.room}</dd></div>
              <div><dt className="font-semibold text-charcoal">Details to notice</dt><dd className="text-ink/80">{design.details.join(' · ')}</dd></div>
              <div>
                <dt className="font-semibold text-charcoal">Palette</dt>
                <dd className="mt-2 flex gap-2">{design.palette.map((c) => <span key={c} title={c} className="h-8 w-8 rounded-full border border-line" style={{ background: c }} />)}</dd>
              </div>
            </dl>
            <button type="button" className="btn btn-bronze mt-8 w-full" onClick={() => { onClose(); openEnquiry({ service: design.service, message: `I like the "${design.title}" design (${design.category}) and would like something similar.`, source: `Design: ${design.title}`, projectId: `design:${design.id}`, projectTitle: design.title }); }}>
              Enquire about this design
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
