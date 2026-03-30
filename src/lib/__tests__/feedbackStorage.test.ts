import { describe, it, expect, beforeEach } from "vitest";
import {
  saveFeedback,
  getFeedbackByDiagnosisId,
  getAllFeedback,
  getWeightAdjustments,
  saveWeightAdjustments,
  resetWeights,
  getDefaultWeights,
} from "../feedbackStorage";
import type { DiagnosisFeedback, WeightAdjustments } from "../../types/coffee";

function createFeedback(diagnosisId: string, rating: DiagnosisFeedback["rating"] = "good"): DiagnosisFeedback {
  return {
    diagnosisId,
    rating,
    createdAt: new Date().toISOString(),
  };
}

describe("feedbackStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("saveFeedback / getFeedbackByDiagnosisId", () => {
    it("フィードバック保存・取得が動作すること", () => {
      const feedback = createFeedback("diag-1", "perfect");
      saveFeedback(feedback);

      const retrieved = getFeedbackByDiagnosisId("diag-1");
      expect(retrieved).not.toBeNull();
      expect(retrieved!.diagnosisId).toBe("diag-1");
      expect(retrieved!.rating).toBe("perfect");
    });

    it("存在しないIDの場合はnullが返ること", () => {
      expect(getFeedbackByDiagnosisId("nonexistent")).toBeNull();
    });

    it("同じdiagnosisIdのフィードバックは上書きされること", () => {
      saveFeedback(createFeedback("diag-1", "good"));
      saveFeedback(createFeedback("diag-1", "wrong"));

      const all = getAllFeedback();
      expect(all).toHaveLength(1);
      expect(all[0].rating).toBe("wrong");
    });
  });

  describe("getAllFeedback", () => {
    it("複数のフィードバックを取得できること", () => {
      saveFeedback(createFeedback("diag-1"));
      saveFeedback(createFeedback("diag-2"));
      saveFeedback(createFeedback("diag-3"));

      const all = getAllFeedback();
      expect(all).toHaveLength(3);
    });

    it("何も保存していない場合は空配列が返ること", () => {
      expect(getAllFeedback()).toEqual([]);
    });
  });

  describe("saveWeightAdjustments / getWeightAdjustments", () => {
    it("重み保存・取得が動作すること", () => {
      const weights = getDefaultWeights();
      weights.bitterness = 1.5;
      weights.acidity = 0.8;

      saveWeightAdjustments(weights);

      const retrieved = getWeightAdjustments();
      expect(retrieved.bitterness).toBe(1.5);
      expect(retrieved.acidity).toBe(0.8);
    });

    it("何も保存していない場合はデフォルト重みが返ること", () => {
      const weights = getWeightAdjustments();
      for (const key of Object.keys(weights) as (keyof WeightAdjustments)[]) {
        expect(weights[key]).toBe(1.0);
      }
    });
  });

  describe("resetWeights", () => {
    it("リセットが動作すること", () => {
      const weights = getDefaultWeights();
      weights.bitterness = 1.8;
      saveWeightAdjustments(weights);

      // リセット前は変更された値
      expect(getWeightAdjustments().bitterness).toBe(1.8);

      resetWeights();

      // リセット後はデフォルト値
      const after = getWeightAdjustments();
      expect(after.bitterness).toBe(1.0);
    });
  });
});
