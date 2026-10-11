import { whyUs } from '../config/site';
import { IMG } from '../data/images';
import { SectionHeading } from '../components/SectionHeading';
import { SmartImage } from '../components/SmartImage';
import { Reveal } from '../components/Reveal';

export function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="section bg-charcoal">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading id="why-title" light eyebrow="Why choose us" title="Design is the easy part. Delivery is where we stand out." />
          <Reveal className="relative hidden aspect-[4/5] overflow-hidden lg:block">
            <SmartImage src={IMG.dining2} alt="Warm dining area with wooden table and pendant lights" className="h-full w-full" width={800} height={1000} sizes="40vw" />
          </Reveal>
        </div>
        <ol className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {whyUs.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.06}>
              <li className="border-t border-sand/25 pt-5">
                <span className="font-serif text-lg text-bronze" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-1 font-serif text-2xl !text-ivory">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sand/85">{w.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
