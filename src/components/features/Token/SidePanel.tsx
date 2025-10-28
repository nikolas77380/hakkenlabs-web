import { Card } from "@/components/common/ui/card";
import {
  cn,
  formatLastUpdated,
  formatNumber,
  getRiskScoreClasses,
} from "@/lib/utils";
import { TokenDetailsResponse } from "@/services/api/client";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";
import Overview from "./Overview";
import ShareButton from "./ShareButton";

type Props = {
  details: TokenDetailsResponse;
};

const SidePanel = async ({ details }: Props) => {
  const locale = await getLocale();
  const t = await getTranslations("token.header");

  const riskScoreClasses = getRiskScoreClasses(details.riskScore);

  return (
    <div className="xl:sticky top-0 flex max-w-5xl mx-auto items-center xl:items-start gap-4 w-full px-4 space-y-4 mb-4">
      <div className="flex xl:flex-col gap-2 flex-col justify-between w-full">
        <div className="flex items-center gap-2">
          {details.logo ? (
            <Image
              src={details.logo}
              alt={`${details.symbol} logo`}
              className="rounded"
              width={36}
              height={36}
            />
          ) : null}
          <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-3">
            {details.name}
            <span className="text-base font-normal text-muted-foreground">
              {details.symbol}
            </span>
            {details.verified ? (
              <span className="inline-block rounded bg-emerald-100 px-1 py-0.5 text-[10px] text-emerald-800">
                {t("verified")}
              </span>
            ) : null}
          </h1>
          <ShareButton
            className="ml-auto"
            size="sm"
          />
        </div>
        {details.lastUpdated && (
          <div className="text-muted-foreground text-xs">
            {t("lastUpdated")}: {formatLastUpdated(details.lastUpdated, locale)}
          </div>
        )}
        <Card
          variant="transparent"
          className="p-2"
        >
          <span className="text-3xl font-semibold text-center">
            ${details.price}
          </span>
        </Card>
        <div className="grid grid-cols-2 gap-2 text-center">
          <Card
            variant="transparent"
            className="p-2 h-fit"
          >
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("market.marketCap")}:{" "}
              </p>
              <span>
                ${formatNumber(details.marketCap, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </Card>
          <Card
            variant="transparent"
            className="p-2 h-fit"
          >
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("market.volume24h")}:{" "}
              </p>
              <span>
                ${formatNumber(details.volume24h, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </Card>
          <Card
            variant="transparent"
            className="p-2 h-fit"
          >
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("market.fdv")}:{" "}
              </p>
              <span>
                $
                {formatNumber(details.fullyDilutedValuation, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Card>
          <Card
            variant="transparent"
            className="p-2 h-fit"
          >
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("market.liquidity")}:
              </p>
              <span>
                $
                {formatNumber(details.liquidityUSD, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Card>
        </div>

        {details.riskScore !== null && details.riskScore !== undefined && (
          <Card
            variant="transparent"
            className={cn(
              "p-2 font-medium border",
              riskScoreClasses.background,
              riskScoreClasses.border,
              riskScoreClasses.text,
            )}
          >
            <div className="flex items-center gap-2 justify-between">
              <span className="font-medium text-sm text-white">
                {t("riskScore")}:
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-black/30 rounded-full h-2">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      riskScoreClasses.progressBar,
                    )}
                    style={{ width: `${details.riskScore}%` }}
                  />
                </div>
                <span className="font-medium text-sm">{details.riskScore}</span>
              </div>
            </div>
          </Card>
        )}
        <Overview details={details} />
      </div>
    </div>
  );
};

export default SidePanel;
