"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import {
  DEFAULT_THEME_MODE,
  getNextThemeMode,
  isResolvedThemeMode,
  isThemeMode,
  resolveThemeMode,
} from "@/config/theme";
import type { ResolvedThemeMode, ThemeMode } from "@/types/theme";

function subscribeToClientMount() {
  return () => undefined;
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function useThemeMode() {
  const mounted = useSyncExternalStore(
    subscribeToClientMount,
    getClientSnapshot,
    getServerSnapshot
  );
  const { forcedTheme, resolvedTheme, setTheme, systemTheme, theme } = useTheme();

  const themeMode = isThemeMode(theme) ? theme : DEFAULT_THEME_MODE;
  const resolvedThemeMode = resolveThemeMode(themeMode, resolvedTheme);
  const systemThemeMode: ResolvedThemeMode | undefined = isResolvedThemeMode(systemTheme)
    ? systemTheme
    : undefined;

  const setThemeMode = useCallback(
    (mode: ThemeMode) => {
      setTheme(mode);
    },
    [setTheme]
  );

  const toggleThemeMode = useCallback(() => {
    setTheme(getNextThemeMode(themeMode));
  }, [setTheme, themeMode]);

  return useMemo(
    () => ({
      forcedTheme,
      mounted,
      resolvedTheme: resolvedThemeMode,
      setThemeMode,
      systemTheme: systemThemeMode,
      theme: themeMode,
      toggleThemeMode,
    }),
    [
      forcedTheme,
      mounted,
      resolvedThemeMode,
      setThemeMode,
      systemThemeMode,
      themeMode,
      toggleThemeMode,
    ]
  );
}
