import { describe, expect, it } from 'vitest';
import { enquirySchema } from './leadSchema';
import { normalizePhone } from './phone';

const valid = {
  name: 'Asha Verma', phone: '9876543210', email: '', city: 'Mumbai', propertyType: 'Apartment', propertySize: '', service: 'Modular Kitchen',
  budget: '', preferredStartDate: '', message: '', website: '',
};

describe('enquirySchema', () => {
  it('accepts a minimal valid enquiry', () => expect(enquirySchema.safeParse(valid).success).toBe(true));
  it('flags bad phone, email and size', () => {
    const r = enquirySchema.safeParse({ ...valid, phone: '12345', email: 'x', propertySize: '12a' });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues.map((i) => i.path[0])).toEqual(expect.arrayContaining(['phone', 'email', 'propertySize']));
  });
  it('rejects a filled honeypot', () => expect(enquirySchema.safeParse({ ...valid, website: 'spam' }).success).toBe(false));
  it('rejects past start dates', () => expect(enquirySchema.safeParse({ ...valid, preferredStartDate: '2020-01-01' }).success).toBe(false));
  it('requires a service', () => expect(enquirySchema.safeParse({ ...valid, service: '' }).success).toBe(false));
});

describe('normalizePhone', () => {
  it('handles prefixes', () => {
    expect(normalizePhone('+91 98765 43210')).toBe('+919876543210');
    expect(normalizePhone('09876543210')).toBe('+919876543210');
    expect(normalizePhone('9123456780')).toBe('+919123456780'); // starts with 91 but is a plain 10-digit number
    expect(normalizePhone('1234')).toBeNull();
  });
});
