import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useTranslations } from "next-intl";

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
  const icons = ["🔍", "🛡️", "📈"];
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
    <div className="grid md:grid-cols-3 gap-6 mt-16">
      {descriptions.map((feature) => (
        <Card
          key={feature.title}
          className="relative overflow-hidden"
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-center gap-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white text-2xl`}
              >
                {feature.icon}
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-[var(--color-muted)] font-medium">
              {feature.description}
            </p>
            <ul className="space-y-2">
              {feature.features.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-[var(--color-muted)] flex items-start gap-2"
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
