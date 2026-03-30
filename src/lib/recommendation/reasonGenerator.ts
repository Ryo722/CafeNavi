import type { CoffeeProfile, RoastLevel } from "../../types/coffee";
import type { AnalyzedPreference, RoastEstimation } from "./types";

type ReasonTemplate = {
  id: string;
  condition: (pref: AnalyzedPreference, coffee: CoffeeProfile) => boolean;
  generate: (pref: AnalyzedPreference, coffee: CoffeeProfile, roast: RoastEstimation) => string;
  priority: number; // 小さいほど優先
};

/** 味覚の主要特徴をテキストで返す */
function getFlavorHighlights(coffee: CoffeeProfile): string[] {
  const highlights: string[] = [];
  const fs = coffee.flavorScores;

  if (fs.fruitiness >= 7) highlights.push("フルーティ");
  if (fs.floral >= 7) highlights.push("フローラル");
  if (fs.chocolaty >= 7) highlights.push("チョコレート");
  if (fs.nuttiness >= 7) highlights.push("ナッツ");
  if (fs.bitterness >= 7) highlights.push("苦味");
  if (fs.acidity >= 7) highlights.push("酸味");
  if (fs.sweetness >= 7) highlights.push("甘み");
  if (fs.body >= 7) highlights.push("コク");
  if (fs.cleanness >= 8) highlights.push("クリーンカップ");
  if (fs.aftertaste >= 8) highlights.push("長い余韻");
  if (fs.balance >= 8) highlights.push("高いバランス");

  return highlights;
}

const roastNameJa: Record<RoastLevel, string> = {
  light: "浅煎り",
  "medium-light": "中浅煎り",
  medium: "中煎り",
  "medium-dark": "中深煎り",
  dark: "深煎り",
};

