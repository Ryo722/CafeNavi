import type {
  DiagnosisFeedback,
  FlavorScores,
  WeightAdjustments,
} from "../types/coffee";
import type { DiagnosisRecord } from "./storage";

/** 値を min-max の範囲にクランプする */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * FlavorScoresの各軸をスコア順にソートし、キー配列を返す。
 * 降順（スコアが高い順）。
 */
function sortKeysByScore(scores: FlavorScores): (keyof FlavorScores)[] {
  const keys = Object.keys(scores) as (keyof FlavorScores)[];
  return keys.sort((a, b) => scores[b] - scores[a]);
}

/**
 * フィードバックに基づいて重みを調整する。
 *
 * - "perfect"/"good" → 高スコア軸の重みを微増（+0.02）
 * - "neutral" → 変更なし
 * - "off" → 高スコア軸の重みを下げ（-0.05）、低スコア軸の重みを上げ（+0.05）
 * - "wrong" → より強めの調整（-0.1 / +0.1）
 *
 * 重みは 0.5〜2.0 の範囲にクランプされる。
 */
export function adjustWeightsFromFeedback(
  currentWeights: WeightAdjustments,
  feedback: DiagnosisFeedback,
  diagnosisRecord: DiagnosisRecord,
): WeightAdjustments {
  const newWeights = { ...currentWeights };

  if (feedback.rating === "neutral") {
    return newWeights;
  }

  // 推薦されたコーヒーのフレーバースコアを取得（トップマッチの上位を使用）
  const topMatch = diagnosisRecord.result.topMatches[0];
  if (!topMatch) return newWeights;

  // ユーザーのフレーバープロファイルを使って調整方向を決定
  const userProfile = diagnosisRecord.userFlavorProfile;
  const sortedKeys = sortKeysByScore(userProfile);

  const topKeys = sortedKeys.slice(0, 3); // 上位3軸
  const bottomKeys = sortedKeys.slice(-3); // 下位3軸

  if (feedback.rating === "perfect" || feedback.rating === "good") {
    // ポジティブ: 高スコア軸の重みを微増
    const delta = 0.02;
    for (const key of topKeys) {
      newWeights[key] = clamp(newWeights[key] + delta, 0.5, 2.0);
    }
  } else if (feedback.rating === "off") {
    // ネガティブ（軽度）: 高スコア軸を下げ、低スコア軸を上げ
    const delta = 0.05;
    for (const key of topKeys) {
      newWeights[key] = clamp(newWeights[key] - delta, 0.5, 2.0);
    }
    for (const key of bottomKeys) {
      newWeights[key] = clamp(newWeights[key] + delta, 0.5, 2.0);
    }
  } else if (feedback.rating === "wrong") {
    // ネガティブ（強度）: より強めの調整
    const delta = 0.1;
    for (const key of topKeys) {
      newWeights[key] = clamp(newWeights[key] - delta, 0.5, 2.0);
    }
    for (const key of bottomKeys) {
      newWeights[key] = clamp(newWeights[key] + delta, 0.5, 2.0);
    }
  }

  // 小数点第2位で丸める
  for (const key of Object.keys(newWeights) as (keyof WeightAdjustments)[]) {
    newWeights[key] = Math.round(newWeights[key] * 100) / 100;
  }

  return newWeights;
}
