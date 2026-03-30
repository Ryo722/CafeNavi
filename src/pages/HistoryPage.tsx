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
import { PageTransition } from "../components/ui/PageTransition";
import { useTranslation } from "../lib/i18n";

export function HistoryPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [history, setHistory] = useState<DiagnosisRecord[]>(
    getDiagnosisHistory,
  );

  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    const y = String(d.getFullYear());
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return t("date.format", { y, m, d: day, h, min });
  };

  const modeLabel = (mode: DiagnosisRecord["mode"]): string => {
    return mode === "beginner" ? t("history.beginner") : t("history.advanced");
  };

  const handleDelete = useCallback((id: string) => {
    if (!window.confirm(t("history.confirmDelete"))) return;
    deleteDiagnosis(id);
    setHistory(getDiagnosisHistory());
  }, [t]);

  const handleClearAll = useCallback(() => {
    if (!window.confirm(t("history.confirmDeleteAll")))
      return;
    clearAllDiagnoses();
    setHistory([]);
  }, [t]);

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
    <PageTransition>
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className="text-4xl mb-2" aria-hidden="true">
          📋
        </p>
        <h1 className="text-2xl font-serif font-bold text-cafe-900 mb-1">
          {t("history.title")}
        </h1>
        <p className="text-sm text-stone-500">
          {t("history.subtitle")}
        </p>
      </div>

      {history.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-stone-400 text-lg mb-2">{t("history.empty")}</p>
          <p className="text-stone-400 text-sm mb-6">
            {t("history.emptyDesc")}
          </p>
          <Button onClick={() => navigate("/questionnaire")} size="sm">
            {t("history.startDiagnosis")}
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
                            {t(`coffee.${topCoffee.id}.name`)}
                          </p>
                        )}
                        {topMatch && (
                          <p className="text-sm text-stone-500">
                            {t("history.matchScore", {
                              score: String(Math.round(topMatch.score * 100)),
                            })}
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
                      {t("history.delete")}
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            {history.length >= 2 && (
              <Button
                variant="secondary"
                onClick={() => navigate("/compare")}
                className="w-full"
                size="sm"
              >
                {t("history.compare")}
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={handleClearAll}
              className="w-full text-red-500 hover:text-red-600"
              size="sm"
            >
              {t("history.deleteAll")}
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
          {t("history.backHome")}
        </Button>
      </div>
    </div>
    </PageTransition>
  );
}
