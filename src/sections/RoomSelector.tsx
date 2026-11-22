import { useMemo, useState } from 'react';
import { ChefHat, Bath, BedDouble, Home, Sofa, type LucideIcon } from 'lucide-react';
import { designs } from '../data/designs';
import type { RoomKey } from '../types';
import { SectionHeading } from '../components/SectionHeading';
import { SmartImage } from '../components/SmartImage';
import { useEnquiry } from '../context/EnquiryContext';
import { roomToService } from '../data/roomService';

const rooms: Array<{ key: RoomKey; icon: LucideIcon }> = [
  { key: 'Kitchen', icon: ChefHat },
  { key: 'Living room', icon: Sofa },
  { key: 'Bedroom', icon: BedDouble },
  { key: 'Bathroom', icon: Bath },
  { key: 'Full home', icon: Home },
];

export function RoomSelector() {
  const [room, setRoom] = useState<RoomKey>('Living room');
  const { openEnquiry } = useEnquiry();

  const results = useMemo(
    () => designs.filter((d) => d.room === room),
    [room],
  );

  const enquire = () =>
    openEnquiry({
      service: roomToService[room],
      message: `I would like to discuss interior work for my ${room.toLowerCase()}.`,
      source: 'Design inspiration selector',
    });

  return (
    <section id="inspiration" aria-labelledby="inspiration-title" className="section bg-ivory">
      <div className="container-x">
        <SectionHeading id="inspiration-title" eyebrow="Explore the details" title="Ideas for your space" intro="Choose a room to explore details from our work, then tell us about your own space." />
        <div role="group" aria-label="Choose a space" className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {rooms.map(({ key, icon: Icon }) => (
            <button key={key} type="button" aria-pressed={room === key} onClick={() => setRoom(key)}
              className={`flex min-h-[88px] flex-col items-center justify-center gap-2 border p-4 text-sm font-medium transition ${room === key ? 'border-charcoal bg-charcoal text-ivory' : 'border-line bg-white/60 text-charcoal hover:border-charcoal'} last:col-span-2 sm:last:col-span-1`}>
              <Icon size={24} strokeWidth={1.4} aria-hidden /> {key}
            </button>
          ))}
        </div>

        <p className="mt-10 text-sm text-taupe" aria-live="polite" data-testid="inspiration-count">{results.length} {results.length === 1 ? 'idea' : 'ideas'} for {room.toLowerCase()}</p>
        {results.length === 0 ? (
          <div className="mt-4 border border-dashed border-line p-10 text-center">
            <p className="font-serif text-2xl">Tell us what you have in mind</p>
            <p className="mx-auto mt-2 max-w-md text-ink/80">We have no photographs of this room type in the current collection. Share your requirements with Shailesh Gaurishankar Pal &amp; Dinesh Dalsingar Rajbhar.</p>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.slice(0, 6).map((d) => (
              <figure key={d.id} className="group">
                <div className="aspect-[4/3] overflow-hidden"><SmartImage src={d.image} alt={d.title} className="h-full w-full transition-transform duration-700 group-hover:scale-105" width={800} height={600} sizes="(min-width: 1024px) 33vw, 100vw" /></div>
                <figcaption className="mt-3"><span className="font-serif text-xl">{d.title}</span><span className="block text-xs text-taupe">{d.category}</span></figcaption>
              </figure>
            ))}
          </div>
        )}
        <div className="mt-10"><button type="button" className="btn btn-bronze" onClick={enquire}>Send these preferences to our designers</button></div>
      </div>
    </section>
  );
}
