import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { roastCharacteristics } from "../data/roastProfiles";
import {
  brewingGuides,
  getAvailableRoastLevels,
  getYouTubeSearchUrl,
} from "../data/brewingGuides";
import type { BrewingGuide } from "../data/brewingGuides";
import type { RoastLevel, GrindSize, BrewingMethod } from "../types/coffee";
import { Card } from "../components/ui/Card";
import { PageTransition } from "../components/ui/PageTransition";
import { useTranslation } from "../lib/i18n";

// Accordion component with smooth open/close
function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(defaultOpen ? "none" : "0px");

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  useEffect(() => {
    updateHeight();
  }, [updateHeight]);

  return (
    <div className="border border-cafe-100 rounded-xl overflow-hidden bg-white">
      <button
        className="w-full flex items-center justify-between p-4 text-left font-bold text-cafe-800 hover:bg-cafe-50 transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        <svg
          className={`w-5 h-5 text-cafe-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        ref={contentRef}
        className={`accordion-content ${isOpen ? "accordion-content-open" : "accordion-content-closed"}`}
        style={{ maxHeight: isOpen ? maxHeight : "0px" }}
      >
        <div className="px-4 pb-4 border-t border-cafe-50">{children}</div>
      </div>
    </div>
  );
}

const roastLevels: RoastLevel[] = [
  "light",
  "medium-light",
  "medium",
  "medium-dark",
  "dark",
];

const grindSizes: GrindSize[] = [
  "extra-fine",
  "fine",
  "medium-fine",
  "medium",
  "coarse",
];

const brewingMethods: BrewingMethod[] = [
  "handDrip",
  "espresso",
  "frenchPress",
  "coldBrew",
];

const flavorKeys = [
  "bitterness",
  "acidity",
  "sweetness",
  "body",
  "fruitiness",
  "floral",
  "nuttiness",
  "chocolaty",
  "roastiness",
  "cleanness",
] as const;

// Brewing guide card component
function BrewingGuideCard({
  guide,
  isJa,
  t,
}: {
  guide: BrewingGuide;
  isJa: boolean;
  t: (key: string) => string;
}) {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <Card padding="md">
      <h4 className="font-bold text-cafe-800 mb-2 text-base">
        {isJa ? guide.title : guide.titleEn}
      </h4>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
          </svg>
          {guide.temperature}
        </span>
        <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          {guide.ratio}
        </span>
        <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {guide.totalTime}
        </span>
      </div>

      {/* Toggle steps */}
      <button
        className="text-sm text-cafe-600 hover:text-cafe-800 font-medium mb-2 cursor-pointer flex items-center gap-1 transition-colors"
        onClick={() => setShowSteps(!showSteps)}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${showSteps ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {t("brewingGuide.steps")}
      </button>

      {showSteps && (
        <div className="space-y-3 mb-3">
          {/* Steps */}
          <ol className="space-y-2">
            {guide.steps.map((s) => (
              <li key={s.step} className="flex gap-3 text-sm">
                <span className="shrink-0 w-6 h-6 bg-cafe-100 text-cafe-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {s.step}
                </span>
                <div className="flex-1">
                  <p className="text-stone-700 leading-relaxed">
                    {isJa ? s.instruction : s.instructionEn}
                  </p>
                  {s.duration && (
                    <span className="text-xs text-stone-400 mt-0.5 block">
                      {s.duration}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* Tips */}
          <div className="bg-amber-50 rounded-lg p-3">
            <p className="text-xs font-bold text-amber-700 mb-1">{t("brewingGuide.tips")}</p>
            <ul className="space-y-1">
              {(isJa ? guide.tips : guide.tipsEn).map((tip, i) => (
                <li key={i} className="text-xs text-amber-800 flex items-start gap-1.5">
                  <span className="shrink-0 mt-0.5">*</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* YouTube link */}
      <a
        href={getYouTubeSearchUrl(guide.videoKeyword)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        {t("brewingGuide.watchVideo")}
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </Card>
  );
}

export function GuidePage() {
  const { t, locale } = useTranslation();
  const location = useLocation();
  const isJa = locale === "ja";

  // Parse roast filter from URL hash (e.g., #brewing-light)
  const [roastFilter, setRoastFilter] = useState<RoastLevel | "all">("all");
  const brewingSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = location.hash;
    if (hash.startsWith("#brewing-")) {
      const level = hash.replace("#brewing-", "") as RoastLevel;
      const validLevels: RoastLevel[] = ["light", "medium-light", "medium", "medium-dark", "dark"];
      if (validLevels.includes(level)) {
        setRoastFilter(level);
        // Scroll to brewing section after short delay for render
        setTimeout(() => {
          brewingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

  const availableRoasts = getAvailableRoastLevels();

  const filteredGuides =
    roastFilter === "all"
      ? brewingGuides
      : brewingGuides.filter((g) => g.roastLevel === roastFilter);

  // Group by method for display
  const methodOrder: BrewingMethod[] = ["handDrip", "espresso", "frenchPress", "coldBrew"];
  const groupedGuides = methodOrder
    .map((method) => ({
      method,
      guides: filteredGuides.filter((g) => g.method === method),
    }))
    .filter((group) => group.guides.length > 0);

  return (
    <PageTransition>
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-serif font-bold text-cafe-900 mb-1">
          {t("guide.title")}
        </h1>
        <p className="text-sm text-stone-500">
          {t("guide.subtitle")}
        </p>
      </div>

      <div className="space-y-3">
        {/* Origins */}
        <Accordion title={t("guide.origins")} defaultOpen>
          <div className="space-y-4 mt-4">
            {coffeeProfiles.map((coffee) => (
              <Card key={coffee.id} padding="sm">
                <h4 className="font-bold text-cafe-800 mb-1">
                  {t(`coffee.${coffee.id}.name`)}
                </h4>
                <p className="text-xs text-stone-400 mb-2">
                  {coffee.origins.join(", ")}
                </p>
                <p className="text-sm text-stone-600 leading-relaxed mb-2">
                  {t(`coffee.${coffee.id}.description`)}
                </p>
                <div className="flex flex-wrap gap-1">
                  {coffee.notes.map((note) => (
                    <span
                      key={note}
                      className="text-xs bg-cafe-50 text-cafe-600 px-2 py-0.5 rounded-full"
                    >
                      {t(`note.${note}`)}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Accordion>

        {/* Roast levels */}
        <Accordion title={t("guide.roasting")}>
          <div className="space-y-4 mt-4">
            {roastLevels.map((level) => {
              const chars = roastCharacteristics[level];
              const positiveTraits = Object.entries(chars)
                .filter(([, v]) => v > 0)
                .map(
                  ([k, v]) =>
                    `${t(`flavor.${k as (typeof flavorKeys)[number]}`)} +${v}`,
                )
                .join(", ");
              const negativeTraits = Object.entries(chars)
                .filter(([, v]) => v < 0)
                .map(
                  ([k, v]) =>
                    `${t(`flavor.${k as (typeof flavorKeys)[number]}`)} ${v}`,
                )
                .join(", ");

              return (
                <div key={level} className="pb-3 border-b border-cafe-50 last:border-b-0">
                  <h4 className="font-bold text-cafe-700 mb-1">
                    {t(`roastLevel.${level}`)}
                  </h4>
                  <p className="text-sm text-stone-600 mb-1">
                    {t(`guide.roastDesc.${level}`)}
                  </p>
                  <p className="text-xs text-stone-400">
                    {positiveTraits && (
                      <span className="text-green-600">{positiveTraits}</span>
                    )}
                    {positiveTraits && negativeTraits && " / "}
                    {negativeTraits && (
                      <span className="text-red-400">{negativeTraits}</span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </Accordion>

        {/* Grind sizes */}
        <Accordion title={t("guide.grinding")}>
          <div className="space-y-3 mt-4">
            {grindSizes.map((size) => (
              <div key={size} className="pb-3 border-b border-cafe-50 last:border-b-0">
                <h4 className="font-bold text-cafe-700 mb-1">
                  {t(`grindSize.${size}`)}
                </h4>
                <p className="text-sm text-stone-600">
                  {t(`guide.grindDesc.${size}`)}
                </p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* Brewing methods */}
        <Accordion title={t("guide.brewing")}>
          <div className="space-y-3 mt-4">
            {brewingMethods.map((method) => (
              <div key={method} className="pb-3 border-b border-cafe-50 last:border-b-0">
                <h4 className="font-bold text-cafe-700 mb-1">
                  {t(`brewingMethod.${method}`)}
                </h4>
                <p className="text-sm text-stone-600">
                  {t(`guide.brewingDesc.${method}`)}
                </p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* Brewing Guides */}
        <div ref={brewingSectionRef} id="brewing-guides">
          <Accordion title={t("brewingGuide.title")} defaultOpen={roastFilter !== "all"}>
            <div className="mt-4">
              <p className="text-sm text-stone-500 mb-3">
                {t("brewingGuide.subtitle")}
              </p>

              {/* Roast filter tabs */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <button
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                    roastFilter === "all"
                      ? "bg-cafe-700 text-white"
                      : "bg-cafe-50 text-cafe-600 hover:bg-cafe-100"
                  }`}
                  onClick={() => setRoastFilter("all")}
                >
                  {t("brewingGuide.filterAll")}
                </button>
                {availableRoasts.map((level) => (
                  <button
                    key={level}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                      roastFilter === level
                        ? "bg-cafe-700 text-white"
                        : "bg-cafe-50 text-cafe-600 hover:bg-cafe-100"
                    }`}
                    onClick={() => setRoastFilter(level)}
                  >
                    {t(`roastLevel.${level}`)}
                  </button>
                ))}
              </div>

              {/* Grouped guides */}
              {groupedGuides.length > 0 ? (
                <div className="space-y-4">
                  {groupedGuides.map(({ method, guides }) => (
                    <div key={method}>
                      <h4 className="text-sm font-bold text-cafe-600 mb-2 flex items-center gap-1.5">
                        <span className="w-1 h-4 bg-cafe-400 rounded-full" />
                        {t(`brewingMethod.${method}`)}
                      </h4>
                      <div className="space-y-3">
                        {guides.map((guide) => (
                          <BrewingGuideCard
                            key={guide.id}
                            guide={guide}
                            isJa={isJa}
                            t={t}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-stone-400 text-center py-4">
                  {t("brewingGuide.noGuides")}
                </p>
              )}
            </div>
          </Accordion>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
