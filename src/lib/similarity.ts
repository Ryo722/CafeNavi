import type { CoffeeProfile, FlavorScores, WeightAdjustments } from "../types/coffee";

/**
 * コサイン類似度を計算する。
 * FlavorScoresの各軸をベクトルの次元として扱い、0-100のスコアに正規化して返す。
 * オプションの重み調整が渡された場合、各軸のスコアに重みを掛けて計算する。
 */
export function calculateSimilarity(
  userProfile: FlavorScores,
  coffeeProfile: FlavorScores,
  weights?: WeightAdjustments,
): number {
  const keys = Object.keys(userProfile) as (keyof FlavorScores)[];

  let dotProduct = 0;
  let normUser = 0;
  let normCoffee = 0;

  for (const key of keys) {
    const w = weights ? weights[key] : 1.0;
    const u = userProfile[key] * w;
    const c = coffeeProfile[key] * w;
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
  weights?: WeightAdjustments,
): { coffeeId: string; score: number }[] {
  const scored = coffeeProfiles.map((coffee) => ({
    coffeeId: coffee.id,
    score: calculateSimilarity(userProfile, coffee.flavorScores, weights),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, count);
}
