import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { Holders } from "@/services/api";
import { getTranslations } from "next-intl/server";
import React from "react";
import HoldersChangeChart from "./charts/HoldersChangeChart";

type Props = {
  holders: Holders;
};

const HoldersChange = async ({ holders }: Props) => {
  const t = await getTranslations("token");

  return (
    <Card variant="transparent">
      <CardHeader>
        <CardTitle>{t("holders.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <HoldersChangeChart
            holderChange={holders?.holderChange}
            totalHolders={holders?.totalHolders}
          />
        </div>
        <div className="mt-3 flex justify-between mx-6 flex-wrap gap-2">
          <span>
            {t("holders.totalHolders")}: {holders?.totalHolders ?? "—"}
          </span>
          <span>
            {t("holders.change7d")}: {holders?.change7d ?? "—"}
          </span>
          <span>
            {t("holders.change30d")}: {holders?.change30d ?? "—"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HoldersChange;
