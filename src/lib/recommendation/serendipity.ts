import type { FlavorScores } from "../../types/coffee";
import type { RankedResult } from "./types";
import type { DiagnosisRecord } from "../storage";

const FLAVOR_KEYS: (keyof FlavorScores)[] = [
  "fruitiness", "floral", "nuttiness", "chocolaty", "roastiness",
];

/**
 * 冒険枠（Serendipity）候補を選定する。
 *
 * 通常のTOP5には入らないが、スコアが中程度（40-70%）の候補から、
 * ユーザーが過去に推薦されたことがない産地/焙煎度を優先し、
 * 特徴的なフレーバーを持つ候補を選ぶ。
 */
export function selectSerendipityCandidate(
  topMatches: RankedResult[],
  allCandidates: RankedResult[],
  userHistory?: DiagnosisRecord[],
): RankedResult | null {
  const topIds = new Set(topMatches.slice(0, 5).map((r) => r.coffeeId));

  // スコア中程度（40-70%）かつTOP5に入っていない候補
  const midRangeCandidates = allCandidates.filter(
    (r) => !topIds.has(r.coffeeId) && r.score >= 40 && r.score <= 70,
  );

  if (midRangeCandidates.length === 0) return null;

  // 過去に推薦された産地・焙煎度を集める
  const pastOrigins = new Set<string>();
  const pastRoasts = new Set<string>();
  if (userHistory && userHistory.length > 0) {
    for (const record of userHistory) {
      for (const match of record.result.topMatches) {
        // coffeeIdから産地情報を得るのは難しいので、coffeeIdそのものを記録
        pastOrigins.add(match.coffeeId);
      }
      pastRoasts.add(record.result.recommendedRoast);
    }
  }

  // スコアリング: 新規性 + フレーバー特徴度
  const scored = midRangeCandidates.map((candidate) => {
    let noveltyScore = 0;

    // 過去に推薦されたことがないコーヒーを優先
    if (!pastOrigins.has(candidate.coffeeId)) {
      noveltyScore += 20;
    }

    // 過去にない焙煎度を優先
    if (!pastRoasts.has(candidate.coffee.roastLevel)) {
      noveltyScore += 10;
    }

    // 特徴的なフレーバー（極端に高い値を持つ軸）を優先
    let distinctivenessScore = 0;
    for (const key of FLAVOR_KEYS) {
      const val = candidate.coffee.flavorScores[key];
      if (val >= 8) distinctivenessScore += 5;
      else if (val >= 7) distinctivenessScore += 2;
    }

    return {
      candidate,
      totalScore: noveltyScore + distinctivenessScore + candidate.score * 0.1,
    };
  });

  // 最高スコアの候補を返す
  scored.sort((a, b) => b.totalScore - a.totalScore);

  if (scored.length === 0) return null;

  const selected = scored[0].candidate;

  return {
    ...selected,
    isSerendipity: true,
  };
}
