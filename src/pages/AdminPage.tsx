import { useCallback, useEffect, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Download, LogOut, RefreshCw, Search } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { Modal } from '../components/Modal';
import { ApiError } from '../services/api';
import { STATUSES, downloadCsv, getToken, listLeads, login, retryNotifications, setToken, updateLead, type AdminLead, type LeadList } from '../admin/adminApi';

const badge = (s: string) => ({ sent: 'bg-green-100 text-green-900', failed: 'bg-red-100 text-red-900', not_configured: 'bg-amber-100 text-amber-900', pending: 'bg-amber-100 text-amber-900', skipped: 'bg-sand text-ink' })[s] ?? 'bg-sand';

function Login({ onDone }: { onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const r = await login(String(f.get('email')), String(f.get('password')));
      setToken(r.token);
      onDone();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="grid min-h-[70vh] place-items-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 bg-white/70 p-8 shadow-soft" aria-label="Admin login">
        <h1 className="font-serif text-3xl">Staff sign in</h1>
        <div><label className="field-label" htmlFor="a-email">Email</label><input id="a-email" name="email" type="email" required autoComplete="username" className="field-input" /></div>
        <div><label className="field-label" htmlFor="a-pass">Password</label><input id="a-pass" name="password" type="password" required autoComplete="current-password" className="field-input" /></div>
        <button disabled={busy} className="btn btn-primary w-full">{busy ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [service, setService] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<LeadList | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<AdminLead | null>(null);
  const [note, setNote] = useState('');

  const qs = useCallback(() => {
    const p = new URLSearchParams({ page: String(page), limit: '20' });
    if (q) p.set('q', q);
    if (status) p.set('status', status);
    if (service) p.set('service', service);
    return p;
  }, [q, status, service, page]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await listLeads(qs()));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) onLogout();
      else toast.error(err instanceof ApiError ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [qs, onLogout]);

  useEffect(() => {
    const t = window.setTimeout(() => void load(), 250);
    return () => window.clearTimeout(t);
  }, [load]);

  const patch = async (body: { status?: string; note?: string }) => {
    if (!open) return;
    try {
      const updated = await updateLead(open.leadId, body);
      setOpen(updated);
      setNote('');
      setData((d) => d && { ...d, items: d.items.map((l) => (l.leadId === updated.leadId ? updated : l)) });
      toast.success('Saved');
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Save failed');
    }
  };
  const retry = async () => {
    if (!open) return;
    try {
      const r = await retryNotifications(open.leadId);
      setOpen({ ...open, notificationStatus: r.notificationStatus });
      toast.success(r.notificationStatus.internal.status === 'sent' ? 'Notification sent' : `Internal email: ${r.notificationStatus.internal.status}`);
      void load();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Retry failed');
    }
  };

  return (
    <div className="container-x py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-4xl">Enquiries</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline !min-h-[44px]" onClick={() => void load()}><RefreshCw size={16} /> Refresh</button>
          <button className="btn btn-outline !min-h-[44px]" onClick={() => downloadCsv(qs()).catch(() => toast.error('Export failed'))}><Download size={16} /> Export CSV</button>
          <button className="btn btn-primary !min-h-[44px]" onClick={onLogout}><LogOut size={16} /> Sign out</button>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_180px_240px]">
        <div className="relative"><label htmlFor="adm-q" className="sr-only">Search</label><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe" aria-hidden /><input id="adm-q" className="field-input !pl-9" placeholder="Search name, phone, email, city, ID" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} /></div>
        <select aria-label="Filter by status" className="field-input" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}><option value="">All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
        <select aria-label="Filter by service" className="field-input" value={service} onChange={(e) => { setService(e.target.value); setPage(1); }}><option value="">All services</option>{data?.services.map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <div className="mt-6 overflow-x-auto border border-line bg-white/60">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-sand/60 text-xs uppercase tracking-wider text-taupe"><tr><th className="p-3">Received</th><th className="p-3">Name</th><th className="p-3">Service</th><th className="p-3">City</th><th className="p-3">Status</th><th className="p-3">Email delivery</th></tr></thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="p-6 text-center text-taupe">Loading...</td></tr>}
            {!loading && data?.items.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-taupe">No enquiries found.</td></tr>}
            {!loading && data?.items.map((l) => (
              <tr key={l.leadId} className="cursor-pointer border-t border-line hover:bg-sand/30" onClick={() => setOpen(l)} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setOpen(l)}>
                <td className="p-3 whitespace-nowrap">{new Date(l.createdAt).toLocaleString('en-IN')}</td><td className="p-3 font-medium">{l.name}<span className="block text-xs text-taupe">{l.leadId}</span></td>
                <td className="p-3">{l.service}</td><td className="p-3">{l.city}</td><td className="p-3">{l.status}</td>
                <td className="p-3"><span className={`rounded px-2 py-0.5 text-xs ${badge(l.notificationStatus.internal.status)}`}>{l.notificationStatus.internal.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data && data.pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm"><span>{data.total} total</span><div className="flex gap-2"><button className="btn btn-outline !min-h-[40px]" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button><span className="self-center">Page {page} / {data.pages}</span><button className="btn btn-outline !min-h-[40px]" disabled={page >= data.pages} onClick={() => setPage(page + 1)}>Next</button></div></div>
      )}

      <Modal open={!!open} onClose={() => setOpen(null)} title="Lead details" size="lg">
        {open && (
          <div className="space-y-5 p-6 sm:p-9">
            <h2 className="font-serif text-3xl">{open.name} <span className="text-base text-taupe">{open.leadId}</span></h2>
            <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {([['Phone', open.phone], ['Email', open.email], ['City', open.city], ['Property', `${open.propertyType} ${open.propertySize ?? ''}`], ['Service', open.service], ['Budget', open.budget], ['Start', open.preferredStartDate], ['Source', open.source], ['Selected', open.projectTitle], ['Received', new Date(open.createdAt).toLocaleString('en-IN')]] as const).map(([k, v]) => v ? <div key={k}><dt className="text-taupe">{k}</dt><dd className="font-medium">{v}</dd></div> : null)}
            </dl>
            {open.message && <p className="bg-sand/50 p-3 text-sm">{open.message}</p>}
            {open.calculatorInputs && <p className="text-sm">Calculator: {open.calculatorInputs.scope}, {open.calculatorInputs.finish}, {open.calculatorInputs.sizeSqft} sq ft {open.calculatorInputs.addOns.length ? `+ ${open.calculatorInputs.addOns.join(', ')}` : ''}</p>}
            <div className="flex flex-wrap items-end gap-4">
              <div><label className="field-label" htmlFor="adm-status">Status</label><select id="adm-status" className="field-input" value={open.status} onChange={(e) => void patch({ status: e.target.value })}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></div>
              <div className="text-sm"><p className="field-label">Notification delivery</p>
                <span className={`mr-2 rounded px-2 py-0.5 text-xs ${badge(open.notificationStatus.internal.status)}`}>Internal: {open.notificationStatus.internal.status}</span>
                <span className={`rounded px-2 py-0.5 text-xs ${badge(open.notificationStatus.customer.status)}`}>Customer: {open.notificationStatus.customer.status}</span>
                {open.notificationStatus.internal.lastError && <p className="mt-1 text-xs text-red-800">{open.notificationStatus.internal.lastError}</p>}
              </div>
              {(['failed', 'not_configured', 'pending'].includes(open.notificationStatus.internal.status) || ['failed', 'not_configured', 'pending'].includes(open.notificationStatus.customer.status)) && <button className="btn btn-outline !min-h-[44px]" onClick={() => void retry()}>Retry email</button>}
            </div>
            <div>
              <h3 className="font-serif text-xl">Internal notes</h3>
              <ul className="mt-2 space-y-2 text-sm">{open.notes.map((n, i) => <li key={i} className="border-l-2 border-bronze pl-3">{n.text}<span className="block text-xs text-taupe">{n.author} · {new Date(n.createdAt).toLocaleString('en-IN')}</span></li>)}{open.notes.length === 0 && <li className="text-taupe">No notes yet.</li>}</ul>
              <label htmlFor="adm-note" className="sr-only">Add a note</label>
              <textarea id="adm-note" className="field-input mt-3" rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add an internal note" />
              <button className="btn btn-primary mt-2 !min-h-[44px]" disabled={!note.trim()} onClick={() => void patch({ note })}>Add note</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function AdminPage() {
  useSeo({ title: 'Admin', noindex: true, path: '/admin' });
  const [authed, setAuthed] = useState(Boolean(getToken()));
  const logout = useCallback(() => { setToken(null); setAuthed(false); }, []);
  return authed ? <Dashboard onLogout={logout} /> : <Login onDone={() => setAuthed(true)} />;
}
