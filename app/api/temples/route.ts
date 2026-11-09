import { NextResponse } from 'next/server';
import { getTemples, getTempleById } from '@/app/lib/temples/data';
import { TempleCircuit, TempleTradition } from '@/app/lib/temples/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id') || undefined;
    if (id) {
      const temple = getTempleById(id);
      if (!temple) {
        return NextResponse.json({ error: `Temple with id '${id}' not found` }, { status: 404 });
      }
      return NextResponse.json(
        { temple },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
            'X-Powered-By': 'sanatan.cc Vedic Tirthas Engine',
          },
        }
      );
    }

    const circuit = (searchParams.get('circuit') as TempleCircuit) || 'all';
    const tradition = (searchParams.get('tradition') as TempleTradition) || 'all';
    const searchQuery = searchParams.get('q') || undefined;
    const deityId = searchParams.get('deityId') || undefined;
    const state = searchParams.get('state') || undefined;

    const response = getTemples({
      circuit,
      tradition,
      searchQuery,
      deityId,
      state,
    });

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
        'X-Powered-By': 'sanatan.cc Vedic Tirthas Engine',
      },
    });
  } catch (error) {
    if ((error as { digest?: string })?.digest === 'NEXT_PRERENDER_INTERRUPTED') {
      throw error;
    }
    const message = error instanceof Error ? error.message : 'Failed to retrieve temple records';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
