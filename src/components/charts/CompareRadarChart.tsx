import { memo } from "react";
import type { FlavorScores } from "../../types/coffee";
import { useTranslation } from "../../lib/i18n";

type CompareRadarChartProps = {
  profile1: FlavorScores;
  profile2: FlavorScores;
  label1: string;
  label2: string;
  size?: number;
};

const axisKeys: { key: keyof FlavorScores; labelKey: string }[] = [
  { key: "bitterness", labelKey: "flavor.bitterness" },
  { key: "acidity", labelKey: "flavor.acidity" },
  { key: "sweetness", labelKey: "flavor.sweetness" },
  { key: "body", labelKey: "flavor.body" },
  { key: "fruitiness", labelKey: "flavor.fruitiness" },
  { key: "floral", labelKey: "flavor.floral" },
  { key: "nuttiness", labelKey: "flavor.nuttiness" },
  { key: "chocolaty", labelKey: "flavor.chocolaty" },
  { key: "roastiness", labelKey: "flavor.roastiness" },
  { key: "cleanness", labelKey: "flavor.cleanness" },
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

export const CompareRadarChart = memo(function CompareRadarChart({
  profile1,
  profile2,
  label1,
  label2,
  size = 300,
}: CompareRadarChartProps) {
  const { t } = useTranslation();
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 40;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[360px] mx-auto"
        role="img"
        aria-label={t("compare.flavorProfile")}
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

        {/* Profile 1 polygon (blue) */}
        <polygon
          points={getPolygonPoints(profile1, axisKeys, cx, cy, maxRadius)}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3b82f6"
          strokeWidth={2}
        />

        {/* Profile 2 polygon (green) */}
        <polygon
          points={getPolygonPoints(profile2, axisKeys, cx, cy, maxRadius)}
          fill="rgba(34, 197, 94, 0.2)"
          stroke="#22c55e"
          strokeWidth={2}
          strokeDasharray="6 3"
        />

        {/* Profile 1 data points */}
        {axisKeys.map((axis, i) => {
          const value = profile1[axis.key] / MAX_VALUE;
          const [x, y] = polarToCartesian(
            cx,
            cy,
            value * maxRadius,
            i,
            axisKeys.length,
          );
          return <circle key={`p1-${axis.key}`} cx={x} cy={y} r={3} fill="#2563eb" />;
        })}

        {/* Profile 2 data points */}
        {axisKeys.map((axis, i) => {
          const value = profile2[axis.key] / MAX_VALUE;
          const [x, y] = polarToCartesian(
            cx,
            cy,
            value * maxRadius,
            i,
            axisKeys.length,
          );
          return <circle key={`p2-${axis.key}`} cx={x} cy={y} r={3} fill="#16a34a" />;
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

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-0.5 bg-blue-500 rounded" />
          <span className="text-xs text-stone-600">{label1}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-0.5 bg-green-500 rounded border-dashed" style={{ borderTop: "2px dashed #22c55e", height: 0 }} />
          <span className="text-xs text-stone-600">{label2}</span>
        </div>
      </div>
    </div>
  );
});
