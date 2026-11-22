import type { Faq } from '../types';
import { company, contact } from '../config/site';

export const faqs: Faq[] = [
  { q: 'What services does S&D Build Solutions offer?', a: 'Our services include construction and civil work, home renovation, interior work, tiles, marble and granite, furniture and carpentry, plumbing and electrical, aluminium, glass and uPVC work, and painting and finishing.' },
  { q: 'Where is S&D Build Solutions based?', a: `We are based at ${contact.addressLines.join(', ')}. Share your project location with us to discuss availability.` },
  { q: 'How can I contact Shailesh Gaurishankar Pal & Dinesh Dalsingar Rajbhar?', a: `Call ${contact.phones[0]!.display} or ${contact.phones[1]!.display}, or email ${contact.email}. You can also use the enquiry form on this website.` },
  { q: 'How long does the project take?', a: 'The timeline depends on the work, site conditions and materials. Discuss your requirements and preferred schedule with Shailesh Gaurishankar Pal & Dinesh Dalsingar Rajbhar so the timeline can be agreed for your project.' },
  { q: 'Can I enquire about a single service?', a: 'Yes. Choose the relevant service in the enquiry form and describe what you need, whether it is carpentry, painting, stone work or another service listed on our card.' },
  { q: 'What should I share when requesting a quotation?', a: 'Include your location, property type, approximate area, scope of work, material preferences and preferred start date. These details help us understand the project before discussing a quotation.' },
  { q: 'How is a project quotation prepared?', a: 'A quotation depends on the agreed scope, materials and site requirements. Share your project details so the next steps can be discussed.' },
  { q: 'What happens after I submit an enquiry?', a: `Your details are sent to ${company.name} for review. Shailesh Gaurishankar Pal & Dinesh Dalsingar Rajbhar can contact you using the phone number or email address you provide.` },
];
