import { useMemo, useState } from 'react';
import { ChefHat, Bath, BedDouble, Home, Sofa, type LucideIcon } from 'lucide-react';
import { designs } from '../data/designs';
import type { BudgetBand, RoomKey, StyleKey } from '../types';
import { SectionHeading } from '../components/SectionHeading';
import { SmartImage } from '../components/SmartImage';
import { useEnquiry } from '../context/EnquiryContext';
import { roomToService } from '../data/roomService';
import { budgetOptionForBand } from '../utils/budget';

const rooms: Array<{ key: RoomKey; icon: LucideIcon }> = [
  { key: 'Kitchen', icon: ChefHat },
  { key: 'Living room', icon: Sofa },
  { key: 'Bedroom', icon: BedDouble },
  { key: 'Bathroom', icon: Bath },
  { key: 'Full home', icon: Home },
];
const styles: StyleKey[] = ['Minimalist', 'Luxury', 'Earthy', 'Scandinavian', 'Indian Contemporary'];
const budgets: BudgetBand[] = ['Under 5L', '5L - 10L', '10L - 20L', '20L+'];

export function RoomSelector() {
  const [room, setRoom] = useState<RoomKey>('Living room');
  const [style, setStyle] = useState<StyleKey | 'Any'>('Any');
  const [budget, setBudget] = useState<BudgetBand | 'Any'>('Any');
  const { openEnquiry } = useEnquiry();

  const results = useMemo(
    () => designs.filter((d) => d.room === room && (style === 'Any' || d.style === style) && (budget === 'Any' || d.budget === budget)),
    [room, style, budget],
  );

  const enquire = () =>
    openEnquiry({
      service: roomToService[room],
      budget: budget === 'Any' ? undefined : budgetOptionForBand(budget),
      message: `Design preferences - Space: ${room}. Style: ${style}. Budget band: ${budget}.`,
      source: 'Design inspiration selector',
    });

  return (
    <section id="inspiration" aria-labelledby="inspiration-title" className="section bg-ivory">
      <div className="container-x">
        <SectionHeading id="inspiration-title" eyebrow="Find your style" title="Design inspiration, tailored to your space" intro="Pick a space, then narrow by style and budget. Send your preferences to us in one click." />
        <div role="group" aria-label="Choose a space" className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {rooms.map(({ key, icon: Icon }) => (
            <button key={key} type="button" aria-pressed={room === key} onClick={() => setRoom(key)}
              className={`flex min-h-[88px] flex-col items-center justify-center gap-2 border p-4 text-sm font-medium transition ${room === key ? 'border-charcoal bg-charcoal text-ivory' : 'border-line bg-white/60 text-charcoal hover:border-charcoal'} last:col-span-2 sm:last:col-span-1`}>
              <Icon size={24} strokeWidth={1.4} aria-hidden /> {key}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <fieldset>
            <legend className="field-label">Style</legend>
            <div className="flex flex-wrap gap-2">
              {(['Any', ...styles] as const).map((s) => <button key={s} type="button" className="chip" aria-pressed={style === s} onClick={() => setStyle(s)}>{s}</button>)}
            </div>
          </fieldset>
          <fieldset>
            <legend className="field-label">Approximate budget (indicative)</legend>
            <div className="flex flex-wrap gap-2">
              {(['Any', ...budgets] as const).map((b) => <button key={b} type="button" className="chip" aria-pressed={budget === b} onClick={() => setBudget(b)}>{b}</button>)}
            </div>
          </fieldset>
        </div>

        <p className="mt-10 text-sm text-taupe" aria-live="polite" data-testid="inspiration-count">{results.length} {results.length === 1 ? 'idea' : 'ideas'} for {room.toLowerCase()}</p>
        {results.length === 0 ? (
          <div className="mt-4 border border-dashed border-line p-10 text-center">
            <p className="font-serif text-2xl">No ready-made ideas match all three filters</p>
            <p className="mx-auto mt-2 max-w-md text-ink/80">Try widening the style or budget - or send your preferences and our designers will suggest options.</p>
            <button type="button" className="btn btn-outline mt-5" onClick={() => { setStyle('Any'); setBudget('Any'); }}>Reset style &amp; budget</button>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.slice(0, 6).map((d) => (
              <figure key={d.id} className="group">
                <div className="aspect-[4/3] overflow-hidden"><SmartImage src={d.image} alt={d.title} className="h-full w-full transition-transform duration-700 group-hover:scale-105" width={800} height={600} sizes="(min-width: 1024px) 33vw, 100vw" /></div>
                <figcaption className="mt-3"><span className="font-serif text-xl">{d.title}</span><span className="block text-xs text-taupe">{d.style} · {d.budget}</span></figcaption>
              </figure>
            ))}
          </div>
        )}
        <div className="mt-10"><button type="button" className="btn btn-bronze" onClick={enquire}>Send these preferences to our designers</button></div>
      </div>
    </section>
  );
}
