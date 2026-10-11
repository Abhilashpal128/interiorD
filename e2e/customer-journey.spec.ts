import { expect, test, type Page } from '@playwright/test';

/** The API is mocked here, so these tests need no database or email credentials. */
async function mockLeadApi(page: Page, handler?: (body: Record<string, unknown>) => { status: number; json: unknown }) {
  const received: Record<string, unknown>[] = [];
  await page.route('**/api/leads', async (route) => {
    const body = route.request().postDataJSON() as Record<string, unknown>;
    received.push(body);
    const res = handler?.(body) ?? { status: 201, json: { success: true, data: { leadId: 'AT-20260101-ABC123', duplicate: false } } };
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
  for (const id of ['services', 'designs', 'projects', 'process', 'estimate', 'faq', 'contact']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('lead form validates then submits to the API', async ({ page }) => {
  const received = await mockLeadApi(page);
  await page.goto('/#enquire');
  const form = page.getByTestId('lead-form');
  await form.getByTestId('lead-submit').click();
  await expect(form.getByText('Please enter your full name')).toBeVisible();
  expect(received).toHaveLength(0);

  await fillForm(page, 'lead');
  await form.getByTestId('lead-submit').click();
  await expect(page.getByTestId('enquiry-success').first()).toContainText('AT-20260101-ABC123');
  expect(received).toHaveLength(1);
  expect(received[0]).toMatchObject({ name: 'Asha Verma', phone: '+919876543210', city: 'Mumbai', source: 'Lead capture form (home)' });
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
  await page.getByRole('button', { name: 'Enquire about Modular Kitchen Design' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByLabel('Service interested in *')).toHaveValue('Modular Kitchen Design');
  await dialog.getByLabel('Full name *').fill('Ravi Kumar');
  await dialog.getByLabel('Phone number *').fill('9123456780');
  await dialog.getByLabel('City / location *').fill('Pune');
  await dialog.getByLabel('Property type *').selectOption('Villa');
  await dialog.getByTestId('modal-submit').click();
  await expect(dialog.getByTestId('enquiry-success')).toBeVisible();
  expect(received[0]).toMatchObject({ service: 'Modular Kitchen Design', source: 'Service card: Modular Kitchen Design' });
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
  const total = await page.getByTestId('project-card').count();
  expect(total).toBeGreaterThanOrEqual(8);
  await page.getByLabel('Search projects by title or location').fill('Pune');
  await expect(page.getByTestId('project-card')).toHaveCount(1);
  await page.getByLabel('Search projects by title or location').fill('zzzz');
  await expect(page.getByTestId('projects-empty')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.getByRole('group', { name: 'Filter projects by type' }).getByRole('button', { name: 'Kitchen' }).click();
  await expect(page.getByTestId('project-card')).toHaveCount(2);
  await page.getByRole('link', { name: /View project: / }).first().click();
  await expect(page).toHaveURL(/\/projects\//);
  await page.getByRole('button', { name: 'Next image' }).click();
  await expect(page.getByText('2 /')).toBeVisible();
});

test('before/after slider responds to keyboard, FAQ toggles, unknown route 404s', async ({ page }) => {
  await page.goto('/#renovation');
  const slider = page.getByTestId('before-after');
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  expect(Number(await slider.getAttribute('aria-valuenow'))).toBeGreaterThan(50);

  await page.goto('/#faq');
  const q = page.getByRole('button', { name: 'How long does the project take?' });
  await q.click();
  await expect(q).toHaveAttribute('aria-expanded', 'true');

  await page.goto('/this-route-does-not-exist');
  await expect(page.getByRole('heading', { name: /could not find/i })).toBeVisible();
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
});
