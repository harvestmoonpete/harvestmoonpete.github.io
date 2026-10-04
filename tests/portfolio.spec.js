import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('project directory has accurate destinations and readable layout', async ({ page }) => {
  await page.goto('/');
  const projects = ['failure-lab', 'incident-desk', 'referral-tracker', 'drift-chat'];
  const cards = page.locator('.project');
  await expect(cards).toHaveCount(4);
  for (let i = 0; i < projects.length; i++) {
    await expect(cards.nth(i).getByRole('link', { name: 'Open demo' })).toHaveAttribute('href', `https://harvestmoonpete.github.io/${projects[i]}/`);
    await expect(cards.nth(i).getByRole('link', { name: 'Source code' })).toHaveAttribute('href', `https://github.com/harvestmoonpete/${projects[i]}`);
  }
  await expect(page.locator('.lab')).toContainText('no public demo yet');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});

test('preview has a full-page fallback, closes by keyboard and restores focus', async ({ page }) => {
  // Keep this UI test independent of external demo availability.
  await page.route('https://harvestmoonpete.github.io/**', route => route.fulfill({ body: '<html lang="en"><title>Demo fixture</title><p>Interactive demo fixture</p></html>', contentType: 'text/html' }));
  await page.goto('/');
  const open = page.getByRole('button', { name: 'Preview here' }).first();
  await open.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('iframe')).toHaveAttribute('title', 'Failure Lab interactive demo');
  await expect(page.getByRole('link', { name: 'Open full page' })).toHaveAttribute('href', 'https://harvestmoonpete.github.io/failure-lab/');
  await expect(page.getByRole('button', { name: 'Close project preview' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(open).toBeFocused();
});
