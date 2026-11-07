import type { Service } from '../types';
import { photos as p } from './media';

/** The eight service categories printed on the S&D Build Solutions business card. */
export const services: Service[] = [
  {
    id: 'construction-civil-work',
    title: 'Construction & Civil Work',
    short: 'Construction and civil work for your next building or improvement project.',
    long: 'Discuss your construction and civil work requirements with Shailesh & Dinesh. Share the site details, drawings if available, and the scope you have in mind so the work can be assessed for your property.',
    image: p.exterior.src, imageAlt: p.exterior.alt, layout: 'wide',
    highlights: ['Construction work', 'Civil work', 'Site requirements', 'Project scope and quotation'],
  },
  {
    id: 'home-renovation',
    title: 'Home Renovation',
    short: 'A fresh beginning for existing spaces, from a single room to a home.',
    long: 'Bring your home renovation plans to S&D Build Solutions. Whether you are updating a room or planning work across your home, discuss your existing space, priorities, materials and preferred timeline with our team.',
    image: p.windowFitout.src, imageAlt: p.windowFitout.alt, layout: 'tall',
    highlights: ['Existing home improvements', 'Room renovations', 'Material and finish choices', 'Scope-based project planning'],
  },
  {
    id: 'interior-work',
    title: 'Interior Work',
    short: 'Interior work that brings your rooms, finishes and everyday needs together.',
    long: 'S&D Build Solutions undertakes interior work for your space. Tell us about the rooms you want to improve, your preferred style and the practical details that matter to you, from storage to finishes.',
    image: p.livingDining.src, imageAlt: p.livingDining.alt, layout: 'tall',
    highlights: ['Home interior work', 'Room improvements', 'Interior finishes', 'Coordination with carpentry and finishing work'],
  },
  {
    id: 'tiles-marble-granite',
    title: 'Tiles, Marble & Granite',
    short: 'Tile and stone work for floors, walls and surfaces.',
    long: 'Discuss tile, marble and granite work for your property. Share the surface areas, material preferences and existing site conditions to help define the work and prepare a suitable quotation.',
    image: p.greenBedroom.src, imageAlt: p.greenBedroom.alt, layout: 'square',
    highlights: ['Tile work', 'Marble work', 'Granite work', 'Surface and material requirements'],
  },
  {
    id: 'furniture-carpentry',
    title: 'Furniture & Carpentry',
    short: 'Furniture and carpentry shaped around your space and requirements.',
    long: 'From furniture requirements to carpentry work, S&D Build Solutions can help you discuss the dimensions, materials, storage needs and finishes for your space.',
    image: p.dressingWardrobe.src, imageAlt: p.dressingWardrobe.alt, layout: 'tall',
    highlights: ['Furniture work', 'Carpentry', 'Storage requirements', 'Material and finish selection'],
  },
  {
    id: 'plumbing-electrical',
    title: 'Plumbing & Electrical',
    short: 'Plumbing and electrical work as part of your improvement project.',
    long: 'Share your plumbing and electrical requirements with S&D Build Solutions. Whether part of a renovation or a specific scope of work, the team can discuss your property, existing arrangements and the changes needed.',
    image: p.bathroomWindow.src, imageAlt: p.bathroomWindow.alt, layout: 'square',
    highlights: ['Plumbing work', 'Electrical work', 'Renovation requirements', 'Site-specific assessment'],
  },
  {
    id: 'aluminium-glass-upvc',
    title: 'Aluminium, Glass & uPVC Work',
    short: 'Aluminium, glass and uPVC work for your property.',
    long: 'Contact S&D Build Solutions for aluminium, glass and uPVC work. Share your opening dimensions, application and finish preferences so the requirements can be reviewed for your space.',
    image: p.openGlazing.src, imageAlt: p.openGlazing.alt, layout: 'wide',
    highlights: ['Aluminium work', 'Glass work', 'uPVC work', 'Measurements and finish requirements'],
  },
  {
    id: 'painting-finishing',
    title: 'Painting & Finishing',
    short: 'The colours, surfaces and final details that complete your space.',
    long: 'Discuss painting and finishing work for your rooms or property with S&D Build Solutions. Share your surface conditions, colour ideas and the areas to be covered as part of your enquiry.',
    image: p.livingDining.src, imageAlt: p.livingDining.alt, layout: 'square',
    highlights: ['Painting work', 'Surface preparation requirements', 'Colour and finish choices', 'Finishing work'],
  },
];

export const serviceNames = services.map((service) => service.title);

/** Keep links from the original design template working with the confirmed service categories. */
const legacyServiceIds: Record<string, string> = {
  'complete-home-interiors': 'interior-work',
  'modular-kitchen': 'interior-work',
  'living-room': 'interior-work',
  bedroom: 'interior-work',
  'wardrobes-storage': 'furniture-carpentry',
  bathroom: 'interior-work',
  'ceilings-lighting': 'interior-work',
  'furniture-decor': 'furniture-carpentry',
  'turnkey-construction': 'construction-civil-work',
  'space-planning-3d': 'interior-work',
};
export const getService = (id: string) => services.find((service) => service.id === (legacyServiceIds[id] ?? id));
