"use client";

import { CareerPilotThemeProvider } from "./theme-provider";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export function AppProviders({ children }: AppProvidersProps) {
  return <CareerPilotThemeProvider>{children}</CareerPilotThemeProvider>;
}
