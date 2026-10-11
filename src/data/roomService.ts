import type { RoomKey } from '../types';

/** Which service name (see data/services.ts) each room maps to when pre-filling the enquiry form. */
export const roomToService: Record<RoomKey, string> = {
  Kitchen: 'Modular Kitchen Design',
  'Living room': 'Living Room Interiors',
  Bedroom: 'Bedroom Interiors',
  Bathroom: 'Bathroom Interiors',
  'Full home': 'Complete Home Interiors',
};
