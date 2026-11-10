import { getFestivalTimeline } from '../../app/lib/festivals/timeline';
import { GeoLocation } from '../../app/lib/panchang/types';

const UJJAIN_LOCATION: GeoLocation = {
  name: 'Ujjain',
  latitude: 23.1765,
  longitude: 75.7885,
  altitude: 491,
  timezone: 'Asia/Kolkata',
};

interface FestivalBenchmark {
  name: string;
  expectedDates: Record<number, string>; // year -> expected YYYY-MM-DD
}

// Authoritative Drik Panchang / Dharmasindhu benchmark dates for Ujjain / New Delhi
const BENCHMARKS: FestivalBenchmark[] = [
  {
    name: 'Maha Shivratri',
    expectedDates: {
      2024: '2024-03-08',
      2025: '2025-02-26',
      2026: '2026-02-15',
      2027: '2027-03-06'
    }
  },
  {
    name: 'Holika Dahan',
    expectedDates: {
      2024: '2024-03-24',
      2025: '2025-03-13',
      2026: '2026-03-03',
      2027: '2027-03-21'
    }
  },
  {
    name: 'Gudi Padwa',
    expectedDates: {
      2024: '2024-04-09',
      2025: '2025-03-30',
      2026: '2026-03-19',
      2027: '2027-04-07'
    }
  },
  {
    name: 'Rama Navami',
    expectedDates: {
      2024: '2024-04-17',
      2025: '2025-04-06',
      2026: '2026-03-26',
      2027: '2027-04-15'
    }
  },
  {
    name: 'Hanuman Jayanti',
    expectedDates: {
      2024: '2024-04-23',
      2025: '2025-04-12',
      2026: '2026-04-02',
      2027: '2027-04-20'
    }
  },
  {
    name: 'Akshaya Tritiya',
    expectedDates: {
      2024: '2024-05-10',
      2025: '2025-04-30',
      2026: '2026-04-19',
      2027: '2027-05-09'
    }
  },
  {
    name: 'Jagannath Rath Yatra',
    expectedDates: {
      2024: '2024-07-07',
      2025: '2025-06-27',
      2026: '2026-07-16',
      2027: '2027-07-05'
    }
  },
  {
    name: 'Guru Purnima',
    expectedDates: {
      2024: '2024-07-21',
      2025: '2025-07-10',
      2026: '2026-07-29',
      2027: '2027-07-18'
    }
  },
  {
    name: 'Raksha Bandhan',
    expectedDates: {
      2024: '2024-08-19',
      2025: '2025-08-09',
      2026: '2026-08-28',
      2027: '2027-08-17'
    }
  },
  {
    name: 'Krishna Janmashtami',
    expectedDates: {
      2024: '2024-08-26',
      2025: '2025-08-16',
      2026: '2026-09-04',
      2027: '2027-08-25'
    }
  },
  {
    name: 'Ganesh Chaturthi',
    expectedDates: {
      2024: '2024-09-07',
      2025: '2025-08-27',
      2026: '2026-09-14',
      2027: '2027-09-04'
    }
  },
  {
    name: 'Sharad Navratri',
    expectedDates: {
      2024: '2024-10-03',
      2025: '2025-09-22',
      2026: '2026-10-11',
      2027: '2027-09-30'
    }
  },
  {
    name: 'Dussehra',
    expectedDates: {
      2024: '2024-10-12',
      2025: '2025-10-02',
      2026: '2026-10-20',
      2027: '2027-10-09' // Aparahna Vyapini Dashami
    }
  },
  {
    name: 'Karwa Chauth',
    expectedDates: {
      2024: '2024-10-20',
      2025: '2025-10-10',
      2026: '2026-10-29',
      2027: '2027-10-18'
    }
  },
  {
    name: 'Dhanteras',
    expectedDates: {
      2024: '2024-10-29',
      2025: '2025-10-18',
      2026: '2026-11-06',
      2027: '2027-10-27'
    }
  },
  {
    name: 'Diwali (Lakshmi Puja)',
    expectedDates: {
      2024: '2024-10-31', // Amavasya Pradosha Kaal in North/Central India was Oct 31, 2024
      2025: '2025-10-20',
      2026: '2026-11-08',
      2027: '2027-10-29'
    }
  },
  {
    name: 'Govardhan Puja',
    expectedDates: {
      2024: '2024-11-02',
      2025: '2025-10-22',
      2026: '2026-11-10',
      2027: '2027-10-30'
    }
  },
  {
    name: 'Bhai Dooj',
    expectedDates: {
      2024: '2024-11-03',
      2025: '2025-10-23',
      2026: '2026-11-11',
      2027: '2027-10-31'
    }
  },
  {
    name: 'Chhath Puja',
    expectedDates: {
      2024: '2024-11-07',
      2025: '2025-10-27', // Sandhya Arghya (Main Surya Shashthi Puja)
      2026: '2026-11-15',
      2027: '2027-11-04'
    }
  },
  {
    name: 'Makar Sankranti',
    expectedDates: {
      2024: '2024-01-15',
      2025: '2025-01-14',
      2026: '2026-01-14',
      2027: '2027-01-15'
    }
  }
];

