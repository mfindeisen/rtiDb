import { test, expect, type Page } from '@playwright/test';

function passwordInput(page: Page) {
  return page.locator('#password');
}

test.describe('Authentication', () => {
  test('sends the gallery to login', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText('Login to your account', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(passwordInput(page)).toBeVisible();
  });

  test('sends a record URL to login', async ({ page }) => {
    await page.goto('/record/demo');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByLabel('Username')).toBeVisible();
  });

  test('logs in with the seeded admin user', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('admin');
    await passwordInput(page).fill('e2e-admin');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/admin/, { timeout: 15_000 });
    await expect(page.getByRole('button', { name: 'Back to Gallery' })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Records & Upload/i })).toBeVisible();
  });

  test('rejects invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('admin');
    await passwordInput(page).fill('wrong-password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});
