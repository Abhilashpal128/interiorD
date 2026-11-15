import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, Search } from 'lucide-react';
import { projectCategories, projects } from '../data/projects';
import { SmartImage } from '../components/SmartImage';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';
import { photoAlt } from '../data/media';
import { projectEnquiry } from '../utils/projectEnquiry';
import { useAutoCarousel } from '../hooks/useAutoCarousel';

export function Portfolio() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>('All');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const { openEnquiry } = useEnquiry();
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => (category === 'All' || p.category === category) && (!q || [p.title, p.style, p.service, p.description].join(' ').toLowerCase().includes(q)));
  }, [category, query]);
  const curated = !showAll && category === 'All' && !query.trim();
  const visible = curated ? filtered.slice(0, 4) : filtered;
  const { activeIndex, isPlaying, step, goTo, toggleAutoPlay, interactionHandlers } = useAutoCarousel(curated ? visible.length : 0);

  const projectCard = (project: (typeof projects)[number], index: number) => (
    <article data-testid="project-card">
      <Link to={`/projects/${project.slug}`} className="project-image-link portfolio-carousel-image" aria-label={`View project: ${project.title}`}>
        <SmartImage src={project.cover} alt={photoAlt(project.cover) ?? project.title} className="h-full w-full" width={1400} height={900} sizes="(min-width: 1024px) 90vw, 100vw" />
        <span className="project-image-label">{project.category} / {project.style}</span><span className="project-image-arrow"><ArrowUpRight size={24} /></span>
      </Link>
      <div className="project-description"><div><p>{project.stage} <span>/</span> {project.gallery.length} {project.gallery.length === 1 ? 'photograph' : 'photographs'}</p><h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3></div><span className="project-index">{String(index + 1).padStart(2, '0')}</span></div>
      <button type="button" className="project-enquiry" onClick={() => openEnquiry(projectEnquiry(project, 'Portfolio card'))}>Plan a Similar Project <ArrowUpRight size={14} /></button>
    </article>
  );

  return (
    <section id="projects" aria-labelledby="projects-title" className="section portfolio-section">
      <div className="container-x">
        <Reveal className="section-topline"><p className="eyebrow"><span className="section-index">02 /</span> Our work</p><h2 id="projects-title" className="h-section">Different spaces.<br /><em>A shared attention to detail.</em></h2><p className="section-side-copy">Step inside our work: interiors, bespoke carpentry, glazing and the details that bring a space together.</p></Reveal>
        <div className="portfolio-toolbar">
          <div role="group" aria-label="Filter projects by type" className="project-filters">
            {projectCategories.map((c) => <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}
          </div>
          <div className="project-search"><label htmlFor="project-search" className="sr-only">Search our work</label><Search size={16} aria-hidden /><input id="project-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a room or detail" /></div>
        </div>
        <div className="portfolio-note"><span>S&amp;D Build Solutions · Work gallery</span><span aria-live="polite" data-testid="project-count">{visible.length} of {filtered.length} {filtered.length === 1 ? 'collection' : 'collections'}</span></div>
        {filtered.length === 0 ? (
          <div className="border border-dashed border-line p-12 text-center" data-testid="projects-empty"><h3 className="font-serif text-3xl">No projects match your search</h3><p className="mt-2 text-ink/80">Try a different keyword or clear the filters.</p><button type="button" className="btn btn-outline mt-5" onClick={() => { setQuery(''); setCategory('All'); }}>Clear filters</button></div>
        ) : curated ? (
          <div className="portfolio-carousel" role="region" aria-label="Featured work" aria-roledescription="carousel" {...interactionHandlers}>
            <div className="portfolio-carousel-stage">
              {visible.map((project, index) => (
                <div key={project.id} className={`portfolio-carousel-slide ${activeIndex === index ? 'is-active' : ''}`} aria-hidden={activeIndex !== index}>
                  {projectCard(project, index)}
                </div>
              ))}
            </div>
            <div className="portfolio-carousel-controls">
              <div className="portfolio-carousel-pagination" role="group" aria-label="Choose a featured project">
                {visible.map((project, index) => (
                  <button key={project.id} type="button" aria-label={`Show featured project: ${project.title}`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => goTo(index)} />
                ))}
              </div>
              <div className="portfolio-carousel-buttons" role="group" aria-label="Featured project controls">
                <span>{String(activeIndex + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}</span>
                <button type="button" aria-label="Previous featured project" onClick={() => step(-1)}><ChevronLeft size={18} /></button>
                <button type="button" aria-label="Next featured project" onClick={() => step(1)}><ChevronRight size={18} /></button>
                <button type="button" aria-label={isPlaying ? 'Pause project carousel' : 'Play project carousel'} aria-pressed={!isPlaying} onClick={toggleAutoPlay}>
                  {isPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="project-grid">
            {visible.map((project, index) => (
              <Reveal key={project.id} className="project-item">{projectCard(project, index)}</Reveal>
            ))}
          </div>
        )}
        {!query.trim() && category === 'All' && <div className="portfolio-more"><button type="button" className="text-link" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show selected projects' : 'Explore all projects'}<ArrowDown size={18} className={showAll ? 'rotate-180' : ''} /></button></div>}
      </div>
    </section>
  );
}
