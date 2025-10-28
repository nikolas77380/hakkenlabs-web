export type Locale = (typeof locales)[number];

export const locales = ["en", "ua"] as const;

export const localeItems = [
  { value: "en", label: "English" },
  { value: "ua", label: "Українська" },
];

export const defaultLocale: Locale = "en";
