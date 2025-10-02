interface CustomerGroup {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string;
  imagePosition: "left" | "right";
}

const customerGroups: CustomerGroup[] = [
  {
    id: "beginners",
    title: "Beginner Crypto Investors",
    description: "Perfect for those just starting their crypto journey:",
    features: [
      "Simple risk scores with clear color coding (green/yellow/red)",
      "Plain explanations of complex metrics",
      "Beginner-friendly warnings and safety tips",
      "Risk tolerance assessment and recommendations",
    ],
    icon: "📊",
    gradient: "from-green-400 to-blue-500",
    imagePosition: "right",
  },
  {
    id: "traders",
    title: "Active Retail Traders",
    description: "Designed for experienced traders who need quick insights:",
    features: [
      "Real-time market indicators and price alerts",
      "Advanced sentiment analysis and social media trends",
      "Quick decision reports with actionable recommendations",
      "Technical analysis integration and chart patterns",
      "Portfolio risk assessment and diversification tips",
    ],
    icon: "⚡",
    gradient: "from-orange-400 to-red-500",
    imagePosition: "left",
  },
  {
    id: "creators",
    title: "Creators & Influencers",
    description: "Perfect tools for content creators and crypto influencers:",
    features: [
      "Share credible analytics with your audience",
      "Exportable visuals and infographics for social media",
      "White-label reports with your branding",
      "Custom analysis tools for your specific niche",
    ],
    icon: "🎨",
    gradient: "from-purple-400 to-pink-500",
    imagePosition: "right",
  },
];

export default function CustomerGroups() {
  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-center">
        Build for every type of crypto investor
      </h1>
      {customerGroups.map((group, index) => (
        <div
          key={group.id}
          className={`w-full flex items-center justify-center px-6 py-8 ${
            index % 2 === 1 ? "bg-gray-50/10" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div
              className={`space-y-4 ${
                group.imagePosition === "left"
                  ? "order-2 lg:order-2"
                  : "order-1 lg:order-1"
              }`}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {group.title}
              </h2>
              <div className="space-y-3 text-base text-[var(--color-muted)]">
                <p>{group.description}</p>
                <ul className="space-y-2 list-disc list-inside">
                  {group.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image/Icon */}
            <div
              className={`flex justify-center ${
                group.imagePosition === "left"
                  ? "order-1 lg:order-1"
                  : "order-2 lg:order-2"
              }`}
            >
              <div
                className={`w-48 h-48 bg-gradient-to-br ${group.gradient} rounded-2xl flex items-center justify-center text-white text-4xl`}
              >
                {group.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
