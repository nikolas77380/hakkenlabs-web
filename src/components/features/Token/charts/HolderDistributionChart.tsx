"use client";

import React, { useMemo, useState } from "react";

export interface HolderDistributionChartProps {
  title?: string;
  holderDistribution?: {
    shrimps?: number;
    fish?: number;
    crabs?: number;
    octopus?: number;
    dolphins?: number;
    sharks?: number;
    whales?: number;
  } | null;
  size?: number;
  strokeWidth?: number;
}

const ORDER: Array<
  keyof NonNullable<HolderDistributionChartProps["holderDistribution"]>
> = ["shrimps", "fish", "crabs", "octopus", "dolphins", "sharks", "whales"];

const COLOR_BY_GROUP: Record<string, string> = {
  shrimps: "#2563eb",
  fish: "#16a34a",
  crabs: "#f59e0b",
  octopus: "#ef4444",
  dolphins: "#8b5cf6",
  sharks: "#06b6d4",
  whales: "#f97316",
};

export function HolderDistributionChart({
  title = "Holder distribution",
  holderDistribution,
  size = 292,
  strokeWidth = 26,
}: HolderDistributionChartProps): React.ReactElement | null {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = useMemo(() => {
    if (!holderDistribution)
      return [] as Array<{ name: string; value: number; color: string }>;
    return ORDER.filter((k) => holderDistribution[k] !== undefined)
      .map((k) => ({
        name: String(k),
        value: Number(holderDistribution[k]),
        color: COLOR_BY_GROUP[String(k)],
      }))
      .filter((d) => Number.isFinite(d.value) && d.value > 0);
  }, [holderDistribution]);

  if (!data.length) return null;

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const total = data.reduce((sum, s) => sum + s.value, 0);
  const gapDegrees = 18; // fixed visual gap between segments
  const availableDegrees = 360 - gapDegrees * data.length;

  function calculateSegmentAngles(index: number) {
    let startAngle = 0;
    for (let i = 0; i < index; i++) {
      const segmentDegrees = (data[i].value / total) * availableDegrees;
      startAngle += segmentDegrees + gapDegrees;
    }
    const segmentDegrees = (data[index].value / total) * availableDegrees;
    return { startAngle, endAngle: startAngle + segmentDegrees };
  }

  function createArcPath(startAngle: number, endAngle: number) {
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  }

  const hovered = hoveredIndex != null ? data[hoveredIndex] : null;
  const hoveredPercent = hovered
    ? ((hovered.value / total) * 100).toFixed(2)
    : null;

  return (
    <div
      className="w-full flex items-center justify-center"
      aria-label={title}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform"
      >
        {data.map((segment, index) => {
          const { startAngle, endAngle } = calculateSegmentAngles(index);
          return (
            <g key={segment.name}>
              {hoveredIndex === index && (
                <path
                  d={createArcPath(startAngle, endAngle)}
                  stroke="white"
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              )}
              <path
                d={createArcPath(startAngle, endAngle)}
                stroke={segment.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          );
        })}

        {hovered && (
          <>
            <circle
              cx={center}
              cy={center}
              r={radius * 0.78}
              fill="#6775C41A"
              stroke="#FFFFFF95"
              strokeWidth="1"
              className="transition-all duration-300"
            />
            <text
              x={center}
              y={center - 30}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-white font-medium"
            >
              {hovered.name}
            </text>
            <text
              x={center}
              y={center}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-white font-medium"
            >
              {hovered.value}
            </text>
            <rect
              x={center - 28}
              y={center + 16}
              width={56}
              height={22}
              rx={12}
              fill="#000"
              className="transition-all duration-300"
            />
            <text
              x={center}
              y={center + 27}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-[#fff] text-xs font-medium"
            >
              {hoveredPercent}%
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

export default HolderDistributionChart;
