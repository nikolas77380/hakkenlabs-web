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
import { PieChart } from "lucide-react";

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
    <Card
      variant="transparent"
      collapsible
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <PieChart className="text-secondary" />
            <span>{t("holders.distribution")}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <HolderDistributionChart holderDistribution={holdersDistribution} />
        </div>
        {entries.length > 0 && maxEntry && minEntry && (
          <div className="mt-3 flex justify-between mx-6 flex-wrap gap-2">
            <div>
              <span className="font-medium inline-flex items-center gap-2">
                <span
                  className="inline-block w-1.5 h-1.5 bg-current rounded-[2px]"
                  aria-hidden="true"
                />
                Max group : <span className="capitalize">{maxEntry[0]}</span>
                {maxEntry[1]}
              </span>
            </div>
            <div>
              <span className="font-medium inline-flex items-center gap-2">
                <span
                  className="inline-block w-1.5 h-1.5 bg-current rounded-[2px]"
                  aria-hidden="true"
                />
                Min group : <span className="capitalize">{minEntry[0]}</span>
                {minEntry[1]}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HoldersDistribution;
