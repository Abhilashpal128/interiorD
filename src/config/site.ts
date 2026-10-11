/**
 * ============================================================================
 *  SITE CONFIGURATION  -  the one file to edit for company details
 * ============================================================================
 *  Everything marked DEMO is placeholder content. Replace it with approved,
 *  factual client information before launch. Do not publish demo figures,
 *  testimonials or claims as real.
 *
 *  Other content files:  src/data/*.ts   (services, designs, projects, testimonials, faqs,
 *  process, materials, estimator rates, images)
 * ============================================================================
 */
import type { Stat } from '../types';

export const company = {
  name: 'Atelier Interiors', // DEMO - replace
  shortName: 'Atelier',
  tagline: 'Homes designed around the way you live', // DEMO
  /** Text logo. To use an image logo, set `logoImage` to '/logo.svg' (file in client/public) */
  logoMark: 'A',
  logoImage: '' as string,
  description:
    'A design-and-build studio for thoughtful homes. We plan, design and deliver interiors and renovations with transparent pricing and a single point of contact.', // DEMO
  foundedYear: 2012, // DEMO
  /** Public site URL, used for canonical / OG tags. Set at build time: VITE_SITE_URL */
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://www.example.com', // DEMO
};

export const contact = {
  // DEMO placeholders - clearly not real. Replace with the client's real details.
  phoneDisplay: '+91 00000 00000',
  phoneTel: '+910000000000',
  whatsappNumber: '910000000000', // international format, digits only
  whatsappMessage: 'Hello! I would like to book a free design consultation.',
  email: 'hello@example.com',
  addressLines: ['Studio address line (DEMO)', 'Locality, City, State - PIN'],
  /** Any text Google Maps understands. Replace with the real studio address. */
  mapQuery: 'Mumbai, Maharashtra, India',
  hours: [
    { days: 'Monday - Saturday', time: '10:00 AM - 7:00 PM' },
    { days: 'Sunday', time: 'By appointment' },
  ], // DEMO
};

export const social = [
  { name: 'Instagram', url: 'https://www.instagram.com/', icon: 'instagram' },
  { name: 'Facebook', url: 'https://www.facebook.com/', icon: 'facebook' },
  { name: 'YouTube', url: 'https://www.youtube.com/', icon: 'youtube' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/', icon: 'linkedin' },
] as const; // DEMO - point to the real profiles

export const nav = [
  { label: 'Home', id: 'home' },
  { label: 'Our Services', id: 'services' },
  { label: 'Designs', id: 'designs' },
  { label: 'Projects', id: 'projects' },
  { label: 'Process', id: 'process' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
] as const;

export const announcement = {
  enabled: true,
  text: 'Free design consultation & site visit this month (DEMO offer)',
  cta: 'Book now',
};

export const hero = {
  eyebrow: 'Interior design & turnkey construction',
  headline: ['Beautiful homes,', 'designed around', 'how you live.'],
  copy:
    'From the first sketch to the final handover, our designers and project managers take care of everything: space planning, 3D visualisation, materials, production and installation.',
  primaryCta: 'Get Free Estimate',
  secondaryCta: 'Explore Our Projects',
  badge: 'Design, build & handover under one roof',
};

/** DEMO statistics - replace with verified figures. Flagged on the page via `demoFlag`. */
export const demoFlag = true; // set to false once all figures below are approved
export const stats: Stat[] = [
  { label: 'Homes completed', value: '850+', note: 'DEMO value' },
  { label: 'Years of experience', value: '12', note: 'DEMO value' },
  { label: 'Customer satisfaction', value: '96%', note: 'DEMO value' },
  { label: 'On-time delivery', value: '92%', note: 'DEMO value' },
  { label: 'Quality checkpoints', value: '150+', note: 'DEMO value' },
  { label: 'Warranty on workmanship', value: '5 yrs', note: 'DEMO value' },
];

export const offers = [
  { id: 'consult', title: 'Free design consultation', text: 'A one-to-one session with a senior designer. No obligation.' },
  { id: 'visit', title: 'Complimentary site visit', text: 'We measure, photograph and note your requirements on site.' },
  { id: 'plan', title: 'Free space plan', text: 'A first-draft layout with your confirmed enquiry (DEMO offer).' },
]; // DEMO offers - replace with real, dated offers

export const budgetOptions = ['Under ₹5 lakh', '₹5 - 10 lakh', '₹10 - 20 lakh', '₹20 - 40 lakh', '₹40 lakh +', 'Not sure yet'];

export const seo = {
  defaultTitle: 'Atelier Interiors | Premium Home Interiors & Turnkey Construction',
  defaultDescription:
    'Thoughtfully designed homes, from modular kitchens to complete turnkey interiors. Book a free design consultation.',
  /** Only switch on once every field in `company` and `contact` is genuine - schema must match reality. */
  enableLocalBusinessSchema: false,
};

export const about = {
  headline: 'A studio built on listening first',
  intro:
    'We started as a small team of designers and carpenters who were tired of homes that looked good in renders but fell short in daily life. Today we design and build interiors where layout, storage, light and materials are decided together.', // DEMO
  mission: 'To make considered, well-built design accessible, with clear pricing and honest timelines.',
  philosophy: 'Plan the life first, then the layout, then the finishes. Beauty comes from fit, not decoration.',
  values: [
    { title: 'Honesty', text: 'Itemised quotations and straightforward advice, including when something is not worth the money.' },
    { title: 'Craft', text: 'Details such as edge profiles, hardware and alignment are inspected before anything leaves the workshop.' },
    { title: 'Accountability', text: 'One named project manager owns your timeline, from site visit to handover.' },
    { title: 'Longevity', text: 'We specify materials for how they will look in ten years, not only on day one.' },
  ],
  approach:
    'Every project is run on a written milestone plan with weekly updates, a single point of contact and quality checks before handover.',
  // DEMO team - replace names/roles; photo optional
  team: [
    { name: 'Founder Name', role: 'Principal Designer', bio: 'Leads concept design and client direction. (DEMO)' },
    { name: 'Team Member', role: 'Head of Projects', bio: 'Owns site execution, schedules and quality control. (DEMO)' },
    { name: 'Team Member', role: 'Lead 3D Visualiser', bio: 'Turns plans into walkthroughs you can approve with confidence. (DEMO)' },
  ],
};

export const whyUs = [
  { title: 'Transparent quotations', text: 'Line-item pricing with brand and specification stated, so you can compare like for like.' },
  { title: 'Personalised design', text: 'Layouts follow your routines, family size and storage needs, not a template.' },
  { title: 'Dedicated coordination', text: 'A single project manager is your point of contact from site visit to handover.' },
  { title: 'Quality-controlled execution', text: 'Stage-wise inspections for carpentry, electrical, finishing and installation.' },
  { title: 'Clear milestones', text: 'A written schedule with payment stages linked to completed work.' },
  { title: 'Material guidance', text: 'Honest advice on where to invest and where a simpler finish is enough.' },
  { title: 'Regular updates', text: 'Photo and progress updates through the project, so you are never guessing.' },
  { title: 'After-sales assistance', text: 'A defined support process for service requests after handover.' },
]; // DEMO propositions - confirm with the client before publishing
