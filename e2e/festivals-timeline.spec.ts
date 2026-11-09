import { test, expect } from '@playwright/test';

test.describe('Festivals Timeline End-to-End Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.clear();
      } catch {}
    });
    await page.goto('/festivals');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should render hero, festival timeline, and load initial celebrations', async ({ page }) => {
    await expect(page).toHaveTitle(/Hindu Festival Timeline/i);

    // Verify Header Navbar shows Festivals tab as active
    const festivalsTab = page.locator('header a[role="tab"]:has-text("Festivals")').first();
    await expect(festivalsTab).toBeVisible();
    await expect(festivalsTab).toHaveAttribute('aria-selected', 'true');

    // Verify Hero title
    const heroTitle = page.locator('h1:has-text("Festivals"), h1:has-text("सनातन उत्सव एवं व्रत पञ्चाङ्ग")');
    await expect(heroTitle).toBeVisible();

    // Verify timeline cards are rendered
    const timelineCards = page.locator('h3:has-text("Diwali"), h3:has-text("Maha Shivaratri"), h3:has-text("Holi")');
    await expect(timelineCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should allow category switching and update URL parameters', async ({ page }) => {
    // Wait for at least one card
    await page.waitForSelector('h3', { timeout: 10000 });

    // Click on Ekadashi category button
    const ekadashiButton = page.locator('button:has-text("Ekadashi")');
    await expect(ekadashiButton).toBeVisible();
    await ekadashiButton.click();

    // URL should reflect category=ekadashi
    await expect(page).toHaveURL(/category=ekadashi/);

    // Cards should display Ekadashi celebrations
    const ekadashiCard = page.locator('h3:has-text("Ekadashi")');
    await expect(ekadashiCard.first()).toBeVisible({ timeout: 10000 });
  });

  test('should support real-time search filtering', async ({ page }) => {
    await page.waitForSelector('h3', { timeout: 10000 });

    const searchInput = page.locator('input[placeholder*="Search festivals"]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('Diwali');
    await expect(page).toHaveURL(/q=Diwali/);

    // Should display Diwali card
    const diwaliCard = page.locator('h3:has-text("Diwali")');
    await expect(diwaliCard.first()).toBeVisible({ timeout: 10000 });
  });

  test('should allow switching calendar years', async ({ page }) => {
    await page.waitForSelector('h3', { timeout: 10000 });

    const year2027Button = page.locator('button:has-text("2027")');
    await expect(year2027Button).toBeVisible();
    await year2027Button.click();

    // URL should reflect year=2027
    await expect(page).toHaveURL(/year=2027/);

    // Year badge should show 2027
    const yearBadge = page.locator('span:has-text("Year 2027")');
    await expect(yearBadge).toBeVisible();
  });

  test('should contain working link to full Panchang for the day', async ({ page }) => {
    await page.waitForSelector('a:has-text("View Day Panchang")', { timeout: 10000 });

    const viewPanchangLink = page.locator('a:has-text("View Day Panchang")').first();
    await expect(viewPanchangLink).toBeVisible();

    const href = await viewPanchangLink.getAttribute('href');
    expect(href).toMatch(/\/panchang\?date=\d{4}-\d{2}-\d{2}/);
  });
});
