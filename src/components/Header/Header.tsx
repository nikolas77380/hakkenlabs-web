import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { LocaleSwitcherSelect } from "../../features/LocaleSwitcher/LocaleSwitcherSelect";
import { getTranslations } from "next-intl/server";

const Header = async () => {
  const t = await getTranslations("header");
  return (
    <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          color="white"
          className="text-white h-12 w-auto"
        />
      </div>
      <div className="flex items-center gap-3">
        <LocaleSwitcherSelect />
        <Button
          variant="outline"
          size="sm"
        >
          {t("cta")}
        </Button>
      </div>
    </header>
  );
};

export default Header;
