import type {
  FlavorScores,
  RoastLevel,
  BrewingMethod,
  GrindSize,
  CoffeeProfile,
} from "../../types/coffee";

/** ユーザーの飲み方スタイル */
export type DrinkStyle = "black" | "milk" | "iced" | "balanced";

/** シーン要因 */
export type SceneFactor = {
  scene: string;
  weight: number;
  effects: Partial<Record<keyof FlavorScores, number>>;
};

/** Step 1: 嗜好分析の結果 */
export type AnalyzedPreference = {
  explicit: FlavorScores;           // 直接入力の味覚好み
  implicit: Partial<FlavorScores>;  // お菓子・シーンから推定
  sceneFactors: SceneFactor[];      // シーン要因
  drinkStyle: DrinkStyle;           // ブラック/ミルク/アイス等
  combinedProfile: FlavorScores;    // 統合プロファイル
  dislikeFlags: Partial<Record<keyof FlavorScores, boolean>>;  // 明示的な嫌い
  dislikeMap: DislikeMap;           // 2段階のDislike情報
};

/** Step 2: 焙煎度推定の結果 */
export type RoastEstimation = {
  scores: Record<RoastLevel, number>;  // 各焙煎度の適性スコア
  primary: RoastLevel;                  // 最も適した焙煎度
  secondary?: RoastLevel;               // 次点
  reasoning: string;                     // 判定理由
};

/** Step 3: 候補フィルタリングの結果 */
export type FilteredCandidates = {
  primary: CoffeeProfile[];    // 焙煎度一致＋高スコア
  secondary: CoffeeProfile[];  // 焙煎度近い
  excluded: { profile: CoffeeProfile; reason: string }[];  // 除外された候補と理由
};

/** 抽出パラメータ */
export type BrewingParams = {
  grindSize: GrindSize;
  temperature: string;
  ratio: string;
  bloomTime?: string;
  totalTime: string;
  tips: string[];
};

/** Step 4: 抽出方法選択の結果 */
export type BrewingSelection = {
  methods: {
    method: BrewingMethod;
    score: number;
    reason: string;
    params: BrewingParams;
  }[];
};

/** ランキング結果 */
export type RankedResult = {
  coffeeId: string;
  coffee: CoffeeProfile;
  score: number;
  reasons: string[];
  brewing: BrewingSelection;
  isSerendipity?: boolean;
  hasSeasonalBonus?: boolean;
};

/** 動的重み調整 */
export type WeightAdjustments = Partial<Record<keyof FlavorScores, number>>;

/** Dislike の2段階レベル */
export type DislikeLevel = "hard" | "soft" | "none";

/** 各フレーバー軸のDislikeマップ */
export type DislikeMap = Partial<Record<keyof FlavorScores, DislikeLevel>>;

/** A/Bテスト用のストラテジー */
export type RecommendationStrategy = "v1" | "v2";
