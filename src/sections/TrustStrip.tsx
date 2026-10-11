import { demoFlag, stats } from '../config/site';
import { Reveal } from '../components/Reveal';

export function TrustStrip() {
  return (
    <section aria-label="Our track record" className="border-b border-line bg-ivory py-12">
      <div className="container-x">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-line pl-5">
                <dd className="font-serif text-4xl font-medium text-charcoal sm:text-[2.6rem]">{s.value}</dd>
                <dt className="mt-1 text-[0.8rem] leading-snug text-taupe">{s.label}</dt>
              </div>
            ))}
          </dl>
          {demoFlag && <p className="mt-6 text-xs text-taupe">Demonstration values shown for layout purposes. Replace with verified business figures before launch.</p>}
        </Reveal>
      </div>
    </section>
  );
}
