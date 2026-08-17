import { test, expect } from '@playwright/test';

test.describe('Public gallery', () => {
  test('loads the gallery shell', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'RTI Gallery' })).toBeVisible();
    await expect(
      page.getByText('No published scans found.')
        .or(page.getByPlaceholder('Search scans...')),
    ).toBeVisible({ timeout: 15_000 });
  });

  test('shows the login page for protected routes', async ({ page }) => {
    await page.goto('/search');

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });
});

test.describe('Authentication', () => {
  test('logs in with the seeded admin user', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('e2e-admin');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL(/\/admin/, { timeout: 15_000 });
    await expect(page.getByRole('button', { name: 'Back to Gallery' })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Records & Upload/i })).toBeVisible();
  });

  test('rejects invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});
