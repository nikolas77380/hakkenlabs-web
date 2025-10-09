import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { TokenDetailsResponse } from "@/services/api";
import { formatNumber } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {
  details: TokenDetailsResponse;
};

const MarketSection = async ({ details }: Props) => {
  const t = await getTranslations("token");

  return (
    <Card variant="transparent">
      <CardHeader>
        <CardTitle>{t("market.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="flex justify-between border-b border-r rounded-br-lg p-2">
            <span>{t("market.price")}: </span>
            <span>
              {details.price === 0 || details.price
                ? `$${formatNumber(details.price, {
                    maximumSignificantDigits: 7,
                  })}`
                : "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-r rounded-br-lg p-2">
            <span>{t("market.marketCap")}: </span>
            <span>
              ${formatNumber(details.marketCap, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex justify-between border-b border-r rounded-br-lg p-2">
            <span>{t("market.fdv")}: </span>
            <span>
              $
              {formatNumber(details.fullyDilutedValuation, {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
          <div className="flex justify-between border-b border-r rounded-br-lg p-2">
            <span>{t("market.volume24h")}: </span>
            <span>
              ${formatNumber(details.volume24h, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex justify-between border-b border-r rounded-br-lg p-2">
            <span>{t("market.liquidity")}:</span>
            <span>
              $
              {formatNumber(details.liquidityUSD, {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSection;
