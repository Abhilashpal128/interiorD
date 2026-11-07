import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, ArrowUpRight } from 'lucide-react';
import { contact } from '../config/site';
import { useEnquiry } from '../context/EnquiryContext';

export function FloatingActions() {
  const { openEnquiry } = useEnquiry();
  const { pathname } = useLocation();
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const update = () => setPastHero(window.scrollY > window.innerHeight * 0.75);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);
  if (pathname === '/' && !pastHero) return null;
  return (
    <div className="floating-actions">
      <a href={`tel:${contact.phoneTel}`} aria-label={`Call S&D Build Solutions on ${contact.phoneDisplay}`} className="floating-call"><Phone size={19} /></a>
      <button type="button" onClick={() => openEnquiry({ source: 'Floating enquiry button' })} aria-label="Open enquiry form" className="floating-enquiry">Enquire <ArrowUpRight size={17} /></button>
    </div>
  );
}
