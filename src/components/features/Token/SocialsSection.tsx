import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import SocialsLink from "@/components/common/ui/socialsLink";
import { SocialLinks } from "@/services/api";
import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {
  socials: SocialLinks;
};

const SocialsSection = async ({ socials }: Props) => {
  const t = await getTranslations("token");

  return (
    <Card variant="transparent">
      <CardHeader>
        <CardTitle>{t("socials.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 text-sm">
          <SocialsLink
            label={t("socials.website")}
            url={socials.website}
          />
          <SocialsLink
            label={t("socials.twitter")}
            url={socials.twitter}
          />
          <SocialsLink
            label={t("socials.telegram")}
            url={socials.telegram}
          />
          <SocialsLink
            label={t("socials.reddit")}
            url={socials.reddit}
          />
          <SocialsLink
            label={t("socials.discord")}
            url={socials.discord}
          />
          <SocialsLink
            label={t("socials.github")}
            url={socials.github}
          />
          <SocialsLink
            label={t("socials.medium")}
            url={socials.medium}
          />
          <SocialsLink
            label={t("socials.youtube")}
            url={socials.youtube}
          />
          <SocialsLink
            label={t("socials.linkedin")}
            url={socials.linkedin}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialsSection;
