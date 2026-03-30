import type { AnalyzedPreference } from "../types";

export type SynergyRule = {
  id: string;
  name: string;
  conditions: (pref: AnalyzedPreference) => boolean;
  effect: (scores: Record<string, number>) => Record<string, number>;
  description: string;
};

/** コーヒーIDに部分一致するスコアにボーナス/ペナルティを適用 */
function applyMultiplier(
  scores: Record<string, number>,
  predicate: (id: string) => boolean,
  multiplier: number,
): Record<string, number> {
  const result = { ...scores };
  for (const id of Object.keys(result)) {
    if (predicate(id)) {
      result[id] *= multiplier;
    }
  }
  return result;
}

export const synergyRules: SynergyRule[] = [
  // 1. 苦味好き × ミルク派 → 深煎り/中深煎りボーナス
  {
    id: "bitter-milk",
    name: "苦味好き×ミルク派",
    conditions: (pref) =>
      pref.combinedProfile.bitterness >= 6 && pref.drinkStyle === "milk",
    effect: (scores) => {
      const result = { ...scores };
      for (const id of Object.keys(result)) {
        // マンデリン、ブラジル、東ティモール、インドマラバール等深煎り系にボーナス
        if (["indonesia-mandheling", "brazil-santos", "east-timor", "india-malabar"].includes(id)) {
          result[id] *= 1.15;
        }
      }
      return result;
    },
    description: "苦味好き＋ミルク派は深煎り/中深煎りの相性が良い",
  },

  // 2. 酸味好き × 朝シーン → 浅煎り/クリーンカップボーナス
  {
    id: "acid-morning",
    name: "酸味好き×朝シーン",
    conditions: (pref) =>
      pref.combinedProfile.acidity >= 6 &&
      pref.sceneFactors.some((f) => f.scene === "morningRefresh"),
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["ethiopia-yirgacheffe", "costarica-tarrazu", "tanzania-kilimanjaro", "kenya-aa", "burundi"].includes(id),
        1.1,
      ),
    description: "酸味好き＋朝は浅煎り/クリーンカップの相性が良い",
  },

  // 3. フルーティ好き × ミルク派 → 高酸味候補にペナルティ
  {
    id: "fruity-milk-conflict",
    name: "フルーティ好き×ミルク派（コンフリクト）",
    conditions: (pref) =>
      pref.combinedProfile.fruitiness >= 6 && pref.drinkStyle === "milk",
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["kenya-aa", "burundi"].includes(id),
        0.9,
      ),
    description: "フルーティ好きでもミルク派の場合、高酸味候補はペナルティ",
  },

  // 4. チョコ好き × デザートシーン → 中深煎り/甘み候補ボーナス
  {
    id: "choco-dessert",
    name: "チョコ好き×デザートシーン",
    conditions: (pref) =>
      pref.combinedProfile.chocolaty >= 6 &&
      pref.sceneFactors.some((f) => f.scene === "withDessert"),
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["guatemala-antigua", "nicaragua", "el-salvador", "east-timor"].includes(id),
        1.1,
      ),
    description: "チョコ好き＋デザートシーンは中深煎り/甘み系の相性が良い",
  },

  // 5. ナッツ好き × 仕事シーン → バランス型ボーナス
  {
    id: "nutty-work",
    name: "ナッツ好き×仕事シーン",
    conditions: (pref) =>
      pref.combinedProfile.nuttiness >= 6 &&
      pref.sceneFactors.some((f) => f.scene === "workFocus"),
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["brazil-santos", "guatemala-antigua", "colombia-huila", "mexico", "myanmar"].includes(id),
        1.05,
      ),
    description: "ナッツ好き＋仕事シーンはバランス型の相性が良い",
  },

  // 6. 花好き × リラックス → フローラル/浅煎りボーナス
  {
    id: "floral-relax",
    name: "花好き×リラックス",
    conditions: (pref) =>
      pref.combinedProfile.floral >= 6 &&
      pref.sceneFactors.some((f) => f.scene === "relax"),
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["panama-geisha", "ethiopia-yirgacheffe", "bolivia", "china-yunnan"].includes(id),
        1.1,
      ),
    description: "花好き＋リラックスはフローラル/浅煎りの相性が良い",
  },

  // 7. 酸味嫌い × フルーティ好き → 中煎りのフルーティ候補にボーナス（矛盾解決）
  {
    id: "acid-dislike-fruity-like",
    name: "酸味嫌い×フルーティ好き（矛盾解決）",
    conditions: (pref) =>
      pref.dislikeFlags.acidity === true && pref.combinedProfile.fruitiness >= 6,
    effect: (scores) => {
      // 酸味が強い浅煎りにペナルティ、中煎りのフルーティにボーナス
      const result = { ...scores };
      for (const id of ["kenya-aa", "burundi", "tanzania-kilimanjaro"]) {
        if (result[id]) result[id] *= 0.85;
      }
      // イエメンやルワンダは中煎り寄りのフルーティなのでボーナス
      for (const id of ["yemen-mocha", "rwanda", "honduras"]) {
        if (result[id]) result[id] *= 1.1;
      }
      return result;
    },
    description: "酸味嫌いだがフルーティ好きの場合、中煎りのフルーティ候補を優先",
  },

  // 8. 苦味嫌い × 深煎り好き → 甘み/チョコ系深煎りに限定
  {
    id: "bitter-dislike-dark-like",
    name: "苦味嫌い×深煎り好き",
    conditions: (pref) =>
      pref.dislikeFlags.bitterness === true && pref.combinedProfile.roastiness >= 6,
    effect: (scores) => {
      const result = { ...scores };
      // 苦味が非常に強いマンデリンにペナルティ
      if (result["indonesia-mandheling"]) result["indonesia-mandheling"] *= 0.8;
      // 甘み/チョコ系の中深煎りにボーナス
      for (const id of ["el-salvador", "nicaragua", "east-timor"]) {
        if (result[id]) result[id] *= 1.1;
      }
      return result;
    },
    description: "苦味嫌いだが深煎り好きの場合、甘み/チョコ系深煎りを優先",
  },

  // 9. ミルク派 × アイス → body高め/甘み高めボーナス
  {
    id: "milk-iced",
    name: "ミルク派×アイス",
    conditions: (pref) =>
      pref.drinkStyle === "milk" &&
      pref.sceneFactors.some((f) => f.scene === "morningRefresh"),
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["brazil-santos", "colombia-huila", "guatemala-antigua"].includes(id),
        1.08,
      ),
    description: "ミルク×アイスはボディ/甘み高めの相性が良い",
  },

  // 10. ブラック × 朝 → cleanness高/acidity適度にボーナス
  {
    id: "black-morning",
    name: "ブラック×朝",
    conditions: (pref) =>
      pref.drinkStyle === "black" &&
      pref.sceneFactors.some((f) => f.scene === "morningRefresh"),
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["costarica-tarrazu", "jamaica-blue-mountain", "hawaii-kona", "colombia-huila"].includes(id),
        1.1,
      ),
    description: "ブラック＋朝はクリーンカップの相性が良い",
  },

  // 11. ベリー好き → ナチュラル精製ボーナス
  {
    id: "berry-natural",
    name: "ベリー好き→ナチュラル精製",
    conditions: (pref) =>
      pref.combinedProfile.fruitiness >= 7 && pref.combinedProfile.sweetness >= 6,
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["yemen-mocha", "ethiopia-yirgacheffe", "rwanda", "bolivia"].includes(id),
        1.1,
      ),
    description: "ベリー系が好きならナチュラル精製のコーヒーが合う",
  },

  // 12. キャラメル好き × 甘党 → 中煎り/ハニー精製ボーナス
  {
    id: "caramel-sweet",
    name: "キャラメル好き×甘党",
    conditions: (pref) =>
      pref.combinedProfile.sweetness >= 7 && pref.combinedProfile.chocolaty >= 5,
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["colombia-huila", "honduras", "costarica-tarrazu", "el-salvador"].includes(id),
        1.08,
      ),
    description: "キャラメル好き/甘党にはハニー精製/中煎りが合う",
  },

  // 13. すっきり好き → クリーンカップ/水出しボーナス
  {
    id: "clean-refreshing",
    name: "すっきり好き",
    conditions: (pref) =>
      pref.combinedProfile.cleanness >= 7 && pref.combinedProfile.body <= 4,
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["costarica-tarrazu", "jamaica-blue-mountain", "hawaii-kona", "colombia-huila"].includes(id),
        1.1,
      ),
    description: "すっきり好きにはクリーンカップの高い産地が合う",
  },

  // 14. 重厚好き → 深煎り/body高/フレンチプレスボーナス
  {
    id: "heavy-bodied",
    name: "重厚好き",
    conditions: (pref) =>
      pref.combinedProfile.body >= 7 && pref.combinedProfile.roastiness >= 6,
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["indonesia-mandheling", "india-malabar", "east-timor", "papua-new-guinea"].includes(id),
        1.12,
      ),
    description: "重厚好きにはボディの強い深煎り系が合う",
  },

  // 15. 和菓子好き × 繊細派 → クリーン/フローラル/中煎りボーナス
  {
    id: "wagashi-delicate",
    name: "和菓子好き×繊細派",
    conditions: (pref) =>
      pref.combinedProfile.cleanness >= 6 && pref.combinedProfile.floral >= 5,
    effect: (scores) =>
      applyMultiplier(
        scores,
        (id) => ["costarica-tarrazu", "jamaica-blue-mountain", "peru", "china-yunnan"].includes(id),
        1.08,
      ),
    description: "和菓子好き/繊細派にはクリーン/フローラル系が合う",
  },
];
