import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import type { Faq } from '../types';

export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-serif text-xl font-medium text-charcoal transition hover:text-bronze-dark sm:text-[1.35rem]"
              >
                {item.q}
                <Plus aria-hidden size={22} className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 leading-relaxed text-ink/85">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
