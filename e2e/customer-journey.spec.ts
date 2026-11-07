import { expect, test, type Page } from '@playwright/test';

/** The API is mocked here, so these tests need no database or email credentials. */
async function mockLeadApi(page: Page, handler?: (body: Record<string, unknown>) => { status: number; json: unknown }) {
  const received: Record<string, unknown>[] = [];
  await page.route('**/api/leads', async (route) => {
    const body = route.request().postDataJSON() as Record<string, unknown>;
    received.push(body);
    const res = handler?.(body) ?? { status: 201, json: { success: true, data: { leadId: 'SD-20260101-ABC123', duplicate: false } } };
    await route.fulfill({ status: res.status, contentType: 'application/json', body: JSON.stringify(res.json) });
  });
  return received;
}

const fillForm = async (page: Page, scope: string) => {
  const form = page.getByTestId(`${scope}-form`);
  await form.getByLabel('Full name *').fill('Asha Verma');
  await form.getByLabel('Phone number *').fill('98765 43210');
  await form.getByLabel('City / location *').fill('Mumbai');
  await form.getByLabel('Property type *').selectOption('Apartment');
  await form.getByLabel('Service interested in *').selectOption({ index: 2 });
};

test('home page renders core sections without horizontal overflow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  for (const id of ['services', 'designs', 'projects', 'walkthroughs', 'process', 'estimate', 'faq', 'contact']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('lead form validates then submits to the API', async ({ page }) => {
  const received = await mockLeadApi(page);
  await page.goto('/#enquire');
  const form = page.getByTestId('contact-form');
  await form.getByTestId('contact-submit').click();
  await expect(form.getByText('Please enter your full name')).toBeVisible();
  expect(received).toHaveLength(0);

  await fillForm(page, 'contact');
  await form.getByTestId('contact-submit').click();
  await expect(page.getByTestId('enquiry-success').first()).toContainText('SD-20260101-ABC123');
  expect(received).toHaveLength(1);
  expect(received[0]).toMatchObject({ name: 'Asha Verma', phone: '+919876543210', city: 'Mumbai', source: 'Contact section' });
  expect(String(received[0]?.idempotencyKey).length).toBeGreaterThan(8);
});

test('server errors are shown and the lead form stays usable', async ({ page }) => {
  await mockLeadApi(page, () => ({ status: 503, json: { success: false, error: { code: 'SERVICE_UNAVAILABLE', message: 'We could not save your enquiry right now.' } } }));
  await page.goto('/#contact');
  await fillForm(page, 'contact');
  await page.getByTestId('contact-submit').click();
  await expect(page.getByRole('alert').filter({ hasText: 'could not save your enquiry' })).toBeVisible();
  await expect(page.getByTestId('contact-submit')).toBeEnabled();
});

