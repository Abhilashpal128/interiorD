import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';

const steps = [
  { title: 'Listen & discover', text: 'Your routines, your ideas, your wish list. We begin by understanding the people who will use the space.' },
  { title: 'Plan the details', text: 'Discuss the scope, material choices and finish preferences, along with a quotation for the work.' },
  { title: 'Craft & build', text: 'An agreed scope, a coordinated team and careful execution bring the design from paper into the real world.' },
  { title: 'Welcome home', text: 'Finishing touches, a considered walkthrough and a space ready for its next chapter. Yours.' },
];
export function Process() {
  const { openEnquiry } = useEnquiry();
  return (
    <section id="process" aria-labelledby="process-title" className="section process-section">
      <div className="container-x">
        <Reveal className="section-topline"><p className="eyebrow"><span className="section-index">04 /</span> The journey</p><h2 id="process-title" className="h-section">From a conversation<br />to a place of your own.</h2><button type="button" className="text-link self-end" onClick={() => openEnquiry({ source: 'Process section' })}>Start a conversation <ArrowUpRight size={19} /></button></Reveal>
        <ol className="process-grid">{steps.map((step, index) => <li key={step.title}><span className="process-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </div>
    </section>
  );
}
