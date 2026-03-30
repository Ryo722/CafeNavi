import type {
  CoffeeProfile,
  RecommendationResult,
  RoastLevel,
  BrewingMethod,
  GrindSize,
} from "../../types/coffee";
import type { TasteProfileInput } from "../../types/questionnaire";
import type { RankedResult, AnalyzedPreference, RoastEstimation, WeightAdjustments } from "./types";
import { analyzePreferences } from "./preferenceAnalyzer";
import { estimateRoastLevel } from "./roastEstimator";
import { filterCandidates } from "./candidateFilter";
import { rankCandidates } from "./finalRanker";
import { generateReasons } from "./reasonGenerator";
import { pairingByRoast } from "../../data/pairingData";

export type PipelineResult = {
  /** 既存互換の RecommendationResult */
  recommendation: RecommendationResult;
  /** パイプライン内部のリッチな結果 */
  ranked: RankedResult[];
  /** 嗜好分析の結果 */
  preference: AnalyzedPreference;
  /** 焙煎度推定の結果 */
  roastEstimation: RoastEstimation;
};

/**
 * 推薦パイプラインを実行する。
 *
 * Step 1: 嗜好分析
 * Step 2: 焙煎度推定
 * Step 3: 候補絞り込み
 * Step 4: (rankCandidates内で)抽出方法選択
 * Step 5: 最終ランキング + シナジー/重み適用
 * Step 6: 推薦理由生成
 */
export function runRecommendationPipeline(
  input: TasteProfileInput,
  profiles: CoffeeProfile[],
  feedbackWeights: WeightAdjustments | null = null,
): PipelineResult {
  // Step 1: 嗜好分析
  const preference = analyzePreferences(input);

  // Step 2: 焙煎度推定
  const roastEstimation = estimateRoastLevel(preference);

  // Step 3: 候補絞り込み
  const candidates = filterCandidates(preference, roastEstimation, profiles);

  // Step 4 & 5: 最終ランキング（内部で抽出方法も選択）
  const ranked = rankCandidates(candidates, preference, roastEstimation, feedbackWeights, 3);

  // Step 6: 推薦理由生成
  for (const result of ranked) {
    result.reasons = generateReasons(preference, roastEstimation, result.coffee, result.score);
  }

  // 既存互換のRecommendationResultに変換
  const topMatches = ranked.map((r) => ({
    coffeeId: r.coffeeId,
    score: r.score,
    reasons: r.reasons,
  }));

  const recommendedRoast: RoastLevel = roastEstimation.primary;
  const recommendedBrewingMethods: BrewingMethod[] = ranked.length > 0
    ? ranked[0].brewing.methods.slice(0, 2).map((m) => m.method)
    : ["handDrip"];
  const recommendedGrind: GrindSize = ranked.length > 0
    ? ranked[0].brewing.methods[0].params.grindSize
    : "medium";

  const pairingSuggestions = pairingByRoast[recommendedRoast] ?? [];

  // 避けるべきノート
  const avoidNotes: string[] = [];
  const p = preference.combinedProfile;
  if (p.bitterness <= 2) avoidNotes.push("深煎りの強い苦味は避けた方がよいかもしれません");
  if (p.acidity <= 2) avoidNotes.push("浅煎りのアフリカ産（強い酸味）は避けた方がよいかもしれません");
  if (p.body <= 2) avoidNotes.push("重厚なボディのコーヒーは避けた方がよいかもしれません");
  if (p.fruitiness <= 2 && p.floral <= 2) avoidNotes.push("フルーティ・フローラル系は好みに合わないかもしれません");
  if (p.roastiness <= 2) avoidNotes.push("焙煎感の強いコーヒーは避けた方がよいかもしれません");

  const recommendation: RecommendationResult = {
    topMatches,
    recommendedRoast,
    recommendedGrind,
    recommendedBrewingMethods,
    pairingSuggestions,
    avoidNotes,
  };

  return {
    recommendation,
    ranked,
    preference,
    roastEstimation,
  };
}

// Re-exports for convenience
export { analyzePreferences } from "./preferenceAnalyzer";
export { estimateRoastLevel } from "./roastEstimator";
export { filterCandidates } from "./candidateFilter";
export { selectBrewingMethods } from "./brewingSelector";
export { rankCandidates } from "./finalRanker";
export { generateReasons } from "./reasonGenerator";
export type { AnalyzedPreference, RoastEstimation, RankedResult, BrewingSelection, BrewingParams } from "./types";
