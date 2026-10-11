import { Phone } from 'lucide-react';
import { contact, offers } from '../config/site';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';

export function ConsultCTA() {
  const { openEnquiry } = useEnquiry();
  return (
    <section id="offers" aria-labelledby="offers-title" className="bg-bronze-dark py-20 text-ivory">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="eyebrow !text-sand">Free consultation</p>
          <h2 id="offers-title" className="h-section mt-3 !text-ivory">Ready to see your home differently?</h2>
          <p className="mt-4 max-w-xl text-sand">Book a no-obligation consultation. We will talk through your needs, budget and timeline, and outline the next steps.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="btn btn-light" onClick={() => openEnquiry({ source: 'Consultation banner' })}>Book Free Consultation</button>
            <a href={`tel:${contact.phoneTel}`} className="btn btn-ghost-light"><Phone size={16} /> Call Us</a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="space-y-4 border-l border-sand/40 pl-6">
            {offers.map((o) => <li key={o.id}><h3 className="font-sans text-base font-semibold !text-ivory">{o.title}</h3><p className="text-sm text-sand">{o.text}</p></li>)}
          </ul>
          <p className="mt-4 text-xs text-sand/80">Offers shown are demo content - confirm before publishing.</p>
        </Reveal>
      </div>
    </section>
  );
}
