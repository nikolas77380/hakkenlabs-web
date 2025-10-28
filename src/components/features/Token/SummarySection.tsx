import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import MarkdownView from "./MarkdownView/MarkdownView";
import { getTranslations } from "next-intl/server";
import React from "react";
import { ClipboardList } from "lucide-react";

type Props = {
  summary: string;
};

const SummarySection = async ({ summary }: Props) => {
  const t = await getTranslations("token");
  return (
    <Card
      variant="transparent"
      collapsible
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <ClipboardList className="text-secondary" />
            <span>{t("summary.title")}</span>
          </div>
        </CardTitle>
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
