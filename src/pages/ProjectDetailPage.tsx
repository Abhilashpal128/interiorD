import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProject, projects } from '../data/projects';
import { useSeo } from '../hooks/useSeo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SmartImage } from '../components/SmartImage';
import { useEnquiry } from '../context/EnquiryContext';
import { projectEnquiry } from '../utils/projectEnquiry';
import { sqft } from '../utils/format';
import NotFoundPage from './NotFoundPage';

export default function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const [idx, setIdx] = useState(0);
  const { openEnquiry } = useEnquiry();
  useSeo({
    title: project ? project.title : 'Project not found',
    description: project?.description,
    path: `/projects/${slug}`,
    image: project?.cover,
    noindex: !project,
  });
  if (!project) return <NotFoundPage />;

  const imgs = project.gallery;
  const step = (d: number) => setIdx((i) => (i + d + imgs.length) % imgs.length);
  const related = projects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3);
  const facts: Array<[string, string]> = [
    ['Location', project.location], ['Property type', project.propertyType], ['Area', sqft(project.areaSqft)],
    ['Design style', project.style], ['Budget range', project.budgetRange], ['Duration', project.duration],
  ];

  return (
    <article className="container-x py-10 sm:py-14">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/#projects' }, { label: project.title }]} />
      <h1 className="mt-6 font-serif text-4xl font-medium sm:text-6xl">{project.title}</h1>
      <p className="mt-2 text-taupe">{project.location} · {project.style} · Demo project</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="relative bg-charcoal">
            <SmartImage src={imgs[idx] ?? project.cover} alt={`${project.title}, image ${idx + 1} of ${imgs.length}`} className="aspect-[4/3] w-full" width={1400} height={1050} priority sizes="(min-width:1024px) 60vw, 100vw" />
            {imgs.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/90 hover:bg-ivory"><ChevronLeft /></button>
                <button type="button" onClick={() => step(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/90 hover:bg-ivory"><ChevronRight /></button>
                <span aria-live="polite" className="absolute bottom-3 left-3 bg-charcoal/80 px-3 py-1 text-xs text-ivory">{idx + 1} / {imgs.length}</span>
              </>
            )}
          </div>
          <ul className="mt-3 grid grid-cols-4 gap-3" aria-label="Project images">
            {imgs.map((src, i) => (
              <li key={src + i}><button type="button" onClick={() => setIdx(i)} aria-label={`Show image ${i + 1}`} aria-current={i === idx} className={`block w-full overflow-hidden border-2 ${i === idx ? 'border-bronze' : 'border-transparent opacity-70 hover:opacity-100'}`}><SmartImage src={src} alt="" className="aspect-[4/3] w-full" width={300} height={225} sizes="150px" /></button></li>
            ))}
          </ul>
        </div>
        <aside>
          <p className="leading-relaxed text-ink/90">{project.description}</p>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {facts.map(([k, v]) => <div key={k} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-taupe">{k}</dt><dd className="text-right font-medium text-charcoal">{v}</dd></div>)}
          </dl>
          <h2 className="mt-6 font-serif text-2xl">Scope of work</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/85">{project.scope.map((s) => <li key={s}>{s}</li>)}</ul>
          <button type="button" className="btn btn-bronze mt-8 w-full" onClick={() => openEnquiry(projectEnquiry(project, 'Project page'))}>Plan a Similar Project</button>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-20" aria-labelledby="related-title">
          <h2 id="related-title" className="font-serif text-3xl">More projects</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((p) => <li key={p.id}><Link to={`/projects/${p.slug}`} className="group block"><SmartImage src={p.cover} alt={p.title} className="aspect-[4/3] w-full" width={600} height={450} sizes="33vw" /><span className="mt-2 block font-serif text-xl group-hover:text-bronze-dark">{p.title}</span><span className="text-sm text-taupe">{p.location}</span></Link></li>)}
          </ul>
        </section>
      )}
    </article>
  );
}
