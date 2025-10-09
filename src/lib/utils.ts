import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(
  value?: number | null,
  options: Intl.NumberFormatOptions = {},
) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", options).format(value);
}

export function formatPercent(decimal?: number | null) {
  if (decimal === null || decimal === undefined) return "—";
  return `${(decimal * 100).toFixed(2)}%`;
}

export const formatAddress = (address: string | undefined) => {
  if (!address) return "Your wallet address...";
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getRiskScoreColor = (score: number | null | undefined) => {
  if (score === null || score === undefined) return "bg-gray-500";
  if (score <= 20) return "bg-red-400";
  if (score <= 40) return "bg-orange-400";
  if (score <= 60) return "bg-yellow-400";
  return "bg-green-400";
};

export const formatLastUpdated = (
  dateString: string | null | undefined,
  locale: string = "en-US",
) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  } catch {
    return null;
  }
};
