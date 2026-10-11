import { materials } from '../data/materials';
import { SectionHeading } from '../components/SectionHeading';
import { SmartImage } from '../components/SmartImage';
import { Reveal } from '../components/Reveal';

export function Materials() {
  return (
    <section id="materials" aria-labelledby="materials-title" className="section bg-ivory">
      <div className="container-x">
        <SectionHeading id="materials-title" eyebrow="Materials & quality" title="Finishes chosen for how they live and age" intro="Indicative price tiers: ₹ is economical, ₹₹₹₹ is premium. Exact brands and rates appear in your quotation." />
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 0.05}>
              <article>
                <div className="aspect-[4/3] overflow-hidden"><SmartImage src={m.image} alt={`${m.name} finish sample`} className="h-full w-full" width={900} height={675} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" /></div>
                <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <h3 className="font-serif text-2xl">{m.name}</h3>
                  <span className="text-sm font-semibold text-bronze-dark" aria-label={`Price tier ${m.priceTier}`}>{m.priceTier}</span>
                </div>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/85">{m.description}</p>
                <p className="mt-2 text-xs text-taupe"><span className="font-semibold text-charcoal">Best for:</span> {m.bestFor}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
