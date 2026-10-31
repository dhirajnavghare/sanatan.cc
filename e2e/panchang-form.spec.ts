import { test, expect } from '@playwright/test';

/**
 * Configurable Target Route URL for verification.
 * Adapt this variable if testing across different deployment stages, previews, or locales.
 */
const TARGET_ROUTE_URL = process.env.PLAYWRIGHT_TARGET_URL || '/panchang';

test.describe('Panchang Astronomical Form & Location Verification Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TARGET_ROUTE_URL);
    await page.waitForLoadState('domcontentloaded');

    // If testing the modal integration, trigger the configuration form
    const locationTrigger = page.locator('button', { hasText: '📍' }).first();
    if (await locationTrigger.isVisible()) {
      await locationTrigger.click();
      await page.waitForSelector('[role="dialog"], [data-testid="panchang-location-form"]');
    }
  });

  test('should render all required astronomical input fields with accessible roles', async ({ page }) => {
    // 1. Location Label field
    const nameInput = page.getByTestId('input-location-name');
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveAttribute('type', 'text');

    // 2. Latitude field
    const latInput = page.getByTestId('input-latitude');
    await expect(latInput).toBeVisible();
    await expect(latInput).toHaveAttribute('type', 'number');

    // 3. Longitude field
    const lonInput = page.getByTestId('input-longitude');
    await expect(lonInput).toBeVisible();
    await expect(lonInput).toHaveAttribute('type', 'number');

    // 4. Altitude field
    const altInput = page.getByTestId('input-altitude');
    await expect(altInput).toBeVisible();
    await expect(altInput).toHaveAttribute('type', 'number');

    // 5. Timezone field
    const tzInput = page.getByTestId('input-timezone');
    await expect(tzInput).toBeVisible();

    // 6. Elevation dip checkbox
    const dipCheckbox = page.getByTestId('checkbox-elevation-dip');
    await expect(dipCheckbox).toBeVisible();

    // 7. Action buttons
    const submitBtn = page.getByTestId('form-submit-button');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });

  test('should enforce strict validation bounds on Latitude and Longitude', async ({ page }) => {
    const latInput = page.getByTestId('input-latitude');
    const lonInput = page.getByTestId('input-longitude');
    const submitBtn = page.getByTestId('form-submit-button');

    // Enter out-of-range Latitude (> +90°)
    await latInput.fill('95.5');
    await submitBtn.click();

    const latError = page.getByTestId('error-latitude');
    await expect(latError).toBeVisible();
    await expect(latError).toHaveText(/Latitude must be between -90° and \+90°/);
    await expect(latInput).toHaveAttribute('aria-invalid', 'true');

    // Correct Latitude, enter out-of-range Longitude (> +180°)
    await latInput.fill('28.6139');
    await lonInput.fill('195.8');
    await submitBtn.click();

    const lonError = page.getByTestId('error-longitude');
    await expect(lonError).toBeVisible();
    await expect(lonError).toHaveText(/Longitude must be between -180° and \+180°/);
    await expect(lonInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('should validate IANA timezone identifiers', async ({ page }) => {
    const tzInput = page.getByTestId('input-timezone');
    const submitBtn = page.getByTestId('form-submit-button');

    // Enter invalid timezone
    await tzInput.fill('Invalid/Unknown_Timezone_123');
    await submitBtn.click();

    const tzError = page.getByTestId('error-timezone');
    await expect(tzError).toBeVisible();
    await expect(tzError).toHaveText(/Invalid IANA timezone/i);
    await expect(tzInput).toHaveAttribute('aria-invalid', 'true');

    // Correct to valid IANA timezone
    await tzInput.fill('Asia/Kolkata');
    await submitBtn.click();
    await expect(page.getByTestId('error-timezone')).not.toBeVisible();
  });

  test('should populate coordinates when choosing a predefined preset city', async ({ page }) => {
    const presetSelect = page.getByTestId('preset-city-select');
    const latInput = page.getByTestId('input-latitude');
    const lonInput = page.getByTestId('input-longitude');
    const nameInput = page.getByTestId('input-location-name');

    // Select second preset (e.g. Varanasi / index 1)
    await presetSelect.selectOption({ index: 1 });

    const updatedLat = await latInput.inputValue();
    const updatedLon = await lonInput.inputValue();
    const updatedName = await nameInput.inputValue();

    expect(Number(updatedLat)).toBeCloseTo(25.3176, 1);
    expect(Number(updatedLon)).toBeCloseTo(82.9739, 1);
    expect(updatedName).toContain('Varanasi');
  });

  test('should toggle Ayanamsa ephemeris models cleanly', async ({ page }) => {
    const kpOption = page.getByTestId('ayanamsa-option-KP');
    const lahiriOption = page.getByTestId('ayanamsa-option-Lahiri');

    await kpOption.click();
    await expect(kpOption).toHaveClass(/border-amber-500/);

    await lahiriOption.click();
    await expect(lahiriOption).toHaveClass(/border-amber-500/);
  });

  test('should successfully submit valid custom coordinates and update calculation', async ({ page }) => {
    const nameInput = page.getByTestId('input-location-name');
    const latInput = page.getByTestId('input-latitude');
    const lonInput = page.getByTestId('input-longitude');
    const altInput = page.getByTestId('input-altitude');
    const tzInput = page.getByTestId('input-timezone');
    const submitBtn = page.getByTestId('form-submit-button');

    // Fill custom coordinates for Haridwar
    await nameInput.fill('Haridwar Sacred Ghats');
    await latInput.fill('29.9457');
    await lonInput.fill('78.1642');
    await altInput.fill('314');
    await tzInput.fill('Asia/Kolkata');

    await submitBtn.click();

    // Verify dialog closes or success banner is shown
    const dialog = page.locator('[role="dialog"]');
    if (await dialog.isVisible()) {
      await expect(dialog).not.toBeVisible({ timeout: 3000 });
    }

    // Verify hero card displays updated location name and coordinates
    const heroSection = page.locator('header, div').filter({ hasText: 'Haridwar Sacred Ghats' }).first();
    await expect(heroSection).toBeVisible();
  });
});
