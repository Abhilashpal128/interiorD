/** Normalises Indian numbers to +91XXXXXXXXXX (mirrors server/src/validators/lead.ts). */
export function normalizePhone(raw: string): string | null {
  const compact = raw.replace(/[\s\-().]/g, '');
  if (/^\+(?!91)\d{8,15}$/.test(compact)) return compact;
  let digits = compact;
  if (digits.startsWith('+91')) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2); // 91XXXXXXXXXX
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1); // 0XXXXXXXXXX
  return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
}
