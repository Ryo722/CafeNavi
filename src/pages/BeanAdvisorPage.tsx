import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { coffeeProfiles } from "../data/coffeeProfiles";
import {
  getBrewingAdvice,
  brewingMethodNameJa,
  roastLevelNameJa,
  grindSizeNameJa,
} from "../lib/brewingAdvice";
import type {
  BeanInput,
  BrewingAdvice,
  RoastLevel,
} from "../types/coffee";

const roastLevels: RoastLevel[] = [
  "light",
  "medium-light",
  "medium",
  "medium-dark",
  "dark",
];

const roastColors: Record<RoastLevel, string> = {
  light: "bg-amber-200 border-amber-400 text-amber-900",
  "medium-light": "bg-amber-300 border-amber-500 text-amber-900",
  medium: "bg-amber-500 border-amber-600 text-white",
  "medium-dark": "bg-amber-700 border-amber-800 text-white",
  dark: "bg-amber-900 border-amber-950 text-white",
};

export function BeanAdvisorPage() {
  const [origin, setOrigin] = useState<string>("");
  const [roastLevel, setRoastLevel] = useState<RoastLevel | "">("");
  const [advice, setAdvice] = useState<BrewingAdvice | null>(null);

  const canSubmit = origin !== "" && roastLevel !== "";

  function handleSubmit() {
    if (!canSubmit) return;
    const input: BeanInput = {
      origin,
      roastLevel: roastLevel as RoastLevel,
    };
    setAdvice(getBrewingAdvice(input));
  }

  function handleReset() {
    setOrigin("");
    setRoastLevel("");
    setAdvice(null);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      {/* Title */}
      <div className="text-center mb-8">
        <p className="text-4xl mb-3" aria-hidden="true">
          🫘
        </p>
        <h1 className="text-3xl font-serif font-bold text-cafe-900 mb-2">
          お手持ちの豆を診断
        </h1>
        <p className="text-sm text-stone-600">
          豆の産地と焙煎度から、おすすめの淹れ方をご提案します
        </p>
      </div>

      {!advice ? (
        <div className="space-y-6">
          {/* Origin selection */}
          <Card>
            <h2 className="text-lg font-bold text-cafe-800 mb-3">
              1. 産地を選んでください
            </h2>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-3 rounded-xl border border-cafe-200 bg-white text-cafe-900 focus:outline-none focus:ring-2 focus:ring-cafe-400"
            >
              <option value="">-- 選択してください --</option>
              {coffeeProfiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nameJa}
                </option>
              ))}
              <option value="other">その他 / わからない</option>
            </select>
          </Card>

          {/* Roast level selection */}
          <Card>
            <h2 className="text-lg font-bold text-cafe-800 mb-3">
              2. 焙煎度を選んでください
            </h2>
            <div className="grid grid-cols-5 gap-2">
              {roastLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setRoastLevel(level)}
                  className={`
                    rounded-xl py-3 px-1 text-xs font-medium border-2 transition-all cursor-pointer
                    ${roastColors[level]}
                    ${
                      roastLevel === level
                        ? "ring-2 ring-cafe-500 ring-offset-2 scale-105"
                        : "opacity-70 hover:opacity-100"
                    }
                  `}
                >
                  {roastLevelNameJa[level]}
                </button>
              ))}
            </div>
          </Card>

          {/* Submit button */}
          <Button
            size="lg"
            className="w-full"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            診断する
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Recommended methods */}
          <div>
            <h2 className="text-lg font-bold text-cafe-800 mb-3">
              おすすめの抽出方法
            </h2>
            <div className="space-y-4">
              {advice.recommendedMethods.map((m, i) => (
                <Card key={m.method} className={i === 0 ? "border-cafe-400 shadow-md" : ""}>
                  <div className="flex items-center gap-2 mb-3">
                    {i === 0 && (
                      <span className="bg-cafe-700 text-white text-xs px-2 py-0.5 rounded-full">
                        イチオシ
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-cafe-900">
                      {brewingMethodNameJa[m.method]}
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm text-stone-700">
                    <div className="flex gap-2">
                      <span className="font-medium text-cafe-700 min-w-[4rem]">挽き目</span>
                      <span>{grindSizeNameJa[m.grindSize]}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-cafe-700 min-w-[4rem]">温度</span>
                      <span>{m.temperature}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-cafe-700 min-w-[4rem]">比率</span>
                      <span>{m.ratio}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-cafe-700 min-w-[4rem]">コツ</span>
                      <span>{m.tips}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Flavor expectation */}
          <Card>
            <h2 className="text-lg font-bold text-cafe-800 mb-2">
              期待できる味わい
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {advice.flavorExpectation}
            </p>
          </Card>

          {/* Pairings */}
          <Card>
            <h2 className="text-lg font-bold text-cafe-800 mb-2">
              相性の良いお菓子
            </h2>
            <div className="flex flex-wrap gap-2">
              {advice.pairings.map((p) => (
                <span
                  key={p}
                  className="bg-cafe-100 text-cafe-800 text-sm px-3 py-1 rounded-full"
                >
                  {p}
                </span>
              ))}
            </div>
          </Card>

          {/* Avoid notes */}
          <Card>
            <h2 className="text-lg font-bold text-cafe-800 mb-2">
              気をつけたいポイント
            </h2>
            <ul className="space-y-1">
              {advice.avoidNotes.map((note) => (
                <li key={note} className="text-sm text-stone-700 flex gap-2">
                  <span className="text-cafe-500 shrink-0">!</span>
                  {note}
                </li>
              ))}
            </ul>
          </Card>

          {/* Reset button */}
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={handleReset}
          >
            もう一度診断する
          </Button>
        </div>
      )}
    </div>
  );
}
