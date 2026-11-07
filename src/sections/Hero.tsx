import { useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { photos } from '../data/media';
import { SmartImage } from '../components/SmartImage';
import { company, hero } from '../config/site';

const slides = [
  { image: photos.livingDining.src, title: 'Spaces to live.', accent: 'Stories to tell.', label: 'Living & dining', detail: 'Sculpted walls. Layered light. Considered interiors.', alt: photos.livingDining.alt },
  { image: photos.tealStorage.src, title: 'Considered design.', accent: 'Every detail.', label: 'Furniture & carpentry', detail: 'Thoughtful storage for the way you live.', alt: photos.tealStorage.alt },
  { image: photos.sunset.src, title: 'Your vision.', accent: 'Beautifully built.', label: 'Windows & glazing', detail: 'A wider view. A space filled with light.', alt: photos.sunset.alt },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const slide = slides[active]!;
  const step = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);
  return (
    <section id="home" aria-labelledby="hero-title" className="hero-stage">
      <div className="hero-images">
        {slides.map((item, index) => (
          <div key={item.image} className={`hero-image ${active === index ? 'is-active' : ''}`} aria-hidden={active !== index}>
            <SmartImage src={item.image} alt={item.alt} priority={index === 0} width={1920} height={1280} sizes="100vw" className="h-full w-full" />
          </div>
        ))}
      </div>
      <div className="hero-shade" />
      <div className="container-x hero-content">
        <p className="eyebrow !text-white/90"><span className="eyebrow-line" />{hero.eyebrow}</p>
        <div aria-live="polite" aria-atomic="true">
          <h1 id="hero-title" className="hero-title">{slide.title}<br /><em>{slide.accent}</em></h1>
        </div>
        <p className="hero-description">{company.name} · Shailesh &amp; Dinesh<br />Kandivali East, Mumbai</p>
        <div className="hero-actions"><a href="#projects" className="hero-link">Explore our work <span><ArrowUpRight size={21} /></span></a><a href="#walkthroughs" className="hero-video-link"><Play size={14} fill="currentColor" /> Watch our walkthroughs</a></div>
      </div>
      <div className="container-x hero-bottom">
        <a href="#about" className="scroll-cue"><ArrowDown size={17} /> Scroll to discover</a>
        <div className="hero-caption"><span>{slide.label}</span><p>{slide.detail}</p></div>
        <div className="hero-controls" role="group" aria-label="Featured spaces">
          <button type="button" aria-label="Previous featured space" onClick={() => step(-1)}><ChevronLeft size={18} /></button>
          <span><b>{String(active + 1).padStart(2, '0')}</b><span className="hero-counter-line" />{String(slides.length).padStart(2, '0')}</span>
          <button type="button" aria-label="Next featured space" onClick={() => step(1)}><ChevronRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
