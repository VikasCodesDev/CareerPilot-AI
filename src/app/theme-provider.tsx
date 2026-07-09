"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

import {
  THEME_ATTRIBUTE,
  THEME_CLASS_VALUES,
  themeConfig,
} from "@/config/theme";

type CareerPilotThemeProviderProps = Readonly<{
  children: React.ReactNode;
  forcedTheme?: ThemeProviderProps["forcedTheme"];
  nonce?: ThemeProviderProps["nonce"];
}>;

export function CareerPilotThemeProvider({
  children,
  forcedTheme,
  nonce,
}: CareerPilotThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={THEME_ATTRIBUTE}
      defaultTheme={themeConfig.defaultTheme}
      disableTransitionOnChange
      enableColorScheme
      enableSystem
      forcedTheme={forcedTheme}
      nonce={nonce}
      storageKey={themeConfig.storageKey}
      themes={[...themeConfig.themes]}
      value={THEME_CLASS_VALUES}
    >
      {children}
    </NextThemesProvider>
  );
}
