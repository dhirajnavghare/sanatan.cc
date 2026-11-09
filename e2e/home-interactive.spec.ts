import { test, expect } from '@playwright/test';

test.describe('Homepage Interactive End-to-End Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render live Vedic Pancha-Anga snapshot with 5 limbs', async ({ page }) => {
    // 5 Limbs verification
    await expect(page.getByText('1. Tithi (तिथि)')).toBeVisible();
    await expect(page.getByText('2. Nakshatra (नक्षत्र)')).toBeVisible();
    await expect(page.getByText('3. Yoga (योग)')).toBeVisible();
    await expect(page.getByText('4. Karana (करण)')).toBeVisible();
    await expect(page.getByText('5. Vara (वार)')).toBeVisible();

    // Sunrise, Sunset, and Abhijit Muhurta indicators
    await expect(page.getByText('Sunrise')).toBeVisible();
    await expect(page.getByText('Sunset')).toBeVisible();
    await expect(page.getByText('Abhijit Muhurta')).toBeVisible();
    await expect(page.getByText('Rahu Kaal')).toBeVisible();
  });

  test('should allow switching cities in hero and update ephemeris', async ({ page }) => {
    // Select dropdown in hero
    const citySelect = page.getByRole('combobox', { name: 'Select location' });
    await expect(citySelect).toBeVisible();

    // Switch to Varanasi
    await citySelect.selectOption('Varanasi');
    await expect(citySelect).toHaveValue('Varanasi');

    // Click quick sacred center pill: Ayodhya
    const ayodhyaButton = page.getByRole('button', { name: 'Ayodhya' });
    await ayodhyaButton.click();
    await expect(citySelect).toHaveValue('Ayodhya');
  });

  test('should open Cosmic Command Bar with search results and close on ESC', async ({ page }) => {
    // Trigger command palette
    const searchTrigger = page.getByRole('button', { name: /Search all festivals, temples, deities/i });
    await searchTrigger.click();

    // Dialog should be visible
    const searchModal = page.getByRole('dialog', { name: 'Universal Vedic Search' });
    await expect(searchModal).toBeVisible();

    // Type query
    const searchInput = page.getByPlaceholder(/Type to search festivals, temples, deities/i);
    await searchInput.fill('Kedarnath');

    // Matching item should appear
    await expect(page.getByText('Kedarnath', { exact: false })).toBeVisible();

    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(searchModal).not.toBeVisible();
  });

  test('should support interactive Live Choghadiya Day and Night switcher', async ({ page }) => {
    await expect(page.getByText('Live Choghadiya Dial')).toBeVisible();

    // Toggle to Nighttime
    const nightButton = page.getByRole('button', { name: /Nighttime \(8\)/i });
    await nightButton.click();
    await expect(nightButton).toHaveClass(/bg-indigo-600/);

    // Toggle back to Daytime
    const dayButton = page.getByRole('button', { name: /Daytime \(8\)/i });
    await dayButton.click();
    await expect(dayButton).toHaveClass(/bg-amber-500/);
  });

  test('should support Instant Muhurta Discovery category switching', async ({ page }) => {
    await expect(page.getByText('Instant Muhurta Discovery')).toBeVisible();

    // Default category Griha Pravesh
    await expect(page.getByText('Griha Pravesh', { exact: false })).toBeVisible();

    // Switch to Vivaha (Wedding)
    const vivahaButton = page.getByRole('button', { name: /Vivaha/i });
    await vivahaButton.click();
    await expect(page.getByText('Next Auspicious Dates for Vivaha', { exact: false })).toBeVisible();

    // Switch to Vehicle Purchase
    const vehicleButton = page.getByRole('button', { name: /Vehicle/i });
    await vehicleButton.click();
    await expect(page.getByText('Next Auspicious Dates for Vehicle Purchase', { exact: false })).toBeVisible();
  });

  test('should filter upcoming festivals and expand puja lore', async ({ page }) => {
    await expect(page.getByText('Sacred Hindu Festivals')).toBeVisible();

    // Switch to Ekadashi & Vrats
    const ekadashiFilter = page.getByRole('button', { name: 'Ekadashi & Vrats' });
    await ekadashiFilter.click();
    await expect(ekadashiFilter).toHaveClass(/bg-orange-500/);

    // Click Puja Details & Lore
    const expandButtons = page.getByRole('button', { name: 'Puja Details & Lore' });
    if ((await expandButtons.count()) > 0) {
      await expandButtons.first().click();
      await expect(page.getByText('Puja Muhurta:').first()).toBeVisible();
    }
  });

  test('should filter sacred temples by circuit categories', async ({ page }) => {
    await expect(page.getByText('Sacred Temples & Tirthas')).toBeVisible();

    // Switch to Char Dham
    const charDhamTab = page.getByRole('button', { name: 'Char Dham' });
    await charDhamTab.click();
    await expect(charDhamTab).toHaveClass(/bg-amber-600/);

    // Switch to Pancha Bhootas
    const panchaBhootaTab = page.getByRole('button', { name: 'Pancha Bhootas' });
    await panchaBhootaTab.click();
    await expect(panchaBhootaTab).toHaveClass(/bg-amber-600/);
  });

  test('should increment 108 Japa mala bead counter and allow reset', async ({ page }) => {
    await expect(page.getByText('108 Bead Counter')).toBeVisible();
    await expect(page.getByText('0', { exact: true })).toBeVisible();

    // Click count +1 bead
    const beadButton = page.getByRole('button', { name: /Count \+1 Bead/i });
    await beadButton.click();
    await beadButton.click();
    await beadButton.click();

    await expect(page.getByText('3', { exact: true })).toBeVisible();

    // Reset
    const resetButton = page.getByRole('button', { name: 'Reset Counter' });
    await resetButton.click();
    await expect(page.getByText('0', { exact: true })).toBeVisible();
  });

  test('should render 5 core applications hub with direct launch links', async ({ page }) => {
    await expect(page.getByText('The sanatan.cc Spiritual & Ephemeris Suite')).toBeVisible();

    await expect(page.getByRole('link', { name: /Launch Daily Panchang/i })).toHaveAttribute(
      'href',
      '/panchang'
    );
    await expect(page.getByRole('link', { name: /Launch Shubh Muhurta Finder/i })).toHaveAttribute(
      'href',
      '/muhurta'
    );
    await expect(page.getByRole('link', { name: /Launch Festivals Timeline/i })).toHaveAttribute(
      'href',
      '/festivals'
    );
    await expect(page.getByRole('link', { name: /Launch Devi Devatas/i })).toHaveAttribute(
      'href',
      '/devatas'
    );
    await expect(page.getByRole('link', { name: /Launch Temples & Tirthas/i })).toHaveAttribute(
      'href',
      '/temples'
    );
  });

  test('should support interactive Ephemeris Tech comparison tabs', async ({ page }) => {
    await expect(page.getByText('Why Mathematical Ephemeris Matters')).toBeVisible();

    const traditionalTab = page.getByRole('button', { name: 'Traditional Tabular Print' });
    await traditionalTab.click();
    await expect(page.getByText('Historical Approximation')).toBeVisible();

    const sanatanTab = page.getByRole('button', { name: 'sanatan.cc Math (NASA JPL)' });
    await sanatanTab.click();
    await expect(page.getByText('IAU Standards Compliant')).toBeVisible();
  });
});
