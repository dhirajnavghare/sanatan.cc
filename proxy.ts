import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function generateMarkdownForPath(pathname: string, searchParams: URLSearchParams): string {
  if (pathname === '/' || pathname === '') {
    return `# sanatan.cc — Hindu Dharma Spiritual Texts & High-Precision Vedic Ephemeris

> An open-source digital platform preserving Hindu Dharma spiritual texts and providing world-class, calculation-based Vedic ephemeris applications.

## Live Applications

### 1. High-Precision Vedic Panchang (पञ्चाङ्गम्)
- **URL:** https://sanatan.cc/panchang
- **Description:** Real-time astronomical Hindu calendar calculated from first principles (VSOP87 Solar, Chapront ELP-2000 Lunar, and Lahiri Ayanamsa). Computes Tithi, Nakshatra, Yoga, Karana, Vara, Abhijit Muhurta, Rahu Kaal, Yamaganda, Gulika Kaal, and Day/Night Choghadiya for any coordinates on Earth.
- **Privacy:** Real-time calculation with zero tracking, zero logging, and local storage preference retention.

### 2. Shubh Muhurta Finder (शुभ मुहूर्त शोधक)
- **URL:** https://sanatan.cc/muhurta
- **Description:** Algorithmic discovery across 30 to 180 days for Griha Pravesh, Vivaha, Vehicle Purchase, Business Start, Property Registration, Gold Buying, and Namakarana. Strictly filters Bhadra (Vishti Karana), Rikta Tithis (4th, 9th, 14th), and malefic Panchakas while identifying Sarvartha Siddhi & Amrita Siddhi yogas.

### 3. Hindu Festival Timeline & Calendar (उत्सव एवं व्रत पञ्चाङ्ग)
- **URL:** https://sanatan.cc/festivals
- **Description:** Chronological timeline of 150+ sacred Hindu festivals, fasts, Ekadashi vrats, and solar transits computed with Drik Panchang, Dharmasindhu, and Nirnayasindhu astronomical rules. Features puja muhurta windows, presiding deities, and traditional observance guidance.

### 4. Hindu Devi Devatas (सनातन देवी-देवता दर्शन)
- **URL:** https://sanatan.cc/devatas
- **Description:** Vedic repository of Hindu deities: Shiva, Vishnu, Durga, Ganesha, Krishna, Rama, Hanuman, Lakshmi, Saraswati, Surya, Kartikeya, and Kali. Explores Vedic tatva philosophy, divine iconography, authentic Sanskrit mantras with English translations, major historic temples, and traditional offerings.

## Documentation & Organization

- **About:** https://sanatan.cc/about (Mission, ephemeris mathematics, and privacy architecture)
- **Contact:** https://sanatan.cc/contact (mail@sanatan.cc, validation reports)
- **Terms of Service:** https://sanatan.cc/terms (CC0 1.0 Universal public domain dedication & spiritual disclaimer)
- **Privacy Policy:** https://sanatan.cc/privacy (Zero trackers, local storage only)
- **Source Code:** https://github.com/dhirajnavghare/sanatan.cc

## Machine & Agent Interfaces

- **LLM Summary:** https://sanatan.cc/llms.txt
- **MCP Server Card:** https://sanatan.cc/.well-known/mcp/server-card.json
- **Sitemap:** https://sanatan.cc/sitemap.xml
- **Robots & Content Signals:** https://sanatan.cc/robots.txt (Content-Signal: search=yes, ai-train=no)
`;
  }

  if (pathname === '/panchang') {
    const queryDate = searchParams.get('date') || 'today';
    return `# High-Precision Vedic Panchang (पञ्चाङ्गम्) — sanatan.cc

> Real-time astronomical Vedic Panchang computed from first principles without tabular hardcoding.

- **Canonical URL:** https://sanatan.cc/panchang
- **Selected Date:** ${queryDate}
- **Default Reference Meridian:** Ujjain (Avanti), India (23.18° N, 75.79° E)
- **Supported Calculations:**
  - **Pancha-Anga:** Tithi, Nakshatra, Yoga, Karana, and Vara with exact millisecond transition times.
  - **Auspicious Muhurtas:** Brahma Muhurta, Abhijit Muhurta, Vijaya Muhurta, Amrit Kaalam, Godhuli.
  - **Inauspicious Kaal:** Rahu Kaal, Yamaganda, Gulika Kaal, Dur Muhurtam, Varjyam.
  - **Choghadiya (चौघड़िया):** 8 daytime and 8 nighttime solar weekday divisions.
  - **Zodiac Longitudes:** Sidereal Nirayana Sun Sign and Moon Sign with Lahiri Chitrapaksha Ayanamsa.
- **WebMCP Tool:** Call \`calculate_panchang\` in browser agent sessions to compute Panchang dynamically for any coordinates.
`;
  }

  if (pathname === '/muhurta') {
    const category = searchParams.get('category') || 'all';
    return `# Shubh Muhurta Finder (शुभ मुहूर्त शोधक) — sanatan.cc

> Algorithmic discovery of auspicious dates and daytime time windows across 30 to 180 days based on classical scriptures (Muhurta Chintamani, Brihat Samhita).

- **Canonical URL:** https://sanatan.cc/muhurta
- **Selected Category Filter:** ${category}
- **Supported Categories:**
  1. **Griha Pravesh (गृह प्रवेश):** Fixed & gentle nakshatras, avoiding Tuesday/Sunday, Rikta tithis, and Bhadra.
  2. **Vivaha / Marriage (विवाह संस्कार):** Classical wedding nakshatras, Shukla/Krishna auspicious tithis, and benefic weekdays.
  3. **Vehicle Purchase (वाहन क्रय):** Chara & Kshipra swift stars (Ashwini, Pushya, Punarvasu, Hasta, Swati, Shravana).
  4. **Business & Shop Opening (व्यापार आरम्भ):** Pushya, Hasta, Anuradha with Mercury/Jupiter associations.
  5. **Property & Land Registry (भूमि रजिस्ट्री):** Fixed stars, avoiding Agni and Mrityu Panchakas.
  6. **Gold & Assets Buying (स्वर्ण क्रय):** Pushya, Guru Pushya, Ravi Pushya, and benefic lunar phases.
  7. **Namakarana (नामकरण संस्कार):** Sacred 10th/12th day naming ceremonies.
  8. **Universal Siddhi Yogas (सर्वार्थ सिद्धि / अमृत सिद्धि):** Universal auspicious undertakings.
- **WebMCP Tool:** Call \`find_shubh_muhurta\` in browser agent sessions to query dates across any horizon.
`;
  }

  if (pathname === '/festivals') {
    const year = searchParams.get('year') || '2026';
    const category = searchParams.get('category') || 'all';
    return `# Hindu Festival Timeline & Calendar (सनातन उत्सव एवं व्रत) — sanatan.cc

> Complete annual chronological timeline of Hindu festivals, fasts, Ekadashi vrats, and sacred days calculated according to Drik Panchang, Dharmasindhu, and Nirnayasindhu astronomical rules.

- **Canonical URL:** https://sanatan.cc/festivals
- **Selected Year:** ${year}
- **Selected Category:** ${category}
- **Coverage:** 150+ annual celebrations, 24 Ekadashis, Jayantis, and solar Sankranti transits.
- **Features:** Exact puja muhurta windows, presiding deities, Vedic significance, and daily Panchang deep-links.
`;
  }

  if (pathname === '/devatas') {
    const tradition = searchParams.get('tradition') || 'all';
    const query = searchParams.get('q') || '';
    return `# Hindu Devi Devatas (सनातन देवी-देवता दर्शन एवं महामन्त्र) — sanatan.cc

> Vedic philosophical and devotional repository of principal Hindu deities, sacred Sanskrit mantras, divine forms (Svarupa), iconography, and historic pilgrimage temples.

- **Canonical URL:** https://sanatan.cc/devatas
- **Selected Tradition:** ${tradition}
- **Search Query:** ${query || 'None'}
- **Coverage:** Lord Shiva, Lord Vishnu, Maa Durga, Lord Ganesha, Lord Krishna, Lord Rama, Lord Hanuman, Maa Mahalakshmi, Maa Saraswati, Surya Bhagavan, Lord Kartikeya (Murugan), and Maa Kali.
- **Traditions:** Smarta Panchayatana, Shaiva, Vaishnava, Shakta, Ganapatya, Kaumara, Saura, and Hanuman.
- **Features:** Devanagari Sanskrit mantras with IAST and English meanings, temple directories, traditional offerings, and deep-links to the daily Panchang.
`;
  }

  if (pathname === '/about') {
    return `# About sanatan.cc

- **Mission:** Preserving Hindu Dharma spiritual texts and providing world-class mathematical Vedic astronomy tools.
- **Mathematical Ephemeris:** VSOP87 planetary theory, Chapront ELP-2000 lunar theory, and Lahiri Chitra Paksha Ayanamsa.
- **Privacy Architecture:** Zero telemetry, zero analytics, private local coordinate storage.
- **License:** Open-source CC0 1.0 Universal Public Domain.
- **Repository:** https://github.com/dhirajnavghare/sanatan.cc
`;
  }

  if (pathname === '/contact') {
    return `# Contact sanatan.cc

- **Official Inquiries:** mail@sanatan.cc
- **Feedback & Validation:** mail@sanatan.cc?subject=Sanatan.cc%20Inquiry
- **GitHub Issues:** https://github.com/dhirajnavghare/sanatan.cc/issues
`;
  }

  if (pathname === '/terms') {
    return `# Terms of Service — sanatan.cc

1. **Open Source:** Dedicated under the CC0 1.0 Universal Public Domain Dedication.
2. **Educational & Spiritual Use:** Ephemeris outputs are computed from mathematical models for research, spiritual, and educational purposes.
3. **Agent Crawling Policy:** Search bots and autonomous agents must respect \`Content-Signal: search=yes, ai-train=no\`.
`;
  }

  if (pathname === '/privacy') {
    return `# Privacy Policy — sanatan.cc

1. **Zero Tracking:** No cookies, no profiling scripts, no analytics tracking.
2. **Local Coordinates:** User coordinates and city choices remain strictly inside client local storage (\`localStorage\`).
3. **No Server Logging of Coordinates:** Your location is never logged or saved on remote servers.
`;
  }

  return `# sanatan.cc

Please visit https://sanatan.cc/ or refer to https://sanatan.cc/llms.txt for full agent documentation.
`;
}

export function proxy(request: NextRequest) {
  const accept = request.headers.get('accept') || '';
  const pathname = request.nextUrl.pathname;

  // Ignore static assets, images, next chunks, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  if (accept.includes('text/markdown')) {
    const md = generateMarkdownForPath(pathname, request.nextUrl.searchParams);
    return new Response(md, {
      status: 200,
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'vary': 'Accept',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
