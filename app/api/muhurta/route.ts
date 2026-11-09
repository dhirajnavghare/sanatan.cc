import { NextResponse } from 'next/server';
import { findMuhurtas } from '@/app/lib/muhurta-finder';
import { MuhurtaCategoryId, MuhurtaDayEvaluation } from '@/app/lib/muhurta-finder/types';
import { PRESET_CITIES, GeoLocation } from '@/app/lib/panchang';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';

const CACHE_MAX_SIZE = 500;
const muhurtaCache = new Map<string, MuhurtaDayEvaluation[]>();

function getCacheKey(
  category: string,
  days: number,
  startDate: string,
  lat: number,
  lon: number,
  tz: string,
  ayan: string,
  minSuit: string
): string {
  return `${category}_${days}_${startDate}_${lat.toFixed(4)}_${lon.toFixed(4)}_${tz}_${ayan}_${minSuit}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = (searchParams.get('category') || 'griha_pravesh') as MuhurtaCategoryId;
    const daysRaw = parseInt(searchParams.get('days') || '30', 10);
    const daysCount = ([30, 60, 90, 180].includes(daysRaw) ? daysRaw : 30) as 30 | 60 | 90 | 180;
    const startDate = searchParams.get('date') || new Date().toISOString().slice(0, 10);
    const lat = parseFloat(searchParams.get('lat') ?? String(PRESET_CITIES[0].latitude));
    const lon = parseFloat(searchParams.get('lon') ?? String(PRESET_CITIES[0].longitude));
    const tz = searchParams.get('tz') || PRESET_CITIES[0].timezone || 'Asia/Kolkata';
    const ayan = (searchParams.get('ayanamsa') as AyanamsaSystem) || 'Lahiri';
    const minParam = searchParams.get('min');
    const minSuitability: 'All' | 'Good' | 'Optimal' =
      minParam === 'Optimal' || minParam === 'Good' ? minParam : 'All';

    const safeLat = isNaN(lat) || lat < -90 || lat > 90 ? PRESET_CITIES[0].latitude : lat;
    const safeLon = isNaN(lon) || lon < -180 || lon > 180 ? PRESET_CITIES[0].longitude : lon;

    const cacheKey = getCacheKey(category, daysCount, startDate, safeLat, safeLon, tz, ayan, minSuitability);
    const cached = muhurtaCache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          'X-Cache': 'HIT',
        },
      });
    }

    const location: GeoLocation = {
      name: `Observer (${safeLat.toFixed(2)}°, ${safeLon.toFixed(2)}°)`,
      latitude: safeLat,
      longitude: safeLon,
      altitude: 0,
      timezone: tz,
    };

    const results = findMuhurtas(
      {
        category,
        daysCount,
        minimumSuitability: minSuitability,
      },
      location,
      startDate,
      ayan
    );

    if (muhurtaCache.size >= CACHE_MAX_SIZE) {
      const oldestKey = muhurtaCache.keys().next().value;
      if (oldestKey) muhurtaCache.delete(oldestKey);
    }
    muhurtaCache.set(cacheKey, results);

    return NextResponse.json(results, {
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
