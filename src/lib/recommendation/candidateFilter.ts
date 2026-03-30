import type { CoffeeProfile, FlavorScores, RoastLevel } from "../../types/coffee";
import type { AnalyzedPreference, RoastEstimation, FilteredCandidates } from "./types";

/** 焙煎度の数値順 */
const ROAST_ORDER: Record<RoastLevel, number> = {
  light: 0,
  "medium-light": 1,
  medium: 2,
  "medium-dark": 3,
  dark: 4,
};

/** 2つの焙煎度の距離を返す */
function roastDistance(a: RoastLevel, b: RoastLevel): number {
  return Math.abs(ROAST_ORDER[a] - ROAST_ORDER[b]);
}

/** dislikeフラグとコーヒーのフレーバースコアを照合し、除外理由を返す */
function checkDislikeConflict(
  dislikeFlags: Partial<Record<keyof FlavorScores, boolean>>,
  coffee: CoffeeProfile,
): string | null {
  const HIGH_THRESHOLD = 7;

  if (dislikeFlags.bitterness && coffee.flavorScores.bitterness >= HIGH_THRESHOLD) {
    return "苦味が強すぎるため除外";
  }
  if (dislikeFlags.acidity && coffee.flavorScores.acidity >= HIGH_THRESHOLD) {
    return "酸味が強すぎるため除外";
  }
  if (dislikeFlags.body && coffee.flavorScores.body >= 8) {
    return "ボディが重すぎるため除外";
  }
  if (dislikeFlags.roastiness && coffee.flavorScores.roastiness >= HIGH_THRESHOLD) {
    return "焙煎感が強すぎるため除外";
  }
  if (dislikeFlags.fruitiness && coffee.flavorScores.fruitiness >= 8) {
    return "フルーティさが強すぎるため除外";
  }
  if (dislikeFlags.floral && coffee.flavorScores.floral >= 8) {
    return "フローラルさが強すぎるため除外";
  }

  return null;
}

/**
 * Step 3: 候補の絞り込み
 *
 * - dislikeFlagsに引っかかる候補を除外
 * - 焙煎度が一致する候補をprimaryに、近い候補をsecondaryに振り分け
 */
export function filterCandidates(
  pref: AnalyzedPreference,
  roast: RoastEstimation,
  profiles: CoffeeProfile[],
): FilteredCandidates {
  const primary: CoffeeProfile[] = [];
  const secondary: CoffeeProfile[] = [];
  const excluded: { profile: CoffeeProfile; reason: string }[] = [];

  for (const coffee of profiles) {
    // dislikeチェック
    const dislikeReason = checkDislikeConflict(pref.dislikeFlags, coffee);
    if (dislikeReason) {
      excluded.push({ profile: coffee, reason: dislikeReason });
      continue;
    }

    // 焙煎度による振り分け
    const dist = roastDistance(coffee.roastLevel, roast.primary);
    const secondaryDist = roast.secondary
      ? roastDistance(coffee.roastLevel, roast.secondary)
      : Infinity;

    if (dist === 0 || secondaryDist === 0) {
      primary.push(coffee);
    } else if (dist <= 1) {
      primary.push(coffee); // 1段階差もprimaryに含める
    } else if (dist <= 2) {
      secondary.push(coffee);
    } else {
      // 3段階以上離れていても完全除外はせずsecondaryに残す（多様性確保）
      secondary.push(coffee);
    }
  }

  return { primary, secondary, excluded };
}
