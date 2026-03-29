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
import { saveDiagnosis } from "../lib/storage";
import type { DiagnosisRecord } from "../lib/storage";

type LocationState = {
  result: RecommendationResult;
  userProfile: FlavorScores;
  input: TasteProfileInput;
  mode?: UserMode;
  /** 履歴から閲覧する場合にセットされる */
  fromHistory?: boolean;
};

export function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const [saved, setSaved] = useState(false);
  const savedRef = useRef(false);

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  // 自動保存（履歴からの閲覧時は保存しない）
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
        {saved && (
          <p className="mt-2 text-xs text-cafe-600 animate-pulse">
            履歴に保存しました
          </p>
        )}
        {state.fromHistory && (
          <p className="mt-2 text-xs text-stone-400">
            保存済みの診断結果
          </p>
        )}
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
        <Button
          variant="ghost"
          onClick={() => navigate("/history")}
          className="w-full"
        >
          診断履歴を見る
        </Button>
      </div>
    </div>
  );
}
