import { request } from '../services/api';

const TOKEN_KEY = 'atelier_admin_token';
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (t: string | null) => (t ? sessionStorage.setItem(TOKEN_KEY, t) : sessionStorage.removeItem(TOKEN_KEY));

export const STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'] as const;
export interface Delivery { status: string; attempts: number; lastError?: string }
export interface AdminLead {
  leadId: string; name: string; phone: string; email?: string; city: string; propertyType: string; propertySize?: string; service: string;
  budget?: string; preferredStartDate?: string; message?: string; source: string; projectTitle?: string; status: (typeof STATUSES)[number];
  notes: Array<{ text: string; author: string; createdAt: string }>; createdAt: string;
  notificationStatus: { internal: Delivery; customer: Delivery };
  calculatorInputs?: { scope: string; finish: string; sizeSqft: number; addOns: string[]; estimateMin?: number; estimateMax?: number };
}
export interface LeadList { items: AdminLead[]; total: number; page: number; pages: number; services: string[] }

const auth = () => ({ Authorization: `Bearer ${getToken() ?? ''}` });

export const login = (email: string, password: string) =>
  request<{ token: string }>('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const listLeads = (qs: URLSearchParams) => request<LeadList>(`/api/admin/leads?${qs}`, { headers: auth() });
export const updateLead = (id: string, body: { status?: string; note?: string }) =>
  request<AdminLead>(`/api/admin/leads/${id}`, { method: 'PATCH', headers: auth(), body: JSON.stringify(body) });
export const retryNotifications = (id: string) =>
  request<{ notificationStatus: AdminLead['notificationStatus'] }>(`/api/admin/leads/${id}/retry-notifications`, { method: 'POST', headers: auth() });

export async function downloadCsv(qs: URLSearchParams) {
  const base = ((import.meta.env.VITE_API_URL as string | undefined) ?? '').replace(/\/$/, '');
  const res = await fetch(`${base}/api/admin/leads/export.csv?${qs}`, { headers: auth() });
  if (!res.ok) throw new Error('Export failed');
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
