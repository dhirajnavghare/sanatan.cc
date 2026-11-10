import { NextRequest, NextResponse } from 'next/server';
import { filterPrayers, getPrayerBySlug, getPrayerOfTheDay } from '@/app/lib/prayers/query';
import { DeityCategory, PrayerCategory } from '@/app/lib/prayers/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const prayer = getPrayerBySlug(slug);
      if (!prayer) {
        return NextResponse.json({ error: 'Prayer not found' }, { status: 404 });
      }
      return NextResponse.json(prayer, {
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
        },
      });
    }

    const today = searchParams.get('today');
    if (today === 'true') {
      const prayerToday = getPrayerOfTheDay();
      return NextResponse.json(prayerToday, {
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=14400',
        },
      });
    }

    const deity = (searchParams.get('deity') as DeityCategory) || 'all';
    const category = (searchParams.get('category') as PrayerCategory) || 'all';
    const q = searchParams.get('q') || '';

    const results = filterPrayers({
      deity,
      category,
      searchQuery: q,
    });

    return NextResponse.json(results, {
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
