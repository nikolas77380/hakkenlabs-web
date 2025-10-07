"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { LocaleSwitcherSelect } from "../../features/LocaleSwitcher/LocaleSwitcherSelect";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("header");
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            window.open("https://t.me/hakkenlabs_bot", "_blank");
          }}
        >
          {t("cta")}
        </Button>
        <LocaleSwitcherSelect />
      </div>
    </header>
  );
};

export default Header;
