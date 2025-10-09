import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import React from "react";

interface WhatYouGetFeature {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

const whatYouGetFeatures: WhatYouGetFeature[] = [
  {
    title: "Risk Score Analysis",
    description:
      "Get a clear 1-10 risk score for any token based on multiple security factors",
    icon: "⚠️",
    gradient: "from-red-400 to-red-600",
  },
  {
    title: "Human-Readable Insights",
    description:
      "No technical jargon - get easy-to-understand explanations of token metrics",
    icon: "💬",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    title: "Real-Time Data",
    description:
      "Access up-to-date token information and market sentiment analysis",
    icon: "📊",
    gradient: "from-green-400 to-green-600",
  },
];

export default function WhatYouGet() {
  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What You Get with HakkenLabs
          </h2>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            Comprehensive crypto token analysis at your fingertips
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {whatYouGetFeatures.map((feature) => (
            <Card
              key={feature.title}
              className="text-center"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center text-white text-2xl`}
                  >
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--color-muted)]">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
