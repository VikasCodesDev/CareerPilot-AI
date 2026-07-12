"use client";

import { CareerPilotThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/features/auth/providers/auth-provider";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <CareerPilotThemeProvider>
        {children}
        <Toaster />
      </CareerPilotThemeProvider>
    </AuthProvider>
  );
}
