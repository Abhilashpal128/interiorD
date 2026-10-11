import { about, company } from '../config/site';
import { IMG } from '../data/images';
import { SectionHeading } from '../components/SectionHeading';
import { SmartImage } from '../components/SmartImage';
import { Reveal } from '../components/Reveal';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section bg-sand/40">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <SmartImage src={IMG.house1} alt={`A home designed by ${company.name}`} className="aspect-[4/5] w-full" width={900} height={1125} sizes="(min-width:1024px) 45vw, 100vw" />
            <div className="absolute -bottom-6 -right-2 hidden w-52 bg-ivory p-5 shadow-lift sm:block"><p className="font-serif text-4xl text-charcoal">Since {company.foundedYear}</p><p className="text-xs text-taupe">Demo founding year</p></div>
          </Reveal>
          <div>
            <SectionHeading id="about-title" eyebrow="About us" title={about.headline} intro={about.intro} />
            <dl className="space-y-5">
              <div><dt className="font-serif text-2xl">Our mission</dt><dd className="mt-1 text-ink/85">{about.mission}</dd></div>
              <div><dt className="font-serif text-2xl">Design philosophy</dt><dd className="mt-1 text-ink/85">{about.philosophy}</dd></div>
              <div><dt className="font-serif text-2xl">How we execute</dt><dd className="mt-1 text-ink/85">{about.approach}</dd></div>
            </dl>
          </div>
        </div>
        <ul className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v) => <li key={v.title} className="border-t border-charcoal pt-4"><h3 className="font-serif text-2xl">{v.title}</h3><p className="mt-2 text-sm text-ink/85">{v.text}</p></li>)}
        </ul>
        <h3 className="mt-20 font-serif text-3xl">The team <span className="text-sm font-sans text-taupe">(demo content)</span></h3>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {about.team.map((m, i) => (
            <li key={i} className="flex gap-4 bg-ivory p-5">
              <span aria-hidden className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-charcoal font-serif text-2xl text-sand">{m.name[0]}</span>
              <div><p className="font-semibold text-charcoal">{m.name}</p><p className="text-xs uppercase tracking-wider text-bronze-dark">{m.role}</p><p className="mt-1 text-sm text-ink/80">{m.bio}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
