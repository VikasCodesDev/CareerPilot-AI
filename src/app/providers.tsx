"use client";

import { CareerPilotThemeProvider } from "./theme-provider";
import { AuthProvider } from "@/features/auth/providers/auth-provider";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <CareerPilotThemeProvider>{children}</CareerPilotThemeProvider>
    </AuthProvider>
  );
}
