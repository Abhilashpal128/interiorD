import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { hero, stats, demoFlag } from '../config/site';
import { IMG } from '../data/images';
import { SmartImage } from '../components/SmartImage';

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] },
  });
  const trust = [stats[0]!, stats[1]!, stats[2]!];

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pb-24 pt-10 sm:pt-16 lg:pb-32 lg:pt-20">
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[46%] bg-sand/70 lg:block" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
        <div>
          <motion.p {...fade(0)} className="eyebrow">{hero.eyebrow}</motion.p>
          <motion.h1 {...fade(0.08)} id="hero-title" className="h-display mt-5">
            {hero.headline[0]} <br className="hidden sm:block" />
            {hero.headline[1]} <br className="hidden sm:block" />
            <em className="font-medium italic text-bronze-dark">{hero.headline[2]}</em>
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-ink/85 sm:text-lg">{hero.copy}</motion.p>
          <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="btn btn-primary" onClick={() => scrollTo('enquire')}>
              {hero.primaryCta} <ArrowRight size={18} aria-hidden />
            </button>
            <button type="button" className="btn btn-outline" onClick={() => scrollTo('projects')}>{hero.secondaryCta}</button>
          </motion.div>
          <motion.dl {...fade(0.34)} className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
            {trust.map((s) => (
              <div key={s.label}>
                <dt className="order-2 mt-1 text-xs leading-snug text-taupe">{s.label}</dt>
                <dd className="font-serif text-4xl font-medium text-charcoal">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
          {demoFlag && <p className="mt-3 text-[0.7rem] text-taupe">Figures shown are demonstration values.</p>}
        </div>

        <motion.div {...fade(0.15)} className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden shadow-lift sm:aspect-[5/6] lg:aspect-[4/5]" style={{ borderRadius: 'var(--radius-sm)' }}>
            <SmartImage src={IMG.hero} alt="Bright contemporary living room with neutral sofa and warm lighting" className="h-full w-full" width={1600} height={2000} priority sizes="(min-width: 1024px) 48vw, 100vw" />
          </div>
          <div className="absolute -bottom-8 -left-4 hidden w-44 overflow-hidden border-[6px] border-ivory shadow-lift sm:block lg:-left-12 lg:w-56">
            <SmartImage src={IMG.heroInset} alt="Modular kitchen with warm wood and stone finishes" className="aspect-[4/5] h-full w-full" width={600} height={750} sizes="224px" />
          </div>
          <div className="absolute right-3 top-3 flex max-w-[15rem] items-center gap-3 bg-ivory/95 p-4 shadow-lift sm:-right-4 sm:top-8">
            <ShieldCheck className="shrink-0 text-bronze" size={28} strokeWidth={1.5} aria-hidden />
            <p className="text-sm font-medium leading-snug text-charcoal">{hero.badge}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
