import { NextResponse } from 'next/server';
import { getDevatas, getDevataById } from '@/app/lib/devatas/data';
import { DeityTradition } from '@/app/lib/devatas/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id') || undefined;
    if (id) {
      const deity = getDevataById(id);
      if (!deity) {
        return NextResponse.json({ error: `Deity with id '${id}' not found` }, { status: 404 });
      }
      return NextResponse.json({ deity }, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
          'X-Powered-By': 'sanatan.cc Vedic Knowledge Engine',
        },
      });
    }

    const tradition = (searchParams.get('tradition') as DeityTradition) || 'all';
    const searchQuery = searchParams.get('q') || undefined;

    const response = getDevatas({
      tradition,
      searchQuery,
    });

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
        'X-Powered-By': 'sanatan.cc Vedic Knowledge Engine',
      },
    });
  } catch (error) {
    if ((error as { digest?: string })?.digest === 'NEXT_PRERENDER_INTERRUPTED') {
      throw error;
    }
    const message = error instanceof Error ? error.message : 'Failed to retrieve deity records';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
