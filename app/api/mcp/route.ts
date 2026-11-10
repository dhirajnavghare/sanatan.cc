import { NextResponse } from 'next/server';
import { calculatePanchang, PRESET_CITIES } from '@/app/lib/panchang';
import { findMuhurtas } from '@/app/lib/muhurta-finder';
import { MuhurtaCategoryId } from '@/app/lib/muhurta-finder/types';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';
import { getAllPrayers, getPrayerBySlug } from '@/app/lib/prayers/query';
import { getFestivalTimeline } from '@/app/lib/festivals/timeline';
import { FestivalCategory } from '@/app/lib/festivals/types';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    server: 'sanatan.cc Vedic Ephemeris MCP Server',
    version: '0.1.0',
    protocolVersion: '2025-06-18',
    documentation: 'https://sanatan.cc/llms.txt',
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, method, params } = body || {};

    if (method === 'initialize') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2025-06-18',
          capabilities: {
            tools: { listChanged: false },
            resources: { subscribe: false, listChanged: false },
            prompts: { listChanged: false },
          },
          serverInfo: {
            name: 'cc.sanatan.vedic-ephemeris',
            title: 'sanatan.cc Vedic Ephemeris & Shubh Muhurta Server',
            version: '0.1.0',
          },
        },
      });
    }

    if (method === 'tools/list') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'calculate_panchang',
              description:
                'Compute real-time local astronomical Hindu Panchang (Tithi, Nakshatra, Yoga, Karana, Vara, Shubh/Ashubh Muhurtas, and Choghadiya) for any ISO date and latitude/longitude.',
              inputSchema: {
                type: 'object',
                properties: {
                  date: { type: 'string', description: 'ISO date YYYY-MM-DD' },
                  latitude: { type: 'number', description: 'Latitude in decimal degrees' },
                  longitude: { type: 'number', description: 'Longitude in decimal degrees' },
                  timezone: { type: 'string', default: 'Asia/Kolkata' },
                  ayanamsa: { type: 'string', enum: ['Lahiri', 'Raman', 'Krishnamurti', 'Sayana'], default: 'Lahiri' },
                },
                required: ['date', 'latitude', 'longitude'],
              },
            },
            {
              name: 'find_shubh_muhurta',
              description:
                'Discover auspicious dates and daytime windows across 30 to 180 days for Griha Pravesh, Vivaha, Vehicle Purchase, Business Start, Property Registration, and Siddhi Yogas.',
              inputSchema: {
                type: 'object',
                properties: {
                  category: {
                    type: 'string',
                    enum: [
                      'griha_pravesh',
                      'vivaha',
                      'vehicle_purchase',
                      'business_start',
                      'property_purchase',
                      'gold_purchase',
                      'namakarana',
                      'sarvartha_siddhi',
                    ],
                  },
                  daysCount: { type: 'number', default: 30 },
                  latitude: { type: 'number' },
                  longitude: { type: 'number' },
                  timezone: { type: 'string', default: 'Asia/Kolkata' },
                },
                required: ['category', 'latitude', 'longitude'],
              },
            },
            {
              name: 'get_sacred_prayers',
              description:
                'Retrieve authentic Hindu prayers, Chalisas, and Stotrams (Hanuman Chalisa, Shiv Tandav, Shri Suktam, etc.) with verse-by-verse Sanskrit text, transliteration, and meanings.',
              inputSchema: {
                type: 'object',
                properties: {
                  slug: { type: 'string', description: 'Prayer slug identifier, e.g. hanuman-chalisa or shiv-tandav-stotram' },
                },
              },
            },
            {
              name: 'sync_festival_calendar',
              description:
                'Generate Vedic festival calendar events and Ekadashi schedules with parana times for iCalendar (.ics) and Google Calendar sync.',
              inputSchema: {
                type: 'object',
                properties: {
                  year: { type: 'number', default: 2026 },
                  category: { type: 'string', enum: ['major', 'ekadashi', 'all'], default: 'major' },
                },
              },
            },
          ],
        },
      });
    }

    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (toolName === 'calculate_panchang') {
        const dateStr = String(args.date || new Date().toISOString().slice(0, 10));
        const lat = Number(args.latitude ?? PRESET_CITIES[0].latitude);
        const lon = Number(args.longitude ?? PRESET_CITIES[0].longitude);
        const tz = String(args.timezone || 'Asia/Kolkata');
        const ayan = (args.ayanamsa as AyanamsaSystem) || 'Lahiri';

        const loc = {
          name: `Coordinates (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
          latitude: lat,
          longitude: lon,
          altitude: 0,
          timezone: tz,
        };

        const result = calculatePanchang(dateStr, loc, ayan);
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    date: result.isoDate,
                    location: loc.name,
                    sunrise: result.sunTimes.sunrise,
                    sunset: result.sunTimes.sunset,
                    tithi: `${result.tithi.current.name} (${result.tithi.current.paksha})`,
                    nakshatra: result.nakshatra.current.name,
                    yoga: result.yoga.current.name,
                    karana: result.karana.current.name,
                    vara: result.vara.name,
                    rahuKaal: `${result.muhurtas.rahuKaal.startTime.toISOString()} to ${result.muhurtas.rahuKaal.endTime.toISOString()}`,
                    abhijitMuhurta: result.muhurtas.abhijitMuhurta
                      ? `${result.muhurtas.abhijitMuhurta.startTime.toISOString()} to ${result.muhurtas.abhijitMuhurta.endTime.toISOString()}`
                      : null,
                  },
                  null,
                  2
                ),
              },
            ],
            isError: false,
          },
        });
      }

      if (toolName === 'find_shubh_muhurta') {
        const category = args.category as MuhurtaCategoryId;
        const daysCount = (Number(args.daysCount) || 30) as 30 | 60 | 90 | 180;
        const lat = Number(args.latitude ?? PRESET_CITIES[0].latitude);
        const lon = Number(args.longitude ?? PRESET_CITIES[0].longitude);
        const tz = String(args.timezone || 'Asia/Kolkata');

        const loc = {
          name: `Coordinates (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
          latitude: lat,
          longitude: lon,
          altitude: 0,
          timezone: tz,
        };

        const muhurtas = findMuhurtas({ category, daysCount }, loc);
        const topDates = muhurtas
          .filter((m) => m.suitability === 'Optimal' || m.suitability === 'Good')
          .slice(0, 10)
          .map((m) => ({
            date: m.isoDate,
            weekday: m.panchangSummary.varaName,
            suitability: m.suitability,
            score: m.score,
            tithi: m.panchangSummary.tithiName,
            nakshatra: m.panchangSummary.nakshatraName,
            specialYogas: m.specialYogas,
          }));

        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(topDates, null, 2),
              },
            ],
            isError: false,
          },
        });
      }

      if (toolName === 'get_sacred_prayers') {
        const slug = args.slug ? String(args.slug) : undefined;
        if (slug) {
          const prayer = getPrayerBySlug(slug);
          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: JSON.stringify(prayer || { error: 'Not found' }, null, 2) }],
              isError: !prayer,
            },
          });
        }
        const prayers = getAllPrayers().map((p) => ({
          slug: p.slug,
          title: p.title,
          deity: p.deity,
          totalVerses: p.totalVerses,
          idealTime: p.idealTime,
        }));
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(prayers, null, 2) }],
            isError: false,
          },
        });
      }

      if (toolName === 'sync_festival_calendar') {
        const year = Number(args.year) || 2026;
        const cat = (args.category as FestivalCategory) || 'major';
        const loc = PRESET_CITIES[0];
        const timeline = getFestivalTimeline({ year, category: cat }, loc);
        const events = timeline.festivals.slice(0, 20).map((f) => ({
          date: f.date,
          name: f.name,
          category: f.category,
          significance: f.significance,
          panchangUrl: f.panchangUrl,
        }));
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify({ year, count: timeline.festivals.length, sampleEvents: events }, null, 2) }],
            isError: false,
          },
        });
      }
    }

    if (method === 'ping') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: {},
      });
    }

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: 'Method not found' },
      },
      { status: 404 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: { code: -32603, message },
      },
      { status: 500 }
    );
  }
}
