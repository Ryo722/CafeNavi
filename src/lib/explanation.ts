import type {
  BrewingMethod,
  CoffeeProfile,
  FlavorScores,
  GrindSize,
  RecommendationResult,
  RoastLevel,
} from "../types/coffee";
import type { TasteProfileInput } from "../types/questionnaire";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { pairingByRoast } from "../data/pairingData";
import { calculateUserFlavorProfile } from "./scoring";
import { getTopRecommendations } from "./similarity";
import { getWeightAdjustments } from "./feedbackStorage";

/**
 * 推薦理由を日本語の自然文で生成する。
 */
export function generateRecommendationReasons(
  userInput: TasteProfileInput,
  userProfile: FlavorScores,
  coffee: CoffeeProfile,
): string[] {
  const reasons: string[] = [];
  const fs = coffee.flavorScores;

  // 苦味の好みとの一致
  if (userProfile.bitterness >= 6 && fs.bitterness >= 6) {
    reasons.push(
      "しっかりとした苦味がお好みなので、苦味のある" +
        coffee.nameJa +
        "がおすすめです",
    );
  } else if (userProfile.bitterness <= 4 && fs.bitterness <= 4) {
    reasons.push(
      "苦味控えめがお好みに合う、飲みやすい味わいです",
    );
  }

  // 酸味の好みとの一致
  if (userProfile.acidity >= 6 && fs.acidity >= 6) {
    reasons.push(
      "フルーツのような明るい酸味が楽しめます",
    );
  } else if (userProfile.acidity <= 3 && fs.acidity <= 3) {
    reasons.push("酸味控えめで飲みやすい味わいです");
  }

  // フルーティの好み
  if (userProfile.fruitiness >= 6 && fs.fruitiness >= 6) {
    reasons.push(
      "フルーティな風味がお好みに合います",
    );
  }

  // チョコ・ナッツ系お菓子の好み
  if (
    userInput.dessertPreference.includes("chocolate") &&
    fs.chocolaty >= 5
  ) {
    reasons.push(
      "チョコレート系のお菓子がお好きなので、チョコレート感のある" +
        coffee.nameJa +
        "がおすすめです",
    );
  }

  if (
    userInput.dessertPreference.includes("nuts") &&
    fs.nuttiness >= 5
  ) {
    reasons.push(
      "ナッツ系のお菓子がお好きなので、ナッツの風味がある" +
        coffee.nameJa +
        "が合います",
    );
  }

  // ベリー・柑橘系お菓子の好み
  if (
    (userInput.dessertPreference.includes("berries") ||
      userInput.dessertPreference.includes("citrusFruits")) &&
    fs.fruitiness >= 6
  ) {
    reasons.push(
      "フルーツ系のお菓子がお好きなので、フルーティな味わいが楽しめます",
    );
  }

  // 和菓子好き
  if (
    userInput.dessertPreference.includes("wagashi") &&
    fs.cleanness >= 7
  ) {
    reasons.push(
      "和菓子がお好きなので、クリーンな味わいとの相性が良いです",
    );
  }

  // シーンに基づく理由
  if (
    userInput.drinkScenes.includes("morningRefresh") &&
    fs.cleanness >= 7
  ) {
    reasons.push(
      "朝すっきり飲みたいシーンには、クリーンな味わいが最適です",
    );
  }

  if (
    userInput.drinkScenes.includes("workFocus") &&
    fs.body >= 6
  ) {
    reasons.push(
      "仕事中の集中タイムには、しっかりしたボディが頼りになります",
    );
  }

  if (
    userInput.drinkScenes.includes("relax") &&
    fs.sweetness >= 6
  ) {
    reasons.push(
      "リラックスタイムには、甘みのある穏やかな味わいがぴったりです",
    );
  }

  // ミルク派
  if (userInput.milkPreference >= 4 && fs.body >= 6) {
    reasons.push(
      "ミルクを入れても負けない、しっかりとしたボディがあります",
    );
  }

  // フローラル
  if (userProfile.floral >= 6 && fs.floral >= 7) {
    reasons.push(
      "華やかなフローラルアロマが楽しめます",
    );
  }

  // 理由が少ない場合のフォールバック
  if (reasons.length === 0) {
    reasons.push(
      "お好みの味覚プロファイルとの相性が良い一杯です",
    );
  }

  return reasons;
}

/**
 * ユーザーが避けた方がよい傾向を日本語で生成する。
 */
