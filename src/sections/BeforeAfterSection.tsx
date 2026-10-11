import { Check } from 'lucide-react';
import { beforeAfter } from '../data/beforeAfter';
import { BeforeAfter } from '../components/BeforeAfter';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';

export function BeforeAfterSection() {
  const { openEnquiry } = useEnquiry();
  const d = beforeAfter;
  return (
    <section id="renovation" aria-labelledby="renovation-title" className="section bg-ivory">
      <div className="container-x">
        <SectionHeading id="renovation-title" eyebrow="Before & after" title="See the transformation" intro="Drag the handle (or use the arrow keys) to compare a renovation. Demo photographs shown for illustration." />
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal><BeforeAfter before={d.before} after={d.after} beforeAlt={d.beforeAlt} afterAlt={d.afterAlt} /></Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-serif text-3xl">{d.title}</h3>
            <p className="mt-1 text-sm text-taupe">{d.location} · {d.duration}</p>
            <p className="mt-4 leading-relaxed text-ink/85">{d.summary}</p>
            <ul className="mt-6 space-y-3">
              {d.details.map((x) => (
                <li key={x} className="flex gap-3 text-[0.95rem] text-ink/90"><Check size={18} className="mt-0.5 shrink-0 text-bronze" aria-hidden />{x}</li>
              ))}
            </ul>
            <button type="button" className="btn btn-primary mt-8" onClick={() => openEnquiry({ service: 'Home Renovation', message: 'I would like to renovate a room, similar to your before-and-after example.', source: 'Before & after showcase' })}>
              Plan a renovation
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
