import type { RoastLevel } from "../../types/coffee";
import type { AnalyzedPreference, RoastEstimation } from "./types";

const ROAST_LEVELS: RoastLevel[] = ["light", "medium-light", "medium", "medium-dark", "dark"];

/**
 * Step 2: ユーザー嗜好から最適な焙煎度を推定する
 *
 * ロジック:
 * - bitterness/roastiness高 + acidity低 → 深煎り
 * - acidity/fruitiness/floral高 + bitterness低 → 浅煎り
 * - バランス型 → 中煎り
 * - ミルク派 → 中深煎り〜深煎りにボーナス
 * - シーン補正（朝→やや浅め、食後→やや深め）
 */
export function estimateRoastLevel(pref: AnalyzedPreference): RoastEstimation {
  const p = pref.combinedProfile;
  const reasons: string[] = [];

  // 各焙煎度のベーススコア計算
  const scores: Record<RoastLevel, number> = {
    light: 0,
    "medium-light": 0,
    medium: 0,
    "medium-dark": 0,
    dark: 0,
  };

  // 浅煎り要因: acidity, fruitiness, floral, cleanness
  const lightFactor = p.acidity * 1.2 + p.fruitiness * 1.0 + p.floral * 1.0 + p.cleanness * 0.5;
  scores["light"] += lightFactor;
  scores["medium-light"] += lightFactor * 0.7;

  // 深煎り要因: bitterness, roastiness, body
  const darkFactor = p.bitterness * 1.2 + p.roastiness * 1.0 + p.body * 0.8;
  scores["dark"] += darkFactor;
  scores["medium-dark"] += darkFactor * 0.7;

  // 中煎り要因: sweetness, nuttiness, chocolaty, balance
  // 中煎りは万能型なのでベースボーナスを加算
  const mediumFactor = p.sweetness * 0.8 + p.nuttiness * 1.0 + p.chocolaty * 0.8 + p.balance * 0.8;
  scores["medium"] += mediumFactor + 5; // 中煎りベースボーナス
  scores["medium-light"] += mediumFactor * 0.6;
  scores["medium-dark"] += mediumFactor * 0.6;

  // 逆補正: 浅煎り要因が高い → 深煎りスコアを下げる
  scores["dark"] -= lightFactor * 0.3;
  scores["light"] -= darkFactor * 0.3;

  // ミルク派ボーナス: 中深煎り〜深煎りにボーナス
  if (pref.drinkStyle === "milk") {
    scores["medium-dark"] += 8;
    scores["dark"] += 5;
    scores["medium"] += 3;
    reasons.push("ミルクとの相性を考慮し、深めの焙煎を推奨");
  }

  // シーン補正
  for (const factor of pref.sceneFactors) {
    if (factor.scene === "morningRefresh") {
      scores["light"] += 3;
      scores["medium-light"] += 2;
      reasons.push("朝のリフレッシュには爽やかな浅〜中浅煎りが好適");
    }
    if (factor.scene === "afterMeal") {
      scores["medium"] += 2;
      scores["medium-dark"] += 3;
      reasons.push("食後には余韻のある中〜中深煎りが好適");
    }
    if (factor.scene === "workFocus") {
      scores["medium-dark"] += 2;
      scores["dark"] += 2;
      reasons.push("集中シーンにはしっかりした苦味の深めの焙煎が好適");
    }
    if (factor.scene === "relax") {
      scores["medium"] += 3;
      scores["medium-light"] += 2;
      reasons.push("リラックスには穏やかな中煎りが好適");
    }
    if (factor.scene === "strongWithMilk") {
      scores["medium-dark"] += 4;
      scores["dark"] += 4;
      reasons.push("ミルクでしっかり飲むには深めの焙煎が好適");
    }
  }

  // 最高スコアの焙煎度を選択
  let primary: RoastLevel = "medium";
  let secondary: RoastLevel | undefined;
  let maxScore = -Infinity;
  let secondMaxScore = -Infinity;

  for (const level of ROAST_LEVELS) {
    if (scores[level] > maxScore) {
      secondMaxScore = maxScore;
      secondary = primary;
      maxScore = scores[level];
      primary = level;
    } else if (scores[level] > secondMaxScore) {
      secondMaxScore = scores[level];
      secondary = level;
    }
  }

  // 理由テキスト生成
  if (reasons.length === 0) {
    if (primary === "light" || primary === "medium-light") {
      reasons.push("酸味やフルーティさを好む傾向から浅煎りを推奨");
    } else if (primary === "dark" || primary === "medium-dark") {
      reasons.push("苦味やロースト感を好む傾向から深煎りを推奨");
    } else {
      reasons.push("バランスの取れた味わいを好む傾向から中煎りを推奨");
    }
  }

  return {
    scores,
    primary,
    secondary: secondary !== primary ? secondary : undefined,
    reasoning: reasons.join("。"),
  };
}
