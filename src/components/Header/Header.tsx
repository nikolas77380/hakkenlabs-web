"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useLocale, useTranslations } from "next-intl";
import { LocaleSwitcherSelect } from "./LocaleSwitcherSelect";

const Header = () => {
  const t = useTranslations("header");
  const locale = useLocale();
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
        <LocaleSwitcherSelect
          defaultValue={locale}
          label="Language"
          items={[
            { value: "en", label: "English" },
            { value: "uk", label: "Українська" },
          ]}
        />
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
