import { processSteps } from '../data/process';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';

export function Process() {
  const { openEnquiry } = useEnquiry();
  return (
    <section id="process" aria-labelledby="process-title" className="section bg-sand/40">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="process-title" eyebrow="How it works" title="A clear path from first call to handover" intro="Nine defined steps so you always know what is happening and what comes next. Timelines are indicative and confirmed after your site visit." />
          <button type="button" className="btn btn-primary" onClick={() => openEnquiry({ source: 'Process section' })}>Start step one</button>
        </div>
        <ol className="relative border-l border-bronze/40 pl-8 sm:pl-12">
          {processSteps.map((s, i) => (
            <Reveal key={s.title} delay={0.03}>
              <li className="relative pb-10 last:pb-0">
                <span className="absolute -left-[3.05rem] grid h-10 w-10 place-items-center rounded-full border border-bronze bg-ivory font-serif text-lg text-bronze-dark sm:-left-[4.05rem]" aria-hidden>{i + 1}</span>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-serif text-2xl text-charcoal sm:text-[1.7rem]"><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
                  <span className="text-xs font-semibold uppercase tracking-widest text-bronze-dark">{s.duration}</span>
                </div>
                <p className="mt-2 max-w-xl text-ink/85">{s.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
