import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquarePlus } from 'lucide-react';
import { services } from '../data/services';
import { SectionHeading } from '../components/SectionHeading';
import { SmartImage } from '../components/SmartImage';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';

const aspect = { tall: 'aspect-[4/5]', wide: 'aspect-[4/3]', square: 'aspect-square' } as const;

export function Services() {
  const { openEnquiry } = useEnquiry();
  return (
    <section id="services" aria-labelledby="services-title" className="section bg-ivory">
      <div className="container-x">
        <SectionHeading id="services-title" eyebrow="Our services" title="Everything your home needs, planned together" intro="Choose a single service or let us run the whole project. Each one is designed, costed and delivered by the same team." />
        <div className="gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.06} className="mb-8 break-inside-avoid">
              <article className="group">
                <Link to={`/services/${s.id}`} className={`relative block overflow-hidden ${aspect[s.layout]}`} aria-label={`Explore ${s.title}`}>
                  <SmartImage src={s.image} alt={`${s.title} - example interior`} width={900} height={s.layout === 'tall' ? 1125 : s.layout === 'wide' ? 675 : 900} className="h-full w-full transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <span className="font-serif text-2xl font-medium leading-tight text-ivory">{s.title}</span>
                    <ArrowUpRight aria-hidden className="shrink-0 text-ivory transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </Link>
                <div className="pt-4">
                  <p className="text-[0.95rem] leading-relaxed text-ink/85">{s.short}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <Link to={`/services/${s.id}`} className="link-arrow">Explore Service <ArrowUpRight size={15} aria-hidden /></Link>
                    <button type="button" onClick={() => openEnquiry({ service: s.title, source: `Service card: ${s.title}` })} className="link-arrow !text-bronze-dark" aria-label={`Enquire about ${s.title}`}>
                      <MessageSquarePlus size={15} aria-hidden /> Enquire
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