test('service CTA opens the enquiry modal with the service preselected', async ({ page }) => {
  const received = await mockLeadApi(page);
  await page.goto('/#services');
  await page.getByRole('button', { name: 'Enquire about Interior Work' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByLabel('Service interested in *')).toHaveValue('Interior Work');
  await dialog.getByLabel('Full name *').fill('Ravi Kumar');
  await dialog.getByLabel('Phone number *').fill('9123456780');
  await dialog.getByLabel('City / location *').fill('Pune');
  await dialog.getByLabel('Property type *').selectOption('Villa');
  await dialog.getByTestId('modal-submit').click();
  await expect(dialog.getByTestId('enquiry-success')).toBeVisible();
  expect(received[0]).toMatchObject({ service: 'Interior Work', source: 'Service card: Interior Work' });
});

test('budget estimator updates and carries data into the enquiry', async ({ page }) => {
  const received = await mockLeadApi(page);
  await page.goto('/#estimate');
  const before = await page.getByTestId('estimate-range').innerText();
  await page.locator('#est-size').fill('2000');
  await expect(page.getByTestId('estimate-range')).not.toHaveText(before);
  await page.locator('#estimate').getByText('Luxury', { exact: true }).click();
  await page.getByRole('button', { name: 'Request Detailed Quote' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByLabel('Property size (sq ft)')).toHaveValue('2000');
  await dialog.getByLabel('Full name *').fill('Meera Shah');
  await dialog.getByLabel('Phone number *').fill('9988776655');
  await dialog.getByLabel('City / location *').fill('Surat');
  await dialog.getByTestId('modal-submit').click();
  await expect(dialog.getByTestId('enquiry-success')).toBeVisible();
  expect(received[0]?.calculatorInputs).toMatchObject({ sizeSqft: 2000, finish: 'Luxury' });
});

test('project search and filters work, and detail pages load', async ({ page }) => {
  await page.goto('/#projects');
  await expect(page.getByTestId('project-card')).toHaveCount(4);
  await page.getByRole('button', { name: 'Explore all projects', exact: true }).click();
  const total = await page.getByTestId('project-card').count();
  expect(total).toBeGreaterThanOrEqual(8);
  await page.getByLabel('Search our work').fill('botanical');
  await expect(page.getByTestId('project-card')).toHaveCount(1);
  await page.getByLabel('Search our work').fill('zzzz');
  await expect(page.getByTestId('projects-empty')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.getByRole('group', { name: 'Filter projects by type' }).getByRole('button', { name: 'Windows & Glass' }).click();
  await expect(page.getByTestId('project-card')).toHaveCount(2);
  await page.getByRole('link', { name: /View project: / }).first().click();
  await expect(page).toHaveURL(/\/projects\//);
  await page.getByRole('button', { name: 'Next image' }).click();
  await expect(page.getByText('2 /')).toBeVisible();
  await expect(page.locator('main')).not.toContainText('Demo project');
  await page.getByRole('button', { name: 'Plan a Similar Project' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByLabel('Service interested in *')).toHaveValue('Aluminium, Glass & uPVC Work');
  await expect(dialog.getByLabel('Property size (sq ft)')).toHaveValue('');
  await expect(dialog.getByLabel('Additional requirements')).not.toHaveValue(/undefined/);
});

test('FAQ toggles, unknown route 404s, and legal pages load', async ({ page }) => {
  await page.goto('/#faq');
  const q = page.getByRole('button', { name: 'How long does the project take?' });
  await q.click();
  await expect(q).toHaveAttribute('aria-expanded', 'true');

  await page.goto('/this-route-does-not-exist');
  await expect(page.getByRole('heading', { name: /could not find/i })).toBeVisible();
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
});

test('all five supplied videos play on demand and stop when switching clips', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => { if (/\.mp4(?:\?|$)/.test(request.url())) requests.push(request.url()); });
  await page.goto('/#walkthroughs');
  const section = page.locator('#walkthroughs');
  const choices = section.getByRole('group', { name: 'Choose a project video' }).getByRole('button');
  await expect(choices).toHaveCount(5);
  expect(requests).toHaveLength(0);
  for (let i = 0; i < 5; i++) {
    await choices.nth(i).click();
    await expect(section.locator('video')).toHaveCount(0);
    await section.getByRole('button', { name: /^Play video:/ }).click();
    const video = section.locator('video');
    await expect(video).toHaveAttribute('controls', '');
    await expect(video).toHaveAttribute('playsinline', '');
    await expect.poll(() => video.evaluate(el => (el as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
    expect(await video.evaluate(el => (el as HTMLVideoElement).error)).toBeNull();
  }
  expect(new Set(requests).size).toBe(5);
  await section.getByRole('button', { name: 'Discuss a similar project' }).click();
  await expect(page.getByRole('dialog').getByLabel('Service interested in *')).toHaveValue('Aluminium, Glass & uPVC Work');
});

test('video load errors can be retried', async ({ page }) => {
  await page.route('**/*.mp4', route => route.abort());
  await page.goto('/#walkthroughs');
  const section = page.locator('#walkthroughs');
  await section.getByRole('button', { name: /^Play video:/ }).click();
  await expect(section.getByRole('alert')).toContainText('could not be loaded');
  await page.unroute('**/*.mp4');
  await section.getByRole('button', { name: 'Try again' }).click();
  await section.getByRole('button', { name: /^Play video:/ }).click();
  await expect.poll(() => section.locator('video').evaluate(el => (el as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
});

test('featured spaces change and the menu supports keyboard dismissal', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Spaces to live.');
  await page.getByRole('button', { name: 'Next featured space' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Considered design.');
  await page.getByRole('button', { name: 'Previous featured space' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Spaces to live.');
  const menu = page.getByRole('button', { name: 'Open menu' });
  await menu.click();
  const dialog = page.getByRole('dialog', { name: 'Navigation menu' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Tab');
  expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(menu).toBeFocused();
  await menu.click();
  await dialog.getByRole('link', { name: /Our Services/ }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#services$/);
});

test('service accordion opens the selected service and design gallery remains usable', async ({ page }) => {
  await page.goto('/#services');
  const kitchen = page.getByRole('button', { name: '03 Interior Work', exact: true });
  await kitchen.click();
  await expect(kitchen).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#service-panel-interior-work').getByRole('link', { name: 'Explore service' }).click();
  await expect(page).toHaveURL('/services/interior-work');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Interior Work');
  await page.goto('/#designs');
  await page.getByRole('button', { name: /View design:/ }).first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Next image' }).click();
  await expect(dialog.getByText('2 /')).toBeVisible();
  await dialog.getByRole('button', { name: 'Close dialog' }).click();
  await expect(dialog).not.toBeVisible();
});

test('business-card details, service options and branding are consistent', async ({ page }) => {
  await page.goto('/#contact');
  await expect(page).toHaveTitle(/S&D Build Solutions/);
  const contact = page.locator('#contact');
  await expect(contact.getByRole('heading', { name: 'Shailesh & Dinesh' })).toBeVisible();
  await expect(contact.locator('a[href="tel:+919653196477"]')).toBeVisible();
  await expect(contact.locator('a[href="tel:+917676742197"]')).toBeVisible();
  await expect(contact.locator('a[href="mailto:ishaileshpal@gmail.com"]')).toBeVisible();
  await expect(contact.locator('address')).toContainText('Kandivali (E), Lokhandwala');
  await expect(contact.locator('address')).toContainText('Mumbai - 400101');
  await expect(contact.getByLabel('Service interested in *').locator('option')).toHaveText([
    'Select a service', 'Construction & Civil Work', 'Home Renovation', 'Interior Work',
    'Tiles, Marble & Granite', 'Furniture & Carpentry', 'Plumbing & Electrical',
    'Aluminium, Glass & uPVC Work', 'Painting & Finishing', 'General consultation / not sure yet',
  ]);
  const logo = page.locator('header img');
  await expect(logo).toHaveAttribute('alt', 'S&D Build Solutions');
  expect(await logo.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const schema = await page.locator('script[data-seo-jsonld]').allTextContents();
  expect(schema.join(' ')).toContain('+917676742197');
  expect(schema.join(' ')).toContain('400101');
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'S&D Build Solutions');
  await page.goto('/services/modular-kitchen');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Interior Work');
  await page.goto('/privacy');
  await expect(page.locator('main')).toContainText('ishaileshpal@gmail.com');
  await expect(page.locator('main')).toContainText('S&D Build Solutions');
});
