import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getDiagnosisHistory } from "../lib/storage";
import { calculateStats } from "../lib/stats";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { PageTransition } from "../components/ui/PageTransition";
import { FlavorRadarChart } from "../components/charts/FlavorRadarChart";
import { BarChart } from "../components/charts/BarChart";
import { TrendChart } from "../components/charts/TrendChart";
import { useTranslation } from "../lib/i18n";
import { classifyTasteType, TASTE_TYPES } from "../lib/tasteType";

export function StatsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const history = useMemo(() => getDiagnosisHistory(), []);
  const stats = useMemo(() => calculateStats(history), [history]);

  // 空状態
  if (stats.totalDiagnoses === 0) {
    return (
      <PageTransition>
        <div className="max-w-lg mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <p className="text-4xl mb-2" aria-hidden="true">
              📊
            </p>
            <h1 className="text-2xl font-serif font-bold text-cafe-900 mb-1">
              {t("stats.title")}
            </h1>
          </div>
          <Card className="text-center py-12">
            <p className="text-stone-400 text-lg mb-2">{t("stats.empty")}</p>
            <p className="text-stone-400 text-sm mb-6">
              {t("stats.emptyDesc")}
            </p>
            <Button onClick={() => navigate("/questionnaire")} size="sm">
              {t("stats.startDiagnosis")}
            </Button>
          </Card>
          <div className="mt-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="w-full"
              size="sm"
            >
              {t("stats.backHome")}
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  // 最も多く推薦されたコーヒー名
  const topCoffeeProfile =
    stats.topRecommendedCoffees.length > 0
      ? coffeeProfiles.find(
          (p) => p.id === stats.topRecommendedCoffees[0].coffeeId,
        )
      : undefined;

  const topCoffeeName = topCoffeeProfile
    ? t(`coffee.${topCoffeeProfile.id}.name`)
    : "-";

  // 好みの焙煎度傾向
  const topRoast =
    stats.preferredRoastLevels.length > 0
      ? t(`roastLevel.${stats.preferredRoastLevels[0].level}`)
      : "-";

  // 味覚タイプの分布（過去診断）
  const tasteTypeCount = new Map<string, number>();
  for (const record of history) {
    const tt = classifyTasteType(record.userFlavorProfile);
    tasteTypeCount.set(tt.id, (tasteTypeCount.get(tt.id) ?? 0) + 1);
  }
  const tasteTypeDistribution = Array.from(tasteTypeCount.entries())
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count);

  // 最も多い味覚タイプ
  const dominantType = tasteTypeDistribution.length > 0
    ? TASTE_TYPES.find((tt) => tt.id === tasteTypeDistribution[0].id)
    : undefined;

  // タイプ分布のBarChartデータ
  const tasteTypeBarItems = tasteTypeDistribution.map((item) => {
    const tt = TASTE_TYPES.find((t) => t.id === item.id);
    return {
      label: tt ? `${tt.emoji} ${t(`tasteType.${tt.id}`)}` : item.id,
      value: item.count,
      maxValue: stats.totalDiagnoses,
    };
  });

  // BarChart用データ: よく推薦されるコーヒー
  const topCoffeeBarItems = stats.topRecommendedCoffees.map((item) => {
    const profile = coffeeProfiles.find((p) => p.id === item.coffeeId);
    return {
      label: profile ? t(`coffee.${profile.id}.name`) : item.coffeeId,
      value: item.count,
      maxValue: stats.totalDiagnoses,
    };
  });

  // BarChart用データ: 焙煎度の分布
  const roastBarItems = stats.preferredRoastLevels.map((item) => ({
    label: t(`roastLevel.${item.level}`),
    value: item.count,
    maxValue: stats.totalDiagnoses,
  }));

  // BarChart用データ: 抽出方法の分布
  const brewingBarItems = stats.preferredBrewingMethods.map((item) => ({
    label: t(`brewingMethod.${item.method}`),
    value: item.count,
    maxValue: stats.totalDiagnoses,
  }));

  // TrendChart用ライン定義
  const trendLines = [
    { key: "bitterness" as const, label: t("flavor.bitterness"), color: "#8B4513" },
    { key: "acidity" as const, label: t("flavor.acidity"), color: "#D4892A" },
    { key: "sweetness" as const, label: t("flavor.sweetness"), color: "#E8A87C" },
  ];

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-4xl mb-2" aria-hidden="true">
            📊
          </p>
          <h1 className="text-2xl font-serif font-bold text-cafe-900 mb-1">
            {t("stats.title")}
          </h1>
          <p className="text-sm text-stone-500">{t("stats.subtitle")}</p>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <Card padding="sm" className="text-center">
            <p className="text-xs text-stone-400 mb-1">
              {t("stats.totalDiagnoses")}
            </p>
            <p className="text-2xl font-bold text-cafe-800">
              {stats.totalDiagnoses}
            </p>
          </Card>
          <Card padding="sm" className="text-center">
            <p className="text-xs text-stone-400 mb-1">
              {t("stats.tasteType")}
            </p>
            {dominantType && (
              <p className="text-sm font-bold text-cafe-800">
                {dominantType.emoji} {t(`tasteType.${dominantType.id}`)}
              </p>
            )}
          </Card>
          <Card padding="sm" className="text-center">
            <p className="text-xs text-stone-400 mb-1">
              {t("stats.topCoffee")}
            </p>
            <p className="text-sm font-bold text-cafe-800 truncate">
              {topCoffeeName}
            </p>
          </Card>
          <Card padding="sm" className="text-center">
            <p className="text-xs text-stone-400 mb-1">
              {t("stats.favoriteRoast")}
            </p>
            <p className="text-sm font-bold text-cafe-800">{topRoast}</p>
          </Card>
        </div>

        {/* 平均味覚プロファイル */}
        <Card className="mb-6">
          <h2 className="text-lg font-serif font-bold text-cafe-900 mb-3">
            {t("stats.averageProfile")}
          </h2>
          <FlavorRadarChart userProfile={stats.averageFlavorProfile} />
        </Card>

        {/* 味覚タイプの分布 */}
        {tasteTypeBarItems.length > 0 && (
          <Card className="mb-6">
            <h2 className="text-lg font-serif font-bold text-cafe-900 mb-3">
              {t("stats.tasteTypeDistribution")}
            </h2>
            <BarChart items={tasteTypeBarItems} colorClass="bg-cafe-600" />
          </Card>
        )}

        {/* よく推薦されるコーヒー TOP5 */}
        {topCoffeeBarItems.length > 0 && (
          <Card className="mb-6">
            <h2 className="text-lg font-serif font-bold text-cafe-900 mb-3">
              {t("stats.topCoffees")}
            </h2>
            <BarChart items={topCoffeeBarItems} />
          </Card>
        )}

        {/* 焙煎度の分布 */}
        {roastBarItems.length > 0 && (
          <Card className="mb-6">
            <h2 className="text-lg font-serif font-bold text-cafe-900 mb-3">
              {t("stats.roastDistribution")}
            </h2>
            <BarChart items={roastBarItems} colorClass="bg-amber-700" />
          </Card>
        )}

        {/* 抽出方法の分布 */}
        {brewingBarItems.length > 0 && (
          <Card className="mb-6">
            <h2 className="text-lg font-serif font-bold text-cafe-900 mb-3">
              {t("stats.brewingDistribution")}
            </h2>
            <BarChart items={brewingBarItems} colorClass="bg-stone-600" />
          </Card>
        )}

        {/* 味覚の変遷 */}
        {stats.flavorTrend.length >= 2 && (
          <Card className="mb-6">
            <h2 className="text-lg font-serif font-bold text-cafe-900 mb-3">
              {t("stats.flavorTrend")}
            </h2>
            <TrendChart data={stats.flavorTrend} lines={trendLines} />
          </Card>
        )}

        {/* ナビゲーション */}
        <div className="flex flex-col gap-3 mt-6">
          <Button
            variant="secondary"
            onClick={() => navigate("/history")}
            className="w-full"
            size="sm"
          >
            {t("stats.viewHistory")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="w-full"
            size="sm"
          >
            {t("stats.backHome")}
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
