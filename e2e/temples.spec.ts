import { test, expect } from '@playwright/test';

test.describe('Hindu Temples & Tirthas End-to-End Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/temples');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should render hero, active Temples navbar tab, and initial temple cards', async ({ page }) => {
    await expect(page).toHaveTitle(/Hindu Sanatan Temples & Tirthas/i);

    // Verify Header Navbar shows Temples tab as active
    const templesTab = page.locator('header a[role="tab"]:has-text("Temples")').first();
    await expect(templesTab).toBeVisible();
    await expect(templesTab).toHaveAttribute('aria-selected', 'true');

    // Verify NO duplicate in-page tab switcher exists
    const redundantTabSwitcher = page.locator('main [role="tablist"], [data-testid="app-tab-switcher"]');
    await expect(redundantTabSwitcher).toHaveCount(0);

    // Verify Hero title and Tirtha Vandana sloka
    const heroTitle = page.locator('h1:has-text("सनातन तीर्थ एवं दिव्य मन्दिर")');
    await expect(heroTitle).toBeVisible();

    const tirthaSloka = page.locator('div:has-text("गङ्गे च यमुने चैव गोदावरि सरस्वति")').last();
    await expect(tirthaSloka).toBeVisible();

    // Verify iconic temple cards are rendered
    const templeCards = page.locator('h3:has-text("Kashi Vishwanath"), h3:has-text("Kedarnath"), h3:has-text("Badrinath")');
    await expect(templeCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should allow filtering by holy circuits (12 Jyotirlingas & Char Dham)', async ({ page }) => {
    await page.waitForSelector('h3', { timeout: 10000 });

    // Click on Char Dham button in filter bar
    const charDhamBtn = page.locator('button:has-text("Char Dham")').first();
    await expect(charDhamBtn).toBeVisible();
    await charDhamBtn.click();

    // Should display Char Dham cards: Badrinath, Jagannath Puri, Dwarkadhish, Ramanathaswamy
    const badrinathCard = page.locator('h3:has-text("Badrinath Temple")');
    await expect(badrinathCard).toBeVisible({ timeout: 10000 });

    const puriCard = page.locator('h3:has-text("Jagannath Puri Temple")');
    await expect(puriCard).toBeVisible();
  });

  test('should support real-time search filtering across names, rivers, and cities', async ({ page }) => {
    await page.waitForSelector('h3', { timeout: 10000 });

    const searchInput = page.locator('input[placeholder*="Search temples"]');
    await expect(searchInput).toBeVisible();

    // Search for "Kshipra" river
    await searchInput.fill('Kshipra');

    // Should display Mahakaleshwar Jyotirlinga on Kshipra river
    const ujjainCard = page.locator('h3:has-text("Mahakaleshwar Jyotirlinga")');
    await expect(ujjainCard).toBeVisible({ timeout: 10000 });

    // Should not show Badrinath (which is on Alaknanda)
    const badrinathCard = page.locator('h3:has-text("Badrinath Temple")');
    await expect(badrinathCard).not.toBeVisible();
  });

  test('should open detailed darshan lore modal and close cleanly', async ({ page }) => {
    await page.waitForSelector('h3:has-text("Kashi Vishwanath")', { timeout: 10000 });

    // Click on Kashi Vishwanath card
    const kashiCard = page.locator('h3:has-text("Kashi Vishwanath")');
    await kashiCard.click();

    // Modal dialog should open
    const modalDialog = page.locator('div[role="dialog"]');
    await expect(modalDialog).toBeVisible({ timeout: 5000 });

    // Verify Darshan timings heading
    const darshanHeading = page.locator('span:has-text("Darshan & Aarti Timings")');
    await expect(darshanHeading.first()).toBeVisible();

    // Verify Ganga river mention
    const river = page.locator('p:has-text("Holy Ganga")');
    await expect(river.first()).toBeVisible();

    // Close modal by pressing Escape
    await page.keyboard.press('Escape');
    await expect(modalDialog).not.toBeVisible();
  });

  test('should open temple modal directly via URL parameter', async ({ page }) => {
    await page.goto('/temples?id=somnath');
    await page.waitForLoadState('domcontentloaded');

    // Modal should be automatically opened for Somnath
    const modalDialog = page.locator('div[role="dialog"]');
    await expect(modalDialog).toBeVisible({ timeout: 5000 });

    const modalTitle = page.locator('#temple-modal-title:has-text("Somnath Jyotirlinga")');
    await expect(modalTitle).toBeVisible();
  });

  test('should contain working link to local Panchang computed at temple coordinates', async ({ page }) => {
    await page.waitForSelector('a:has-text("Local Panchang")', { timeout: 10000 });

    const localPanchangLink = page.locator('a:has-text("Local Panchang")').first();
    await expect(localPanchangLink).toBeVisible();

    const href = await localPanchangLink.getAttribute('href');
    expect(href).toMatch(/\/panchang\?lat=[0-9.-]+&lon=[0-9.-]+/);
  });
});
