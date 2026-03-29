import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDiagnosisHistory,
  deleteDiagnosis,
  clearAllDiagnoses,
} from "../lib/storage";
import type { DiagnosisRecord } from "../lib/storage";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}年${m}月${day}日 ${h}:${min}`;
}

function modeLabel(mode: DiagnosisRecord["mode"]): string {
  return mode === "beginner" ? "かんたん" : "くわしく";
}

export function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<DiagnosisRecord[]>(
    getDiagnosisHistory,
  );

  const handleDelete = useCallback((id: string) => {
    if (!window.confirm("この診断履歴を削除しますか？")) return;
    deleteDiagnosis(id);
    setHistory(getDiagnosisHistory());
  }, []);

  const handleClearAll = useCallback(() => {
    if (!window.confirm("すべての診断履歴を削除しますか？この操作は取り消せません。"))
      return;
    clearAllDiagnoses();
    setHistory([]);
  }, []);

  const handleView = useCallback(
    (record: DiagnosisRecord) => {
      navigate("/result", {
        state: {
          result: record.result,
          userProfile: record.userFlavorProfile,
          input: record.input,
          mode: record.mode,
          fromHistory: true,
        },
      });
    },
    [navigate],
  );

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className="text-4xl mb-2" aria-hidden="true">
          📋
        </p>
        <h1 className="text-2xl font-serif font-bold text-cafe-900 mb-1">
          診断履歴
        </h1>
        <p className="text-sm text-stone-500">
          過去の診断結果を確認できます
        </p>
      </div>

      {history.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-stone-400 text-lg mb-2">まだ診断履歴がありません</p>
          <p className="text-stone-400 text-sm mb-6">
            コーヒー診断を受けると、結果がここに保存されます
          </p>
          <Button onClick={() => navigate("/questionnaire")} size="sm">
            診断を始める
          </Button>
        </Card>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {history.map((record) => {
              const topMatch = record.result.topMatches[0];
              const topCoffee = topMatch
                ? coffeeProfiles.find((p) => p.id === topMatch.coffeeId)
                : undefined;

              return (
                <Card key={record.id} padding="sm">
                  <button
                    type="button"
                    className="w-full text-left cursor-pointer"
                    onClick={() => handleView(record)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-stone-400 mb-1">
                          {formatDate(record.date)}
                          <span className="ml-2 inline-block bg-cafe-100 text-cafe-700 px-2 py-0.5 rounded-full text-xs">
                            {modeLabel(record.mode)}
                          </span>
                        </p>
                        {topCoffee && (
                          <p className="text-base font-bold text-cafe-800 truncate">
                            {topCoffee.nameJa}
                          </p>
                        )}
                        {topMatch && (
                          <p className="text-sm text-stone-500">
                            マッチ度: {Math.round(topMatch.score * 100)}%
                          </p>
                        )}
                      </div>
                      <span className="text-stone-300 shrink-0 mt-1" aria-hidden="true">
                        ›
                      </span>
                    </div>
                  </button>
                  <div className="mt-2 pt-2 border-t border-cafe-50 flex justify-end">
                    <button
                      type="button"
                      className="text-xs text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(record.id);
                      }}
                    >
                      削除
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="ghost"
              onClick={handleClearAll}
              className="w-full text-red-500 hover:text-red-600"
              size="sm"
            >
              すべての履歴を削除
            </Button>
          </div>
        </>
      )}

      <div className="mt-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="w-full"
          size="sm"
        >
          ホームに戻る
        </Button>
      </div>
    </div>
  );
}
