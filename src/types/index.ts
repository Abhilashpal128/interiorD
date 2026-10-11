export type PropertyType = 'Apartment' | 'Villa' | 'Independent House' | 'Office' | 'Other';
export const PROPERTY_TYPES: PropertyType[] = ['Apartment', 'Villa', 'Independent House', 'Office', 'Other'];

export interface Service {
  id: string;
  title: string;
  short: string;
  long: string;
  image: string;
  /** Visual size in the editorial grid */
  layout: 'tall' | 'wide' | 'square';
  highlights: string[];
  /** Indicative only - DEMO */
  startingFrom?: string;
}

export type DesignCategory =
  | 'Modern Minimalist'
  | 'Contemporary Luxury'
  | 'Warm & Earthy'
  | 'Scandinavian'
  | 'Indian Contemporary'
  | 'Premium Modular Kitchens'
  | 'Compact Apartments'
  | 'Luxury Bedrooms';

export type RoomKey = 'Kitchen' | 'Living room' | 'Bedroom' | 'Bathroom' | 'Full home';
export type BudgetBand = 'Under 5L' | '5L - 10L' | '10L - 20L' | '20L+';
export type StyleKey = 'Minimalist' | 'Luxury' | 'Earthy' | 'Scandinavian' | 'Indian Contemporary';

export interface DesignItem {
  id: string;
  title: string;
  category: DesignCategory;
  room: RoomKey;
  style: StyleKey;
  budget: BudgetBand;
  image: string;
  gallery: string[];
  description: string;
  palette: string[];
  materials: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  propertyType: PropertyType;
  areaSqft: number;
  style: string;
  budgetRange: string;
  duration: string;
  category: 'Apartment' | 'Villa' | 'Kitchen' | 'Renovation' | 'Office';
  cover: string;
  gallery: string[];
  description: string;
  scope: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  projectType: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  photo?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  duration: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  priceTier: string;
  bestFor: string;
  image: string;
}

export interface Stat {
  label: string;
  value: string;
  note?: string;
}

/** Values passed to the enquiry form when a CTA opens it. */
export interface EnquiryPrefill {
  service?: string;
  propertyType?: PropertyType;
  propertySize?: string;
  budget?: string;
  message?: string;
  city?: string;
  source: string;
  projectId?: string;
  projectTitle?: string;
  calculatorInputs?: CalculatorInputs;
}

export interface CalculatorInputs {
  propertyType: string;
  sizeSqft: number;
  scope: string;
  finish: string;
  addOns: string[];
  estimateMin?: number;
  estimateMax?: number;
}
