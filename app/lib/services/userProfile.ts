import { GeoLocation } from '../panchang/types';
import { PRESET_CITIES } from '../panchang/constants';

export interface UserNotificationPreferences {
  abhijitAlert: boolean; // 🌟 Abhijit Muhurta & Supreme Auspicious Windows
  brahmaMuhurtaAlert: boolean; // 🕊️ Brahma Muhurta (Amrit Vela)
  rahuKaalAlert: boolean; // ⚠️ Rahu Kaal Caution Warnings
  sandhyaDeepamAlert: boolean; // 🪔 Godhuli & Evening Sandhya Deepam
  choghadiyaAlert: boolean; // ✨ Amrit & Shubh Choghadiya Shifts
  todoTasksAlert: boolean; // 📝 Planned To-Do Task Reminders
  ekadashiAlert: boolean; // 🌸 Ekadashi Fasting Alerts
  pradoshAlert: boolean; // 🔱 Pradosha Vrat Alerts
  chandrodayaAlert: boolean; // 🌙 Moonrise Alerts
}

export interface UserSacredProfile {
  name: string;
  gotra: string;
  ishtaDevata: string;
  kuldeviOrDevata: string;
  city: string;
  rashi?: number; // 0 to 11 (Mesha to Meena)
  audioEnabled: boolean;
  hapticsEnabled: boolean;
  notificationsEnabled: boolean;
  notifications: UserNotificationPreferences;
}

export const POPULAR_GOTRAS = [
  'Kashyapa (कश्यप)',
  'Bharadvaja (भारद्वाज)',
  'Vashistha (वशिष्ठ)',
  'Vishvamitra (विश्वामित्र)',
  'Gautama (गौतम)',
  'Jamadagni (जमदग्नि)',
  'Atri (अत्रि)',
  'Agastya (अगस्त्य)',
  'Shandilya (शाण्डिल्य)',
  'Gargya / Garg (गर्ग)',
  'Parashara (पाराशर)',
  'Harita (हारीत)',
  'Kaushika (कौशिक)',
  'Vatsa (वत्स)',
  'Mudgala (मुद्गल)',
  'Angirasa (अंगिरस)',
  'Kaundinya (कौण्डिन्य)',
  'Upamanyu (उपमन्यु)',
  'Shiva / Vishnu Gotra (शिव/विष्णु गोत्र)',
];

export const POPULAR_ISHTA_DEVATAS = [
  { id: 'shiva', name: 'Lord Shiva / Mahadeva', nameHi: 'भगवान शिव / महादेव', icon: '🔱' },
  { id: 'hanuman', name: 'Sri Hanuman Ji', nameHi: 'श्री संकटमोचन हनुमान', icon: '🚩' },
  { id: 'krishna', name: 'Lord Sri Krishna', nameHi: 'भगवान श्री कृष्ण', icon: '🦚' },
  { id: 'rama', name: 'Bhagwan Sri Rama', nameHi: 'मर्यादा पुरुषोत्तम श्री राम', icon: '🏹' },
  { id: 'durga', name: 'Maa Durga / Shakti', nameHi: 'माता दुर्गा / भगवती शक्ति', icon: '🦁' },
  { id: 'ganesha', name: 'Lord Sri Ganesha', nameHi: 'प्रथम पूज्य श्री गणेश', icon: '🐘' },
  { id: 'lakshmi', name: 'Maa Mahalakshmi', nameHi: 'माता महालक्ष्मी', icon: '🪷' },
  { id: 'vishnu', name: 'Lord Sri Hari Vishnu', nameHi: 'भगवान श्री हरि विष्णु', icon: '🐚' },
  { id: 'saraswati', name: 'Maa Saraswati', nameHi: 'माता सरस्वती', icon: '📜' },
  { id: 'kartikeya', name: 'Lord Murugan / Kartikeya', nameHi: 'भगवान कार्तिकेय / मुरुगन', icon: '🦚' },
  { id: 'surya', name: 'Lord Surya Narayana', nameHi: 'भगवान सूर्य नारायण', icon: '☀️' },
  { id: 'bhairava', name: 'Lord Kaal Bhairava', nameHi: 'काल भैरव देव', icon: '🐕' },
];

export const DEFAULT_USER_PROFILE: UserSacredProfile = {
  name: 'भक्त',
  gotra: 'Kashyapa (कश्यप)',
  ishtaDevata: 'भगवान शिव / महादेव',
  kuldeviOrDevata: '',
  city: 'Ujjain, India',
  rashi: 0,
  audioEnabled: true,
  hapticsEnabled: true,
  notificationsEnabled: true,
  notifications: {
    abhijitAlert: true,
    brahmaMuhurtaAlert: true,
    rahuKaalAlert: true,
    sandhyaDeepamAlert: true,
    choghadiyaAlert: true,
    todoTasksAlert: true,
    ekadashiAlert: true,
    pradoshAlert: true,
    chandrodayaAlert: true,
  },
};

const PROFILE_STORAGE_KEY = 'sanatan_sacred_user_profile';
const LOCATION_STORAGE_KEY = 'panchang_custom_location';

export async function loadUserProfile(): Promise<UserSacredProfile> {
  if (typeof window === 'undefined') return DEFAULT_USER_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return DEFAULT_USER_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_USER_PROFILE,
      ...parsed,
      notifications: {
        ...DEFAULT_USER_PROFILE.notifications,
        ...(parsed.notifications || {}),
      },
    };
  } catch {
    return DEFAULT_USER_PROFILE;
  }
}

export async function saveUserProfile(profile: UserSacredProfile): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Non-blocking
  }
}

export async function loadUserLocation(): Promise<GeoLocation> {
  if (typeof window === 'undefined') return PRESET_CITIES[0];
  try {
    const raw = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!raw) return PRESET_CITIES[0];
    const parsed = JSON.parse(raw);
    if (
      typeof parsed.latitude === 'number' &&
      typeof parsed.longitude === 'number' &&
      parsed.timezone
    ) {
      return parsed;
    }
    return PRESET_CITIES[0];
  } catch {
    return PRESET_CITIES[0];
  }
}

export async function saveUserLocation(location: GeoLocation): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
  } catch {
    // Non-blocking
  }
}
