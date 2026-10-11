export const sqft = (n: number) => `${n.toLocaleString('en-IN')} sq ft`;
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const whatsappUrl = (number: string, message: string) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
