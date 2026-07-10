"use client";

import { useMemo } from "react";

import type { Portfolio } from "@/features/portfolio/types";
import { getPortfolioCompletion } from "@/features/portfolio/utils/portfolio-validator";
import { sortPortfolioSections } from "@/features/portfolio/utils/section-sorter";

export function usePortfolio(portfolio: Portfolio | null) {
  return useMemo(
    () => ({
      portfolio,
      hasPortfolio: Boolean(portfolio),
      completion: getPortfolioCompletion(portfolio),
      enabledSections: sortPortfolioSections(portfolio?.sections ?? []).filter(
        (section) => section.enabled
      ),
      primaryProjects: [...(portfolio?.projects ?? [])].sort((a, b) => a.order - b.order).slice(0, 4),
      primarySkills: [...(portfolio?.skills ?? [])].sort((a, b) => a.order - b.order).slice(0, 8),
    }),
    [portfolio]
  );
}
