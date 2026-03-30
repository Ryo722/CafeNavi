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
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
    setSelectMode(false);
    setSelectedIds([]);
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

  const toggleSelectMode = useCallback(() => {
    setSelectMode((prev) => !prev);
    setSelectedIds([]);
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }, []);

  const handleCompareSelected = useCallback(() => {
    if (selectedIds.length === 2) {
      navigate("/compare", { state: { preselected: selectedIds } });
    }
  }, [selectedIds, navigate]);

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
          {selectMode ? t("history.selectMode") : t("history.subtitle")}
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
              const isSelected = selectedIds.includes(record.id);
              const isDisabled = selectMode && !isSelected && selectedIds.length >= 2;

              return (
                <Card
                  key={record.id}
                  padding="sm"
                  className={
                    selectMode && isSelected
                      ? "ring-2 ring-cafe-500 bg-cafe-50"
                      : isDisabled
                        ? "opacity-50"
                        : ""
                  }
                >
                  <button
                    type="button"
                    className="w-full text-left cursor-pointer"
                    onClick={() => {
                      if (selectMode) {
                        if (!isDisabled) toggleSelect(record.id);
                      } else {
                        handleView(record);
                      }
                    }}
                    disabled={isDisabled}
                  >
                    <div className="flex items-start justify-between gap-2">
                      {selectMode && (
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                            isSelected
                              ? "bg-cafe-600 border-cafe-600"
                              : "border-stone-300"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      )}
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
                      {!selectMode && (
                        <span className="text-stone-300 shrink-0 mt-1" aria-hidden="true">
                          ›
                        </span>
                      )}
                    </div>
                  </button>
                  {!selectMode && (
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
                  )}
                </Card>
              );
            })}
          </div>

          {/* Select mode sticky bar */}
          {selectMode && (
            <div className="sticky bottom-4 mb-4">
              <p className="text-center text-sm text-stone-500 mb-2">
                {t("history.selectedCount", {
                  count: String(selectedIds.length),
                })}
              </p>
              <Button
                onClick={handleCompareSelected}
                disabled={selectedIds.length !== 2}
                className="w-full"
              >
                {t("history.compareSelected")}
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {history.length >= 2 && (
              <Button
                variant={selectMode ? "ghost" : "secondary"}
                onClick={toggleSelectMode}
                className="w-full"
                size="sm"
              >
                {selectMode ? t("history.cancelSelect") : t("history.compare")}
              </Button>
            )}
            {!selectMode && (
              <Button
                variant="ghost"
                onClick={handleClearAll}
                className="w-full text-red-500 hover:text-red-600"
                size="sm"
              >
                {t("history.deleteAll")}
              </Button>
            )}
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
