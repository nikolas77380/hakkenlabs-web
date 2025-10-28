import StarrySky from "@/components/common/StarrySky/StarrySky";
import SidePanel from "@/components/features/Token/SidePanel";
import { api } from "@/services/api";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Header from "@/components/common/Header/Header";
import Description from "@/components/features/Token/Description";
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

  console.log(details);

  if (!details) {
    return <div>{t("notFound")}</div>;
  }

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <Header maxWidth="1480px" />
      <StarrySky className="h-full w-full z-0" />
      <div className="relative w-[97%] mx-auto h-px bg-secondary">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-secondary/30 blur-xl" />
      </div>
      <div className="pt-6 relative h-[calc(100vh-57px)] overflow-y-auto scrollbar-hide grid grid-cols-1 max-w-[1480px] mx-auto items-start xl:grid-cols-[30vw_1fr]">
        <SidePanel details={details} />
        <main className="mx-auto max-w-5xl px-4 space-y-4 pb-16">
          <Description description={details.description} />
          {/*<MarketSection details={details} />*/}

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
    </div>
  );
}
