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
import { ShareButtons } from "../components/result/ShareButtons";
import { FlavorRadarChart } from "../components/charts/FlavorRadarChart";
import { Card } from "../components/ui/Card";
import { saveDiagnosis } from "../lib/storage";
import type { DiagnosisRecord } from "../lib/storage";
import { FeedbackForm } from "../components/result/FeedbackForm";
import {
  saveFeedback,
  getFeedbackByDiagnosisId,
  getWeightAdjustments,
  saveWeightAdjustments,
} from "../lib/feedbackStorage";
import { adjustWeightsFromFeedback } from "../lib/learning";

type LocationState = {
  result: RecommendationResult;
  userProfile: FlavorScores;
  input: TasteProfileInput;
  mode?: UserMode;
  /** 履歴から閲覧する場合にセットされる */
  fromHistory?: boolean;
  /** 履歴から閲覧する場合の診断ID */
  diagnosisId?: string;
};

export function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const [saved, setSaved] = useState(false);
  const savedRef = useRef(false);
  const [diagnosisId, setDiagnosisId] = useState<string | null>(null);

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
      return;
    }
    // 履歴から閲覧する場合、diagnosisId をセット
    if (state.fromHistory && state.diagnosisId) {
      setDiagnosisId(state.diagnosisId);
    }
  }, [state, navigate]);

  // 自動保存（履歴からの閲覧時は保存しない）
  useEffect(() => {
    if (!state || state.fromHistory || savedRef.current) return;
    savedRef.current = true;

    const id = String(Date.now());
    const record: DiagnosisRecord = {
      id,
      date: new Date().toISOString(),
      mode: state.mode ?? "beginner",
      input: state.input,
      result: state.result,
      userFlavorProfile: state.userProfile,
    };
    saveDiagnosis(record);
    setDiagnosisId(id);
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
        <h1 className="text-2xl font-serif font-bold text-cafe-900 dark:text-dark-text mb-1">
          診断結果
        </h1>
        <p className="text-sm text-stone-500 dark:text-dark-text-muted">
          あなたにぴったりのコーヒーが見つかりました
        </p>
        {saved && (
          <p className="mt-2 text-xs text-cafe-600 dark:text-cafe-400 animate-pulse">
            履歴に保存しました
          </p>
        )}
        {state.fromHistory && (
          <p className="mt-2 text-xs text-stone-400 dark:text-dark-text-muted">
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
          <h3 className="text-lg font-bold text-cafe-800 dark:text-cafe-200 mb-2 text-center">
            味覚プロファイル
          </h3>
          <div className="flex items-center justify-center gap-4 mb-2 text-xs text-stone-500 dark:text-dark-text-muted">
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
            <h3 className="text-lg font-bold text-cafe-800 dark:text-cafe-200 mb-3">
              避けた方がよい傾向
            </h3>
            <div className="space-y-2">
              {result.avoidNotes.map((note, i) => (
                <p
                  key={i}
                  className="text-sm text-stone-600 dark:text-dark-text-muted flex items-start gap-2"
                >
                  <span className="text-amber-500 shrink-0">⚠</span>
                  {note}
                </p>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Share */}
      {topCoffee && (
        <section className="mb-8" aria-label="結果をシェア">
          <Card>
            <ShareButtons
              coffeeName={topCoffee.nameJa}
              score={result.topMatches[0].score}
            />
          </Card>
        </section>
      )}

      {/* Feedback */}
      {diagnosisId && (
        <section className="mb-8" aria-label="フィードバック">
          <FeedbackForm
            diagnosisId={diagnosisId}
            coffeeMatches={result.topMatches.map((match) => {
              const coffee = coffeeProfiles.find((p) => p.id === match.coffeeId);
              return {
                coffeeId: match.coffeeId,
                nameJa: coffee?.nameJa ?? match.coffeeId,
              };
            })}
            existingFeedback={getFeedbackByDiagnosisId(diagnosisId)}
            onSubmit={(feedback) => {
              saveFeedback(feedback);
              // 学習ロジック実行: 重みを更新
              const currentWeights = getWeightAdjustments();
              const record: DiagnosisRecord = {
                id: diagnosisId,
                date: new Date().toISOString(),
                mode: state.mode ?? "beginner",
                input: state.input,
                result: state.result,
                userFlavorProfile: state.userProfile,
              };
              const newWeights = adjustWeightsFromFeedback(
                currentWeights,
                feedback,
                record,
              );
              saveWeightAdjustments(newWeights);
            }}
          />
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
