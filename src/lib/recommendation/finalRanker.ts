import type { FlavorScores } from "../../types/coffee";
import type {
  AnalyzedPreference,
  RoastEstimation,
  FilteredCandidates,
  RankedResult,
  WeightAdjustments,
} from "./types";
import { synergyRules } from "./rules/synergyRules";
import { resolveWeights } from "./rules/weightProfiles";
import { selectBrewingMethods } from "./brewingSelector";

const FLAVOR_KEYS: (keyof FlavorScores)[] = [
  "bitterness", "acidity", "sweetness", "body", "fruitiness",
  "floral", "nuttiness", "chocolaty", "roastiness", "cleanness",
  "aftertaste", "balance",
];

/**
 * 重み付きコサイン類似度を計算する。
 * 各軸のweightが1.0以外の場合、その軸の重要度が変わる。
 */
function weightedCosineSimilarity(
  userProfile: FlavorScores,
  coffeeProfile: FlavorScores,
  weights: Partial<Record<keyof FlavorScores, number>>,
): number {
  let dotProduct = 0;
  let normUser = 0;
  let normCoffee = 0;

  for (const key of FLAVOR_KEYS) {
    const w = weights[key] ?? 1.0;
    const u = userProfile[key] * w;
    const c = coffeeProfile[key] * w;
    dotProduct += u * c;
    normUser += u * u;
    normCoffee += c * c;
  }

  const denominator = Math.sqrt(normUser) * Math.sqrt(normCoffee);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}

/**
 * Step 5: 最終ランキング
 *
 * - 動的重み付けを適用
 * - コサイン類似度を計算
 * - シナジー/コンフリクトルールを適用
 * - confidence を加味
 * - 最終スコアで top-N を返す
 */
export function rankCandidates(
  candidates: FilteredCandidates,
  pref: AnalyzedPreference,
  roast: RoastEstimation,
  feedbackWeights: WeightAdjustments | null,
  topN: number = 3,
): RankedResult[] {
  // 1. 動的重み解決
  const baseWeights = resolveWeights(roast.primary, pref);

  // フィードバック学習の重みも統合
  const weights: Partial<Record<keyof FlavorScores, number>> = { ...baseWeights };
  if (feedbackWeights) {
    for (const [key, value] of Object.entries(feedbackWeights)) {
      const k = key as keyof FlavorScores;
      weights[k] = (weights[k] ?? 1.0) * value;
    }
  }

  // 2. 全候補にスコア付け
  const allCandidates = [
    ...candidates.primary.map((c) => ({ coffee: c, isPrimary: true })),
    ...candidates.secondary.map((c) => ({ coffee: c, isPrimary: false })),
  ];

  const rawScores: Record<string, number> = {};

  for (const { coffee, isPrimary } of allCandidates) {
    let score = weightedCosineSimilarity(
      pref.combinedProfile,
      coffee.flavorScores,
      weights,
    );

    // primary候補にボーナス（焙煎度一致）
    if (isPrimary) score *= 1.05;

    // confidence加味
    score *= (0.7 + coffee.confidence * 0.3);

    // 0-100に正規化
    rawScores[coffee.id] = Math.round(score * 100 * 10) / 10;
  }

  // 3. シナジー/コンフリクトルール適用
  let adjustedScores = { ...rawScores };
  for (const rule of synergyRules) {
    if (rule.conditions(pref)) {
      adjustedScores = rule.effect(adjustedScores);
    }
  }

  // 4. ソートして上位Nを返す
  const sortedIds = Object.keys(adjustedScores).sort(
    (a, b) => adjustedScores[b] - adjustedScores[a],
  );

  const results: RankedResult[] = [];
  for (const id of sortedIds.slice(0, topN)) {
    const coffee = allCandidates.find((c) => c.coffee.id === id)?.coffee;
    if (!coffee) continue;

    results.push({
      coffeeId: id,
      coffee,
      score: Math.round(adjustedScores[id] * 10) / 10,
      reasons: [], // reasonGeneratorで後から付与
      brewing: selectBrewingMethods(pref, roast, coffee),
    });
  }

  return results;
}
