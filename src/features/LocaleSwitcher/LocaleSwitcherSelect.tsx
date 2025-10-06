"use client";

import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { useTransition } from "react";
import { Locale, localeItems } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useLocale, useTranslations } from "next-intl";

export function LocaleSwitcherSelect() {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("main.localeSwitcher");

  const locale = useLocale();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(async () => {
      await setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select.Root
        defaultValue={locale}
        onValueChange={onChange}
      >
        <Select.Trigger
          aria-label={t("label")}
          className={clsx(
            "rounded-sm p-2 transition-colors hover:bg-slate-200",
            isPending && "pointer-events-none opacity-60",
          )}
        >
          <Select.Icon>
            <span className="text-slate-600">🌐</span>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="min-w-[8rem] overflow-hidden rounded-sm bg-white py-1 shadow-md"
            position="popper"
          >
            <Select.Viewport>
              {localeItems.map((item) => (
                <Select.Item
                  key={item.value}
                  className="flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-slate-100"
                  value={item.value}
                >
                  <span className="text-slate-900">{item.label}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-white text-white" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
