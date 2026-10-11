import type { CalculatorInputs } from '../types';

const BASE_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly fields?: Record<string, string>,
  ) {
    super(message);
  }
}

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  city: string;
  propertyType: string;
  propertySize?: string;
  service: string;
  budget?: string;
  preferredStartDate?: string;
  message?: string;
  source: string;
  projectId?: string;
  projectTitle?: string;
  calculatorInputs?: CalculatorInputs;
  idempotencyKey: string;
  website: string;
}

export interface LeadResponse {
  leadId: string;
  duplicate: boolean;
}

export async function request<T>(path: string, init: RequestInit = {}, timeoutMs = 20000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
    });
    const body = (await res.json().catch(() => null)) as
      | { success: boolean; data?: T; error?: { message?: string; fields?: Record<string, string> } }
      | null;
    if (!res.ok || !body?.success) {
      throw new ApiError(body?.error?.message ?? 'Something went wrong. Please try again.', res.status, body?.error?.fields);
    }
    return body.data as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if ((err as Error).name === 'AbortError') throw new ApiError('The request timed out. Please check your connection and try again.', 0);
    throw new ApiError('Could not reach the server. Please check your connection or call us.', 0);
  } finally {
    clearTimeout(timer);
  }
}

/** The ONE function every enquiry form uses to submit a lead. */
export function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  return request<LeadResponse>('/api/leads', { method: 'POST', body: JSON.stringify(payload) });
}

export function newIdempotencyKey(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `k${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}
