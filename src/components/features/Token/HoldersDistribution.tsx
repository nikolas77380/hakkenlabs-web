import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { HolderDistribution } from "@/services/api";
import { getTranslations } from "next-intl/server";
import React from "react";
import HolderDistributionChart from "./charts/HolderDistributionChart";

type Props = {
  holdersDistribution: HolderDistribution;
};

const HoldersDistribution = async ({ holdersDistribution }: Props) => {
  const t = await getTranslations("token");

  const entries = Object.entries(holdersDistribution);

  const maxEntry = entries.length
    ? entries.reduce((acc, cur) =>
        Number(cur[1]) > Number(acc[1]) ? cur : acc,
      )
    : null;

  const minEntry = entries.length
    ? entries.reduce((acc, cur) =>
        Number(cur[1]) < Number(acc[1]) ? cur : acc,
      )
    : null;

  return (
    <Card variant="transparent">
      <CardHeader>
        <CardTitle>{t("holders.distribution")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <HolderDistributionChart holderDistribution={holdersDistribution} />
        </div>
        {entries.length > 0 && maxEntry && minEntry && (
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded border p-2">
              <span className="font-medium">Max group</span>:{" "}
              <span className="capitalize">{maxEntry[0]}</span> ({maxEntry[1]})
            </div>
            <div className="rounded border p-2">
              <span className="font-medium">Min group</span>:{" "}
              <span className="capitalize">{minEntry[0]}</span> ({minEntry[1]})
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HoldersDistribution;
