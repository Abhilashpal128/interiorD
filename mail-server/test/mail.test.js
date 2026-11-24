import assert from 'node:assert/strict';
import test from 'node:test';
import nodemailer from 'nodemailer';
import { buildMessage, mailConfigured, RECIPIENT, sendEnquiry } from '../lib/mail.js';

const lead = {
  name: 'Asha Verma', phone: '+919876543210', email: 'asha@example.com', city: 'Mumbai',
  propertyType: 'Apartment', propertySize: '1200', service: 'Carpentry', budget: '5L - 10L',
  preferredStartDate: '2027-06-01', source: 'Budget calculator', message: '<script>example</script>',
  projectId: 'project-1', projectTitle: 'Living room',
  calculatorInputs: { propertyType: 'Apartment', sizeSqft: 1200, scope: 'Full home', finish: 'Premium', addOns: ['Lighting'], estimateMin: 500000, estimateMax: 700000 },
};

test('email goes to the fixed business inbox and includes enquiry and calculator details', async () => {
  const message = buildMessage({ ...lead, to: 'attacker@example.com' }, 'SND-12345678', 'sender@gmail.com');
  assert.equal(message.to, RECIPIENT);
  assert.equal(message.from.address, 'sender@gmail.com');
  assert.equal(message.replyTo.address, lead.email);
  for (const value of ['Asha Verma', '+919876543210', 'Mumbai', '1200', 'Carpentry', '2027-06-01', 'Living room', 'Lighting', '500000', '700000']) {
    assert.ok(message.text.includes(value), `Email should include ${value}`);
  }
  const transport = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'unix' });
  const result = await transport.sendMail(message);
  const raw = result.message.toString();
  assert.match(raw, /To: sndbuildsolution@gmail.com/);
  assert.match(raw, /Reply-To: Asha Verma <asha@example.com>/);
  assert.match(raw, /Content-Type: text\/plain/);
  assert.ok(!raw.includes('attacker@example.com'));
});

test('email is optional and credentials are required', () => {
  assert.equal(buildMessage({ ...lead, email: '' }, 'SND-12345678', 'sender@gmail.com').replyTo, undefined);
  assert.equal(mailConfigured({}), false);
  assert.equal(mailConfigured({ GMAIL_USER: 'sender@gmail.com', GMAIL_APP_PASSWORD: '   ' }), false);
  assert.equal(mailConfigured({ GMAIL_USER: 'sender@gmail.com', GMAIL_APP_PASSWORD: 'example-test-password' }), true);
});

test('Gmail transport authenticates, checks acceptance and cancels timed-out delivery', async (t) => {
  const oldUser = process.env.GMAIL_USER;
  const oldPassword = process.env.GMAIL_APP_PASSWORD;
  process.env.GMAIL_USER = 'sender@gmail.com';
  process.env.GMAIL_APP_PASSWORD = 'test pass word only';
  t.after(() => {
    if (oldUser === undefined) delete process.env.GMAIL_USER;
    else process.env.GMAIL_USER = oldUser;
    if (oldPassword === undefined) delete process.env.GMAIL_APP_PASSWORD;
    else process.env.GMAIL_APP_PASSWORD = oldPassword;
  });
  let accepted = [RECIPIENT];
  let stalled = false;
  let closed = 0;
  t.mock.method(nodemailer, 'createTransport', (options) => {
    assert.equal(options.service, 'gmail');
    assert.equal(options.auth.user, 'sender@gmail.com');
    assert.equal(options.auth.pass, 'testpasswordonly');
    return {
      sendMail: async (message) => {
        assert.equal(message.to, RECIPIENT);
        assert.ok(message.signal instanceof AbortSignal);
        if (stalled) return new Promise((_, reject) => {
          message.signal.addEventListener('abort', () => reject(Object.assign(new Error('Aborted'), { code: 'ABORT_ERR' })), { once: true });
        });
        return { accepted };
      },
      close: () => { closed += 1; },
    };
  });
  await sendEnquiry(lead, 'SND-12345678');
  accepted = [];
  await assert.rejects(sendEnquiry(lead, 'SND-12345678'), { code: 'ERECIPIENT' });
  assert.equal(closed, 2);
  stalled = true;
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const cancellation = assert.rejects(sendEnquiry(lead, 'SND-12345678'), { code: 'ABORT_ERR' });
  t.mock.timers.tick(15000);
  await cancellation;
  assert.equal(closed, 3);
});
