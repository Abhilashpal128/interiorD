import type { RoomKey } from '../types';

/** Which service name (see data/services.ts) each room maps to when pre-filling the enquiry form. */
export const roomToService: Record<RoomKey, string> = {
  Kitchen: 'Interior Work',
  'Living room': 'Interior Work',
  Bedroom: 'Interior Work',
  Bathroom: 'Interior Work',
  'Full home': 'Interior Work',
};
