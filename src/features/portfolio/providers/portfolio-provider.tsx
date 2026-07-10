"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { Portfolio, PortfolioTemplate } from "@/features/portfolio/types";

type PortfolioContextValue = {
  portfolio: Portfolio | null;
  templates: PortfolioTemplate[];
  authenticated: boolean;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({
  children,
  portfolio,
  templates,
  authenticated,
}: PortfolioContextValue & { children: ReactNode }) {
  const value = useMemo(
    () => ({ portfolio, templates, authenticated }),
    [authenticated, portfolio, templates]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolioContext must be used within PortfolioProvider.");
  }

  return context;
}
