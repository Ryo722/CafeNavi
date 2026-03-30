import type { FlavorScores } from "../../types/coffee";

type TrendDataPoint = {
  date: string;
  profile: FlavorScores;
};

type TrendLine = {
  key: keyof FlavorScores;
  label: string;
  color: string;
};

type TrendChartProps = {
  data: TrendDataPoint[];
  lines: TrendLine[];
  height?: number;
  formatDate?: (iso: string) => string;
};

const DEFAULT_HEIGHT = 200;
const PADDING = { top: 20, right: 16, bottom: 40, left: 32 };

export function TrendChart({
  data,
  lines,
  height = DEFAULT_HEIGHT,
  formatDate,
}: TrendChartProps) {
  if (data.length === 0) return null;

  const width = 100; // viewBox percentage-based
  const plotWidth = width - PADDING.left - PADDING.right;
  const plotHeight = height - PADDING.top - PADDING.bottom;
  const maxValue = 10;

  const xStep = data.length > 1 ? plotWidth / (data.length - 1) : 0;

  function getX(index: number): number {
    return PADDING.left + (data.length === 1 ? plotWidth / 2 : index * xStep);
  }

  function getY(value: number): number {
    return PADDING.top + plotHeight - (value / maxValue) * plotHeight;
  }

  function buildPath(key: keyof FlavorScores): string {
    return data
      .map((point, i) => {
        const x = getX(i);
        const y = getY(point.profile[key]);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }

  function formatDateLabel(iso: string): string {
    if (formatDate) return formatDate(iso);
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  // Y-axis levels
  const yLevels = [0, 2, 4, 6, 8, 10];

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Flavor trend chart"
      >
        {/* Grid lines */}
        {yLevels.map((level) => (
          <g key={level}>
            <line
              x1={PADDING.left}
              y1={getY(level)}
              x2={width - PADDING.right}
              y2={getY(level)}
              stroke="#e7ddd0"
              strokeWidth={0.3}
            />
            <text
              x={PADDING.left - 3}
              y={getY(level)}
              textAnchor="end"
              dominantBaseline="central"
              className="text-[3px] fill-stone-400"
            >
              {level}
            </text>
          </g>
        ))}

        {/* Lines */}
        {lines.map((line) => (
          <g key={line.key}>
            <path
              d={buildPath(line.key)}
              fill="none"
              stroke={line.color}
              strokeWidth={0.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Data points */}
            {data.map((point, i) => (
              <circle
                key={i}
                cx={getX(i)}
                cy={getY(point.profile[line.key])}
                r={1.2}
                fill={line.color}
              />
            ))}
          </g>
        ))}

        {/* X-axis labels */}
        {data.map((point, i) => {
          // Show fewer labels if many data points
          const showLabel =
            data.length <= 5 || i === 0 || i === data.length - 1 || i % 2 === 0;
          if (!showLabel) return null;
          return (
            <text
              key={i}
              x={getX(i)}
              y={height - PADDING.bottom + 10}
              textAnchor="middle"
              className="text-[3px] fill-stone-400"
              transform={`rotate(-30 ${getX(i)} ${height - PADDING.bottom + 10})`}
            >
              {formatDateLabel(point.date)}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {lines.map((line) => (
          <div key={line.key} className="flex items-center gap-1 text-xs text-stone-600">
            <span
              className="inline-block w-3 h-0.5 rounded-full"
              style={{ backgroundColor: line.color }}
            />
            {line.label}
          </div>
        ))}
      </div>
    </div>
  );
}
