import type {
  BrewingMethod,
  CoffeeProfile,
  FlavorScores,
  GrindSize,
  RecommendationResult,
  RoastLevel,
} from "../types/coffee";
import type { TasteProfileInput } from "../types/questionnaire";
import type { Locale } from "./i18n/types";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { pairingByRoast } from "../data/pairingData";
import { calculateUserFlavorProfile } from "./scoring";
import { getTopRecommendations } from "./similarity";
import { ja } from "./i18n/ja";
import { en } from "./i18n/en";

const translations: Record<Locale, Record<string, string>> = {
  ja: ja as Record<string, string>,
  en: en as Record<string, string>,
};

function tl(locale: Locale, key: string, params?: Record<string, string>): string {
  const template = translations[locale][key] ?? translations.ja[key] ?? key;
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => params[k] ?? _);
}

/**
 * 推薦理由を生成する。locale に応じて日本語/英語で返す。
 */
export function generateRecommendationReasons(
  userInput: TasteProfileInput,
  userProfile: FlavorScores,
  coffee: CoffeeProfile,
  locale: Locale = "ja",
): string[] {
  const reasons: string[] = [];
  const fs = coffee.flavorScores;
  const coffeeName = tl(locale, `coffee.${coffee.id}.name`);

  // 苦味の好みとの一致
  if (userProfile.bitterness >= 6 && fs.bitterness >= 6) {
    reasons.push(tl(locale, "reason.bitterMatch", { name: coffeeName }));
  } else if (userProfile.bitterness <= 4 && fs.bitterness <= 4) {
    reasons.push(tl(locale, "reason.bitterLow"));
  }

  // 酸味の好みとの一致
  if (userProfile.acidity >= 6 && fs.acidity >= 6) {
    reasons.push(tl(locale, "reason.acidityHigh"));
  } else if (userProfile.acidity <= 3 && fs.acidity <= 3) {
    reasons.push(tl(locale, "reason.acidityLow"));
  }

  // フルーティの好み
  if (userProfile.fruitiness >= 6 && fs.fruitiness >= 6) {
    reasons.push(tl(locale, "reason.fruityMatch"));
  }

  // チョコ・ナッツ系お菓子の好み
  if (
    userInput.dessertPreference.includes("chocolate") &&
    fs.chocolaty >= 5
  ) {
    reasons.push(tl(locale, "reason.chocoMatch", { name: coffeeName }));
  }

  if (
    userInput.dessertPreference.includes("nuts") &&
    fs.nuttiness >= 5
  ) {
    reasons.push(tl(locale, "reason.nutMatch", { name: coffeeName }));
  }

  // ベリー・柑橘系お菓子の好み
  if (
    (userInput.dessertPreference.includes("berries") ||
      userInput.dessertPreference.includes("citrusFruits")) &&
    fs.fruitiness >= 6
  ) {
    reasons.push(tl(locale, "reason.fruitDessertMatch"));
  }

  // 和菓子好き
  if (
    userInput.dessertPreference.includes("wagashi") &&
    fs.cleanness >= 7
  ) {
    reasons.push(tl(locale, "reason.wagashiMatch"));
  }

  // シーンに基づく理由
  if (
    userInput.drinkScenes.includes("morningRefresh") &&
    fs.cleanness >= 7
  ) {
    reasons.push(tl(locale, "reason.morningScene"));
  }

  if (
    userInput.drinkScenes.includes("workFocus") &&
    fs.body >= 6
  ) {
    reasons.push(tl(locale, "reason.workScene"));
  }

  if (
    userInput.drinkScenes.includes("relax") &&
    fs.sweetness >= 6
  ) {
    reasons.push(tl(locale, "reason.relaxScene"));
  }

  // ミルク派
  if (userInput.milkPreference >= 4 && fs.body >= 6) {
    reasons.push(tl(locale, "reason.milkMatch"));
  }

  // フローラル
  if (userProfile.floral >= 6 && fs.floral >= 7) {
    reasons.push(tl(locale, "reason.floralMatch"));
  }

  // 理由が少ない場合のフォールバック
  if (reasons.length === 0) {
    reasons.push(tl(locale, "reason.fallback"));
  }

  return reasons;
}

/**
 * ユーザーが避けた方がよい傾向を生成する。
 */
export function generateAvoidNotes(
  userProfile: FlavorScores,
  locale: Locale = "ja",
): string[] {
  const notes: string[] = [];

  if (userProfile.bitterness <= 2) {
    notes.push(tl(locale, "avoid.deepRoast"));
  }

  if (userProfile.acidity <= 2) {
    notes.push(tl(locale, "avoid.lightRoastAfrica"));
  }

  if (userProfile.body <= 2) {
    notes.push(tl(locale, "avoid.heavyBody"));
  }

  if (userProfile.fruitiness <= 2 && userProfile.floral <= 2) {
    notes.push(tl(locale, "avoid.fruityFloral"));
  }

  if (userProfile.roastiness <= 2) {
    notes.push(tl(locale, "avoid.strongRoast"));
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
  locale: Locale = "ja",
): RecommendationResult {
  // ユーザーの味覚プロファイルを算出
  const userProfile = calculateUserFlavorProfile(input);

  // トップマッチを取得
  const topMatches = getTopRecommendations(userProfile, profiles, 3);

  // 各マッチに推薦理由を付与
  const topMatchesWithReasons = topMatches.map((match) => {
    const coffee = profiles.find((p) => p.id === match.coffeeId);
    const reasons = coffee
      ? generateRecommendationReasons(input, userProfile, coffee, locale)
      : [tl(locale, "reason.fallback")];
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
  const avoidNotes = generateAvoidNotes(userProfile, locale);

  return {
    topMatches: topMatchesWithReasons,
    recommendedRoast,
    recommendedGrind,
    recommendedBrewingMethods,
    pairingSuggestions,
    avoidNotes,
  };
}
