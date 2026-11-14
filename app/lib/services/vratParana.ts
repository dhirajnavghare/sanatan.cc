import { PanchangData, GeoLocation } from '../panchang/types';
import { calculatePanchang } from '../panchang';

export interface VratParanaDetails {
  isEkadashi: boolean;
  isDwadashi: boolean;
  paranaDate: Date;
  startTime: Date;
  endTime: Date;
  startTimeFormatted: string;
  endTimeFormatted: string;
  hariVasaraEndTime?: Date;
  dwadashiEndTime?: Date;
  guidanceHi: string;
  guidanceEn: string;
  vratNameHi: string;
  vratNameEn: string;
}

/**
 * Calculates Shastric Ekadashi Parana (fast breaking) time window.
 * 
 * Rules per Padma Purana & Hari Bhakti Vilasa:
 * 1. Parana must be performed after Sunrise on Dwadashi.
 * 2. Parana must NOT be done during Hari Vasara (first 1/4th of Dwadashi duration).
 * 3. Parana must be done before Dwadashi tithi ends, if Dwadashi ends before noon.
 * 4. If Dwadashi lasts past noon, Parana must be done during Pratah-Kala (morning window).
 */
export function calculateEkadashiParana(
  panchang: PanchangData,
  location: GeoLocation,
  referenceDate: Date = new Date()
): VratParanaDetails | null {
  try {
    const currentTithiIndex = panchang.tithi.current.pakshaIndex; // 1 to 15
    const isTodayEkadashi = currentTithiIndex === 11;
    const isTodayDwadashi = currentTithiIndex === 12;

    if (!isTodayEkadashi && !isTodayDwadashi) {
      return null;
    }

    const targetDate = isTodayEkadashi
      ? new Date(referenceDate.getTime() + 24 * 3600 * 1000)
      : new Date(referenceDate);

    const dwadashiPanchang = isTodayDwadashi
      ? panchang
      : calculatePanchang(targetDate, location);

    const sunrise = new Date(dwadashiPanchang.sunTimes.sunrise);
    const sunset = new Date(dwadashiPanchang.sunTimes.sunset);
    const dayLengthMs = sunset.getTime() - sunrise.getTime();

    const dwadashiEndTime = dwadashiPanchang.tithi.endTime
      ? new Date(dwadashiPanchang.tithi.endTime)
      : undefined;

    let hariVasaraEndTime: Date | undefined;
    if (dwadashiEndTime) {
      const estimatedDwadashiStart = new Date(dwadashiEndTime.getTime() - 24 * 3600 * 1000);
      const dwadashiDurationMs = dwadashiEndTime.getTime() - estimatedDwadashiStart.getTime();
      const hariVasaraDurationMs = dwadashiDurationMs / 4;
      hariVasaraEndTime = new Date(estimatedDwadashiStart.getTime() + hariVasaraDurationMs);
    }

    let paranaStart = new Date(sunrise);
    if (hariVasaraEndTime && hariVasaraEndTime.getTime() > sunrise.getTime()) {
      paranaStart = new Date(hariVasaraEndTime);
    }

    const noon = new Date(sunrise.getTime() + dayLengthMs / 2);
    let paranaEnd = new Date(sunrise.getTime() + 0.3 * dayLengthMs); // default morning window

    if (dwadashiEndTime) {
      if (dwadashiEndTime.getTime() < noon.getTime()) {
        paranaEnd = new Date(dwadashiEndTime);
      } else {
        paranaEnd = new Date(sunrise.getTime() + 0.35 * dayLengthMs);
      }
    }

    if (paranaEnd.getTime() <= paranaStart.getTime()) {
      paranaEnd = new Date(paranaStart.getTime() + 2 * 3600 * 1000);
    }

    const formatTime = (d: Date): string => {
      try {
        return new Intl.DateTimeFormat('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: location.timezone,
        }).format(d);
      } catch {
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    };

    const isShukla = panchang.tithi.current.paksha === 'Shukla';
    const vratNameHi = `${panchang.masa.purnimantaNameDevanagari} ${isShukla ? 'शुक्ल' : 'कृष्ण'} एकादशी`;
    const vratNameEn = `${panchang.masa.purnimantaName} ${isShukla ? 'Shukla' : 'Krishna'} Ekadashi`;

    const guidanceHi = isTodayDwadashi
      ? `द्वादशी तिथि पर पारण मुहूर्त: प्रातः ${formatTime(paranaStart)} से ${formatTime(paranaEnd)} के मध्य सात्विक अन्न, तुलसी दल व जल ग्रहण कर व्रत पूर्ण करें।`
      : `कल द्वादशी को पारण का शुभ समय प्रातः ${formatTime(paranaStart)} से ${formatTime(paranaEnd)} तक रहेगा।`;

    const guidanceEn = isTodayDwadashi
      ? `Parana on Dwadashi: Break fast between ${formatTime(paranaStart)} and ${formatTime(paranaEnd)} with Tulsi leaf, water, and satvik meal.`
      : `Tomorrow Dwadashi Parana window is from ${formatTime(paranaStart)} to ${formatTime(paranaEnd)}.`;

    return {
      isEkadashi: isTodayEkadashi,
      isDwadashi: isTodayDwadashi,
      paranaDate: targetDate,
      startTime: paranaStart,
      endTime: paranaEnd,
      startTimeFormatted: formatTime(paranaStart),
      endTimeFormatted: formatTime(paranaEnd),
      hariVasaraEndTime,
      dwadashiEndTime,
      guidanceHi,
      guidanceEn,
      vratNameHi,
      vratNameEn,
    };
  } catch {
    return null;
  }
}
