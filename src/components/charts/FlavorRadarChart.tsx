import type { FlavorScores } from "../../types/coffee";

type FlavorRadarChartProps = {
  userProfile: FlavorScores;
  coffeeProfile?: FlavorScores;
  size?: number;
};

const axes: { key: keyof FlavorScores; label: string }[] = [
  { key: "bitterness", label: "苦味" },
  { key: "acidity", label: "酸味" },
  { key: "sweetness", label: "甘み" },
  { key: "body", label: "コク" },
  { key: "fruitiness", label: "フルーティ" },
  { key: "nuttiness", label: "ナッツ感" },
  { key: "chocolaty", label: "チョコ感" },
  { key: "roastiness", label: "焙煎感" },
];

const MAX_VALUE = 10;

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleIndex: number,
  totalAngles: number,
): [number, number] {
  const angle = (Math.PI * 2 * angleIndex) / totalAngles - Math.PI / 2;
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}

function getPolygonPoints(
  scores: FlavorScores,
  cx: number,
  cy: number,
  maxRadius: number,
): string {
  return axes
    .map((axis, i) => {
      const value = scores[axis.key] / MAX_VALUE;
      const radius = value * maxRadius;
      const [x, y] = polarToCartesian(cx, cy, radius, i, axes.length);
      return `${x},${y}`;
    })
    .join(" ");
}

export function FlavorRadarChart({
  userProfile,
  coffeeProfile,
  size = 280,
}: FlavorRadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 40;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const isDark = document.documentElement.classList.contains("dark");
  const gridColor = isDark ? "#5a3f35" : "#e7ddd0";
  const axisColor = isDark ? "#6b4f43" : "#d4c9bb";
  const labelClass = isDark
    ? "text-[10px] fill-[#c4a882] font-medium"
    : "text-[10px] fill-stone-600 font-medium";

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[320px] mx-auto"
      role="img"
      aria-label="味覚プロファイルのレーダーチャート"
    >
      {/* Grid circles */}
      {levels.map((level) => (
        <polygon
          key={level}
          points={axes
            .map((_, i) => {
              const [x, y] = polarToCartesian(
                cx,
                cy,
                maxRadius * level,
                i,
                axes.length,
              );
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke={gridColor}
          strokeWidth={1}
        />
      ))}

      {/* Axis lines */}
      {axes.map((_, i) => {
        const [x, y] = polarToCartesian(cx, cy, maxRadius, i, axes.length);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke={axisColor}
            strokeWidth={1}
          />
        );
      })}

      {/* Coffee profile polygon (if provided) */}
      {coffeeProfile && (
        <polygon
          points={getPolygonPoints(coffeeProfile, cx, cy, maxRadius)}
          fill="rgba(180, 120, 60, 0.15)"
          stroke="#b4783c"
          strokeWidth={1.5}
          strokeDasharray="4 2"
        />
      )}

      {/* User profile polygon */}
      <polygon
        points={getPolygonPoints(userProfile, cx, cy, maxRadius)}
        fill="rgba(212, 137, 42, 0.25)"
        stroke="#b8691e"
        strokeWidth={2}
      />

      {/* Data points */}
      {axes.map((axis, i) => {
        const value = userProfile[axis.key] / MAX_VALUE;
        const [x, y] = polarToCartesian(
          cx,
          cy,
          value * maxRadius,
          i,
          axes.length,
        );
        return (
          <circle key={axis.key} cx={x} cy={y} r={3} fill="#96501b" />
        );
      })}

      {/* Labels */}
      {axes.map((axis, i) => {
        const [x, y] = polarToCartesian(
          cx,
          cy,
          maxRadius + 22,
          i,
          axes.length,
        );
        return (
          <text
            key={axis.key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className={labelClass}
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}
