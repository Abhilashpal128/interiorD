import type { ProcessStep } from '../types';

/** DEMO process - edit titles, descriptions and typical durations. */
export const processSteps: ProcessStep[] = [
  { title: 'Initial consultation', description: 'We listen to your needs, lifestyle, budget and inspirations.', duration: 'Day 1' },
  { title: 'Site visit & requirements', description: 'Measurements, photographs and a detailed requirements checklist.', duration: 'Week 1' },
  { title: 'Design concepts & space planning', description: 'Layout options and design directions for your approval.', duration: 'Weeks 1-3' },
  { title: '3D visualisation & approval', description: 'Photorealistic visuals and drawings so you can approve with confidence.', duration: 'Weeks 3-4' },
  { title: 'Materials & quotation', description: 'Material selection with samples and a line-item quotation.', duration: 'Weeks 4-5' },
  { title: 'Production / construction', description: 'Factory and site work begin to the agreed schedule.', duration: 'Weeks 5-10' },
  { title: 'Installation & execution', description: 'Installation, electrical coordination, finishes and styling.', duration: 'Weeks 10-13' },
  { title: 'Quality inspection & handover', description: 'Checklist-based inspection, snag fixing and handover.', duration: 'Week 14' },
  { title: 'After-sales support', description: 'A defined channel for service requests after handover.', duration: 'Ongoing' },
];

/** Example project journey (DEMO dates/durations - illustrative only). */
export const journeyMilestones = [
  { week: 'Week 0', title: 'Concept signed off', text: 'Mood board and layout approved.', image: 'planning' },
  { week: 'Week 4', title: '3D & material approval', text: 'Final visuals, finishes and quotation confirmed.', image: 'living4' },
  { week: 'Week 7', title: 'Production underway', text: 'Carpentry and panels made to measure.', image: 'construction2' },
  { week: 'Week 11', title: 'Installation begins', text: 'Kitchen, wardrobes and ceilings installed on site.', image: 'kitchen3' },
  { week: 'Week 14', title: 'Handover', text: 'Inspection, styling and handover.', image: 'living1' },
] as const;
