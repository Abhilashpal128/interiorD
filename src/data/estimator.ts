/**
 * BUDGET ESTIMATOR CONFIGURATION (DEMO RATES)
 * -------------------------------------------
 * These rates are illustrative placeholders, NOT real prices. Replace them with the business's own
 * indicative rates. The result is always shown to visitors as an indicative range, never a quotation.
 *
 * Formula (see src/utils/estimator.ts):
 *   base  = sizeSqft x finishRate x propertyTypeMultiplier x scope.factor
 *   total = base + selected add-ons
 *   range = total x [rangeLow, rangeHigh]
 */
export interface EstimatorConfig {
  currency: 'INR';
  minSize: number;
  maxSize: number;
  rangeLow: number;
  rangeHigh: number;
  /** INR per sq ft of carpet area for a complete-home scope */
  finishRates: Record<'Basic' | 'Premium' | 'Luxury', number>;
  finishDescriptions: Record<'Basic' | 'Premium' | 'Luxury', string>;
  propertyTypeMultiplier: Record<string, number>;
  scopes: Array<{ id: string; label: string; factor: number; breakdown: Record<string, number> }>;
  addOns: Array<{ id: string; label: string; kind: 'fixed' | 'perSqft'; amount: number }>;
}

export const estimatorConfig: EstimatorConfig = {
  currency: 'INR',
  minSize: 300,
  maxSize: 10000,
  rangeLow: 0.9,
  rangeHigh: 1.15,
  finishRates: { Basic: 1100, Premium: 1750, Luxury: 2800 },
  finishDescriptions: {
    Basic: 'Laminate finishes, standard hardware, essential storage',
    Premium: 'Acrylic or veneer accents, branded hardware, layered lighting',
    Luxury: 'Veneer, stone, bespoke joinery, designer lighting',
  },
  propertyTypeMultiplier: { Apartment: 1, Villa: 1.2, 'Independent House': 1.1, Office: 0.9, Other: 1 },
  scopes: [
    { id: 'full-home', label: 'Complete home interiors', factor: 1, breakdown: { 'Modular kitchen': 0.18, 'Wardrobes & storage': 0.17, 'Living & dining': 0.17, Bedrooms: 0.16, Bathrooms: 0.07, 'False ceiling & lighting': 0.09, 'Furniture & decor': 0.08, 'Design & project management': 0.08 } },
    { id: 'kitchen', label: 'Modular kitchen only', factor: 0.2, breakdown: { 'Modular kitchen': 0.78, 'False ceiling & lighting': 0.07, 'Design & project management': 0.15 } },
    { id: 'living', label: 'Living & dining only', factor: 0.26, breakdown: { 'Living & dining': 0.62, 'False ceiling & lighting': 0.15, 'Furniture & decor': 0.12, 'Design & project management': 0.11 } },
    { id: 'bedrooms', label: 'Bedrooms only', factor: 0.3, breakdown: { Bedrooms: 0.45, 'Wardrobes & storage': 0.3, 'False ceiling & lighting': 0.1, 'Design & project management': 0.15 } },
    { id: 'wardrobes', label: 'Wardrobes & storage only', factor: 0.16, breakdown: { 'Wardrobes & storage': 0.88, 'Design & project management': 0.12 } },
    { id: 'renovation', label: 'Renovation (refresh)', factor: 0.7, breakdown: { 'Living & dining': 0.2, Bedrooms: 0.2, Bathrooms: 0.15, 'False ceiling & lighting': 0.15, 'Furniture & decor': 0.1, 'Design & project management': 0.2 } },
  ],
  addOns: [
    { id: '3d', label: '3D walkthrough', kind: 'fixed', amount: 25000 },
    { id: 'smart', label: 'Smart-home automation', kind: 'perSqft', amount: 110 },
    { id: 'ceiling', label: 'Premium false ceiling package', kind: 'perSqft', amount: 85 },
    { id: 'decor', label: 'Furniture & decor package', kind: 'perSqft', amount: 190 },
    { id: 'appliances', label: 'Appliance sourcing support', kind: 'fixed', amount: 15000 },
  ],
};
