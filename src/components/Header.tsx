import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Logo } from './Logo';
import { Modal } from './Modal';
import { contact, nav } from '../config/site';
import { useEnquiry } from '../context/EnquiryContext';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname, hash } = useLocation();
  const { openEnquiry } = useEnquiry();
  const closeMenu = useCallback(() => setMenu(false), []);
  const light = pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setMenu(false), [pathname, hash]);

  return (
    <>
      <header className={`site-header ${light ? 'is-light' : 'is-solid'} ${pathname !== '/' ? 'is-interior' : ''}`}>
        <div className="container-x header-inner">
          <Logo light={light} />
          <nav aria-label="Primary" className="desktop-nav">
            <a href="/#about">About S&amp;D</a>
            <a href="/#projects">Our work</a>
            <a href="/#services">What we do</a>
          </nav>
          <div className="header-actions">
            <a href={`tel:${contact.phoneTel}`} className="header-phone">{contact.phoneDisplay}</a>
            <button type="button" className="header-enquire" onClick={() => openEnquiry({ source: 'Header CTA' })}>Let’s talk <ArrowUpRight size={17} /></button>
            <button type="button" className="menu-button" onClick={() => setMenu(true)} aria-label="Open menu" aria-expanded={menu} aria-haspopup="dialog"><Menu size={23} strokeWidth={1.4} /></button>
          </div>
        </div>
      </header>
      <Modal open={menu} onClose={closeMenu} title="Navigation menu" size="xl" hideTitle>
        <div className="navigation-panel">
          <p className="eyebrow">Make room for possibility</p>
          <nav aria-label="All pages">
            {nav.map((item, index) => <a key={item.id} href={item.id === 'home' ? '/#home' : `/#${item.id}`} onClick={closeMenu}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}<ArrowUpRight size={25} /></a>)}
          </nav>
          <a href="/#contact" onClick={closeMenu} className="link-arrow mt-8">Discuss your project <ArrowUpRight size={17} /></a>
          <div className="menu-contact"><p>{contact.names}</p><div>{contact.phones.map((phone) => <a key={phone.tel} href={`tel:${phone.tel}`}>{phone.display}</a>)}</div><a href={`mailto:${contact.email}`}>{contact.email}</a><p>{contact.addressLines.join(', ')}</p></div>
        </div>
      </Modal>
    </>
  );
}
