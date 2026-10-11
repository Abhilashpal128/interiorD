import { CalendarCheck, Phone, Ruler, Sparkles } from 'lucide-react';
import { EnquiryForm } from '../components/EnquiryForm';
import { Reveal } from '../components/Reveal';
import { contact, offers } from '../config/site';

const icons = [Sparkles, Ruler, CalendarCheck];

export function LeadCapture() {
  return (
    <section id="enquire" aria-labelledby="enquire-title" className="relative bg-charcoal pb-20 pt-16 sm:pb-24">
      <div className="container-x grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="text-ivory">
          <p className="eyebrow !text-sand">Free consultation</p>
          <h2 id="enquire-title" className="h-section mt-3 !text-ivory">Start with a conversation, not a commitment.</h2>
          <p className="mt-4 max-w-md text-sand/90">Tell us about your home and we will get back to you with the next steps. Your details are only used to respond to your enquiry.</p>
          <ul className="mt-8 space-y-5">
            {offers.map((o, i) => {
              const Icon = icons[i % icons.length]!;
              return (
                <li key={o.id} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-sand/30 text-sand"><Icon size={20} strokeWidth={1.5} /></span>
                  <div>
                    <h3 className="font-sans text-base font-semibold !text-ivory">{o.title}</h3>
                    <p className="text-sm text-sand/80">{o.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <a href={`tel:${contact.phoneTel}`} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ivory underline underline-offset-4">
            <Phone size={16} /> Prefer to talk? {contact.phoneDisplay}
          </a>
        </Reveal>
        <Reveal delay={0.1} className="bg-ivory p-6 shadow-lift sm:p-9">
          <h3 className="mb-5 font-serif text-3xl text-charcoal">Book your free consultation</h3>
          <EnquiryForm prefill={{ source: 'Lead capture form (home)' }} idPrefix="lead" />
        </Reveal>
      </div>
    </section>
  );
}
