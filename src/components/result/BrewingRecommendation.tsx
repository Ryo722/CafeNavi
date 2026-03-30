import type {
  RoastLevel,
  GrindSize,
  BrewingMethod,
} from "../../types/coffee";
import { Card } from "../ui/Card";

type BrewingRecommendationProps = {
  roast: RoastLevel;
  grind: GrindSize;
  brewingMethods: BrewingMethod[];
};

const roastLabels: Record<RoastLevel, string> = {
  light: "浅煎り",
  "medium-light": "中浅煎り",
  medium: "中煎り",
  "medium-dark": "中深煎り",
  dark: "深煎り",
};

const grindLabels: Record<GrindSize, string> = {
  "extra-fine": "極細挽き",
  fine: "細挽き",
  "medium-fine": "中細挽き",
  medium: "中挽き",
  coarse: "粗挽き",
};

const brewingLabels: Record<BrewingMethod, { name: string; icon: string }> = {
  handDrip: { name: "ハンドドリップ", icon: "☕" },
  espresso: { name: "エスプレッソ", icon: "🫖" },
  frenchPress: { name: "フレンチプレス", icon: "🍵" },
  coldBrew: { name: "水出しコーヒー", icon: "🧊" },
};

const roastLevelPercent: Record<RoastLevel, number> = {
  light: 20,
  "medium-light": 40,
  medium: 60,
  "medium-dark": 80,
  dark: 100,
};

export function BrewingRecommendation({
  roast,
  grind,
  brewingMethods,
}: BrewingRecommendationProps) {
  return (
    <Card>
      <h3 className="text-lg font-bold text-cafe-800 dark:text-cafe-200 mb-4">おすすめ設定</h3>

      <div className="space-y-5">
        {/* Roast level */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-stone-600 dark:text-dark-text-muted">焙煎度</span>
            <span className="text-sm font-bold text-cafe-700 dark:text-cafe-300">
              {roastLabels[roast]}
            </span>
          </div>
          <div className="w-full h-3 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-900 rounded-full overflow-hidden relative">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-dark-text border-2 border-cafe-700 rounded-full shadow transition-all"
              style={{ left: `calc(${roastLevelPercent[roast]}% - 8px)` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-stone-400 dark:text-dark-text-muted">浅煎り</span>
            <span className="text-xs text-stone-400 dark:text-dark-text-muted">深煎り</span>
          </div>
        </div>

        {/* Grind size */}
        <div className="flex items-center justify-between py-2 border-t border-cafe-50 dark:border-dark-border">
          <span className="text-sm font-medium text-stone-600 dark:text-dark-text-muted">挽き目</span>
          <span className="text-sm font-bold text-cafe-700 dark:text-cafe-300">
            {grindLabels[grind]}
          </span>
        </div>

        {/* Brewing methods */}
        <div className="border-t border-cafe-50 dark:border-dark-border pt-3">
          <span className="text-sm font-medium text-stone-600 dark:text-dark-text-muted block mb-3">
            抽出方法
          </span>
          <div className="flex gap-3">
            {brewingMethods.map((method) => (
              <div
                key={method}
                className="flex-1 bg-cafe-50 dark:bg-dark-border rounded-xl p-3 text-center border border-cafe-100 dark:border-dark-border"
              >
                <span className="text-2xl block mb-1" aria-hidden="true">
                  {brewingLabels[method].icon}
                </span>
                <span className="text-xs font-medium text-cafe-700 dark:text-cafe-300">
                  {brewingLabels[method].name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
