import { PanchangData } from '../panchang/types';

export interface TodoItem {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: number;
}

export interface DayPlannerSlot {
  id: string; // unique key e.g. 'brahma_muhurta', 'choghadiya_day_0', 'abhijit_muhurta', 'rahu_kaal'
  title: string;
  titleHi: string;
  startTime: Date;
  endTime: Date;
  quality: 'Mahashubh' | 'Shubh' | 'Labh' | 'Amrit' | 'Char' | 'Ashubh' | 'Neutral';
  suitability: string;
  suitabilityHi: string;
  suggestedTasks: string[];
  suggestedTasksHi: string[];
  isCore?: boolean;
  isCurrent?: boolean;
}

export interface UserSlotPlan {
  taskText: string;
  isCompleted: boolean;
  updatedAt: number;
  todos?: TodoItem[];
}

export type DayPlansMap = Record<string, UserSlotPlan>;

export interface LiveCosmicStatus {
  statusType: 'mahashubh' | 'shubh' | 'neutral' | 'caution';
  titleHi: string;
  titleEn: string;
  windowHi: string;
  windowEn: string;
  badgeHi: string;
  badgeEn: string;
  descriptionHi: string;
  descriptionEn: string;
  accentColor: string;
  badgeBg: string;
  startTime: Date;
  endTime: Date;
}

const STORAGE_PREFIX = 'sanatan_dayplan_';

export async function getDayPlans(dateKey: string): Promise<DayPlansMap> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + dateKey);
    if (!raw) return {};
    const parsed: DayPlansMap = JSON.parse(raw);
    for (const key of Object.keys(parsed)) {
      const p = parsed[key];
      if (p.taskText && (!p.todos || p.todos.length === 0)) {
        p.todos = [
          {
            id: 'todo_' + p.updatedAt,
            text: p.taskText,
            isCompleted: Boolean(p.isCompleted),
            createdAt: p.updatedAt,
          },
        ];
      }
    }
    return parsed;
  } catch {
    return {};
  }
}

export async function addTodoToSlot(
  dateKey: string,
  slotId: string,
  taskText: string
): Promise<DayPlansMap> {
  const trimmed = taskText.trim();
  if (!trimmed) return getDayPlans(dateKey);

  try {
    const current = await getDayPlans(dateKey);
    const existing = current[slotId];
    const todos: TodoItem[] = existing?.todos ? [...existing.todos] : [];

    if (!todos.some((t) => t.text.toLowerCase() === trimmed.toLowerCase())) {
      todos.push({
        id: 'todo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        text: trimmed,
        isCompleted: false,
        createdAt: Date.now(),
      });
    }

    const allCompleted = todos.length > 0 && todos.every((t) => t.isCompleted);
    current[slotId] = {
      taskText: todos[0]?.text || trimmed,
      isCompleted: allCompleted,
      updatedAt: Date.now(),
      todos,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_PREFIX + dateKey, JSON.stringify(current));
    }
    return current;
  } catch {
    return {};
  }
}

export async function toggleTodoItem(
  dateKey: string,
  slotId: string,
  todoId: string
): Promise<DayPlansMap> {
  try {
    const current = await getDayPlans(dateKey);
    const slotPlan = current[slotId];
    if (!slotPlan || !slotPlan.todos) return current;

    slotPlan.todos = slotPlan.todos.map((t) =>
      t.id === todoId ? { ...t, isCompleted: !t.isCompleted } : t
    );

    slotPlan.isCompleted =
      slotPlan.todos.length > 0 && slotPlan.todos.every((t) => t.isCompleted);
    slotPlan.updatedAt = Date.now();
    current[slotId] = slotPlan;

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_PREFIX + dateKey, JSON.stringify(current));
    }
    return current;
  } catch {
    return {};
  }
}

export async function deleteTodoItem(
  dateKey: string,
  slotId: string,
  todoId: string
): Promise<DayPlansMap> {
  try {
    const current = await getDayPlans(dateKey);
    const slotPlan = current[slotId];
    if (!slotPlan || !slotPlan.todos) return current;

    slotPlan.todos = slotPlan.todos.filter((t) => t.id !== todoId);
    if (slotPlan.todos.length === 0) {
      delete current[slotId];
    } else {
      slotPlan.taskText = slotPlan.todos[0]?.text || '';
      slotPlan.isCompleted = slotPlan.todos.every((t) => t.isCompleted);
      slotPlan.updatedAt = Date.now();
      current[slotId] = slotPlan;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_PREFIX + dateKey, JSON.stringify(current));
    }
    return current;
  } catch {
    return {};
  }
}

