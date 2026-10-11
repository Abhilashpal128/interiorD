import { journeyMilestones } from '../data/process';
import { IMG } from '../data/images';
import { SectionHeading } from '../components/SectionHeading';
import { SmartImage } from '../components/SmartImage';

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="section bg-ivory">
      <div className="container-x">
        <SectionHeading id="journey-title" eyebrow="Project journey" title="From concept to keys, week by week" intro="An example 14-week timeline. Dates and durations are illustrative (demo) and vary by project." />
        <ol className="hide-scrollbar -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
          {journeyMilestones.map((m, i) => (
            <li key={m.title} className="w-[72%] shrink-0 snap-start sm:w-auto">
              <div className="aspect-[4/5] overflow-hidden"><SmartImage src={IMG[m.image]} alt={`${m.title} stage illustration`} className="h-full w-full" width={600} height={750} sizes="(min-width:640px) 20vw, 72vw" /></div>
              <div className="relative mt-5 border-t border-bronze/50 pt-4">
                <span aria-hidden className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-bronze" />
                <p className="text-xs font-semibold uppercase tracking-widest text-bronze-dark">{m.week} <span className="text-taupe">(example)</span></p>
                <h3 className="mt-1 font-serif text-xl leading-tight"><span className="sr-only">Milestone {i + 1}: </span>{m.title}</h3>
                <p className="mt-1 text-sm text-ink/80">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
