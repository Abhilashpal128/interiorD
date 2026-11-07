import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { company, contact } from '../config/site';
import { EnquiryForm } from '../components/EnquiryForm';
import { SmartImage } from '../components/SmartImage';
import { photos } from '../data/media';

export function Contact() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;
  return (
    <section id="contact" aria-labelledby="contact-title" className="section contact-section">
      <div id="enquire" className="container-x contact-layout">
        <div className="contact-intro">
          <p className="eyebrow">Let’s build something together</p>
          <h2 id="contact-title" className="h-section">Your project.<br /><em>Let’s talk about it.</em></h2>
          <p>Contact {contact.names} at {company.name} for construction, renovation, interiors and finishing work.</p>
          <div className="business-contact-card">
            <h3>{contact.names}</h3>
            <ul className="contact-details">
              {contact.phones.map((phone) => <li key={phone.tel}><Phone size={18} aria-hidden /><a href={`tel:${phone.tel}`} aria-label={`Call ${phone.display}`}>{phone.display}</a></li>)}
              <li><Mail size={18} aria-hidden /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><MapPin size={18} aria-hidden /><address>{contact.addressLines.map((line) => <span key={line}>{line}</span>)}</address></li>
            </ul>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link">View the locality on Google Maps <ArrowUpRight size={17} /></a>
          </div>
          <SmartImage src={photos.livingDining.src} alt={photos.livingDining.alt} className="contact-image" width={1156} height={516} />
        </div>
        <div className="contact-form"><p className="eyebrow">Enquire with S&amp;D Build Solutions</p><h3>Tell us a little about your project.</h3><EnquiryForm prefill={{ source: 'Contact section' }} idPrefix="contact" /></div>
      </div>
    </section>
  );
}
