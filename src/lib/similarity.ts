import type { CoffeeProfile, FlavorScores } from "../types/coffee";

/**
 * コサイン類似度を計算する。
 * FlavorScoresの各軸をベクトルの次元として扱い、0-100のスコアに正規化して返す。
 */
export function calculateSimilarity(
  userProfile: FlavorScores,
  coffeeProfile: FlavorScores,
): number {
  const keys = Object.keys(userProfile) as (keyof FlavorScores)[];

  let dotProduct = 0;
  let normUser = 0;
  let normCoffee = 0;

  for (const key of keys) {
    const u = userProfile[key];
    const c = coffeeProfile[key];
    dotProduct += u * c;
    normUser += u * u;
    normCoffee += c * c;
  }

  const denominator = Math.sqrt(normUser) * Math.sqrt(normCoffee);
  if (denominator === 0) return 0;

  // コサイン類似度は -1 ~ 1 だが、フレーバースコアは全て正なので 0 ~ 1 になる
  const cosineSim = dotProduct / denominator;

  return Math.round(cosineSim * 100 * 10) / 10;
}

/**
 * ユーザープロファイルに対するトップ推薦を返す。
 */
export function getTopRecommendations(
  userProfile: FlavorScores,
  coffeeProfiles: CoffeeProfile[],
  count: number = 3,
): { coffeeId: string; score: number }[] {
  const scored = coffeeProfiles.map((coffee) => ({
    coffeeId: coffee.id,
    score: calculateSimilarity(userProfile, coffee.flavorScores),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, count);
}
