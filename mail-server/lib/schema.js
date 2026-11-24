import { z } from 'zod';

function normalizePhone(raw) {
  let value = raw.replace(/[\s\-().]/g, '');
  if (/^\+(?!91)\d{8,15}$/.test(value)) return value;
  if (value.startsWith('+91')) value = value.slice(3);
  else if (value.length === 12 && value.startsWith('91')) value = value.slice(2);
  else if (value.length === 11 && value.startsWith('0')) value = value.slice(1);
  return /^[6-9]\d{9}$/.test(value) ? `+91${value}` : null;
}

const text = (min, max) => z.string().trim().min(min).max(max);
const optionalText = (max) => text(0, max).optional();

// Keep the submitted fields compatible with src/services/api.ts in the frontend.
export const leadSchema = z.object({
  name: text(2, 80),
  phone: text(1, 40).transform(normalizePhone).refine((v) => v !== null, 'Enter a valid mobile number'),
  email: z.union([z.literal(''), z.string().trim().email('Enter a valid email address').max(120)]).optional(),
  city: text(2, 80),
  propertyType: z.enum(['Apartment', 'Villa', 'Independent House', 'Office', 'Other']),
  propertySize: z.string().trim().regex(/^(?:\d{2,6})?$/, 'Enter size in sq ft (numbers only)').optional(),
  service: text(1, 120),
  budget: optionalText(80),
  preferredStartDate: z.string().refine((value) => {
    if (!value) return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, 'Enter a valid date').optional(),
  message: optionalText(2000),
  source: text(1, 160).default('Website enquiry'),
  projectId: optionalText(100),
  projectTitle: optionalText(160),
  calculatorInputs: z.object({
    propertyType: text(1, 40),
    sizeSqft: z.number().finite().positive().max(1000000),
    scope: text(1, 120),
    finish: text(1, 60),
    addOns: z.array(text(1, 100)).max(20),
    estimateMin: z.number().finite().nonnegative().optional(),
    estimateMax: z.number().finite().nonnegative().optional(),
  }).optional(),
  idempotencyKey: z.string().regex(/^[A-Za-z0-9_-]{8,100}$/, 'Invalid enquiry key').optional(),
  website: z.string().max(0, 'Please leave this field empty').default(''),
});
