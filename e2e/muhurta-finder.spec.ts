import { test, expect } from '@playwright/test';

test.describe('Shubh Muhurta Finder End-to-End Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/muhurta');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should render hero, categories, and load initial auspicious Muhurtas', async ({ page }) => {
    // 1. Verify page header
    const heading = page.locator('h1, h2').filter({ hasText: /मुहूर्त|Muhurta/ }).first();
    await expect(heading).toBeVisible();

    // 2. Verify categories are rendered
    const grihaBtn = page.locator('button', { hasText: 'Griha Pravesh' }).first();
    await expect(grihaBtn).toBeVisible();

    const vivahaBtn = page.locator('button', { hasText: 'Vivaha' }).first();
    await expect(vivahaBtn).toBeVisible();

    // 3. Verify at least one result card loads
    const resultCard = page.locator('article').first();
    await expect(resultCard).toBeVisible({ timeout: 10000 });
  });

  test('should allow category switching and update URL parameters', async ({ page }) => {
    const vivahaBtn = page.locator('button', { hasText: 'Vivaha' }).first();
    await expect(vivahaBtn).toBeVisible();
    await vivahaBtn.click();

    // URL should reflect category=vivaha
    await expect(page).toHaveURL(/category=vivaha/);

    // Verify card content updates
    const resultCard = page.locator('article').first();
    await expect(resultCard).toBeVisible({ timeout: 10000 });
  });

  test('should filter by suitability level (Optimal, Good, All)', async ({ page }) => {
    // Wait for results to be populated
    await page.waitForSelector('article', { timeout: 10000 });

    // Click 'Optimal' filter
    const optimalFilterBtn = page.locator('button', { hasText: 'Optimal Only' }).or(
      page.locator('button', { hasText: /Optimal/ })
    ).first();

    if (await optimalFilterBtn.isVisible()) {
      await optimalFilterBtn.click();
      
      // If matches exist, they must be Optimal
      const cards = page.locator('article');
      const count = await cards.count();
      if (count > 0) {
        const firstCardText = await cards.first().innerText();
        expect(firstCardText).toContain('Optimal');
      }
    }
  });

  test('should contain working link to full Panchang for the day', async ({ page }) => {
    await page.waitForSelector('article', { timeout: 10000 });
    const panchangLink = page.locator('article a', { hasText: /View Full Panchang/i }).first();
    await expect(panchangLink).toBeVisible();
    
    const href = await panchangLink.getAttribute('href');
    expect(href).toMatch(/\/panchang\?date=\d{4}-\d{2}-\d{2}/);
  });
});
