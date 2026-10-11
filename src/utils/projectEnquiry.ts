import type { EnquiryPrefill, Project } from '../types';
import { roomToService } from '../data/roomService';

/** Builds the pre-filled enquiry for "Plan a Similar Project" CTAs. */
export function projectEnquiry(p: Project, from: string): EnquiryPrefill {
  const service =
    p.category === 'Kitchen' ? roomToService.Kitchen : p.category === 'Renovation' ? 'Home Renovation' : roomToService['Full home'];
  return {
    service,
    propertyType: p.propertyType,
    propertySize: String(p.areaSqft),
    message: `I would like to plan a project similar to "${p.title}" (${p.location}, ${p.style}).`,
    source: `${from}: ${p.title}`,
    projectId: p.id,
    projectTitle: p.title,
  };
}
