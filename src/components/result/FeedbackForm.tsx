import { useState } from "react";
import type { FeedbackRating, DiagnosisFeedback } from "../../types/coffee";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

type RatingOption = {
  value: FeedbackRating;
  emoji: string;
  label: string;
};

const ratingOptions: RatingOption[] = [
  { value: "perfect", emoji: "\uD83D\uDE0D", label: "ぴったり！" },
  { value: "good", emoji: "\uD83D\uDE0A", label: "まあまあ合ってる" },
  { value: "neutral", emoji: "\uD83D\uDE10", label: "普通" },
  { value: "off", emoji: "\uD83E\uDD14", label: "ちょっと違う" },
  { value: "wrong", emoji: "\uD83D\uDE05", label: "全然違う" },
];

type CoffeeMatch = {
  coffeeId: string;
  nameJa: string;
};

type FeedbackFormProps = {
  diagnosisId: string;
  coffeeMatches: CoffeeMatch[];
  existingFeedback: DiagnosisFeedback | null;
  onSubmit: (feedback: DiagnosisFeedback) => void;
};

export function FeedbackForm({
  diagnosisId,
  coffeeMatches,
  existingFeedback,
  onSubmit,
}: FeedbackFormProps) {
  const [rating, setRating] = useState<FeedbackRating | null>(
    existingFeedback?.rating ?? null,
  );
  const [coffeeRatings, setCoffeeRatings] = useState<Record<string, FeedbackRating>>(
    existingFeedback?.coffeeRatings ?? {},
  );
  const [comment, setComment] = useState(existingFeedback?.comment ?? "");
  const [showCoffeeRatings, setShowCoffeeRatings] = useState(false);
  const [submitted, setSubmitted] = useState(!!existingFeedback);

  const handleCoffeeRating = (coffeeId: string, value: FeedbackRating) => {
    setCoffeeRatings((prev) => ({ ...prev, [coffeeId]: value }));
  };

  const handleSubmit = () => {
    if (!rating) return;

    const feedback: DiagnosisFeedback = {
      diagnosisId,
      rating,
      coffeeRatings: Object.keys(coffeeRatings).length > 0 ? coffeeRatings : undefined,
      comment: comment.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    onSubmit(feedback);
    setSubmitted(true);
  };

  if (submitted && existingFeedback) {
    const submittedOption = ratingOptions.find((o) => o.value === existingFeedback.rating);
    return (
      <Card>
        <div className="text-center py-2">
          <p className="text-sm text-cafe-700 font-medium mb-1">
            フィードバック送信済み
          </p>
          {submittedOption && (
            <p className="text-lg">
              {submittedOption.emoji} {submittedOption.label}
            </p>
          )}
          {existingFeedback.comment && (
            <p className="text-xs text-stone-400 mt-2">
              &ldquo;{existingFeedback.comment}&rdquo;
            </p>
          )}
        </div>
      </Card>
    );
  }

  if (submitted) {
    return (
      <Card>
        <div className="text-center py-4">
          <p className="text-2xl mb-2" aria-hidden="true">
            &#x2615;
          </p>
          <p className="text-cafe-700 font-medium">
            フィードバックありがとうございます！
          </p>
          <p className="text-sm text-stone-500 mt-1">
            次回の診断に反映されます
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-bold text-cafe-800 mb-3 text-center">
        診断結果はいかがでしたか？
      </h3>

      {/* 全体評価 */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {ratingOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setRating(option.value)}
            className={`
              flex flex-col items-center gap-1 px-3 py-2 rounded-xl
              transition-all duration-200 cursor-pointer min-w-[70px]
              focus:outline-none focus:ring-2 focus:ring-cafe-400 focus:ring-offset-1
              ${
                rating === option.value
                  ? "bg-cafe-100 border-2 border-cafe-500 shadow-sm"
                  : "bg-stone-50 border-2 border-transparent hover:bg-cafe-50 hover:border-cafe-200"
              }
            `}
            aria-label={option.label}
            aria-pressed={rating === option.value}
          >
            <span className="text-2xl" aria-hidden="true">
              {option.emoji}
            </span>
            <span className="text-xs text-stone-600 leading-tight text-center">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {/* 個別コーヒー評価（展開式） */}
      {coffeeMatches.length > 1 && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowCoffeeRatings(!showCoffeeRatings)}
            className="text-sm text-cafe-600 hover:text-cafe-800 transition-colors cursor-pointer flex items-center gap-1 mx-auto"
          >
            <span className={`transition-transform duration-200 ${showCoffeeRatings ? "rotate-90" : ""}`}>
              &#x25B6;
            </span>
            個別のコーヒーも評価する（任意）
          </button>

          {showCoffeeRatings && (
            <div className="mt-3 space-y-3">
              {coffeeMatches.map((coffee) => (
                <div key={coffee.coffeeId} className="bg-stone-50 rounded-xl p-3">
                  <p className="text-sm font-medium text-cafe-800 mb-2">
                    {coffee.nameJa}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {ratingOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleCoffeeRating(coffee.coffeeId, option.value)}
                        className={`
                          flex items-center gap-1 px-2 py-1 rounded-lg text-xs
                          transition-all duration-200 cursor-pointer
                          focus:outline-none focus:ring-2 focus:ring-cafe-400
                          ${
                            coffeeRatings[coffee.coffeeId] === option.value
                              ? "bg-cafe-100 border border-cafe-500"
                              : "bg-white border border-stone-200 hover:border-cafe-300"
                          }
                        `}
                        aria-label={`${coffee.nameJa}: ${option.label}`}
                        aria-pressed={coffeeRatings[coffee.coffeeId] === option.value}
                      >
                        <span aria-hidden="true">{option.emoji}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* コメント入力 */}
      <div className="mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメント（任意）"
          maxLength={200}
          rows={2}
          className="w-full rounded-xl border border-cafe-200 bg-white px-3 py-2 text-sm
            placeholder:text-stone-400
            focus:outline-none focus:ring-2 focus:ring-cafe-400 focus:border-transparent
            resize-none"
        />
      </div>

      {/* 送信ボタン */}
      <Button
        onClick={handleSubmit}
        disabled={!rating}
        className="w-full"
        size="sm"
      >
        フィードバックを送信
      </Button>
    </Card>
  );
}
