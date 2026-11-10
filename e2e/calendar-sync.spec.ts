import { test, expect } from '@playwright/test';

test.describe('Calendar Sync & RFC 5545 iCalendar Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.clear();
      } catch {}
    });
  });

  test('should render Calendar Sync button on Festivals page and open sync modal', async ({ page }) => {
    await page.goto('/festivals');
    await page.waitForLoadState('domcontentloaded');

    // Verify Calendar Sync button is present in hero
    const syncButton = page.locator('button:has-text("Calendar Sync"), button:has-text("कैलेण्डर सिंक")').first();
    await expect(syncButton).toBeVisible();
    await syncButton.click();

    // Verify Modal opens with Google Calendar option
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await expect(page.getByText(/Vedic Festivals & Ekadashi Sync|वैदिक पर्व एवं एकादशी कैलेण्डर सिंक/i)).toBeVisible();
    await expect(page.getByText(/Add to Google Calendar|गूगल कैलेण्डर में जोड़ें/i)).toBeVisible();
    await expect(page.getByText(/Download .ics Calendar File|डाउनलोड/i).first()).toBeVisible();

    // Close modal
    const closeBtn = page.getByRole('button', { name: /Close modal|बन्द करें/i });
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('should provide 1-click Google Calendar button on individual festival cards', async ({ page }) => {
    await page.goto('/festivals');
    await page.waitForSelector('h3', { timeout: 10000 });

    // Look for Google Calendar link on cards
    const gcalLink = page.locator('a[href*="calendar.google.com/calendar/render"]').first();
    await expect(gcalLink).toBeVisible();

    const href = await gcalLink.getAttribute('href');
    expect(href).toContain('action=TEMPLATE');
    expect(href).toContain('dates=');
    expect(href).toContain('sprop=website%3Asanatan.cc');
  });

  test('should return valid RFC 5545 iCalendar data from /api/calendar endpoint', async ({ request }) => {
    const response = await request.get('/api/calendar?type=major&year=2026');
    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/calendar');

    const text = await response.text();
    expect(text).toContain('BEGIN:VCALENDAR');
    expect(text).toContain('VERSION:2.0');
    expect(text).toContain('PRODID:-//sanatan.cc//Vedic Ephemeris & Festivals//EN');
    expect(text).toContain('BEGIN:VEVENT');
    expect(text).toContain('SUMMARY:');
    expect(text).toContain('DTSTART;VALUE=DATE:');
    expect(text).toContain('END:VEVENT');
    expect(text).toContain('END:VCALENDAR');
  });

  test('should return valid Ekadashi calendar from /api/calendar with ekadashi filter', async ({ request }) => {
    const response = await request.get('/api/calendar?type=ekadashi&year=2026');
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('BEGIN:VCALENDAR');
    expect(text).toContain('Ekadashi');
    expect(text).toContain('END:VCALENDAR');
  });
});
