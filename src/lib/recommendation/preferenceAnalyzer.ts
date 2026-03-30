import type { FlavorScores } from "../../types/coffee";
import type { TasteProfileInput } from "../../types/questionnaire";
import type { AnalyzedPreference, DrinkStyle, SceneFactor, DislikeMap, DislikeLevel } from "./types";
import {
  dessertToFlavorMap,
  sceneToFlavorMap,
} from "../../data/flavorMappings";

/** 値を min-max の範囲にクランプする */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** 1-5のスライダー値を1-10のフレーバースコアに変換 */
function scaleToTen(value: number): number {
  return (value - 1) * 2.25 + 1;
}

/** ユーザーの飲み方スタイルを判定 */
function determineDrinkStyle(input: TasteProfileInput): DrinkStyle {
  if (input.milkPreference >= 4) return "milk";
  if (input.drinkScenes.includes("morningRefresh") && input.milkPreference <= 2) return "black";
  // アイスシーン判定（将来の拡張用）
  if (input.drinkScenes.includes("coldBrew")) return "iced";
  return "balanced";
}

/** dislikeFlagsを生成: スライダー値が1-2の場合、その軸をdislikeとする */
function detectDislikes(input: TasteProfileInput): Partial<Record<keyof FlavorScores, boolean>> {
  const flags: Partial<Record<keyof FlavorScores, boolean>> = {};

  if (input.bitternessPreference <= 2) flags.bitterness = true;
  if (input.acidityPreference <= 2) flags.acidity = true;
  if (input.sweetnessPreference <= 2) flags.sweetness = true;
  if (input.bodyPreference <= 2) flags.body = true;
  if (input.fruityPreference <= 2) flags.fruitiness = true;
  if (input.floralPreference <= 2) flags.floral = true;
  if (input.nuttyPreference <= 2) flags.nuttiness = true;
  if (input.chocolatePreference <= 2) flags.chocolaty = true;
  if (input.roastedPreference <= 2) flags.roastiness = true;

  return flags;
}

/**
 * 2段階Dislikeマップを生成する。
 * スライダー値1 → hardDislike（絶対NG）
 * スライダー値2 → softDislike（やや苦手）
 */
function detectDislikeMap(input: TasteProfileInput): DislikeMap {
  const map: DislikeMap = {};

  const mappings: { field: keyof TasteProfileInput; flavor: keyof FlavorScores }[] = [
    { field: "bitternessPreference", flavor: "bitterness" },
    { field: "acidityPreference", flavor: "acidity" },
    { field: "sweetnessPreference", flavor: "sweetness" },
    { field: "bodyPreference", flavor: "body" },
    { field: "fruityPreference", flavor: "fruitiness" },
    { field: "floralPreference", flavor: "floral" },
    { field: "nuttyPreference", flavor: "nuttiness" },
    { field: "chocolatePreference", flavor: "chocolaty" },
    { field: "roastedPreference", flavor: "roastiness" },
  ];

  for (const { field, flavor } of mappings) {
    const val = input[field] as number;
    let level: DislikeLevel = "none";
    if (val === 1) level = "hard";
    else if (val === 2) level = "soft";

    if (level !== "none") {
      map[flavor] = level;
    }
  }

  return map;
}

/** シーン要因を抽出 */
function extractSceneFactors(input: TasteProfileInput): SceneFactor[] {
  const factors: SceneFactor[] = [];

  for (const scene of input.drinkScenes) {
    const effects = sceneToFlavorMap[scene];
    if (effects) {
      factors.push({
        scene,
        weight: 1.0,
        effects: effects as Partial<Record<keyof FlavorScores, number>>,
      });
    }
  }

  return factors;
}

/**
 * Step 1: ユーザー入力を分析して嗜好プロファイルを生成する
 */
export function analyzePreferences(input: TasteProfileInput): AnalyzedPreference {
  // 1. 明示嗜好: スライダー値をスケーリング
  const explicit: FlavorScores = {
    bitterness: scaleToTen(input.bitternessPreference),
    acidity: scaleToTen(input.acidityPreference),
    sweetness: scaleToTen(input.sweetnessPreference),
    body: scaleToTen(input.bodyPreference),
    fruitiness: scaleToTen(input.fruityPreference),
    floral: scaleToTen(input.floralPreference),
    nuttiness: scaleToTen(input.nuttyPreference),
    chocolaty: scaleToTen(input.chocolatePreference),
    roastiness: scaleToTen(input.roastedPreference),
    cleanness: 5,
    aftertaste: 5,
    balance: 5,
  };

  // 2. 暗黙嗜好: お菓子・シーンから推定
  const implicit: Partial<FlavorScores> = {};

  for (const dessert of input.dessertPreference) {
    const modifier = dessertToFlavorMap[dessert];
    if (modifier) {
      for (const [key, value] of Object.entries(modifier)) {
        const k = key as keyof FlavorScores;
        implicit[k] = (implicit[k] ?? 0) + value;
      }
    }
  }

  for (const scene of input.drinkScenes) {
    const modifier = sceneToFlavorMap[scene];
    if (modifier) {
      for (const [key, value] of Object.entries(modifier)) {
        const k = key as keyof FlavorScores;
        implicit[k] = (implicit[k] ?? 0) + value;
      }
    }
  }

  // 3. 統合プロファイル
  const combined: FlavorScores = { ...explicit };
  for (const [key, value] of Object.entries(implicit)) {
    const k = key as keyof FlavorScores;
    combined[k] += value;
  }

  // 4. ミルクボーナス
  if (input.milkPreference >= 3) {
    const milkBonus = (input.milkPreference - 2) * 0.5;
    combined.body += milkBonus;
    combined.bitterness += milkBonus;
    combined.roastiness += milkBonus;
  }

  // 5. クランプ
  for (const key of Object.keys(combined) as (keyof FlavorScores)[]) {
    combined[key] = clamp(Math.round(combined[key] * 10) / 10, 1, 10);
  }

  return {
    explicit,
    implicit,
    sceneFactors: extractSceneFactors(input),
    drinkStyle: determineDrinkStyle(input),
    combinedProfile: combined,
    dislikeFlags: detectDislikes(input),
    dislikeMap: detectDislikeMap(input),
  };
}
