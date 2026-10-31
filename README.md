# sanatan.cc Repository

[![License: CC0-1.0](https://shields.io)](http://creativecommons.org)

An open-source repository dedicated to preserving and sharing Hindu Dharma spiritual texts, articles, content, and applications for sanatan.cc.

## Applications

### 🕉️ Panchang — High-Precision Vedic Ephemeris & Calendar (`/panchang`)

A world-class, purely calculation-based Hindu Panchang engine designed for maximum astronomical precision without hardcoded tables:

- **True Coordinates & Elevation Input**: Computes ephemeris for exact observer **Latitude**, **Longitude**, **Altitude/Elevation** (accounting for geometric horizon dip), and **Timezone**, with 1-click GPS auto-detection.
- **Pure Ephemeris Math**:
  - Solar ephemeris using high-precision VSOP87 series.
  - Lunar ephemeris using Chapront ELP-2000 periodic perturbation theory (over 50 perturbation terms).
  - High-precision root finding ($<1$ second resolution) for solilunar elongation and sidereal transit times.
- **Pancha-Anga (5 Core Limbs)**:
  - **Tithi** (calculated from continuous elongation $\lambda_{Moon} - \lambda_{Sun}$, exact end timestamp, progress bar, deity, next tithi).
  - **Nakshatra** (sidereal longitude with Lahiri ayanamsa, Pada 1–4 calculation, ruling planet, deity, exact end timestamp).
  - **Yoga** (solilunar combination $\lambda_{Moon} + \lambda_{Sun}$, auspicious/inauspicious classifications, exact end timestamp).
  - **Karana** (half-tithi divisions, chara/sthira distinctions, deities).
  - **Vara** (sunrise-based Vedic solar weekday).
- **Muhurtas & Kaalas**:
  - Auspicious: Brahma Muhurta, Pratah Sandhya, Abhijit Muhurta, Vijaya Muhurta, Godhuli, Sayahna Sandhya, Amrit Kaalam, Nishita Kaal.
  - Inauspicious: Rahu Kaal, Yamaganda, Gulika Kaal, Dur Muhurtam, Varjyam (Tyajya).
- **Choghadiya**: 8-period daytime and nighttime Choghadiya (Amrit, Shubh, Labh, Char, Rog, Kaal, Udveg) with live indicators and planetary rulers.
- **Zodiac & Calendars**: Sidereal Surya Rashi (Sankranti), Chandra Rashi, Amanta & Purnimanta Lunar Months (with Adhika Masa detection), Vikram Samvat, Shaka Samvat, Kaliyuga year, Ayana, and Ritu.
- **Vedic Festivals & Vrats**: Dynamic Vyapti rules (Suryodaya, Madhyahna, Aparahna, Pradosha, Nishita) with upcoming major festival countdowns.
- **Ayanamsa Models**: Default authoritative Lahiri (Chitra Paksha), with support for True Chitra, KP (Krishnamurti), Raman, and Sayana (Tropical).

## License
To the extent possible under law, sanatan.cc has waived all copyright and related or neighbouring rights to the content and applications in this repository under the CC0 1.0 Universal Public Domain Dedication. You are completely free to use, copy, modify, distribute, and build upon this work for any purpose, including commercial ones, without asking permission.
