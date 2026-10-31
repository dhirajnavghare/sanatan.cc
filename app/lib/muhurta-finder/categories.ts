import { MuhurtaCategoryMeta, MuhurtaCategoryId } from './types';

export const MUHURTA_CATEGORIES: MuhurtaCategoryMeta[] = [
  {
    id: 'griha_pravesh',
    title: 'Griha Pravesh',
    titleDevanagari: 'गृह प्रवेश',
    icon: '🏠',
    description: 'Auspicious entry into a newly constructed, purchased, or renovated home.',
    traditionalReference: 'Muhurta Chintamani, Griha Pravesh Prakarana',
  },
  {
    id: 'vivaha',
    title: 'Vivaha / Marriage',
    titleDevanagari: 'विवाह संस्कार',
    icon: '💍',
    description: 'Vedic marriage ceremony and sacred bond establishment.',
    traditionalReference: 'Muhurta Ganapati & Brihat Samhita, Vivaha Adhyaya',
  },
  {
    id: 'vehicle_purchase',
    title: 'Vehicle Purchase',
    titleDevanagari: 'वाहन क्रय',
    icon: '🚗',
    description: 'Buying a two-wheeler, four-wheeler, or commercial vehicle for longevity and safety.',
    traditionalReference: 'Kalaprakasika, Yana-Vahana Adhyaya',
  },
  {
    id: 'business_start',
    title: 'Business & Shop Opening',
    titleDevanagari: 'व्यापार एवं प्रतिष्ठान आरम्भ',
    icon: '🏢',
    description: 'Starting a new venture, opening an office, shop, or signing major partnerships.',
    traditionalReference: 'Muhurta Chintamani, Vyapararambha',
  },
  {
    id: 'property_purchase',
    title: 'Property & Registry',
    titleDevanagari: 'भूमि एवं सम्पत्ति रजिस्ट्री',
    icon: '📜',
    description: 'Buying land, registering property, or signing deeds for long-term stability.',
    traditionalReference: 'Muhurta Dipika, Bhumi-Sampatti Prakarana',
  },
  {
    id: 'gold_purchase',
    title: 'Gold & Assets Buying',
    titleDevanagari: 'स्वर्ण एवं आभूषण क्रय',
    icon: '🪙',
    description: 'Purchasing gold, precious metals, gems, and long-term appreciating wealth.',
    traditionalReference: 'Brihat Samhita, Ratna-Dravya Samgraha',
  },
  {
    id: 'namakarana',
    title: 'Namakarana (Naming)',
    titleDevanagari: 'नामकरण संस्कार',
    icon: '👶',
    description: 'Auspicious sacred naming ceremony for a newborn infant.',
    traditionalReference: 'Paraskara Grihya Sutra, Namakarana Vidhi',
  },
  {
    id: 'sarvartha_siddhi',
    title: 'All Auspicious Works',
    titleDevanagari: 'सर्वार्थ सिद्धि / अमृत सिद्धि',
    icon: '✨',
    description: 'Universal high-power yogas for beginning any significant or vital undertaking.',
    traditionalReference: 'Muhurta Chintamani, Sarvartha Siddhi Prakarana',
  },
];

export const MUHURTA_CATEGORY_MAP: Record<MuhurtaCategoryId, MuhurtaCategoryMeta> =
  MUHURTA_CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {} as Record<MuhurtaCategoryId, MuhurtaCategoryMeta>);

export function getMuhurtaCategoryMeta(id: MuhurtaCategoryId): MuhurtaCategoryMeta {
  return MUHURTA_CATEGORY_MAP[id] || MUHURTA_CATEGORIES[0];
}
