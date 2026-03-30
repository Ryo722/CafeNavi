import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { UserMode, TasteProfileInput, Question } from "../types/questionnaire";
import {
  getBeginnerQuestions,
  getAdvancedQuestions,
} from "../features/questionnaire/questions";
import { getFullRecommendation } from "../lib/explanation";
import { calculateUserFlavorProfile } from "../lib/scoring";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PageTransition } from "../components/ui/PageTransition";
import { TasteSlider } from "../components/taste/TasteSlider";
import { DessertSelector } from "../components/taste/DessertSelector";
import { SceneSelector } from "../components/taste/SceneSelector";
import { useTranslation } from "../lib/i18n";

const defaultInput: TasteProfileInput = {
  bitternessPreference: 3,
  acidityPreference: 3,
  sweetnessPreference: 3,
  bodyPreference: 3,
  fruityPreference: 3,
  roastedPreference: 3,
  floralPreference: 3,
  nuttyPreference: 3,
  chocolatePreference: 3,
  milkPreference: 3,
  dessertPreference: [],
  drinkScenes: [],
};

export function QuestionnairePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, locale } = useTranslation();
  const mode: UserMode =
    (location.state as { mode?: UserMode })?.mode ?? "beginner";

  const questions = useMemo(
    () =>
      mode === "beginner" ? getBeginnerQuestions() : getAdvancedQuestions(),
    [mode],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState<TasteProfileInput>({ ...defaultInput });
  const [animState, setAnimState] = useState<"enter-right" | "enter-left" | "exit-left" | "exit-right" | "idle">("enter-right");
  const pendingIndexRef = useRef<number | null>(null);

  const question = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLast = currentIndex === totalQuestions - 1;
  const isBeginner = mode === "beginner";

  // Trigger enter animation when index changes
  useEffect(() => {
    // Reset to idle after enter animation completes
    if (animState === "enter-right" || animState === "enter-left") {
      const timer = setTimeout(() => setAnimState("idle"), 300);
      return () => clearTimeout(timer);
    }
  }, [animState]);

  const animateToIndex = useCallback((nextIndex: number, direction: "forward" | "backward") => {
    const exitClass = direction === "forward" ? "exit-left" : "exit-right";
    const enterClass = direction === "forward" ? "enter-right" : "enter-left";
    pendingIndexRef.current = nextIndex;
    setAnimState(exitClass);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setAnimState(enterClass);
      pendingIndexRef.current = null;
    }, 250);
  }, []);

  const handleSliderChange = (field: keyof TasteProfileInput, value: number) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectChange = (
    field: keyof TasteProfileInput,
    question: Question,
    values: string[],
  ) => {
    const currentQuestion = question;
    const questionOptions =
      currentQuestion.options?.map((o) => o.value) ?? [];

    setInput((prev) => {
      const existing = prev[field] as string[];
      const withoutCurrent = existing.filter(
        (v) => !questionOptions.includes(v),
      );
      return { ...prev, [field]: [...withoutCurrent, ...values] };
    });
  };

  const goNext = () => {
    if (isLast) {
      const result = getFullRecommendation(input, undefined, locale);
      const userProfile = calculateUserFlavorProfile(input);
      navigate("/result", { state: { result, userProfile, input, mode } });
    } else {
      animateToIndex(currentIndex + 1, "forward");
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      animateToIndex(currentIndex - 1, "backward");
    }
  };

  const getQuestionText = (q: Question) => {
    const beginnerKey = `question.${q.id}.beginner`;
    const normalKey = `question.${q.id}`;
    return isBeginner ? t(beginnerKey) : t(normalKey);
  };

  const getOptionLabel = (option: { value: string; label: string; labelBeginner: string }) => {
    const beginnerKey = `option.${option.value}.beginner`;
    const normalKey = `option.${option.value}`;
    return isBeginner ? t(beginnerKey) : t(normalKey);
  };

  const getCurrentSliderValue = (): number => {
    const val = input[question.field];
    return typeof val === "number" ? val : 3;
  };

  const getCurrentMultiSelectValue = (): string[] => {
    const val = input[question.field];
    if (!Array.isArray(val)) return [];
    const questionOptions = question.options?.map((o) => o.value) ?? [];
    return (val as string[]).filter((v) => questionOptions.includes(v));
  };

  const getSliderLeftLabel = (): string => {
    return t(`slider.${question.field}.left`);
  };

  const getSliderRightLabel = (): string => {
    return t(`slider.${question.field}.right`);
  };

  const questionAnimClass =
    animState === "enter-right" ? "question-enter-right" :
    animState === "enter-left" ? "question-enter-left" :
    animState === "exit-left" ? "question-exit-left" :
    animState === "exit-right" ? "question-exit-right" : "";

  return (
    <PageTransition>
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-stone-500">
            {mode === "beginner"
              ? t("questionnaire.beginnerLabel")
              : t("questionnaire.advancedLabel")}
          </span>
          <span className="text-sm font-medium text-cafe-700">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="w-full h-2 bg-cafe-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-cafe-500 rounded-full"
            style={{
              width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <Card
        padding="lg"
        className={`mb-6 ${questionAnimClass}`}
      >
        <h2 className="text-lg font-bold text-cafe-800 mb-6 leading-relaxed">
          {getQuestionText(question)}
        </h2>

        {question.type === "slider" && (
          <TasteSlider
            questionId={question.id}
            value={getCurrentSliderValue()}
            onChange={(v) => handleSliderChange(question.field, v)}
            leftLabel={getSliderLeftLabel()}
            rightLabel={getSliderRightLabel()}
          />
        )}

        {question.type === "multiSelect" &&
          question.options &&
          (question.field === "drinkScenes" ? (
            <SceneSelector
              options={question.options.map((o) => ({
                value: o.value,
                label: getOptionLabel(o),
              }))}
              selected={getCurrentMultiSelectValue()}
              onChange={(values) =>
                handleMultiSelectChange(question.field, question, values)
              }
            />
          ) : (
            <DessertSelector
              options={question.options.map((o) => ({
                value: o.value,
                label: getOptionLabel(o),
              }))}
              selected={getCurrentMultiSelectValue()}
              onChange={(values) =>
                handleMultiSelectChange(question.field, question, values)
              }
            />
          ))}
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="ghost"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="flex-1"
        >
          {t("common.back")}
        </Button>
        <Button onClick={goNext} className="flex-1">
          {isLast ? t("common.submit") : t("common.next")}
        </Button>
      </div>
    </div>
    </PageTransition>
  );
}
