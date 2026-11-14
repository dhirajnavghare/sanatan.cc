import { test, expect } from '@playwright/test';

test.describe('Settings & Prime Meridian End-to-End Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.clear();
      } catch {}
    });
    await page.goto('/settings');
    await page.waitForLoadState('networkidle');
  });

  test('should render devotee profile, app preferences, and offline autonomy card', async ({ page }) => {
    // Devotee profile banner
    await expect(page.locator('[data-testid="settings-profile-banner"]')).toBeVisible();

    // Offline autonomy card
    const offlineCard = page.locator('[data-testid="settings-offline-card"]');
    await expect(offlineCard).toBeVisible();
    await expect(offlineCard.getByText(/100% OFFLINE/i)).toBeVisible();

    // Android App Coming Soon card and Navbar banner
    await expect(page.locator('[data-testid="navbar-android-banner"]')).toBeVisible();
    await expect(page.locator('[data-testid="settings-android-card"]')).toBeVisible();
  });

  test('should support language switching on settings page', async ({ page }) => {
    const hiBtn = page.locator('[data-testid="settings-lang-hi"]');
    await hiBtn.click();
    await expect(page.getByText('ऍप सेटिंग्स एवं प्राथमिकताएं')).toBeVisible();

    const enBtn = page.locator('[data-testid="settings-lang-en"]');
    await enBtn.click();
    await expect(page.getByText('App Settings & Preferences')).toBeVisible();
  });

  test('should support Prime Meridian & city location selection with compass icon', async ({ page }) => {
    const meridianSection = page.locator('[data-testid="settings-meridian-section"]');
    await expect(meridianSection).toBeVisible();
    await expect(meridianSection).toContainText('Prime Meridian');

    // Open meridian modal
    const meridianBtn = page.locator('[data-testid="settings-meridian-btn"]');
    await meridianBtn.click();

    // Verify modal is visible
    await expect(page.getByText(/Prime Meridian & City Selector|प्रधान देशान्तर एवं नगर चयन/i)).toBeVisible();

    // Verify Ujjain is listed
    await expect(page.getByText(/Ujjain/i).first()).toBeVisible();

    // Select Varanasi
    const varanasiBtn = page.getByRole('button', { name: /Varanasi/i });
    await varanasiBtn.click();

    // Verify section reflects chosen city
    await expect(meridianSection).toContainText('Varanasi');
  });

  test('should display exact feedback & contact links at bottom of settings page', async ({ page }) => {
    const feedbackCard = page.locator('[data-testid="settings-feedback-card"]');
    await expect(feedbackCard).toBeVisible();

    // Check link 1: Sanatan contact
    const sanatanLink = page.locator('[data-testid="feedback-link-sanatan"]');
    await expect(sanatanLink).toBeVisible();
    await expect(sanatanLink).toHaveAttribute('href', 'https://sanatan.cc/contact');

    // Check link 2: Developer contact
    const devLink = page.locator('[data-testid="feedback-link-developer"]');
    await expect(devLink).toBeVisible();
    await expect(devLink).toHaveAttribute('href', 'https://dhirajnavghare.com/contact');
  });

  test('should support sound test triggers for Temple Bell and Shankh Naad', async ({ page }) => {
    const bellBtn = page.locator('[data-testid="settings-test-bell-btn"]');
    await expect(bellBtn).toBeVisible();
    await bellBtn.click();

    const shankhBtn = page.locator('[data-testid="settings-test-shankh-btn"]');
    await expect(shankhBtn).toBeVisible();
    await shankhBtn.click();
  });

  test('should have header bell button that triggers bell chime', async ({ page }) => {
    const headerBell = page.locator('[data-testid="header-bell-btn"]');
    await expect(headerBell).toBeVisible();
    await headerBell.click();
  });
});
