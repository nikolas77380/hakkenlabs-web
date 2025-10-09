import { cn, formatLastUpdated, getRiskScoreColor } from "@/lib/utils";
import { TokenDetailsResponse } from "@/services/api/client";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

type Props = {
  details: TokenDetailsResponse;
};

const TokenHeader = async ({ details }: Props) => {
  const locale = await getLocale();
  const t = await getTranslations("token.header");

  return (
    <header className="flex items-center gap-4">
      {details.logo ? (
        <Image
          src={details.logo}
          alt={`${details.symbol} logo`}
          className="rounded"
          width={48}
          height={48}
        />
      ) : null}
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-3">
            {details.name}
            <span className="text-base font-normal text-muted-foreground">
              {details.symbol}
            </span>
            {details.verified ? (
              <span className="inline-block rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800">
                {t("verified")}
              </span>
            ) : null}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground break-all">
            {t("chain")} {details.chainId} ·{" "}
            {details.addressLabel ?? details.tokenAddress}
          </p>
        </div>
        <div className="flex flex-col items-end justify-center gap-2 text-sm">
          {details.riskScore !== null && details.riskScore !== undefined && (
            <div
              className={cn(
                "flex items-center gap-2 px-2 py-1 rounded-md text-white font-medium",
                getRiskScoreColor(details.riskScore),
              )}
            >
              <span className="font-medium">{t("riskScore")}:</span>
              <span>{details.riskScore}</span>
            </div>
          )}
          {details.lastUpdated && (
            <div className="text-muted-foreground">
              {t("lastUpdated")}:{" "}
              {formatLastUpdated(details.lastUpdated, locale)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TokenHeader;
