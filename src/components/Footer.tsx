import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';
import { company, contact, nav } from '../config/site';
import { services } from '../data/services';
import { useEnquiry } from '../context/EnquiryContext';

export function Footer() {
  const { openEnquiry } = useEnquiry();
  return (
    <footer className="site-footer">
      <div className="container-x">
        <div className="footer-invitation"><div><p className="eyebrow">{company.values.join(' · ')}</p><h2>Let’s make room<br />for <em>something remarkable.</em></h2></div><button type="button" onClick={() => openEnquiry({ source: 'Footer CTA' })} aria-label="Start your project" className="footer-cta"><ArrowUpRight strokeWidth={1} /></button></div>
        <div className="footer-main">
          <div><Logo light /><p className="footer-brand-copy">{company.tagline}<br />Thank you for your trust.</p></div>
          <nav aria-label="Footer">{nav.filter((item) => item.id !== 'home').map((item) => <Link key={item.id} to={`/#${item.id}`}>{item.label}</Link>)}</nav>
          <div className="footer-contact"><p className="eyebrow">{contact.names}</p>{contact.phones.map((phone) => <a key={phone.tel} href={`tel:${phone.tel}`}>{phone.display}</a>)}<a href={`mailto:${contact.email}`}>{contact.email}</a><address>{contact.addressLines.map((line) => <span key={line}>{line}</span>)}</address></div>
        </div>
        <nav className="footer-services" aria-label="Our services">{services.map((service) => <Link key={service.id} to={`/services/${service.id}`}>{service.title}</Link>)}</nav>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} {company.name}</p><div><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms &amp; conditions</Link></div><a href="#main" className="back-to-top">Back to top <ArrowUp size={15} /></a></div>
      </div>
    </footer>
  );
}
