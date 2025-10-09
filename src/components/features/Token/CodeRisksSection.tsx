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

const CodeRisksSection = async ({ details }: Props) => {
  const t = await getTranslations("token");

  if (!details.codeRisks) {
    return null;
  }

  return (
    <Card variant="transparent">
      <CardHeader>
        <CardTitle>{t("codeRisks.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
          <li>
            {t("codeRisks.ownerOnlyFunctions")}:{" "}
            {details.codeRisks.ownerOnlyFunctions
              ? t("overview.yes")
              : t("overview.no")}
          </li>
          <li>
            {t("codeRisks.mintFunction")}:{" "}
            {details.codeRisks.mintFunction
              ? t("overview.yes")
              : t("overview.no")}
          </li>
          <li>
            {t("codeRisks.proxyPattern")}:{" "}
            {details.codeRisks.proxyPattern
              ? t("overview.yes")
              : t("overview.no")}
          </li>
          <li>
            {t("codeRisks.pauseFunction")}:{" "}
            {details.codeRisks.pauseFunction
              ? t("overview.yes")
              : t("overview.no")}
          </li>
          <li>
            {t("codeRisks.unsafeExternalCalls")}:{" "}
            {details.codeRisks.unsafeExternalCalls
              ? t("overview.yes")
              : t("overview.no")}
          </li>
          <li>
            {t("codeRisks.blacklistFunctions")}:{" "}
            {details.codeRisks.blacklistFunctionsDetected
              ? t("overview.yes")
              : t("overview.no")}
          </li>
        </ul>

        {details.codeRisks.comments?.length ? (
          <div className="mt-3">
            <h3 className="text-sm font-medium">{t("codeRisks.comments")}</h3>
            <ul className="mt-1 list-disc pl-5 text-sm">
              {details.codeRisks.comments.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default CodeRisksSection;
