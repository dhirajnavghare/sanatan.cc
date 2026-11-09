import { test, expect } from '@playwright/test';

test.describe('Homepage Interactive End-to-End Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.clear();
      } catch {}
    });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should render live Vedic Pancha-Anga snapshot with 5 limbs', async ({ page }) => {
    await expect(page.getByText(/Tithi/i).first()).toBeVisible();
    await expect(page.getByText(/Nakshatra/i).first()).toBeVisible();
    await expect(page.getByText(/Yoga/i).first()).toBeVisible();
    await expect(page.getByText(/Karana/i).first()).toBeVisible();
    await expect(page.getByText(/Vara/i).first()).toBeVisible();

    await expect(page.getByText(/Sunrise/i).first()).toBeVisible();
    await expect(page.getByText(/Sunset/i).first()).toBeVisible();
    await expect(page.getByText(/Abhijit Muhurta/i).first()).toBeVisible();
    await expect(page.getByText(/Rahu Kaal/i).first()).toBeVisible();
  });

  test('should support P0 Multi-Lingual language switching (हिन्दी / EN)', async ({ page }) => {
    // Switch to Hindi via Navbar toggle
    const hiButton = page.getByRole('button', { name: 'हिन्दी भाषा चुनें' });
    await hiButton.click();
    await expect(page.getByRole('button', { name: /व्हाट्सएप पर शेयर करें/i })).toBeVisible();

    // Verify Hindi mode displays pure Hindi without English in parentheses or dual labels
    const hiNavPanchang = page.locator('header a[href="/panchang"]').first();
    await expect(hiNavPanchang).toContainText('पञ्चाङ्ग');
    await expect(hiNavPanchang).not.toContainText('Panchang');

    // Switch back to English
    const enButton = page.getByRole('button', { name: 'Choose English Language' });
    await enButton.click();
    await expect(page.getByRole('button', { name: /Share on WhatsApp/i })).toBeVisible();

    // Verify English mode displays pure English without Devanagari in parentheses
    const enNavPanchang = page.locator('header a[href="/panchang"]').first();
    await expect(enNavPanchang).toContainText('Panchang');
    await expect(enNavPanchang).not.toContainText('पञ्चाङ्ग');
  });

  test('should support P0 WhatsApp Daily Panchang Share card modal', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const shareButton = page.getByRole('button', { name: /Share on WhatsApp|व्हाट्सएप पर शेयर करें/i });
    const modal = page.getByRole('dialog', { name: /WhatsApp Daily Panchang Share|दैनिक पञ्चाङ्ग शेयर करें/i });
    await expect(async () => {
      await shareButton.click();
      await expect(modal).toBeVisible({ timeout: 1500 });
    }).toPass({ timeout: 8000 });

    // Verify WhatsApp Send button is visible
    await expect(modal.getByRole('button', { name: /WhatsApp/i })).toBeVisible();

    // Test copy button
    const copyButton = modal.getByRole('button', { name: /Copy Text|कॉपी करें/i });
    await copyButton.click();

    // Close modal
    const closeBtn = modal.getByRole('button', { name: '✕', exact: true });
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('should support P1 Regional Calendar Switcher (Purnimanta vs Amanta)', async ({ page }) => {
    // Switch to Amanta
    const amantaButton = page.getByRole('button', { name: /Amanta|अमान्त/i }).first();
    await amantaButton.click();
    await expect(amantaButton).toHaveClass(/bg-amber-500/);
    await expect(page.getByText(/Amanta|अमान्त/i).first()).toBeVisible();

    // Switch to Purnimanta
    const purnimantaButton = page.getByRole('button', { name: /Purnimanta|पूर्णिमान्त/i }).first();
    await purnimantaButton.click();
    await expect(purnimantaButton).toHaveClass(/bg-amber-500/);
    await expect(page.getByText(/Purnimanta|पूर्णिमान्त/i).first()).toBeVisible();
  });

  test('should support P1 Vrat Katha, Puja Vidhi & Parana timing modal', async ({ page }) => {
    const kathaButton = page.getByRole('button', { name: /Vrat Katha & Vidhi|व्रत कथा व विधि/i });
    const modal = page.getByRole('dialog', { name: /Vrat Katha & Puja Vidhi|व्रत कथा व पूजा विधि/i });
    await expect(async () => {
      await kathaButton.click();
      await expect(modal).toBeVisible({ timeout: 1500 });
    }).toPass({ timeout: 8000 });

    await expect(modal.getByText(/Step-by-Step Home Puja|सरल एवं प्रामाणिक पूजा विधि/i)).toBeVisible();

    // Switch to Fasting Rules tab
    const rulesTab = modal.locator('[data-testid="vrat-tab-rules"]');
    await rulesTab.click();
    await expect(modal.getByText(/Allowed Fasting Foods|स्वीकार्य फलाहार/i)).toBeVisible();

    // Switch to Parana timing tab
    const paranaTab = modal.locator('[data-testid="vrat-tab-parana"]');
    await paranaTab.click();
    await expect(modal.getByText(/Hari Vasara|हरिवासर/i).first()).toBeVisible();

    // Switch to Katha tab
    const kathaTab = modal.locator('[data-testid="vrat-tab-katha"]');
    await kathaTab.click();
    await expect(modal.getByText(/दैत्य|गुफा/i).first()).toBeVisible();

    // Close modal
    const closeBtn = modal.getByRole('button', { name: '✕', exact: true });
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('should open Cosmic Command Bar with search results and close on ESC', async ({ page }) => {
    const searchTrigger = page.locator('button[aria-label*="Search all festivals"], button[aria-label*="पर्व, मन्दिर"]').first();
    await expect(searchTrigger).toBeVisible();
    await expect(async () => {
      await searchTrigger.click();
      const searchModal = page.locator('div[role="dialog"][aria-label*="Search"], div[role="dialog"][aria-label*="खोज"]').first();
      await expect(searchModal).toBeVisible({ timeout: 1500 });
    }).toPass({ timeout: 6000 });

    const searchModal = page.locator('div[role="dialog"][aria-label*="Search"], div[role="dialog"][aria-label*="खोज"]').first();
    const searchInput = searchModal.getByPlaceholder(/Type to search|खोजें/i);
    await searchInput.fill('Kedarnath');

    await expect(searchModal.getByText(/Kedarnath/i).first()).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(searchModal).not.toBeVisible();
  });

  test('should support interactive Live Choghadiya Day and Night switcher', async ({ page }) => {
    await expect(page.getByText(/Choghadiya|चौघड़िया/i).first()).toBeVisible();

    const nightButton = page.getByRole('button', { name: /Nighttime|रात्रि/i });
    await expect(async () => {
      await nightButton.click();
      await expect(nightButton).toHaveClass(/bg-indigo-600/);
    }).toPass({ timeout: 8000 });

    const dayButton = page.getByRole('button', { name: /Daytime|दिन/i });
    await expect(async () => {
      await dayButton.click();
      await expect(dayButton).toHaveClass(/bg-amber-500/);
    }).toPass({ timeout: 8000 });
  });

  test('should support Instant Muhurta Discovery category switching', async ({ page }) => {
    await expect(page.getByText(/Muhurta Discovery|मुहूर्त अन्वेषक/i).first()).toBeVisible();

    const vivahaButton = page.getByRole('button', { name: /Vivaha|विवाह/i });
    await expect(async () => {
      await vivahaButton.click();
      await expect(page.getByText(/Vivaha|विवाह/i).first()).toBeVisible();
    }).toPass({ timeout: 8000 });

    const vehicleButton = page.getByRole('button', { name: /Vehicle|वाहन/i });
    await expect(async () => {
      await vehicleButton.click();
      await expect(page.getByText(/Vehicle|वाहन/i).first()).toBeVisible();
    }).toPass({ timeout: 8000 });
  });

  test('should filter sacred temples by circuit categories', async ({ page }) => {
    await expect(page.getByText('Sacred Temples & Tirthas')).toBeVisible();
    const heading = page.getByRole('heading', { name: /Sacred Temples & Tirthas|तीर्थ एवं मन्दिर/i });
    await expect(heading).toBeVisible();

    const charDhamTab = page.getByRole('button', { name: 'Char Dham' });
    await expect(async () => {
      await charDhamTab.click();
      await expect(charDhamTab).toHaveClass(/bg-amber-600/);
    }).toPass({ timeout: 8000 });

    const panchaBhootaTab = page.getByRole('button', { name: 'Pancha Bhootas' });
    await expect(async () => {
      await panchaBhootaTab.click();
      await expect(panchaBhootaTab).toHaveClass(/bg-amber-600/);
    }).toPass({ timeout: 8000 });
  });

  test('should increment 108 Japa mala bead counter and allow reset', async ({ page }) => {
    const heading = page.getByText(/108 Bead Counter|जप माला/i).first();
    await expect(heading).toBeVisible();

    const beadButton = page.getByRole('button', { name: /Count \+1 Bead/i });
    await beadButton.click();
    await beadButton.click();
    await beadButton.click();

    await expect(page.getByText('/ 108 Beads')).toBeVisible();

    const resetButton = page.getByRole('button', { name: 'Reset Counter' });
    await resetButton.click();
    await expect(page.getByText('0', { exact: true }).first()).toBeVisible();
  });

  test('should render 5 core applications hub with direct launch links', async ({ page }) => {
    const title = page.getByText(/The sanatan\.cc Spiritual & Ephemeris Suite|पंच महा-अनुप्रयोग/i).first();
    await expect(title).toBeVisible();

    await expect(page.getByRole('link', { name: /Launch Daily Panchang|Launch/i }).first()).toBeVisible();
  });

  test('should support interactive Ephemeris Tech comparison tabs', async ({ page }) => {
    const title = page.getByText(/Why Mathematical Ephemeris Matters|खगोलीय यथार्थता/i).first();
    await expect(title).toBeVisible();

    await expect(async () => {
      const btn = page.getByRole('button', { name: /Traditional Tabular Print|पारम्परिक मुद्रित सारणी/i });
      await btn.click();
      await expect(btn).toHaveClass(/bg-zinc-700/);
    }).toPass({ timeout: 10000 });
    await expect(page.getByText(/Historical Approximation|ऐतिहासिक स्थूल अनुमान/i).first()).toBeVisible();

    await expect(async () => {
      const btn = page.getByRole('button', { name: /sanatan\.cc Math|गणितीय परिशुद्धता/i });
      await btn.click();
      await expect(btn).toHaveClass(/bg-amber-500/);
    }).toPass({ timeout: 10000 });
    await expect(page.getByText(/IAU Standards Compliant|IAU खगोलीय मानक/i).first()).toBeVisible();
  });
});
