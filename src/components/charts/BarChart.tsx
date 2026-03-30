import { memo } from "react";

type BarChartItem = {
  label: string;
  value: number;
  maxValue: number;
};

type BarChartProps = {
  items: BarChartItem[];
  colorClass?: string;
};

export const BarChart = memo(function BarChart({ items, colorClass = "bg-cafe-600" }: BarChartProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const percentage =
          item.maxValue > 0
            ? Math.round((item.value / item.maxValue) * 100)
            : 0;
        return (
          <div key={item.label}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-cafe-800 font-medium truncate mr-2">
                {item.label}
              </span>
              <span className="text-stone-500 shrink-0">
                {item.value}
              </span>
            </div>
            <div className="w-full h-3 bg-cafe-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={item.value}
                aria-valuemin={0}
                aria-valuemax={item.maxValue}
                aria-label={`${item.label}: ${item.value}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});
