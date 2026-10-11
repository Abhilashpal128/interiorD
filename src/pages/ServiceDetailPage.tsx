import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { services } from '../data/services';
import { useSeo } from '../hooks/useSeo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SmartImage } from '../components/SmartImage';
import { useEnquiry } from '../context/EnquiryContext';
import NotFoundPage from './NotFoundPage';

export default function ServiceDetailPage() {
  const { id = '' } = useParams();
  const service = services.find((s) => s.id === id);
  const { openEnquiry } = useEnquiry();
  useSeo({ title: service?.title ?? 'Service not found', description: service?.short, path: `/services/${id}`, image: service?.image, noindex: !service });
  if (!service) return <NotFoundPage />;
  const others = services.filter((s) => s.id !== service.id).slice(0, 4);

  return (
    <article className="container-x py-10 sm:py-14">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/#services' }, { label: service.title }]} />
      <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Our services</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight sm:text-6xl">{service.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/85">{service.long}</p>
          <ul className="mt-6 space-y-3">{service.highlights.map((h) => <li key={h} className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-bronze" aria-hidden />{h}</li>)}</ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="btn btn-bronze" onClick={() => openEnquiry({ service: service.title, source: `Service page: ${service.title}` })}>Enquire about this service</button>
            <Link to="/#estimate" className="btn btn-outline">Try the budget estimator</Link>
          </div>
        </div>
        <SmartImage src={service.image} alt={`${service.title} - example interior`} className="aspect-[4/5] w-full shadow-lift" width={1000} height={1250} priority sizes="(min-width:1024px) 45vw, 100vw" />
      </div>
      <section className="mt-20" aria-labelledby="more-services"><h2 id="more-services" className="font-serif text-3xl">Other services</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{others.map((s) => <li key={s.id}><Link to={`/services/${s.id}`} className="block border border-line p-5 transition hover:border-charcoal"><span className="font-serif text-xl">{s.title}</span><span className="mt-1 block text-sm text-ink/75">{s.short}</span></Link></li>)}</ul>
      </section>
    </article>
  );
}
