import type { Project } from '../types';
import { photos as p } from './media';

export const projectCategories = ['All', 'Interiors', 'Carpentry', 'Windows & Glass', 'Site Work'] as const;

// Work collections from the supplied media. Site names, costs, areas and timelines were not supplied.
export const projects: Project[] = [
  {
    id: 'living-dining', slug: 'sculpted-living-and-dining', title: 'Sculpted living & dining',
    category: 'Interiors', service: 'Interior Work', style: 'Layered light & detail', stage: 'Interior showcase',
    cover: p.livingDining.src, gallery: [p.livingDining.src], videoIds: ['living-dining'],
    description: 'A living and dining space brought together by pale wall panelling, soft seating and decorative lighting. The illuminated sculpted feature wall and patterned entrance floor give the room its character.',
    scope: ['Living and dining details', 'Decorative wall panelling', 'Ceiling and lighting details', 'Entrance and floor finishes'],
  },
  {
    id: 'green-bedroom', slug: 'green-and-grain-bedroom', title: 'Green, grain & quiet detail',
    category: 'Interiors', service: 'Interior Work', style: 'Textured bedroom', stage: 'Interior showcase',
    cover: p.greenBedroom.src, gallery: [p.greenBedroom.src, p.creamWardrobe.src],
    description: 'Green upholstery meets a bold veined feature panel and vertical wood-tone detailing. Cream wardrobes and a striped seat add a lighter contrast to this bedroom interior.',
    scope: ['Upholstered headboard', 'Feature wall and vertical detailing', 'Panelled wardrobe doors', 'Bedroom furniture'],
  },
  {
    id: 'compact-lounge', slug: 'teal-storage-compact-lounge', title: 'A place for everything',
    category: 'Carpentry', service: 'Furniture & Carpentry', style: 'Compact lounge', stage: 'Furniture showcase',
    cover: p.tealStorage.src, gallery: [p.tealStorage.src, p.lounge.src], videoIds: ['compact-lounge'],
    description: 'Teal cabinets frame a cream sofa, using the walls for storage while keeping the centre of the room open. Arched door details, round handles and a glass-top coffee table bring the composition together.',
    scope: ['Built-in storage', 'Overhead cabinets', 'Arched cabinet fronts', 'Seating and furniture arrangement'],
  },
  {
    id: 'panoramic-windows', slug: 'panoramic-sliding-windows', title: 'Open up to the light',
    category: 'Windows & Glass', service: 'Aluminium, Glass & uPVC Work', style: 'Sliding windows', stage: 'Installation photographs',
    cover: p.sunset.src, gallery: [p.sunset.src, p.livingWindow.src, p.bedroomWindow.src, p.sunsetPhone.src],
    description: 'Wide sliding windows bring daylight into rooms during their interior fit-out. This collection shows the openings from different angles, including the evening light across the living area.',
    scope: ['Wide window openings', 'Sliding frame installation', 'Glazed panels', 'Interior installation details'],
  },
  {
    id: 'custom-beds', slug: 'custom-beds-and-bedside-details', title: 'Made around everyday living',
    category: 'Carpentry', service: 'Furniture & Carpentry', style: 'Bedroom carpentry', stage: 'Furniture installation',
    cover: p.bedside.src, gallery: [p.bedside.src, p.woodBed.src],
    description: 'A collection of bedroom carpentry details: rounded bed-frame corners, coordinated wood-grain headboards and a floating bedside drawer with a softly lit backdrop.',
    scope: ['Custom bed frames', 'Coordinated headboards', 'Floating bedside storage', 'Wood-grain finish details'],
  },
  {
    id: 'dressing-storage', slug: 'wardrobe-and-dressing-niche', title: 'Storage with a personal corner',
    category: 'Carpentry', service: 'Furniture & Carpentry', style: 'Wardrobe & dressing', stage: 'Furniture showcase',
    cover: p.dressingWardrobe.src, gallery: [p.dressingWardrobe.src],
    description: 'A full-height wardrobe composition with a central dressing niche. Pale panelled fronts, drawers and gold-tone handles surround a botanical accent that gives the storage wall a focal point.',
    scope: ['Full-height wardrobes', 'Integrated dressing niche', 'Drawer storage', 'Panel and handle detailing'],
  },
  {
    id: 'grid-glazing', slug: 'grid-glazing-and-opening-panels', title: 'A frame for the view',
    category: 'Windows & Glass', service: 'Aluminium, Glass & uPVC Work', style: 'Grid-pattern glazing', stage: 'Installation photographs',
    cover: p.openGlazing.src, gallery: [p.openGlazing.src, p.terraceGlazing.src, p.glazingProgress.src], videoIds: ['opening-panels', 'window-walkthrough'],
    description: 'Tall glazing divided into a clear grid, with outward-opening panels above fixed sections. The photographs and videos show the installation, the frame details and its connection to the terrace outside.',
    scope: ['Tall glazed openings', 'Grid-pattern frames', 'Outward-opening panels', 'Glazing installation details'],
  },
  {
    id: 'site-installations', slug: 'window-installation-site-journal', title: 'The work behind the finish',
    category: 'Site Work', service: 'Home Renovation', style: 'Site journal', stage: 'Work in progress',
    cover: p.wallPreparation.src, gallery: [p.wallPreparation.src, p.windowFitout.src, p.exterior.src],
    description: 'A look at window installations and surrounding work during construction and renovation. This site journal includes wall preparation, interior fit-out and an exterior view before final finishing.',
    scope: ['Window installation stages', 'Wall preparation', 'Interior fit-out coordination', 'Exterior glazing progress'],
  },
  {
    id: 'bathroom-details', slug: 'bathroom-window-and-finishing-details', title: 'Light, privacy & practical details',
    category: 'Site Work', service: 'Plumbing & Electrical', style: 'Bathroom details', stage: 'Work in progress',
    cover: p.bathroomWindow.src, gallery: [p.bathroomWindow.src, p.smallWindow.src, p.bathroomDetail.src],
    description: 'Bathroom installation photographs showing frosted glazing, a compact tiled opening, ventilation and fittings. The images capture the space during the finishing stage.',
    scope: ['Bathroom window details', 'Frosted glazing', 'Ventilation provision', 'Wall surfaces and fitting coordination'],
  },
];

export const getProject = (slug: string) => projects.find(project => project.slug === slug);
