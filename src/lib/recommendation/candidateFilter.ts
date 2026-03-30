import type { CoffeeProfile, FlavorScores, RoastLevel } from "../../types/coffee";
import type { AnalyzedPreference, RoastEstimation, FilteredCandidates, DislikeMap } from "./types";

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

const DISLIKE_LABEL: Record<keyof FlavorScores, string> = {
  bitterness: "苦味",
  acidity: "酸味",
  sweetness: "甘み",
  body: "ボディ",
  fruitiness: "フルーティさ",
  floral: "フローラルさ",
  nuttiness: "ナッツ感",
  chocolaty: "チョコ感",
  roastiness: "焙煎感",
  cleanness: "クリーンさ",
  aftertaste: "余韻",
  balance: "バランス",
};

/**
 * 2段階Dislike対応のフィルタ。
 * hardDislike（スライダー1）の軸がスコア7以上 → 除外
 * softDislikeはペナルティのみ（finalRankerで適用）なのでここでは除外しない
 */
function checkHardDislikeConflict(
  dislikeMap: DislikeMap,
  coffee: CoffeeProfile,
): string | null {
  const HARD_THRESHOLD = 7;

  for (const [key, level] of Object.entries(dislikeMap)) {
    if (level !== "hard") continue;
    const k = key as keyof FlavorScores;
    if (coffee.flavorScores[k] >= HARD_THRESHOLD) {
      return `${DISLIKE_LABEL[k]}が強すぎるため除外（hardDislike）`;
    }
  }

  return null;
}

/** dislikeフラグとコーヒーのフレーバースコアを照合し、除外理由を返す（後方互換） */
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
    // 2段階Dislike: hardDislikeチェック（優先）
    if (pref.dislikeMap) {
      const hardReason = checkHardDislikeConflict(pref.dislikeMap, coffee);
      if (hardReason) {
        excluded.push({ profile: coffee, reason: hardReason });
        continue;
      }
    }

    // レガシーのdislikeチェック（dislikeMapがない場合のフォールバック）
    if (!pref.dislikeMap) {
      const dislikeReason = checkDislikeConflict(pref.dislikeFlags, coffee);
      if (dislikeReason) {
        excluded.push({ profile: coffee, reason: dislikeReason });
        continue;
      }
    }

    // dislikeMapがある場合でも、旧ロジックのbody>=8チェックは保持
    if (pref.dislikeMap && pref.dislikeFlags.body && coffee.flavorScores.body >= 8) {
      const level = pref.dislikeMap.body;
      if (level === "hard") {
        excluded.push({ profile: coffee, reason: "ボディが重すぎるため除外（hardDislike）" });
        continue;
      }
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
