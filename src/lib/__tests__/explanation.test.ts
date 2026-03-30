import { describe, it, expect } from "vitest";
import {
  generateRecommendationReasons,
  generateAvoidNotes,
  getFullRecommendation,
} from "../explanation";
import type { FlavorScores } from "../../types/coffee";
import type { TasteProfileInput } from "../../types/questionnaire";
import { coffeeProfiles } from "../../data/coffeeProfiles";

/** デフォルトの入力を生成するヘルパー */
function createDefaultInput(
  overrides: Partial<TasteProfileInput> = {},
): TasteProfileInput {
  return {
    bitternessPreference: 3,
    acidityPreference: 3,
    sweetnessPreference: 3,
    bodyPreference: 3,
    fruityPreference: 3,
    roastedPreference: 3,
    floralPreference: 3,
    nuttyPreference: 3,
    chocolatePreference: 3,
    milkPreference: 3,
    dessertPreference: [],
    drinkScenes: [],
    ...overrides,
  };
}

/** テスト用のFlavorScoresを生成するヘルパー */
function createFlavorScores(
  overrides: Partial<FlavorScores> = {},
): FlavorScores {
  return {
    bitterness: 5,
    acidity: 5,
    sweetness: 5,
    body: 5,
    fruitiness: 5,
    floral: 5,
    nuttiness: 5,
    chocolaty: 5,
    roastiness: 5,
    cleanness: 5,
    aftertaste: 5,
    balance: 5,
    ...overrides,
  };
}

describe("generateRecommendationReasons", () => {
  it("推薦理由が1つ以上の文字列配列で返ること", () => {
    // Given: デフォルト入力とコーヒープロファイル
    const input = createDefaultInput();
    const userProfile = createFlavorScores();
    const coffee = coffeeProfiles[0]; // エチオピア

    // When
    const reasons = generateRecommendationReasons(
      input,
      userProfile,
      coffee,
    );

    // Then
    expect(Array.isArray(reasons)).toBe(true);
    expect(reasons.length).toBeGreaterThanOrEqual(1);
  });

  it("理由の文字列が空でないこと", () => {
    // Given
    const input = createDefaultInput();
    const userProfile = createFlavorScores();
    const coffee = coffeeProfiles[0];

    // When
    const reasons = generateRecommendationReasons(
      input,
      userProfile,
      coffee,
    );

    // Then: 各理由が空文字でない
    for (const reason of reasons) {
      expect(typeof reason).toBe("string");
      expect(reason.length).toBeGreaterThan(0);
    }
  });

  it("チョコ好きユーザー x チョコ感高いコーヒー → チョコ関連の理由が含まれること", () => {
    // Given: チョコ好きの入力 × チョコ感高いコーヒー（グアテマラ: chocolaty=7）
    const input = createDefaultInput({
      dessertPreference: ["chocolate"],
    });
    const userProfile = createFlavorScores({ chocolaty: 8 });
    const guatemala = coffeeProfiles.find(
      (p) => p.id === "guatemala-antigua",
    )!;

    // When
    const reasons = generateRecommendationReasons(
      input,
      userProfile,
      guatemala,
    );

    // Then: チョコレート関連の理由が含まれる
    const hasChocoReason = reasons.some((r) => r.includes("チョコレート"));
    expect(hasChocoReason).toBe(true);
  });
});

describe("generateAvoidNotes", () => {
  it("回避ノートが文字列配列で返ること", () => {
    // Given: 中間的なプロファイル
    const profile = createFlavorScores();

    // When
    const notes = generateAvoidNotes(profile);

    // Then
    expect(Array.isArray(notes)).toBe(true);
  });

  it("苦味嫌い → 深煎り回避が示唆されること", () => {
    // Given: 苦味が非常に低いプロファイル
    const profile = createFlavorScores({ bitterness: 1 });

    // When
    const notes = generateAvoidNotes(profile);

    // Then: 深煎りに関する回避ノートが含まれる
    const hasDeepRoastWarning = notes.some((n) => n.includes("深煎り"));
    expect(hasDeepRoastWarning).toBe(true);
  });

  it("酸味嫌い → 浅煎り回避が示唆されること", () => {
    // Given: 酸味が非常に低いプロファイル
    const profile = createFlavorScores({ acidity: 1 });

    // When
    const notes = generateAvoidNotes(profile);

    // Then: 浅煎りに関する回避ノートが含まれる
    const hasLightRoastWarning = notes.some((n) => n.includes("浅煎り"));
    expect(hasLightRoastWarning).toBe(true);
  });
});

describe("getFullRecommendation", () => {
  it("RecommendationResult型に準拠した結果が返ること", () => {
    // Given: デフォルト入力
    const input = createDefaultInput();

    // When
    const result = getFullRecommendation(input, coffeeProfiles);

    // Then: 必要なプロパティが全て存在する
    expect(result).toHaveProperty("topMatches");
    expect(result).toHaveProperty("recommendedRoast");
    expect(result).toHaveProperty("recommendedGrind");
    expect(result).toHaveProperty("recommendedBrewingMethods");
    expect(result).toHaveProperty("pairingSuggestions");
    expect(result).toHaveProperty("avoidNotes");
  });

  it("topMatchesが3件あること", () => {
    // Given
    const input = createDefaultInput();

    // When
    const result = getFullRecommendation(input, coffeeProfiles);

    // Then
    expect(result.topMatches).toHaveLength(3);
    // 各マッチにcoffeeId, score, reasonsがある
    for (const match of result.topMatches) {
      expect(match.coffeeId).toBeTruthy();
      expect(typeof match.score).toBe("number");
      expect(Array.isArray(match.reasons)).toBe(true);
      expect(match.reasons.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("recommendedRoast, recommendedGrind, recommendedBrewingMethods が空でないこと", () => {
    // Given
    const input = createDefaultInput();

    // When
    const result = getFullRecommendation(input, coffeeProfiles);

    // Then
    expect(result.recommendedRoast).toBeTruthy();
    expect(result.recommendedGrind).toBeTruthy();
    expect(result.recommendedBrewingMethods.length).toBeGreaterThanOrEqual(1);
  });

  it("pairingSuggestions が空でないこと", () => {
    // Given
    const input = createDefaultInput();

    // When
    const result = getFullRecommendation(input, coffeeProfiles);

    // Then
    expect(result.pairingSuggestions.length).toBeGreaterThanOrEqual(1);
  });
});
