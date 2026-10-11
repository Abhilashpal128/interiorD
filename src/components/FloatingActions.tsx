import { MessageCircle, PenLine } from 'lucide-react';
import { contact } from '../config/site';
import { useEnquiry } from '../context/EnquiryContext';
import { whatsappUrl } from '../utils/format';

export function FloatingActions() {
  const { openEnquiry } = useEnquiry();
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)] sm:bottom-6 sm:right-6">
      <button type="button" onClick={() => openEnquiry({ source: 'Floating enquiry button' })} className="btn btn-primary !min-h-[48px] gap-2 rounded-full !px-5 shadow-lift" aria-label="Open enquiry form">
        <PenLine size={18} /> <span className="hidden sm:inline">Free Enquiry</span><span className="sm:hidden">Enquire</span>
      </button>
      <a
        href={whatsappUrl(contact.whatsappNumber, contact.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#1f9d57] text-white shadow-lift transition hover:scale-105 hover:bg-[#188046]"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
