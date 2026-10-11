import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { enquirySchema, type EnquiryFormValues } from '../utils/leadSchema';
import { normalizePhone } from '../utils/phone';
import { ApiError, newIdempotencyKey, submitLead } from '../services/api';
import { PROPERTY_TYPES, type EnquiryPrefill } from '../types';
import { serviceNames } from '../data/services';
import { budgetOptions, contact } from '../config/site';

interface Props {
  prefill: EnquiryPrefill;
  idPrefix: string;
  onDone?: () => void;
  doneLabel?: string;
}

const today = () => new Date().toISOString().slice(0, 10);
const GENERAL = 'General consultation / not sure yet';

/**
 * THE shared enquiry form. Every CTA, calculator, project and contact form in the site uses this
 * component and therefore the same `submitLead` pipeline (POST /api/leads).
 */
export function EnquiryForm({ prefill, idPrefix, onDone, doneLabel = 'Close' }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: prefill.city ?? '',
      propertyType: prefill.propertyType ?? ('' as EnquiryFormValues['propertyType']),
      propertySize: prefill.propertySize ?? '',
      service: prefill.service ?? '',
      budget: prefill.budget ?? '',
      preferredStartDate: '',
      message: prefill.message ?? '',
      website: '',
    },
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState<{ leadId: string; name: string } | null>(null);
  const keyRef = useRef(newIdempotencyKey());
  const inFlight = useRef(false);

  const onSubmit = async (values: EnquiryFormValues) => {
    if (inFlight.current) return; // guards against double taps before React re-renders
    inFlight.current = true;
    setServerError(null);
    try {
      const res = await submitLead({
        name: values.name,
        phone: normalizePhone(values.phone) ?? values.phone,
        email: values.email || undefined,
        city: values.city,
        propertyType: values.propertyType,
        propertySize: values.propertySize || undefined,
        service: values.service,
        budget: values.budget || undefined,
        preferredStartDate: values.preferredStartDate || undefined,
        message: values.message || undefined,
        source: prefill.source,
        projectId: prefill.projectId,
        projectTitle: prefill.projectTitle,
        calculatorInputs: prefill.calculatorInputs,
        idempotencyKey: keyRef.current,
        website: values.website,
      });
      setDone({ leadId: res.leadId, name: values.name.split(' ')[0] ?? values.name });
      toast.success('Enquiry received. Thank you!');
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
      if (err instanceof ApiError && err.fields) {
        for (const [field, msg] of Object.entries(err.fields)) {
          if (field in values) setError(field as keyof EnquiryFormValues, { message: msg });
        }
      }
      setServerError(message);
      toast.error(message);
    } finally {
      inFlight.current = false;
    }
  };

  if (done) {
    return (
      <div className="px-2 py-8 text-center" role="status" data-testid="enquiry-success">
        <CheckCircle2 className="mx-auto text-bronze" size={52} strokeWidth={1.4} />
        <h3 className="mt-4 font-serif text-3xl text-charcoal">Thank you, {done.name}</h3>
        <p className="mx-auto mt-3 max-w-sm text-ink/85">
          We have received your enquiry and our team will review it. If you shared an email address, you will receive an acknowledgement.
        </p>
        <p className="mt-4 text-sm text-taupe">
          Reference: <strong className="font-semibold text-charcoal">{done.leadId}</strong>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {onDone && (
            <button type="button" className="btn btn-primary" onClick={onDone}>
              {doneLabel}
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              keyRef.current = newIdempotencyKey(); // a genuinely new enquiry gets a new key
              reset();
              setDone(null);
            }}
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const f = (name: string) => `${idPrefix}-${name}`;
  const err = (name: keyof EnquiryFormValues) => errors[name]?.message;
  const aria = (name: keyof EnquiryFormValues) => ({
    id: f(name),
    'aria-invalid': errors[name] ? (true as const) : undefined,
    'aria-describedby': errors[name] ? `${f(name)}-error` : undefined,
  });
  const Err = ({ name }: { name: keyof EnquiryFormValues }) =>
    err(name) ? (
      <p id={`${f(name)}-error`} role="alert" className="field-error">
        {err(name)}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Enquiry form" data-testid={`${idPrefix}-form`}>
      <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor={f('name')}>Full name *</label>
          <input {...register('name')} {...aria('name')} className="field-input" autoComplete="name" placeholder="Your full name" />
          <Err name="name" />
        </div>
        <div>
          <label className="field-label" htmlFor={f('phone')}>Phone number *</label>
          <div className="flex">
            <span className="grid min-w-[3.4rem] place-items-center border border-r-0 border-line bg-sand/60 px-3 text-sm font-medium text-charcoal" style={{ borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)' }}>+91</span>
            <input {...register('phone')} {...aria('phone')} className="field-input !rounded-l-none" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="98765 43210" />
          </div>
          <Err name="phone" />
        </div>
        <div>
          <label className="field-label" htmlFor={f('email')}>Email address</label>
          <input {...register('email')} {...aria('email')} className="field-input" type="email" autoComplete="email" placeholder="you@example.com" />
          <Err name="email" />
        </div>
        <div>
          <label className="field-label" htmlFor={f('city')}>City / location *</label>
          <input {...register('city')} {...aria('city')} className="field-input" autoComplete="address-level2" placeholder="e.g. Mumbai" />
          <Err name="city" />
        </div>
        <div>
          <label className="field-label" htmlFor={f('propertyType')}>Property type *</label>
          <select {...register('propertyType')} {...aria('propertyType')} className="field-input">
            <option value="">Select property type</option>
            {PROPERTY_TYPES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <Err name="propertyType" />
        </div>
        <div>
          <label className="field-label" htmlFor={f('propertySize')}>Property size (sq ft)</label>
          <input {...register('propertySize')} {...aria('propertySize')} className="field-input" inputMode="numeric" placeholder="e.g. 1200" />
          <Err name="propertySize" />
        </div>
        <div>
          <label className="field-label" htmlFor={f('service')}>Service interested in *</label>
          <select {...register('service')} {...aria('service')} className="field-input">
            <option value="">Select a service</option>
            {[...serviceNames, GENERAL].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <Err name="service" />
        </div>
        <div>
          <label className="field-label" htmlFor={f('budget')}>Approximate budget</label>
          <select {...register('budget')} {...aria('budget')} className="field-input">
            <option value="">Select a range</option>
            {budgetOptions.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <Err name="budget" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor={f('preferredStartDate')}>Expected project start date</label>
          <input {...register('preferredStartDate')} {...aria('preferredStartDate')} className="field-input" type="date" min={today()} />
          <Err name="preferredStartDate" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor={f('message')}>Additional requirements</label>
          <textarea {...register('message')} {...aria('message')} className="field-input min-h-[96px] resize-y" rows={3} placeholder="Tell us about rooms, style preferences, timelines..." />
          <Err name="message" />
        </div>
        {/* Honeypot - hidden from people and assistive tech; bots tend to fill it */}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor={f('website')}>Leave this field empty</label>
          <input {...register('website')} id={f('website')} tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {serverError && (
        <div role="alert" className="mt-4 flex items-start gap-2 border border-red-300 bg-red-50 p-3 text-sm text-red-900">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>
            {serverError} You can also call us on <a className="font-semibold underline" href={`tel:${contact.phoneTel}`}>{contact.phoneDisplay}</a>.
          </span>
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn btn-bronze mt-6 w-full sm:w-auto" data-testid={`${idPrefix}-submit`}>
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden /> Sending...
          </>
        ) : (
          'Get My Free Consultation'
        )}
      </button>
      <p className="mt-3 text-xs text-taupe">By submitting you agree to be contacted about your enquiry. See our <a className="underline" href="/privacy">Privacy Policy</a>.</p>
    </form>
  );
}
