import type { FlavorScores } from "../types/coffee";

export type TasteType = {
  id: string;
  nameJa: string;
  nameEn: string;
  emoji: string;
  descriptionJa: string;
  descriptionEn: string;
  criteria: (profile: FlavorScores) => boolean;
  priority: number;
};

/** 判定閾値: 2軸の合計がこの値以上でマッチとみなす */
const THRESHOLD = 14;

/** 全スコアの標準偏差が閾値以下ならバランス型とみなす */
const BALANCE_STD_THRESHOLD = 1.5;

function standardDeviation(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

export const TASTE_TYPES: TasteType[] = [
  {
    id: "fruity",
    nameJa: "フルーティ派",
    nameEn: "Fruity Type",
    emoji: "🍊",
    descriptionJa: "フルーツのような爽やかさを楽しむタイプ",
    descriptionEn: "You enjoy refreshing, fruit-like flavors",
    criteria: (p) => p.fruitiness + p.acidity >= THRESHOLD,
    priority: 1,
  },
  {
    id: "bitter",
    nameJa: "ビター派",
    nameEn: "Bitter Type",
    emoji: "☕",
    descriptionJa: "深い苦味とコクを愛するタイプ",
    descriptionEn: "You love deep bitterness and rich body",
    criteria: (p) => p.bitterness + p.roastiness >= THRESHOLD,
    priority: 2,
  },
  {
    id: "choco-nut",
    nameJa: "チョコ&ナッツ派",
    nameEn: "Choco & Nut Type",
    emoji: "🍫",
    descriptionJa: "チョコやナッツの風味が好きなタイプ",
    descriptionEn: "You love chocolate and nutty flavors",
    criteria: (p) => p.chocolaty + p.nuttiness >= THRESHOLD,
    priority: 3,
  },
  {
    id: "floral",
    nameJa: "フローラル派",
    nameEn: "Floral Type",
    emoji: "🌸",
    descriptionJa: "繊細な花の香りを楽しむタイプ",
    descriptionEn: "You enjoy delicate floral aromas",
    criteria: (p) => p.floral + p.cleanness >= THRESHOLD,
    priority: 4,
  },
  {
    id: "heavy-body",
    nameJa: "ヘビーボディ派",
    nameEn: "Heavy Body Type",
    emoji: "💪",
    descriptionJa: "しっかりとした飲みごたえを求めるタイプ",
    descriptionEn: "You seek a full, heavy-bodied cup",
    criteria: (p) => p.body + p.roastiness >= THRESHOLD,
    priority: 5,
  },
  {
    id: "sweet",
    nameJa: "スイート派",
    nameEn: "Sweet Type",
    emoji: "🍯",
    descriptionJa: "甘みのあるコーヒーを好むタイプ",
    descriptionEn: "You prefer sweet, mellow coffees",
    criteria: (p) => p.sweetness + p.chocolaty >= THRESHOLD,
    priority: 6,
  },
  {
    id: "clean",
    nameJa: "クリーン派",
    nameEn: "Clean Type",
    emoji: "✨",
    descriptionJa: "雑味のないクリアな味わいを好むタイプ",
    descriptionEn: "You prefer clean, clear flavors with no off-notes",
    criteria: (p) => p.cleanness + p.acidity >= THRESHOLD,
    priority: 7,
  },
  {
    id: "balance",
    nameJa: "バランス派",
    nameEn: "Balanced Type",
    emoji: "⚖️",
    descriptionJa: "バランスの良い万人向けタイプ",
    descriptionEn: "You enjoy well-balanced, versatile coffees",
    criteria: (p) => {
      const values = Object.values(p);
      return standardDeviation(values) <= BALANCE_STD_THRESHOLD;
    },
    priority: 8,
  },
];

/** バランス派（フォールバック用） */
const BALANCE_TYPE = TASTE_TYPES.find((t) => t.id === "balance")!;

/**
 * メインの味覚タイプを判定する。
 * 優先度順にcriteriaをチェックし、最初にマッチしたものを返す。
 * どれにもマッチしない場合はバランス派を返す。
 */
export function classifyTasteType(profile: FlavorScores): TasteType {
  const sorted = [...TASTE_TYPES].sort((a, b) => a.priority - b.priority);
  for (const tt of sorted) {
    if (tt.criteria(profile)) {
      return tt;
    }
  }
  return BALANCE_TYPE;
}

/**
 * サブ（セカンダリ）の味覚タイプを判定する。
 * メインタイプの次にマッチしたものを返す。なければnull。
 */
export function getSecondaryType(profile: FlavorScores): TasteType | null {
  const sorted = [...TASTE_TYPES].sort((a, b) => a.priority - b.priority);
  let found = false;
  for (const tt of sorted) {
    if (tt.criteria(profile)) {
      if (found) return tt;
      found = true;
    }
  }
  return null;
}
