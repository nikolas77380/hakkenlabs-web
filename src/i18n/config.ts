export type Locale = (typeof locales)[number];

export const locales = ["en", "uk"] as const;

export const localeItems = [
  { value: "en", label: "English" },
  { value: "uk", label: "Українська" },
];

export const defaultLocale: Locale = "en";
