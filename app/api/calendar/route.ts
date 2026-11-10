import { NextRequest, NextResponse } from 'next/server';
import { getFestivalTimeline } from '@/app/lib/festivals/timeline';
import { generateIcsCalendar } from '@/app/lib/calendar/ics-generator';
import { PRESET_CITIES } from '@/app/lib/panchang';
import { GeoLocation } from '@/app/lib/panchang/types';
import { FestivalCategory } from '@/app/lib/festivals/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const yearStr = searchParams.get('year');
    const currentYear = new Date().getFullYear();
    const year = yearStr ? parseInt(yearStr, 10) : currentYear;

    if (isNaN(year) || year < 1900 || year > 2100) {
      return NextResponse.json({ error: 'Invalid year. Must be between 1900 and 2100.' }, { status: 400 });
    }

    const latStr = searchParams.get('lat');
    const lonStr = searchParams.get('lon');
    const tzStr = searchParams.get('tz');
    const nameStr = searchParams.get('name');

    const defaultCity = PRESET_CITIES[0];

    const location: GeoLocation = {
      latitude: latStr ? parseFloat(latStr) : defaultCity.latitude,
      longitude: lonStr ? parseFloat(lonStr) : defaultCity.longitude,
      altitude: defaultCity.altitude,
      timezone: tzStr || defaultCity.timezone,
      name: nameStr || defaultCity.name,
    };

    const typeParam = (searchParams.get('type') as FestivalCategory) || 'all';
    const lang = (searchParams.get('lang') === 'hi' ? 'hi' : 'en') as 'hi' | 'en';
    const download = searchParams.get('download') === 'true' || searchParams.get('download') === '1';

    // Fetch timeline
    const timeline = getFestivalTimeline(
      {
        year,
        category: typeParam,
      },
      location
    );

    const icsContent = generateIcsCalendar(timeline.festivals, location, {
      language: lang,
      includeAlarms: true,
    });

    const filename = `sanatan-${typeParam}-${year}.ics`;

    const headers: Record<string, string> = {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
    };

    if (download) {
      headers['Content-Disposition'] = `attachment; filename="${filename}"`;
    }

    return new NextResponse(icsContent, {
      status: 200,
      headers,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
