import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface AnalyzeFeature {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
}

const descriptions: AnalyzeFeature[] = [
  {
    title: "Deep Dive Analysis",
    description:
      "Comprehensive evaluation of token fundamentals and market dynamics:",
    icon: "🔍",
    gradient: "from-blue-400 to-cyan-500",
    features: [
      "Technical analysis of smart contract code and architecture",
      "Economic model assessment and tokenomics evaluation",
      "Market cap analysis and liquidity assessment",
      "Competitive positioning and market share analysis",
      "Development team background and project roadmap review",
      "Community engagement and social sentiment metrics",
    ],
  },
  {
    title: "Security Assessment",
    description: "Thorough security audit and risk evaluation framework:",
    icon: "🛡️",
    gradient: "from-green-400 to-emerald-500",
    features: [
      "Smart contract vulnerability scanning and audit results",
      "Multi-signature wallet security and key management",
      "Governance token security and voting mechanisms",
      "Liquidity pool security and impermanent loss analysis",
      "Regulatory compliance and legal risk assessment",
      "Historical security incidents and response protocols",
    ],
  },
  {
    title: "Trading Intelligence",
    description:
      "Advanced market analysis and trading opportunity identification:",
    icon: "📈",
    gradient: "from-orange-400 to-red-500",
    features: [
      "Real-time price action analysis and trend identification",
      "Volume profile analysis and support/resistance levels",
      "Technical indicators and chart pattern recognition",
      "Market sentiment analysis and social media monitoring",
      "Arbitrage opportunities and cross-exchange analysis",
      "Risk-reward ratio calculations and position sizing",
    ],
  },
];

const AnalyzeDescription = () => {
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
