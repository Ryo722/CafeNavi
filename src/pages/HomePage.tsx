import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PageTransition } from "../components/ui/PageTransition";
import { useTranslation } from "../lib/i18n";

export function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PageTransition>
    <div className="max-w-lg mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <p className="text-5xl mb-4" aria-hidden="true">
          ☕
        </p>
        <h1 className="text-4xl font-serif font-bold text-cafe-900 mb-3">
          {t("common.appName")}
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed">
          {t("common.tagline")}
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
          aria-label={t("home.beginnerAria")}
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
                {t("home.beginnerMode")}
              </h2>
              <p className="text-sm text-stone-600 mb-3">
                {t("home.beginnerDesc")}
              </p>
              <Button size="sm" className="w-full">
                {t("home.beginnerButton")}
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
          aria-label={t("home.advancedAria")}
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
                {t("home.advancedMode")}
              </h2>
              <p className="text-sm text-stone-600 mb-3">
                {t("home.advancedDesc")}
              </p>
              <Button size="sm" variant="secondary" className="w-full">
                {t("home.advancedButton")}
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
          {t("home.guideLink")}
        </Link>
      </div>
    </div>
    </PageTransition>
  );
}