export async function saveSlotPlan(
  dateKey: string,
  slotId: string,
  taskText: string,
  isCompleted: boolean = false
): Promise<DayPlansMap> {
  try {
    const current = await getDayPlans(dateKey);
    const trimmed = taskText.trim();
    if (!trimmed) {
      delete current[slotId];
    } else {
      current[slotId] = {
        taskText: trimmed,
        isCompleted,
        updatedAt: Date.now(),
        todos: [
          {
            id: 'todo_' + Date.now(),
            text: trimmed,
            isCompleted,
            createdAt: Date.now(),
          },
        ],
      };
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_PREFIX + dateKey, JSON.stringify(current));
    }
    return current;
  } catch {
    return {};
  }
}

export async function toggleSlotCompletion(
  dateKey: string,
  slotId: string
): Promise<DayPlansMap> {
  try {
    const current = await getDayPlans(dateKey);
    const slotPlan = current[slotId];
    if (slotPlan) {
      const nextCompleted = !slotPlan.isCompleted;
      slotPlan.isCompleted = nextCompleted;
      if (slotPlan.todos) {
        slotPlan.todos = slotPlan.todos.map((t) => ({ ...t, isCompleted: nextCompleted }));
      }
      slotPlan.updatedAt = Date.now();
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_PREFIX + dateKey, JSON.stringify(current));
      }
    }
    return current;
  } catch {
    return {};
  }
}

