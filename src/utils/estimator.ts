import { estimatorConfig, type EstimatorConfig } from '../data/estimator';

export interface EstimateInput {
  propertyType: string;
  sizeSqft: number;
  scopeId: string;
  finish: keyof EstimatorConfig['finishRates'];
  addOnIds: string[];
}

export interface EstimateResult {
  min: number;
  max: number;
  breakdown: Array<{ label: string; min: number; max: number }>;
}

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

/** Pure function: indicative estimate from config. Illustrative only - never a quotation. */
export function calculateEstimate(input: EstimateInput, config: EstimatorConfig = estimatorConfig): EstimateResult | null {
  const scope = config.scopes.find((s) => s.id === input.scopeId);
  const rate = config.finishRates[input.finish];
  const size = Math.min(Math.max(input.sizeSqft, 0), config.maxSize);
  if (!scope || !rate || !Number.isFinite(size) || size < config.minSize) return null;

  const mult = config.propertyTypeMultiplier[input.propertyType] ?? 1;
  const base = size * rate * mult * scope.factor;

  const selectedAddOns = config.addOns.filter((a) => input.addOnIds.includes(a.id));
  const addOnTotal = selectedAddOns.reduce((sum, a) => sum + (a.kind === 'fixed' ? a.amount : a.amount * size), 0);

  const lines: Array<{ label: string; amount: number }> = Object.entries(scope.breakdown).map(([label, share]) => ({
    label,
    amount: base * share,
  }));
  if (addOnTotal > 0) lines.push({ label: 'Selected add-on services', amount: addOnTotal });

  const toRange = (amount: number) => ({ min: roundTo(amount * config.rangeLow, 1000), max: roundTo(amount * config.rangeHigh, 1000) });
  const total = toRange(base + addOnTotal);

  return {
    ...total,
    breakdown: lines.map((l) => ({ label: l.label, ...toRange(l.amount) })),
  };
}

/** 1250000 -> "₹12.5 lakh", 12500000 -> "₹1.25 crore" */
export function formatInr(amount: number): string {
  if (amount >= 10_000_000) return `₹${trim(amount / 10_000_000)} crore`;
  if (amount >= 100_000) return `₹${trim(amount / 100_000)} lakh`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

const trim = (n: number) => String(Number(n.toFixed(2)));
