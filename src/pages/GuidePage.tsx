import { useState } from "react";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { roastCharacteristics } from "../data/roastProfiles";
import type { RoastLevel, GrindSize, BrewingMethod } from "../types/coffee";
import { Card } from "../components/ui/Card";
import { useTranslation } from "../lib/i18n";

// Accordion component
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
      {isOpen && (
        <div className="px-4 pb-4 border-t border-cafe-50">{children}</div>
      )}
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

export function GuidePage() {
  const { t } = useTranslation();

  return (
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
      </div>
    </div>
  );
}
