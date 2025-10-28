"use client";

import CopyButton from "@/components/common/CopyButton/CopyButton";
import { Card } from "@/components/common/ui/card";
import { formatAddress } from "@/lib/utils";
import { TokenDetailsResponse } from "@/services/api";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const fieldKeys = [
  "totalSupply",
  "dex",
  "decimals",
  "timelockDelay",
  "deployDate",
];

type Props = {
  details: TokenDetailsResponse;
};

const Overview = ({ details }: Props) => {
  const t = useTranslations("token");

  const url = details.socialLinks?.website ?? "";
  return (
    <Card
      variant="transparent"
      className="px-3 pt-2"
    >
      <div className="grid xl:grid-cols-1 grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 justify-between">
          <span className="font-medium">{t(`socials.website`)}: </span>
          <Link
            key={url}
            href={url}
            className="text-card-foreground hover:underline break-all"
            target="_blank"
            rel="noreferrer"
          >
            {url}
          </Link>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <span className="font-medium">{t(`overview.contract`)}: </span>
          <CopyButton value={formatAddress(details.tokenAddress)} />
        </div>
        <div className="flex items-center gap-2 justify-between">
          <span className="font-medium">{t(`overview.pair`)}: </span>
          {details.pair ? (
            <CopyButton value={formatAddress(details.pair ?? "")} />
          ) : (
            <span>—</span>
          )}
        </div>
        <div className="flex items-center gap-2 justify-between">
          <span className="font-medium">{t(`overview.owner`)}: </span>
          {details.owner ? (
            <CopyButton value={formatAddress(details.owner ?? "")} />
          ) : (
            <span>—</span>
          )}
        </div>
        {fieldKeys.map((fieldKey) => {
          const value = details[fieldKey as keyof TokenDetailsResponse];
          const displayValue =
            typeof value === "string" || typeof value === "number"
              ? String(value)
              : "—";
          return (
            <div
              key={fieldKey as string}
              className="flex items-center gap-2 justify-between"
            >
              <span className="font-medium">{t(`overview.${fieldKey}`)}:</span>{" "}
              <span>{displayValue}</span>
            </div>
          );
        })}
        <div className="flex mt-2 items-center gap-2 justify-between">
          <span className="font-medium">{t(`overview.categories`)}:</span>
          <div className="flex flex-wrap gap-2">
            {details.categories?.map((category) => (
              <span
                className="inline-block rounded-md border border-white/50 px-2 py-0.5 text-xs"
                key={category}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="flex mt-2 items-center gap-2 justify-between">
          <span className="font-medium">{t(`socials.title`)}:</span>
          <div className="flex gap-2">
            {details.socialLinks &&
              Object.entries(details.socialLinks)
                .filter(
                  ([platform, url]) =>
                    url && url.trim() !== "" && platform !== "website",
                )
                .map(([platform, url]) => (
                  <Link
                    key={platform}
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-card-foreground"
                    title={`${platform} link`}
                  >
                    <Image
                      src={`/socials/${platform}.svg`}
                      alt={platform}
                      width={20}
                      height={20}
                      className="w-5 h-5 invert hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Overview;
