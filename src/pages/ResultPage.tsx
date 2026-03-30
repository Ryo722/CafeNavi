import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import type { RecommendationResult, FlavorScores } from "../types/coffee";
import type { TasteProfileInput } from "../types/questionnaire";
import type { UserMode } from "../types/questionnaire";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { Button } from "../components/ui/Button";
import { CoffeeCard } from "../components/result/CoffeeCard";
import { BrewingRecommendation } from "../components/result/BrewingRecommendation";
import { PairingList } from "../components/result/PairingList";
import { FlavorRadarChart } from "../components/charts/FlavorRadarChart";
import { Card } from "../components/ui/Card";
import { PageTransition } from "../components/ui/PageTransition";
import { AnimatedList } from "../components/ui/AnimatedList";
import { saveDiagnosis } from "../lib/storage";
import type { DiagnosisRecord } from "../lib/storage";
import { useTranslation } from "../lib/i18n";
import { classifyTasteType, getSecondaryType } from "../lib/tasteType";

type LocationState = {
  result: RecommendationResult;
  userProfile: FlavorScores;
  input: TasteProfileInput;
  mode?: UserMode;
  fromHistory?: boolean;
};

export function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const state = location.state as LocationState | null;
  const [saved, setSaved] = useState(false);
  const savedRef = useRef(false);

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  useEffect(() => {
    if (!state || state.fromHistory || savedRef.current) return;
    savedRef.current = true;

    const record: DiagnosisRecord = {
      id: String(Date.now()),
      date: new Date().toISOString(),
      mode: state.mode ?? "beginner",
      input: state.input,
      result: state.result,
      userFlavorProfile: state.userProfile,
    };
    saveDiagnosis(record);
    setSaved(true);

    const timer = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(timer);
  }, [state]);

  if (!state) return null;

  const { result, userProfile } = state;

  const mainType = classifyTasteType(userProfile);
  const secondaryType = getSecondaryType(userProfile);

  const topCoffee = result.topMatches[0]
    ? coffeeProfiles.find((p) => p.id === result.topMatches[0].coffeeId)
    : undefined;

  return (
    <PageTransition>
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className="text-4xl mb-2" aria-hidden="true">
          ☕
        </p>
        <h1 className="text-2xl font-serif font-bold text-cafe-900 mb-1">
          {t("result.title")}
        </h1>
        <p className="text-sm text-stone-500">
          {t("result.subtitle")}
        </p>
        {saved && (
          <p className="mt-2 text-xs text-cafe-600 animate-pulse">
            {t("result.saved")}
          </p>
        )}
        {state.fromHistory && (
          <p className="mt-2 text-xs text-stone-400">
            {t("result.fromHistory")}
          </p>
        )}
      </div>

      {/* Top matches */}
      <section className="space-y-4 mb-8" aria-label={t("result.sectionRecommended")}>
        <AnimatedList staggerDelay={150}>
          {result.topMatches.map((match, i) => {
            const coffee = coffeeProfiles.find((p) => p.id === match.coffeeId);
            if (!coffee) return null;
            return (
              <div key={match.coffeeId}>
                {match.isSerendipity && (
                  <div className="mb-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-center">
                    <span className="text-sm font-bold text-amber-700">
                      {t("result.serendipityLabel")}
                    </span>
                  </div>
                )}
                <CoffeeCard
                  coffee={coffee}
                  score={match.score}
                  reasons={match.reasons}
                  rank={i + 1}
                />
              </div>
            );
          })}
        </AnimatedList>
      </section>

      {/* Taste type */}
      <section className="mb-8" aria-label={t("tasteType.title")}>
        <Card>
          <div className="text-center">
            <p className="text-4xl mb-2" aria-hidden="true">
              {mainType.emoji}
            </p>
            <h2 className="text-lg font-bold text-cafe-800 mb-1">
              {t(`tasteType.${mainType.id}`)}
            </h2>
            <p className="text-sm text-stone-500">
              {t(`tasteType.${mainType.id}.desc`)}
            </p>
            {secondaryType && (
              <div className="mt-3 pt-3 border-t border-stone-200">
                <p className="text-xs text-stone-400 mb-1">
                  {t("tasteType.secondary")}
                </p>
                <p className="text-sm text-cafe-700">
                  <span aria-hidden="true">{secondaryType.emoji} </span>
                  {t(`tasteType.${secondaryType.id}`)}
                </p>
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* Flavor radar chart */}
      <section className="mb-8" aria-label={t("result.sectionFlavorProfile")}>
        <Card>
          <h2 className="text-lg font-bold text-cafe-800 mb-2 text-center">
            {t("result.sectionFlavorProfile")}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-2 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm bg-cafe-500/25 border border-cafe-600" />
              {t("result.you")}
            </span>
            {topCoffee && (
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm bg-[rgba(180,120,60,0.15)] border border-[#b4783c] border-dashed" />
                {t(`coffee.${topCoffee.id}.name`)}
              </span>
            )}
          </div>
          <FlavorRadarChart
            userProfile={userProfile}
            coffeeProfile={topCoffee?.flavorScores}
          />
        </Card>
      </section>

      {/* Brewing recommendation */}
      <section className="mb-8" aria-label={t("result.sectionBrewing")}>
        <BrewingRecommendation
          roast={result.recommendedRoast}
          grind={result.recommendedGrind}
          brewingMethods={result.recommendedBrewingMethods}
        />
      </section>

      {/* Pairings */}
      <section className="mb-8" aria-label={t("result.sectionPairing")}>
        <PairingList pairings={result.pairingSuggestions} />
      </section>

      {/* Avoid notes */}
      {result.avoidNotes.length > 0 && (
        <section className="mb-8" aria-label={t("result.sectionAvoid")}>
          <Card>
            <h2 className="text-lg font-bold text-cafe-800 mb-3">
              {t("result.sectionAvoid")}
            </h2>
            <div className="space-y-2">
              {result.avoidNotes.map((note, i) => (
                <p
                  key={i}
                  className="text-sm text-stone-600 flex items-start gap-2"
                >
                  <span className="text-amber-500 shrink-0">⚠</span>
                  {note}
                </p>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => navigate("/")}
          className="w-full"
        >
          {t("result.retryDiagnosis")}
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate(`/guide#brewing-${result.recommendedRoast}`)}
          className="w-full"
        >
          {t("result.viewBrewingGuide")}
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate("/guide")}
          className="w-full"
        >
          {t("result.viewGuide")}
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate("/history")}
          className="w-full"
        >
          {t("result.viewHistory")}
        </Button>
      </div>
    </div>
    </PageTransition>
  );
}
