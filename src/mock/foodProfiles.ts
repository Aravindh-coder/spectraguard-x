import { FoodProfile } from '../types/spectraguard';

export const FOOD_PROFILES: FoodProfile[] = [
  {
    id: 'rice_basmati',
    name: 'Basmati Rice (Grade A)',
    category: 'Grains & Cereals',
    description: 'High-purity long-grain rice. Sensitive to chalkiness, moisture variation (1450nm), and aflatoxin organic fluorescing molds.',
    peakWavelengthsNm: [980, 1210, 1450, 1660],
    spectralTolerancePct: 4.5,
    expectedSnrDb: 46.2,
    nominalMoisturePct: 12.4,
    nominalLipidPct: 0.8,
    nominalProteinPct: 8.2
  },
  {
    id: 'wheat_durum',
    name: 'Durum Wheat Grains',
    category: 'Grains & Cereals',
    description: 'Hard Amber Wheat. Inspected for ergots, fusarium head blight, plastic pellets, and metallic mill residue.',
    peakWavelengthsNm: [990, 1190, 1440, 1680],
    spectralTolerancePct: 5.0,
    expectedSnrDb: 44.8,
    nominalMoisturePct: 11.8,
    nominalLipidPct: 2.1,
    nominalProteinPct: 13.5
  },
  {
    id: 'almonds_cashews',
    name: 'Almonds & Nut Kernels',
    category: 'Nuts & Seeds',
    description: 'High lipid content (1210nm). High-risk profile for dangerous Aflatoxin B1 fungal contamination (UV 365nm fluorescence).',
    peakWavelengthsNm: [920, 1210, 1430, 1710],
    spectralTolerancePct: 6.2,
    expectedSnrDb: 42.5,
    nominalMoisturePct: 4.2,
    nominalLipidPct: 49.8,
    nominalProteinPct: 21.2
  },
  {
    id: 'strawberries_fresh',
    name: 'Fresh Strawberries',
    category: 'Fruits & Produce',
    description: 'High moisture (95%). Inspected for botrytis mold spores, internal bruising, pesticide residue, and stone/soil debris.',
    peakWavelengthsNm: [970, 1180, 1450, 1620],
    spectralTolerancePct: 7.0,
    expectedSnrDb: 41.0,
    nominalMoisturePct: 91.5,
    nominalLipidPct: 0.3,
    nominalProteinPct: 0.7
  },
  {
    id: 'meat_poultry',
    name: 'Diced Poultry & Meat',
    category: 'Meat & Protein',
    description: 'Fresh poultry inspection. Detects micro-bone fragments, cartilage, fat-to-lean ratios, and bacterial biofilms.',
    peakWavelengthsNm: [930, 1210, 1460, 1650],
    spectralTolerancePct: 5.5,
    expectedSnrDb: 43.0,
    nominalMoisturePct: 75.0,
    nominalLipidPct: 5.4,
    nominalProteinPct: 22.8
  },
  {
    id: 'corn_snack',
    name: 'Extruded Corn Snacks',
    category: 'Processed Snacks',
    description: 'High-speed baked snack line. Checks oil distribution, over-baking burnt spots, and foreign polymer film contamination.',
    peakWavelengthsNm: [950, 1205, 1420, 1690],
    spectralTolerancePct: 6.0,
    expectedSnrDb: 45.0,
    nominalMoisturePct: 2.1,
    nominalLipidPct: 28.5,
    nominalProteinPct: 6.4
  },
  {
    id: 'dairy_powder',
    name: 'Skim Milk Powder',
    category: 'Dairy Products',
    description: 'Infant grade milk powder. Monitored for adulterants (melamine 1520nm overtone), scorching, and foreign metal filings.',
    peakWavelengthsNm: [960, 1200, 1450, 1520],
    spectralTolerancePct: 3.8,
    expectedSnrDb: 48.0,
    nominalMoisturePct: 3.5,
    nominalLipidPct: 1.2,
    nominalProteinPct: 35.0
  }
];
