import type { DiagnosisFeedback, WeightAdjustments, FlavorScores } from "../types/coffee";

const FEEDBACK_KEY = "cafenavi_feedback";
const WEIGHTS_KEY = "cafenavi_weights";

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__cafenavi_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getDefaultWeights(): WeightAdjustments {
  return {
    bitterness: 1.0,
    acidity: 1.0,
    sweetness: 1.0,
    body: 1.0,
    fruitiness: 1.0,
    floral: 1.0,
    nuttiness: 1.0,
    chocolaty: 1.0,
    roastiness: 1.0,
    cleanness: 1.0,
  } as Record<keyof FlavorScores, number>;
}

export function saveFeedback(feedback: DiagnosisFeedback): void {
  if (!isLocalStorageAvailable()) return;

  const all = getAllFeedback();
  // 同じ diagnosisId があれば上書き
  const idx = all.findIndex((f) => f.diagnosisId === feedback.diagnosisId);
  if (idx >= 0) {
    all[idx] = feedback;
  } else {
    all.unshift(feedback);
  }

  try {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(all));
  } catch {
    // 容量オーバー等の場合は無視
  }
}

export function getFeedbackByDiagnosisId(diagnosisId: string): DiagnosisFeedback | null {
  const all = getAllFeedback();
  return all.find((f) => f.diagnosisId === diagnosisId) ?? null;
}

export function getAllFeedback(): DiagnosisFeedback[] {
  if (!isLocalStorageAvailable()) return [];

  try {
    const raw = localStorage.getItem(FEEDBACK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getWeightAdjustments(): WeightAdjustments {
  if (!isLocalStorageAvailable()) return getDefaultWeights();

  try {
    const raw = localStorage.getItem(WEIGHTS_KEY);
    if (!raw) return getDefaultWeights();
    const parsed = JSON.parse(raw);
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as WeightAdjustments;
    }
    return getDefaultWeights();
  } catch {
    return getDefaultWeights();
  }
}

export function saveWeightAdjustments(weights: WeightAdjustments): void {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.setItem(WEIGHTS_KEY, JSON.stringify(weights));
  } catch {
    // 無視
  }
}

export function resetWeights(): void {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.removeItem(WEIGHTS_KEY);
  } catch {
    // 無視
  }
}
