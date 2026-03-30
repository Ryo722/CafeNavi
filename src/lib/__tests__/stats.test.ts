import { describe, it, expect } from "vitest";
import { calculateStats } from "../stats";
import type { DiagnosisRecord } from "../storage";
import type { FlavorScores, RecommendationResult } from "../../types/coffee";
import type { TasteProfileInput } from "../../types/questionnaire";

function createFlavorScores(overrides: Partial<FlavorScores> = {}): FlavorScores {
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

function createInput(): TasteProfileInput {
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
  };
}

function createResult(overrides: Partial<RecommendationResult> = {}): RecommendationResult {
  return {
    topMatches: [
      { coffeeId: "ethiopia-yirgacheffe", score: 0.9, reasons: ["test"] },
    ],
    recommendedRoast: "medium",
    recommendedGrind: "medium",
    recommendedBrewingMethods: ["handDrip"],
    pairingSuggestions: [],
    avoidNotes: [],
    ...overrides,
  };
}

function createRecord(
  id: string,
  overrides: {
    date?: string;
    mode?: "beginner" | "advanced";
    flavorScores?: Partial<FlavorScores>;
    result?: Partial<RecommendationResult>;
  } = {},
): DiagnosisRecord {
  return {
    id,
    date: overrides.date ?? "2026-03-01T10:00:00Z",
    mode: overrides.mode ?? "beginner",
    input: createInput(),
    result: createResult(overrides.result),
    userFlavorProfile: createFlavorScores(overrides.flavorScores),
  };
}

describe("calculateStats", () => {
  it("空配列の場合、totalDiagnosesが0で空の統計を返すこと", () => {
    const stats = calculateStats([]);
    expect(stats.totalDiagnoses).toBe(0);
    expect(stats.topRecommendedCoffees).toEqual([]);
    expect(stats.preferredRoastLevels).toEqual([]);
    expect(stats.preferredBrewingMethods).toEqual([]);
    expect(stats.flavorTrend).toEqual([]);
    expect(stats.modeDistribution).toEqual([]);
  });

  it("1件のレコードで正しく統計を計算すること", () => {
    const records = [createRecord("1")];
    const stats = calculateStats(records);

    expect(stats.totalDiagnoses).toBe(1);
    expect(stats.averageFlavorProfile.bitterness).toBe(5);
    expect(stats.topRecommendedCoffees).toHaveLength(1);
    expect(stats.topRecommendedCoffees[0].coffeeId).toBe("ethiopia-yirgacheffe");
    expect(stats.topRecommendedCoffees[0].count).toBe(1);
  });

  it("複数レコードで味覚プロファイルの平均が正しいこと", () => {
    const records = [
      createRecord("1", { flavorScores: { bitterness: 2, acidity: 8 } }),
      createRecord("2", { flavorScores: { bitterness: 6, acidity: 4 } }),
    ];
    const stats = calculateStats(records);

    expect(stats.averageFlavorProfile.bitterness).toBe(4);
    expect(stats.averageFlavorProfile.acidity).toBe(6);
    // 変更していないものはデフォルト5のまま
    expect(stats.averageFlavorProfile.sweetness).toBe(5);
  });

  it("よく推薦されるコーヒーが正しくカウントされ上位5件であること", () => {
    const records = [
      createRecord("1", { result: { topMatches: [{ coffeeId: "a", score: 0.9, reasons: [] }] } }),
      createRecord("2", { result: { topMatches: [{ coffeeId: "a", score: 0.9, reasons: [] }] } }),
      createRecord("3", { result: { topMatches: [{ coffeeId: "b", score: 0.8, reasons: [] }] } }),
      createRecord("4", { result: { topMatches: [{ coffeeId: "a", score: 0.85, reasons: [] }] } }),
      createRecord("5", { result: { topMatches: [{ coffeeId: "c", score: 0.7, reasons: [] }] } }),
      createRecord("6", { result: { topMatches: [{ coffeeId: "d", score: 0.6, reasons: [] }] } }),
      createRecord("7", { result: { topMatches: [{ coffeeId: "e", score: 0.5, reasons: [] }] } }),
      createRecord("8", { result: { topMatches: [{ coffeeId: "f", score: 0.4, reasons: [] }] } }),
    ];
    const stats = calculateStats(records);

    expect(stats.topRecommendedCoffees.length).toBeLessThanOrEqual(5);
    expect(stats.topRecommendedCoffees[0].coffeeId).toBe("a");
    expect(stats.topRecommendedCoffees[0].count).toBe(3);
  });

  it("焙煎度の分布が正しくカウントされること", () => {
    const records = [
      createRecord("1", { result: { recommendedRoast: "light" } }),
      createRecord("2", { result: { recommendedRoast: "light" } }),
      createRecord("3", { result: { recommendedRoast: "dark" } }),
    ];
    const stats = calculateStats(records);

    const light = stats.preferredRoastLevels.find((r) => r.level === "light");
    const dark = stats.preferredRoastLevels.find((r) => r.level === "dark");
    expect(light?.count).toBe(2);
    expect(dark?.count).toBe(1);
  });

  it("抽出方法の分布が正しくカウントされること", () => {
    const records = [
      createRecord("1", { result: { recommendedBrewingMethods: ["handDrip", "espresso"] } }),
      createRecord("2", { result: { recommendedBrewingMethods: ["handDrip"] } }),
    ];
    const stats = calculateStats(records);

    const handDrip = stats.preferredBrewingMethods.find((b) => b.method === "handDrip");
    const espresso = stats.preferredBrewingMethods.find((b) => b.method === "espresso");
    expect(handDrip?.count).toBe(2);
    expect(espresso?.count).toBe(1);
  });

  it("味覚トレンドが日付順で最大10件であること", () => {
    const records: DiagnosisRecord[] = [];
    for (let i = 1; i <= 15; i++) {
      records.push(
        createRecord(String(i), {
          date: `2026-03-${String(i).padStart(2, "0")}T10:00:00Z`,
        }),
      );
    }
    const stats = calculateStats(records);

    expect(stats.flavorTrend.length).toBeLessThanOrEqual(10);
    // 日付昇順であること
    for (let i = 1; i < stats.flavorTrend.length; i++) {
      expect(stats.flavorTrend[i].date >= stats.flavorTrend[i - 1].date).toBe(true);
    }
  });

  it("モード分布が正しくカウントされること", () => {
    const records = [
      createRecord("1", { mode: "beginner" }),
      createRecord("2", { mode: "beginner" }),
      createRecord("3", { mode: "advanced" }),
    ];
    const stats = calculateStats(records);

    const beginner = stats.modeDistribution.find((m) => m.mode === "beginner");
    const advanced = stats.modeDistribution.find((m) => m.mode === "advanced");
    expect(beginner?.count).toBe(2);
    expect(advanced?.count).toBe(1);
  });

  it("topMatchesが空のレコードでもエラーにならないこと", () => {
    const records = [
      createRecord("1", { result: { topMatches: [] } }),
    ];
    expect(() => calculateStats(records)).not.toThrow();
    const stats = calculateStats(records);
    expect(stats.totalDiagnoses).toBe(1);
    expect(stats.topRecommendedCoffees).toEqual([]);
  });
});
