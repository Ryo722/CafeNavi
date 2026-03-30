import type { FlavorScores } from "../../types/coffee";
import { useTranslation } from "../../lib/i18n";

type FlavorRadarChartProps = {
  userProfile: FlavorScores;
  coffeeProfile?: FlavorScores;
  size?: number;
};

const axisKeys: { key: keyof FlavorScores; labelKey: string }[] = [
  { key: "bitterness", labelKey: "flavor.bitterness" },
  { key: "acidity", labelKey: "flavor.acidity" },
  { key: "sweetness", labelKey: "flavor.sweetness" },
  { key: "body", labelKey: "flavor.body" },
  { key: "fruitiness", labelKey: "flavor.fruitiness" },
  { key: "nuttiness", labelKey: "flavor.nuttiness" },
  { key: "chocolaty", labelKey: "flavor.chocolaty" },
  { key: "roastiness", labelKey: "flavor.roastiness" },
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
  axes: typeof axisKeys,
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
  const { t } = useTranslation();
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 40;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[320px] mx-auto"
      role="img"
      aria-label={t("result.radarChartAria")}
    >
      {/* Grid circles */}
      {levels.map((level) => (
        <polygon
          key={level}
          points={axisKeys
            .map((_, i) => {
              const [x, y] = polarToCartesian(
                cx,
                cy,
                maxRadius * level,
                i,
                axisKeys.length,
              );
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#e7ddd0"
          strokeWidth={1}
        />
      ))}

      {/* Axis lines */}
      {axisKeys.map((_, i) => {
        const [x, y] = polarToCartesian(cx, cy, maxRadius, i, axisKeys.length);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="#d4c9bb"
            strokeWidth={1}
          />
        );
      })}

      {/* Coffee profile polygon (if provided) */}
      {coffeeProfile && (
        <polygon
          points={getPolygonPoints(coffeeProfile, axisKeys, cx, cy, maxRadius)}
          fill="rgba(180, 120, 60, 0.15)"
          stroke="#b4783c"
          strokeWidth={1.5}
          strokeDasharray="4 2"
        />
      )}

      {/* User profile polygon */}
      <polygon
        points={getPolygonPoints(userProfile, axisKeys, cx, cy, maxRadius)}
        fill="rgba(212, 137, 42, 0.25)"
        stroke="#b8691e"
        strokeWidth={2}
      />

      {/* Data points */}
      {axisKeys.map((axis, i) => {
        const value = userProfile[axis.key] / MAX_VALUE;
        const [x, y] = polarToCartesian(
          cx,
          cy,
          value * maxRadius,
          i,
          axisKeys.length,
        );
        return (
          <circle key={axis.key} cx={x} cy={y} r={3} fill="#96501b" />
        );
      })}

      {/* Labels */}
      {axisKeys.map((axis, i) => {
        const [x, y] = polarToCartesian(
          cx,
          cy,
          maxRadius + 22,
          i,
          axisKeys.length,
        );
        return (
          <text
            key={axis.key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-[10px] fill-stone-600 font-medium"
          >
            {t(axis.labelKey)}
          </text>
        );
      })}
    </svg>
  );
}
