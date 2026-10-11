import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react';
import { contact, social } from '../config/site';
import { EnquiryForm } from '../components/EnquiryForm';
import { SectionHeading } from '../components/SectionHeading';
import { whatsappUrl } from '../utils/format';

const icons = { instagram: Instagram, facebook: Facebook, youtube: Youtube, linkedin: Linkedin };

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section bg-ivory">
      <div className="container-x">
        <SectionHeading id="contact-title" eyebrow="Contact" title="Let us talk about your home" intro="Contact details below are demo placeholders until the client supplies real ones." />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <ul className="space-y-5">
              <li className="flex gap-4"><Phone className="mt-1 text-bronze" size={20} /><div><p className="font-semibold">Phone</p><a className="text-ink/85 hover:underline" href={`tel:${contact.phoneTel}`}>{contact.phoneDisplay}</a></div></li>
              <li className="flex gap-4"><MessageCircle className="mt-1 text-bronze" size={20} /><div><p className="font-semibold">WhatsApp</p><a className="text-ink/85 hover:underline" href={whatsappUrl(contact.whatsappNumber, contact.whatsappMessage)} target="_blank" rel="noopener noreferrer">Chat with us</a></div></li>
              <li className="flex gap-4"><Mail className="mt-1 text-bronze" size={20} /><div><p className="font-semibold">Email</p><a className="text-ink/85 hover:underline" href={`mailto:${contact.email}`}>{contact.email}</a></div></li>
              <li className="flex gap-4"><MapPin className="mt-1 text-bronze" size={20} /><div><p className="font-semibold">Studio</p><address className="not-italic text-ink/85">{contact.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address></div></li>
              <li className="flex gap-4"><Clock className="mt-1 text-bronze" size={20} /><div><p className="font-semibold">Business hours</p>{contact.hours.map((h) => <p key={h.days} className="text-ink/85">{h.days}: {h.time}</p>)}</div></li>
            </ul>
            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {social.map((s) => { const Icon = icons[s.icon]; return <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="grid h-11 w-11 place-items-center border border-line hover:bg-charcoal hover:text-ivory"><Icon size={18} /></a></li>; })}
            </ul>
            <div className="mt-8 aspect-[16/10] overflow-hidden border border-line">
              <iframe title="Studio location map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full" src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`} />
            </div>
          </div>
          <div className="self-start bg-sand/50 p-6 sm:p-9">
            <h3 className="mb-5 font-serif text-3xl">Send us a message</h3>
            <EnquiryForm prefill={{ source: 'Contact section' }} idPrefix="contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
