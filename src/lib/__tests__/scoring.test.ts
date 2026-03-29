import { describe, it, expect } from "vitest";
import { calculateUserFlavorProfile } from "../scoring";
import type { TasteProfileInput } from "../../types/questionnaire";
import type { FlavorScores } from "../../types/coffee";

/** デフォルトの入力（全て中間値）を生成するヘルパー */
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

describe("calculateUserFlavorProfile", () => {
  it("デフォルト入力（全て中間値）で妥当なスコアが返ること", () => {
    // Given: 全スライダーが中間値3の入力
    const input = createDefaultInput();

    // When: フレーバープロファイルを計算
    const result = calculateUserFlavorProfile(input);

    // Then: 各スコアが1-10の中間付近の値になる
    const keys = Object.keys(result) as (keyof FlavorScores)[];
    for (const key of keys) {
      expect(result[key]).toBeGreaterThanOrEqual(1);
      expect(result[key]).toBeLessThanOrEqual(10);
    }
    // scaleToTen(3) = (3-1)*2.25+1 = 5.5
    // milkPreference=3 なので milkBonus = (3-2)*0.5 = 0.5
    // bitterness = 5.5 + 0.5 = 6.0, body = 5.5 + 0.5 = 6.0, roastiness = 5.5 + 0.5 = 6.0
    expect(result.bitterness).toBe(6);
    expect(result.body).toBe(6);
    expect(result.roastiness).toBe(6);
  });

  it("苦味好き入力 → bitterness スコアが高くなること", () => {
    // Given: 苦味好き（最大値5）、他は中間値
    const highBitter = createDefaultInput({ bitternessPreference: 5 });
    const lowBitter = createDefaultInput({ bitternessPreference: 1 });

    // When
    const highResult = calculateUserFlavorProfile(highBitter);
    const lowResult = calculateUserFlavorProfile(lowBitter);

    // Then: 苦味好きの方がbitternessスコアが高い
    expect(highResult.bitterness).toBeGreaterThan(lowResult.bitterness);
  });

  it("酸味好き入力 → acidity スコアが高くなること", () => {
    // Given: 酸味好き（最大値5）vs 酸味嫌い（最小値1）
    const highAcid = createDefaultInput({ acidityPreference: 5 });
    const lowAcid = createDefaultInput({ acidityPreference: 1 });

    // When
    const highResult = calculateUserFlavorProfile(highAcid);
    const lowResult = calculateUserFlavorProfile(lowAcid);

    // Then
    expect(highResult.acidity).toBeGreaterThan(lowResult.acidity);
  });

  it("チョコ好きのお菓子選択 → chocolaty, roastiness にボーナスが加算されること", () => {
    // Given: チョコ好き選択ありとなし
    const withChoco = createDefaultInput({
      dessertPreference: ["chocolate"],
    });
    const withoutChoco = createDefaultInput();

    // When
    const chocoResult = calculateUserFlavorProfile(withChoco);
    const baseResult = calculateUserFlavorProfile(withoutChoco);

    // Then: chocolate -> chocolaty +2, roastiness +1, bitterness +1
    expect(chocoResult.chocolaty).toBeGreaterThan(baseResult.chocolaty);
    expect(chocoResult.roastiness).toBeGreaterThan(baseResult.roastiness);
  });

  it("朝すっきりシーン選択 → cleanness が上がり、body が下がること", () => {
    // Given: morningRefresh シーン選択ありとなし
    const withMorning = createDefaultInput({
      drinkScenes: ["morningRefresh"],
    });
    const withoutMorning = createDefaultInput();

    // When
    const morningResult = calculateUserFlavorProfile(withMorning);
    const baseResult = calculateUserFlavorProfile(withoutMorning);

    // Then: morningRefresh -> cleanness +2, acidity +1, body -1
    expect(morningResult.cleanness).toBeGreaterThan(baseResult.cleanness);
    expect(morningResult.body).toBeLessThan(baseResult.body);
  });

  it("ミルク好き → body, bitterness, roastiness にボーナスが加算されること", () => {
    // Given: ミルク好き（5）vs ミルクなし（1）
    const milkLover = createDefaultInput({ milkPreference: 5 });
    const noMilk = createDefaultInput({ milkPreference: 1 });

    // When
    const milkResult = calculateUserFlavorProfile(milkLover);
    const noMilkResult = calculateUserFlavorProfile(noMilk);

    // Then: milkPreference>=3 でボーナスが付く
    expect(milkResult.body).toBeGreaterThan(noMilkResult.body);
    expect(milkResult.bitterness).toBeGreaterThan(noMilkResult.bitterness);
    expect(milkResult.roastiness).toBeGreaterThan(noMilkResult.roastiness);
  });

  it("全スコアが1-10の範囲にクランプされること（極端な入力でも範囲外にならない）", () => {
    // Given: 全て最大値で、ボーナスが多重に加算される極端な入力
    const extremeInput = createDefaultInput({
      bitternessPreference: 5,
      acidityPreference: 5,
      sweetnessPreference: 5,
      bodyPreference: 5,
      fruityPreference: 5,
      roastedPreference: 5,
      floralPreference: 5,
      nuttyPreference: 5,
      chocolatePreference: 5,
      milkPreference: 5,
      dessertPreference: [
        "chocolate",
        "nuts",
        "caramel",
        "citrusFruits",
        "berries",
        "wagashi",
        "butterPastry",
        "spicedSweets",
        "cheese",
        "driedFruits",
      ],
      drinkScenes: [
        "morningRefresh",
        "workFocus",
        "afterMeal",
        "withDessert",
        "relax",
        "strongWithMilk",
      ],
    });

    // When
    const result = calculateUserFlavorProfile(extremeInput);

    // Then: 全スコアが1-10の範囲内
    const keys = Object.keys(result) as (keyof FlavorScores)[];
    for (const key of keys) {
      expect(result[key]).toBeGreaterThanOrEqual(1);
      expect(result[key]).toBeLessThanOrEqual(10);
    }

    // 全て最小値の場合も確認
    const minInput = createDefaultInput({
      bitternessPreference: 1,
      acidityPreference: 1,
      sweetnessPreference: 1,
      bodyPreference: 1,
      fruityPreference: 1,
      roastedPreference: 1,
      floralPreference: 1,
      nuttyPreference: 1,
      chocolatePreference: 1,
      milkPreference: 1,
      dessertPreference: [],
      drinkScenes: [],
    });
    const minResult = calculateUserFlavorProfile(minInput);
    for (const key of keys) {
      expect(minResult[key]).toBeGreaterThanOrEqual(1);
      expect(minResult[key]).toBeLessThanOrEqual(10);
    }
  });

  it("複数のお菓子・シーンを選択した場合の加算が正しいこと", () => {
    // Given: 複数のお菓子とシーンを選択
    const singleDessert = createDefaultInput({
      dessertPreference: ["chocolate"],
    });
    const doubleDessert = createDefaultInput({
      dessertPreference: ["chocolate", "nuts"],
    });

    // When
    const singleResult = calculateUserFlavorProfile(singleDessert);
    const doubleResult = calculateUserFlavorProfile(doubleDessert);

    // Then: nuts は nuttiness +2, body +1 なので追加される
    expect(doubleResult.nuttiness).toBeGreaterThan(singleResult.nuttiness);

    // シーンの加算も確認
    const singleScene = createDefaultInput({
      drinkScenes: ["morningRefresh"],
    });
    const doubleScene = createDefaultInput({
      drinkScenes: ["morningRefresh", "workFocus"],
    });
    const singleSceneResult = calculateUserFlavorProfile(singleScene);
    const doubleSceneResult = calculateUserFlavorProfile(doubleScene);

    // workFocus は bitterness +1, body +1, roastiness +1
    // morningRefresh は body -1 なので、body は相殺されるが bitterness は加算される
    expect(doubleSceneResult.bitterness).toBeGreaterThan(
      singleSceneResult.bitterness,
    );
  });
});
