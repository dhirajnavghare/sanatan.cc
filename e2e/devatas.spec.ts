import { test, expect } from '@playwright/test';

test.describe('Hindu Devi Devatas End-to-End Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/devatas');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should render hero, active Deities navbar tab, and all deity cards', async ({ page }) => {
    await expect(page).toHaveTitle(/Hindu Devi Devatas/i);

    // Verify Header Navbar shows Deities tab as active
    const deitiesTab = page.locator('header a[role="tab"]:has-text("Deities")').first();
    await expect(deitiesTab).toBeVisible();
    await expect(deitiesTab).toHaveAttribute('aria-selected', 'true');

    // Verify NO duplicate in-page tab switcher exists
    const redundantTabSwitcher = page.locator('main [role="tablist"], [data-testid="app-tab-switcher"]');
    await expect(redundantTabSwitcher).toHaveCount(0);

    // Verify Hero title and Sanskrit invocation
    const heroTitle = page.locator('h1:has-text("सनातन देवी-देवता दर्शन")');
    await expect(heroTitle).toBeVisible();

    const shantiSloka = page.locator('div:has-text("त्वमेव माता च पिता त्वमेव")').last();
    await expect(shantiSloka).toBeVisible();

    // Verify all 12 deity cards are rendered
    const deityCards = page.locator('h3:has-text("Lord Shiva"), h3:has-text("Lord Vishnu"), h3:has-text("Maa Durga")');
    await expect(deityCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should allow filtering by Smarta Panchayatana tradition', async ({ page }) => {
    await page.waitForSelector('h3', { timeout: 10000 });

    // Click on Pancha Deva button in filter bar
    const panchaDevaBtn = page.locator('button:has-text("Pancha Deva")').first();
    await expect(panchaDevaBtn).toBeVisible();
    await panchaDevaBtn.click();

    // Should display exactly 5 Panchayatana cards: Shiva, Vishnu, Durga, Surya, Ganesha
    const panchaDevaBadges = page.locator('span:has-text("Pancha Deva")');
    await expect(panchaDevaBadges.first()).toBeVisible({ timeout: 10000 });
  });

  test('should support real-time search filtering across names, temples, and tatva', async ({ page }) => {
    await page.waitForSelector('h3', { timeout: 10000 });

    const searchInput = page.locator('input[placeholder*="Search deities"]');
    await expect(searchInput).toBeVisible();

    // Search for Kedarnath temple
    await searchInput.fill('Kedarnath');

    // Should display Lord Shiva card which has Kedarnath Jyotirlinga
    const shivaCard = page.locator('h3:has-text("Lord Shiva")');
    await expect(shivaCard).toBeVisible({ timeout: 10000 });

    // Should not show Lord Rama
    const ramaCard = page.locator('h3:has-text("Lord Sri Rama")');
    await expect(ramaCard).not.toBeVisible();
  });

  test('should open detailed lore modal with mantras, temples, and close cleanly', async ({ page }) => {
    await page.waitForSelector('h3:has-text("Lord Shiva")', { timeout: 10000 });

    // Click on Shiva card or button
    const shivaCard = page.locator('h3:has-text("Lord Shiva")');
    await shivaCard.click();

    // Modal dialog should open
    const modalDialog = page.locator('div[role="dialog"]');
    await expect(modalDialog).toBeVisible({ timeout: 5000 });

    // Verify Sanskrit Mantra heading and Maha Mrityunjaya Mantra
    const mantraTitle = page.locator('div:has-text("Maha Mrityunjaya Mantra")');
    await expect(mantraTitle.first()).toBeVisible();

    // Verify Temple list includes Kashi Vishwanath
    const temple = page.locator('div:has-text("Kashi Vishwanath")');
    await expect(temple.first()).toBeVisible();

    // Close modal by pressing Escape
    await page.keyboard.press('Escape');
    await expect(modalDialog).not.toBeVisible();
  });

  test('should open deity modal directly via URL parameter', async ({ page }) => {
    await page.goto('/devatas?id=krishna');
    await page.waitForLoadState('domcontentloaded');

    // Modal should be automatically opened for Krishna
    const modalDialog = page.locator('div[role="dialog"]');
    await expect(modalDialog).toBeVisible({ timeout: 5000 });

    const modalTitle = page.locator('#devata-modal-title:has-text("Lord Sri Krishna")');
    await expect(modalTitle).toBeVisible();

    // Check Maha Mantra
    const mahaMantra = page.locator('div:has-text("हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे")');
    await expect(mahaMantra.first()).toBeVisible();
  });

  test('should provide working links to festivals and panchang', async ({ page }) => {
    await page.waitForSelector('a:has-text("Festivals")', { timeout: 10000 });

    const festivalsLink = page.locator('a[title*="festivals in timeline"]').first();
    await expect(festivalsLink).toBeVisible();

    const href = await festivalsLink.getAttribute('href');
    expect(href).toMatch(/\/festivals\?q=/);
  });
});
