import { z } from 'zod';
import { PROPERTY_TYPES } from '../types';
import { normalizePhone } from './phone';

/**
 * Client-side validation for every enquiry form. The server re-validates the same rules
 * (server/src/validators/lead.ts) - keep the two in sync when changing fields.
 */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(80, 'Name is too long'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .refine((v) => normalizePhone(v) !== null, 'Enter a valid 10-digit mobile number'),
  email: z.union([z.literal(''), z.string().trim().email('Enter a valid email address').max(120)]),
  city: z.string().trim().min(2, 'Please enter your city').max(80),
  propertyType: z.enum(PROPERTY_TYPES as [string, ...string[]], { errorMap: () => ({ message: 'Select a property type' }) }),
  propertySize: z
    .string()
    .trim()
    .refine((v) => v === '' || /^\d{2,6}$/.test(v), 'Enter size in sq ft (numbers only)'),
  service: z.string().min(1, 'Select a service'),
  budget: z.string(),
  preferredStartDate: z
    .string()
    .refine((v) => v === '' || !Number.isNaN(Date.parse(v)), 'Enter a valid date')
    .refine((v) => v === '' || new Date(v) >= startOfToday(), 'Start date cannot be in the past'),
  message: z.string().trim().max(2000, 'Please keep this under 2000 characters'),
  /** honeypot - must stay empty */
  website: z.string().max(0),
});

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
