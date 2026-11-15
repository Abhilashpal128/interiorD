import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { photos } from '../data/media';
import { SmartImage } from '../components/SmartImage';
import { company, hero } from '../config/site';
import { useAutoCarousel } from '../hooks/useAutoCarousel';

const slides = [
  { image: photos.mediaWallLivingRoom.src, title: 'Spaces to live.', accent: 'Stories to tell.', label: 'Media wall design', detail: 'Sculpted forms. Display storage. Layered light.', alt: photos.mediaWallLivingRoom.alt },
  { image: photos.mediaWallWarmWood.src, title: 'Considered design.', accent: 'Every detail.', label: 'Media walls', detail: 'Warm timber, open display and integrated light.', alt: photos.mediaWallWarmWood.alt },
  { image: photos.sunset.src, title: 'Your vision.', accent: 'Beautifully built.', label: 'Windows & glazing', detail: 'A wider view. A space filled with light.', alt: photos.sunset.alt },
  { image: photos.mediaWallSoftNeutral.src, title: 'A softer palette.', accent: 'A warmer welcome.', label: 'Media walls', detail: 'Light panels and considered display shelving.', alt: photos.mediaWallSoftNeutral.alt },
  { image: photos.mediaWallSculptedDetail.src, title: 'Soft forms.', accent: 'Strong character.', label: 'Media-wall details', detail: 'Curves and light bring depth to the wall.', alt: photos.mediaWallSculptedDetail.alt },
  { image: photos.mediaWallInstallation.src, title: 'Made with care.', accent: 'Step by step.', label: 'Work in progress', detail: 'Built-in media storage taking shape.', alt: photos.mediaWallInstallation.alt },
  { image: photos.mediaWallMarbleAccent.src, title: 'A striking centrepiece.', accent: 'Made for living.', label: 'Media walls', detail: 'Marble-look finishes and warm display lighting.', alt: photos.mediaWallMarbleAccent.alt },
  { image: photos.mediaWallDarkContrast.src, title: 'Depth and contrast.', accent: 'In balance.', label: 'Media walls', detail: 'Dark finishes paired with illuminated niches.', alt: photos.mediaWallDarkContrast.alt },
  { image: photos.livingDining.src, title: 'Rooms to gather.', accent: 'Details to remember.', label: 'Living & dining', detail: 'Sculpted walls. Layered light. Thoughtful interiors.', alt: photos.livingDining.alt },
  { image: photos.mediaWallCurvedLines.src, title: 'A line of light.', accent: 'A softer edge.', label: 'Media-wall details', detail: 'Curved panels and illuminated display niches.', alt: photos.mediaWallCurvedLines.alt },
  { image: photos.wardrobeDressingNiche.src, title: 'Storage, reimagined.', accent: 'A personal touch.', label: 'Wardrobes & dressing', detail: 'A considered dressing area within full-height storage.', alt: photos.wardrobeDressingNiche.alt },
  { image: photos.wardrobeNeutralPanels.src, title: 'Quietly refined.', accent: 'Made to belong.', label: 'Wardrobes', detail: 'Neutral panels bring a calm rhythm to the room.', alt: photos.wardrobeNeutralPanels.alt },
  { image: photos.wardrobeWaveDetail.src, title: 'Shape meets function.', accent: 'In every detail.', label: 'Wardrobe details', detail: 'A curved panel adds a point of distinction.', alt: photos.wardrobeWaveDetail.alt },
  { image: photos.wardrobeCreamBuiltIn.src, title: 'Room for more.', accent: 'Space for you.', label: 'Wardrobes', detail: 'Full-height storage with a clean, light finish.', alt: photos.wardrobeCreamBuiltIn.alt },
  { image: photos.wardrobeDressingRoom.src, title: 'A place to begin.', accent: 'A place to unwind.', label: 'Dressing rooms', detail: 'Warm light and storage, brought together.', alt: photos.wardrobeDressingRoom.alt },
  { image: photos.wardrobeBedroomStorage.src, title: 'Made for everyday.', accent: 'Designed around you.', label: 'Bedroom storage', detail: 'A tailored storage wall with a dressing area.', alt: photos.wardrobeBedroomStorage.alt },
  { image: photos.wardrobeGlassFront.src, title: 'Light, reflected.', accent: 'Space, considered.', label: 'Wardrobes', detail: 'Reflective doors and integrated wardrobe lighting.', alt: photos.wardrobeGlassFront.alt },
  { image: photos.tealStorage.src, title: 'Considered design.', accent: 'Every detail.', label: 'Furniture & carpentry', detail: 'Thoughtful storage for the way you live.', alt: photos.tealStorage.alt },
];

export function Hero() {
  const { activeIndex, isPlaying, step, toggleAutoPlay, interactionHandlers } = useAutoCarousel(slides.length);
  const slide = slides[activeIndex]!;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="hero-stage"
      {...interactionHandlers}
    >
      <div className="hero-images">
        {slides.map((item, index) => (
          <div key={item.image} className={`hero-image ${activeIndex === index ? 'is-active' : ''}`} aria-hidden={activeIndex !== index}>
            <SmartImage src={item.image} alt={item.alt} priority={index === 0} width={1920} height={1280} sizes="100vw" className="h-full w-full" />
          </div>
        ))}
      </div>
      <div className="hero-shade" />
      <div className="container-x hero-content">
        <p className="eyebrow !text-white/90"><span className="eyebrow-line" />{hero.eyebrow}</p>
        <h1 id="hero-title" className="hero-title">{slide.title}<br /><em>{slide.accent}</em></h1>
        <p className="hero-description">{company.name} · Shailesh &amp; Dinesh<br />Malad East, Mumbai</p>
        <div className="hero-actions"><a href="#projects" className="hero-link">Explore our work <span><ArrowUpRight size={21} /></span></a><a href="#walkthroughs" className="hero-video-link"><Play size={14} fill="currentColor" /> Watch our walkthroughs</a></div>
      </div>
      <div className="container-x hero-bottom">
        <a href="#about" className="scroll-cue"><ArrowDown size={17} /> Scroll to discover</a>
        <div className="hero-caption"><span>{slide.label}</span><p>{slide.detail}</p></div>
        <div className="hero-controls" role="group" aria-label="Featured spaces">
          <button type="button" aria-label="Previous featured space" onClick={() => step(-1)}><ChevronLeft size={18} /></button>
          <span><b>{String(activeIndex + 1).padStart(2, '0')}</b><span className="hero-counter-line" />{String(slides.length).padStart(2, '0')}</span>
          <button type="button" aria-label="Next featured space" onClick={() => step(1)}><ChevronRight size={18} /></button>
          <button
            type="button"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            aria-pressed={!isPlaying}
            onClick={toggleAutoPlay}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
          </button>
        </div>
      </div>
    </section>
  );
}
