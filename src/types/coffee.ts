export type FlavorScores = {
  bitterness: number;
  acidity: number;
  sweetness: number;
  body: number;
  fruitiness: number;
  floral: number;
  nuttiness: number;
  chocolaty: number;
  roastiness: number;
  cleanness: number;
};

export type RoastLevel =
  | "light"
  | "medium-light"
  | "medium"
  | "medium-dark"
  | "dark";

export type GrindSize =
  | "extra-fine"
  | "fine"
  | "medium-fine"
  | "medium"
  | "coarse";

export type BrewingMethod =
  | "handDrip"
  | "espresso"
  | "frenchPress"
  | "coldBrew";

export type ProcessMethod = "washed" | "natural" | "honey";

export type CoffeeProfile = {
  id: string;
  name: string;
  nameJa: string;
  origins: string[];
  roastLevel: RoastLevel;
  grindRecommendation: Partial<Record<BrewingMethod, GrindSize>>;
  flavorScores: FlavorScores;
  process: ProcessMethod[];
  pairings: string[];
  notes: string[];
  description: string;
};

export type RecommendationResult = {
  topMatches: {
    coffeeId: string;
    score: number;
    reasons: string[];
  }[];
  recommendedRoast: RoastLevel;
  recommendedGrind: GrindSize;
  recommendedBrewingMethods: BrewingMethod[];
  pairingSuggestions: string[];
  avoidNotes: string[];
};
