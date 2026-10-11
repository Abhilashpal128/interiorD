import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Logo } from './Logo';
import { company, contact, nav, social } from '../config/site';
import { services } from '../data/services';

const icons = { instagram: Instagram, facebook: Facebook, youtube: Youtube, linkedin: Linkedin };

export function Footer() {
  return (
    <footer className="bg-charcoal pt-16 text-sand/90">
      <div className="container-x grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand/80">{company.description}</p>
          <ul className="mt-6 flex gap-3" aria-label="Social media">
            {social.map((s) => {
              const Icon = icons[s.icon];
              return (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="grid h-11 w-11 place-items-center border border-sand/30 transition hover:bg-ivory hover:text-charcoal">
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] !text-ivory">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.id}>
                <Link to={{ pathname: '/', hash: n.id === 'home' ? '' : `#${n.id}` }} className="hover:text-white hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] !text-ivory">Services</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.slice(0, 7).map((s) => (
              <li key={s.id}>
                <Link to={`/services/${s.id}`} className="hover:text-white hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] !text-ivory">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0" /><a href={`tel:${contact.phoneTel}`} className="hover:underline">{contact.phoneDisplay}</a></li>
            <li className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0" /><a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a></li>
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0" /><address className="not-italic">{contact.addressLines.join(', ')}</address></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand/15">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-sand/70 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><Link to="/privacy" className="hover:text-white hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white hover:underline">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
