import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { getTranslations } from "next-intl/server";
import React from "react";
import HolderSupplyChart from "./charts/HolderSupplyChart";
import { HoldersSupply } from "@/services/api";

type Props = {
  holderSupply: HoldersSupply;
};

const SupplyConcentration = async ({ holderSupply }: Props) => {
  const t = await getTranslations("token");

  const order = Object.keys(holderSupply) as Array<keyof HoldersSupply>;

  const entries = order.map((k) => ({
    key: k,
    label: `top ${k.slice(3)}`,
    percent: holderSupply![k]!.supplyPercent,
  }));

  const maxEntry = entries.length
    ? entries.reduce((a, b) => (b.percent > a.percent ? b : a))
    : undefined;
  const minEntry = entries.length
    ? entries.reduce((a, b) => (b.percent < a.percent ? b : a))
    : undefined;

  return (
    <Card variant="transparent">
      <CardHeader>
        <CardTitle>{t("holders.supplyConcentration")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <HolderSupplyChart
            title={t("holders.supplyConcentration")}
            holderSupply={holderSupply}
          />
        </div>
        <div className="mt-3 flex justify-between mx-6 flex-wrap gap-2">
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 bg-current rounded-[2px]"
              aria-hidden="true"
            />
            {minEntry
              ? t("holders.minConcentration", {
                  group: minEntry.label,
                  percent: minEntry.percent.toFixed(2),
                })
              : ""}
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 bg-current rounded-[2px]"
              aria-hidden="true"
            />
            {maxEntry
              ? t("holders.maxConcentration", {
                  group: maxEntry.label,
                  percent: maxEntry.percent.toFixed(2),
                })
              : ""}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplyConcentration;
