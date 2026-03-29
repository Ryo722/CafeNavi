import type { CoffeeProfile } from "../../types/coffee";
import { Card } from "../ui/Card";

type CoffeeCardProps = {
  coffee: CoffeeProfile;
  score: number;
  reasons: string[];
  rank: number;
};

export function CoffeeCard({ coffee, score, reasons, rank }: CoffeeCardProps) {
  const isFirst = rank === 1;

  return (
    <Card
      padding={isFirst ? "lg" : "md"}
      className={isFirst ? "border-cafe-400 border-2 shadow-md" : ""}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`
              inline-flex items-center justify-center rounded-full font-bold text-white
              ${isFirst ? "w-8 h-8 text-base bg-cafe-600" : "w-6 h-6 text-xs bg-cafe-400"}
            `}
          >
            {rank}
          </span>
          <div>
            <h3
              className={`font-bold text-cafe-900 ${isFirst ? "text-xl" : "text-base"}`}
            >
              {coffee.nameJa}
            </h3>
            <p className="text-xs text-stone-500">{coffee.origins.join(", ")}</p>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`font-bold text-cafe-600 ${isFirst ? "text-2xl" : "text-lg"}`}
          >
            {score}%
          </span>
          <p className="text-xs text-stone-400">マッチ度</p>
        </div>
      </div>

      <p className="text-sm text-stone-600 mb-3 leading-relaxed">
        {coffee.description}
      </p>

      {/* Reasons */}
      <div className="space-y-1">
        {reasons.map((reason, i) => (
          <p key={i} className="text-sm text-cafe-700 flex items-start gap-1.5">
            <span className="text-cafe-400 mt-0.5 shrink-0">●</span>
            {reason}
          </p>
        ))}
      </div>

      {/* Notes */}
      {coffee.notes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {coffee.notes.map((note) => (
            <span
              key={note}
              className="text-xs bg-cafe-50 text-cafe-700 px-2 py-0.5 rounded-full border border-cafe-200"
            >
              {note}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}
