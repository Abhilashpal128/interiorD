import { faqs } from '../data/faqs';
import { Accordion } from '../components/Accordion';
import { SectionHeading } from '../components/SectionHeading';

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-ivory">
      <div className="container-x grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, answered" intro="Cannot find what you are looking for? Send us an enquiry and we will help." />
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
