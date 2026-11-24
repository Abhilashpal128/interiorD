import nodemailer from 'nodemailer';

export const RECIPIENT = 'sndbuildsolution@gmail.com';

export function mailConfigured(env = process.env) {
  return Boolean(env.GMAIL_USER?.trim() && env.GMAIL_APP_PASSWORD?.replace(/\s/g, ''));
}

export function buildMessage(lead, leadId, sender) {
  const fields = [
    ['Reference', leadId], ['Name', lead.name], ['Phone', lead.phone],
    ['Email', lead.email], ['City / location', lead.city], ['Property type', lead.propertyType],
    ['Property size (sq ft)', lead.propertySize], ['Service', lead.service],
    ['Budget', lead.budget], ['Preferred start date', lead.preferredStartDate],
    ['Source', lead.source], ['Project ID', lead.projectId], ['Project', lead.projectTitle],
  ];
  const lines = ['New website enquiry — S&D Build Solutions', ''];
  for (const [label, value] of fields) {
    if (value !== undefined && value !== '') lines.push(`${label}: ${value}`);
  }
  if (lead.message) lines.push('', 'Additional requirements:', lead.message);
  if (lead.calculatorInputs) {
    const calc = lead.calculatorInputs;
    lines.push('', 'Calculator selections:',
      `Property type: ${calc.propertyType}`, `Size: ${calc.sizeSqft} sq ft`,
      `Scope: ${calc.scope}`, `Finish: ${calc.finish}`,
      `Add-ons: ${calc.addOns.join(', ') || 'None'}`);
    if (calc.estimateMin !== undefined) lines.push(`Estimate minimum (INR): ${calc.estimateMin}`);
    if (calc.estimateMax !== undefined) lines.push(`Estimate maximum (INR): ${calc.estimateMax}`);
  }
  return {
    from: { name: 'S&D Build Solutions Website', address: sender },
    to: RECIPIENT,
    ...(lead.email ? { replyTo: { name: lead.name, address: lead.email } } : {}),
    subject: `Website enquiry ${leadId}`,
    text: lines.join('\n'),
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

export async function sendEnquiry(lead, leadId) {
  if (!mailConfigured()) throw new Error('Mail is not configured');
  const sender = process.env.GMAIL_USER.trim();
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: sender, pass: process.env.GMAIL_APP_PASSWORD.replace(/\s/g, '') },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    dnsTimeout: 10000,
    pool: false,
  });
  let timer;
  try {
    // Finish before Vercel's function deadline and the frontend's request timeout.
    const result = await Promise.race([
      transport.sendMail(buildMessage(lead, leadId, sender)),
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          transport.close();
          reject(Object.assign(new Error('Mail delivery timed out'), { code: 'ETIMEDOUT' }));
        }, 40000);
      }),
    ]);
    if (!result.accepted?.some((address) => String(address).toLowerCase() === RECIPIENT)) {
      throw Object.assign(new Error('Recipient was not accepted'), { code: 'ERECIPIENT' });
    }
  } finally {
    clearTimeout(timer);
    transport.close();
  }
}
