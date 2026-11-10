import { FestivalTimelineItem } from '../festivals/types';
import { GeoLocation } from '../panchang/types';

export interface CalendarExportOptions {
  title?: string;
  description?: string;
  language?: 'hi' | 'en';
  includeAlarms?: boolean;
}

/**
 * Clean text for RFC 5545 iCalendar compliance (escape semicolons, commas, backslashes, newlines)
 */
function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n/g, '\\n')
    .replace(/\n/g, '\\n');
}

/**
 * Format ISO date string 'YYYY-MM-DD' into RFC 5545 date 'YYYYMMDD'
 */
function toIcsDate(isoDate: string): string {
  return isoDate.replace(/-/g, '');
}

/**
 * Calculate the next day's date string 'YYYYMMDD' for inclusive all-day iCalendar events
 */
function toIcsNextDay(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + 1));
  const year = dt.getUTCFullYear();
  const month = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dt.getUTCDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

/**
 * Generate a complete RFC 5545 .ics calendar string for a list of festivals
 */
export function generateIcsCalendar(
  items: FestivalTimelineItem[],
  location: GeoLocation,
  options: CalendarExportOptions = {}
): string {
  const isHi = options.language === 'hi';
  const calName = isHi
    ? 'सनातन व्रत एवं उत्सव पञ्चाङ्ग - sanatan.cc'
    : 'Sanatan Festivals & Ekadashis - sanatan.cc';
  const calDesc = isHi
    ? 'सनातन धर्म के प्रमुख व्रत, त्योहार एवं एकादशी पारणा समय - sanatan.cc द्वारा उच्च परिशुद्धता खगोलीय गणना'
    : 'Major Hindu festivals, Ekadashis, and Vrats with exact local timings computed by sanatan.cc';

  const nowTimestamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//sanatan.cc//Vedic Ephemeris & Festivals//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeIcsText(calName)}`,
    `X-WR-CALDESC:${escapeIcsText(calDesc)}`,
    `X-WR-TIMEZONE:${escapeIcsText(location.timezone || 'Asia/Kolkata')}`,
  ];

  for (const item of items) {
    const dtStart = toIcsDate(item.date);
    const dtEnd = toIcsNextDay(item.date);
    const eventId = `sanatan-${item.id}-${dtStart}@sanatan.cc`;

    const summary = isHi ? item.nameDevanagari : item.name;

    const descParts: string[] = [];
    if (isHi) {
      descParts.push(`तिथी: ${item.tithiNameDevanagari} (${item.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'})`);
      descParts.push(`मास: ${item.masaNameDevanagari} • ऋतु: ${item.rituDevanagari}`);
      if (item.pujaMuhurta) descParts.push(`पूजा मुहूर्त: ${item.pujaMuhurta}`);
      if (item.significance) descParts.push(`महत्त्व: ${item.significance}`);
      descParts.push(`दैनिक पञ्चाङ्ग: https://sanatan.cc/panchang?date=${item.date}`);
    } else {
      descParts.push(`Tithi: ${item.tithiName} (${item.paksha} Paksha)`);
      descParts.push(`Masa: ${item.masaName} • Ritu: ${item.ritu}`);
      if (item.pujaMuhurta) descParts.push(`Puja Muhurta: ${item.pujaMuhurta}`);
      if (item.significance) descParts.push(`Significance: ${item.significance}`);
      descParts.push(`Daily Panchang: https://sanatan.cc/panchang?date=${item.date}`);
    }

    const description = descParts.join('\\n');

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${eventId}`);
    lines.push(`DTSTAMP:${nowTimestamp}`);
    lines.push(`DTSTART;VALUE=DATE:${dtStart}`);
    lines.push(`DTEND;VALUE=DATE:${dtEnd}`);
    lines.push(`SUMMARY:${escapeIcsText(summary)}`);
    lines.push(`DESCRIPTION:${description}`);
    lines.push(`LOCATION:${escapeIcsText(location.name)}`);
    lines.push(`URL:https://sanatan.cc/panchang?date=${item.date}`);
    lines.push('STATUS:CONFIRMED');
    lines.push('TRANSP:TRANSPARENT');

    // 1-day advance reminder alarm so the user prepares for fasting/rituals
    if (options.includeAlarms !== false) {
      lines.push('BEGIN:VALARM');
      lines.push('ACTION:DISPLAY');
      lines.push(`DESCRIPTION:${escapeIcsText(isHi ? `कल ${summary} है` : `Tomorrow is ${summary}`)}`);
      lines.push('TRIGGER:-P1D');
      lines.push('END:VALARM');
    }

    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Generate a 1-click Google Calendar web link for an individual festival event
 */
export function generateGoogleCalendarUrl(
  item: FestivalTimelineItem,
  location: GeoLocation,
  language: 'hi' | 'en' = 'en'
): string {
  const isHi = language === 'hi';
  const title = isHi ? item.nameDevanagari : item.name;
  const dtStart = toIcsDate(item.date);
  const dtEnd = toIcsNextDay(item.date);

  const descParts: string[] = [];
  if (isHi) {
    descParts.push(`तिथी: ${item.tithiNameDevanagari} (${item.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'})`);
    descParts.push(`मास: ${item.masaNameDevanagari}`);
    if (item.pujaMuhurta) descParts.push(`पूजा मुहूर्त: ${item.pujaMuhurta}`);
    if (item.significance) descParts.push(`महत्त्व: ${item.significance}`);
    descParts.push(`विस्तृत पञ्चाङ्ग: https://sanatan.cc/panchang?date=${item.date}`);
  } else {
    descParts.push(`Tithi: ${item.tithiName} (${item.paksha} Paksha)`);
    descParts.push(`Masa: ${item.masaName}`);
    if (item.pujaMuhurta) descParts.push(`Puja Muhurta: ${item.pujaMuhurta}`);
    if (item.significance) descParts.push(`Significance: ${item.significance}`);
    descParts.push(`Detailed Panchang: https://sanatan.cc/panchang?date=${item.date}`);
  }

  const details = descParts.join('\n\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${dtStart}/${dtEnd}`,
    details,
    location: location.name,
    sprop: 'website:sanatan.cc',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
