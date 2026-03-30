import { describe, it, expect } from "vitest";
import type { FlavorScores } from "../../types/coffee";
import {
  classifyTasteType,
  getSecondaryType,
  TASTE_TYPES,
} from "../tasteType";

function createProfile(overrides: Partial<FlavorScores> = {}): FlavorScores {
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

describe("classifyTasteType", () => {
  it("苦味・焙煎感が高いプロファイル → ビター派", () => {
    const profile = createProfile({ bitterness: 9, roastiness: 8 });
    const result = classifyTasteType(profile);
    expect(result.id).toBe("bitter");
  });

  it("フルーツ・酸味が高いプロファイル → フルーティ派", () => {
    const profile = createProfile({ fruitiness: 9, acidity: 8 });
    const result = classifyTasteType(profile);
    expect(result.id).toBe("fruity");
  });

  it("均一なプロファイル → バランス派", () => {
    const profile = createProfile({
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
    });
    const result = classifyTasteType(profile);
    expect(result.id).toBe("balance");
  });

  it("チョコ・ナッツが高い → チョコ&ナッツ派", () => {
    const profile = createProfile({ chocolaty: 9, nuttiness: 8 });
    const result = classifyTasteType(profile);
    expect(result.id).toBe("choco-nut");
  });

  it("フローラル・クリーンが高い → フローラル派", () => {
    const profile = createProfile({ floral: 9, cleanness: 8 });
    const result = classifyTasteType(profile);
    expect(result.id).toBe("floral");
  });

  it("ボディ・焙煎感が高い → ヘビーボディ派", () => {
    const profile = createProfile({
      body: 9,
      roastiness: 8,
      bitterness: 3,
    });
    const result = classifyTasteType(profile);
    expect(result.id).toBe("heavy-body");
  });

  it("甘み・チョコが高い → スイート派", () => {
    const profile = createProfile({
      sweetness: 9,
      chocolaty: 8,
      nuttiness: 3,
    });
    const result = classifyTasteType(profile);
    expect(result.id).toBe("sweet");
  });

  it("クリーン・酸味が高い（フルーツは低い） → クリーン派", () => {
    const profile = createProfile({
      cleanness: 9,
      acidity: 8,
      fruitiness: 3,
      floral: 3,
    });
    const result = classifyTasteType(profile);
    expect(result.id).toBe("clean");
  });

  it("どの基準にも該当しない場合はバランス派", () => {
    // 全て低い値で標準偏差が大きい（バランス派のcriteriaにも該当しない）が、
    // フォールバックでバランス派が返る
    const profile = createProfile({
      bitterness: 1,
      acidity: 3,
      sweetness: 6,
      body: 2,
      fruitiness: 4,
      floral: 1,
      nuttiness: 3,
      chocolaty: 2,
      roastiness: 5,
      cleanness: 4,
    });
    const result = classifyTasteType(profile);
    expect(result.id).toBe("balance");
  });
});

describe("getSecondaryType", () => {
  it("セカンダリタイプが返る場合", () => {
    // fruitiness + acidity >= 14 → フルーティ派（メイン）
    // cleanness + acidity >= 14 → クリーン派（サブ）
    const profile = createProfile({
      fruitiness: 9,
      acidity: 8,
      cleanness: 8,
    });
    const main = classifyTasteType(profile);
    const secondary = getSecondaryType(profile);
    expect(main.id).toBe("fruity");
    expect(secondary).not.toBeNull();
    expect(secondary!.id).toBe("clean");
  });

  it("1タイプのみ該当する場合はnullが返る", () => {
    const profile = createProfile({
      bitterness: 9,
      roastiness: 8,
      body: 3,
      fruitiness: 2,
      acidity: 2,
      floral: 2,
      cleanness: 2,
      chocolaty: 2,
      nuttiness: 2,
      sweetness: 2,
    });
    const secondary = getSecondaryType(profile);
    expect(secondary).toBeNull();
  });
});

describe("TASTE_TYPES定義の整合性", () => {
  it("全タイプにid, nameJa, nameEn, emojiがあること", () => {
    for (const tt of TASTE_TYPES) {
      expect(tt.id).toBeTruthy();
      expect(tt.nameJa).toBeTruthy();
      expect(tt.nameEn).toBeTruthy();
      expect(tt.emoji).toBeTruthy();
      expect(typeof tt.criteria).toBe("function");
      expect(typeof tt.priority).toBe("number");
    }
  });

  it("8タイプが定義されていること", () => {
    expect(TASTE_TYPES).toHaveLength(8);
  });

  it("優先度が一意であること", () => {
    const priorities = TASTE_TYPES.map((t) => t.priority);
    expect(new Set(priorities).size).toBe(TASTE_TYPES.length);
  });
});
