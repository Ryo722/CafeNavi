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
  aftertaste: number;  // 余韻の長さ・質
  balance: number;     // 全体のバランス
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
  confidence: number;          // データ信頼度 0-1 (heuristic=0.6, expert=0.9等)
  altitude?: string;           // 標高
  variety?: string[];          // 品種
  brewingCompatibility: Record<BrewingMethod, number>;  // 抽出相性スコア 1-10
  milkCompatibility: number;   // ミルク相性 1-10
  seasonalAffinity?: string[]; // 季節相性
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
