import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { demoTestimonials, testimonials } from '../data/testimonials';
import { SectionHeading } from '../components/SectionHeading';

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % n), 7000);
    return () => window.clearInterval(t);
  }, [paused, n]);

  const t = testimonials[i]!;
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section bg-sand/40" aria-roledescription="carousel">
      <div className="container-x">
        <SectionHeading id="testimonials-title" eyebrow="Testimonials" title="What homeowners say" intro={demoTestimonials ? 'Demo reviews shown for layout only. They are not real customer reviews.' : undefined} />
        <div className="relative mx-auto max-w-4xl bg-ivory p-8 shadow-soft sm:p-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <Quote className="text-bronze/50" size={44} strokeWidth={1.2} aria-hidden />
          <figure aria-live="polite" data-testid="testimonial">
            <blockquote className="mt-4 font-serif text-2xl leading-snug text-charcoal sm:text-[1.9rem]">{t.text}</blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-4">
              {t.photo ? <img src={t.photo} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" /> : <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-charcoal font-serif text-xl text-sand">{t.name[0]}</span>}
              <div>
                <p className="font-semibold text-charcoal">{t.name} {demoTestimonials && <span className="ml-1 rounded bg-sand px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-bronze-dark">Demo</span>}</p>
                <p className="text-sm text-taupe">{t.projectType} · {t.location}</p>
              </div>
              <p className="ml-auto flex gap-0.5 text-bronze" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, k) => <Star key={k} size={18} fill={k < t.rating ? 'currentColor' : 'none'} />)}
              </p>
            </figcaption>
          </figure>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2" role="group" aria-label="Choose testimonial">
              {testimonials.map((x, k) => <button key={x.id} type="button" onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} aria-current={k === i} className="grid h-8 w-8 place-items-center"><span className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-bronze' : 'w-2 bg-taupe/40'}`} /></button>)}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center border border-line hover:bg-charcoal hover:text-ivory"><ChevronLeft size={20} /></button>
              <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center border border-line hover:bg-charcoal hover:text-ivory"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