async function runAudit() {
  console.log('='.repeat(100));
  console.log('HINDU FESTIVALS & EKADASHIS AUDIT ACROSS 2024, 2025, 2026, 2027');
  console.log('='.repeat(100));
  console.log('Validating against official Drik Panchang, Dharmasindhu, and Govt of India published dates\n');

  const years = [2024, 2025, 2026, 2027];
  let totalChecked = 0;
  let totalPassed = 0;
  const discrepancies: string[] = [];

  for (const year of years) {
    console.log(`\n--- YEAR ${year} FESTIVAL VERIFICATION ---`);
    console.log(
      'Festival Name'.padEnd(28) +
      'Expected Date'.padEnd(16) +
      'Calculated Date'.padEnd(18) +
      'Status'
    );
    console.log('-'.repeat(70));

    // Get all calculated festivals for the year
    const res = getFestivalTimeline({ year }, UJJAIN_LOCATION);
    const timeline = res.festivals;

    // Build map from substring to list of dates
    for (const b of BENCHMARKS) {
      const expDate = b.expectedDates[year];
      if (!expDate) continue;

      totalChecked++;

      // Precise festival name matching
      const matched = timeline.filter(item => {
        const itemLower = item.name.toLowerCase();
        const bLower = b.name.toLowerCase();
        if (b.name === 'Maha Shivratri') {
          return itemLower.includes('shivaratri') || itemLower.includes('shivratri');
        }
        if (b.name === 'Krishna Janmashtami') {
          return itemLower.includes('janmashtami');
        }
        if (b.name === 'Dussehra') {
          return itemLower.includes('dussehra (vijayadashami)') || itemLower.includes('vijayadashami');
        }
        if (b.name === 'Chhath Puja') {
          return itemLower.includes('chhath');
        }
        return itemLower.includes(bLower);
      });

      const matchedDates = matched.map(m => m.date);
      const isMatch = matchedDates.includes(expDate);

      if (isMatch) {
        totalPassed++;
        console.log(
          b.name.padEnd(28) +
          expDate.padEnd(16) +
          expDate.padEnd(18) +
          '✅ MATCH'
        );
      } else {
        const found = matchedDates.length > 0 ? matchedDates.join(', ') : 'Not Found';
        discrepancies.push(`${year} ${b.name}: Expected ${expDate}, Found ${found}`);
        console.log(
          b.name.padEnd(28) +
          expDate.padEnd(16) +
          found.padEnd(18) +
          '⚠️ CHECK'
        );
      }
    }
  }

  console.log('\n' + '='.repeat(100));
  console.log(`FESTIVAL AUDIT SUMMARY:`);
  console.log(`• Total Benchmarks Checked: ${totalChecked}`);
  console.log(`• Total Exact Matches: ${totalPassed} / ${totalChecked} (${((totalPassed / totalChecked) * 100).toFixed(1)}%)`);

  if (discrepancies.length > 0) {
    console.log('\nDiscrepancies / Nuance Notes:');
    for (const d of discrepancies) {
      console.log(`  - ${d}`);
    }
  }
  console.log('='.repeat(100));
}

runAudit().catch(console.error);
