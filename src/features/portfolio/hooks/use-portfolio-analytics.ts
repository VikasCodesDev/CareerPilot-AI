"use client";

import { useMemo } from "react";

import type { Portfolio } from "@/features/portfolio/types";

export function usePortfolioAnalytics(portfolio: Portfolio | null) {
  return useMemo(() => {
    const analytics = portfolio?.analytics;

    return {
      views: analytics?.views ?? 0,
      uniqueVisitors: analytics?.uniqueVisitors ?? 0,
      contactClicks: analytics?.contactClicks ?? 0,
      resumeDownloads: analytics?.resumeDownloads ?? 0,
      conversionRate:
        analytics && analytics.views > 0
          ? Math.round(((analytics.contactClicks + analytics.resumeDownloads) / analytics.views) * 100)
          : 0,
    };
  }, [portfolio]);
}
