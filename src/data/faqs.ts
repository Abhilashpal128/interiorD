import type { Faq } from '../types';
import { company, contact } from '../config/site';

export const faqs: Faq[] = [
  { q: 'What services does S&D Build Solutions offer?', a: 'Our services include construction and civil work, home renovation, interior work, tiles, marble and granite, furniture and carpentry, plumbing and electrical, aluminium, glass and uPVC work, and painting and finishing.' },
  { q: 'Where is S&D Build Solutions based?', a: 'We are based in Kandivali (E), Lokhandwala, Mumbai - 400101. Share your project location with us to discuss availability.' },
  { q: 'How can I contact Shailesh & Dinesh?', a: `Call ${contact.phones[0]!.display} or ${contact.phones[1]!.display}, or email ${contact.email}. You can also use the enquiry form on this website.` },
  { q: 'How long does the project take?', a: 'The timeline depends on the work, site conditions and materials. Discuss your requirements and preferred schedule with Shailesh & Dinesh so the timeline can be agreed for your project.' },
  { q: 'Can I enquire about a single service?', a: 'Yes. Choose the relevant service in the enquiry form and describe what you need, whether it is carpentry, painting, stone work or another service listed on our card.' },
  { q: 'What should I share when requesting a quotation?', a: 'Include your location, property type, approximate area, scope of work, material preferences and preferred start date. These details help us understand the project before discussing a quotation.' },
  { q: 'Is the budget estimator a final quotation?', a: 'No. The estimator uses illustrative rates to help you explore a possible budget. A project quotation depends on the agreed scope, materials and site requirements.' },
  { q: 'What happens after I submit an enquiry?', a: `Your details are sent to ${company.name} for review. Shailesh & Dinesh can contact you using the phone number or email address you provide.` },
];
