import type { CoffeeProfile } from "../../types/coffee";
import type { TasteProfileInput } from "../../types/questionnaire";
import { coffeeProfiles } from "../../data/coffeeProfiles";

/** コールドスタート向けの初心者おすすめコーヒーID */
const COLD_START_IDS = [
  "colombia-huila",         // バランス良好、初心者向け
  "brazil-santos",          // 万人受け、穏やかな味
  "guatemala-antigua",      // チョコ＆ナッツ、中煎りの万能型
  "costarica-tarrazu",      // クリーンで飲みやすい
  "honduras",               // バランスの良いクリーンカップ
];

/**
 * コールドスタート（初回ユーザー・デフォルト入力）向けの推薦を返す。
 * バランスが良く、初心者にも飲みやすいコーヒーを返す。
 */
export function getColdStartRecommendations(
  profiles: CoffeeProfile[] = coffeeProfiles,
): CoffeeProfile[] {
  const result: CoffeeProfile[] = [];

  for (const id of COLD_START_IDS) {
    const profile = profiles.find((p) => p.id === id);
    if (profile) {
      result.push(profile);
    }
  }

  return result.slice(0, 5);
}

/**
 * ユーザー入力がデフォルト（全スライダーが3）のままかどうかを判定する。
 * デフォルトのまま = コールドスタート対象。
 */
export function isColdStartInput(input: TasteProfileInput): boolean {
  const sliderFields: (keyof TasteProfileInput)[] = [
    "bitternessPreference",
    "acidityPreference",
    "sweetnessPreference",
    "bodyPreference",
    "fruityPreference",
    "roastedPreference",
    "floralPreference",
    "nuttyPreference",
    "chocolatePreference",
    "milkPreference",
  ];

  const allDefault = sliderFields.every((field) => {
    const val = input[field];
    return typeof val === "number" && val === 3;
  });

  const noSelections =
    input.dessertPreference.length === 0 && input.drinkScenes.length === 0;

  return allDefault && noSelections;
}
