import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { designCategories, designs } from '../data/designs';
import type { DesignCategory, DesignItem } from '../types';
import { SectionHeading } from '../components/SectionHeading';
import { SmartImage } from '../components/SmartImage';
import { Modal } from '../components/Modal';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';
import { budgetOptionForBand } from '../utils/budget';
import { roomToService } from '../data/roomService';

export function Designs() {
  const [category, setCategory] = useState<DesignCategory | 'All'>('All');
  const [selected, setSelected] = useState<DesignItem | null>(null);
  const filtered = useMemo(() => (category === 'All' ? designs : designs.filter((d) => d.category === category)), [category]);

  return (
    <section id="designs" aria-labelledby="designs-title" className="section bg-sand/40">
      <div className="container-x">
        <SectionHeading id="designs-title" eyebrow="Featured designs" title="Interiors worth living in" intro="Browse our design directions by style. Open any design to see details, materials and palette." />
        <div role="group" aria-label="Filter designs by category" className="hide-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {(['All', ...designCategories] as const).map((c) => (
            <button key={c} type="button" className="chip shrink-0" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{filtered.length} designs shown</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="design-grid">
          {filtered.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 0.05}>
              <button type="button" onClick={() => setSelected(d)} className="group relative block w-full overflow-hidden text-left" aria-label={`View design: ${d.title}`}>
                <SmartImage src={d.image} alt={`${d.title}: ${d.category} interior`} className={`w-full transition-transform duration-700 group-hover:scale-105 ${i % 5 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} width={900} height={i % 5 === 0 ? 1125 : 675} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/5 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-x-4 bottom-4 text-ivory">
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sand">{d.category}</span>
                  <span className="mt-1 flex items-center justify-between gap-3 font-serif text-2xl leading-tight">{d.title}<Expand size={18} aria-hidden className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" /></span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
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
            <SmartImage src={imgs[idx] ?? design.image} alt={`${design.title} - view ${idx + 1} of ${imgs.length}`} className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[480px]" width={1200} height={900} sizes="(min-width: 1024px) 60vw, 100vw" />
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
              <div><dt className="font-semibold text-charcoal">Indicative budget band</dt><dd className="text-ink/80">{design.budget} (indicative only)</dd></div>
              <div><dt className="font-semibold text-charcoal">Key materials</dt><dd className="text-ink/80">{design.materials.join(' · ')}</dd></div>
              <div>
                <dt className="font-semibold text-charcoal">Palette</dt>
                <dd className="mt-2 flex gap-2">{design.palette.map((c) => <span key={c} title={c} className="h-8 w-8 rounded-full border border-line" style={{ background: c }} />)}</dd>
              </div>
            </dl>
            <button type="button" className="btn btn-bronze mt-8 w-full" onClick={() => { onClose(); openEnquiry({ service: roomToService[design.room], budget: budgetOptionForBand(design.budget), message: `I like the "${design.title}" design (${design.category}) and would like something similar.`, source: `Design: ${design.title}`, projectId: `design:${design.id}`, projectTitle: design.title }); }}>
              Enquire about this design
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
