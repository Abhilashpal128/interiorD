import type { BudgetBand } from '../types';

/** Maps an INR amount to one of the budget options used in the enquiry form (config/site.ts > budgetOptions). */
export function budgetOptionFor(amount: number): string {
  if (amount < 500_000) return 'Under ₹5 lakh';
  if (amount < 1_000_000) return '₹5 - 10 lakh';
  if (amount < 2_000_000) return '₹10 - 20 lakh';
  if (amount < 4_000_000) return '₹20 - 40 lakh';
  return '₹40 lakh +';
}

export function budgetOptionForBand(band: BudgetBand): string {
  switch (band) {
    case 'Under 5L':
      return 'Under ₹5 lakh';
    case '5L - 10L':
      return '₹5 - 10 lakh';
    case '10L - 20L':
      return '₹10 - 20 lakh';
    default:
      return '₹20 - 40 lakh';
  }
}
