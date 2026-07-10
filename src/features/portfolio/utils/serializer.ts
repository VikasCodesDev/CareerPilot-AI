import type { Portfolio } from "@/features/portfolio/types";

export function serializePortfolio(portfolio: Portfolio): string {
  return JSON.stringify(portfolio, null, 2);
}
