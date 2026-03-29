import { describe, it, expect } from "vitest";
import {
  questions,
  getBeginnerQuestions,
  getAdvancedQuestions,
} from "../questions";
import type { TasteProfileInput } from "../../../types/questionnaire";

describe("questions", () => {
  it("初心者用質問が10問であること", () => {
    // When
    const beginnerQuestions = getBeginnerQuestions();

    // Then
    expect(beginnerQuestions).toHaveLength(10);
  });

  it("中級者用質問が20問であること", () => {
    // When
    const advancedQuestions = getAdvancedQuestions();

    // Then
    expect(advancedQuestions).toHaveLength(20);
  });

  it("全質問にidとtextがあること", () => {
    // Then: 全質問がid, textを持つ
    for (const q of questions) {
      expect(q.id).toBeTruthy();
      expect(typeof q.id).toBe("string");
      expect(q.text).toBeTruthy();
      expect(typeof q.text).toBe("string");
    }
  });

  it("全質問のfieldがTasteProfileInputのキーであること", () => {
    // Given: TasteProfileInputの有効なキー一覧
    const validFields: (keyof TasteProfileInput)[] = [
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
      "dessertPreference",
      "drinkScenes",
    ];

    // Then: 全質問のfieldが有効なキーである
    for (const q of questions) {
      expect(validFields).toContain(q.field);
    }
  });
});
