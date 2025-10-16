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
  if (!address) return "—";
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

export const getRiskScoreColor = (score: number | null | undefined) => {
  if (score === null || score === undefined) return "#6B7280";
  if (score > 80) return "#F87171";
  if (score > 60) return "#FB923C";
  if (score > 20) return "#FACC15";
  return "#4ADE80";
};

export const getRiskScoreClasses = (score: number | null | undefined) => {
  if (score === null || score === undefined) {
    return {
      background: "bg-gray-500/20",
      border: "border-gray-500/30",
      text: "text-gray-300",
      progressBar: "bg-gray-500",
    };
  }

  if (score > 80) {
    return {
      background: "bg-red-500/20",
      border: "border-red-500/30",
      text: "text-red-300",
      progressBar: "bg-red-500",
    };
  }

  if (score > 60) {
    return {
      background: "bg-orange-500/20",
      border: "border-orange-500/30",
      text: "text-orange-300",
      progressBar: "bg-orange-500",
    };
  }

  if (score > 20) {
    return {
      background: "bg-yellow-500/20",
      border: "border-yellow-500/30",
      text: "text-yellow-300",
      progressBar: "bg-yellow-500",
    };
  }

  return {
    background: "bg-green-500/20",
    border: "border-green-500/30",
    text: "text-green-300",
    progressBar: "bg-green-500",
  };
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
