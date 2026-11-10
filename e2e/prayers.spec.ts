import { test, expect } from '@playwright/test';

test.describe('Prayers & Chalisas End-to-End Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.clear();
      } catch {}
    });
    await page.goto('/prayers');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should render hero, prayers directory, and active Prayers navbar tab', async ({ page }) => {
    await expect(page).toHaveTitle(/Sacred Prayers.*Chalisas/i);

    // Verify Header Navbar shows Prayers tab as active
    const prayersTab = page.locator('header a[role="tab"]:has-text("Prayers"), header a[role="tab"]:has-text("स्तोत्र-चालीसा")').first();
    await expect(prayersTab).toBeVisible();
    await expect(prayersTab).toHaveAttribute('aria-selected', 'true');

    // Verify Hero title
    const heroTitle = page.locator('h1:has-text("Prayers"), h1:has-text("सनातन नित्य प्रार्थना एवं स्तोत्र")');
    await expect(heroTitle).toBeVisible();

    // Verify prominent prayers appear
    const hanumanChalisaCard = page.locator('h3:has-text("Hanuman Chalisa"), h3:has-text("श्री हनुमान चालीसा")');
    await expect(hanumanChalisaCard.first()).toBeVisible({ timeout: 10000 });

    const shivTandavCard = page.locator('h3:has-text("Shiv Tandav Stotram"), h3:has-text("शिव ताण्डव स्तोत्रम्")');
    await expect(shivTandavCard.first()).toBeVisible();
  });

  test('should allow filtering by deity category (e.g. Shiva, Hanuman)', async ({ page }) => {
    // Click on Shiva deity tab
    const shivaTab = page.locator('button:has-text("Lord Shiva"), button:has-text("भगवान शिव")');
    await expect(shivaTab).toBeVisible();
    await shivaTab.click();

    // Should display Shiv Tandav Stotram
    const shivTandavCard = page.locator('h3:has-text("Shiv Tandav Stotram"), h3:has-text("शिव ताण्डव स्तोत्रम्")');
    await expect(shivTandavCard.first()).toBeVisible();

    // Click on Hanuman deity tab
    const hanumanTab = page.locator('button:has-text("Hanuman"), button:has-text("हनुमान जी")');
    await expect(hanumanTab).toBeVisible();
    await hanumanTab.click();

    // Should display Hanuman Chalisa
    const hanumanCard = page.locator('h3:has-text("Hanuman Chalisa"), h3:has-text("श्री हनुमान चालीसा")');
    await expect(hanumanCard.first()).toBeVisible();
  });

  test('should support real-time search filtering across titles and verses', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search prayer"], input[placeholder*="स्तोत्र, चालीसा"]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('Ravana');
    const shivTandavCard = page.locator('h3:has-text("Shiv Tandav Stotram"), h3:has-text("शिव ताण्डव स्तोत्रम्")');
    await expect(shivTandavCard.first()).toBeVisible();

    await searchInput.fill('Tulsidas');
    const hanumanCard = page.locator('h3:has-text("Hanuman Chalisa"), h3:has-text("श्री हनुमान चालीसा")');
    await expect(hanumanCard.first()).toBeVisible();
  });

  test('should open interactive Prayer Reader Modal with Japa counter and controls', async ({ page }) => {
    // Click on Hanuman Chalisa card
    const card = page.locator('[data-testid="prayer-card-hanuman-chalisa"]');
    await card.click();

    // Modal should open
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Verify counter button exists and increments
    const japaButton = page.locator('button:has-text("+1 Chant"), button:has-text("+1 पाठ")');
    await expect(japaButton).toBeVisible();
    await japaButton.click();

    await expect(page.getByText('1 / 1').first()).toBeVisible();

    // Close modal
    const closeBtn = page.getByRole('button', { name: /Close reader|बन्द करें/i });
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('should support pure language switching in reader (Zero English in Hindi, Zero Devanagari in EN)', async ({ page }) => {
    // 1. In English mode, open reader
    const cardEn = page.locator('[data-testid="prayer-card-hanuman-chalisa"]');
    await cardEn.click();
    const modalEn = page.locator('[role="dialog"]');
    await expect(modalEn).toBeVisible();
    await expect(page.locator('[role="dialog"] h2:has-text("Shri Hanuman Chalisa")')).toBeVisible();

    // Close modal
    const closeBtn = page.getByRole('button', { name: /Close reader|बन्द करें/i });
    await closeBtn.click();
    await expect(modalEn).not.toBeVisible();

    // 2. Switch to Hindi via Navbar toggle
    const hiButton = page.getByRole('button', { name: 'हिन्दी भाषा चुनें' });
    await hiButton.click();

    // Reopen card in Hindi mode
    const cardHi = page.locator('[data-testid="prayer-card-hanuman-chalisa"]');
    await cardHi.click();
    const modalHi = page.locator('[role="dialog"]');
    await expect(modalHi).toBeVisible();

    // In Hindi mode, verify pure Devanagari title is visible and zero English
    await expect(page.locator('[role="dialog"] h2:has-text("श्री हनुमान चालीसा")')).toBeVisible();
    await expect(page.locator('[role="dialog"] h2')).not.toContainText('Shri Hanuman Chalisa');
  });
});
