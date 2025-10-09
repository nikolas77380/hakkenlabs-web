"use client";

import React, { ReactElement } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface HolderChangePoint {
  window: string;
  change: number;
  changePercent: number;
}

export interface HoldersChangeChartProps {
  title?: string;
  holderChange?:
    | {
        [window in "5min" | "1h" | "6h" | "24h" | "3d" | "7d" | "30d"]?: {
          change: number;
          changePercent: number;
        };
      }
    | null;
  totalHolders?: number;
}

function formatPercent(value: number | undefined): string {
  if (value === undefined || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(2)}%`;
}

export function HoldersChangeChart({
  holderChange,
  totalHolders,
}: HoldersChangeChartProps): ReactElement | null {
  if (!holderChange || typeof totalHolders !== "number") return null;

  const order: Array<
    keyof NonNullable<HoldersChangeChartProps["holderChange"]>
  > = ["5min", "1h", "6h", "24h", "3d", "7d", "30d"];

  const data: Array<HolderChangePoint & { holders: number }> = order
    .filter((k) => holderChange[k])
    .map((k) => {
      const v = holderChange[k]!;
      const holders = Math.max(0, totalHolders + v.change);
      return {
        window: String(k),
        change: v.change,
        changePercent: v.changePercent,
        holders,
      };
    });

  if (data.length === 0) return null;

  const minHolders = Math.min(...data.map((d) => d.holders));
  const maxHolders = Math.max(...data.map((d) => d.holders));
  const range = Math.max(1, maxHolders - minHolders);
  const pad = Math.max(1, Math.round(range * 0.05));
  const domainMin = Math.max(0, minHolders - pad);
  const domainMax = maxHolders + pad;

  return (
    <div className="w-full h-64">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={data}
          margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="window"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            domain={[domainMin, domainMax]}
            allowDecimals
          />
          <Tooltip
            formatter={(value: unknown, name: string) => {
              if (name === "holders") return [value as number, "Holders"];
              if (name === "changePercent")
                return [formatPercent(value as number), "Change %"];
              return [value as number, "Δ Holders"];
            }}
            labelFormatter={(label) => `Window: ${label}`}
          />
          <Bar
            dataKey="holders"
            fill="#2563eb"
            name="Holders"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HoldersChangeChart;
