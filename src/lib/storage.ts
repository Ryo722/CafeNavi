import type { RecommendationResult, FlavorScores } from "../types/coffee";
import type { TasteProfileInput } from "../types/questionnaire";

/** 診断履歴の1件 */
export type DiagnosisRecord = {
  id: string;
  date: string;
  mode: "beginner" | "advanced";
  input: TasteProfileInput;
  result: RecommendationResult;
  userFlavorProfile: FlavorScores;
};

const STORAGE_KEY = "cafenavi_history";
const MAX_RECORDS = 50;

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

/** 診断結果を保存する（最大50件、古いものから削除） */
export function saveDiagnosis(record: DiagnosisRecord): void {
  if (!isLocalStorageAvailable()) return;

  const history = getDiagnosisHistory();
  history.unshift(record);

  // 最大件数を超えた場合、古いものを削除
  const trimmed = history.slice(0, MAX_RECORDS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // 容量オーバー等の場合は無視
  }
}

/** 保存済みの診断履歴を全件取得する（新しい順） */
export function getDiagnosisHistory(): DiagnosisRecord[] {
  if (!isLocalStorageAvailable()) return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** IDで診断履歴を1件取得する */
export function getDiagnosisById(id: string): DiagnosisRecord | null {
  const history = getDiagnosisHistory();
  return history.find((r) => r.id === id) ?? null;
}

/** IDを指定して診断履歴を1件削除する */
export function deleteDiagnosis(id: string): void {
  if (!isLocalStorageAvailable()) return;

  const history = getDiagnosisHistory();
  const filtered = history.filter((r) => r.id !== id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // 無視
  }
}

/** 診断履歴を全件削除する */
export function clearAllDiagnoses(): void {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 無視
  }
}