const templates: ReasonTemplate[] = [
  // === 味覚マッチ系 ===
  {
    id: "bitter-match",
    condition: (p, c) => p.combinedProfile.bitterness >= 6 && c.flavorScores.bitterness >= 6,
    generate: (_, c) => `${c.nameJa}のしっかりとした苦味が、苦味好きの方にマッチします`,
    priority: 1,
  },
  {
    id: "bitter-choco-match",
    condition: (p, c) => p.combinedProfile.bitterness >= 7 && c.flavorScores.chocolaty >= 7,
    generate: (_, c) => `深い苦味と${c.nameJa}のチョコレート感が絶妙にマッチします`,
    priority: 2,
  },
  {
    id: "acidity-match",
    condition: (p, c) => p.combinedProfile.acidity >= 6 && c.flavorScores.acidity >= 6,
    generate: (_, c) => `${c.nameJa}の明るい酸味が、酸味好きの方におすすめです`,
    priority: 3,
  },
  {
    id: "acidity-low-match",
    condition: (p, c) => p.combinedProfile.acidity <= 3 && c.flavorScores.acidity <= 3,
    generate: (_, c) => `${c.nameJa}は酸味が穏やかで、酸味が苦手な方でも飲みやすいです`,
    priority: 3,
  },
  {
    id: "fruity-match",
    condition: (p, c) => p.combinedProfile.fruitiness >= 6 && c.flavorScores.fruitiness >= 6,
    generate: (_, c) => `${c.nameJa}のフルーティな風味が、フルーツ好きの方にぴったりです`,
    priority: 4,
  },
  {
    id: "floral-match",
    condition: (p, c) => p.combinedProfile.floral >= 6 && c.flavorScores.floral >= 7,
    generate: (_, c) => `${c.nameJa}の華やかなフローラルアロマが繊細な味わい好きの方に合います`,
    priority: 5,
  },
  {
    id: "choco-match",
    condition: (p, c) => p.combinedProfile.chocolaty >= 6 && c.flavorScores.chocolaty >= 6,
    generate: (_, c) => `${c.nameJa}のチョコレートの風味が、チョコ好きの方にマッチします`,
    priority: 6,
  },
  {
    id: "nutty-match",
    condition: (p, c) => p.combinedProfile.nuttiness >= 6 && c.flavorScores.nuttiness >= 6,
    generate: (_, c) => `${c.nameJa}のナッツの風味が、ナッツ好きの方に合います`,
    priority: 7,
  },
  {
    id: "sweet-match",
    condition: (p, c) => p.combinedProfile.sweetness >= 7 && c.flavorScores.sweetness >= 7,
    generate: (_, c) => `${c.nameJa}の自然な甘みが甘い味わいを好む方にぴったりです`,
    priority: 8,
  },
  {
    id: "body-match",
    condition: (p, c) => p.combinedProfile.body >= 7 && c.flavorScores.body >= 7,
    generate: (_, c) => `${c.nameJa}のどっしりとしたコクが、重厚な飲みごたえを好む方にマッチします`,
    priority: 9,
  },
  {
    id: "clean-match",
    condition: (p, c) => p.combinedProfile.cleanness >= 7 && c.flavorScores.cleanness >= 8,
    generate: (_, c) => `${c.nameJa}の雑味のないクリーンな味わいが、すっきり好みの方におすすめです`,
    priority: 10,
  },
  {
    id: "aftertaste-match",
    condition: (p, c) => p.combinedProfile.aftertaste >= 6 && c.flavorScores.aftertaste >= 8,
    generate: (_, c) => `${c.nameJa}は余韻が長く続き、飲んだ後も風味を楽しめます`,
    priority: 11,
  },
  {
    id: "balance-match",
    condition: (_, c) => c.flavorScores.balance >= 8,
    generate: (_, c) => `${c.nameJa}は全体のバランスが良く、どなたにもおすすめできる味わいです`,
    priority: 12,
  },

  // === シーンマッチ系 ===
  {
    id: "morning-match",
    condition: (p, c) =>
      p.sceneFactors.some((f) => f.scene === "morningRefresh") && c.flavorScores.cleanness >= 7,
    generate: (_, c) => `朝のリフレッシュには${c.nameJa}のすっきりとした味わいが最適です`,
    priority: 13,
  },
  {
    id: "work-match",
    condition: (p, c) =>
      p.sceneFactors.some((f) => f.scene === "workFocus") && c.flavorScores.body >= 6,
    generate: (_, c) => `仕事中の集中には${c.nameJa}のしっかりしたボディが頼りになります`,
    priority: 14,
  },
  {
    id: "relax-match",
    condition: (p, c) =>
      p.sceneFactors.some((f) => f.scene === "relax") && c.flavorScores.sweetness >= 6,
    generate: (_, c) => `リラックスタイムには${c.nameJa}のやさしい甘みがぴったりです`,
    priority: 15,
  },
  {
    id: "after-meal-match",
    condition: (p, c) =>
      p.sceneFactors.some((f) => f.scene === "afterMeal") && c.flavorScores.aftertaste >= 7,
    generate: (_, c) => `食後のひとときには${c.nameJa}の心地よい余韻がおすすめです`,
    priority: 16,
  },
  {
    id: "dessert-match",
    condition: (p, c) =>
      p.sceneFactors.some((f) => f.scene === "withDessert") && c.flavorScores.body >= 5,
    generate: (_, c) => `お菓子と合わせるなら${c.nameJa}のしっかりした味わいが好相性です`,
    priority: 17,
  },

  // === ミルク/飲み方系 ===
  {
    id: "milk-match",
    condition: (p, c) => p.drinkStyle === "milk" && c.milkCompatibility >= 7,
    generate: (_, c) => `${c.nameJa}はミルクとの相性が抜群で、カフェラテやカプチーノに最適です`,
    priority: 18,
  },
  {
    id: "milk-body-match",
    condition: (p, c) => p.drinkStyle === "milk" && c.flavorScores.body >= 7,
    generate: (_, c) => `${c.nameJa}の力強いボディはミルクに負けず、しっかり味を楽しめます`,
    priority: 19,
  },

  // === ペアリング系 ===
  {
    id: "choco-dessert-pairing",
    condition: (p, c) =>
      p.implicit.chocolaty !== undefined && p.implicit.chocolaty >= 2 && c.flavorScores.chocolaty >= 5,
    generate: (_, c) => `チョコレート系のお菓子と${c.nameJa}のチョコ風味が互いを引き立てます`,
    priority: 20,
  },
  {
    id: "nut-dessert-pairing",
    condition: (p, c) =>
      p.implicit.nuttiness !== undefined && p.implicit.nuttiness >= 2 && c.flavorScores.nuttiness >= 5,
    generate: (_, c) => `ナッツ系のお菓子と${c.nameJa}のナッツ風味が調和します`,
    priority: 21,
  },
  {
    id: "berry-dessert-pairing",
    condition: (p, c) =>
      p.implicit.fruitiness !== undefined && p.implicit.fruitiness >= 2 && c.flavorScores.fruitiness >= 6,
    generate: (_, c) => `ベリー系のお菓子と${c.nameJa}のフルーティさが引き立て合います`,
    priority: 22,
  },
  {
    id: "wagashi-pairing",
    condition: (p, c) =>
      p.implicit.cleanness !== undefined && p.implicit.cleanness >= 2 && c.flavorScores.cleanness >= 7,
    generate: (_, c) => `和菓子の繊細な甘さと${c.nameJa}のクリーンな味わいは好相性です`,
    priority: 23,
  },
  {
    id: "caramel-pairing",
    condition: (p, c) =>
      p.implicit.sweetness !== undefined && p.implicit.sweetness >= 2 && c.flavorScores.sweetness >= 6,
    generate: (_, c) => `キャラメル系の甘さと${c.nameJa}の甘い風味がマッチします`,
    priority: 24,
  },

  // === 焙煎度理由 ===
  {
    id: "roast-light-reason",
    condition: (_, c) => c.roastLevel === "light" || c.roastLevel === "medium-light",
    generate: (_, c, roast) =>
      roast.primary === c.roastLevel || roast.secondary === c.roastLevel
        ? `${roastNameJa[c.roastLevel]}の${c.nameJa}は、繊細な風味を存分に楽しめます`
        : "",
    priority: 25,
  },
  {
    id: "roast-dark-reason",
    condition: (_, c) => c.roastLevel === "dark" || c.roastLevel === "medium-dark",
    generate: (_, c, roast) =>
      roast.primary === c.roastLevel || roast.secondary === c.roastLevel
        ? `${roastNameJa[c.roastLevel]}の${c.nameJa}は、力強い味わいが楽しめます`
        : "",
    priority: 26,
  },

  // === 産地特性理由 ===
  {
    id: "origin-highlight",
    condition: () => true,
    generate: (_, c) => {
      const highlights = getFlavorHighlights(c);
      if (highlights.length === 0) return "";
      return `${c.nameJa}は${highlights.slice(0, 3).join("・")}が特徴の産地です`;
    },
    priority: 30,
  },
];

/**
 * Step 6: 推薦理由を生成する
 */
export function generateReasons(
  pref: AnalyzedPreference,
  roast: RoastEstimation,
  coffee: CoffeeProfile,
  _score: number,
): string[] {
  const reasons: string[] = [];
  const sortedTemplates = [...templates].sort((a, b) => a.priority - b.priority);

  for (const tmpl of sortedTemplates) {
    if (reasons.length >= 4) break; // 最大4つの理由

    if (tmpl.condition(pref, coffee)) {
      const reason = tmpl.generate(pref, coffee, roast);
      if (reason && reason.length > 0 && !reasons.includes(reason)) {
        reasons.push(reason);
      }
    }
  }

  // フォールバック
  if (reasons.length === 0) {
    const highlights = getFlavorHighlights(coffee);
    if (highlights.length > 0) {
      reasons.push(`${coffee.nameJa}は${highlights.join("・")}が特徴で、お好みに合う味わいです`);
    } else {
      reasons.push(`${coffee.nameJa}はあなたの味の好みに合ったバランスの良いコーヒーです`);
    }
  }

  return reasons;
}
