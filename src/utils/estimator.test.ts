import { describe, expect, it } from 'vitest';
import { calculateEstimate, formatInr } from './estimator';
import { estimatorConfig } from '../data/estimator';

describe('calculateEstimate', () => {
  it('computes the documented formula for a premium apartment', () => {
    const r = calculateEstimate({ propertyType: 'Apartment', sizeSqft: 1000, scopeId: 'full-home', finish: 'Premium', addOnIds: [] });
    // base = 1000 * 1750 * 1 * 1 = 1,750,000 -> range 0.9x..1.15x
    expect(r?.min).toBe(1_575_000);
    expect(Math.abs((r?.max ?? 0) - 2_012_500)).toBeLessThanOrEqual(1000); // rounded to nearest 1,000
  });

  it('applies the property-type multiplier', () => {
    const apt = calculateEstimate({ propertyType: 'Apartment', sizeSqft: 1000, scopeId: 'full-home', finish: 'Basic', addOnIds: [] })!;
    const villa = calculateEstimate({ propertyType: 'Villa', sizeSqft: 1000, scopeId: 'full-home', finish: 'Basic', addOnIds: [] })!;
    expect(villa.min / apt.min).toBeCloseTo(1.2, 1);
  });

  it('adds fixed and per-sqft add-ons', () => {
    const without = calculateEstimate({ propertyType: 'Apartment', sizeSqft: 1000, scopeId: 'full-home', finish: 'Basic', addOnIds: [] })!;
    const withAddOns = calculateEstimate({ propertyType: 'Apartment', sizeSqft: 1000, scopeId: 'full-home', finish: 'Basic', addOnIds: ['3d', 'smart'] })!;
    // 25,000 + 110*1000 = 135,000 more (before the range factor)
    expect(Math.abs(withAddOns.min - without.min - 135_000 * 0.9)).toBeLessThanOrEqual(1000);
    expect(withAddOns.breakdown.at(-1)?.label).toBe('Selected add-on services');
  });

  it('scales with finish level', () => {
    const f = (finish: 'Basic' | 'Premium' | 'Luxury') =>
      calculateEstimate({ propertyType: 'Apartment', sizeSqft: 900, scopeId: 'full-home', finish, addOnIds: [] })!.min;
    expect(f('Basic')).toBeLessThan(f('Premium'));
    expect(f('Premium')).toBeLessThan(f('Luxury'));
  });

  it('breakdown shares of every scope sum to 1 and max > min', () => {
    for (const s of estimatorConfig.scopes) {
      expect(Object.values(s.breakdown).reduce((a, b) => a + b, 0)).toBeCloseTo(1, 5);
    }
    const r = calculateEstimate({ propertyType: 'Apartment', sizeSqft: 800, scopeId: 'kitchen', finish: 'Premium', addOnIds: [] })!;
    expect(r.max).toBeGreaterThan(r.min);
    expect(r.breakdown.every((b) => b.max >= b.min)).toBe(true);
  });

  it('returns null for invalid input', () => {
    expect(calculateEstimate({ propertyType: 'Apartment', sizeSqft: 50, scopeId: 'full-home', finish: 'Basic', addOnIds: [] })).toBeNull();
    expect(calculateEstimate({ propertyType: 'Apartment', sizeSqft: Number.NaN, scopeId: 'full-home', finish: 'Basic', addOnIds: [] })).toBeNull();
    expect(calculateEstimate({ propertyType: 'Apartment', sizeSqft: 900, scopeId: 'nope', finish: 'Basic', addOnIds: [] })).toBeNull();
  });
});

describe('formatInr', () => {
  it('formats lakh and crore', () => {
    expect(formatInr(1_250_000)).toBe('₹12.5 lakh');
    expect(formatInr(12_500_000)).toBe('₹1.25 crore');
    expect(formatInr(45_000)).toBe('₹45,000');
  });
});