export function getLiveCosmicStatus(
  panchang: PanchangData,
  now: Date = new Date(),
  timezone: string = 'Asia/Kolkata'
): LiveCosmicStatus {
  const nowMs = now.getTime();

  const formatShort = (d: Date | string): string => {
    const date = typeof d === 'string' ? new Date(d) : d;
    try {
      return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone,
      }).format(date);
    } catch {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  // 1. Check Rahu Kaal
  if (panchang.muhurtas.rahuKaal) {
    const rkStart = new Date(panchang.muhurtas.rahuKaal.startTime);
    const rkEnd = new Date(panchang.muhurtas.rahuKaal.endTime);
    if (nowMs >= rkStart.getTime() && nowMs <= rkEnd.getTime()) {
      return {
        statusType: 'caution',
        titleHi: 'अभी राहु काल चल रहा है',
        titleEn: 'Rahu Kaal is Active Now',
        windowHi: `${formatShort(rkStart)} से ${formatShort(rkEnd)} तक`,
        windowEn: `${formatShort(rkStart)} - ${formatShort(rkEnd)}`,
        badgeHi: '⚠️ सावधानी काल',
        badgeEn: '⚠️ Caution Window',
        descriptionHi: 'नया कार्य, अनुबंध या यात्रा टालें • नियमित कर्म जारी रखें व शान्त रहें',
        descriptionEn: 'Avoid new ventures, contracts or travel • Continue routine chores',
        accentColor: '#dc2626',
        badgeBg: '#fee2e2',
        startTime: rkStart,
        endTime: rkEnd,
      };
    }
  }

  // 2. Check Abhijit Muhurta
  if (panchang.muhurtas.abhijitMuhurta) {
    const abStart = new Date(panchang.muhurtas.abhijitMuhurta.startTime);
    const abEnd = new Date(panchang.muhurtas.abhijitMuhurta.endTime);
    if (nowMs >= abStart.getTime() && nowMs <= abEnd.getTime()) {
      return {
        statusType: 'mahashubh',
        titleHi: 'अभी अभिजित मुहूर्त चल रहा है',
        titleEn: 'Abhijit Muhurta is Active Now',
        windowHi: `${formatShort(abStart)} से ${formatShort(abEnd)} तक`,
        windowEn: `${formatShort(abStart)} - ${formatShort(abEnd)}`,
        badgeHi: '🌟 महाशुभ विजय काल',
        badgeEn: '🌟 Supreme Victory Hour',
        descriptionHi: 'सर्वदोष नाशक विष्णु काल • समस्त शुभ कार्य, महत्वपूर्ण निर्णय व आरम्भ हेतु सर्वोत्तम',
        descriptionEn: 'Auspicious hour of Lord Vishnu • Supreme for vital launches & agreements',
        accentColor: '#16a34a',
        badgeBg: '#dcfce7',
        startTime: abStart,
        endTime: abEnd,
      };
    }
  }

  // 3. Check Brahma Muhurta
  if (panchang.muhurtas.brahmaMuhurta) {
    const bmStart = new Date(panchang.muhurtas.brahmaMuhurta.startTime);
    const bmEnd = new Date(panchang.muhurtas.brahmaMuhurta.endTime);
    if (nowMs >= bmStart.getTime() && nowMs <= bmEnd.getTime()) {
      return {
        statusType: 'mahashubh',
        titleHi: 'अभी ब्रह्म मुहूर्त चल रहा है',
        titleEn: 'Brahma Muhurta is Active Now',
        windowHi: `${formatShort(bmStart)} से ${formatShort(bmEnd)} तक`,
        windowEn: `${formatShort(bmStart)} - ${formatShort(bmEnd)}`,
        badgeHi: '🕊️ अमृत वेला',
        badgeEn: '🕊️ Ambrosial Dawn',
        descriptionHi: 'सृष्टि की शुद्धतम सात्विक ऊर्जा • ध्यान, मन्त्र जप, प्राणायाम व अध्ययन हेतु परम उत्तम',
        descriptionEn: 'Purest spiritual vibration • Supreme for meditation, pranayama & study',
        accentColor: '#7c3aed',
        badgeBg: '#ede9fe',
        startTime: bmStart,
        endTime: bmEnd,
      };
    }
  }

  // 4. Check Active Choghadiya
  const allChoghadiyas = [...panchang.choghadiya.day, ...panchang.choghadiya.night];
  const activeCh = allChoghadiyas.find((c) => {
    const s = new Date(c.startTime).getTime();
    const e = new Date(c.endTime).getTime();
    return nowMs >= s && nowMs <= e;
  }) || allChoghadiyas[0];

  if (activeCh) {
    const start = new Date(activeCh.startTime);
    const end = new Date(activeCh.endTime);
    const windowHi = `${formatShort(start)} से ${formatShort(end)} तक`;
    const windowEn = `${formatShort(start)} - ${formatShort(end)}`;

    switch (activeCh.quality) {
      case 'Amrit':
        return {
          statusType: 'mahashubh',
          titleHi: 'अभी अमृत चौघड़िया चल रहा है',
          titleEn: 'Amrit Choghadiya is Active',
          windowHi,
          windowEn,
          badgeHi: '✨ अमृत वेला',
          badgeEn: '✨ Nectar Hour',
          descriptionHi: 'सर्वश्रेष्ठ काल • व्यापार, खरीदारी, औषधि सेवन व समस्त शुभ कार्य आरम्भ करें',
          descriptionEn: 'Auspicious hour • Perfect for trade, new ventures, learning & medicine',
          accentColor: '#059669',
          badgeBg: '#d1fae5',
          startTime: start,
          endTime: end,
        };
      case 'Shubh':
        return {
          statusType: 'shubh',
          titleHi: 'अभी शुभ चौघड़िया चल रहा है',
          titleEn: 'Shubh Choghadiya is Active',
          windowHi,
          windowEn,
          badgeHi: '🌿 शुभ काल',
          badgeEn: '🌿 Auspicious Hour',
          descriptionHi: 'धार्मिक कार्य, महत्वपूर्ण बैठक, उत्सव व नवीन सम्बन्ध निर्माण हेतु अनुकूल',
          descriptionEn: 'Favorable for meetings, ceremonies, negotiations & spiritual tasks',
          accentColor: '#2563eb',
          badgeBg: '#dbeafe',
          startTime: start,
          endTime: end,
        };
      case 'Labh':
        return {
          statusType: 'shubh',
          titleHi: 'अभी लाभ चौघड़िया चल रहा है',
          titleEn: 'Labh Choghadiya is Active',
          windowHi,
          windowEn,
          badgeHi: '💎 लाभ काल',
          badgeEn: '💎 Profitable Hour',
          descriptionHi: 'व्यापार, वाणिज्य, निवेश, क्रय-विक्रय व आर्थिक लाभ के कार्यों हेतु श्रेष्ठ',
          descriptionEn: 'Favorable for business, investments, shopping & financial gains',
          accentColor: '#0891b2',
          badgeBg: '#cffafe',
          startTime: start,
          endTime: end,
        };
      case 'Char':
        return {
          statusType: 'neutral',
          titleHi: 'अभी चर चौघड़िया चल रहा है',
          titleEn: 'Char Choghadiya is Active',
          windowHi,
          windowEn,
          badgeHi: '🚗 चर गतिशीलता',
          badgeEn: '🚗 Dynamic Hour',
          descriptionHi: 'यात्रा, वाहन चालन, पत्राचार, संवाद व सामान्य गतिशीलता हेतु उत्तम',
          descriptionEn: 'Good for travel, transit, communication, phone calls & errands',
          accentColor: '#d97706',
          badgeBg: '#fef3c7',
          startTime: start,
          endTime: end,
        };
      default:
        return {
          statusType: 'caution',
          titleHi: `अभी ${activeCh.nameDevanagari} चौघड़िया चल रहा है`,
          titleEn: `${activeCh.name} Choghadiya is Active`,
          windowHi,
          windowEn,
          badgeHi: '⏳ धैर्य काल',
          badgeEn: '⏳ Routine Only',
          descriptionHi: 'नया कार्य या जोखिम भरा निर्णय टालें • नियमित नित्य कर्म व मौन चिंतन करें',
          descriptionEn: 'Avoid new risky projects • Continue routine work and prayer',
          accentColor: '#ea580c',
          badgeBg: '#ffedd5',
          startTime: start,
          endTime: end,
        };
    }
  }

  return {
    statusType: 'shubh',
    titleHi: 'शुभ दिनचर्या काल',
    titleEn: 'Auspicious Daily Time',
    windowHi: 'नित्य कर्म',
    windowEn: 'Daily Routine',
    badgeHi: 'सत्कर्म',
    badgeEn: 'Routine',
    descriptionHi: 'ईश्वर स्मरण के साथ अपने नित्य कर्म सम्पन्न करें',
    descriptionEn: 'Carry out daily duties with mindful focus',
    accentColor: '#f59e0b',
    badgeBg: '#fef3c7',
    startTime: now,
    endTime: new Date(now.getTime() + 60 * 60 * 1000),
  };
}

