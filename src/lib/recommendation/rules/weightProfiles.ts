import type { FlavorScores, RoastLevel } from "../../../types/coffee";
import type { AnalyzedPreference } from "../types";

export type WeightProfile = {
  name: string;
  condition: (roast: RoastLevel, pref: AnalyzedPreference) => boolean;
  weights: Partial<Record<keyof FlavorScores, number>>;
};

export const weightProfiles: WeightProfile[] = [
  {
    name: "浅煎り重視",
    condition: (roast) => roast === "light" || roast === "medium-light",
    weights: {
      acidity: 1.5,
      fruitiness: 1.5,
      floral: 1.3,
      cleanness: 1.2,
      bitterness: 0.7,
      body: 0.8,
      roastiness: 0.6,
      aftertaste: 1.1,
    },
  },
  {
    name: "深煎り重視",
    condition: (roast) => roast === "dark" || roast === "medium-dark",
    weights: {
      bitterness: 1.4,
      body: 1.4,
      chocolaty: 1.3,
      roastiness: 1.2,
      nuttiness: 1.1,
      acidity: 0.6,
      fruitiness: 0.7,
      floral: 0.7,
      aftertaste: 1.1,
    },
  },
  {
    name: "中煎りバランス重視",
    condition: (roast) => roast === "medium",
    weights: {
      balance: 1.5,
      sweetness: 1.2,
      nuttiness: 1.1,
      chocolaty: 1.1,
      aftertaste: 1.1,
    },
  },
  {
    name: "ミルク重視",
    condition: (_, pref) => pref.drinkStyle === "milk",
    weights: {
      body: 1.5,
      chocolaty: 1.3,
      nuttiness: 1.2,
      roastiness: 1.1,
      acidity: 0.7,
      floral: 0.8,
      cleanness: 0.9,
    },
  },
  {
    name: "ブラック重視",
    condition: (_, pref) => pref.drinkStyle === "black",
    weights: {
      cleanness: 1.4,
      acidity: 1.2,
      balance: 1.3,
      aftertaste: 1.2,
      body: 0.9,
    },
  },
  {
    name: "朝シーン重視",
    condition: (_, pref) =>
      pref.sceneFactors.some((f) => f.scene === "morningRefresh"),
    weights: {
      cleanness: 1.3,
      acidity: 1.2,
      balance: 1.1,
      body: 0.8,
      roastiness: 0.8,
    },
  },
  {
    name: "リラックスシーン重視",
    condition: (_, pref) =>
      pref.sceneFactors.some((f) => f.scene === "relax"),
    weights: {
      sweetness: 1.3,
      floral: 1.2,
      aftertaste: 1.2,
      balance: 1.1,
      bitterness: 0.9,
    },
  },
  {
    name: "仕事集中シーン重視",
    condition: (_, pref) =>
      pref.sceneFactors.some((f) => f.scene === "workFocus"),
    weights: {
      bitterness: 1.2,
      body: 1.2,
      roastiness: 1.1,
      cleanness: 0.9,
      floral: 0.8,
    },
  },
];

/**
 * 適用すべき全てのWeightProfileのweightsを統合して返す。
 * 複数プロファイルが該当する場合、乗算で合成する。
 */
export function resolveWeights(
  roast: RoastLevel,
  pref: AnalyzedPreference,
): Partial<Record<keyof FlavorScores, number>> {
  const merged: Partial<Record<keyof FlavorScores, number>> = {};

  for (const profile of weightProfiles) {
    if (profile.condition(roast, pref)) {
      for (const [key, value] of Object.entries(profile.weights)) {
        const k = key as keyof FlavorScores;
        merged[k] = (merged[k] ?? 1.0) * value;
      }
    }
  }

  return merged;
}
