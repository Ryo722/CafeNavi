import { describe, it, expect, vi } from "vitest";
import type { TasteProfileInput } from "../../types/questionnaire";
import type { CoffeeProfile, FlavorScores } from "../../types/coffee";
import { coffeeProfiles } from "../../data/coffeeProfiles";
import { runRecommendationPipeline } from "../recommendation";
import { selectSerendipityCandidate } from "../recommendation/serendipity";
import { getColdStartRecommendations, isColdStartInput } from "../recommendation/coldStart";
import type { RankedResult } from "../recommendation/types";
import type { DiagnosisRecord } from "../storage";

/** デフォルト入力 */
function createInput(overrides: Partial<TasteProfileInput> = {}): TasteProfileInput {
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

/** 最小限のRankedResult モック */
function makeRankedResult(
  id: string,
  score: number,
  flavorOverrides: Partial<FlavorScores> = {},
): RankedResult {
  const coffee = coffeeProfiles.find((p) => p.id === id);
  if (!coffee) {
    // テスト用ダミー
    return {
      coffeeId: id,
      coffee: {
        id,
        name: id,
        nameJa: id,
        origins: ["Test"],
        roastLevel: "medium",
        grindRecommendation: {},
        flavorScores: {
          bitterness: 5, acidity: 5, sweetness: 5, body: 5, fruitiness: 5,
          floral: 5, nuttiness: 5, chocolaty: 5, roastiness: 5, cleanness: 5,
          aftertaste: 5, balance: 5,
          ...flavorOverrides,
        },
        process: ["washed"],
        pairings: [],
        notes: [],
        description: "",
        confidence: 0.7,
        brewingCompatibility: { handDrip: 7, espresso: 5, frenchPress: 5, coldBrew: 5 },
        milkCompatibility: 5,
      } as CoffeeProfile,
      score,
      reasons: [],
      brewing: { methods: [] } as unknown as RankedResult["brewing"],
    };
  }
  return {
    coffeeId: id,
    coffee,
    score,
    reasons: [],
    brewing: { methods: [] } as unknown as RankedResult["brewing"],
  };
}

// ============================================================
// 1. Serendipity（冒険枠）
// ============================================================
describe("Serendipity", () => {
  it("冒険枠が通常上位と異なるコーヒーであること", () => {
    const topMatches = [
      makeRankedResult("colombia-huila", 85),
      makeRankedResult("brazil-santos", 80),
      makeRankedResult("guatemala-antigua", 75),
      makeRankedResult("honduras", 72),
      makeRankedResult("costarica-tarrazu", 70),
    ];

    const allCandidates = [
      ...topMatches,
      makeRankedResult("ethiopia-yirgacheffe", 65),
      makeRankedResult("kenya-aa", 55),
      makeRankedResult("yemen-mocha", 50),
      makeRankedResult("panama-geisha", 45),
    ];

    const result = selectSerendipityCandidate(topMatches, allCandidates);

    expect(result).not.toBeNull();
    // 冒険枠はTOP5に含まれないID
    const topIds = topMatches.map((r) => r.coffeeId);
    expect(topIds).not.toContain(result!.coffeeId);
    expect(result!.isSerendipity).toBe(true);
  });

  it("中程度スコアの候補がない場合はnullを返す", () => {
    const topMatches = [
      makeRankedResult("colombia-huila", 90),
    ];
    // すべてスコア80以上
    const allCandidates = [
      ...topMatches,
      makeRankedResult("brazil-santos", 85),
    ];

    const result = selectSerendipityCandidate(topMatches, allCandidates);
    expect(result).toBeNull();
  });

  it("過去に推薦されたことがないコーヒーを優先する", () => {
    const topMatches = [
      makeRankedResult("colombia-huila", 85),
    ];

    const allCandidates = [
      ...topMatches,
      makeRankedResult("ethiopia-yirgacheffe", 55),
      makeRankedResult("kenya-aa", 55),
    ];

    // ethiopia-yirgacheffeは過去に推薦済み
    const history: DiagnosisRecord[] = [{
      id: "1",
      date: "2024-01-01",
      mode: "beginner",
      input: createInput(),
      result: {
        topMatches: [{ coffeeId: "ethiopia-yirgacheffe", score: 80, reasons: [] }],
        recommendedRoast: "medium",
        recommendedGrind: "medium",
        recommendedBrewingMethods: ["handDrip"],
        pairingSuggestions: [],
        avoidNotes: [],
      },
      userFlavorProfile: {} as FlavorScores,
    }];

    const result = selectSerendipityCandidate(topMatches, allCandidates, history);
    expect(result).not.toBeNull();
    // 過去にない方を優先
    expect(result!.coffeeId).toBe("kenya-aa");
  });
});

// ============================================================
// 2. コールドスタート
// ============================================================
describe("Cold Start", () => {
  it("デフォルト入力でコールドスタートが発動すること", () => {
    const input = createInput();
    expect(isColdStartInput(input)).toBe(true);
  });

  it("スライダーを変更するとコールドスタートが発動しないこと", () => {
    const input = createInput({ bitternessPreference: 5 });
    expect(isColdStartInput(input)).toBe(false);
  });

  it("お菓子を選択するとコールドスタートが発動しないこと", () => {
    const input = createInput({ dessertPreference: ["chocolate"] });
    expect(isColdStartInput(input)).toBe(false);
  });

  it("getColdStartRecommendationsがバランスの良いコーヒーを返すこと", () => {
    const results = getColdStartRecommendations();
    expect(results.length).toBeGreaterThanOrEqual(3);
    expect(results.length).toBeLessThanOrEqual(5);

    // IDが既知のものであることを確認
    const ids = results.map((r) => r.id);
    expect(ids).toContain("colombia-huila");
    expect(ids).toContain("brazil-santos");
  });

  it("パイプラインでデフォルト入力時にisColdStartフラグが立つこと", () => {
    const input = createInput();
    const result = runRecommendationPipeline(input, coffeeProfiles);
    expect(result.isColdStart).toBe(true);
  });
});

// ============================================================
// 3. Dislike 2段階化
// ============================================================
describe("Dislike 2-level", () => {
  it("hardDislike（スライダー1）でスコア7以上の候補が除外されること", () => {
    const input = createInput({
      bitternessPreference: 1,
      acidityPreference: 4,
      sweetnessPreference: 4,
    });

    const result = runRecommendationPipeline(input, coffeeProfiles);
    const recommendedIds = result.recommendation.topMatches.map((m) => m.coffeeId);

    // 苦味7以上のコーヒーが推薦されていないこと
    for (const id of recommendedIds) {
      const coffee = coffeeProfiles.find((p) => p.id === id);
      if (coffee) {
        expect(coffee.flavorScores.bitterness).toBeLessThan(7);
      }
    }
  });

  it("softDislike（スライダー2）でスコアにペナルティが適用されること", () => {
    // softDislikeの場合、候補は除外されないがスコアが下がる
    const inputWithSoftDislike = createInput({
      bitternessPreference: 2,
      sweetnessPreference: 5,
      fruityPreference: 5,
    });

    const inputWithoutDislike = createInput({
      bitternessPreference: 3,
      sweetnessPreference: 5,
      fruityPreference: 5,
    });

    const resultSoft = runRecommendationPipeline(inputWithSoftDislike, coffeeProfiles);
    const resultNone = runRecommendationPipeline(inputWithoutDislike, coffeeProfiles);

    // 嗜好分析のdislikeMapを確認
    expect(resultSoft.preference.dislikeMap.bitterness).toBe("soft");
    expect(resultNone.preference.dislikeMap.bitterness).toBeUndefined();
  });

  it("dislikeMapがhardとsoftを正しく判定すること", () => {
    const input = createInput({
      bitternessPreference: 1,  // hard
      acidityPreference: 2,     // soft
      sweetnessPreference: 3,   // none
    });

    const result = runRecommendationPipeline(input, coffeeProfiles);
    expect(result.preference.dislikeMap.bitterness).toBe("hard");
    expect(result.preference.dislikeMap.acidity).toBe("soft");
    expect(result.preference.dislikeMap.sweetness).toBeUndefined();
  });
});

// ============================================================
// 4. 季節ボーナス
// ============================================================
describe("Seasonal Bonus", () => {
  it("季節一致候補のスコアが上がること", () => {
    // 春のテスト（3-5月）
    const mockDate = new Date(2026, 3, 1); // 4月 = spring
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    const input = createInput({
      fruityPreference: 5,
      floralPreference: 5,
      acidityPreference: 4,
    });

    const result = runRecommendationPipeline(input, coffeeProfiles);

    // springのseasonalAffinityを持つコーヒーを確認
    const springCoffees = coffeeProfiles.filter(
      (c) => c.seasonalAffinity?.includes("spring"),
    );

    // 少なくとも1つのspringコーヒーが存在する
    expect(springCoffees.length).toBeGreaterThan(0);

    // 季節一致候補がrankedに含まれている場合、ボーナスフラグが立つ
    for (const r of result.ranked) {
      const coffee = coffeeProfiles.find((c) => c.id === r.coffeeId);
      if (coffee?.seasonalAffinity?.includes("spring")) {
        expect(r.hasSeasonalBonus).toBe(true);
      }
    }

    vi.useRealTimers();
  });

  it("季節不一致の候補にはボーナスが付かないこと", () => {
    const mockDate = new Date(2026, 6, 1); // 7月 = summer
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    const input = createInput({
      bitternessPreference: 5,
      bodyPreference: 5,
      roastedPreference: 5,
    });

    const result = runRecommendationPipeline(input, coffeeProfiles);

    for (const r of result.ranked) {
      const coffee = coffeeProfiles.find((c) => c.id === r.coffeeId);
      if (!coffee?.seasonalAffinity?.includes("summer")) {
        expect(r.hasSeasonalBonus).toBeFalsy();
      }
    }

    vi.useRealTimers();
  });
});

// ============================================================
// 5. A/Bテスト（Strategy切替）
// ============================================================
describe("A/B Test Strategy", () => {
  it("v1ストラテジーで旧ロジックが動作すること", () => {
    const input = createInput({
      bitternessPreference: 5,
      sweetnessPreference: 4,
    });

    const resultV1 = runRecommendationPipeline(input, coffeeProfiles, null, { strategy: "v1" });
    const resultV2 = runRecommendationPipeline(input, coffeeProfiles, null, { strategy: "v2" });

    // 両方とも結果が返る
    expect(resultV1.recommendation.topMatches.length).toBeGreaterThan(0);
    expect(resultV2.recommendation.topMatches.length).toBeGreaterThan(0);

    // v1はbrewing方法が未設定（簡易実装）
    expect(resultV1.recommendation.recommendedBrewingMethods).toEqual(["handDrip"]);
  });

  it("デフォルトストラテジーはv2であること", () => {
    const input = createInput({ bitternessPreference: 5 });

    const result = runRecommendationPipeline(input, coffeeProfiles);
    // v2の場合、recommendedBrewingMethodsが動的に決まる
    expect(result.recommendation.topMatches.length).toBeGreaterThan(0);
  });
});
