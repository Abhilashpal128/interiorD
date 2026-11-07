import { ArrowUpRight, Check } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { company, contact } from '../config/site';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section studio-section">
      <div className="container-x">
        <Reveal className="studio-intro">
          <p className="eyebrow"><span className="section-index">01 /</span> About S&amp;D</p>
          <div>
            <p className="studio-location">Shailesh &amp; Dinesh · Kandivali East, Mumbai</p>
            <h2 id="about-title" className="h-section">A strong foundation.<br /><span className="muted-serif">A considered finish.</span></h2>
            <div className="studio-copy"><p>{company.name} brings together construction, renovation and interior work. Based in Kandivali (E), Lokhandwala, we help you discuss the work your space needs, from civil work to its finishing touches.</p><p>Speak with {contact.names} about your project. Our services cover furniture and carpentry, plumbing and electrical, tile and stone work, aluminium, glass and uPVC, and painting and finishing.</p></div>
            <a href="#contact" className="text-link">Talk to Shailesh &amp; Dinesh <ArrowUpRight size={19} /></a>
          </div>
        </Reveal>
        <div className="studio-principles">{company.values.map((value) => <span key={value}><Check size={16} />{value}</span>)}</div>
      </div>
    </section>
  );
}
