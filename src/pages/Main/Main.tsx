import Header from "@/components/Header/Header";
import StarrySky from "@/components/StarrySky/StarrySky";
import Analyze from "@/features/Analyze/Analyze";
import CustomerGroups from "@/features/CustomerGroups/CustomerGroups";
import FullWebPlatform from "@/features/FullWebPlatform/FullWebPlatform";
import StayUpdated from "@/features/StayUpdated/StayUpdated";
import React from "react";

const MainPage = () => {
  return (
    <div className="relative overflow-hidden">
      <StarrySky className="h-full w-full z-0" />
      <Header />
      <main className="w-full">
        <section className="h-[calc(100vh-100px)] max-h-[1200px] flex flex-col items-center justify-evenly text-center space-y-2 px-6">
          <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="text-5xl md:text-4xl font-bold tracking-tight">
              Analyze Any Token
            </h1>
            <p className="max-w-2xl mx-auto text-base text-[var(--color-muted)]">
              Get comprehensive risk scores, human‑readable descriptions, and
              actionable insights for any crypto token.
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
};

export default MainPage;
