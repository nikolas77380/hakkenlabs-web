"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRightFromSquare } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

export default function FullWebPlatform() {
  const t = useTranslations("platform");
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[1px] rounded-3xl p-8 md:p-12 text-center">
        <div className="mb-6">
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
            {t("badge")}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          {t("title")}
        </h2>

        <p className="text-lg text-[var(--color-muted)] mb-6 max-w-2xl mx-auto">
          {t("desc1")}
        </p>

        <p className="text-base text-[var(--color-muted)] mb-8 max-w-2xl mx-auto">
          {t("desc2")}
        </p>

        <div className="mb-4">
          <p className="text-base text-[var(--color-muted)] mb-6">
            {t("ctaInfo")}
          </p>

          <Button
            variant="outline"
            onClick={() => {
              window.open("https://t.me/hakkenlabs_bot", "_blank");
            }}
          >
            {t("cta")} <ArrowUpRightFromSquare />
          </Button>
        </div>
      </div>
    </div>
  );
}
