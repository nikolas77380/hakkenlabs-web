import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import MarkdownView from "./MarkdownView/MarkdownView";
import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {
  summary: string;
};

const SummarySection = async ({ summary }: Props) => {
  const t = await getTranslations("token");
  console.log(summary);
  return (
    <Card variant="transparent">
      <CardHeader>
        <CardTitle>{t("summary.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <MarkdownView content={summary} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SummarySection;
