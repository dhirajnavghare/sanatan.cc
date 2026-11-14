export interface SadhanaHabit {
  id: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  iconName: string;
  timeContext: string;
  timeContextHi: string;
}

export const DAILY_SADHANA_HABITS: SadhanaHabit[] = [
  {
    id: 'brahma_smaran',
    titleHi: 'प्रातः स्मरण व कर-दर्शन',
    titleEn: 'Morning Gratitude & Palm Viewing',
    descHi: 'कराग्रे वसते लक्ष्मीः... श्लोक व माता भूमि को प्रणाम',
    descEn: 'Reciting Kara Darshanam upon waking & bowing to Earth',
    iconName: 'sunny',
    timeContext: '04:30 - 07:00 AM',
    timeContextHi: 'प्रातः जागरण समय',
  },
  {
    id: 'surya_arghya',
    titleHi: 'सूर्य अर्घ्य व गायत्री जप',
    titleEn: 'Surya Arghya & Gayatri Mantra',
    descHi: 'ताम्बे के पात्र से सूर्य देव को जल अर्पण व गायत्री मन्त्र',
    descEn: 'Offering water to Surya Dev with Gayatri Mantra',
    iconName: 'water',
    timeContext: '06:00 - 08:30 AM',
    timeContextHi: 'सूर्योदय वेला',
  },
  {
    id: 'deity_puja',
    titleHi: 'दैनिक इष्ट पूजा व जप',
    titleEn: 'Daily Deity Worship & Japa',
    descHi: 'वार के अधिष्ठाता देव का ध्यान एवं १ माला जप',
    descEn: 'Devotion to weekday deity & 1 round of Japa',
    iconName: 'flame',
    timeContext: 'Morning / Abhijit',
    timeContextHi: 'प्रातः अथवा अभिजित काल',
  },
  {
    id: 'satvik_karma',
    titleHi: 'सात्विक कर्म व गीता स्वाध्याय',
    titleEn: 'Righteous Karma & Gita Study',
    descHi: 'पक्षी-गो-सेवा, परोपकार अथवा श्रीमद्भगवद्गीता का १ श्लोक',
    descEn: 'Selfless charity/animal feeding or 1 Gita verse study',
    iconName: 'book',
    timeContext: 'Midday',
    timeContextHi: 'दिन के समय',
  },
  {
    id: 'sayam_sandhya',
    titleHi: 'सायं दीप प्रज्वलन व चालीसा',
    titleEn: 'Evening Diya & Hanuman Chalisa',
    descHi: 'तुलसी/मन्दिर में सायं दीपक व श्री हनुमान चालीसा पाठ',
    descEn: 'Lighting evening lamp at Tulsi/altar & Chalisa chant',
    iconName: 'sparkles',
    timeContext: '06:00 - 08:00 PM',
    timeContextHi: 'गोधूलि वेला',
  },
];

const STORAGE_KEY_PREFIX = 'sanatan_sadhana_';
const STREAK_KEY = 'sanatan_sadhana_streak';

export function getDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export async function getCompletedHabits(dateKey: string): Promise<string[]> {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + dateKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function toggleHabitCompletion(dateKey: string, habitId: string): Promise<string[]> {
  if (typeof window === 'undefined') return [];
  try {
    const current = await getCompletedHabits(dateKey);
    let updated: string[];
    if (current.includes(habitId)) {
      updated = current.filter((id) => id !== habitId);
    } else {
      updated = [...current, habitId];
    }
    localStorage.setItem(STORAGE_KEY_PREFIX + dateKey, JSON.stringify(updated));

    // Update streak if completed at least 3 habits
    if (updated.length >= 3) {
      await updateStreak(dateKey);
    }
    return updated;
  } catch {
    return [];
  }
}

interface StreakData {
  count: number;
  lastDateKey: string;
}

export async function getSadhanaStreak(): Promise<number> {
  if (typeof window === 'undefined') return 1;
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return 1;
    const data: StreakData = JSON.parse(raw);
    const today = getDateKey(new Date());

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = getDateKey(yesterdayDate);

    if (data.lastDateKey === today || data.lastDateKey === yesterday) {
      return Math.max(1, data.count);
    }
    return 1;
  } catch {
    return 1;
  }
}

async function updateStreak(todayKey: string): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayKey = getDateKey(yesterdayDate);

    let count = 1;
    if (raw) {
      const data: StreakData = JSON.parse(raw);
      if (data.lastDateKey === todayKey) {
        return; // already updated for today
      }
      if (data.lastDateKey === yesterdayKey) {
        count = data.count + 1;
      }
    }
    const newStreak: StreakData = { count, lastDateKey: todayKey };
    localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
  } catch {
    // Non-blocking
  }
}
