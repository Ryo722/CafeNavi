import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDiagnosisHistory } from "../lib/storage";
import type { DiagnosisRecord } from "../lib/storage";
import type { FlavorScores } from "../types/coffee";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { PageTransition } from "../components/ui/PageTransition";
import { CompareRadarChart } from "../components/charts/CompareRadarChart";
import { useTranslation } from "../lib/i18n";

const flavorAxes: { key: keyof FlavorScores; labelKey: string }[] = [
  { key: "bitterness", labelKey: "flavor.bitterness" },
  { key: "acidity", labelKey: "flavor.acidity" },
  { key: "sweetness", labelKey: "flavor.sweetness" },
  { key: "body", labelKey: "flavor.body" },
  { key: "fruitiness", labelKey: "flavor.fruitiness" },
  { key: "floral", labelKey: "flavor.floral" },
  { key: "nuttiness", labelKey: "flavor.nuttiness" },
  { key: "chocolaty", labelKey: "flavor.chocolaty" },
  { key: "roastiness", labelKey: "flavor.roastiness" },
  { key: "cleanness", labelKey: "flavor.cleanness" },
];

const SIGNIFICANT_THRESHOLD = 2;

type Phase = "select" | "compare";

export function ComparePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [history] = useState<DiagnosisRecord[]>(getDiagnosisHistory);

  const preselected = (location.state as { preselected?: string[] } | null)?.preselected;
  const hasPreselected = Array.isArray(preselected) && preselected.length === 2;

  const [selectedIds, setSelectedIds] = useState<string[]>(
    hasPreselected ? preselected : [],
  );
  const [phase, setPhase] = useState<Phase>(
    hasPreselected ? "compare" : "select",
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

  const toggleSelect = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((x) => x !== id);
        }
        if (prev.length >= 2) return prev;
        return [...prev, id];
      });
    },
    [],
  );

  const handleCompare = useCallback(() => {
    if (selectedIds.length === 2) {
      setPhase("compare");
    }
  }, [selectedIds]);

  const handleReselect = useCallback(() => {
    setSelectedIds([]);
    setPhase("select");
  }, []);

  const getRecord = (id: string) => history.find((r) => r.id === id);
  const record1 = selectedIds[0] ? getRecord(selectedIds[0]) : undefined;
  const record2 = selectedIds[1] ? getRecord(selectedIds[1]) : undefined;

  if (history.length < 2) {
    return (
      <PageTransition>
        <div className="max-w-lg mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <p className="text-4xl mb-2" aria-hidden="true">
              🔍
            </p>
            <h1 className="text-2xl font-serif font-bold text-cafe-900 mb-1">
              {t("compare.title")}
            </h1>
          </div>
          <Card className="text-center py-12">
            <p className="text-stone-400 text-lg mb-6">
              {t("compare.noHistory")}
            </p>
            <Button onClick={() => navigate("/questionnaire")} size="sm">
              {t("history.startDiagnosis")}
            </Button>
          </Card>
          <div className="mt-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="w-full"
              size="sm"
            >
              {t("compare.backHome")}
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (phase === "select") {
    return (
      <PageTransition>
        <div className="max-w-lg mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <p className="text-4xl mb-2" aria-hidden="true">
              🔍
            </p>
            <h1 className="text-2xl font-serif font-bold text-cafe-900 mb-1">
              {t("compare.title")}
            </h1>
            <p className="text-sm text-stone-500">
              {t("compare.selectTwo")}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {history.map((record) => {
              const topMatch = record.result.topMatches[0];
              const topCoffee = topMatch
                ? coffeeProfiles.find((p) => p.id === topMatch.coffeeId)
                : undefined;
              const isSelected = selectedIds.includes(record.id);
              const isDisabled =
                !isSelected && selectedIds.length >= 2;

              return (
                <Card
                  key={record.id}
                  padding="sm"
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? "ring-2 ring-cafe-500 bg-cafe-50"
                      : isDisabled
                        ? "opacity-50"
                        : ""
                  }`}
                >
                  <button
                    type="button"
                    className="w-full text-left flex items-center gap-3"
                    onClick={() => !isDisabled && toggleSelect(record.id)}
                    disabled={isDisabled}
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
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
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-stone-400 mb-0.5">
                        {formatDate(record.date)}
                        <span className="ml-2 inline-block bg-cafe-100 text-cafe-700 px-2 py-0.5 rounded-full text-xs">
                          {modeLabel(record.mode)}
                        </span>
                      </p>
                      {topCoffee && (
                        <p className="text-sm font-bold text-cafe-800 truncate">
                          {t(`coffee.${topCoffee.id}.name`)}
                        </p>
                      )}
                      {topMatch && (
                        <p className="text-xs text-stone-500">
                          {t("history.matchScore", {
                            score: String(Math.round(topMatch.score * 100)),
                          })}
                        </p>
                      )}
                    </div>
                  </button>
                </Card>
              );
            })}
          </div>

          <div className="sticky bottom-4">
            <p className="text-center text-sm text-stone-500 mb-2">
              {t("compare.selected", {
                count: String(selectedIds.length),
              })}
            </p>
            <Button
              onClick={handleCompare}
              disabled={selectedIds.length !== 2}
              className="w-full"
            >
              {t("compare.compare")}
            </Button>
          </div>

          <div className="mt-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="w-full"
              size="sm"
            >
              {t("compare.backHome")}
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Compare phase
  if (!record1 || !record2) return null;

  const top1 = record1.result.topMatches[0];
  const top2 = record2.result.topMatches[0];
  const coffee1 = top1
    ? coffeeProfiles.find((p) => p.id === top1.coffeeId)
    : undefined;
  const coffee2 = top2
    ? coffeeProfiles.find((p) => p.id === top2.coffeeId)
    : undefined;

  const coffeeName1 = coffee1 ? t(`coffee.${coffee1.id}.name`) : "-";
  const coffeeName2 = coffee2 ? t(`coffee.${coffee2.id}.name`) : "-";
  const score1 = top1 ? Math.round(top1.score * 100) : 0;
  const score2 = top2 ? Math.round(top2.score * 100) : 0;

  const roast1 = t(`roastLevel.${record1.result.recommendedRoast}`);
  const roast2 = t(`roastLevel.${record2.result.recommendedRoast}`);
  const grind1 = t(`grindSize.${record1.result.recommendedGrind}`);
  const grind2 = t(`grindSize.${record2.result.recommendedGrind}`);
  const brew1 = record1.result.recommendedBrewingMethods
    .map((m) => t(`brewingMethod.${m}`))
    .join(", ");
  const brew2 = record2.result.recommendedBrewingMethods
    .map((m) => t(`brewingMethod.${m}`))
    .join(", ");
  const pairings1 = record1.result.pairingSuggestions
    .map((p) => t(`pairing.${p}`))
    .join(", ");
  const pairings2 = record2.result.pairingSuggestions
    .map((p) => t(`pairing.${p}`))
    .join(", ");

  type CompareRow = {
    label: string;
    value1: string;
    value2: string;
  };

  const rows: CompareRow[] = [
    {
      label: t("compare.date"),
      value1: formatDate(record1.date),
      value2: formatDate(record2.date),
    },
    {
      label: t("compare.mode"),
      value1: modeLabel(record1.mode),
      value2: modeLabel(record2.mode),
    },
    {
      label: t("compare.topCoffee"),
      value1: coffeeName1,
      value2: coffeeName2,
    },
    {
      label: t("compare.matchScore"),
      value1: `${score1}%`,
      value2: `${score2}%`,
    },
    {
      label: t("compare.roastLevel"),
      value1: roast1,
      value2: roast2,
    },
    {
      label: t("compare.grindSize"),
      value1: grind1,
      value2: grind2,
    },
    {
      label: t("compare.brewingMethod"),
      value1: brew1,
      value2: brew2,
    },
    {
      label: t("compare.pairings"),
      value1: pairings1,
      value2: pairings2,
    },
  ];

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-4xl mb-2" aria-hidden="true">
            🔍
          </p>
          <h1 className="text-2xl font-serif font-bold text-cafe-900 mb-1">
            {t("compare.title")}
          </h1>
        </div>

        {/* Radar chart overlay */}
        <Card className="mb-6">
          <h2 className="text-base font-bold text-cafe-800 text-center mb-3">
            {t("compare.flavorProfile")}
          </h2>
          <CompareRadarChart
            profile1={record1.userFlavorProfile}
            profile2={record2.userFlavorProfile}
            label1={t("compare.diagnosis1")}
            label2={t("compare.diagnosis2")}
          />
        </Card>

        {/* Comparison table */}
        <Card className="mb-6 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 gap-2 pb-3 mb-3 border-b border-cafe-100">
            <div className="text-xs text-stone-400 font-medium" />
            <div className="text-center">
              <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {t("compare.diagnosis1")}
              </span>
            </div>
            <div className="text-center">
              <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {t("compare.diagnosis2")}
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-0">
            {rows.map((row) => {
              const isDifferent = row.value1 !== row.value2;
              return (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 gap-2 py-2.5 border-b border-cafe-50 last:border-0 ${
                    isDifferent ? "bg-amber-50/60" : ""
                  }`}
                >
                  <div className="text-xs font-medium text-stone-600 flex items-start pt-0.5">
                    {row.label}
                    {isDifferent && (
                      <span className="ml-1 text-amber-500 text-[10px]" title={t("compare.differences")}>
                        *
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-cafe-800 text-center break-words">
                    {row.value1}
                  </div>
                  <div className="text-xs text-cafe-800 text-center break-words">
                    {row.value2}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Flavor score diff table */}
        <Card className="mb-6 overflow-hidden">
          <h2 className="text-base font-bold text-cafe-800 text-center mb-3">
            {t("compare.flavorScores")}
          </h2>
          <div className="grid grid-cols-4 gap-1 pb-2 mb-2 border-b border-cafe-100 text-xs font-medium text-stone-400">
            <div>{t("compare.axis")}</div>
            <div className="text-center">{t("compare.diagnosis1")}</div>
            <div className="text-center">{t("compare.diagnosis2")}</div>
            <div className="text-center">{t("compare.change")}</div>
          </div>
          <div className="space-y-0">
            {flavorAxes.map((axis) => {
              const v1 = record1.userFlavorProfile[axis.key];
              const v2 = record2.userFlavorProfile[axis.key];
              const diff = v2 - v1;
              const isSignificant = Math.abs(diff) >= SIGNIFICANT_THRESHOLD;
              const arrow =
                diff > 0
                  ? t("compare.increase")
                  : diff < 0
                    ? t("compare.decrease")
                    : t("compare.noChange");
              return (
                <div
                  key={axis.key}
                  className={`grid grid-cols-4 gap-1 py-2 border-b border-cafe-50 last:border-0 ${
                    isSignificant ? "bg-amber-50/60" : ""
                  }`}
                >
                  <div className="text-xs font-medium text-stone-600 flex items-center gap-1">
                    {t(axis.labelKey)}
                    {isSignificant && (
                      <span className="text-amber-500 text-[10px]" title={t("compare.significantChange")}>
                        *
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-cafe-800 text-center">{v1}</div>
                  <div className="text-xs text-cafe-800 text-center">{v2}</div>
                  <div
                    className={`text-xs text-center font-medium ${
                      diff > 0
                        ? "text-green-600"
                        : diff < 0
                          ? "text-red-500"
                          : "text-stone-400"
                    }`}
                  >
                    {arrow}
                    {diff !== 0 && (
                      <span className="ml-0.5">
                        {diff > 0 ? "+" : ""}
                        {diff}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Legend */}
        <div className="flex items-center gap-2 text-xs text-stone-400 mb-6 justify-center">
          <span className="inline-block w-3 h-3 bg-amber-50 border border-amber-200 rounded" />
          <span>{t("compare.differences")}</span>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={handleReselect} variant="secondary" className="w-full">
            {t("compare.reselect")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="w-full"
            size="sm"
          >
            {t("compare.backHome")}
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
