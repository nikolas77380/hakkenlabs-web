"use client";

import { HoldersSupply } from "@/services/api";
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export interface HolderSupplyChartProps {
  title?: string;
  holderSupply?: HoldersSupply;
}

const LINE_COLOR = "#2563eb";

export function HolderSupplyChart({
  title = "Supply concentration",
  holderSupply,
}: HolderSupplyChartProps): React.ReactElement | null {
  const data = useMemo(() => {
    if (!holderSupply) return [] as Array<{ name: string; value: number }>;
    const order: Array<
      keyof NonNullable<HolderSupplyChartProps["holderSupply"]>
    > = ["top10", "top25", "top50", "top100", "top250", "top500"];
    return order
      .filter((k) => holderSupply[k])
      .map((k) => ({ name: String(k), value: holderSupply[k]!.supplyPercent }));
  }, [holderSupply]);

  if (!data.length) return null;

  return (
    <div
      className="w-full h-64"
      aria-label={title}
    >
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
            dataKey="name"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: unknown) => [
              `${Number(value).toFixed(2)}%`,
              "Percent",
            ]}
            labelFormatter={(label) => `Bucket: ${label}`}
          />
          <Bar
            dataKey="value"
            fill={LINE_COLOR}
            name="Supply %"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HolderSupplyChart;
