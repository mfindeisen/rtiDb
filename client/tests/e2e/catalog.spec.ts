import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers';

test.describe('Catalog happy path', () => {
  test('creates, discusses, publishes, and annotates a record', async ({ page }) => {
    const name = `E2E Seal ${Date.now()}`;
    await loginAsAdmin(page);

    await page.getByLabel('Record Name').fill(name);
    await page.getByLabel('Description').fill('Playwright catalog record');

    const created = page.waitForResponse((res) => {
      const { pathname } = new URL(res.url());
      return pathname === '/api/records' && res.request().method() === 'POST';
    });
    await page.locator('form').getByRole('button', { name: 'Create Record' }).click();
    const createdRes = await created;
    expect(createdRes.ok()).toBeTruthy();
    const body = await createdRes.json();
    expect(body.id).toBeTruthy();
    const recordId = String(body.id);

    await expect(page.getByRole('heading', { name })).toBeVisible();
    await expect(page.getByText('Draft', { exact: true }).first()).toBeVisible();

    await page.goto(`/record/${recordId}`);
    await expect(page.getByRole('heading', { name })).toBeVisible();
    await expect(page.getByText('Playwright catalog record')).toBeVisible();

    await page.getByLabel('Scholarly Discussion').click();
    await page.getByPlaceholder(/Share an observation/).fill('E2E discussion note');
    await page.getByRole('button', { name: 'Post comment' }).click();
    await expect(page.getByText('E2E discussion note')).toBeVisible();

    const publish = await page.request.put(`/api/records/${recordId}/publish`, {
      data: { is_published: true },
    });
    expect(publish.ok()).toBeTruthy();

    const annotation = await page.request.post(`/api/records/${recordId}/annotations`, {
      data: {
        type: 'rectangle',
        geometry: { x1: 0.2, y1: 0.2, x2: 0.6, y2: 0.6 },
        label: 'E2E rectangle',
        rtiView: {
          lightDir: { x: 0, y: 0, z: 1 },
          renderMode: 0,
          specularExponent: 10,
          colorGain: { r: 1, g: 1, b: 1 },
          camera: { cx: 0, cy: 0, zoom: 1, targetX: 0, targetY: 0 },
        },
        visibility: 'published',
      },
    });
    expect(annotation.ok()).toBeTruthy();

    const listed = await page.request.get(`/api/records/${recordId}/annotations`);
    expect(listed.ok()).toBeTruthy();
    expect(JSON.stringify(await listed.json())).toContain('E2E rectangle');

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'RTI Gallery' })).toBeVisible();
    await page.getByPlaceholder('Search catalog...').fill(name);
    await expect(page.getByRole('heading', { name })).toBeVisible({ timeout: 10_000 });
  });
});
