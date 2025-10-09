import Header from "@/components/common/Header/Header";
import StarrySky from "@/components/common/StarrySky/StarrySky";
import Analyze from "@/components/features/Main/Analyze/Analyze";
import CustomerGroups from "@/components/features/Main/CustomerGroups/CustomerGroups";
import FullWebPlatform from "@/components/features/Main/FullWebPlatform/FullWebPlatform";
import StayUpdated from "@/components/features/Main/StayUpdated/StayUpdated";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="relative overflow-hidden">
      <StarrySky className="h-full w-full z-0" />
      <Header />
      <main className="w-full">
        <section className="min-h-[calc(100vh-100px)] lg:max-h-[1200px] flex flex-col items-center justify-evenly text-center space-y-2 px-6">
          <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="text-5xl md:text-4xl font-bold tracking-tight">
              {t("main.hero.title")}
            </h1>
            <p className="max-w-2xl mx-auto text-base text-[var(--color-muted)]">
              {t("main.hero.subtitle")}
            </p>
          </div>
          <Analyze />
        </section>

        <section className="space-y-16 mt-24 mb-16">
          <CustomerGroups />

          <FullWebPlatform />

          <StayUpdated />
        </section>
      </main>
    </div>
  );
}
