import { NextResponse } from 'next/server';
import { calculatePanchang, PRESET_CITIES, GeoLocation, PanchangData } from '@/app/lib/panchang';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';

// In-memory LRU cache for high-concurrency performance (sub-millisecond hits)
const CACHE_MAX_SIZE = 1000;
const panchangCache = new Map<string, PanchangData>();

function getCacheKey(
  date: string,
  lat: number,
  lon: number,
  alt: number,
  tz: string,
  ayan: string,
  dip: boolean
): string {
  return `${date}_${lat.toFixed(4)}_${lon.toFixed(4)}_${alt.toFixed(0)}_${tz}_${ayan}_${dip}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const dateStr = searchParams.get('date') || new Date().toISOString().slice(0, 10);
    const lat = parseFloat(searchParams.get('lat') ?? String(PRESET_CITIES[0].latitude));
    const lon = parseFloat(searchParams.get('lon') ?? String(PRESET_CITIES[0].longitude));
    const alt = parseFloat(searchParams.get('alt') ?? String(PRESET_CITIES[0].altitude ?? 0));
    const tz = searchParams.get('tz') || PRESET_CITIES[0].timezone || 'Asia/Kolkata';
    const ayan = (searchParams.get('ayanamsa') as AyanamsaSystem) || 'Lahiri';
    const dip = searchParams.get('dip') === 'true';
    const name = searchParams.get('name') || `Coordinates (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`;

    // Coordinates sanity check
    const safeLat = isNaN(lat) || lat < -90 || lat > 90 ? PRESET_CITIES[0].latitude : lat;
    const safeLon = isNaN(lon) || lon < -180 || lon > 180 ? PRESET_CITIES[0].longitude : lon;
    const safeAlt = isNaN(alt) || alt < 0 ? 0 : alt;

    const cacheKey = getCacheKey(dateStr, safeLat, safeLon, safeAlt, tz, ayan, dip);
    const cached = panchangCache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          'X-Cache': 'HIT',
        },
      });
    }

    const location: GeoLocation = {
      name,
      latitude: safeLat,
      longitude: safeLon,
      altitude: safeAlt,
      timezone: tz,
      useElevationDip: dip,
    };

    const data = calculatePanchang(dateStr, location, ayan);

    // Maintain cache size
    if (panchangCache.size >= CACHE_MAX_SIZE) {
      const oldestKey = panchangCache.keys().next().value;
      if (oldestKey) panchangCache.delete(oldestKey);
    }
    panchangCache.set(cacheKey, data);

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Calculation error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
