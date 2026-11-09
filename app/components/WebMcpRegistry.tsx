'use client';

import { useEffect } from 'react';
import { PRESET_CITIES } from '@/app/lib/panchang/constants';
import { MuhurtaCategoryId } from '@/app/lib/muhurta-finder/types';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';

export default function WebMcpRegistry() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if navigator.modelContext or WebMCP is available
    const nav = navigator as unknown as {
      modelContext?: {
        registerTool?: (tool: {
          name: string;
          description: string;
          inputSchema: Record<string, unknown>;
          execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
        }) => void;
      };
    };

    if (nav.modelContext && typeof nav.modelContext.registerTool === 'function') {
      try {
        // 1. Tool: calculate_panchang
        nav.modelContext.registerTool({
          name: 'calculate_panchang',
          description:
            'Compute real-time Vedic Panchang (Tithi, Nakshatra, Yoga, Karana, Vara, Shubh/Ashubh Muhurtas, and Choghadiya) for any ISO civil date and latitude/longitude coordinates.',
          inputSchema: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
                description: 'Civil date in YYYY-MM-DD format (e.g. 2026-10-31)',
              },
              latitude: {
                type: 'number',
                description: 'Latitude in decimal degrees (-90 to 90, e.g. 28.6139 for Delhi, 23.18 for Ujjain)',
              },
              longitude: {
                type: 'number',
                description: 'Longitude in decimal degrees (-180 to 180, e.g. 77.2090 for Delhi, 75.78 for Ujjain)',
              },
              timezone: {
                type: 'string',
                description: 'IANA timezone string (default: Asia/Kolkata)',
                default: 'Asia/Kolkata',
              },
              ayanamsa: {
                type: 'string',
                enum: ['Lahiri', 'Raman', 'Krishnamurti', 'Sayana'],
                default: 'Lahiri',
              },
            },
            required: ['date', 'latitude', 'longitude'],
          },
          execute: async (args: Record<string, unknown>) => {
            const dateStr = String(args.date || new Date().toISOString().slice(0, 10));
            const lat = Number(args.latitude ?? PRESET_CITIES[0].latitude);
            const lon = Number(args.longitude ?? PRESET_CITIES[0].longitude);
            const tz = String(args.timezone || 'Asia/Kolkata');
            const ayan = (args.ayanamsa as AyanamsaSystem) || 'Lahiri';

            const safeLat = isNaN(lat) ? PRESET_CITIES[0].latitude : lat;
            const safeLon = isNaN(lon) ? PRESET_CITIES[0].longitude : lon;

            const query = new URLSearchParams({
              date: dateStr,
              lat: String(safeLat),
              lon: String(safeLon),
              tz,
              ayanamsa: ayan,
            });

            const res = await fetch(`/api/panchang?${query.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch panchang data');
            const result = await res.json();

            return {
              date: result.isoDate,
              location: result.location?.name || `Observer (${safeLat.toFixed(2)}°, ${safeLon.toFixed(2)}°)`,
              sunrise: result.sunTimes.sunrise,
              sunset: result.sunTimes.sunset,
              tithi: {
                name: result.tithi.current.name,
                paksha: result.tithi.current.paksha,
                endTime: result.tithi.endTime,
              },
              nakshatra: {
                name: result.nakshatra.current.name,
                endTime: result.nakshatra.endTime,
              },
              yoga: {
                name: result.yoga.current.name,
                endTime: result.yoga.endTime,
              },
              karana: {
                name: result.karana.current.name,
                endTime: result.karana.endTime,
              },
              vara: result.vara.name,
              rahuKaal: {
                start: result.muhurtas.rahuKaal.startTime,
                end: result.muhurtas.rahuKaal.endTime,
              },
              abhijitMuhurta: result.muhurtas.abhijitMuhurta
                ? {
                    start: result.muhurtas.abhijitMuhurta.startTime,
                    end: result.muhurtas.abhijitMuhurta.endTime,
                  }
                : null,
            };
          },
        });

        // 2. Tool: find_shubh_muhurta
        nav.modelContext.registerTool({
          name: 'find_shubh_muhurta',
          description:
            'Discover auspicious dates and time windows across 30 to 180 days for Griha Pravesh, Vivaha, Vehicle Purchase, Business Start, Property Registration, and Siddhi Yogas.',
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
                description: 'Auspicious ceremony/activity category',
              },
              daysCount: {
                type: 'number',
                enum: [30, 60, 90, 180],
                default: 30,
                description: 'Search horizon in days',
              },
              latitude: {
                type: 'number',
                description: 'Latitude in decimal degrees (e.g. 23.18 for Ujjain)',
              },
              longitude: {
                type: 'number',
                description: 'Longitude in decimal degrees (e.g. 75.78 for Ujjain)',
              },
              timezone: {
                type: 'string',
                default: 'Asia/Kolkata',
                description: 'IANA timezone identifier (default: Asia/Kolkata)',
              },
            },
            required: ['category', 'latitude', 'longitude'],
          },
          execute: async (args: Record<string, unknown>) => {
            const category = args.category as MuhurtaCategoryId;
            const daysCount = (Number(args.daysCount) || 30) as 30 | 60 | 90 | 180;
            const lat = Number(args.latitude ?? PRESET_CITIES[0].latitude);
            const lon = Number(args.longitude ?? PRESET_CITIES[0].longitude);
            const tz = String(args.timezone || 'Asia/Kolkata');

            const safeLat = isNaN(lat) ? PRESET_CITIES[0].latitude : lat;
            const safeLon = isNaN(lon) ? PRESET_CITIES[0].longitude : lon;

            const query = new URLSearchParams({
              category: category || 'griha_pravesh',
              days: String(daysCount),
              lat: String(safeLat),
              lon: String(safeLon),
              tz,
              min: 'Good',
            });

            const res = await fetch(`/api/muhurta?${query.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch muhurta data');
            const muhurtas = await res.json();

            return (muhurtas as Array<{
              isoDate: string;
              suitability: string;
              score: number;
              specialYogas: string[];
              panchangSummary: { tithiName: string; nakshatraName: string };
              windows: Array<{ label: string; startTime: string; endTime: string }>;
            }>)
              .filter((m) => m.suitability === 'Optimal' || m.suitability === 'Good')
              .slice(0, 15)
              .map((m) => ({
                date: m.isoDate,
                suitability: m.suitability,
                score: m.score,
                tithi: m.panchangSummary.tithiName,
                nakshatra: m.panchangSummary.nakshatraName,
                specialYogas: m.specialYogas,
                recommendedWindows: m.windows.map((w) => ({
                  label: w.label,
                  start: typeof w.startTime === 'string' ? w.startTime : new Date(w.startTime).toISOString(),
                  end: typeof w.endTime === 'string' ? w.endTime : new Date(w.endTime).toISOString(),
                })),
              }));
          },
        });
      } catch {
        // Gracefully ignore if browser environment forbids registration
      }
    }
    // Annotate DOM forms with toolname and tooldescription attributes for WebMCP DOM inspection
    try {
      const panchangForm = document.getElementById('webmcp-panchang-form');
      if (panchangForm) {
        panchangForm.setAttribute('toolname', 'calculate_panchang');
        panchangForm.setAttribute(
          'tooldescription',
          'Calculate real-time Vedic Panchang (Tithi, Nakshatra, Yoga, Karana, Vara, Muhurtas, and Choghadiyas) for any date and coordinates.'
        );
      }
      const muhurtaForm = document.getElementById('webmcp-muhurta-form');
      if (muhurtaForm) {
        muhurtaForm.setAttribute('toolname', 'find_shubh_muhurta');
        muhurtaForm.setAttribute(
          'tooldescription',
          'Discover auspicious dates and time windows across 30 to 180 days for Griha Pravesh, Vivaha, Vehicle Purchase, Business Start, and Property Registration.'
        );
      }
    } catch {}
  }, []);

  return (
    <>
      {/* Declarative WebMCP Form Annotations for In-Browser Agents */}
      <form
        id="webmcp-panchang-form"
        data-toolname="calculate_panchang"
        data-tooldescription="Calculate real-time Vedic Panchang (Tithi, Nakshatra, Yoga, Karana, Vara, Muhurtas, and Choghadiyas) for any date and coordinates."
        action="/panchang"
        method="GET"
        className="sr-only"
        aria-hidden="true"
      >
        <input type="text" name="date" placeholder="YYYY-MM-DD" defaultValue="2026-10-31" />
        <input type="number" name="latitude" step="any" placeholder="Latitude" defaultValue={PRESET_CITIES[0].latitude} />
        <input type="number" name="longitude" step="any" placeholder="Longitude" defaultValue={PRESET_CITIES[0].longitude} />
        <button type="submit">Calculate</button>
      </form>

      <form
        id="webmcp-muhurta-form"
        data-toolname="find_shubh_muhurta"
        data-tooldescription="Discover auspicious dates and time windows across 30 to 180 days for Griha Pravesh, Vivaha, Vehicle Purchase, Business Start, and Property Registration."
        action="/muhurta"
        method="GET"
        className="sr-only"
        aria-hidden="true"
      >
        <input type="text" name="category" defaultValue="griha_pravesh" />
        <input type="number" name="daysCount" defaultValue="30" />
        <button type="submit">Find Muhurta</button>
      </form>
    </>
  );
}
