"use client";

import { useMemo } from "react";

import type { Portfolio, PortfolioTheme } from "@/features/portfolio/types";
import { mapThemeToClass } from "@/features/portfolio/utils/theme-mapper";

export function usePortfolioTheme(portfolio: Portfolio | null, fallback: PortfolioTheme = "Modern Dark") {
  return useMemo(() => {
    const theme = portfolio?.theme ?? fallback;

    return {
      theme,
      themeClass: mapThemeToClass(theme),
    };
  }, [fallback, portfolio]);
}
