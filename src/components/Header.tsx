import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { announcement, contact, nav } from '../config/site';
import { useEnquiry } from '../context/EnquiryContext';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

const ids = nav.map((n) => n.id);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openEnquiry } = useEnquiry();
  const onHome = pathname === '/';
  const active = useScrollSpy(ids, onHome);
  const drawerRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(menu);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('keydown', onKey);
    drawerRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [menu]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenu(false);
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`);
    } else {
      navigate({ pathname: '/', hash: id === 'home' ? '' : `#${id}` });
    }
  };

  return (
    <>
      {announcement.enabled && (
        <div className="bg-charcoal text-[0.8rem] text-sand">
          <div className="container-x flex items-center justify-center gap-3 py-2 text-center">
            <span>{announcement.text}</span>
            <button type="button" onClick={() => openEnquiry({ source: 'Announcement bar' })} className="font-semibold underline underline-offset-4 hover:text-white">
              {announcement.cta}
            </button>
          </div>
        </div>
      )}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-ivory/95 shadow-soft backdrop-blur' : 'bg-ivory'}`}>
        <div className={`container-x flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-4'}`}>
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={n.id === 'home' ? '/' : `/#${n.id}`}
                onClick={go(n.id)}
                aria-current={onHome && active === n.id ? 'true' : undefined}
                className={`relative py-2 text-[0.9rem] font-medium transition-colors hover:text-bronze-dark ${onHome && active === n.id ? 'text-bronze-dark' : 'text-charcoal'} after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-bronze after:transition-transform ${onHome && active === n.id ? 'after:scale-x-100' : 'hover:after:scale-x-100'}`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={`tel:${contact.phoneTel}`} className="hidden items-center gap-2 text-sm font-medium text-charcoal xl:flex" aria-label={`Call ${contact.phoneDisplay}`}>
              <Phone size={16} /> {contact.phoneDisplay}
            </a>
            <button type="button" className="btn btn-primary hidden !px-5 sm:inline-flex" onClick={() => openEnquiry({ source: 'Header CTA' })}>
              Book Free Consultation
            </button>
            <button type="button" className="grid h-11 w-11 place-items-center text-charcoal lg:hidden" onClick={() => setMenu(true)} aria-label="Open menu" aria-expanded={menu} aria-controls="mobile-drawer">
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div className="fixed inset-0 z-[70] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-charcoal/60" onClick={() => setMenu(false)} aria-hidden />
            <motion.div
              id="mobile-drawer"
              ref={drawerRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute right-0 top-0 flex h-full w-[min(86vw,360px)] flex-col bg-ivory p-6 shadow-lift outline-none"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-charcoal">Menu</span>
                <button type="button" className="grid h-11 w-11 place-items-center" onClick={() => setMenu(false)} aria-label="Close menu">
                  <X size={26} />
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-6 flex flex-col">
                {nav.map((n) => (
                  <a key={n.id} href={n.id === 'home' ? '/' : `/#${n.id}`} onClick={go(n.id)} className="border-b border-line py-4 font-serif text-2xl text-charcoal">
                    {n.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto space-y-3 pt-8">
                <button
                  type="button"
                  className="btn btn-bronze w-full"
                  onClick={() => {
                    setMenu(false);
                    openEnquiry({ source: 'Mobile menu CTA' });
                  }}
                >
                  Book Free Consultation
                </button>
                <a href={`tel:${contact.phoneTel}`} className="btn btn-outline w-full">
                  <Phone size={16} /> {contact.phoneDisplay}
                </a>
                <Link to="/privacy" onClick={() => setMenu(false)} className="block pt-2 text-center text-xs text-taupe underline">
                  Privacy Policy
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