export function buildDayPlannerSlots(panchang: PanchangData, now: Date = new Date()): DayPlannerSlot[] {
  const slots: DayPlannerSlot[] = [];
  const nowMs = now.getTime();

  const isCurrentTime = (start: Date, end: Date) => {
    return nowMs >= start.getTime() && nowMs < end.getTime();
  };

  const sunrise = new Date(panchang.sunTimes.sunrise);
  const sunset = new Date(panchang.sunTimes.sunset);

  // 1. Brahma Muhurta
  const bm = panchang.muhurtas.brahmaMuhurta;
  const bmStart = bm ? new Date(bm.startTime) : new Date(sunrise.getTime() - 96 * 60 * 1000);
  const bmEnd = bm ? new Date(bm.endTime) : new Date(sunrise.getTime() - 48 * 60 * 1000);

  slots.push({
    id: 'brahma_muhurta',
    title: 'Brahma Muhurta',
    titleHi: 'ब्रह्म मुहूर्त (अमृत वेला)',
    startTime: bmStart,
    endTime: bmEnd,
    quality: 'Mahashubh',
    suitability: 'Supreme for meditation, pranayama, spiritual study, chanting, and high-clarity creative thinking.',
    suitabilityHi: 'सृष्टि की शुद्धतम सात्विक ऊर्जा। ध्यान, प्राणायाम, मन्त्र जप, वेद-गीता स्वाध्याय एवं आत्म-चिंतन हेतु सर्वोत्तम समय।',
    suggestedTasks: ['Meditation & Japa', 'Gita Study', 'Morning Walk & Yoga'],
    suggestedTasksHi: ['ध्यान व मन्त्र जप', 'गीता स्वाध्याय', 'प्रातः योग व चिंतन'],
    isCore: true,
    isCurrent: isCurrentTime(bmStart, bmEnd),
  });

  // 2. Ushah Sandhya & Sunrise
  slots.push({
    id: 'pratah_sandhya',
    title: 'Pratah Sandhya & Arghya',
    titleHi: 'उषा काल व प्रातः संध्या (सूर्य अर्घ्य)',
    startTime: bmEnd,
    endTime: sunrise,
    quality: 'Shubh',
    suitability: 'Offering Surya Arghya, Gayatri Mantra, home temple puja, setting positive intentions.',
    suitabilityHi: 'उषा काल: शौच, दन्तधावन, स्नान, सूर्य अर्घ्य, गायत्री जप, मन्दिर पूजा, दीप प्रज्वलन व दिन के शुभ संकल्प हेतु उपयुक्त।',
    suggestedTasks: ['Surya Arghya', 'Daily Puja', 'Morning Affirmations'],
    suggestedTasksHi: ['सूर्य अर्घ्य व गायत्री', 'दैनिक पूजा व दीप', 'दैनिक संकल्प'],
    isCore: true,
    isCurrent: isCurrentTime(bmEnd, sunrise),
  });

  // 3. Daytime Slots
  const rk = panchang.muhurtas.rahuKaal;
  const rkStartMs = rk ? new Date(rk.startTime).getTime() : -1;

  const ab = panchang.muhurtas.abhijitMuhurta;
  const abStart = ab ? new Date(ab.startTime) : null;
  const abEnd = ab ? new Date(ab.endTime) : null;

  panchang.choghadiya.day.forEach((ch, idx) => {
    const chStart = new Date(ch.startTime);
    const chEnd = new Date(ch.endTime);
    const isRahu = rk && Math.abs(chStart.getTime() - rkStartMs) < 60000;

    let quality: DayPlannerSlot['quality'] = 'Neutral';
    let suitability = '';
    let suitabilityHi = '';
    let suggestedTasks: string[] = [];
    let suggestedTasksHi: string[] = [];
    let isCore = false;

    switch (ch.quality) {
      case 'Amrit':
        quality = 'Amrit';
        isCore = true;
        suitability = 'Nectar hours: All auspicious beginnings, education, medicine, spiritual rituals & signing.';
        suitabilityHi = 'अमृत वेला: समस्त शुभ कार्य आरम्भ, विद्या, औषधि सेवन, देव पूजन व महत्वपूर्ण निर्णय।';
        suggestedTasks = ['Start Key Work', 'Medical Intake', 'Important Learning'];
        suggestedTasksHi = ['महत्वपूर्ण कार्य आरम्भ', 'औषधि सेवन', 'विद्याभ्यास'];
        break;
      case 'Shubh':
        quality = 'Shubh';
        isCore = true;
        suitability = 'Auspicious: Religious ceremonies, meetings, partnerships, and relationship building.';
        suitabilityHi = 'शुभ समय: धार्मिक उत्सव, महत्वपूर्ण बैठक, नए सम्बन्ध निर्माण व कार्य सम्पादन।';
        suggestedTasks = ['Important Meeting', 'Social Engagements', 'Auspicious Plan'];
        suggestedTasksHi = ['महत्वपूर्ण बैठक', 'धार्मिक अनुष्ठान', 'नवीन कार्य योजना'];
        break;
      case 'Labh':
        quality = 'Labh';
        isCore = true;
        suitability = 'Profitable: Commerce, investments, sales, accounts, trades, and financial transactions.';
        suitabilityHi = 'लाभ काल: व्यापार, वाणिज्य, आर्थिक निवेश, क्रय-विक्रय व व्यावसायिक सौदों हेतु फलदायी।';
        suggestedTasks = ['Business Negotiations', 'Financial Trade', 'Purchases'];
        suggestedTasksHi = ['व्यापारिक वार्ता', 'आर्थिक लेन-देन', 'व्यापार विस्तार'];
        break;
      case 'Char':
        quality = 'Char';
        suitability = 'Movement: Travel, dynamic shifts, transport, deliveries, communication, and sports.';
        suitabilityHi = 'चर वेला: यात्रा, वाहन चालन, भ्रमण, संचार, सम्प्रेषण व गतिशीलता से जुड़े कार्य।';
        suggestedTasks = ['Travel / Commute', 'Outreach / Calls', 'Logistics'];
        suggestedTasksHi = ['यात्रा व भ्रमण', 'कॉल व पत्राचार', 'गतिशील कार्य'];
        break;
      case 'Rog':
      case 'Kaal':
      case 'Udveg':
      default:
        quality = 'Ashubh';
        suitability = 'Inauspicious: Prone to conflict or anxiety. Best for routine chores and quiet focus only.';
        suitabilityHi = 'विघ्नकारी समय: नया कार्य आरम्भ न करें। केवल नियमित दैनिक कार्य व मौन चिंतन करें।';
        suggestedTasks = ['Routine Tasks', 'Personal Rest', 'Japa & Peace'];
        suggestedTasksHi = ['नियमित सामान्य कार्य', 'विश्राम व मौन', 'मन्त्र जप'];
        break;
    }

    if (isRahu) {
      slots.push({
        id: 'rahu_kaal',
        title: `Rahu Kaal (${ch.name})`,
        titleHi: `राहु काल (सावधानी वेला • ${ch.nameDevanagari})`,
        startTime: chStart,
        endTime: chEnd,
        quality: 'Ashubh',
        suitability: 'Caution: Strictly avoid starting new ventures, signing contracts, travel, or financial speculation.',
        suitabilityHi: 'त्याज्य समय: नया उद्यम आरम्भ, धन निवेश, यात्रा या शुभ कार्य कदापि न करें। केवल विश्राम व नियमित कर्म करें।',
        suggestedTasks: ['Routine Chores', 'Internal Reflection', 'Mantra Japa'],
        suggestedTasksHi: ['नियमित सामान्य कार्य', 'विश्राम व मौन', 'आत्म-चिंतन व मन्त्र जप'],
        isCore: true,
        isCurrent: isCurrentTime(chStart, chEnd),
      });
      return;
    }

    if (abStart && abEnd && chStart.getTime() < abStart.getTime() && chEnd.getTime() > abStart.getTime()) {
      slots.push({
        id: `choghadiya_day_${idx}`,
        title: `${ch.name} (${ch.quality})`,
        titleHi: `${ch.nameDevanagari} चौघड़िया (${ch.quality === 'Amrit' ? 'अमृत' : ch.quality === 'Shubh' ? 'शुभ' : ch.quality === 'Labh' ? 'लाभ' : ch.quality === 'Char' ? 'चर' : 'सामान्य'})`,
        startTime: chStart,
        endTime: abStart,
        quality,
        suitability,
        suitabilityHi,
        suggestedTasks,
        suggestedTasksHi,
        isCore,
        isCurrent: isCurrentTime(chStart, abStart),
      });

      slots.push({
        id: 'abhijit_muhurta',
        title: 'Abhijit Muhurta',
        titleHi: 'अभिजित मुहूर्त (महाशुभ विजय काल)',
        startTime: abStart,
        endTime: abEnd,
        quality: 'Mahashubh',
        suitability: 'Supreme window ruled by Lord Vishnu. Destroys all doshas; ideal for vital launches, agreements & decisions.',
        suitabilityHi: 'भगवान विष्णु का परम प्रिय काल। समस्त दोषों का शमन; अति महत्वपूर्ण निर्णय, नया अनुबंध हस्ताक्षर व प्रमुख कार्य शुभारम्भ।',
        suggestedTasks: ['Decisive Decision', 'Sign Agreement', 'Major Launch'],
        suggestedTasksHi: ['निर्णायक निर्णय', 'नया अनुबंध हस्ताक्षर', 'प्रमुख कार्य शुभारम्भ'],
        isCore: true,
        isCurrent: isCurrentTime(abStart, abEnd),
      });
      return;
    }

    if (abStart && abEnd && chStart.getTime() < abEnd.getTime() && chEnd.getTime() > abEnd.getTime()) {
      slots.push({
        id: `choghadiya_day_${idx}`,
        title: `${ch.name} (${ch.quality})`,
        titleHi: `${ch.nameDevanagari} चौघड़िया (${ch.quality === 'Amrit' ? 'अमृत' : ch.quality === 'Shubh' ? 'शुभ' : ch.quality === 'Labh' ? 'लाभ' : ch.quality === 'Char' ? 'चर' : 'सामान्य'})`,
        startTime: abEnd,
        endTime: chEnd,
        quality,
        suitability,
        suitabilityHi,
        suggestedTasks,
        suggestedTasksHi,
        isCore,
        isCurrent: isCurrentTime(abEnd, chEnd),
      });
      return;
    }

    slots.push({
      id: `choghadiya_day_${idx}`,
      title: `${ch.name} (${ch.quality})`,
      titleHi: `${ch.nameDevanagari} चौघड़िया (${ch.quality === 'Amrit' ? 'अमृत' : ch.quality === 'Shubh' ? 'शुभ' : ch.quality === 'Labh' ? 'लाभ' : ch.quality === 'Char' ? 'चर' : 'सामान्य'})`,
      startTime: chStart,
      endTime: chEnd,
      quality,
      suitability,
      suitabilityHi,
      suggestedTasks,
      suggestedTasksHi,
      isCore,
      isCurrent: isCurrentTime(chStart, chEnd),
    });
  });

  // 4. Godhuli & Sayam Sandhya
  const godhuliEnd = new Date(sunset.getTime() + 48 * 60 * 1000);
  slots.push({
    id: 'godhuli_sandhya',
    title: 'Godhuli Vela & Evening Lamp',
    titleHi: 'गोधूलि वेला व सायं दीप (सन्ध्या काल)',
    startTime: sunset,
    endTime: godhuliEnd,
    quality: 'Shubh',
    suitability: 'Sacred dusk: Lighting evening lamp at Tulsi/Altar, Aarti, Hanuman Chalisa, family togetherness.',
    suitabilityHi: 'गोधूलि वेला: तुलसी व मन्दिर में दीप प्रज्वलन, सायं आरती, हनुमान चालीसा व परिवार संग शान्ति।',
    suggestedTasks: ['Light Evening Lamp', 'Hanuman Chalisa', 'Family Harmony'],
    suggestedTasksHi: ['तुलसी दीप प्रज्वलन', 'श्री हनुमान चालीसा', 'सायं आरती व परिवार संग समय'],
    isCore: true,
    isCurrent: isCurrentTime(sunset, godhuliEnd),
  });

  // 5. Evening Choghadiyas
  const eveningEnd = new Date(sunset.getFullYear(), sunset.getMonth(), sunset.getDate(), 22, 0, 0);
  if (eveningEnd.getTime() > godhuliEnd.getTime()) {
    const midEvening = new Date(godhuliEnd.getTime() + (eveningEnd.getTime() - godhuliEnd.getTime()) / 2);

    slots.push({
      id: 'evening_swadhyaya',
      title: 'Sayam Swadhyaya & Family Time',
      titleHi: 'सायं स्वाध्याय व परिवार संवाद',
      startTime: godhuliEnd,
      endTime: midEvening,
      quality: 'Shubh',
      suitability: 'Ideal for reading scriptures, Gita contemplation, satvik dinner, and peaceful family interaction.',
      suitabilityHi: 'सद्ग्रन्थ स्वाध्याय, गीता मनन, सात्विक रात्रिभोज व परिवार संग मधुर संवाद हेतु अनुकूल।',
      suggestedTasks: ['Gita Study', 'Satvik Dinner', 'Mindful Reading'],
      suggestedTasksHi: ['गीता स्वाध्याय', 'सात्विक रात्रिभोज', 'सद्ग्रन्थ पठन'],
      isCore: false,
      isCurrent: isCurrentTime(godhuliEnd, midEvening),
    });

    slots.push({
      id: 'night_rest_prep',
      title: 'Ratri Shanti & Next Day Planning',
      titleHi: 'रात्रि शान्ति व आगामी दिवस नियोजन',
      startTime: midEvening,
      endTime: eveningEnd,
      quality: 'Neutral',
      suitability: 'Winding down mental activity, planning the next day, listening to soft sacred music or chants.',
      suitabilityHi: 'मानसिक विश्राम, अगले दिन की कार्य योजना, शांत मन्त्र श्रवण व तनाव मुक्ति हेतु उपयुक्त।',
      suggestedTasks: ['Plan Tomorrow', 'Sacred Music', 'Mental Detachment'],
      suggestedTasksHi: ['कल की योजना', 'मन्त्र श्रवण', 'शान्त चिंतन'],
      isCore: false,
      isCurrent: isCurrentTime(midEvening, eveningEnd),
    });
  }

  // 6. Shayan & Night Rest
  const nextBrahmaStart = new Date(bmStart.getTime() + 24 * 60 * 60 * 1000);
  const shayanStart = eveningEnd.getTime() > godhuliEnd.getTime() ? eveningEnd : godhuliEnd;

  slots.push({
    id: 'shayan_nidra',
    title: 'Shayan & Night Rest',
    titleHi: 'शयन व रात्रि विश्राम (दिन समीक्षा)',
    startTime: shayanStart,
    endTime: nextBrahmaStart,
    quality: 'Neutral',
    suitability: 'Peaceful restorative sleep. Review the day, surrender outcomes to the Divine, and recharge body and soul.',
    suitabilityHi: 'स्वास्थ्यप्रद शांत निद्रा। दिनभर के कर्मों की समीक्षा, ईश्वर के प्रति कृतज्ञता व समर्पण तथा आत्म-पुनरुत्थान।',
    suggestedTasks: ['Day Reflection', 'Gratitude to Divine', 'Restful Sleep'],
    suggestedTasksHi: ['दिन समीक्षा व क्षमा प्रार्थना', 'ईश्वर कृतज्ञता व समर्पण', 'शांत निद्रा व विश्राम'],
    isCore: true,
    isCurrent: isCurrentTime(shayanStart, nextBrahmaStart),
  });

  slots.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  return slots;
}

