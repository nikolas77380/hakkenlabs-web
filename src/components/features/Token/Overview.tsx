import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { TokenDetailsResponse } from "@/services/api";
import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {
  details: TokenDetailsResponse;
};

const Overview = async ({ details }: Props) => {
  const t = await getTranslations("token");

  const fieldKeys = [
    "dex",
    { key: "pair", breakAll: true },
    "decimals",
    "owner",
    { key: "proxy", isBoolean: true },
    { key: "renounced", isBoolean: true },
    { key: "canMint", isBoolean: true },
    { key: "canPause", isBoolean: true },
    { key: "canBlacklist", isBoolean: true },
    { key: "hasMultisig", isBoolean: true },
    { key: "hasTimelock", isBoolean: true },
    "timelockDelay",
    "totalSupply",
  ];

  const renderField = (
    fieldKey: string | { key: string; breakAll?: boolean; isBoolean?: boolean },
  ) => {
    const key = typeof fieldKey === "string" ? fieldKey : fieldKey.key;
    const isBoolean = typeof fieldKey === "object" ? fieldKey.isBoolean : false;
    const breakAll = typeof fieldKey === "object" ? fieldKey.breakAll : false;

    const value = details[key as keyof typeof details];
    const displayValue = isBoolean
      ? value
        ? t("overview.yes")
        : t("overview.no")
      : typeof value === "string" || typeof value === "number"
      ? String(value)
      : "—";

    return (
      <div
        key={key}
        className={breakAll ? "break-all" : ""}
      >
        <span className="font-medium">{t(`overview.${key}`)}:</span>{" "}
        <span>{displayValue}</span>
      </div>
    );
  };

  return (
    <Card variant="transparent">
      <CardHeader>
        <CardTitle>{t("overview.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            {fieldKeys.slice(0, 7).map(renderField)}
          </div>

          <div className="space-y-2">{fieldKeys.slice(7).map(renderField)}</div>
        </div>

        {details.categories?.length ? (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {details.categories.map((c) => (
                <span
                  key={c}
                  className="inline-block rounded border px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default Overview;
