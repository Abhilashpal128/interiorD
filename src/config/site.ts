/**
 * Business details transcribed from the client-provided S&D Build Solutions card.
 * Project media is supplied by the client. Estimator rates remain indicative.
 */
import type { Stat } from '../types';

export const company = {
  name: 'S&D Build Solutions',
  shortName: 'S&D',
  tagline: 'Construction | Renovation | Interiors',
  values: ['Quality', 'Durability', 'Reliability'],
  logoMark: 'S&D',
  logoImage: '/images/sd-build-solutions-logo.png',
  logoImageLight: '/images/sd-build-solutions-logo.png',
  description: 'S&D Build Solutions by Shailesh & Dinesh in Kandivali East, Mumbai. Construction, home renovation, interior work and specialist finishing services.',
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'),
};

export const contact = {
  names: 'Shailesh & Dinesh',
  phoneDisplay: '+91 96531 96477',
  phoneTel: '+919653196477',
  phones: [
    { display: '+91 96531 96477', tel: '+919653196477' },
    { display: '+91 76767 42197', tel: '+917676742197' },
  ],
  // The card lists telephone numbers, but does not identify a WhatsApp account.
  whatsappNumber: '',
  whatsappMessage: 'Hello S&D Build Solutions, I would like to discuss my project.',
  email: 'ishaileshpal@gmail.com',
  addressLines: ['Kandivali (E), Lokhandwala', 'Mumbai - 400101'],
  postalAddress: {
    streetAddress: 'Kandivali (E), Lokhandwala',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400101',
    addressCountry: 'IN',
  },
  mapQuery: 'Lokhandwala, Kandivali East, Mumbai 400101',
  // No opening hours were supplied on the card.
  hours: [] as Array<{ days: string; time: string }>,
};
export const hasContactDetails = Boolean(contact.phoneTel && contact.email);
export const social: Array<{ name: string; url: string; icon: 'instagram' | 'facebook' | 'youtube' | 'linkedin' }> = [];

export const nav = [
  { label: 'Home', id: 'home' },
  { label: 'Our Services', id: 'services' },
  { label: 'Our Work', id: 'projects' },
  { label: 'Videos', id: 'walkthroughs' },
  { label: 'Process', id: 'process' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
] as const;

export const announcement = { enabled: false, text: company.tagline, cta: 'Discuss your project' };
export const hero = {
  eyebrow: 'Construction · Renovation · Interiors',
  headline: ['Spaces to live.', 'Stories to tell.'],
  copy: company.description,
  primaryCta: 'Discuss your project',
  secondaryCta: 'Explore our spaces',
  badge: 'Quality · Durability · Reliability',
};
// No performance figures, founding year or warranty were provided.
export const demoFlag = false;
export const stats: Stat[] = [];
export const offers = [
  { id: 'discuss', title: 'Discuss your requirements', text: 'Tell Shailesh & Dinesh about the work you have in mind.' },
  { id: 'scope', title: 'Plan the scope', text: 'Share your location, preferred materials and project priorities.' },
  { id: 'quote', title: 'Request a quotation', text: 'Discuss the scope, cost and schedule for your project.' },
];

export const budgetOptions = ['Under ₹5 lakh', '₹5 - 10 lakh', '₹10 - 20 lakh', '₹20 - 40 lakh', '₹40 lakh +', 'Not sure yet'];

export const seo = {
  defaultTitle: 'S&D Build Solutions | Construction, Renovation & Interiors in Mumbai',
  defaultDescription: 'Contact Shailesh & Dinesh at S&D Build Solutions, Kandivali East, Mumbai, for construction, home renovation, interiors, carpentry, plumbing, electrical and finishing work.',
  enableLocalBusinessSchema: true,
};

export const about = {
  headline: 'S&D Build Solutions, by Shailesh & Dinesh',
  intro: company.description,
  mission: 'Quality, durability and reliability in construction, renovation and interiors.',
  philosophy: 'A considered approach to the spaces you live in and the materials that bring them together.',
  values: company.values.map((title) => ({ title, text: 'A principle at the heart of S&D Build Solutions.' })),
  approach: 'Speak with Shailesh & Dinesh about your requirements, location and scope of work.',
  team: [{ name: 'Shailesh & Dinesh', role: 'S&D Build Solutions', bio: 'Construction, renovation and interiors in Mumbai.' }],
};
export const whyUs = about.values;
