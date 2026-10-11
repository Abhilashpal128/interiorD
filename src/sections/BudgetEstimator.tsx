import { useMemo, useState } from 'react';
import { Info } from 'lucide-react';
import { estimatorConfig as cfg } from '../data/estimator';
import { PROPERTY_TYPES } from '../types';
import { calculateEstimate, formatInr } from '../utils/estimator';
import { budgetOptionFor } from '../utils/budget';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';

type Finish = keyof typeof cfg.finishRates;
const finishes = Object.keys(cfg.finishRates) as Finish[];

export function BudgetEstimator() {
  const [propertyType, setPropertyType] = useState<string>('Apartment');
  const [sizeText, setSizeText] = useState('1200');
  const [scopeId, setScopeId] = useState('full-home');
  const [finish, setFinish] = useState<Finish>('Premium');
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const { openEnquiry } = useEnquiry();

  const size = Number(sizeText);
  const sizeValid = /^\d+$/.test(sizeText) && size >= cfg.minSize && size <= cfg.maxSize;
  const result = useMemo(
    () => (sizeValid ? calculateEstimate({ propertyType, sizeSqft: size, scopeId, finish, addOnIds }) : null),
    [sizeValid, size, propertyType, scopeId, finish, addOnIds],
  );
  const scopeLabel = cfg.scopes.find((s) => s.id === scopeId)?.label ?? scopeId;
  const toggleAddOn = (id: string) => setAddOnIds((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const request = () => {
    if (!result) return;
    openEnquiry({
      service: scopeId === 'kitchen' ? 'Modular Kitchen Design' : scopeId === 'renovation' ? 'Home Renovation' : scopeId === 'full-home' ? 'Complete Home Interiors' : undefined,
      propertyType: propertyType as (typeof PROPERTY_TYPES)[number],
      propertySize: String(size),
      budget: budgetOptionFor((result.min + result.max) / 2),
      message: `Please send a detailed quote. Calculator selection: ${scopeLabel}, ${finish} finish, ${size} sq ft. Indicative estimate shown: ${formatInr(result.min)} - ${formatInr(result.max)}.`,
      source: 'Budget estimator',
      calculatorInputs: { propertyType, sizeSqft: size, scope: scopeLabel, finish, addOns: cfg.addOns.filter((a) => addOnIds.includes(a.id)).map((a) => a.label), estimateMin: result.min, estimateMax: result.max },
    });
  };

  return (
    <section id="estimate" aria-labelledby="estimate-title" className="section bg-sand/40">
      <div className="container-x">
        <SectionHeading id="estimate-title" eyebrow="Budget estimator" title="Get an indicative budget in seconds" intro="Adjust the inputs to see an illustrative range. It is not a quotation - a detailed quote follows your consultation and site visit." />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <Reveal className="space-y-8 bg-ivory p-6 shadow-soft sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="est-type">Property type</label>
                <select id="est-type" className="field-input" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                  {PROPERTY_TYPES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="est-size">Property size (sq ft)</label>
                <input id="est-size" className="field-input" inputMode="numeric" value={sizeText} onChange={(e) => setSizeText(e.target.value.replace(/[^\d]/g, '').slice(0, 5))} aria-invalid={!sizeValid} aria-describedby="est-size-help" />
                <p id="est-size-help" className={`mt-1 text-xs ${sizeValid ? 'text-taupe' : 'text-red-800'}`} role={sizeValid ? undefined : 'alert'}>
                  {sizeValid ? 'Carpet area' : `Enter a size between ${cfg.minSize.toLocaleString('en-IN')} and ${cfg.maxSize.toLocaleString('en-IN')} sq ft`}
                </p>
              </div>
            </div>
            <div>
              <label className="field-label" htmlFor="est-scope">Service scope</label>
              <select id="est-scope" className="field-input" value={scopeId} onChange={(e) => setScopeId(e.target.value)}>
                {cfg.scopes.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <fieldset>
              <legend className="field-label">Finish level</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {finishes.map((f) => (
                  <label key={f} className={`cursor-pointer border p-4 transition focus-within:outline focus-within:outline-2 focus-within:outline-bronze ${finish === f ? 'border-charcoal bg-charcoal text-ivory' : 'border-line bg-white/60 hover:border-charcoal'}`}>
                    <input type="radio" name="finish" value={f} checked={finish === f} onChange={() => setFinish(f)} className="sr-only" />
                    <span className="block font-serif text-xl">{f}</span>
                    <span className={`mt-1 block text-xs leading-snug ${finish === f ? 'text-sand' : 'text-taupe'}`}>{cfg.finishDescriptions[f]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="field-label">Optional add-ons</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {cfg.addOns.map((a) => (
                  <label key={a.id} className="flex min-h-[48px] cursor-pointer items-center gap-3 border border-line bg-white/60 px-3 py-2.5 text-sm">
                    <input type="checkbox" checked={addOnIds.includes(a.id)} onChange={() => toggleAddOn(a.id)} className="h-4 w-4 accent-[rgb(158,118,66)]" />
                    {a.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-charcoal p-6 text-ivory shadow-lift sm:p-9 lg:sticky lg:top-28" aria-live="polite" data-testid="estimate-result">
              <p className="eyebrow !text-sand">Indicative estimate</p>
              {result ? (
                <>
                  <p className="mt-3 font-serif text-4xl leading-tight sm:text-5xl" data-testid="estimate-range">{formatInr(result.min)} <span className="text-sand/70">to</span> {formatInr(result.max)}</p>
                  <ul className="mt-7 space-y-3" aria-label="Indicative breakdown by category">
                    {result.breakdown.map((b) => (
                      <li key={b.label}>
                        <div className="flex justify-between gap-3 text-sm"><span>{b.label}</span><span className="text-sand">{formatInr(b.min)} - {formatInr(b.max)}</span></div>
                        <div className="mt-1 h-1 bg-ivory/15"><div className="h-full bg-bronze" style={{ width: `${Math.max(4, (b.max / result.max) * 100)}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="mt-4 text-sand/90">Enter a valid property size to see an estimate.</p>
              )}
              <p className="mt-7 flex gap-2 text-xs leading-relaxed text-sand/80"><Info size={16} className="mt-0.5 shrink-0" aria-hidden />This is an illustrative estimate based on demo rates, not a quotation. Actual cost depends on your design, materials and site conditions, and is confirmed only after consultation.</p>
              <button type="button" disabled={!result} onClick={request} className="btn btn-bronze mt-6 w-full">Request Detailed Quote</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
