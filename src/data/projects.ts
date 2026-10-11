import type { Project } from '../types';
import { IMG } from './images';

/**
 * DEMO PROJECTS - illustrative only, NOT real client work. Replace with genuine completed projects
 * (with the owner's permission) and real photographs before launch.
 */
export const projects: Project[] = [
  {
    id: 'p1', slug: 'skyline-3bhk-apartment', title: 'Skyline 3BHK Apartment', location: 'Mumbai', propertyType: 'Apartment', areaSqft: 1450,
    style: 'Contemporary', budgetRange: '₹18 - 24 lakh', duration: '14 weeks', category: 'Apartment', cover: IMG.living1,
    gallery: [IMG.living1, IMG.kitchen1, IMG.bedroom1, IMG.dining2],
    description: 'A family apartment reworked for open living, with a concealed utility zone, full-height storage and warm layered lighting.',
    scope: ['Space planning', 'Modular kitchen', 'Wardrobes', 'False ceiling & lighting', 'Furniture & decor'],
  },
  {
    id: 'p2', slug: 'garden-villa-pune', title: 'Garden Villa Interiors', location: 'Pune', propertyType: 'Villa', areaSqft: 3200,
    style: 'Indian Contemporary', budgetRange: '₹55 - 70 lakh', duration: '24 weeks', category: 'Villa', cover: IMG.house1,
    gallery: [IMG.house1, IMG.living3, IMG.dining1, IMG.bedroom2],
    description: 'A three-level villa where natural stone, teak veneer and brass details connect indoor and outdoor living.',
    scope: ['Complete interiors', 'Custom furniture', 'Lighting design', 'Landscape coordination'],
  },
  {
    id: 'p3', slug: 'island-kitchen-bengaluru', title: 'Island Kitchen Remodel', location: 'Bengaluru', propertyType: 'Apartment', areaSqft: 220,
    style: 'Modern', budgetRange: '₹9 - 12 lakh', duration: '6 weeks', category: 'Kitchen', cover: IMG.kitchen3,
    gallery: [IMG.kitchen3, IMG.kitchen4, IMG.kitchen5],
    description: 'A closed kitchen opened up with an island, tall pantry units and integrated appliances.',
    scope: ['Layout change', 'Modular kitchen', 'Counter & backsplash', 'Lighting'],
  },
  {
    id: 'p4', slug: 'compact-1bhk-thane', title: 'Compact 1BHK Makeover', location: 'Thane', propertyType: 'Apartment', areaSqft: 620,
    style: 'Minimalist', budgetRange: '₹5 - 7 lakh', duration: '8 weeks', category: 'Apartment', cover: IMG.apt1,
    gallery: [IMG.apt1, IMG.apt3, IMG.bedroom4],
    description: 'Multipurpose furniture and loft storage give a small home room to breathe.',
    scope: ['Space planning', 'Wardrobes', 'Kitchen', 'Furniture'],
  },
  {
    id: 'p5', slug: 'heritage-bungalow-renovation', title: 'Bungalow Renovation', location: 'Ahmedabad', propertyType: 'Independent House', areaSqft: 2400,
    style: 'Warm & Earthy', budgetRange: '₹35 - 45 lakh', duration: '20 weeks', category: 'Renovation', cover: IMG.house4,
    gallery: [IMG.house4, IMG.living2, IMG.bedroom2, IMG.bath1],
    description: 'A tired 1990s bungalow reconfigured with new flooring, joinery and lighting while keeping its character.',
    scope: ['Civil changes', 'Flooring', 'Joinery', 'Electrical', 'Painting'],
  },
  {
    id: 'p6', slug: 'workspace-studio-gurugram', title: 'Studio Office Fit-out', location: 'Gurugram', propertyType: 'Office', areaSqft: 1800,
    style: 'Contemporary', budgetRange: '₹28 - 36 lakh', duration: '12 weeks', category: 'Office', cover: IMG.office1,
    gallery: [IMG.office1, IMG.office2],
    description: 'An open workspace with acoustic zones, a hospitality-style pantry and flexible meeting rooms.',
    scope: ['Space planning', 'Workstations', 'Acoustic treatment', 'Lighting'],
  },
  {
    id: 'p7', slug: 'sea-view-penthouse', title: 'Sea-View Penthouse', location: 'Mumbai', propertyType: 'Apartment', areaSqft: 2800,
    style: 'Contemporary Luxury', budgetRange: '₹80 lakh - 1.1 crore', duration: '28 weeks', category: 'Apartment', cover: IMG.living3,
    gallery: [IMG.living3, IMG.dining1, IMG.bedroom1, IMG.bath2],
    description: 'Marble, brass and bespoke joinery frame the view in a penthouse designed for entertaining.',
    scope: ['Complete interiors', 'Custom furniture', 'Stone work', 'Automation'],
  },
  {
    id: 'p8', slug: 'scandi-2bhk-hyderabad', title: 'Nordic-Inspired 2BHK', location: 'Hyderabad', propertyType: 'Apartment', areaSqft: 1100,
    style: 'Scandinavian', budgetRange: '₹10 - 14 lakh', duration: '10 weeks', category: 'Apartment', cover: IMG.apt2,
    gallery: [IMG.apt2, IMG.kitchen2, IMG.bedroom3, IMG.living6],
    description: 'Pale woods and soft textiles maximise daylight in a north-facing apartment.',
    scope: ['Space planning', 'Kitchen', 'Wardrobes', 'Decor'],
  },
  {
    id: 'p9', slug: 'family-duplex-chennai', title: 'Family Duplex', location: 'Chennai', propertyType: 'Independent House', areaSqft: 2100,
    style: 'Warm & Earthy', budgetRange: '₹30 - 38 lakh', duration: '18 weeks', category: 'Villa', cover: IMG.house2,
    gallery: [IMG.house2, IMG.living4, IMG.dining2, IMG.bedroom5],
    description: 'A duplex with a double-height living space, timber staircase and warm material palette.',
    scope: ['Complete interiors', 'Staircase detailing', 'Lighting'],
  },
  {
    id: 'p10', slug: 'pantry-kitchen-delhi', title: 'Parallel Kitchen & Pantry', location: 'New Delhi', propertyType: 'Apartment', areaSqft: 180,
    style: 'Modern', budgetRange: '₹7 - 9 lakh', duration: '5 weeks', category: 'Kitchen', cover: IMG.kitchen4,
    gallery: [IMG.kitchen4, IMG.kitchen1, IMG.kitchen2],
    description: 'A narrow kitchen rebuilt with tall pantry units, pull-outs and under-cabinet lighting.',
    scope: ['Modular kitchen', 'Counter', 'Lighting'],
  },
  {
    id: 'p11', slug: 'master-suite-makeover-jaipur', title: 'Master Suite Makeover', location: 'Jaipur', propertyType: 'Villa', areaSqft: 480,
    style: 'Contemporary Luxury', budgetRange: '₹12 - 16 lakh', duration: '8 weeks', category: 'Renovation', cover: IMG.bedroom1,
    gallery: [IMG.bedroom1, IMG.bedroom3, IMG.bath2, IMG.wardrobe],
    description: 'A master bedroom, dressing room and en-suite refreshed with panelling, concealed lighting and a spa bath.',
    scope: ['Bedroom joinery', 'Dressing room', 'Bathroom', 'Lighting'],
  },
  {
    id: 'p12', slug: 'warm-minimal-3bhk-kolkata', title: 'Warm Minimal 3BHK', location: 'Kolkata', propertyType: 'Apartment', areaSqft: 1350,
    style: 'Modern Minimalist', budgetRange: '₹16 - 20 lakh', duration: '13 weeks', category: 'Apartment', cover: IMG.living6,
    gallery: [IMG.living6, IMG.kitchen5, IMG.bedroom4, IMG.dining2],
    description: 'Neutral surfaces, concealed storage and a carefully lit gallery wall create a calm family home.',
    scope: ['Space planning', 'Kitchen', 'Wardrobes', 'Lighting', 'Furniture'],
  },
];

export const projectCategories = ['All', 'Apartment', 'Villa', 'Kitchen', 'Renovation', 'Office'] as const;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
