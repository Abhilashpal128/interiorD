import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { EnquiryPrefill } from '../types';
import { EnquiryModal } from '../components/EnquiryModal';

interface EnquiryContextValue {
  /** Opens the shared enquiry modal, optionally pre-filled (service, project, calculator selections...). */
  openEnquiry: (prefill?: Partial<EnquiryPrefill>) => void;
  closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; prefill: EnquiryPrefill; nonce: number }>({
    open: false,
    prefill: { source: 'Website' },
    nonce: 0,
  });

  const openEnquiry = useCallback((prefill: Partial<EnquiryPrefill> = {}) => {
    setState((s) => ({ open: true, prefill: { source: 'Website', ...prefill }, nonce: s.nonce + 1 }));
  }, []);
  const closeEnquiry = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ openEnquiry, closeEnquiry }), [openEnquiry, closeEnquiry]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryModal key={state.nonce} open={state.open} prefill={state.prefill} onClose={closeEnquiry} />
    </EnquiryContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEnquiry(): EnquiryContextValue {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used inside <EnquiryProvider>');
  return ctx;
}
