import type { FlavorScores } from "../types/coffee";
import type { TasteProfileInput } from "../types/questionnaire";
import {
  dessertToFlavorMap,
  sceneToFlavorMap,
} from "../data/flavorMappings";

/** 値を min-max の範囲にクランプする */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** 1-5のスライダー値を1-10のフレーバースコアに変換 */
function scaleToTen(value: number): number {
  return (value - 1) * 2.25 + 1;
}

/**
 * ユーザー入力を統合味覚スコア（FlavorScores）に変換する。
 *
 * 処理:
 * 1. 直接入力値をベーススコアとして使用（1-5 -> 1-10にスケール）
 * 2. dessertPreference から修正値を加算
 * 3. drinkScenes から修正値を加算
 * 4. milkPreference が高いほど body, bitterness, roastiness にボーナス
 * 5. 各値を1-10にクランプ
 */
export function calculateUserFlavorProfile(
  input: TasteProfileInput,
): FlavorScores {
  // 1. ベーススコア（スライダー値 1-5 -> 1-10）
  const scores: FlavorScores = {
    bitterness: scaleToTen(input.bitternessPreference),
    acidity: scaleToTen(input.acidityPreference),
    sweetness: scaleToTen(input.sweetnessPreference),
    body: scaleToTen(input.bodyPreference),
    fruitiness: scaleToTen(input.fruityPreference),
    floral: scaleToTen(input.floralPreference),
    nuttiness: scaleToTen(input.nuttyPreference),
    chocolaty: scaleToTen(input.chocolatePreference),
    roastiness: scaleToTen(input.roastedPreference),
    cleanness: 5, // デフォルト中間値
    aftertaste: 5, // デフォルト中間値（余韻）
    balance: 5,    // デフォルト中間値（バランス）
  };

  // 2. dessertPreference から修正値を加算
  for (const dessert of input.dessertPreference) {
    const modifier = dessertToFlavorMap[dessert];
    if (modifier) {
      for (const [key, value] of Object.entries(modifier)) {
        scores[key as keyof FlavorScores] += value;
      }
    }
  }

  // 3. drinkScenes から修正値を加算
  for (const scene of input.drinkScenes) {
    const modifier = sceneToFlavorMap[scene];
    if (modifier) {
      for (const [key, value] of Object.entries(modifier)) {
        scores[key as keyof FlavorScores] += value;
      }
    }
  }

  // 4. milkPreference ボーナス（ミルクたっぷり派はコクと苦味を好む傾向）
  if (input.milkPreference >= 3) {
    const milkBonus = (input.milkPreference - 2) * 0.5;
    scores.body += milkBonus;
    scores.bitterness += milkBonus;
    scores.roastiness += milkBonus;
  }

  // 5. 全値を1-10にクランプ
  for (const key of Object.keys(scores) as (keyof FlavorScores)[]) {
    scores[key] = clamp(Math.round(scores[key] * 10) / 10, 1, 10);
  }

  return scores;
}
