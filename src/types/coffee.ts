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

export type BeanInput = {
  origin: string;         // 産地（coffeeProfiles のIDまたは "other"）
  roastLevel: RoastLevel; // 焙煎度
};

export type BrewingAdvice = {
  recommendedMethods: {
    method: BrewingMethod;
    grindSize: GrindSize;
    temperature: string;     // 例: "85-90℃"
    ratio: string;           // 例: "1:15（豆15g:お湯225ml）"
    tips: string;            // 例: "ゆっくり注いで甘みを引き出す"
  }[];
  pairings: string[];
  flavorExpectation: string;   // 期待できる味わいの説明（日本語）
  avoidNotes: string[];        // この豆で避けた方がよいこと
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

export type FeedbackRating = "perfect" | "good" | "neutral" | "off" | "wrong";

export type DiagnosisFeedback = {
  diagnosisId: string;
  rating: FeedbackRating;
  coffeeRatings?: Record<string, FeedbackRating>;
  comment?: string;
  createdAt: string;
};

export type WeightAdjustments = Record<keyof FlavorScores, number>;
