import type {
  FlavorScores,
  RoastLevel,
  BrewingMethod,
} from "../types/coffee";
import type { DiagnosisRecord } from "./storage";

export type DiagnosisStats = {
  totalDiagnoses: number;
  averageFlavorProfile: FlavorScores;
  topRecommendedCoffees: { coffeeId: string; count: number }[];
  preferredRoastLevels: { level: RoastLevel; count: number }[];
  preferredBrewingMethods: { method: BrewingMethod; count: number }[];
  flavorTrend: { date: string; profile: FlavorScores }[];
  modeDistribution: { mode: string; count: number }[];
};

const FLAVOR_KEYS: (keyof FlavorScores)[] = [
  "bitterness",
  "acidity",
  "sweetness",
  "body",
  "fruitiness",
  "floral",
  "nuttiness",
  "chocolaty",
  "roastiness",
  "cleanness",
  "aftertaste",
  "balance",
];

function emptyFlavorScores(): FlavorScores {
  return {
    bitterness: 0,
    acidity: 0,
    sweetness: 0,
    body: 0,
    fruitiness: 0,
    floral: 0,
    nuttiness: 0,
    chocolaty: 0,
    roastiness: 0,
    cleanness: 0,
    aftertaste: 0,
    balance: 0,
  };
}

export function calculateStats(records: DiagnosisRecord[]): DiagnosisStats {
  const totalDiagnoses = records.length;

  if (totalDiagnoses === 0) {
    return {
      totalDiagnoses: 0,
      averageFlavorProfile: emptyFlavorScores(),
      topRecommendedCoffees: [],
      preferredRoastLevels: [],
      preferredBrewingMethods: [],
      flavorTrend: [],
      modeDistribution: [],
    };
  }

  // 平均味覚プロファイル
  const sum = emptyFlavorScores();
  for (const record of records) {
    for (const key of FLAVOR_KEYS) {
      sum[key] += record.userFlavorProfile[key];
    }
  }
  const averageFlavorProfile = emptyFlavorScores();
  for (const key of FLAVOR_KEYS) {
    averageFlavorProfile[key] = Math.round((sum[key] / totalDiagnoses) * 10) / 10;
  }

  // よく推薦されるコーヒー TOP5
  const coffeeCount = new Map<string, number>();
  for (const record of records) {
    const topMatch = record.result.topMatches[0];
    if (topMatch) {
      coffeeCount.set(
        topMatch.coffeeId,
        (coffeeCount.get(topMatch.coffeeId) ?? 0) + 1,
      );
    }
  }
  const topRecommendedCoffees = Array.from(coffeeCount.entries())
    .map(([coffeeId, count]) => ({ coffeeId, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 焙煎度の分布
  const roastCount = new Map<RoastLevel, number>();
  for (const record of records) {
    const roast = record.result.recommendedRoast;
    roastCount.set(roast, (roastCount.get(roast) ?? 0) + 1);
  }
  const preferredRoastLevels = Array.from(roastCount.entries())
    .map(([level, count]) => ({ level, count }))
    .sort((a, b) => b.count - a.count);

  // 抽出方法の分布
  const brewingCount = new Map<BrewingMethod, number>();
  for (const record of records) {
    for (const method of record.result.recommendedBrewingMethods) {
      brewingCount.set(method, (brewingCount.get(method) ?? 0) + 1);
    }
  }
  const preferredBrewingMethods = Array.from(brewingCount.entries())
    .map(([method, count]) => ({ method, count }))
    .sort((a, b) => b.count - a.count);

  // 味覚トレンド（直近10件、日付昇順）
  const sorted = [...records].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const recent = sorted.slice(-10);
  const flavorTrend = recent.map((r) => ({
    date: r.date,
    profile: r.userFlavorProfile,
  }));

  // モード分布
  const modeCount = new Map<string, number>();
  for (const record of records) {
    modeCount.set(record.mode, (modeCount.get(record.mode) ?? 0) + 1);
  }
  const modeDistribution = Array.from(modeCount.entries())
    .map(([mode, count]) => ({ mode, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalDiagnoses,
    averageFlavorProfile,
    topRecommendedCoffees,
    preferredRoastLevels,
    preferredBrewingMethods,
    flavorTrend,
    modeDistribution,
  };
}
