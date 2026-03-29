import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { RecommendationResult, FlavorScores } from "../types/coffee";
import type { TasteProfileInput } from "../types/questionnaire";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { Button } from "../components/ui/Button";
import { CoffeeCard } from "../components/result/CoffeeCard";
import { BrewingRecommendation } from "../components/result/BrewingRecommendation";
import { PairingList } from "../components/result/PairingList";
import { FlavorRadarChart } from "../components/charts/FlavorRadarChart";
import { Card } from "../components/ui/Card";

type LocationState = {
  result: RecommendationResult;
  userProfile: FlavorScores;
  input: TasteProfileInput;
};

export function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  const { result, userProfile } = state;

  // Find top coffee profile for radar chart overlay
  const topCoffee = result.topMatches[0]
    ? coffeeProfiles.find((p) => p.id === result.topMatches[0].coffeeId)
    : undefined;

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className="text-4xl mb-2" aria-hidden="true">
          ☕
        </p>
        <h1 className="text-2xl font-serif font-bold text-cafe-900 mb-1">
          診断結果
        </h1>
        <p className="text-sm text-stone-500">
          あなたにぴったりのコーヒーが見つかりました
        </p>
      </div>

      {/* Top matches */}
      <section className="space-y-4 mb-8" aria-label="おすすめコーヒー">
        {result.topMatches.map((match, i) => {
          const coffee = coffeeProfiles.find((p) => p.id === match.coffeeId);
          if (!coffee) return null;
          return (
            <CoffeeCard
              key={match.coffeeId}
              coffee={coffee}
              score={match.score}
              reasons={match.reasons}
              rank={i + 1}
            />
          );
        })}
      </section>

      {/* Flavor radar chart */}
      <section className="mb-8" aria-label="味覚プロファイル">
        <Card>
          <h3 className="text-lg font-bold text-cafe-800 mb-2 text-center">
            味覚プロファイル
          </h3>
          <div className="flex items-center justify-center gap-4 mb-2 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm bg-cafe-500/25 border border-cafe-600" />
              あなた
            </span>
            {topCoffee && (
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm bg-[rgba(180,120,60,0.15)] border border-[#b4783c] border-dashed" />
                {topCoffee.nameJa}
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
      <section className="mb-8" aria-label="おすすめ設定">
        <BrewingRecommendation
          roast={result.recommendedRoast}
          grind={result.recommendedGrind}
          brewingMethods={result.recommendedBrewingMethods}
        />
      </section>

      {/* Pairings */}
      <section className="mb-8" aria-label="相性の良いお菓子">
        <PairingList pairings={result.pairingSuggestions} />
      </section>

      {/* Avoid notes */}
      {result.avoidNotes.length > 0 && (
        <section className="mb-8" aria-label="避けた方がよい傾向">
          <Card>
            <h3 className="text-lg font-bold text-cafe-800 mb-3">
              避けた方がよい傾向
            </h3>
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
          もう一度診断する
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate("/guide")}
          className="w-full"
        >
          コーヒーガイドを見る
        </Button>
      </div>
    </div>
  );
}
