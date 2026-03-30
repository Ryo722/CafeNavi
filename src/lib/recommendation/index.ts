import type {
  CoffeeProfile,
  RecommendationResult,
  RoastLevel,
  BrewingMethod,
  GrindSize,
} from "../../types/coffee";
import type { TasteProfileInput } from "../../types/questionnaire";
import type { RankedResult, AnalyzedPreference, RoastEstimation, WeightAdjustments, RecommendationStrategy } from "./types";
import { analyzePreferences } from "./preferenceAnalyzer";
import { estimateRoastLevel } from "./roastEstimator";
import { filterCandidates } from "./candidateFilter";
import { rankCandidates } from "./finalRanker";
import { generateReasons } from "./reasonGenerator";
import { pairingByRoast } from "../../data/pairingData";
import { selectSerendipityCandidate } from "./serendipity";
import { isColdStartInput, getColdStartRecommendations } from "./coldStart";
import { getTopRecommendations, calculateSimilarity } from "../similarity";
import { calculateUserFlavorProfile } from "../scoring";
import type { DiagnosisRecord } from "../storage";

export type PipelineResult = {
  /** 既存互換の RecommendationResult */
  recommendation: RecommendationResult;
  /** パイプライン内部のリッチな結果 */
  ranked: RankedResult[];
  /** 嗜好分析の結果 */
  preference: AnalyzedPreference;
  /** 焙煎度推定の結果 */
  roastEstimation: RoastEstimation;
  /** コールドスタートが発動したかどうか */
  isColdStart?: boolean;
};

export type PipelineOptions = {
  strategy?: RecommendationStrategy;
  userHistory?: DiagnosisRecord[];
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
  options: PipelineOptions = {},
): PipelineResult {
  const strategy = options.strategy ?? "v2";

  // v1 ストラテジー: 旧ロジック（コサイン類似度のみ）
  if (strategy === "v1") {
    return runV1Pipeline(input, profiles);
  }

  // コールドスタート判定
  if (isColdStartInput(input)) {
    return runColdStartPipeline(input, profiles);
  }

  // Step 1: 嗜好分析
  const preference = analyzePreferences(input);

  // Step 2: 焙煎度推定
  const roastEstimation = estimateRoastLevel(preference);

  // Step 3: 候補絞り込み
  const candidates = filterCandidates(preference, roastEstimation, profiles);

  // Step 4 & 5: 最終ランキング（内部で抽出方法も選択 + 季節ボーナス + softDislikeペナルティ）
  // 冒険枠のために多めに取得
  const allRanked = rankCandidates(candidates, preference, roastEstimation, feedbackWeights, 10);

  // Step 6: 推薦理由生成
  for (const result of allRanked) {
    result.reasons = generateReasons(preference, roastEstimation, result.coffee, result.score);
    // 季節ボーナス理由はreasonGeneratorのテンプレートで自動追加される
  }

  // 上位2枠 + 冒険枠
  const top2 = allRanked.slice(0, 2);

  // Serendipity枠: 3枠目を冒険枠にする
  const serendipityCandidate = selectSerendipityCandidate(
    allRanked,
    allRanked,
    options.userHistory,
  );

  let ranked: RankedResult[];
  if (serendipityCandidate) {
    // 冒険枠に推薦理由を追加
    serendipityCandidate.reasons = [
      ...generateReasons(preference, roastEstimation, serendipityCandidate.coffee, serendipityCandidate.score),
      "いつもとは違う味わいを試してみませんか？",
    ];
    ranked = [...top2, serendipityCandidate];
  } else {
    // 冒険枠がない場合は通常の3位
    ranked = allRanked.slice(0, 3);
  }

  // 既存互換のRecommendationResultに変換
  const topMatches = ranked.map((r) => ({
    coffeeId: r.coffeeId,
    score: r.score,
    reasons: r.reasons,
    isSerendipity: r.isSerendipity,
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

/**
 * v1 ストラテジー: 旧ロジック（コサイン類似度のみ）
 */
function runV1Pipeline(
  input: TasteProfileInput,
  profiles: CoffeeProfile[],
): PipelineResult {
  const preference = analyzePreferences(input);
  const roastEstimation = estimateRoastLevel(preference);
  const userProfile = calculateUserFlavorProfile(input);

  const topResults = getTopRecommendations(userProfile, profiles, 3);

  const ranked: RankedResult[] = topResults.map((r) => {
    const coffee = profiles.find((p) => p.id === r.coffeeId)!;
    return {
      coffeeId: r.coffeeId,
      coffee,
      score: r.score,
      reasons: generateReasons(preference, roastEstimation, coffee, r.score),
      brewing: { methods: [] },
    } as unknown as RankedResult;
  });

  const topMatches = ranked.map((r) => ({
    coffeeId: r.coffeeId,
    score: r.score,
    reasons: r.reasons,
  }));

  const pairingSuggestions = pairingByRoast[roastEstimation.primary] ?? [];

  const recommendation: RecommendationResult = {
    topMatches,
    recommendedRoast: roastEstimation.primary,
    recommendedGrind: "medium",
    recommendedBrewingMethods: ["handDrip"],
    pairingSuggestions,
    avoidNotes: [],
  };

  return { recommendation, ranked, preference, roastEstimation };
}

/**
 * コールドスタートパイプライン: デフォルト入力の場合のフォールバック
 */
function runColdStartPipeline(
  input: TasteProfileInput,
  profiles: CoffeeProfile[],
): PipelineResult {
  const preference = analyzePreferences(input);
  const roastEstimation = estimateRoastLevel(preference);

  const coldStartCoffees = getColdStartRecommendations(profiles);

  const scoredCoffees = coldStartCoffees.map((coffee) => {
    const score = calculateSimilarity(preference.combinedProfile, coffee.flavorScores);
    return { coffee, score };
  });
  // スコア降順でソート
  scoredCoffees.sort((a, b) => b.score - a.score);

  const ranked: RankedResult[] = scoredCoffees.slice(0, 3).map(({ coffee, score }) => {
    return {
      coffeeId: coffee.id,
      coffee,
      score,
      reasons: [
        `${coffee.nameJa}は初めての方にもおすすめのバランスの良いコーヒーです`,
        ...generateReasons(preference, roastEstimation, coffee, score),
      ].slice(0, 4),
      brewing: { methods: [] },
    } as unknown as RankedResult;
  });

  const topMatches = ranked.map((r) => ({
    coffeeId: r.coffeeId,
    score: r.score,
    reasons: r.reasons,
  }));

  const pairingSuggestions = pairingByRoast[roastEstimation.primary] ?? [];

  const recommendation: RecommendationResult = {
    topMatches,
    recommendedRoast: roastEstimation.primary,
    recommendedGrind: "medium",
    recommendedBrewingMethods: ["handDrip"],
    pairingSuggestions,
    avoidNotes: [],
  };

  return { recommendation, ranked, preference, roastEstimation, isColdStart: true };
}

// Re-exports for convenience
export { analyzePreferences } from "./preferenceAnalyzer";
export { estimateRoastLevel } from "./roastEstimator";
export { filterCandidates } from "./candidateFilter";
export { selectBrewingMethods } from "./brewingSelector";
export { rankCandidates } from "./finalRanker";
export { generateReasons } from "./reasonGenerator";
export { selectSerendipityCandidate } from "./serendipity";
export { getColdStartRecommendations, isColdStartInput } from "./coldStart";
export type { AnalyzedPreference, RoastEstimation, RankedResult, BrewingSelection, BrewingParams, RecommendationStrategy, DislikeLevel, DislikeMap } from "./types";
