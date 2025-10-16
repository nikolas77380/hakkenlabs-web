import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { TokenDetailsResponse } from "@/services/api";
import {
  LucideShieldAlert,
  XCircle,
  CheckCircle2,
  MinusCircle,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {
  details: TokenDetailsResponse;
};

function renderBoolean(value: boolean | null | undefined) {
  if (value === null || value === undefined)
    return <MinusCircle className="h-4 w-4 text-muted-foreground" />;
  return value ? (
    <CheckCircle2 className="h-4 w-4 text-green-500" />
  ) : (
    <XCircle className="h-4 w-4 text-red-500" />
  );
}

function renderEitherBoolean(
  a: boolean | null | undefined,
  b: boolean | null | undefined,
) {
  if (a === true || b === true)
    return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  if (a === false && b === false)
    return <XCircle className="h-4 w-4 text-red-500" />;
  return <MinusCircle className="h-4 w-4 text-muted-foreground" />;
}

const CodeRisksSection = async ({ details }: Props) => {
  const t = await getTranslations("token");

  if (!details.codeRisks) {
    return null;
  }

  return (
    <Card
      variant="transparent"
      collapsible
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <LucideShieldAlert className="text-secondary" />
            <span>{t("codeRisks.title")}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-2 text-sm md:grid-cols-3 md:[&>li]:pl-3 md:[&>li]:ml-3 md:[&>li:not(:nth-child(3n+1))]:border-l md:[&>li:nth-child(3n+1)]:pl-0 md:[&>li:nth-child(3n+1)]:ml-0">
          <li className="flex items-center justify-between">
            {t("codeRisks.ownerOnlyFunctions")}:{" "}
            {renderBoolean(details.codeRisks.ownerOnlyFunctions)}
          </li>
          <li className="flex items-center justify-between">
            {t("overview.isEOA")}: {renderBoolean(details.isEOA)}
          </li>
          <li className="flex items-center justify-between">
            {t("codeRisks.mintFunction")}:{" "}
            {renderEitherBoolean(
              details.codeRisks.mintFunction,
              details.canMint,
            )}
          </li>
          <li className="flex items-center justify-between">
            {t("codeRisks.proxyPattern")}:{" "}
            {renderBoolean(details.codeRisks.proxyPattern)}
          </li>
          <li className="flex items-center justify-between">
            {t("codeRisks.pauseFunction")}:{" "}
            {renderEitherBoolean(
              details.codeRisks.pauseFunction,
              details.canPause,
            )}
          </li>
          <li className="flex items-center justify-between">
            {t("codeRisks.unsafeExternalCalls")}:{" "}
            {renderBoolean(details.codeRisks.unsafeExternalCalls)}
          </li>
          <li className="flex items-center justify-between">
            {t("codeRisks.blacklistFunctions")}:{" "}
            {renderEitherBoolean(
              details.codeRisks.blacklistFunctionsDetected,
              details.canBlacklist,
            )}
          </li>
          <li className="flex items-center justify-between">
            {t("codeRisks.hasMultisig")}: {renderBoolean(details.hasMultisig)}
          </li>
          <li className="flex items-center justify-between">
            {t("codeRisks.hasTimelock")}: {renderBoolean(details.hasTimelock)}
          </li>
          <li className="flex items-center justify-between">
            {t("codeRisks.possibleSpam")}: {renderBoolean(details.possibleSpam)}
          </li>
          <li className="flex items-center justify-between">
            {t("codeRisks.renounced")}: {details.renounced ?? "-"}
          </li>
        </ul>

        {details.codeRisks.comments?.length ? (
          <div className="mt-3">
            <h3 className="text-lg font-medium">{t("codeRisks.comments")}:</h3>
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