export function generateAvoidNotes(
  userProfile: FlavorScores,
): string[] {
  const notes: string[] = [];

  if (userProfile.bitterness <= 2) {
    notes.push(
      "深煎りの強い苦味は苦手かもしれません。浅煎り〜中煎りがおすすめです",
    );
  }

  if (userProfile.acidity <= 2) {
    notes.push(
      "酸味の強い浅煎りアフリカ産は合わない可能性があります",
    );
  }

  if (userProfile.body <= 2) {
    notes.push(
      "重厚なボディのコーヒー（マンデリンなど）は重く感じるかもしれません",
    );
  }

  if (userProfile.fruitiness <= 2 && userProfile.floral <= 2) {
    notes.push(
      "華やかでフルーティな浅煎りコーヒーは好みに合わない可能性があります",
    );
  }

  if (userProfile.roastiness <= 2) {
    notes.push(
      "焙煎感の強い深煎りコーヒーは避けた方が良いでしょう",
    );
  }

  return notes;
}

/**
 * ユーザーのスコアから最適な焙煎度を判定する。
 */
function recommendRoastLevel(profile: FlavorScores): RoastLevel {
  const darkScore = profile.bitterness + profile.roastiness + profile.body;
  const lightScore = profile.acidity + profile.fruitiness + profile.floral;

  const diff = darkScore - lightScore;

  if (diff >= 8) return "dark";
  if (diff >= 4) return "medium-dark";
  if (diff >= -2) return "medium";
  if (diff >= -6) return "medium-light";
  return "light";
}

/**
 * ユーザーのスコアと焙煎度から抽出方法を推薦する。
 */
function recommendBrewingMethods(
  profile: FlavorScores,
): BrewingMethod[] {
  const methods: { method: BrewingMethod; score: number }[] = [
    {
      method: "espresso",
      score: profile.body * 1.5 + profile.bitterness + profile.roastiness,
    },
    {
      method: "handDrip",
      score: profile.cleanness * 1.5 + profile.acidity + profile.floral,
    },
    {
      method: "frenchPress",
      score: profile.body * 1.5 + profile.sweetness + profile.nuttiness,
    },
    {
      method: "coldBrew",
      score: profile.cleanness + profile.sweetness * 1.5 + (10 - profile.bitterness),
    },
  ];

  methods.sort((a, b) => b.score - a.score);

  // 上位2つを推薦
  return methods.slice(0, 2).map((m) => m.method);
}

/**
 * 推薦された抽出方法に合わせて挽き目を決定する。
 */
function recommendGrindSize(method: BrewingMethod): GrindSize {
  const grindMap: Record<BrewingMethod, GrindSize> = {
    espresso: "fine",
    handDrip: "medium-fine",
    frenchPress: "coarse",
    coldBrew: "coarse",
  };
  return grindMap[method];
}

/**
 * 全ての推薦ロジックを統合して最終結果を返す。
 */
export function getFullRecommendation(
  input: TasteProfileInput,
  profiles: CoffeeProfile[] = coffeeProfiles,
): RecommendationResult {
  // ユーザーの味覚プロファイルを算出
  const userProfile = calculateUserFlavorProfile(input);

  // 保存された重みを読み込んで類似度計算に使用
  const weights = getWeightAdjustments();

  // トップマッチを取得
  const topMatches = getTopRecommendations(userProfile, profiles, 3, weights);

  // 各マッチに推薦理由を付与
  const topMatchesWithReasons = topMatches.map((match) => {
    const coffee = profiles.find((p) => p.id === match.coffeeId);
    const reasons = coffee
      ? generateRecommendationReasons(input, userProfile, coffee)
      : ["お好みに合うコーヒーです"];
    return { ...match, reasons };
  });

  // 焙煎度推薦
  const recommendedRoast = recommendRoastLevel(userProfile);

  // 抽出方法推薦
  const recommendedBrewingMethods = recommendBrewingMethods(userProfile);

  // 挽き目推薦（第一推薦の抽出方法に基づく）
  const recommendedGrind = recommendGrindSize(recommendedBrewingMethods[0]);

  // ペアリング推薦
  const pairingSuggestions = pairingByRoast[recommendedRoast] ?? [];

  // 避けた方がよいノート
  const avoidNotes = generateAvoidNotes(userProfile);

  return {
    topMatches: topMatchesWithReasons,
    recommendedRoast,
    recommendedGrind,
    recommendedBrewingMethods,
    pairingSuggestions,
    avoidNotes,
  };
}
