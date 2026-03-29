import type { FlavorModifier } from "../types/questionnaire";

/** お菓子カテゴリ -> 味覚スコア修正値 */
export const dessertToFlavorMap: Record<string, FlavorModifier> = {
  chocolate: { chocolaty: 2, roastiness: 1, bitterness: 1 },
  nuts: { nuttiness: 2, body: 1 },
  caramel: { sweetness: 2, body: 1, roastiness: 1 },
  citrusFruits: { acidity: 2, fruitiness: 2, cleanness: 1 },
  berries: { fruitiness: 2, acidity: 1, sweetness: 1 },
  wagashi: { sweetness: 1, cleanness: 2, floral: 1 },
  butterPastry: { body: 1, sweetness: 1, nuttiness: 1 },
  spicedSweets: { roastiness: 1, body: 1, sweetness: 1 },
  cheese: { body: 1, acidity: 1, nuttiness: 1 },
  driedFruits: { fruitiness: 1, sweetness: 2, body: 1 },
};

/** 飲用シーン -> 味覚スコア修正値 */
export const sceneToFlavorMap: Record<string, FlavorModifier> = {
  morningRefresh: { cleanness: 2, acidity: 1, body: -1 },
  workFocus: { bitterness: 1, body: 1, roastiness: 1 },
  afterMeal: { cleanness: 1, acidity: 1, sweetness: 1 },
  withDessert: { sweetness: -1, bitterness: 1, body: 1 },
  relax: { sweetness: 1, body: 1, floral: 1 },
  strongWithMilk: { body: 2, bitterness: 1, roastiness: 1 },
};
