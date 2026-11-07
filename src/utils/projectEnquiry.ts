import type { EnquiryPrefill, Project } from '../types';

/** Builds the pre-filled enquiry for "Plan a Similar Project" CTAs. */
export function projectEnquiry(p: Project, from: string): EnquiryPrefill {
  return {
    service: p.service,
    message: `I would like to discuss work similar to "${p.title}" (${p.style}).`,
    source: `${from}: ${p.title}`,
    projectId: p.id,
    projectTitle: p.title,
  };
}
