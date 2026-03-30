import type {
  RoastLevel,
  GrindSize,
  BrewingMethod,
} from "../../types/coffee";
import { Card } from "../ui/Card";
import { useTranslation } from "../../lib/i18n";

type BrewingRecommendationProps = {
  roast: RoastLevel;
  grind: GrindSize;
  brewingMethods: BrewingMethod[];
};

const brewingIcons: Record<BrewingMethod, string> = {
  handDrip: "☕",
  espresso: "🫖",
  frenchPress: "🍵",
  coldBrew: "🧊",
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
  const { t } = useTranslation();

  return (
    <Card>
      <h3 className="text-lg font-bold text-cafe-800 mb-4">{t("brewing.title")}</h3>

      <div className="space-y-5">
        {/* Roast level */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-stone-600">{t("brewing.roastLevel")}</span>
            <span className="text-sm font-bold text-cafe-700">
              {t(`roastLevel.${roast}`)}
            </span>
          </div>
          <div className="w-full h-3 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-900 rounded-full overflow-hidden relative">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-cafe-700 rounded-full shadow transition-all"
              style={{ left: `calc(${roastLevelPercent[roast]}% - 8px)` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-stone-400">{t("brewing.lightRoast")}</span>
            <span className="text-xs text-stone-400">{t("brewing.darkRoast")}</span>
          </div>
        </div>

        {/* Grind size */}
        <div className="flex items-center justify-between py-2 border-t border-cafe-50">
          <span className="text-sm font-medium text-stone-600">{t("brewing.grindSize")}</span>
          <span className="text-sm font-bold text-cafe-700">
            {t(`grindSize.${grind}`)}
          </span>
        </div>

        {/* Brewing methods */}
        <div className="border-t border-cafe-50 pt-3">
          <span className="text-sm font-medium text-stone-600 block mb-3">
            {t("brewing.brewingMethod")}
          </span>
          <div className="flex gap-3">
            {brewingMethods.map((method) => (
              <div
                key={method}
                className="flex-1 bg-cafe-50 rounded-xl p-3 text-center border border-cafe-100"
              >
                <span className="text-2xl block mb-1" aria-hidden="true">
                  {brewingIcons[method]}
                </span>
                <span className="text-xs font-medium text-cafe-700">
                  {t(`brewingMethod.${method}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
