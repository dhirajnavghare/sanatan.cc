import { NextResponse } from 'next/server';
import { getFestivalTimeline } from '@/app/lib/festivals/timeline';
import { FestivalCategory } from '@/app/lib/festivals/types';
import { GeoLocation } from '@/app/lib/panchang/types';

// Default Location: Ujjain, India (Traditional Vedic Prime Meridian)
const DEFAULT_LOCATION: GeoLocation = {
  name: 'Ujjain, India',
  latitude: 23.1765,
  longitude: 75.7885,
  altitude: 511,
  timezone: 'Asia/Kolkata',
  useElevationDip: false,
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const yearParam = searchParams.get('year');
    const currentYear = new Date().getFullYear();
    const year = yearParam ? parseInt(yearParam, 10) : currentYear;

    if (isNaN(year) || year < 1900 || year > 2100) {
      return NextResponse.json(
        { error: 'Invalid year parameter. Must be an integer between 1900 and 2100.' },
        { status: 400 }
      );
    }

    const category = (searchParams.get('category') as FestivalCategory) || 'all';
    const monthParam = searchParams.get('month');
    const month = monthParam ? parseInt(monthParam, 10) : undefined;
    const searchQuery = searchParams.get('q') || undefined;
    const anchorDate = searchParams.get('anchor') || undefined;

    // Location coordinates
    const latParam = searchParams.get('lat');
    const lonParam = searchParams.get('lon');
    const tzParam = searchParams.get('tz');
    const altParam = searchParams.get('alt');

    const location: GeoLocation = {
      name: searchParams.get('city') || DEFAULT_LOCATION.name,
      latitude: latParam !== null && !isNaN(parseFloat(latParam)) ? parseFloat(latParam) : DEFAULT_LOCATION.latitude,
      longitude: lonParam !== null && !isNaN(parseFloat(lonParam)) ? parseFloat(lonParam) : DEFAULT_LOCATION.longitude,
      altitude: altParam !== null && !isNaN(parseFloat(altParam)) ? parseFloat(altParam) : DEFAULT_LOCATION.altitude,
      timezone: tzParam || DEFAULT_LOCATION.timezone,
      useElevationDip: searchParams.get('dip') === 'true',
    };

    const response = getFestivalTimeline(
      {
        year,
        category,
        month,
        searchQuery,
        anchorDate,
      },
      location
    );

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
        'X-Powered-By': 'sanatan.cc Vedic Ephemeris Engine',
      },
    });
  } catch (error) {
    if ((error as { digest?: string })?.digest === 'NEXT_PRERENDER_INTERRUPTED') {
      throw error;
    }
    const message = error instanceof Error ? error.message : 'Failed to compute festival timeline';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
