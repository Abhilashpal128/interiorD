import { Modal } from './Modal';
import { EnquiryForm } from './EnquiryForm';
import type { EnquiryPrefill } from '../types';
import { formatInr } from '../utils/estimator';

interface Props {
  open: boolean;
  prefill: EnquiryPrefill;
  onClose: () => void;
}

export function EnquiryModal({ open, prefill, onClose }: Props) {
  const calc = prefill.calculatorInputs;
  return (
    <Modal open={open} onClose={onClose} title="Book your free consultation" size="lg">
      <div className="p-6 sm:p-10">
        <p className="eyebrow">Free consultation</p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Tell us about your home</h2>
        <p className="mt-2 text-sm text-ink/80">Share a few details and our team will review your enquiry.</p>
        {(prefill.projectTitle || calc) && (
          <ul className="mt-4 flex flex-wrap gap-2 text-xs" aria-label="Details carried over">
            {prefill.projectTitle && <li className="rounded-full bg-sand px-3 py-1.5 text-charcoal">Inspired by: {prefill.projectTitle}</li>}
            {calc && (
              <li className="rounded-full bg-sand px-3 py-1.5 text-charcoal">
                Estimate: {calc.estimateMin !== undefined && calc.estimateMax !== undefined ? `${formatInr(calc.estimateMin)} - ${formatInr(calc.estimateMax)}` : 'included'} ({calc.finish}, {calc.sizeSqft} sq ft)
              </li>
            )}
          </ul>
        )}
        <div className="mt-6">
          <EnquiryForm prefill={prefill} idPrefix="modal" onDone={onClose} />
        </div>
      </div>
    </Modal>
  );
}
