import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, submitLead, type LeadPayload } from './api';

const lead: LeadPayload = {
  name: 'Asha Verma', phone: '+919876543210', city: 'Mumbai', propertyType: 'Apartment',
  service: 'Carpentry', source: 'Contact section', website: '', idempotencyKey: 'test-enquiry-1234',
};

afterEach(() => vi.unstubAllGlobals());

describe('submitLead', () => {
  it('posts enquiry details and reads the mail API response', async () => {
    const data = { leadId: 'SND-12345678', duplicate: false };
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, data }), { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);
    await expect(submitLead(lead)).resolves.toEqual(data);
    const [url, options] = fetchMock.mock.calls[0]!;
    expect(url).toMatch(/\/api\/leads$/);
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual(lead);
  });

  it('shows the backend error when email delivery fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: false, error: { message: 'We could not send your enquiry. Please try again or call us.' },
    }), { status: 502 })));
    await expect(submitLead(lead)).rejects.toMatchObject({ status: 502, message: expect.stringContaining('could not send') });
  });

  it('reports an unreachable backend as a connection error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(submitLead(lead)).rejects.toBeInstanceOf(ApiError);
  });
});
