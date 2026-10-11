import type { Testimonial } from '../types';

/**
 * DEMO TESTIMONIALS - written for illustration, NOT real customer reviews.
 * Replace with genuine, permission-approved reviews. The UI shows a "Demo" label while `demoTestimonials` is true.
 */
export const demoTestimonials = true;

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Customer A.', projectType: '3BHK Apartment', location: 'Mumbai', rating: 5, text: 'The itemised quotation made it easy to compare options, and our project manager kept every milestone clear. (Demo review)' },
  { id: 't2', name: 'Customer B.', projectType: 'Modular Kitchen', location: 'Bengaluru', rating: 5, text: 'The kitchen layout suits how we actually cook. The 3D view helped us approve details with confidence. (Demo review)' },
  { id: 't3', name: 'Customer C.', projectType: 'Villa Interiors', location: 'Pune', rating: 4, text: 'Good guidance on where to spend and where to save. Weekly photo updates were a big plus. (Demo review)' },
  { id: 't4', name: 'Customer D.', projectType: 'Home Renovation', location: 'Ahmedabad', rating: 5, text: 'They sequenced a complicated renovation sensibly and we could stay informed throughout. (Demo review)' },
];
