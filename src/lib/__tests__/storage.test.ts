import { describe, it, expect, beforeEach } from "vitest";
import {
  saveDiagnosis,
  getDiagnosisHistory,
  getDiagnosisById,
  deleteDiagnosis,
  clearAllDiagnoses,
} from "../storage";
import type { DiagnosisRecord } from "../storage";
import type { TasteProfileInput } from "../../types/questionnaire";
import type { FlavorScores, RecommendationResult } from "../../types/coffee";

/** テスト用のデフォルト入力 */
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

function createDefaultFlavorScores(): FlavorScores {
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
  };
}

function createDefaultResult(): RecommendationResult {
  return {
    topMatches: [
      { coffeeId: "test-coffee", score: 0.85, reasons: ["テスト理由"] },
    ],
    recommendedRoast: "medium",
    recommendedGrind: "medium",
    recommendedBrewingMethods: ["handDrip"],
    pairingSuggestions: ["チョコレート"],
    avoidNotes: [],
  };
}

function createRecord(id: string): DiagnosisRecord {
  return {
    id,
    date: new Date().toISOString(),
    mode: "beginner",
    input: createDefaultInput(),
    result: createDefaultResult(),
    userFlavorProfile: createDefaultFlavorScores(),
  };
}

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("saveDiagnosis", () => {
    it("保存が正しく動作すること", () => {
      const record = createRecord("1");
      saveDiagnosis(record);

      const history = getDiagnosisHistory();
      expect(history).toHaveLength(1);
      expect(history[0].id).toBe("1");
    });

    it("新しいレコードが先頭に追加されること", () => {
      saveDiagnosis(createRecord("1"));
      saveDiagnosis(createRecord("2"));

      const history = getDiagnosisHistory();
      expect(history).toHaveLength(2);
      expect(history[0].id).toBe("2");
      expect(history[1].id).toBe("1");
    });
  });

  describe("getDiagnosisHistory", () => {
    it("保存した履歴を取得できること", () => {
      saveDiagnosis(createRecord("a"));
      saveDiagnosis(createRecord("b"));
      saveDiagnosis(createRecord("c"));

      const history = getDiagnosisHistory();
      expect(history).toHaveLength(3);
      expect(history.map((r) => r.id)).toEqual(["c", "b", "a"]);
    });

    it("何も保存していない場合は空配列が返ること", () => {
      expect(getDiagnosisHistory()).toEqual([]);
    });
  });

  describe("getDiagnosisById", () => {
    it("IDで取得できること", () => {
      saveDiagnosis(createRecord("target"));
      saveDiagnosis(createRecord("other"));

      const found = getDiagnosisById("target");
      expect(found).not.toBeNull();
      expect(found!.id).toBe("target");
    });

    it("存在しないIDの場合はnullが返ること", () => {
      saveDiagnosis(createRecord("1"));
      expect(getDiagnosisById("nonexistent")).toBeNull();
    });
  });

  describe("deleteDiagnosis", () => {
    it("削除が正しく動作すること", () => {
      saveDiagnosis(createRecord("1"));
      saveDiagnosis(createRecord("2"));
      saveDiagnosis(createRecord("3"));

      deleteDiagnosis("2");

      const history = getDiagnosisHistory();
      expect(history).toHaveLength(2);
      expect(history.map((r) => r.id)).toEqual(["3", "1"]);
    });
  });

  describe("clearAllDiagnoses", () => {
    it("全削除が動作すること", () => {
      saveDiagnosis(createRecord("1"));
      saveDiagnosis(createRecord("2"));

      clearAllDiagnoses();

      expect(getDiagnosisHistory()).toEqual([]);
    });
  });

  describe("最大50件制限", () => {
    it("50件を超えた場合、古いものから削除されること", () => {
      // 55件保存
      for (let i = 1; i <= 55; i++) {
        saveDiagnosis(createRecord(String(i)));
      }

      const history = getDiagnosisHistory();
      expect(history).toHaveLength(50);
      // 最新の55が先頭、最古の6が末尾（1〜5は削除済み）
      expect(history[0].id).toBe("55");
      expect(history[49].id).toBe("6");
    });
  });

  describe("LocalStorageが使えない場合のフォールバック", () => {
    it("getDiagnosisHistoryが空配列を返すこと", () => {
      const original = globalThis.localStorage;
      // localStorageを使用不可にする
      Object.defineProperty(globalThis, "localStorage", {
        get() {
          throw new Error("localStorage is not available");
        },
        configurable: true,
      });

      expect(getDiagnosisHistory()).toEqual([]);

      // 復元
      Object.defineProperty(globalThis, "localStorage", {
        value: original,
        configurable: true,
        writable: true,
      });
    });

    it("saveDiagnosisがエラーを投げないこと", () => {
      const original = globalThis.localStorage;
      Object.defineProperty(globalThis, "localStorage", {
        get() {
          throw new Error("localStorage is not available");
        },
        configurable: true,
      });

      expect(() => saveDiagnosis(createRecord("1"))).not.toThrow();

      Object.defineProperty(globalThis, "localStorage", {
        value: original,
        configurable: true,
        writable: true,
      });
    });
  });
});