export function generateWhatsAppPanchangShare(
  panchang: PanchangData,
  date: Date,
  locationName: string,
  timezone: string = 'Asia/Kolkata',
  isHi: boolean = true
): string {
  const formatTime = (d: Date | string | null): string => {
    if (!d) return '—';
    const dateObj = typeof d === 'string' ? new Date(d) : d;
    try {
      return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone,
      }).format(dateObj);
    } catch {
      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const dayOfWeekNamesHi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const dayNameHi = dayOfWeekNamesHi[date.getDay()];

  const dateFormatted = date.toLocaleDateString(isHi ? 'hi-IN' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const abhijitStr = panchang.muhurtas.abhijitMuhurta
    ? `${formatTime(panchang.muhurtas.abhijitMuhurta.startTime)} - ${formatTime(panchang.muhurtas.abhijitMuhurta.endTime)}`
    : '—';

  const rahuStr = panchang.muhurtas.rahuKaal
    ? `${formatTime(panchang.muhurtas.rahuKaal.startTime)} - ${formatTime(panchang.muhurtas.rahuKaal.endTime)}`
    : '—';

  const amritCh = panchang.choghadiya.day.find((c) => c.quality === 'Amrit');
  const amritStr = amritCh
    ? `${formatTime(amritCh.startTime)} - ${formatTime(amritCh.endTime)}`
    : '—';

  const shubhCh = panchang.choghadiya.day.find((c) => c.quality === 'Shubh');
  const shubhStr = shubhCh
    ? `${formatTime(shubhCh.startTime)} - ${formatTime(shubhCh.endTime)}`
    : '—';

  if (!isHi) {
    return `🕉️ *Daily Vedic Panchang & Auspicious Muhurtas* 🕉️
📍 *City:* ${locationName}
📅 *Date:* ${dateFormatted} (${date.toLocaleDateString('en-US', { weekday: 'long' })})

🚩 *Samvat:* Vikram ${panchang.samvat.vikramSamvat}
🌸 *Month:* ${panchang.masa.purnimantaName} (${panchang.tithi.current.paksha} Paksha)
✨ *Tithi:* ${panchang.tithi.current.name} (ends ${formatTime(panchang.tithi.endTime)})
⭐ *Nakshatra:* ${panchang.nakshatra.current.name}
🪐 *Yoga:* ${panchang.yoga.current.name} | *Karana:* ${panchang.karana.current.name}

🌅 *Sunrise:* ${formatTime(panchang.sunTimes.sunrise)} | 🌇 *Sunset:* ${formatTime(panchang.sunTimes.sunset)}

🌟 *Golden Muhurtas (Best for Beginnings):*
• *Abhijit Muhurta:* ${abhijitStr} (Supreme Victory)
• *Amrit Choghadiya:* ${amritStr}
• *Shubh Choghadiya:* ${shubhStr}

⚠️ *Caution Window (Avoid Starting Important Work):*
• *Rahu Kaal:* ${rahuStr}

🎯 *Plan your day according to Vedic Muhurta:*
👉 https://sanatan.cc

_May the Supreme Divine bless your day!_ 🙏`;
  }

  return `🕉️ *श्री गणेशाय नमः | शुभ प्रभात* 🕉️
📜 *दैनिक वैदिक पञ्चाङ्ग एवं शुभ मुहूर्त* 📜
📍 *स्थान:* ${locationName}
📅 *दिनांक:* ${dayNameHi}, ${dateFormatted}

🚩 *सम्वत्:* विक्रम सम्वत् ${panchang.samvat.vikramSamvat}
🌸 *मास:* ${panchang.masa.purnimantaNameDevanagari} मास (${panchang.tithi.current.pakshaDevanagari})
✨ *तिथि:* ${panchang.tithi.current.nameDevanagari} (समाप्ति ${formatTime(panchang.tithi.endTime)})
⭐ *नक्षत्र:* ${panchang.nakshatra.current.nameDevanagari}
🪐 *योग:* ${panchang.yoga.current.nameDevanagari} | *करण:* ${panchang.karana.current.nameDevanagari}

🌅 *सूर्योदय:* ${formatTime(panchang.sunTimes.sunrise)} | 🌇 *सूर्यास्त:* ${formatTime(panchang.sunTimes.sunset)}

🌟 *आज के शुभ मुहूर्त (कार्य आरम्भ हेतु श्रेष्ठ):*
• *अभिजित मुहूर्त:* ${abhijitStr} (सर्वदोष नाशक)
• *अमृत चौघड़िया:* ${amritStr}
• *शुभ चौघड़िया:* ${shubhStr}

⚠️ *अशुभ काल (नए कार्य टालें):*
• *राहु काल:* ${rahuStr}

🎯 *मुहूर्तानुसार आज की दिनचर्या बनाएं:*
👉 https://sanatan.cc

_सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः_ 🙏`;
}
