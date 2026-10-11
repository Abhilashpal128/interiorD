import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Ruler, Search, Wallet } from 'lucide-react';
import { projectCategories, projects } from '../data/projects';
import { SectionHeading } from '../components/SectionHeading';
import { SmartImage } from '../components/SmartImage';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';
import { sqft } from '../utils/format';
import { projectEnquiry } from '../utils/projectEnquiry';

export function Portfolio() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>('All');
  const [query, setQuery] = useState('');
  const { openEnquiry } = useEnquiry();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => (category === 'All' || p.category === category) && (!q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)));
  }, [category, query]);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section bg-ivory">
      <div className="container-x">
        <SectionHeading id="projects-title" eyebrow="Portfolio" title="Recently completed homes" intro="Illustrative demo projects. Search by name or city, or filter by type." />
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter projects by type" className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {projectCategories.map((c) => (
              <button key={c} type="button" className="chip shrink-0" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          <div className="relative w-full lg:max-w-xs">
            <label htmlFor="project-search" className="sr-only">Search projects by title or location</label>
            <Search size={18} aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-taupe" />
            <input id="project-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title or city" className="field-input !pl-10" />
          </div>
        </div>
        <p className="mb-6 text-sm text-taupe" aria-live="polite" data-testid="project-count">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>

        {filtered.length === 0 ? (
          <div className="border border-dashed border-line p-12 text-center" data-testid="projects-empty">
            <h3 className="font-serif text-2xl">No projects match your search</h3>
            <p className="mt-2 text-ink/80">Try a different keyword or clear the filters.</p>
            <button type="button" className="btn btn-outline mt-5" onClick={() => { setQuery(''); setCategory('All'); }}>Clear filters</button>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.05}>
                <article className="group" data-testid="project-card">
                  <Link to={`/projects/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden" aria-label={`View project: ${p.title}`}>
                    <SmartImage src={p.cover} alt={`${p.title} in ${p.location}`} className="h-full w-full transition-transform duration-700 group-hover:scale-105" width={900} height={675} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                    <span className="absolute left-3 top-3 bg-ivory px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-charcoal">{p.style}</span>
                  </Link>
                  <h3 className="mt-4 font-serif text-2xl leading-tight"><Link to={`/projects/${p.slug}`} className="hover:text-bronze-dark">{p.title}</Link></h3>
                  <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[0.8rem] text-ink/80">
                    <li className="flex items-center gap-1.5"><MapPin size={14} aria-hidden /> {p.location}</li>
                    <li className="flex items-center gap-1.5"><Ruler size={14} aria-hidden /> {sqft(p.areaSqft)}</li>
                    <li className="flex items-center gap-1.5"><Wallet size={14} aria-hidden /> {p.budgetRange}</li>
                    <li className="flex items-center gap-1.5"><Clock size={14} aria-hidden /> {p.duration}</li>
                  </ul>
                  <div className="mt-4 flex items-center gap-6">
                    <Link to={`/projects/${p.slug}`} className="link-arrow">View project</Link>
                    <button type="button" className="link-arrow !text-bronze-dark" onClick={() => openEnquiry(projectEnquiry(p, 'Portfolio card'))}>Plan a Similar Project</button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
