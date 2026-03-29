import { useState } from "react";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { roastCharacteristics } from "../data/roastProfiles";
import type { RoastLevel, GrindSize, BrewingMethod } from "../types/coffee";
import { Card } from "../components/ui/Card";

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

const roastLabels: Record<RoastLevel, string> = {
  light: "浅煎り",
  "medium-light": "中浅煎り",
  medium: "中煎り",
  "medium-dark": "中深煎り",
  dark: "深煎り",
};

const roastDescriptions: Record<RoastLevel, string> = {
  light:
    "酸味が際立ち、フルーティでフローラルな風味が楽しめます。豆本来の個性が最もよく表れる焙煎度です。",
  "medium-light":
    "酸味と甘みのバランスが良く、フルーツや花の香りを残しつつ、まろやかさも加わります。",
  medium:
    "酸味・甘み・苦味のバランスが取れた万能型。ナッツやチョコレートの風味が出始めます。",
  "medium-dark":
    "苦味とコクが増し、チョコレートやキャラメルの風味が強くなります。酸味は控えめに。",
  dark: "強い苦味としっかりしたボディが特徴。スモーキーな香りとビターチョコの風味。ミルクとの相性が抜群です。",
};

const grindLabels: Record<GrindSize, string> = {
  "extra-fine": "極細挽き",
  fine: "細挽き",
  "medium-fine": "中細挽き",
  medium: "中挽き",
  coarse: "粗挽き",
};

const grindDescriptions: Record<GrindSize, string> = {
  "extra-fine":
    "パウダー状。ターキッシュコーヒーなど特殊な抽出方法向け。",
  fine: "砂糖程度の細かさ。エスプレッソに最適です。",
  "medium-fine":
    "グラニュー糖程度。ハンドドリップ（ペーパーフィルター）に最適です。",
  medium:
    "ザラメ程度。サイフォンやネルドリップに適しています。",
  coarse:
    "粗い粒。フレンチプレスや水出しコーヒーに適しています。抽出時間が長い方法向け。",
};

const brewingLabels: Record<BrewingMethod, string> = {
  handDrip: "ハンドドリップ",
  espresso: "エスプレッソ",
  frenchPress: "フレンチプレス",
  coldBrew: "水出しコーヒー",
};

const brewingDescriptions: Record<BrewingMethod, string> = {
  handDrip:
    "お湯を手動で注いでペーパーフィルターで抽出。クリーンで繊細な味わいが楽しめます。注ぎ方で味を調整できるのが魅力。",
  espresso:
    "高圧で短時間抽出。濃厚でリッチな味わいが特徴。カフェラテやカプチーノのベースにも。",
  frenchPress:
    "金属フィルターで抽出。コーヒーオイルが残り、ボディのある豊かな味わいに。簡単に淹れられるのも魅力です。",
  coldBrew:
    "水で長時間（8-24時間）かけてゆっくり抽出。まろやかで甘みがあり、苦味が少ない仕上がりに。",
};

const flavorKeyLabels: Record<string, string> = {
  acidity: "酸味",
  fruitiness: "フルーティ",
  floral: "フローラル",
  cleanness: "クリーンさ",
  bitterness: "苦味",
  body: "ボディ",
  sweetness: "甘み",
  nuttiness: "ナッツ感",
  chocolaty: "チョコ感",
  roastiness: "焙煎感",
};

export function GuidePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-serif font-bold text-cafe-900 mb-1">
          コーヒーガイド
        </h1>
        <p className="text-sm text-stone-500">
          コーヒーをもっと楽しむための基礎知識
        </p>
      </div>

      <div className="space-y-3">
        {/* Origins */}
        <Accordion title="産地ごとの特徴" defaultOpen>
          <div className="space-y-4 mt-4">
            {coffeeProfiles.map((coffee) => (
              <Card key={coffee.id} padding="sm">
                <h4 className="font-bold text-cafe-800 mb-1">
                  {coffee.nameJa}
                </h4>
                <p className="text-xs text-stone-400 mb-2">
                  {coffee.origins.join(", ")}
                </p>
                <p className="text-sm text-stone-600 leading-relaxed mb-2">
                  {coffee.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {coffee.notes.map((note) => (
                    <span
                      key={note}
                      className="text-xs bg-cafe-50 text-cafe-600 px-2 py-0.5 rounded-full"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Accordion>

        {/* Roast levels */}
        <Accordion title="焙煎度の違い">
          <div className="space-y-4 mt-4">
            {(Object.keys(roastLabels) as RoastLevel[]).map((level) => {
              const chars = roastCharacteristics[level];
              const positiveTraits = Object.entries(chars)
                .filter(([, v]) => v > 0)
                .map(([k, v]) => `${flavorKeyLabels[k] ?? k} +${v}`)
                .join(", ");
              const negativeTraits = Object.entries(chars)
                .filter(([, v]) => v < 0)
                .map(([k, v]) => `${flavorKeyLabels[k] ?? k} ${v}`)
                .join(", ");

              return (
                <div key={level} className="pb-3 border-b border-cafe-50 last:border-b-0">
                  <h4 className="font-bold text-cafe-700 mb-1">
                    {roastLabels[level]}
                  </h4>
                  <p className="text-sm text-stone-600 mb-1">
                    {roastDescriptions[level]}
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
        <Accordion title="挽き目の違い">
          <div className="space-y-3 mt-4">
            {(Object.keys(grindLabels) as GrindSize[]).map((size) => (
              <div key={size} className="pb-3 border-b border-cafe-50 last:border-b-0">
                <h4 className="font-bold text-cafe-700 mb-1">
                  {grindLabels[size]}
                </h4>
                <p className="text-sm text-stone-600">
                  {grindDescriptions[size]}
                </p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* Brewing methods */}
        <Accordion title="抽出方法の違い">
          <div className="space-y-3 mt-4">
            {(Object.keys(brewingLabels) as BrewingMethod[]).map((method) => (
              <div key={method} className="pb-3 border-b border-cafe-50 last:border-b-0">
                <h4 className="font-bold text-cafe-700 mb-1">
                  {brewingLabels[method]}
                </h4>
                <p className="text-sm text-stone-600">
                  {brewingDescriptions[method]}
                </p>
              </div>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  );
}
