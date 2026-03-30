import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PageTransition } from "../components/ui/PageTransition";
import { useTranslation } from "../lib/i18n";
import { getSeasonalRecommendation } from "../data/seasonalRecommendations";
import type { Season } from "../data/seasonalRecommendations";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { getColdStartRecommendations } from "../lib/recommendation/coldStart";

const seasonStyles: Record<
  Season,
  { bg: string; border: string; accent: string; icon: string }
> = {
  spring: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    accent: "text-pink-700",
    icon: "🌸",
  },
  summer: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    accent: "text-sky-700",
    icon: "🏖️",
  },
  autumn: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    accent: "text-orange-700",
    icon: "🍂",
  },
  winter: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    accent: "text-rose-800",
    icon: "❄️",
  },
};

export function HomePage() {
  const navigate = useNavigate();
  const { t, locale } = useTranslation();

  const seasonal = useMemo(() => getSeasonalRecommendation(), []);
  const style = seasonStyles[seasonal.season];

  const recommendedCoffees = useMemo(
    () =>
      seasonal.recommendedCoffeeIds
        .map((id) => coffeeProfiles.find((c) => c.id === id))
        .filter(Boolean)
        .slice(0, 3),
    [seasonal.recommendedCoffeeIds],
  );

  const coldStartCoffees = useMemo(() => getColdStartRecommendations(), []);

  const seasonName = locale === "ja" ? seasonal.nameJa : seasonal.nameEn;
  const mood = locale === "ja" ? seasonal.mood : seasonal.moodEn;
  const description =
    locale === "ja" ? seasonal.description : seasonal.descriptionEn;
  const pairings = locale === "ja" ? seasonal.pairings : seasonal.pairingsEn;

  return (
    <PageTransition>
    <div className="max-w-lg mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <p className="text-5xl mb-4" aria-hidden="true">
          ☕
        </p>
        <h1 className="text-4xl font-serif font-bold text-cafe-900 mb-3">
          {t("common.appName")}
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed">
          {t("common.tagline")}
        </p>
      </div>

      {/* Seasonal Recommendation */}
      <section
        className={`rounded-2xl ${style.bg} ${style.border} border p-5 mb-8`}
        aria-label={t("seasonal.title")}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl" aria-hidden="true">
            {style.icon}
          </span>
          <h2 className={`text-xl font-bold ${style.accent}`}>
            {t("seasonal.title")} - {seasonName}
          </h2>
        </div>
        <p className={`text-sm font-medium ${style.accent} mb-2`}>{mood}</p>
        <p className="text-sm text-stone-600 leading-relaxed mb-4">
          {description}
        </p>

        {/* Recommended coffees */}
        <h3 className="text-sm font-bold text-stone-700 mb-2">
          {t("seasonal.recommendedCoffees")}
        </h3>
        <div className="space-y-2 mb-4">
          {recommendedCoffees.map(
            (coffee) =>
              coffee && (
                <div
                  key={coffee.id}
                  className="bg-white/70 rounded-xl p-3 border border-white/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-cafe-800 text-sm">
                        {locale === "ja" ? coffee.nameJa : coffee.name}
                      </p>
                      <p className="text-xs text-stone-500">
                        {t(`roastLevel.${coffee.roastLevel}`)}
                      </p>
                    </div>
                    <span className="text-xs text-stone-400">
                      {coffee.origins.join(", ")}
                    </span>
                  </div>
                </div>
              ),
          )}
        </div>

        {/* Brewing methods */}
        <h3 className="text-sm font-bold text-stone-700 mb-2">
          {t("seasonal.brewingMethods")}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {seasonal.recommendedBrewingMethods.map((method) => (
            <span
              key={method}
              className="bg-white/70 text-stone-700 text-xs px-3 py-1 rounded-full border border-white/50"
            >
              {t(`brewingMethod.${method}`)}
            </span>
          ))}
        </div>

        {/* Pairings */}
        <h3 className="text-sm font-bold text-stone-700 mb-2">
          {t("seasonal.pairings")}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {pairings.map((pairing) => (
            <span
              key={pairing}
              className="bg-white/70 text-stone-700 text-xs px-3 py-1 rounded-full border border-white/50"
            >
              {pairing}
            </span>
          ))}
        </div>

        {/* Link to guide */}
        <Link
          to="/guide"
          className={`inline-flex items-center gap-1 text-sm font-medium ${style.accent} hover:underline`}
        >
          {t("seasonal.moreLink")} →
        </Link>
      </section>

      {/* Cold Start: Popular coffees for beginners */}
      <section
        className="rounded-2xl bg-cafe-50 border border-cafe-200 p-5 mb-8"
        aria-label={t("coldStart.title")}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl" aria-hidden="true">
            &#9749;
          </span>
          <h2 className="text-xl font-bold text-cafe-800">
            {t("coldStart.title")}
          </h2>
        </div>
        <p className="text-sm text-stone-600 leading-relaxed mb-4">
          {t("coldStart.description")}
        </p>
        <div className="space-y-2">
          {coldStartCoffees.slice(0, 3).map((coffee) => (
            <div
              key={coffee.id}
              className="bg-white/70 rounded-xl p-3 border border-white/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-cafe-800 text-sm">
                    {locale === "ja" ? coffee.nameJa : coffee.name}
                  </p>
                  <p className="text-xs text-stone-500">
                    {t(`roastLevel.${coffee.roastLevel}`)}
                  </p>
                </div>
                <span className="text-xs text-stone-400">
                  {coffee.origins.join(", ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mode selection */}
      <div className="space-y-4 mb-8">
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow border-cafe-200 hover:border-cafe-400"
          onClick={() =>
            navigate("/questionnaire", { state: { mode: "beginner" } })
          }
          role="button"
          tabIndex={0}
          aria-label={t("home.beginnerAria")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/questionnaire", { state: { mode: "beginner" } });
            }
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl" aria-hidden="true">
              🌱
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-cafe-800 mb-1">
                {t("home.beginnerMode")}
              </h2>
              <p className="text-sm text-stone-600 mb-3">
                {t("home.beginnerDesc")}
              </p>
              <Button size="sm" className="w-full">
                {t("home.beginnerButton")}
              </Button>
            </div>
          </div>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow border-cafe-200 hover:border-cafe-400"
          onClick={() =>
            navigate("/questionnaire", { state: { mode: "advanced" } })
          }
          role="button"
          tabIndex={0}
          aria-label={t("home.advancedAria")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/questionnaire", { state: { mode: "advanced" } });
            }
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl" aria-hidden="true">
              🔍
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-cafe-800 mb-1">
                {t("home.advancedMode")}
              </h2>
              <p className="text-sm text-stone-600 mb-3">
                {t("home.advancedDesc")}
              </p>
              <Button size="sm" variant="secondary" className="w-full">
                {t("home.advancedButton")}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Guide link */}
      <div className="text-center">
        <Link
          to="/guide"
          className="inline-flex items-center gap-2 text-cafe-600 hover:text-cafe-800 font-medium transition-colors"
        >
          <span aria-hidden="true">📖</span>
          {t("home.guideLink")}
        </Link>
      </div>
    </div>
    </PageTransition>
  );
}
