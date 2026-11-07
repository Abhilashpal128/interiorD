import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { services } from '../data/services';
import { SmartImage } from '../components/SmartImage';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';

const featuredIds = ['construction-civil-work', 'home-renovation', 'interior-work', 'furniture-carpentry'];
const featured = featuredIds.map((id) => services.find((service) => service.id === id)!);

export function Services() {
  const [active, setActive] = useState<string | null>('construction-civil-work');
  const { openEnquiry } = useEnquiry();
  const selected = featured.find((service) => service.id === active) ?? featured[0]!;
  return (
    <section id="services" aria-labelledby="services-title" className="section services-section">
      <div className="container-x">
        <Reveal className="section-topline"><p className="eyebrow"><span className="section-index">03 /</span> What we do</p><h2 id="services-title" className="h-section !text-ivory">One vision.<br /><em>Every possibility.</em></h2><p className="section-side-copy">A single room or a whole new beginning. Discover a considered approach to every part of your space.</p></Reveal>
        <div className="services-layout">
          <div className="service-visual"><SmartImage key={selected.id} src={selected.image} alt={selected.imageAlt} className="h-full w-full" width={1000} height={1200} /><span>Quality. Durability. Reliability.</span></div>
          <div className="service-list">
            {featured.map((service, index) => <article key={service.id} className={`service-row ${active === service.id ? 'is-open' : ''}`}>
              <button type="button" className="service-toggle" aria-expanded={active === service.id} aria-controls={`service-panel-${service.id}`} onClick={() => setActive(active === service.id ? null : service.id)}><span className="service-number">0{index + 1}</span><span>{service.title}</span>{active === service.id ? <Minus size={20} /> : <Plus size={20} />}</button>
              <div id={`service-panel-${service.id}`} hidden={active !== service.id} className="service-body"><p>{service.short}</p><Link to={`/services/${service.id}`} className="text-link">Explore service <ArrowUpRight size={16} /></Link></div>
              <button type="button" className="service-enquiry" aria-label={`Enquire about ${service.title}`} onClick={() => openEnquiry({ service: service.title, source: `Service card: ${service.title}` })}>Discuss your project <ArrowUpRight size={14} /></button>
            </article>)}
          </div>
        </div>
        <div className="specialist-services"><h3>From the foundations to the finishing touches.</h3><div>{services.filter((service) => !featuredIds.includes(service.id)).map((service) => <Link key={service.id} to={`/services/${service.id}`}>{service.title}<ArrowUpRight size={18} /></Link>)}</div></div>
      </div>
    </section>
  );
}
