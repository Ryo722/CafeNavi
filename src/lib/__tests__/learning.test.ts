import { describe, it, expect } from "vitest";
import { adjustWeightsFromFeedback } from "../learning";
import type { DiagnosisFeedback, WeightAdjustments, FlavorScores } from "../../types/coffee";
import type { DiagnosisRecord } from "../storage";
import type { TasteProfileInput } from "../../types/questionnaire";
import { getDefaultWeights } from "../feedbackStorage";

function createDefaultFlavorScores(
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

function createDefaultInput(): TasteProfileInput {
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

function createDiagnosisRecord(
  flavorOverrides: Partial<FlavorScores> = {},
): DiagnosisRecord {
  return {
    id: "test-1",
    date: new Date().toISOString(),
    mode: "beginner",
    input: createDefaultInput(),
    result: {
      topMatches: [
        { coffeeId: "test-coffee", score: 85, reasons: ["テスト理由"] },
      ],
      recommendedRoast: "medium",
      recommendedGrind: "medium",
      recommendedBrewingMethods: ["handDrip"],
      pairingSuggestions: ["チョコレート"],
      avoidNotes: [],
    },
    userFlavorProfile: createDefaultFlavorScores(flavorOverrides),
  };
}

function createFeedback(
  rating: DiagnosisFeedback["rating"],
): DiagnosisFeedback {
  return {
    diagnosisId: "test-1",
    rating,
    createdAt: new Date().toISOString(),
  };
}

describe("adjustWeightsFromFeedback", () => {
  it("\"wrong\" フィードバックで重みが調整されること", () => {
    const weights = getDefaultWeights();
    // 苦味・ボディ・焙煎感が高く、酸味・フルーティ・フローラルが低いプロファイル
    const record = createDiagnosisRecord({
      bitterness: 10,
      body: 9,
      roastiness: 8,
      acidity: 2,
      fruitiness: 1,
      floral: 1,
    });
    const feedback = createFeedback("wrong");

    const newWeights = adjustWeightsFromFeedback(weights, feedback, record);

    // 高スコア軸（bitterness, body, roastiness）の重みが下がっている
    expect(newWeights.bitterness).toBeLessThan(1.0);
    expect(newWeights.body).toBeLessThan(1.0);
    expect(newWeights.roastiness).toBeLessThan(1.0);

    // 低スコア軸（acidity, fruitiness, floral）の重みが上がっている
    expect(newWeights.acidity).toBeGreaterThan(1.0);
    expect(newWeights.fruitiness).toBeGreaterThan(1.0);
    expect(newWeights.floral).toBeGreaterThan(1.0);
  });

  it("\"perfect\" フィードバックで重みが微増すること", () => {
    const weights = getDefaultWeights();
    const record = createDiagnosisRecord({
      bitterness: 10,
      body: 9,
      roastiness: 8,
    });
    const feedback = createFeedback("perfect");

    const newWeights = adjustWeightsFromFeedback(weights, feedback, record);

    // 高スコア軸の重みが微増
    expect(newWeights.bitterness).toBeGreaterThan(1.0);
    expect(newWeights.body).toBeGreaterThan(1.0);
    expect(newWeights.roastiness).toBeGreaterThan(1.0);

    // 微増なので大きく変わらない
    expect(newWeights.bitterness).toBeLessThanOrEqual(1.05);
  });

  it("\"neutral\" で重みが変わらないこと", () => {
    const weights = getDefaultWeights();
    const record = createDiagnosisRecord();
    const feedback = createFeedback("neutral");

    const newWeights = adjustWeightsFromFeedback(weights, feedback, record);

    // 全軸が1.0のまま
    for (const key of Object.keys(weights) as (keyof WeightAdjustments)[]) {
      expect(newWeights[key]).toBe(1.0);
    }
  });

  it("重みが0.5-2.0の範囲にクランプされること", () => {
    // 既に最低値に近い重みからさらに下げるケース
    const weights = getDefaultWeights();
    weights.bitterness = 0.52;
    weights.body = 0.52;
    weights.roastiness = 0.52;

    const record = createDiagnosisRecord({
      bitterness: 10,
      body: 9,
      roastiness: 8,
    });
    const feedback = createFeedback("wrong");

    const newWeights = adjustWeightsFromFeedback(weights, feedback, record);

    // 0.5未満にはならない
    expect(newWeights.bitterness).toBeGreaterThanOrEqual(0.5);
    expect(newWeights.body).toBeGreaterThanOrEqual(0.5);
    expect(newWeights.roastiness).toBeGreaterThanOrEqual(0.5);

    // 既に最高値に近い重みからさらに上げるケース
    const weights2 = getDefaultWeights();
    weights2.acidity = 1.95;
    weights2.fruitiness = 1.95;
    weights2.floral = 1.95;

    const record2 = createDiagnosisRecord({
      bitterness: 10,
      body: 9,
      roastiness: 8,
      acidity: 2,
      fruitiness: 1,
      floral: 1,
    });

    const newWeights2 = adjustWeightsFromFeedback(weights2, createFeedback("wrong"), record2);

    // 2.0を超えない
    expect(newWeights2.acidity).toBeLessThanOrEqual(2.0);
    expect(newWeights2.fruitiness).toBeLessThanOrEqual(2.0);
    expect(newWeights2.floral).toBeLessThanOrEqual(2.0);
  });

  it("デフォルト重みが全軸1.0であること", () => {
    const weights = getDefaultWeights();

    for (const key of Object.keys(weights) as (keyof WeightAdjustments)[]) {
      expect(weights[key]).toBe(1.0);
    }
  });
});
