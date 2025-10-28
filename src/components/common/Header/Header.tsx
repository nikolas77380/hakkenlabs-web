"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { LocaleSwitcherSelect } from "@/components/features/Main/LocaleSwitcher/LocaleSwitcherSelect";
import { cn } from "@/lib/utils";

const Header = ({
  maxWidth,
  className,
  showLocaleSwitcher = true,
}: {
  maxWidth?: string;
  className?: string;
  showLocaleSwitcher?: boolean;
}) => {
  const t = useTranslations("header");
  return (
    <header
      className={cn(
        "h-[96px] max-w-6xl mx-auto px-6 py-6 flex items-center justify-between",
        maxWidth && `max-w-[${maxWidth}]`,
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          color="white"
          onClick={() => {
            window.location.href = "/";
          }}
          className="text-white h-12 w-auto cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            window.open("https://t.me/hakkenlabs_bot", "_blank");
          }}
        >
          {t("cta")}
        </Button>
        {showLocaleSwitcher && <LocaleSwitcherSelect />}
      </div>
    </header>
  );
};

export default Header;
