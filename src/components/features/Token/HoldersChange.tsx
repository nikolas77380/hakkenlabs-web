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
import { LucideUsers2 } from "lucide-react";

type Props = {
  holders: Holders;
};

const HoldersChange = async ({ holders }: Props) => {
  const t = await getTranslations("token");

  return (
    <Card
      variant="transparent"
      collapsible
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <LucideUsers2 className="text-secondary" />
            <span>{t("holders.title")}</span>
          </div>
        </CardTitle>
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
