import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AnalyzeFeature {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
}

function getDescriptions(
  t: ReturnType<typeof useTranslations>,
): AnalyzeFeature[] {
  const cards = t.raw("analyzeDescription.cards") as Array<{
    title: string;
    description: string;
    features: string[];
  }>;
  const icons = [
    "/assets/search_icon.png",
    "/assets/shield_icon.png",
    "/assets/candle_icon.png",
  ];
  const gradients = [
    "from-blue-400 to-cyan-500",
    "from-green-400 to-emerald-500",
    "from-orange-400 to-red-500",
  ];
  return cards.map((card, idx) => ({
    title: card.title,
    description: card.description,
    icon: icons[idx] ?? "✨",
    gradient: gradients[idx] ?? "from-slate-400 to-slate-600",
    features: card.features,
  }));
}

const AnalyzeDescription = () => {
  const t = useTranslations();
  const descriptions = getDescriptions(t);
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-6 mt-16 justify-center">
      {descriptions.map((feature) => (
        <Card
          key={feature.title}
          className="relative flex-1 min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
        >
          <CardHeader>
            <div className="absolute top-[-40px] left-0">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={100}
                height={100}
              />
            </div>
            <CardTitle className="text-xl">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-[var(--color-muted)] font-medium text-left">
              {feature.description}
            </p>
            <ul className="space-y-2">
              {feature.features.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-[var(--color-muted)] flex items-start gap-2 text-left"
                >
                  <span>⎻</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalyzeDescription;
