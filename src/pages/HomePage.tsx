import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <p className="text-5xl mb-4" aria-hidden="true">
          ☕
        </p>
        <h1 className="text-4xl font-serif font-bold text-cafe-900 mb-3">
          CafeNavi
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed">
          あなたにぴったりのコーヒーを見つけよう
        </p>
      </div>

      {/* Mode selection */}
      <div className="space-y-4 mb-8">
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow border-cafe-200 hover:border-cafe-400"
          onClick={() =>
            navigate("/questionnaire", { state: { mode: "beginner" } })
          }
          role="button"
          tabIndex={0}
          aria-label="かんたん診断を始める"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/questionnaire", { state: { mode: "beginner" } });
            }
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl" aria-hidden="true">
              🌱
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-cafe-800 mb-1">
                かんたん診断
              </h2>
              <p className="text-sm text-stone-600 mb-3">
                コーヒー初心者におすすめ。10問の質問であなたの好みを分析します。
              </p>
              <Button size="sm" className="w-full">
                10問で診断する
              </Button>
            </div>
          </div>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow border-cafe-200 hover:border-cafe-400"
          onClick={() =>
            navigate("/questionnaire", { state: { mode: "advanced" } })
          }
          role="button"
          tabIndex={0}
          aria-label="くわしく診断を始める"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/questionnaire", { state: { mode: "advanced" } });
            }
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl" aria-hidden="true">
              🔍
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-cafe-800 mb-1">
                くわしく診断
              </h2>
              <p className="text-sm text-stone-600 mb-3">
                こだわり派に。20問の詳細な質問でより精密な診断結果をお届けします。
              </p>
              <Button size="sm" variant="secondary" className="w-full">
                20問で診断する
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Guide link */}
      <div className="text-center">
        <Link
          to="/guide"
          className="inline-flex items-center gap-2 text-cafe-600 hover:text-cafe-800 font-medium transition-colors"
        >
          <span aria-hidden="true">📖</span>
          コーヒーガイドを見る
        </Link>
      </div>
    </div>
  );
}
