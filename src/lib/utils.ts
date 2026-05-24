import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names — clsx + tailwind-merge dedupe. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as USD currency. */
export function formatCurrency(amount: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

/** Format a large number with K/M suffixes (e.g. 12500 → "12.5K"). */
export function formatCompact(num: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

/** Sleep helper for async flows / animations. */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
