import { describe, it, expect } from "vitest";
import { calculateSimilarity, getTopRecommendations } from "../similarity";
import type { FlavorScores } from "../../types/coffee";
import { coffeeProfiles } from "../../data/coffeeProfiles";

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
    ...overrides,
  };
}

describe("calculateSimilarity", () => {
  it("同一プロファイル同士 → スコアが100であること", () => {
    // Given: 同じフレーバースコア
    const profile = createFlavorScores();

    // When
    const score = calculateSimilarity(profile, profile);

    // Then: コサイン類似度が完全一致で100
    expect(score).toBe(100);
  });

  it("真逆のプロファイル → スコアが低いこと", () => {
    // Given: 対照的なプロファイル
    const profileA = createFlavorScores({
      bitterness: 10,
      acidity: 1,
      sweetness: 1,
      body: 10,
      fruitiness: 1,
      floral: 1,
      nuttiness: 10,
      chocolaty: 10,
      roastiness: 10,
      cleanness: 1,
    });
    const profileB = createFlavorScores({
      bitterness: 1,
      acidity: 10,
      sweetness: 10,
      body: 1,
      fruitiness: 10,
      floral: 10,
      nuttiness: 1,
      chocolaty: 1,
      roastiness: 1,
      cleanness: 10,
    });

    // When
    const score = calculateSimilarity(profileA, profileB);

    // Then: 類似度が低い（同一が100なので、これは大幅に低い）
    expect(score).toBeLessThan(70);
  });

  it("スコアが0-100の範囲内であること", () => {
    // Given: 様々なプロファイル
    const profileA = createFlavorScores({ bitterness: 1, acidity: 10 });
    const profileB = createFlavorScores({ bitterness: 10, acidity: 1 });

    // When
    const score = calculateSimilarity(profileA, profileB);

    // Then
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});

describe("getTopRecommendations", () => {
  it("デフォルトで上位3件返ること", () => {
    // Given: 中間的なユーザープロファイル
    const userProfile = createFlavorScores();

    // When
    const results = getTopRecommendations(userProfile, coffeeProfiles);

    // Then
    expect(results).toHaveLength(3);
  });

  it("countを指定したらその件数返ること", () => {
    // Given
    const userProfile = createFlavorScores();

    // When
    const results = getTopRecommendations(userProfile, coffeeProfiles, 5);

    // Then
    expect(results).toHaveLength(5);
  });

  it("スコア順にソートされていること", () => {
    // Given
    const userProfile = createFlavorScores();

    // When
    const results = getTopRecommendations(userProfile, coffeeProfiles, 5);

    // Then: スコアが降順であること
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
    }
  });

  it("苦味好きユーザー → ブラジルやインドネシアが上位に来やすいこと", () => {
    // Given: 苦味・ボディ・ロースト感を重視するプロファイル
    const bitterLover = createFlavorScores({
      bitterness: 10,
      acidity: 1,
      sweetness: 3,
      body: 10,
      fruitiness: 1,
      floral: 1,
      nuttiness: 6,
      chocolaty: 7,
      roastiness: 10,
      cleanness: 2,
    });

    // When
    const results = getTopRecommendations(bitterLover, coffeeProfiles, 3);

    // Then: インドネシア マンデリンやブラジル サントスが上位に含まれる
    const topIds = results.map((r) => r.coffeeId);
    const hasDarkRoastOrigin =
      topIds.includes("indonesia-mandheling") ||
      topIds.includes("brazil-santos");
    expect(hasDarkRoastOrigin).toBe(true);
  });

  it("酸味・フルーティ好きユーザー → エチオピアやケニアが上位に来やすいこと", () => {
    // Given: 酸味・フルーティ・フローラルを重視するプロファイル
    const fruityLover = createFlavorScores({
      bitterness: 1,
      acidity: 10,
      sweetness: 7,
      body: 2,
      fruitiness: 10,
      floral: 9,
      nuttiness: 1,
      chocolaty: 1,
      roastiness: 1,
      cleanness: 8,
    });

    // When
    const results = getTopRecommendations(fruityLover, coffeeProfiles, 3);

    // Then: エチオピアやケニアが上位に含まれる
    const topIds = results.map((r) => r.coffeeId);
    const hasLightOrigin =
      topIds.includes("ethiopia-yirgacheffe") || topIds.includes("kenya-aa");
    expect(hasLightOrigin).toBe(true);
  });
});
