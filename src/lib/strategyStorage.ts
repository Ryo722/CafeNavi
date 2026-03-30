import type { RecommendationStrategy } from "./recommendation/types";

const STORAGE_KEY = "cafenavi_strategy";

/**
 * 現在のアクティブなストラテジーを取得する。
 * URLパラメータ > LocalStorage > デフォルト(v2) の優先順位。
 */
export function getActiveStrategy(): RecommendationStrategy {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "v1" || stored === "v2") return stored;
  } catch {
    // localStorage利用不可
  }
  return "v2";
}

/**
 * ストラテジーをLocalStorageに保存する。
 */
export function setActiveStrategy(strategy: RecommendationStrategy): void {
  try {
    localStorage.setItem(STORAGE_KEY, strategy);
  } catch {
    // 無視
  }
}
