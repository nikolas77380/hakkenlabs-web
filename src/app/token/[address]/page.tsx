import StarrySky from "@/components/common/StarrySky/StarrySky";
import TokenHeader from "@/components/features/Token/TokenHeader";
import { api } from "@/services/api";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Header from "@/components/common/Header/Header";
import Description from "@/components/features/Token/Description";
import Overview from "@/components/features/Token/Overview";
import MarketSection from "@/components/features/Token/MarketSection";
import CodeRisksSection from "@/components/features/Token/CodeRisksSection";
import SocialsSection from "@/components/features/Token/SocialsSection";
import SummarySection from "@/components/features/Token/SummarySection";
import HoldersChange from "@/components/features/Token/HoldersChange";
import HoldersDistribution from "@/components/features/Token/HoldersDistribution";
import SupplyConcentration from "@/components/features/Token/SupplyConcentration";

interface TokenPageParams {
  address: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TokenPageParams>;
}): Promise<Metadata> {
  const { address } = await params;
  const title = `Token: ${address}`;
  return {
    title,
    description: `Details and analytics for token ${address}.`,
  };
}

export default async function TokenPage({
  params,
}: {
  params: Promise<TokenPageParams>;
}) {
  const { address } = await params;

  const locale = await getLocale();
  const t = await getTranslations("token");

  const details = await api.getTokenDetails(locale, "1", address);

  if (!details) {
    return <div>{t("notFound")}</div>;
  }

  return (
    <div className="relative overflow-hidden">
      <Header />
      <StarrySky className="h-full w-full z-0" />
      <main className="mx-auto max-w-5xl px-4 py-8 space-y-4">
        <TokenHeader details={details} />
        <Description description={details.description} />
        <Overview details={details} />
        <MarketSection details={details} />

        <CodeRisksSection details={details} />
        {details.holders && <HoldersChange holders={details.holders} />}
        {details.holders?.holderSupply && (
          <SupplyConcentration holderSupply={details.holders?.holderSupply} />
        )}
        {details.holders?.holderDistribution && (
          <HoldersDistribution
            holdersDistribution={details.holders?.holderDistribution}
          />
        )}
        {details.summary && <SummarySection summary={details.summary} />}
        {details.socialLinks && (
          <SocialsSection socials={details.socialLinks} />
        )}
      </main>
    </div>
  );
}
