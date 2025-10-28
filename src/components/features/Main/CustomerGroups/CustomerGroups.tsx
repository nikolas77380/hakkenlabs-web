import { useTranslations } from "next-intl";
import Image from "next/image";
interface CustomerGroup {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string;
  imagePosition: "left" | "right";
}

function getCustomerGroups(
  t: ReturnType<typeof useTranslations>,
): CustomerGroup[] {
  const groups = t.raw("customers.groups") as Array<{
    id: string;
    title: string;
    description: string;
    features: string[];
  }>;
  const icons = [
    "/assets/begginers.png",
    "/assets/traders.png",
    "/assets/creators.png",
  ];
  const gradients = [
    "from-green-400 to-blue-500",
    "from-orange-400 to-red-500",
    "from-purple-400 to-pink-500",
  ];
  const positions: Array<"left" | "right"> = ["right", "left", "right"];
  return groups.map((group, index) => ({
    id: group.id,
    title: group.title,
    description: group.description,
    features: group.features,
    icon: icons[index] ?? "✨",
    gradient: gradients[index] ?? "from-slate-400 to-slate-600",
    imagePosition: positions[index] ?? "right",
  }));
}

export default function CustomerGroups() {
  const t = useTranslations();
  const customerGroups = getCustomerGroups(t);
  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-center">
        {t("customers.title")}
      </h1>
      {customerGroups.map((group, index) => (
        <div
          key={group.id}
          className={`w-full flex items-center justify-center px-6 py-8 ${
            index % 2 === 1
              ? "bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[1px]"
              : ""
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
                className={`w-58 h-58 bg-gradient-to-br ${group.gradient} rounded-2xl flex items-center justify-center text-white text-4xl overflow-hidden`}
              >
                <Image
                  src={group.icon}
                  alt={group.title}
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
